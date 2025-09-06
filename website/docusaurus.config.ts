/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import path from 'path';
import npm2yarn from '@docusaurus/remark-plugin-npm2yarn';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import configTabs from './src/remark/configTabs';

import versions from './versions.json';
// import VersionsArchived from './versionsArchived.json';
import {
  dogfoodingPluginInstances,
  dogfoodingThemeInstances,
  dogfoodingRedirects,
  dogfoodingTransformFrontMatter,
  isArgosBuild,
} from './_dogfooding/dogfooding.config';

import ConfigLocalized from './docusaurus.config.localized.json';

import PrismLight from './src/utils/prismLight';
import PrismDark from './src/utils/prismDark';

// import type {Config, DocusaurusConfig} from '@docusaurus/types';
import type {Config as DocusaurusConfig} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import type {Options as DocsOptions} from '@docusaurus/plugin-content-docs';
import type {Options as BlogOptions} from '@docusaurus/plugin-content-blog';
import type {Options as PageOptions} from '@docusaurus/plugin-content-pages';
import type {Options as IdealImageOptions} from '@docusaurus/plugin-ideal-image';
import type {Options as ClientRedirectsOptions} from '@docusaurus/plugin-client-redirects';

// const ArchivedVersionsDropdownItems = Object.entries(
//   VersionsArchived
// ).splice(
//   0,
//   5,
// );

function isPrerelease(version: string) {
  return (
    version.includes('-') ||
    version.includes('alpha') ||
    version.includes('beta') ||
    version.includes('rc')
  );
}

function getLastStableVersion() {
  const lastStableVersion = versions.find((version) => !isPrerelease(version));
  if (!lastStableVersion) {
    throw new Error('unexpected, no stable Docusaurus version?');
  }
  return lastStableVersion;
}
const announcedVersion = getAnnouncedVersion();

function getLastStableVersionTuple(): [string, string, string] {
  const lastStableVersion = getLastStableVersion();
  const parts = lastStableVersion.split('.');
  if (parts.length !== 3) {
    throw new Error(`Unexpected stable version name: ${lastStableVersion}`);
  }
  return [parts[0]!, parts[1]!, parts[2]!];
}

// The version announced on the homepage hero and announcement banner
// 3.3.2 => 3.3
// 3.0.5 => 3.0
function getAnnouncedVersion() {
  const [major, minor] = getLastStableVersionTuple();
  return `${major}.${minor}`;
}

// This probably only makes sense for the alpha/beta/rc phase, temporary
function getNextVersionName() {
  return 'Canary';
  /*
  const expectedPrefix = '2.0.0-rc.';

  const lastReleasedVersion = versions[0];
  if (!lastReleasedVersion || !lastReleasedVersion.includes(expectedPrefix)) {
    throw new Error(
      'this code is only meant to be used during the 2.0 alpha/beta/rc phase.',
    );
  }
  const version = parseInt(lastReleasedVersion.replace(expectedPrefix, ''), 10);
  return `${expectedPrefix}${version + 1}`;

   */
}

// Artificial way to crash the SSR rendering and test errors
// See website/_dogfooding/_pages tests/crashTest.tsx
// Test with: DOCUSAURUS_CRASH_TEST=true yarn build:website:fast
const crashTest = process.env.DOCUSAURUS_CRASH_TEST === 'true';

// By default, we use Docusaurus Faster
// DOCUSAURUS_SLOWER=true is useful for benchmarking faster against slower
// hyperfine --prepare 'yarn clear:website' --runs 3
// 'DOCUSAURUS_SLOWER=true yarn build:website:fast' 'yarn build:website:fast'
const isSlower = process.env.DOCUSAURUS_SLOWER === 'true';
if (isSlower) {
  console.log('🐢 Using slower Docusaurus build');
}

const router = process.env
  .DOCUSAURUS_ROUTER as DocusaurusConfig['future']['experimental_router'];

const isDev = process.env.NODE_ENV === 'development';

// See https://docs.netlify.com/configure-builds/environment-variables/
const isProductionDeployment =
  !!process.env.NETLIFY && process.env.CONTEXT === 'production';

const isDeployPreview =
  !!process.env.NETLIFY && process.env.CONTEXT === 'deploy-preview';

// Netlify branch deploy like "docusaurus-v2"
const isBranchDeploy =
  !!process.env.NETLIFY && process.env.CONTEXT === 'branch-deploy';

// Used to debug production build issues faster
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const isBuildFast = !!process.env.BUILD_FAST;

const baseUrl = process.env.BASE_URL ?? '/';

// Special deployment for staging locales until they get enough translations
// https://app.netlify.com/sites/docusaurus-i18n-staging
// https://docusaurus-i18n-staging.netlify.app/
const isI18nStaging = process.env.I18N_STAGING === 'true';

// const isVersioningDisabled = !!process.env.DISABLE_VERSIONING ||
//   isI18nStaging;

const isRsdoctor = process.env.RSDOCTOR === 'true';

