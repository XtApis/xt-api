"use strict";
/* ============================================================================
 * Copyright (c) Cloud Annotations
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 * ========================================================================== */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = init;
const child_process_1 = require("child_process");
const os_1 = __importDefault(require("os"));
const path_1 = __importDefault(require("path"));
const logger_1 = __importDefault(require("@docusaurus/logger"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const lodash_1 = require("lodash");
const prompts_1 = __importDefault(require("prompts"));
const shelljs_1 = __importDefault(require("shelljs"));
const supports_color_1 = __importDefault(require("supports-color"));
const RecommendedTemplate = "openapi";
function hasYarn() {
    try {
        (0, child_process_1.execSync)("yarnpkg --version", { stdio: "ignore" });
        return true;
    }
    catch (e) {
        return false;
    }
}
function isValidGitRepoUrl(gitRepoUrl) {
    return ["https://", "git@"].some((item) => gitRepoUrl.startsWith(item));
}
async function updatePkg(pkgPath, obj) {
    const content = await fs_extra_1.default.readFile(pkgPath, "utf-8");
    const pkg = JSON.parse(content);
    const newPkg = Object.assign(pkg, obj);
    await fs_extra_1.default.outputFile(pkgPath, `${JSON.stringify(newPkg, null, 2)}\n`);
}
function getTemplateInstallPackage(template, originalDirectory) {
    let templateToInstall = "docusaurus-template";
    if (template) {
        const match = template.match(/^file:(.*)?$/);
        if (match) {
            templateToInstall = `file:${path_1.default.resolve(originalDirectory, match[1])}`;
        }
        else if (template.includes("://") ||
            template.match(/^.+\.(tgz|tar\.gz)$/)) {
            // for tar.gz or alternative paths
            templateToInstall = template;
        }
        else {
            // Add prefix 'cra-template-' to non-prefixed templates, leaving any
            // @scope/ and @version intact.
            const packageMatch = template.match(/^(@[^/]+\/)?([^@]+)?(@.+)?$/);
            const scope = (packageMatch === null || packageMatch === void 0 ? void 0 : packageMatch[1]) || "";
            const templateName = (packageMatch === null || packageMatch === void 0 ? void 0 : packageMatch[2]) || "";
            const version = (packageMatch === null || packageMatch === void 0 ? void 0 : packageMatch[3]) || "";
            if (templateName === templateToInstall ||
                templateName.startsWith(`${templateToInstall}-`)) {
                // Covers:
                // - cra-template
                // - @SCOPE/cra-template
                // - cra-template-NAME
                // - @SCOPE/cra-template-NAME
                templateToInstall = `${scope}${templateName}${version}`;
            }
            else if (version && !scope && !templateName) {
                // Covers using @SCOPE only
                templateToInstall = `${version}/${templateToInstall}`;
            }
            else {
                // Covers templates without the `cra-template` prefix:
                // - NAME
                // - @SCOPE/NAME
                templateToInstall = `${scope}${templateToInstall}-${templateName}${version}`;
            }
        }
    }
    return templateToInstall;
}
// Extract package name from tarball url or path.
function getPackageInfo(installPackage) {
    const match = installPackage.match(/^file:(.*)?$/);
    if (match) {
        const installPackagePath = match[1];
        const { name, version } = require(path_1.default.join(installPackagePath, "package.json"));
        return { name, version };
    }
    return { name: installPackage };
}
function createPackageJson(appPath, templateName) {
    const appPackage = require(path_1.default.join(appPath, "package.json"));
    const templatePath = path_1.default.dirname(require.resolve(`${templateName}/package.json`, { paths: [appPath] }));
    const templateJsonPath = path_1.default.join(templatePath, "template.json");
    let templateJson = {};
    if (fs_extra_1.default.existsSync(templateJsonPath)) {
        templateJson = require(templateJsonPath);
    }
    const templatePackage = templateJson.package || {};
    // Keys to ignore in templatePackage
    const templatePackageIgnorelist = [
        "name",
        "version",
        "description",
        "keywords",
        "bugs",
        "license",
        "author",
        "contributors",
        "files",
        "browser",
        "bin",
        "man",
        "directories",
        "repository",
        "peerDependencies",
        "bundledDependencies",
        "optionalDependencies",
        "engineStrict",
        "os",
        "cpu",
        "preferGlobal",
        "private",
        "publishConfig",
    ];
    // Keys from templatePackage that will be merged with appPackage
    const templatePackageToMerge = ["dependencies"]; // "dependencies", "scripts"
    // Keys from templatePackage that will be added to appPackage,
    // replacing any existing entries.
    const templatePackageToReplace = Object.keys(templatePackage).filter((key) => {
        return (!templatePackageIgnorelist.includes(key) &&
            !templatePackageToMerge.includes(key));
    });
    // Copy over some of the devDependencies
    appPackage.dependencies = appPackage.dependencies || {};
    const templateDependencies = templatePackage.dependencies || {};
    appPackage.dependencies = {
        ...appPackage.dependencies,
        ...templateDependencies,
    };
    // Add templatePackage keys/values to appPackage, replacing existing entries
    templatePackageToReplace.forEach((key) => {
        appPackage[key] = templatePackage[key];
    });
    fs_extra_1.default.writeFileSync(path_1.default.join(appPath, "package.json"), JSON.stringify(appPackage, null, 2) + os_1.default.EOL);
}
async function init(rootDir, siteName, reqTemplate, cliOptions = {}) {
    const useYarn = cliOptions.useNpm ? false : hasYarn();
    let name = siteName;
    // Prompt if siteName is not passed from CLI.
    if (!name) {
        const prompt = await (0, prompts_1.default)({
            type: "text",
            name: "name",
            message: "What should we name this site?",
            initial: "website",
        });
        name = prompt.name;
    }
    if (!name) {
        logger_1.default.error("A website name is required.");
        process.exit(1);
    }
    const dest = path_1.default.resolve(rootDir, name);
    if (fs_extra_1.default.existsSync(dest)) {
        logger_1.default.error `Directory already exists at path=${dest}!`;
        process.exit(1);
    }
    let template = reqTemplate !== null && reqTemplate !== void 0 ? reqTemplate : RecommendedTemplate;
    logger_1.default.info("Creating new Docusaurus project...");
    if (isValidGitRepoUrl(template)) {
        logger_1.default.info `Cloning Git template path=${template}...`;
        if (shelljs_1.default.exec(`git clone --recursive ${template} ${dest}`, { silent: true })
            .code !== 0) {
            logger_1.default.error `Cloning Git template name=${template} failed!`;
            process.exit(1);
        }
    }
    else if (fs_extra_1.default.existsSync(path_1.default.resolve(process.cwd(), template))) {
        const templateDir = path_1.default.resolve(process.cwd(), template);
        try {
            await fs_extra_1.default.copy(templateDir, dest);
        }
        catch (err) {
            logger_1.default.error `Copying local template path=${templateDir} failed!`;
            throw err;
        }
    }
    else {
        const appName = path_1.default.basename(dest);
        fs_extra_1.default.ensureDirSync(name);
        const packageJson = {
            name: appName,
            version: "0.1.0",
            private: true,
        };
        fs_extra_1.default.writeFileSync(path_1.default.join(dest, "package.json"), JSON.stringify(packageJson, null, 2) + os_1.default.EOL);
        const originalDirectory = process.cwd();
        const templatePackageName = getTemplateInstallPackage(template, originalDirectory);
        const templateInfo = getPackageInfo(templatePackageName);
        const templateName = templateInfo.name;
        shelljs_1.default.exec(`cd "${name}" && ${useYarn ? "yarn add" : "npm install --color always"} ${templatePackageName}`, {
            env: {
                ...process.env,
                // Force coloring the output, since the command is invoked by shelljs, which is not the interactive shell
                ...(supports_color_1.default.stdout ? { FORCE_COLOR: "1" } : {}),
            },
        });
        const templatePath = path_1.default.dirname(require.resolve(`${templateName}/package.json`, { paths: [dest] }));
        createPackageJson(dest, templateName);
        const templateDir = path_1.default.join(templatePath, "template");
        if (fs_extra_1.default.existsSync(templateDir)) {
            fs_extra_1.default.copySync(templateDir, dest);
        }
        else {
            logger_1.default.error("Could not locate supplied template.");
            process.exit(1);
        }
        shelljs_1.default.exec(`cd "${name}" && ${useYarn ? "yarn remove" : "npm uninstall --color always"} ${templateName}`, {
            env: {
                ...process.env,
                // Force coloring the output, since the command is invoked by shelljs, which is not the interactive shell
                ...(supports_color_1.default.stdout ? { FORCE_COLOR: "1" } : {}),
            },
        });
    }
    // Update package.json info.
    try {
        await updatePkg(path_1.default.join(dest, "package.json"), {
            name: (0, lodash_1.kebabCase)(name),
            version: "0.0.0",
            private: true,
        });
    }
    catch (err) {
        logger_1.default.error("Failed to update package.json.");
        throw err;
    }
    // We need to rename the gitignore file to .gitignore
    if (!fs_extra_1.default.pathExistsSync(path_1.default.join(dest, ".gitignore")) &&
        fs_extra_1.default.pathExistsSync(path_1.default.join(dest, "gitignore"))) {
        await fs_extra_1.default.move(path_1.default.join(dest, "gitignore"), path_1.default.join(dest, ".gitignore"));
    }
    if (fs_extra_1.default.pathExistsSync(path_1.default.join(dest, "gitignore"))) {
        fs_extra_1.default.removeSync(path_1.default.join(dest, "gitignore"));
    }
    const pkgManager = useYarn ? "yarn" : "npm";
    // Display the most elegant way to cd.
    const cdpath = path_1.default.join(process.cwd(), name) === dest
        ? name
        : path_1.default.relative(process.cwd(), name);
    if (!cliOptions.skipInstall) {
        logger_1.default.info `Installing dependencies with name=${pkgManager}...`;
        if (shelljs_1.default.exec(`cd "${name}" && ${useYarn ? "yarn" : "npm install --color always"}`, {
            env: {
                ...process.env,
                // Force coloring the output, since the command is invoked by shelljs, which is not the interactive shell
                ...(supports_color_1.default.stdout ? { FORCE_COLOR: "1" } : {}),
            },
        }).code !== 0) {
            logger_1.default.error("Dependency installation failed.");
            logger_1.default.info `The site directory has already been created, and you can retry by typing:

  code=${`cd ${cdpath}`}
  code=${`${pkgManager} install`}`;
            process.exit(0);
        }
    }
    logger_1.default.success `Created path=${cdpath}.`;
    logger_1.default.info `Inside that directory, you can run several commands:

  code=${`${pkgManager} start`}
    Starts the development server.

  code=${`${pkgManager} ${useYarn ? "" : "run "}build`}
    Bundles your website into static files for production.

  code=${`${pkgManager} ${useYarn ? "" : "run "}serve`}
    Serves the built website locally.

  code=${`${pkgManager} deploy`}
    Publishes the website to GitHub pages.

We recommend that you begin by typing:

  code=${`cd ${cdpath}`}
  code=${`${pkgManager} start`}

Happy building awesome websites!
`;
}