/*
const TwitterSvg =
  '<svg style="fill: #1DA1F2; vertical-align: middle; margin-left: 3px;" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"></path></svg>';
*/

const defaultLocale = 'en';

function getLocalizedConfigValue(key: keyof typeof ConfigLocalized) {
  const currentLocale = process.env.DOCUSAURUS_CURRENT_LOCALE ?? defaultLocale;
  const values = ConfigLocalized[key];
  if (!values) {
    throw new Error(`Localized config key=${key} not found`);
  }
  const value = values[currentLocale] ?? values[defaultLocale];
  if (!value) {
    throw new Error(
      `Localized value for config key=${key} not found for both currentLocale=${currentLocale} or defaultLocale=${defaultLocale}`,
    );
  }
  return value;
}

// By default, we don't want to run "git log" commands on i18n sites
// This makes localized sites build much slower on Netlify
// See also https://github.com/facebook/docusaurus/issues/11208
const showLastUpdate = process.env.DOCUSAURUS_CURRENT_LOCALE === defaultLocale;

export default async function createConfigAsync(): Promise<Config> {
  return {
    title: 'XT API',
    tagline: getLocalizedConfigValue('tagline'),
    organizationName: 'facebook',
    projectName: 'XT API',
    baseUrl,
    baseUrlIssueBanner: true,
    url: 'https://docusaurus.io',
    future: {
      v4: !isSlower, // Not accurate, but good enough
      experimental_faster: isSlower
        ? false
        : {
            // Verbose object: easier to independently test single attributes
            swcJsLoader: true,
            swcJsMinimizer: true,
            swcHtmlMinimizer: true,
            lightningCssMinimizer: true,
            mdxCrossCompilerCache: true,
            rspackBundler: true,
            rspackPersistentCache: true,
            ssgWorkerThreads: true,
          },
      experimental_storage: {
        namespace: true,
      },
      experimental_router: router,
    },
    // Dogfood both settings:
    // - force trailing slashes for deploy previews
    // - avoid trailing slashes in prod
    trailingSlash: isDeployPreview,
    stylesheets: [
      {
        href: '/katex/katex.min.css',
        type: 'text/css',
      },
    ],
    scripts: [
      {
        src: '/js/product-dropdown.js',
        async: true,
      },
    ],
    i18n: {
      defaultLocale,

      locales: (() => {
        if (isDeployPreview || isBranchDeploy) {
          // Deploy preview and branch deploys: keep them fast!
          return [defaultLocale];
        }
        if (isI18nStaging) {
          // Staging locales: https://docusaurus-i18n-staging.netlify.app/
          return [defaultLocale, 'ja'];
        }
        // Production locales
        return [defaultLocale, 'fr', 'pt-BR', 'ko', 'zh-CN'];
      })(),
    },
    markdown: {
      format: 'detect',
      mermaid: true,
      hooks: {
        onBrokenMarkdownLinks: 'warn',
      },
      mdx1Compat: {
        // comments: false,
      },
      remarkRehypeOptions: {
        footnoteLabel: getLocalizedConfigValue('remarkRehypeOptions_footnotes'),
      },
      parseFrontMatter: async (params) => {
        const result = await params.defaultParseFrontMatter(params);
        return {
          ...result,
          frontMatter: dogfoodingTransformFrontMatter(result.frontMatter),
        };
      },
      preprocessor: ({filePath, fileContent}) => {
        let result = fileContent;

        // This fixes Crowdin bug altering MDX comments on i18n sites...
        // https://github.com/facebook/docusaurus/pull/9220
        result = result.replaceAll('{/_', '{/*');
        result = result.replaceAll('_/}', '*/}');

        const showDevLink = false;

        if (isDev && showDevLink) {
          const isPartial = path.basename(filePath).startsWith('_');
          if (!isPartial) {
            // "vscode://file/${projectPath}${filePath}:${line}:${column}",
            // "webstorm://open?file=${projectPath}${filePath}&line=${line}&column=${column}",
            const vscodeLink = `vscode://file/${filePath}`;
            const webstormLink = `webstorm://open?file=${filePath}`;
            const intellijLink = `idea://open?file=${filePath}`;
            result = `${result}\n\n---\n\n**DEV**: open this file in [VSCode](<${vscodeLink}>) | [WebStorm](<${webstormLink}>) | [IntelliJ](<${intellijLink}>)\n`;
          }
        }

        return result;
      },
    },
    onBrokenLinks: 'warn',
    onBrokenAnchors: 'warn',
    favicon: 'img/docusaurus.ico',
    customFields: {
      crashTest,
      isDeployPreview,
      description:
        'An optimized site generator in React. Docusaurus helps you to move fast and write content. Build documentation websites, blogs, marketing pages, and more.',
      announcedVersion,
    },
    staticDirectories: [
      'static',
      path.join(__dirname, '_dogfooding/_asset-tests'),
      // Adding a non-existent static directory. If user deleted `static`
      // without specifying `staticDirectories: []`, build should still work
      path.join(__dirname, '_dogfooding/non-existent'),
    ],
    themes: [
      'live-codeblock',
      ['@docusaurus/theme-search-algolia', {id: 'search-algolia'}],
      ...dogfoodingThemeInstances,
    ],
    plugins: [
      function disableExpensiveBundlerOptimizationPlugin() {
        return {
          name: 'disable-expensive-bundler-optimizations',
          configureWebpack(_config, isServer) {
            // This optimization is expensive and only reduces by 3% the JS
            // Let's skip it for local and deploy preview builds
            // See also https://github.com/facebook/docusaurus/discussions/11199
            return {
              optimization: {
                concatenateModules: isProductionDeployment ? !isServer : false,
              },
            };
          },
        };
      },
      isRsdoctor && [
        'rsdoctor',
        {
          rsdoctorOptions: {
            disableTOSUpload: true,
            supports: {
              // https://rsdoctor.dev/config/options/options#generatetilegraph
              generateTileGraph: true,
            },
            linter: {
              // See https://rsdoctor.dev/guide/usage/rule-config
              rules: {
                'ecma-version-check': 'off',
                'duplicate-package': 'off',
              },
            },
          },
        },
      ],
      [
        './src/plugins/changelog/index.ts',
        {
          blogTitle: 'Docusaurus changelog',
          // Not useful, but permits to run git commands earlier
          // Otherwise the sitemap plugin will run them in postBuild()
          showLastUpdateAuthor: showLastUpdate,
          showLastUpdateTime: showLastUpdate,
          blogDescription:
            'Keep yourself up-to-date about new features in every release',
          blogSidebarCount: 'ALL',
          blogSidebarTitle: 'Changelog',
          routeBasePath: '/changelog',
          showReadingTime: false,
          postsPerPage: 20,
          archiveBasePath: null,
          authorsMapPath: 'authors.json',
          feedOptions: {
            type: 'all',
            title: 'Docusaurus changelog',
            description:
              'Keep yourself up-to-date about new features in every release',
            copyright: `Copyright © ${new Date().getFullYear()} Facebook, Inc.`,
            language: defaultLocale,
          },
          onInlineAuthors: 'warn',
        },
      ],
      [
        'content-docs',
        {
          id: 'community',
          path: 'community',
          routeBasePath: 'community',
          editUrl: ({locale, versionDocsDirPath, docPath}) => {
            if (locale !== defaultLocale) {
              return `https://crowdin.com/project/docusaurus-v2/${locale}`;
            }
            return `https://github.com/facebook/docusaurus/edit/main/website/${versionDocsDirPath}/${docPath}`;
          },
          remarkPlugins: [npm2yarn],
          editCurrentVersion: true,
          sidebarPath: './sidebarsCommunity.js',
          showLastUpdateAuthor: showLastUpdate,
          showLastUpdateTime: showLastUpdate,
        } satisfies DocsOptions,
      ],
      !process.env.DOCUSAURUS_SKIP_BUNDLING && [
        'client-redirects',
        {
          fromExtensions: ['html'],
          createRedirects(_routePath) {
            // Custom redirects can be added here if needed
            return [];
          },
          redirects: [
            // Redirect /docs to the new default page
            {
              from: ['/docs', '/docs/'],
              to: '/docs/index_overview/overview',
            },
            {
              from: ['/docs/support', '/docs/next/support'],
              to: '/community/support',
            },
            {
              from: ['/docs/team', '/docs/next/team'],
              to: '/community/team',
            },
            {
              from: ['/docs/resources', '/docs/next/resources'],
              to: '/community/resources',
            },
            {
              from: '/docs/api/misc/docusaurus-init',
              to: '/docs/api/misc/create-docusaurus',
            },
            ...dogfoodingRedirects,
          ],
        } satisfies ClientRedirectsOptions,
      ],
      [
        'ideal-image',
        {
          quality: 70,
          max: 1030,
          min: 640,
          steps: 2,
          // Use false to debug, but it incurs huge perf costs
          disableInDev: true,
        } satisfies IdealImageOptions,
      ],
      // PWA plugin temporarily disabled due to missing PwaReloadPopup component
      // [
      //   'pwa',
      //   {
      //     // debug: isDeployPreview,
      //     offlineModeActivationStrategies: [
      //       'appInstalled',
      //       'standalone',
      //       'queryString',
      //     ],
      //     // swRegister: false,
      //     swCustom: require.resolve('./src/sw.js'),
      //     // TODO make it possible to use relative path
      //     pwaHead: [
      //       {
      //         tagName: 'link',
      //         rel: 'icon',
      //         href: 'img/docusaurus.png',
      //       },
      //       {
      //         tagName: 'link',
      //         rel: 'manifest',
      //         href: 'manifest.json',
      //       },
      //       {
      //         tagName: 'meta',
      //         name: 'theme-color',
      //         content: 'rgb(37, 194, 160)',
      //       },
      //       {
      //         tagName: 'meta',
      //         name: 'apple-mobile-web-app-capable',
      //         content: 'yes',
      //       },
      //       {
      //         tagName: 'meta',
      //         name: 'apple-mobile-web-app-status-bar-style',
      //         content: '#000',
      //       },
      //       {
      //         tagName: 'link',
      //         rel: 'apple-touch-icon',
      //         href: 'img/docusaurus.png',
      //       },
      //       {
      //         tagName: 'link',
      //         rel: 'mask-icon',
      //         href: 'img/docusaurus.png',
      //         color: 'rgb(62, 204, 94)',
      //       },
      //       {
      //         tagName: 'meta',
      //         name: 'msapplication-TileImage',
      //         content: 'img/docusaurus.png',
      //       },
      //       {
      //         tagName: 'meta',
      //         name: 'msapplication-TileColor',
      //         content: '#000',
      //       },
      //     ],
      //   },
      // ],
      '@docusaurus/theme-mermaid',
      './src/plugins/featureRequests/FeatureRequestsPlugin.js',
      ...dogfoodingPluginInstances,
    ],
    presets: [
      [
        'classic',
        {
          debug: true, // force debug plugin usage
          docs: {
            // routeBasePath: '/',
            path: 'docs',
            sidebarPath: 'sidebars.ts',
            // sidebarCollapsible: false,
            // sidebarCollapsed: true,
            editUrl: ({locale, docPath}) => {
              if (locale !== defaultLocale) {
                return `https://crowdin.com/project/docusaurus-v2/${locale}`;
              }
              // We want users to submit updates to the upstream/next version!
              // Otherwise we risk losing the update on the next release.
              const nextVersionDocsDirPath = 'docs';
              return `https://github.com/facebook/docusaurus/edit/main/website/${nextVersionDocsDirPath}/${docPath}`;
            },
            admonitions: {
              keywords: ['my-custom-admonition'],
            },
            showLastUpdateAuthor: showLastUpdate,
            showLastUpdateTime: showLastUpdate,
            remarkPlugins: [[npm2yarn, {sync: true}], remarkMath, configTabs],
            rehypePlugins: [rehypeKatex],
            // disableVersioning: isVersioningDisabled,
            disableVersioning: true,

            lastVersion: 'current',

            onlyIncludeVersions: ['current'],
            versions: {
              current: {
                label: `${getNextVersionName()} 🚧`,
              },
            },
          },
          blog: {
            // routeBasePath: '/',
            path: 'blog',
            showLastUpdateAuthor: showLastUpdate,
            showLastUpdateTime: showLastUpdate,
            editUrl: ({locale, blogDirPath, blogPath}) => {
              if (locale !== defaultLocale) {
                return `https://crowdin.com/project/docusaurus-v2/${locale}`;
              }
              return `https://github.com/facebook/docusaurus/edit/main/website/${blogDirPath}/${blogPath}`;
            },
            remarkPlugins: [npm2yarn],
            postsPerPage: 5,
            feedOptions: {
              type: 'all',
              description:
                'Keep up to date with upcoming Docusaurus releases and articles by following our feed!',
              copyright: `Copyright © ${new Date().getFullYear()} Facebook, Inc.`,
              xslt: true,
            },
            blogTitle: 'Docusaurus blog',
            blogDescription: 'Read blog posts about Docusaurus from the team',
            blogSidebarCount: 'ALL',
            blogSidebarTitle: 'All our posts',
            onUntruncatedBlogPosts:
              process.env.DOCUSAURUS_CURRENT_LOCALE !== defaultLocale
                ? 'warn'
                : 'throw',
            onInlineTags:
              process.env.DOCUSAURUS_CURRENT_LOCALE !== defaultLocale
                ? 'warn'
                : 'throw',
          } satisfies BlogOptions,
          pages: {
            remarkPlugins: [npm2yarn],
            editUrl: ({locale, pagesPath}) => {
              if (locale !== defaultLocale) {
                return `https://crowdin.com/project/docusaurus-v2/${locale}`;
              }
              return `https://github.com/facebook/docusaurus/edit/main/website/src/pages/${pagesPath}`;
            },
            showLastUpdateAuthor: showLastUpdate,
            showLastUpdateTime: showLastUpdate,
          } satisfies PageOptions,
          theme: {
            customCss: [
              './src/css/custom.css',
              // relative paths are relative to site dir
              './_dogfooding/dogfooding.css',
            ],
          },
          gtag: !(isDeployPreview || isBranchDeploy)
            ? {
                trackingID: ['G-E5CR2Q1NRE'],
              }
            : undefined,
          sitemap: {
            ignorePatterns: isArgosBuild
              ? undefined
              : // Note: /tests/docs already has noIndex: true
                ['/tests/{blog,pages}/**'],
            lastmod: showLastUpdate ? 'date' : null,
            priority: null,
            changefreq: null,
          },
          svgr: {
            svgrConfig: {
              svgoConfig: undefined, // Use .svgo.config.js
            },
          },
        } satisfies Preset.Options,
      ],
    ],

    // ✅ 翻译配置文件
    i18n: {
      defaultLocale: 'en',
      locales: ['en', 'zh-Hans', 'ja'],
      localeConfigs: {
        en: {label: 'English'},
        'zh-Hans': {label: '简体中文'},
        ja: {label: '日本語'},
      },
    },

    themeConfig: {
      liveCodeBlock: {
        playgroundPosition: 'bottom',
      },
      docs: {
        sidebar: {
          hideable: true,
          autoCollapseCategories: true,
        },
      },
      colorMode: {
        defaultMode: 'light',
        disableSwitch: false,
        respectPrefersColorScheme: true,
      },
      // announcementBar: {
      //   id: `announcementBar-v${announcedVersion}`,
      //   // content: `⭐️ If you like Docusaurus, give it a star on <a target="_blank" rel="noopener noreferrer" href="https://github.com/facebook/docusaurus">GitHub</a> and follow us on <a target="_blank" rel="noopener noreferrer" href="https://x.com/docusaurus">X ${TwitterSvg}</a>`,
      //   content: ``,
      // },
      prism: {
        additionalLanguages: [
          'java',
          'latex',
          'haskell',
          'matlab',
          'PHp',
          'powershell',
          'bash',
          'diff',
          'json',
          'scss',
        ],
        magicComments: [
          {
            className: 'theme-code-block-highlighted-line',
            line: 'highlight-next-line',
            block: {start: 'highlight-start', end: 'highlight-end'},
          },
          {
            className: 'code-block-error-line',
            line: 'This will error',
          },
        ],
        theme: PrismLight,
        darkTheme: PrismDark,
      },
      image: 'img/docusaurus-social-card.jpg',
      // metadata: [{name: 'twitter:card', content: 'summary'}],
      algolia: {
        appId: 'GTNEYZMA9V',
        apiKey: '94dde6ff0f8c11017908f21fab41a06b',
        indexName: 'xt_api_docs',
        contextualSearch: false,
        searchParameters: {
          facetFilters: [], // 清空默认的过滤器
        },
        searchPagePath: 'search',
      },
      navbar: {
        hideOnScroll: true,
        title: '',
        logo: {
          alt: '',
          src: 'img/xtlogo.png',
          srcDark: 'img/xtlogo.png',
          width: 85,
          height: 36,
        },
        items: [
          {
            type: 'dropdown',
            position: 'left',
            label: 'Product',
            items: [
              {
                type: 'html',
                value:
                  '<div style="padding: 0; width: 100%; background: white; border-radius: 8px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);"><div style="display: flex; min-height: 480px;"><div style="width: 200px; background: #f9fafb; border-right: 1px solid #e5e7eb; padding: 0;"><div style="padding: 20px 0;"><div id="all-products-nav" style="padding: 12px 20px; background: #f3f4f6; cursor: pointer; font-weight: 600; font-size: 16px; color: #1f2937;" onclick="showCategory(\'AllProducts\')">All Products</div><div style="padding: 12px 20px; cursor: pointer; transition: background-color 0.2s; color: #6b7280; font-size: 14px;" onmouseover="this.style.backgroundColor=\'#f3f4f6\'; this.style.color=\'#1f2937\';" onmouseout="this.style.backgroundColor=\'transparent\'; this.style.color=\'#6b7280\';" onclick="showCategory(\'Index\')" data-category="Index">Index</div><div style="padding: 12px 20px; cursor: pointer; transition: background-color 0.2s; color: #6b7280; font-size: 14px;" onmouseover="this.style.backgroundColor=\'#f3f4f6\'; this.style.color=\'#1f2937\';" onmouseout="this.style.backgroundColor=\'transparent\'; this.style.color=\'#6b7280\';" onclick="showCategory(\'spot\')" data-category="spot">Spot Trading</div><div style="padding: 12px 20px; cursor: pointer; transition: background-color 0.2s; color: #6b7280; font-size: 14px;" onmouseover="this.style.backgroundColor=\'#f3f4f6\'; this.style.color=\'#1f2937\';" onmouseout="this.style.backgroundColor=\'transparent\'; this.style.color=\'#6b7280\';" onclick="showCategory(\'futures\')" data-category="futures">Futures Trading</div><div style="padding: 12px 20px; cursor: pointer; transition: background-color 0.2s; color: #6b7280; font-size: 14px;" onmouseover="this.style.backgroundColor=\'#f3f4f6\'; this.style.color=\'#1f2937\';" onmouseout="this.style.backgroundColor=\'transparent\'; this.style.color=\'#6b7280\';" onclick="showCategory(\'marginSpot\')" data-category="marginSpot">Margin Trading</div><div style="padding: 12px 20px; cursor: pointer; transition: background-color 0.2s; color: #6b7280; font-size: 14px;" onmouseover="this.style.backgroundColor=\'#f3f4f6\'; this.style.color=\'#1f2937\';" onmouseout="this.style.backgroundColor=\'transparent\'; this.style.color=\'#6b7280\';" onclick="showCategory(\'copyTrading\')" data-category="copyTrading">Copy Trading</div><div style="padding: 12px 20px; cursor: pointer; transition: background-color 0.2s; color: #6b7280; font-size: 14px;" onmouseover="this.style.backgroundColor=\'#f3f4f6\'; this.style.color=\'#1f2937\';" onmouseout="this.style.backgroundColor=\'transparent\'; this.style.color=\'#6b7280\';" onclick="showCategory(\'futuresCopy\')" data-category="futuresCopy">Futures Copy</div><div style="padding: 12px 20px; cursor: pointer; transition: background-color 0.2s; color: #6b7280; font-size: 14px;" onmouseover="this.style.backgroundColor=\'#f3f4f6\'; this.style.color=\'#1f2937\';" onmouseout="this.style.backgroundColor=\'transparent\'; this.style.color=\'#6b7280\';" onclick="showCategory(\'tradingThirdParty\')" data-category="tradingThirdParty">Trading Third Party</div><div style="padding: 12px 20px; cursor: pointer; transition: background-color 0.2s; color: #6b7280; font-size: 14px;" onmouseover="this.style.backgroundColor=\'#f3f4f6\'; this.style.color=\'#1f2937\';" onmouseout="this.style.backgroundColor=\'transparent\'; this.style.color=\'#6b7280\';" onclick="showCategory(\'userCenter\')" data-category="userCenter">User Center</div></div></div><div style="flex: 1; padding: 32px; background: white;"><div style="margin-bottom: 24px;"><h2 id="categoryTitle" style="margin: 0 0 8px 0; font-size: 24px; font-weight: 600; color: #1f2937;">All Products</h2><p id="categoryDesc" style="margin: 0; color: #6b7280; font-size: 14px;">Comprehensive API solutions for all your trading needs</p></div><div id="productsGrid" style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 24px;"><a id="index-content-link" href="/docs/index_overview/overview" style="text-decoration: none; color: inherit; transition: opacity 0.2s;" onmouseover="this.style.opacity=\'0.7\';" onmouseout="this.style.opacity=\'1\';"><div style="font-weight: 600; margin-bottom: 4px; font-size: 14px; color: #1f2937;">Index</div><div style="font-size: 12px; color: #6b7280;">Index APIs</div></a><a href="/docs/index_overview/index_overview_resource" style="text-decoration: none; color: inherit; transition: opacity 0.2s;" onmouseover="this.style.opacity=\'0.7\';" onmouseout="this.style.opacity=\'1\';"><div style="font-weight: 600; margin-bottom: 4px; font-size: 14px; color: #1f2937;">API Resources and Support</div><div style="font-size: 12px; color: #6b7280;">API Resources and Support</div></a><a href="/docs/spot/AccessDescription/RestApi" style="text-decoration: none; color: inherit; transition: opacity 0.2s;" onmouseover="this.style.opacity=\'0.7\';" onmouseout="this.style.opacity=\'1\';"><div style="font-weight: 600; margin-bottom: 4px; font-size: 14px; color: #1f2937;">Spot Trading</div><div style="font-size: 12px; color: #6b7280;">Spot Trading APIs</div></a><a href="/docs/futures/AccessDescription/apiDemo" style="text-decoration: none; color: inherit; transition: opacity 0.2s;" onmouseover="this.style.opacity=\'0.7\';" onmouseout="this.style.opacity=\'1\';"><div style="font-weight: 600; margin-bottom: 4px; font-size: 14px; color: #1f2937;">Futures Trading</div><div style="font-size: 12px; color: #6b7280;">Futures Trading APIs</div></a><a href="/docs/margin-spot/AccessDescription/RestApi" style="text-decoration: none; color: inherit; transition: opacity 0.2s;" onmouseover="this.style.opacity=\'0.7\';" onmouseout="this.style.opacity=\'1\';"><div style="font-weight: 600; margin-bottom: 4px; font-size: 14px; color: #1f2937;">Margin Trading</div><div style="font-size: 12px; color: #6b7280;">Margin Trading APIs</div></a><a href="/docs/copy-trading/Access Description/RestApi" style="text-decoration: none; color: inherit; transition: opacity 0.2s;" onmouseover="this.style.opacity=\'0.7\';" onmouseout="this.style.opacity=\'1\';"><div style="font-weight: 600; margin-bottom: 4px; font-size: 14px; color: #1f2937;">Copy Trading</div><div style="font-size: 12px; color: #6b7280;">Copy Trading API</div></a><a href="/docs/futures-copy/AccessDescription/RestApi" style="text-decoration: none; color: inherit; transition: opacity 0.2s;" onmouseover="this.style.opacity=\'0.7\';" onmouseout="this.style.opacity=\'1\';"><div style="font-weight: 600; margin-bottom: 4px; font-size: 14px; color: #1f2937;">Futures Copy</div><div style="font-size: 12px; color: #6b7280;">Futures Copy API</div></a><a href="/docs/trading-third-party/AccessDescription/RestApi" style="text-decoration: none; color: inherit; transition: opacity 0.2s;" onmouseover="this.style.opacity=\'0.7\';" onmouseout="this.style.opacity=\'1\';"><div style="font-weight: 600; margin-bottom: 4px; font-size: 14px; color: #1f2937;">Trading Third Party</div><div style="font-size: 12px; color: #6b7280;">Trading Third Party API</div></a><a href="/docs/user-center/AccessDescription/RestApi" style="text-decoration: none; color: inherit; transition: opacity 0.2s;" onmouseover="this.style.opacity=\'0.7\';" onmouseout="this.style.opacity=\'1\';"><div style="font-weight: 600; margin-bottom: 4px; font-size: 14px; color: #1f2937;">User Center</div><div style="font-size: 12px; color: #6b7280;">User Center API</div></a><a href="/docs/spot/Balance/GetCurrencyInfo" style="text-decoration: none; color: inherit; transition: opacity 0.2s;" onmouseover="this.style.opacity=\'0.7\';" onmouseout="this.style.opacity=\'1\';"><div style="font-weight: 600; margin-bottom: 4px; font-size: 14px; color: #1f2937;">Balance</div><div style="font-size: 12px; color: #6b7280;">Balance APIs</div></a><a href="/docs/spot/Deposit&Withdrawal/GetSupportedCurrencies" style="text-decoration: none; color: inherit; transition: opacity 0.2s;" onmouseover="this.style.opacity=\'0.7\';" onmouseout="this.style.opacity=\'1\';"><div style="font-weight: 600; margin-bottom: 4px; font-size: 14px; color: #1f2937;">Deposit&Withdrawal</div><div style="font-size: 12px; color: #6b7280;">Deposit&Withdrawal APIs</div></a><a href="/docs/spot/Market/GetServerTime" style="text-decoration: none; color: inherit; transition: opacity 0.2s;" onmouseover="this.style.opacity=\'0.7\';" onmouseout="this.style.opacity=\'1\';"><div style="font-weight: 600; margin-bottom: 4px; font-size: 14px; color: #1f2937;">Market</div><div style="font-size: 12px; color: #6b7280;">Market APIs</div></a><a href="/docs/spot/Order/PlaceOrder" style="text-decoration: none; color: inherit; transition: opacity 0.2s;" onmouseover="this.style.opacity=\'0.7\';" onmouseout="this.style.opacity=\'1\';"><div style="font-weight: 600; margin-bottom: 4px; font-size: 14px; color: #1f2937;">Order</div><div style="font-size: 12px; color: #6b7280;">Order APIs</div></a><a href="/docs/spot/Trade/GetTradeHistory" style="text-decoration: none; color: inherit; transition: opacity 0.2s;" onmouseover="this.style.opacity=\'0.7\';" onmouseout="this.style.opacity=\'1\';"><div style="font-weight: 600; margin-bottom: 4px; font-size: 14px; color: #1f2937;">Trade</div><div style="font-size: 12px; color: #6b7280;">Trade APIs</div></a><a href="/docs/spot/Transfer/InternalTransfer" style="text-decoration: none; color: inherit; transition: opacity 0.2s;" onmouseover="this.style.opacity=\'0.7\';" onmouseout="this.style.opacity=\'1\';"><div style="font-weight: 600; margin-bottom: 4px; font-size: 14px; color: #1f2937;">Transfer</div><div style="font-size: 12px; color: #6b7280;">Transfer APIs</div></a><a href="/docs/spot/WebSocket_Private/RequestMessageFormat" style="text-decoration: none; color: inherit; transition: opacity 0.2s;" onmouseover="this.style.opacity=\'0.7\';" onmouseout="this.style.opacity=\'1\';"><div style="font-weight: 600; margin-bottom: 4px; font-size: 14px; color: #1f2937;">WebSocket Private</div><div style="font-size: 12px; color: #6b7280;">WebSocket Private APIs</div></a><a href="/docs/spot/WebSocket_Public/subscribeParam" style="text-decoration: none; color: inherit; transition: opacity 0.2s;" onmouseover="this.style.opacity=\'0.7\';" onmouseout="this.style.opacity=\'1\';"><div style="font-weight: 600; margin-bottom: 4px; font-size: 14px; color: #1f2937;">WebSocket Public</div><div style="font-size: 12px; color: #6b7280;">WebSocket Public APIs</div></a><a href="/docs/futures/WEBSOCKET(V2)/Request message format" style="text-decoration: none; color: inherit; transition: opacity 0.2s;" onmouseover="this.style.opacity=\'0.7\';" onmouseout="this.style.opacity=\'1\';"><div style="font-weight: 600; margin-bottom: 4px; font-size: 14px; color: #1f2937;">Futures WebSocket</div><div style="font-size: 12px; color: #6b7280;">Futures WebSocket APIs</div></a><a href="/docs/margin-spot/Balance/GetMarginAccount" style="text-decoration: none; color: inherit; transition: opacity 0.2s;" onmouseover="this.style.opacity=\'0.7\';" onmouseout="this.style.opacity=\'1\';"><div style="font-weight: 600; margin-bottom: 4px; font-size: 14px; color: #1f2937;">Margin Balance</div><div style="font-size: 12px; color: #6b7280;">Margin Balance APIs</div></a><a href="/docs/copy-trading/Account/GetAccountInfo" style="text-decoration: none; color: inherit; transition: opacity 0.2s;" onmouseover="this.style.opacity=\'0.7\';" onmouseout="this.style.opacity=\'1\';"><div style="font-weight: 600; margin-bottom: 4px; font-size: 14px; color: #1f2937;">Copy Account</div><div style="font-size: 12px; color: #6b7280;">Copy Account APIs</div></a></div></div></div></div>',
              },
            ],
          },

          // Custom item for dogfooding: only displayed in /tests/ routes
          {
            type: 'custom-dogfood-navbar-item',
            content: '😉',
          },
          // Right side items
          {
            type: 'search',
            position: 'right',
          },
          {
            type: 'localeDropdown',
            position: 'right',
            dropdownItemsAfter: [
              {
                type: 'html',
                value: '<hr style="margin: 0.3rem 0;">',
              },
              {
                href: 'https://github.com/facebook/docusaurus/issues/3526',
                label: 'Help Us Translate',
              },
            ],
          },

          {
            href: 'https://github.com/facebook/docusaurus',
            position: 'right',
            className: 'header-github-link',
            'aria-label': 'GitHub repository',
          },
        ]
          // TODO fix type
          .filter(Boolean) as NonNullable<
          Preset.ThemeConfig['navbar']
        >['items'],
      },
      // footer: {
      //   style: 'dark',
      //   links: [
      //     {
      //       title: 'Learn',
      //       items: [
      //         {
      //           label: 'Introduction',
      //           to: 'docs',
      //         },
      //         {
      //           label: 'Installation',
      //           to: 'docs/installation',
      //         },
      //         {
      //           label: 'Migration from v1 to v2',
      //           to: 'docs/migration',
      //         },
      //       ],
      //     },
      //     {
      //       title: 'Community',
      //       items: [
      //         {
      //           label: 'Stack Overflow',
      //           href: 'https://stackoverflow.com/questions/tagged/docusaurus',
      //         },
      //         {
      //           label: 'Feature Requests',
      //           to: '/feature-requests',
      //         },
      //         {
      //           label: 'Discord',
      //           href: 'https://discordapp.com/invite/docusaurus',
      //         },
      //         {
      //           label: 'Help',
      //           to: '/community/support',
      //         },
      //       ],
      //     },
      //     {
      //       title: 'More',
      //       items: [
      //         {
      //           label: 'Blog',
      //           to: 'blog',
      //         },
      //         {
      //           label: 'Changelog',
      //           to: '/changelog',
      //         },
      //         {
      //           label: 'GitHub',
      //           href: 'https://github.com/facebook/docusaurus',
      //         },
      //         {
      //           label: 'X',
      //           href: 'https://x.com/docusaurus',
      //         },
      //         {
      //           html: `
      //           <a href="https://www.netlify.com"
      //              target="_blank" rel="noreferrer noopener"
      //              aria-label="Deploys by Netlify">
      //             <img src="/img/footer/badge-netlify.svg"
      //                  alt="Deploys by Netlify" width="114" height="51" />
      //           </a>
      //         `,
      //         },
      //         {
      //           html: `
      //           <a href="https://argos-ci.com"
      //              target="_blank" rel="noreferrer noopener"
      //              aria-label="Covered by Argos">
      //             <img src="/img/footer/badge-argos.svg"
      //                  alt="Covered by Argos" width="133" height="20" />
      //           </a>
      //         `,
      //         },
      //       ],
      //     },
      //     {
      //       title: 'Legal',
      //       className: 'footer-column-legal',
      //       // Don't remove the privacy and terms, it's a legal requirement.
      //       items: [
      //         {
      //           label: 'Privacy',
      //           className: 'footer-item-privacy',
      //           href: 'https://opensource.facebook.com/legal/privacy/',
      //         },
      //         {
      //           label: 'Terms',
      //           href: 'https://opensource.facebook.com/legal/terms/',
      //         },
      //         {
      //           label: 'Cookie Policy',
      //           href: 'https://opensource.facebook.com/legal/cookie-policy/',
      //         },
      //       ],
      //     },
      //   ],
      //   logo: {
      //     alt: 'Meta Open Source Logo',
      //     src: '/img/meta_opensource_logo_negative.svg',
      //     href: 'https://opensource.fb.com',
      //   },
      //   copyright: `Copyright © ${new Date().getFullYear()} Meta Platforms,
      //              Inc. Built with Docusaurus.`,
      // },
    } satisfies Preset.ThemeConfig,
  } satisfies Config;
}
