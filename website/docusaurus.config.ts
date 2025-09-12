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
  dogfoodingTransformFrontMatter,
  isArgosBuild,
} from './_dogfooding/dogfooding.config';

import ConfigLocalized from './docusaurus.config.localized.json';

import PrismLight from './src/utils/prismLight';
import PrismDark from './src/utils/prismDark';

import type {Config} from '@docusaurus/types';

// 导入中文配置
// import zhHansConfig from './docusaurus.config.zh-Hans';
import type * as Preset from '@docusaurus/preset-classic';
import type {Options as DocsOptions} from '@docusaurus/plugin-content-docs';
import type {Options as BlogOptions} from '@docusaurus/plugin-content-blog';
import type {Options as PageOptions} from '@docusaurus/plugin-content-pages';
import type {Options as IdealImageOptions} from '@docusaurus/plugin-ideal-image';
// import type {Options as ClientRedirectsOptions} from '@docusaurus/plugin-client-redirects';

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

// const router = process.env
//   .DOCUSAURUS_ROUTER as DocusaurusConfig['future']['experimental_router'];

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
// const isI18nStaging = process.env.I18N_STAGING === 'true';

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
      v4: false, // 禁用 v4 功能
      experimental_faster: false, // 完全禁用实验性优化以减少内存使用
      experimental_storage: {
        namespace: false, // 禁用存储命名空间
      },
      experimental_router: 'browser', // 使用浏览器路由
    },
    // 移除有问题的 webpack 配置
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
      defaultLocale: 'en',
      locales: ['en', 'zh-Hans'],
      path: 'i18n',
      localeConfigs: {
        en: {
          label: 'English',
          direction: 'ltr',
          htmlLang: 'en',
          calendar: 'gregory',
          path: 'en',
        },
        'zh-Hans': {
          label: '简体中文',
          direction: 'ltr',
          htmlLang: 'zh-Hans',
          calendar: 'gregory',
          path: 'zh-Hans',
        },
      },
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
      // Temporarily disabled client-redirects to fix build issues
      // !process.env.DOCUSAURUS_SKIP_BUNDLING && [
      //   'client-redirects',
      //   {
      //     fromExtensions: ['html'],
      //     createRedirects(_routePath) {
      //       // Custom redirects can be added here if needed
      //       return [];
      //     },
      //     redirects: [
      //       // Redirect /docs to the new default page
      //       {
      //         from: ['/docs', '/docs/'],
      //         to: '/docs/index_overview/overview',
      //       },
      //       {
      //         from: ['/docs/support', '/docs/next/support'],
      //         to: '/community/support',
      //       },
      //       {
      //         from: ['/docs/team', '/docs/next/team'],
      //         to: '/community/team',
      //       },
      //       {
      //         from: ['/docs/resources', '/docs/next/resources'],
      //         to: '/community/resources',
      //       },
      //       {
      //         from: '/docs/api/misc/docusaurus-init',
      //         to: '/docs/api/misc/create-docusaurus',
      //       },
      //       ...dogfoodingRedirects,
      //     ],
      //   } satisfies ClientRedirectsOptions,
      // ],
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
            // Enable i18n for docs
            id: 'default',
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

    // ✅ 翻译配置文件已合并到上面的 i18n 配置中

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
        searchPagePath: false,
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
                value: `
                <div style="padding: 0; width: 100%; background: white; min-width:90vw; border-radius: 8px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
                  <div style="display: flex; min-height: 400px; max-height: 80vh; overflow-y: auto;">
                    <!-- 左侧分类导航 -->
                    <div style="width: 200px; background: #f9fafb; border-right: 1px solid #e5e7eb; padding: 0;">
                      <div style="padding: 20px 0;">
                        <div id="all-products-nav"
                             style="padding: 12px 20px; background: #f3f4f6; cursor: pointer; font-weight: 600; font-size: 16px; color: #1f2937;"
                             onclick="showCategory('AllProducts')"
                             data-i18n="item.label.All Products">All Products</div>

                        <div style="padding: 12px 20px; cursor: pointer; transition: background-color 0.2s; color: #6b7280; font-size: 14px;"
                             onmouseover="this.style.backgroundColor='#f3f4f6'; this.style.color='#1f2937';"
                             onmouseout="this.style.backgroundColor='transparent'; this.style.color='#6b7280';"
                             onclick="showCategory('Index')"
                             data-category="Index"
                             data-i18n="item.label.Index">Index</div>

                        <div style="padding: 12px 20px; cursor: pointer; transition: background-color 0.2s; color: #6b7280; font-size: 14px;"
                             onmouseover="this.style.backgroundColor='#f3f4f6'; this.style.color='#1f2937';"
                             onmouseout="this.style.backgroundColor='transparent'; this.style.color='#6b7280';"
                             onclick="showCategory('spot')"
                             data-category="spot"
                             data-i18n="item.label.Spot Trading">Spot Trading</div>

                        <div style="padding: 12px 20px; cursor: pointer; transition: background-color 0.2s; color: #6b7280; font-size: 14px;"
                             onmouseover="this.style.backgroundColor='#f3f4f6'; this.style.color='#1f2937';"
                             onmouseout="this.style.backgroundColor='transparent'; this.style.color='#6b7280';"
                             onclick="showCategory('futures')"
                             data-category="futures"
                             data-i18n="item.label.Futures Trading">Futures Trading</div>

                        <div style="padding: 12px 20px; cursor: pointer; transition: background-color 0.2s; color: #6b7280; font-size: 14px;"
                             onmouseover="this.style.backgroundColor='#f3f4f6'; this.style.color='#1f2937';"
                             onmouseout="this.style.backgroundColor='transparent'; this.style.color='#6b7280';"
                             onclick="showCategory('marginSpot')"
                             data-category="marginSpot"
                             data-i18n="item.label.Margin Trading">Margin Trading</div>

                        <div style="padding: 12px 20px; cursor: pointer; transition: background-color 0.2s; color: #6b7280; font-size: 14px;"
                             onmouseover="this.style.backgroundColor='#f3f4f6'; this.style.color='#1f2937';"
                             onmouseout="this.style.backgroundColor='transparent'; this.style.color='#6b7280';"
                             onclick="showCategory('copyTrading')"
                             data-category="copyTrading"
                             data-i18n="item.label.Copy Trading">Copy Trading</div>

                        <div style="padding: 12px 20px; cursor: pointer; transition: background-color 0.2s; color: #6b7280; font-size: 14px;"
                             onmouseover="this.style.backgroundColor='#f3f4f6'; this.style.color='#1f2937';"
                             onmouseout="this.style.backgroundColor='transparent'; this.style.color='#6b7280';"
                             onclick="showCategory('futuresCopy')"
                             data-category="futuresCopy"
                             data-i18n="item.label.Futures Copy">Futures Copy</div>

                        <div style="padding: 12px 20px; cursor: pointer; transition: background-color 0.2s; color: #6b7280; font-size: 14px;"
                             onmouseover="this.style.backgroundColor='#f3f4f6'; this.style.color='#1f2937';"
                             onmouseout="this.style.backgroundColor='transparent'; this.style.color='#6b7280';"
                             onclick="showCategory('tradingThirdParty')"
                             data-category="tradingThirdParty"
                             data-i18n="item.label.Trading Third Party">Trading Third Party</div>

                        <div style="padding: 12px 20px; cursor: pointer; transition: background-color 0.2s; color: #6b7280; font-size: 14px;"
                             onmouseover="this.style.backgroundColor='#f3f4f6'; this.style.color='#1f2937';"
                             onmouseout="this.style.backgroundColor='transparent'; this.style.color='#6b7280';"
                             onclick="showCategory('userCenter')"
                             data-category="userCenter"
                             data-i18n="item.label.User Center">User Center</div>
                      </div>
                    </div>

                    <!-- 右侧内容区域 -->
                    <div style="flex: 1; padding: 32px; background: white;">
                      <div style="margin-bottom: 24px;">
                        <h2 id="categoryTitle"
                            style="margin: 0 0 8px 0; font-size: 24px; font-weight: 600; color: #1f2937;"
                            data-i18n="item.label.All Products">All Products</h2>
                        <p id="categoryDesc"
                           style="margin: 0; color: #6b7280; font-size: 14px;"
                           data-i18n="item.label.Comprehensive API solutions for all your trading needs">Comprehensive API solutions for all your trading needs</p>
                      </div>

                      <div id="productsGrid" style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 24px;">
                        <!-- 产品链接 -->
                        <a id="index-content-link"
                           href="/docs/index_overview/overview"
                           style="text-decoration: none; color: inherit; transition: opacity 0.2s;"
                           onmouseover="this.style.opacity='0.7';"
                           onmouseout="this.style.opacity='1';">
                          <div style="font-weight: 600; margin-bottom: 4px; font-size: 14px; color: #1f2937;"
                               data-i18n="item.label.Index">Index</div>
                          <div style="font-size: 12px; color: #6b7280;"
                               data-i18n="item.label.Index APIs">Index APIs</div>
                        </a>



                        <a href="/docs/spot/Access Description/BasicInformationOfTheInterface"
                           style="text-decoration: none; color: inherit; transition: opacity 0.2s;"
                           onmouseover="this.style.opacity='0.7';"
                           onmouseout="this.style.opacity='1';">
                          <div style="font-weight: 600; margin-bottom: 4px; font-size: 14px; color: #1f2937;"
                               data-i18n="item.label.Spot Trading">Spot Trading</div>
                          <div style="font-size: 12px; color: #6b7280;"
                               data-i18n="item.label.Spot Trading APIs">Spot Trading APIs</div>
                        </a>

                        <a href="/docs/futures/Access Description/ApiLibrary"
                           style="text-decoration: none; color: inherit; transition: opacity 0.2s;"
                           onmouseover="this.style.opacity='0.7';"
                           onmouseout="this.style.opacity='1';">
                          <div style="font-weight: 600; margin-bottom: 4px; font-size: 14px; color: #1f2937;"
                               data-i18n="item.label.Futures Trading">Futures Trading</div>
                          <div style="font-size: 12px; color: #6b7280;"
                               data-i18n="item.label.Futures Trading APIs">Futures Trading APIs</div>
                        </a>

                        <a href="/docs/margin-spot/Access Description/BasicInformationOfTheInterface"
                           style="text-decoration: none; color: inherit; transition: opacity 0.2s;"
                           onmouseover="this.style.opacity='0.7';"
                           onmouseout="this.style.opacity='1';">
                          <div style="font-weight: 600; margin-bottom: 4px; font-size: 14px; color: #1f2937;"
                               data-i18n="item.label.Margin Trading">Margin Trading</div>
                          <div style="font-size: 12px; color: #6b7280;"
                               data-i18n="item.label.Margin Trading APIs">Margin Trading APIs</div>
                        </a>

                        <a href="/docs/copy-trading/Access Description/BasicInformationOfTheInterface"
                           style="text-decoration: none; color: inherit; transition: opacity 0.2s;"
                           onmouseover="this.style.opacity='0.7';"
                           onmouseout="this.style.opacity='1';">
                          <div style="font-weight: 600; margin-bottom: 4px; font-size: 14px; color: #1f2937;"
                               data-i18n="item.label.Copy Trading">Copy Trading</div>
                          <div style="font-size: 12px; color: #6b7280;"
                               data-i18n="item.label.Copy Trading API">Copy Trading API</div>
                        </a>

                        <a href="/docs/futures-copy/Access Description/BasicInformationOfTheInterface"
                           style="text-decoration: none; color: inherit; transition: opacity 0.2s;"
                           onmouseover="this.style.opacity='0.7';"
                           onmouseout="this.style.opacity='1';">
                          <div style="font-weight: 600; margin-bottom: 4px; font-size: 14px; color: #1f2937;"
                               data-i18n="item.label.Futures Copy">Futures Copy</div>
                          <div style="font-size: 12px; color: #6b7280;"
                               data-i18n="item.label.Futures Copy API">Futures Copy API</div>
                        </a>

                        <a href="/docs/trading-third-party/Access Description/BasicInformationOfTheInterface"
                           style="text-decoration: none; color: inherit; transition: opacity 0.2s;"
                           onmouseover="this.style.opacity='0.7';"
                           onmouseout="this.style.opacity='1';">
                          <div style="font-weight: 600; margin-bottom: 4px; font-size: 14px; color: #1f2937;"
                               data-i18n="item.label.Trading Third Party">Trading Third Party</div>
                          <div style="font-size: 12px; color: #6b7280;"
                               data-i18n="item.label.Trading Third Party API">Trading Third Party API</div>
                        </a>

                        <a href="/docs/user-center/Access Description/BasicInformationOfTheInterface"
                           style="text-decoration: none; color: inherit; transition: opacity 0.2s;"
                           onmouseover="this.style.opacity='0.7';"
                           onmouseout="this.style.opacity='1';">
                          <div style="font-weight: 600; margin-bottom: 4px; font-size: 14px; color: #1f2937;"
                               data-i18n="item.label.User Center">User Center</div>
                          <div style="font-size: 12px; color: #6b7280;"
                               data-i18n="item.label.User Center API">User Center API</div>
                        </a>

                        <a href="/docs/spot/Balance/GetCurrencyInfo"
                           style="text-decoration: none; color: inherit; transition: opacity 0.2s;"
                           onmouseover="this.style.opacity='0.7';"
                           onmouseout="this.style.opacity='1';">
                          <div style="font-weight: 600; margin-bottom: 4px; font-size: 14px; color: #1f2937;"
                               data-i18n="item.label.Balance">Balance</div>
                          <div style="font-size: 12px; color: #6b7280;"
                               data-i18n="item.label.Balance APIs">Balance APIs</div>
                        </a>

                        <a href="/docs/spot/Deposit&Withdrawal/GetSupportedCurrencies"
                           style="text-decoration: none; color: inherit; transition: opacity 0.2s;"
                           onmouseover="this.style.opacity='0.7';"
                           onmouseout="this.style.opacity='1';">
                          <div style="font-weight: 600; margin-bottom: 4px; font-size: 14px; color: #1f2937;"
                               data-i18n="item.label.Deposit&Withdrawal">Deposit&Withdrawal</div>
                          <div style="font-size: 12px; color: #6b7280;"
                               data-i18n="item.label.Deposit&Withdrawal APIs">Deposit&Withdrawal APIs</div>
                        </a>

                        <a href="/docs/spot/Market/GetServerTime"
                           style="text-decoration: none; color: inherit; transition: opacity 0.2s;"
                           onmouseover="this.style.opacity='0.7';"
                           onmouseout="this.style.opacity='1';">
                          <div style="font-weight: 600; margin-bottom: 4px; font-size: 14px; color: #1f2937;"
                               data-i18n="item.label.Market">Market</div>
                          <div style="font-size: 12px; color: #6b7280;"
                               data-i18n="item.label.Market APIs">Market APIs</div>
                        </a>

                        <a href="/docs/spot/Order/PlaceOrder"
                           style="text-decoration: none; color: inherit; transition: opacity 0.2s;"
                           onmouseover="this.style.opacity='0.7';"
                           onmouseout="this.style.opacity='1';">
                          <div style="font-weight: 600; margin-bottom: 4px; font-size: 14px; color: #1f2937;"
                               data-i18n="item.label.Order">Order</div>
                          <div style="font-size: 12px; color: #6b7280;"
                               data-i18n="item.label.Order APIs">Order APIs</div>
                        </a>

                        <a href="/docs/spot/Trade/GetTradeHistory"
                           style="text-decoration: none; color: inherit; transition: opacity 0.2s;"
                           onmouseover="this.style.opacity='0.7';"
                           onmouseout="this.style.opacity='1';">
                          <div style="font-weight: 600; margin-bottom: 4px; font-size: 14px; color: #1f2937;"
                               data-i18n="item.label.Trade">Trade</div>
                          <div style="font-size: 12px; color: #6b7280;"
                               data-i18n="item.label.Trade APIs">Trade APIs</div>
                        </a>

                        <a href="/docs/spot/Transfer/InternalTransfer"
                           style="text-decoration: none; color: inherit; transition: opacity 0.2s;"
                           onmouseover="this.style.opacity='0.7';"
                           onmouseout="this.style.opacity='1';">
                          <div style="font-weight: 600; margin-bottom: 4px; font-size: 14px; color: #1f2937;"
                               data-i18n="item.label.Transfer">Transfer</div>
                          <div style="font-size: 12px; color: #6b7280;"
                               data-i18n="item.label.Transfer APIs">Transfer APIs</div>
                        </a>

                        <a href="/docs/spot/WebSocket Private/RequestMessageFormat"
                           style="text-decoration: none; color: inherit; transition: opacity 0.2s;"
                           onmouseover="this.style.opacity='0.7';"
                           onmouseout="this.style.opacity='1';">
                          <div style="font-weight: 600; margin-bottom: 4px; font-size: 14px; color: #1f2937;"
                               data-i18n="item.label.WebSocket Private">WebSocket Private</div>
                          <div style="font-size: 12px; color: #6b7280;"
                               data-i18n="item.label.WebSocket Private APIs">WebSocket Private APIs</div>
                        </a>

                        <a href="/docs/spot/WebSocket Public/subscribeParam"
                           style="text-decoration: none; color: inherit; transition: opacity 0.2s;"
                           onmouseover="this.style.opacity='0.7';"
                           onmouseout="this.style.opacity='1';">
                          <div style="font-weight: 600; margin-bottom: 4px; font-size: 14px; color: #1f2937;"
                               data-i18n="item.label.WebSocket Public">WebSocket Public</div>
                          <div style="font-size: 12px; color: #6b7280;"
                               data-i18n="item.label.WebSocket Public APIs">WebSocket Public APIs</div>
                        </a>

                        <a href="/docs/futures/WEBSOCKET(V2)/Request message format"
                           style="text-decoration: none; color: inherit; transition: opacity 0.2s;"
                           onmouseover="this.style.opacity='0.7';"
                           onmouseout="this.style.opacity='1';">
                          <div style="font-weight: 600; margin-bottom: 4px; font-size: 14px; color: #1f2937;"
                               data-i18n="item.label.Futures WebSocket">Futures WebSocket</div>
                          <div style="font-size: 12px; color: #6b7280;"
                               data-i18n="item.label.Futures WebSocket APIs">Futures WebSocket APIs</div>
                        </a>

                        <a href="/docs/margin-spot/Balance/GetMarginAccount"
                           style="text-decoration: none; color: inherit; transition: opacity 0.2s;"
                           onmouseover="this.style.opacity='0.7';"
                           onmouseout="this.style.opacity='1';">
                          <div style="font-weight: 600; margin-bottom: 4px; font-size: 14px; color: #1f2937;"
                               data-i18n="item.label.Margin Balance">Margin Balance</div>
                          <div style="font-size: 12px; color: #6b7280;"
                               data-i18n="item.label.Margin Balance APIs">Margin Balance APIs</div>
                        </a>

                        <a href="/docs/copy-trading/Account/GetAccountInfo"
                           style="text-decoration: none; color: inherit; transition: opacity 0.2s;"
                           onmouseover="this.style.opacity='0.7';"
                           onmouseout="this.style.opacity='1';">
                          <div style="font-weight: 600; margin-bottom: 4px; font-size: 14px; color: #1f2937;"
                               data-i18n="item.label.Copy Account">Copy Account</div>
                          <div style="font-size: 12px; color: #6b7280;"
                               data-i18n="item.label.Copy Account APIs">Copy Account APIs</div>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

<script>
  // 产品分类数据
  const categoryData = {
    'AllProducts': {
      title: 'All Products',
      titleZh: '所有产品',
      desc: 'Comprehensive API solutions for all your trading needs',
      descZh: '为您的所有交易需求提供全面的 API 解决方案',
      products: [
        { title: 'Index', titleZh: '指数', subtitle: 'Index APIs', subtitleZh: '指数 API', href: '/docs/index_overview/overview' },
        { title: 'Spot Trading', titleZh: '现货交易', subtitle: 'Spot Trading APIs', subtitleZh: '现货交易 API', href: '/docs/spot/Access Description/BasicInformationOfTheInterface' },
        { title: 'Futures Trading', titleZh: '期货交易', subtitle: 'Futures Trading APIs', subtitleZh: '期货交易 API', href: '/docs/futures/Access Description/BasicInformationOfTheInterface' },
        { title: 'Margin Trading', titleZh: '杠杆交易', subtitle: 'Margin Trading APIs', subtitleZh: '杠杆交易 API', href: '/docs/margin-spot/Access Description/BasicInformationOfTheInterface' },
        { title: 'Copy Trading', titleZh: '跟单交易', subtitle: 'Copy Trading API', subtitleZh: '跟单交易 API', href: '/docs/copy-trading/Access Description/BasicInformationOfTheInterface' },
        { title: 'Futures Copy', titleZh: '期货跟单', subtitle: 'Futures Copy API', subtitleZh: '期货跟单 API', href: '/docs/futures-copy/Access Description/BasicInformationOfTheInterface' },
        { title: 'Trading Third Party', titleZh: '第三方交易', subtitle: 'Trading Third Party API', subtitleZh: '第三方交易 API', href: '/docs/trading-third-party/Access Description/BasicInformationOfTheInterface' },
        { title: 'User Center', titleZh: '用户中心', subtitle: 'User Center API', subtitleZh: '用户中心 API', href: '/docs/user-center/Access Description/BasicInformationOfTheInterface' },
        { title: 'Balance', titleZh: '余额', subtitle: 'Balance APIs', subtitleZh: '余额 API', href: '/docs/spot/Balance/GetCurrencyInfo' },
        { title: 'Deposit&Withdrawal', titleZh: '充提', subtitle: 'Deposit&Withdrawal APIs', subtitleZh: '充提 API', href: '/docs/spot/Deposit&Withdrawal/GetSupportedCurrencies' },
        { title: 'Market', titleZh: '市场', subtitle: 'Market APIs', subtitleZh: '市场 API', href: '/docs/spot/Market/GetServerTime' },
        { title: 'Order', titleZh: '订单', subtitle: 'Order APIs', subtitleZh: '订单 API', href: '/docs/spot/Order/PlaceOrder' },
        { title: 'Trade', titleZh: '交易', subtitle: 'Trade APIs', subtitleZh: '交易 API', href: '/docs/spot/Trade/GetTradeHistory' },
        { title: 'Transfer', titleZh: '转账', subtitle: 'Transfer APIs', subtitleZh: '转账 API', href: '/docs/spot/Transfer/InternalTransfer' },
        { title: 'WebSocket Private', titleZh: 'WebSocket 私有', subtitle: 'WebSocket Private APIs', subtitleZh: 'WebSocket 私有 API', href: '/docs/spot/WebSocket Private/RequestMessageFormat' },
        { title: 'WebSocket Public', titleZh: 'WebSocket 公共', subtitle: 'WebSocket Public APIs', subtitleZh: 'WebSocket 公共 API', href: '/docs/spot/WebSocket Public/subscribeParam' },
        { title: 'Futures WebSocket', titleZh: '期货 WebSocket', subtitle: 'Futures WebSocket APIs', subtitleZh: '期货 WebSocket API', href: '/docs/futures/WEBSOCKET(V2)/Request message format' },
        { title: 'Margin Balance', titleZh: '杠杆余额', subtitle: 'Margin Balance APIs', subtitleZh: '杠杆余额 API', href: '/docs/margin-spot/Balance/GetMarginAccount' },
        { title: 'Copy Account', titleZh: '跟单账户', subtitle: 'Copy Account APIs', subtitleZh: '跟单账户 API', href: '/docs/copy-trading/Account/GetAccountInfo' }
      ]
    },
    'Index': {
      title: 'Index',
      titleZh: '指数',
      desc: 'Index trading and market data APIs',
      descZh: '指数交易和市场数据 API',
      products: [
        { title: 'Index', titleZh: '指数', subtitle: 'Index APIs', subtitleZh: '指数 API', href: '/docs/index_overview/overview' },
     ]
    },
    'spot': {
      title: 'Spot Trading',
      titleZh: '现货交易',
      desc: 'Spot trading APIs and market data',
      descZh: '现货交易 API 和市场数据',
      products: [
        { title: 'Spot Trading', titleZh: '现货交易', subtitle: 'Spot Trading APIs', subtitleZh: '现货交易 API', href: '/docs/spot/Access Description/BasicInformationOfTheInterface' },
        { title: 'Balance', titleZh: '余额', subtitle: 'Balance APIs', subtitleZh: '余额 API', href: '/docs/spot/Balance/GetCurrencyInfo' },
        { title: 'Deposit&Withdrawal', titleZh: '充提', subtitle: 'Deposit&Withdrawal APIs', subtitleZh: '充提 API', href: '/docs/spot/Deposit&Withdrawal/GetSupportedCurrencies' },
        { title: 'Market', titleZh: '市场', subtitle: 'Market APIs', subtitleZh: '市场 API', href: '/docs/spot/Market/GetServerTime' },
        { title: 'Order', titleZh: '订单', subtitle: 'Order APIs', subtitleZh: '订单 API', href: '/docs/spot/Order/PlaceOrder' },
        { title: 'Trade', titleZh: '交易', subtitle: 'Trade APIs', subtitleZh: '交易 API', href: '/docs/spot/Trade/GetTradeHistory' },
        { title: 'Transfer', titleZh: '转账', subtitle: 'Transfer APIs', subtitleZh: '转账 API', href: '/docs/spot/Transfer/InternalTransfer' },
        { title: 'WebSocket Private', titleZh: 'WebSocket 私有', subtitle: 'WebSocket Private APIs', subtitleZh: 'WebSocket 私有 API', href: '/docs/spot/WebSocket Private/RequestMessageFormat' },
        { title: 'WebSocket Public', titleZh: 'WebSocket 公共', subtitle: 'WebSocket Public APIs', subtitleZh: 'WebSocket 公共 API', href: '/docs/spot/WebSocket Public/subscribeParam' }
      ]
    },
    'futures': {
      title: 'Futures Trading',
      titleZh: '期货交易',
      desc: 'Futures trading APIs and derivatives',
      descZh: '期货交易 API 和衍生品',
      products: [
        { title: 'Futures Trading', titleZh: '期货交易', subtitle: 'Futures Trading APIs', subtitleZh: '期货交易 API', href: '/docs/futures/Access Description/BasicInformationOfTheInterface' },
        { title: 'Futures WebSocket', titleZh: '期货 WebSocket', subtitle: 'Futures WebSocket APIs', subtitleZh: '期货 WebSocket API', href: '/docs/futures/WEBSOCKET(V2)/Request message format' }
      ]
    },
    'marginSpot': {
      title: 'Margin Trading',
      titleZh: '杠杆交易',
      desc: 'Margin trading and leverage APIs',
      descZh: '杠杆交易和杠杆 API',
      products: [
        { title: 'Margin Trading', titleZh: '杠杆交易', subtitle: 'Margin Trading APIs', subtitleZh: '杠杆交易 API', href: '/docs/margin-spot/Access Description/BasicInformationOfTheInterface' },
        { title: 'Margin Balance', titleZh: '杠杆余额', subtitle: 'Margin Balance APIs', subtitleZh: '杠杆余额 API', href: '/docs/margin-spot/Balance/GetMarginAccount' }
      ]
    },
    'copyTrading': {
      title: 'Copy Trading',
      titleZh: '跟单交易',
      desc: 'Copy trading and social trading APIs',
      descZh: '跟单交易和社交交易 API',
      products: [
        { title: 'Copy Trading', titleZh: '跟单交易', subtitle: 'Copy Trading API', subtitleZh: '跟单交易 API', href: '/docs/copy-trading/Access Description/BasicInformationOfTheInterface' },
        { title: 'Copy Account', titleZh: '跟单账户', subtitle: 'Copy Account APIs', subtitleZh: '跟单账户 API', href: '/docs/copy-trading/Account/GetAccountInfo' }
      ]
    },
    'futuresCopy': {
      title: 'Futures Copy',
      titleZh: '期货跟单',
      desc: 'Futures copy trading APIs',
      descZh: '期货跟单交易 API',
      products: [
        { title: 'Futures Copy', titleZh: '期货跟单', subtitle: 'Futures Copy API', subtitleZh: '期货跟单 API', href: '/docs/futures-copy/Access Description/BasicInformationOfTheInterface' }
      ]
    },
    'tradingThirdParty': {
      title: 'Trading Third Party',
      titleZh: '第三方交易',
      desc: 'Third party trading integration APIs',
      descZh: '第三方交易集成 API',
      products: [
        { title: 'Trading Third Party', titleZh: '第三方交易', subtitle: 'Trading Third Party API', subtitleZh: '第三方交易 API', href: '/docs/trading-third-party/Access Description/BasicInformationOfTheInterface' }
      ]
    },
    'userCenter': {
      title: 'User Center',
      titleZh: '用户中心',
      desc: 'User management and account APIs',
      descZh: '用户管理和账户 API',
      products: [
        { title: 'User Center', titleZh: '用户中心', subtitle: 'User Center API', subtitleZh: '用户中心 API', href: '/docs/user-center/Access Description/BasicInformationOfTheInterface' }
      ]
    }
  };

  // 显示分类内容的函数
  function showCategory(categoryKey) {
    console.log('🔄 Showing category:', categoryKey);

    const category = categoryData[categoryKey];
    if (!category) {
      console.error('❌ Category not found:', categoryKey);
      return;
    }

    const locale = document.documentElement.lang || 'en';
    const isZh = locale === 'zh-Hans';

    console.log('🌐 Current locale:', locale, 'isZh:', isZh);

    // 更新标题和描述
    const titleElement = document.getElementById('categoryTitle');
    const descElement = document.getElementById('categoryDesc');

    if (titleElement) {
      const titleText = isZh ? category.titleZh : category.title;
      titleElement.textContent = titleText;
      console.log('📝 Updated title to:', titleText);
    }

    if (descElement) {
      const descText = isZh ? category.descZh : category.desc;
      descElement.textContent = descText;
      console.log('📝 Updated description to:', descText);
    }

    // 更新产品网格
    const productsGrid = document.getElementById('productsGrid');
    if (productsGrid) {
      let html = '';
      category.products.forEach(product => {
        const title = isZh ? product.titleZh : product.title;
        const subtitle = isZh ? product.subtitleZh : product.subtitle;

        console.log('�� Product:', product.title, '->', title, '|', product.subtitle, '->', subtitle);

        html += \`
          <a href="\${product.href}"
             style="text-decoration: none; color: inherit; transition: opacity 0.2s;"
             onmouseover="this.style.opacity='0.7';"
             onmouseout="this.style.opacity='1';">
            <div style="font-weight: 600; margin-bottom: 4px; font-size: 14px; color: #1f2937;">\${title}</div>
            <div style="font-size: 12px; color: #6b7280;">\${subtitle}</div>
          </a>
        \`;
      });

      productsGrid.innerHTML = html;
      console.log('✅ Updated products grid with', category.products.length, 'products');
    }

    // 更新左侧选中状态
    const allNavItems = document.querySelectorAll('[data-category]');
    allNavItems.forEach(item => {
      item.style.backgroundColor = 'transparent';
      item.style.color = '#6b7280';
    });

    const selectedItem = document.querySelector(\`[data-category="\${categoryKey}"]\`);
    if (selectedItem) {
      selectedItem.style.backgroundColor = '#f3f4f6';
      selectedItem.style.color = '#1f2937';
    }

    console.log('✅ Category updated successfully');
  }

  // 动态翻译函数
  function updateDropdownTranslations() {
    const locale = document.documentElement.lang || 'en';
    console.log('🔄 Updating translations for locale:', locale);

    const translations = {
      'en': {
        'item.label.All Products': 'All Products',
        'item.label.Index': 'Index',
        'item.label.Spot Trading': 'Spot Trading',
        'item.label.Futures Trading': 'Futures Trading',
        'item.label.Margin Trading': 'Margin Trading',
        'item.label.Copy Trading': 'Copy Trading',
        'item.label.Futures Copy': 'Futures Copy',
        'item.label.Trading Third Party': 'Trading Third Party',
        'item.label.User Center': 'User Center',
        'item.label.Balance': 'Balance',
        'item.label.Deposit&Withdrawal': 'Deposit&Withdrawal',
        'item.label.Market': 'Market',
        'item.label.Order': 'Order',
        'item.label.Trade': 'Trade',
        'item.label.Transfer': 'Transfer',
        'item.label.WebSocket Private': 'WebSocket Private',
        'item.label.WebSocket Public': 'WebSocket Public',
        'item.label.Futures WebSocket': 'Futures WebSocket',
        'item.label.Margin Balance': 'Margin Balance',
        'item.label.Copy Account': 'Copy Account',
        'item.label.Index APIs': 'Index APIs',
        'item.label.Spot Trading APIs': 'Spot Trading APIs',
        'item.label.Futures Trading APIs': 'Futures Trading APIs',
        'item.label.Margin Trading APIs': 'Margin Trading APIs',
        'item.label.Copy Trading API': 'Copy Trading API',
        'item.label.Futures Copy API': 'Futures Copy API',
        'item.label.Trading Third Party API': 'Trading Third Party API',
        'item.label.User Center API': 'User Center API',
        'item.label.Balance APIs': 'Balance APIs',
        'item.label.Deposit&Withdrawal APIs': 'Deposit&Withdrawal APIs',
        'item.label.Market APIs': 'Market APIs',
        'item.label.Order APIs': 'Order APIs',
        'item.label.Trade APIs': 'Trade APIs',
        'item.label.Transfer APIs': 'Transfer APIs',
        'item.label.WebSocket Private APIs': 'WebSocket Private APIs',
        'item.label.WebSocket Public APIs': 'WebSocket Public APIs',
        'item.label.Futures WebSocket APIs': 'Futures WebSocket APIs',
        'item.label.Margin Balance APIs': 'Margin Balance APIs',
        'item.label.Copy Account APIs': 'Copy Account APIs',
        'item.label.Comprehensive API solutions for all your trading needs': 'Comprehensive API solutions for all your trading needs'
      },
      'zh-Hans': {
        'item.label.All Products': '所有产品',
        'item.label.Index': '指数',
        'item.label.Spot Trading': '现货交易',
        'item.label.Futures Trading': '期货交易',
        'item.label.Margin Trading': '杠杆交易',
        'item.label.Copy Trading': '跟单交易',
        'item.label.Futures Copy': '期货跟单',
        'item.label.Trading Third Party': '第三方交易',
        'item.label.User Center': '用户中心',
        'item.label.Balance': '余额',
        'item.label.Deposit&Withdrawal': '充提',
        'item.label.Market': '市场',
        'item.label.Order': '订单',
        'item.label.Trade': '交易',
        'item.label.Transfer': '转账',
        'item.label.WebSocket Private': 'WebSocket 私有',
        'item.label.WebSocket Public': 'WebSocket 公共',
        'item.label.Futures WebSocket': '期货 WebSocket',
        'item.label.Margin Balance': '杠杆余额',
        'item.label.Copy Account': '跟单账户',
        'item.label.Index APIs': '指数 API',
        'item.label.Spot Trading APIs': '现货交易 API',
        'item.label.Futures Trading APIs': '期货交易 API',
        'item.label.Margin Trading APIs': '杠杆交易 API',
        'item.label.Copy Trading API': '跟单交易 API',
        'item.label.Futures Copy API': '期货跟单 API',
        'item.label.Trading Third Party API': '第三方交易 API',
        'item.label.User Center API': '用户中心 API',
        'item.label.Balance APIs': '余额 API',
        'item.label.Deposit&Withdrawal APIs': '充提 API',
        'item.label.Market APIs': '市场 API',
        'item.label.Order APIs': '订单 API',
        'item.label.Trade APIs': '交易 API',
        'item.label.Transfer APIs': '转账 API',
        'item.label.WebSocket Private APIs': 'WebSocket 私有 API',
        'item.label.WebSocket Public APIs': 'WebSocket 公共 API',
        'item.label.Futures WebSocket APIs': '期货 WebSocket API',
        'item.label.Margin Balance APIs': '杠杆余额 API',
        'item.label.Copy Account APIs': '跟单账户 API',
        'item.label.Comprehensive API solutions for all your trading needs': '为您的所有交易需求提供全面的 API 解决方案'
      }
    };

    const currentTranslations = translations[locale] || translations['en'];

    // 查找所有带有 data-i18n 属性的元素
    const elements = document.querySelectorAll('[data-i18n]');
    console.log('🔍 Found elements to translate:', elements.length);

    let translatedCount = 0;
    elements.forEach(element => {
      const key = element.getAttribute('data-i18n');
      if (currentTranslations[key]) {
        const oldText = element.textContent;
        element.textContent = currentTranslations[key];
        if (oldText !== currentTranslations[key]) {
          translatedCount++;
          console.log('✅ Translated:', key, '->', currentTranslations[key]);
        }
      }
    });
    console.log('📊 Total translated elements:', translatedCount);
  }

  // 使用 MutationObserver 监听 DOM 变化
  function setupDropdownObserver() {
    const observer = new MutationObserver(function(mutations) {
      let shouldUpdate = false;

      mutations.forEach(function(mutation) {
        // 检查是否有新节点添加
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach(function(node) {
            if (node.nodeType === 1) { // Element node
              // 检查是否包含菜单相关的元素
              if (node.querySelector && (
                node.querySelector('[data-i18n]') ||
                node.id === 'all-products-nav' ||
                node.classList.contains('navbar__item--dropdown') ||
                node.querySelector('#productsGrid')
              )) {
                shouldUpdate = true;
              }
            }
          });
        }

        // 检查属性变化（如显示/隐藏）
        if (mutation.type === 'attributes') {
          const target = mutation.target;
          if (target.classList && (
            target.classList.contains('navbar__item--dropdown') ||
            target.classList.contains('navbar__item--show')
          )) {
            shouldUpdate = true;
          }
        }
      });

      if (shouldUpdate) {
        console.log('🔄 DOM changed, updating translations...');
        setTimeout(updateDropdownTranslations, 100);
      }
    });

    // 开始观察
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['class', 'style']
    });

    console.log('👀 Dropdown observer setup complete');
  }

  // 立即执行一次翻译
  updateDropdownTranslations();

  // 页面加载完成后设置监听器
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      console.log('📄 DOMContentLoaded fired');
      updateDropdownTranslations();
      setupDropdownObserver();
    });
  } else {
    console.log('✅ DOM already loaded');
    updateDropdownTranslations();
    setupDropdownObserver();
  }

  // 延迟执行，确保所有元素都已渲染
  setTimeout(updateDropdownTranslations, 100);
  setTimeout(updateDropdownTranslations, 500);
  setTimeout(updateDropdownTranslations, 1000);

  // 监听语言切换
  const langObserver = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.type === 'attributes' && mutation.attributeName === 'lang') {
        console.log('🌐 Language changed to:', document.documentElement.lang);
        setTimeout(updateDropdownTranslations, 100);
      }
    });
  });
  langObserver.observe(document.documentElement, { attributes: true });

  // 监听窗口焦点事件（用户切换标签页回来时）
  window.addEventListener('focus', function() {
    console.log('👁️ Window focused, checking translations');
    setTimeout(updateDropdownTranslations, 100);
  });

  // 监听鼠标进入菜单区域
  document.addEventListener('mouseover', function(event) {
    const dropdown = event.target.closest('.navbar__item--dropdown');
    if (dropdown) {
      console.log('🖱️ Mouse over dropdown, updating translations');
      setTimeout(updateDropdownTranslations, 50);
    }
  });
</script>


              `,
              },
              // {
              //   type: 'html',
              //   value: `
              //     <div style="display: flex; width: 100%; min-width: 800px; background: white; border-radius: 8px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
              //       <!-- 左侧分类导航 -->
              //       <div style="width: 200px; background: #f8fafc; border-right: 1px solid #e2e8f0; padding: 20px 0;">
              //         <div style="padding: 0 20px;">
              //           <div style="padding: 8px 12px; margin-bottom: 4px; background: #e2e8f0; border-radius: 4px; font-weight: 600; color: #1f2937;" data-i18n="item.label.All Products">All Products</div>
              //           <div style="padding: 8px 12px; margin-bottom: 4px; color: #6b7280; cursor: pointer; border-radius: 4px; transition: background-color 0.2s;" data-i18n="item.label.Financial Trading">Financial Trading</div>
              //           <div style="padding: 8px 12px; margin-bottom: 4px; color: #6b7280; cursor: pointer; border-radius: 4px; transition: background-color 0.2s;" data-i18n="item.label.VIP Institutional">VIP & Institutional</div>
              //           <div style="padding: 8px 12px; margin-bottom: 4px; color: #6b7280; cursor: pointer; border-radius: 4px; transition: background-color 0.2s;" data-i18n="item.label.Investment Service">Investment & Service</div>
              //           <div style="padding: 8px 12px; margin-bottom: 4px; color: #6b7280; cursor: pointer; border-radius: 4px; transition: background-color 0.2s;" data-i18n="item.label.Web3 Wallet">Web3 Wallet</div>
              //           <div style="padding: 8px 12px; margin-bottom: 4px; color: #6b7280; cursor: pointer; border-radius: 4px; transition: background-color 0.2s;" data-i18n="item.label.Dev Tools">Dev Tools</div>
              //         </div>
              //       </div>

              //       <!-- 右侧详细产品链接 -->
              //       <div style="flex: 1; padding: 20px;">
              //         <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px;">
              //           <!-- 第一列 -->
              //           <div>
              //             <h3 style="margin: 0 0 12px 0; font-size: 16px; font-weight: 600; color: #1f2937;" data-i18n="item.label.Spot Trading">Spot Trading</h3>
              //             <a href="/docs/spot/AccessDescription/RestApi" style="display: block; padding: 6px 0; color: #6b7280; text-decoration: none; font-size: 14px;" data-i18n="item.label.Spot Trading APIs">Spot Trading APIs</a>

              //             <h3 style="margin: 20px 0 12px 0; font-size: 16px; font-weight: 600; color: #1f2937;" data-i18n="item.label.Copy Trading">Copy Trading</h3>
              //             <a href="/docs/copy-trading/Access Description/RestApi" style="display: block; padding: 6px 0; color: #6b7280; text-decoration: none; font-size: 14px;" data-i18n="item.label.Copy Trading API">Copy Trading API</a>

              //             <h3 style="margin: 20px 0 12px 0; font-size: 16px; font-weight: 600; color: #1f2937;" data-i18n="item.label.Index">Index</h3>
              //             <a href="/docs/index_overview/overview" style="display: block; padding: 6px 0; color: #6b7280; text-decoration: none; font-size: 14px;" data-i18n="item.label.Index APIs">Index APIs</a>
              //             <a href="/docs/index_overview/index_overview_resource" style="display: block; padding: 6px 0; color: #6b7280; text-decoration: none; font-size: 14px;" data-i18n="item.label.API Resources and Support">API Resources and Support</a>
              //           </div>

              //           <!-- 第二列 -->
              //           <div>
              //             <h3 style="margin: 0 0 12px 0; font-size: 16px; font-weight: 600; color: #1f2937;" data-i18n="item.label.Futures Trading">Futures Trading</h3>
              //             <a href="/docs/futures/AccessDescription/apiDemo" style="display: block; padding: 6px 0; color: #6b7280; text-decoration: none; font-size: 14px;" data-i18n="item.label.Futures Trading APIs">Futures Trading APIs</a>

              //             <h3 style="margin: 20px 0 12px 0; font-size: 16px; font-weight: 600; color: #1f2937;" data-i18n="item.label.Margin Trading">Margin Trading</h3>
              //             <a href="/docs/margin-spot/AccessDescription/RestApi" style="display: block; padding: 6px 0; color: #6b7280; text-decoration: none; font-size: 14px;" data-i18n="item.label.Margin Trading APIs">Margin Trading APIs</a>

              //             <h3 style="margin: 20px 0 12px 0; font-size: 16px; font-weight: 600; color: #1f2937;" data-i18n="item.label.Convert">Convert</h3>
              //             <a href="#" style="display: block; padding: 6px 0; color: #6b7280; text-decoration: none; font-size: 14px;" data-i18n="item.label.Convert API">Convert API</a>
              //           </div>

              //           <!-- 第三列 -->
              //           <div>
              //             <h3 style="margin: 0 0 12px 0; font-size: 16px; font-weight: 600; color: #1f2937;" data-i18n="item.label.Algo Trading">Algo Trading</h3>
              //             <a href="#" style="display: block; padding: 6px 0; color: #6b7280; text-decoration: none; font-size: 14px;" data-i18n="item.label.Algo Trading APIs">Algo Trading APIs</a>

              //             <h3 style="margin: 20px 0 12px 0; font-size: 16px; font-weight: 600; color: #1f2937;" data-i18n="item.label.Staking">Staking</h3>
              //             <a href="#" style="display: block; padding: 6px 0; color: #6b7280; text-decoration: none; font-size: 14px;" data-i18n="item.label.Staking API">Staking API</a>

              //             <h3 style="margin: 20px 0 12px 0; font-size: 16px; font-weight: 600; color: #1f2937;" data-i18n="item.label.Mining">Mining</h3>
              //             <a href="#" style="display: block; padding: 6px 0; color: #6b7280; text-decoration: none; font-size: 14px;" data-i18n="item.label.Mining API">Mining API</a>
              //           </div>

              //           <!-- 第四列 -->
              //           <div>
              //             <h3 style="margin: 0 0 12px 0; font-size: 16px; font-weight: 600; color: #1f2937;" data-i18n="item.label.User Center">User Center</h3>
              //             <a href="/docs/user-center/AccessDescription/RestApi" style="display: block; padding: 6px 0; color: #6b7280; text-decoration: none; font-size: 14px;" data-i18n="item.label.User Center API">User Center API</a>

              //             <h3 style="margin: 20px 0 12px 0; font-size: 16px; font-weight: 600; color: #1f2937;" data-i18n="item.label.Web3">Web3</h3>
              //             <a href="#" style="display: block; padding: 6px 0; color: #6b7280; text-decoration: none; font-size: 14px;" data-i18n="item.label.Web3 Wallet">Web3 Wallet</a>
              //             <a href="#" style="display: block; padding: 6px 0; color: #6b7280; text-decoration: none; font-size: 14px;" data-i18n="item.label.Web3 DApp">Web3 DApp</a>

              //             <h3 style="margin: 20px 0 12px 0; font-size: 16px; font-weight: 600; color: #1f2937;" data-i18n="item.label.Dev Tools">Dev Tools</h3>
              //             <a href="#" style="display: block; padding: 6px 0; color: #6b7280; text-decoration: none; font-size: 14px;" data-i18n="item.label.Open Platform">Open Platform</a>
              //           </div>
              //         </div>
              //       </div>
              //     </div>
              //     <script>
              //       // 动态翻译函数
              //       function updateDropdownTranslations() {
              //         const locale = document.documentElement.lang || 'en';

              //         const translations = {
              //           'en': {
              //             'item.label.All Products': 'All Products',
              //             'item.label.Financial Trading': 'Financial Trading',
              //             'item.label.VIP Institutional': 'VIP & Institutional',
              //             'item.label.Investment Service': 'Investment & Service',
              //             'item.label.Web3 Wallet': 'Web3 Wallet',
              //             'item.label.Dev Tools': 'Dev Tools',
              //             'item.label.Spot Trading': 'Spot Trading',
              //             'item.label.Futures Trading': 'Futures Trading',
              //             'item.label.Margin Trading': 'Margin Trading',
              //             'item.label.Copy Trading': 'Copy Trading',
              //             'item.label.Algo Trading': 'Algo Trading',
              //             'item.label.Index': 'Index',
              //             'item.label.Convert': 'Convert',
              //             'item.label.Staking': 'Staking',
              //             'item.label.Mining': 'Mining',
              //             'item.label.User Center': 'User Center',
              //             'item.label.Web3': 'Web3',
              //             'item.label.Spot Trading APIs': 'Spot Trading APIs',
              //             'item.label.Futures Trading APIs': 'Futures Trading APIs',
              //             'item.label.Margin Trading APIs': 'Margin Trading APIs',
              //             'item.label.Copy Trading API': 'Copy Trading API',
              //             'item.label.Algo Trading APIs': 'Algo Trading APIs',
              //             'item.label.Index APIs': 'Index APIs',
              //             'item.label.API Resources and Support': 'API Resources and Support',
              //             'item.label.Convert API': 'Convert API',
              //             'item.label.Staking API': 'Staking API',
              //             'item.label.Mining API': 'Mining API',
              //             'item.label.User Center API': 'User Center API',
              //             'item.label.Web3 Wallet': 'Web3 Wallet',
              //             'item.label.Web3 DApp': 'Web3 DApp',
              //             'item.label.Open Platform': 'Open Platform'
              //           },
              //           'zh-Hans': {
              //             'item.label.All Products': '所有产品',
              //             'item.label.Financial Trading': '金融交易',
              //             'item.label.VIP Institutional': 'VIP 机构',
              //             'item.label.Investment Service': '投资服务',
              //             'item.label.Web3 Wallet': 'Web3 钱包',
              //             'item.label.Dev Tools': '开发工具',
              //             'item.label.Spot Trading': '现货交易',
              //             'item.label.Futures Trading': '期货交易',
              //             'item.label.Margin Trading': '杠杆交易',
              //             'item.label.Copy Trading': '跟单交易',
              //             'item.label.Algo Trading': '算法交易',
              //             'item.label.Index': '指数',
              //             'item.label.Convert': '兑换',
              //             'item.label.Staking': '质押',
              //             'item.label.Mining': '挖矿',
              //             'item.label.User Center': '用户中心',
              //             'item.label.Web3': 'Web3',
              //             'item.label.Spot Trading APIs': '现货交易 API',
              //             'item.label.Futures Trading APIs': '期货交易 API',
              //             'item.label.Margin Trading APIs': '杠杆交易 API',
              //             'item.label.Copy Trading API': '跟单交易 API',
              //             'item.label.Algo Trading APIs': '算法交易 API',
              //             'item.label.Index APIs': '指数 API',
              //             'item.label.API Resources and Support': 'API 资源和支持',
              //             'item.label.Convert API': '兑换 API',
              //             'item.label.Staking API': '质押 API',
              //             'item.label.Mining API': '挖矿 API',
              //             'item.label.User Center API': '用户中心 API',
              //             'item.label.Web3 Wallet': 'Web3 钱包',
              //             'item.label.Web3 DApp': 'Web3 DApp',
              //             'item.label.Open Platform': '开放平台'
              //           }
              //         };

              //         const currentTranslations = translations[locale] || translations['en'];

              //         document.querySelectorAll('[data-i18n]').forEach(element => {
              //           const key = element.getAttribute('data-i18n');
              //           if (currentTranslations[key]) {
              //             element.textContent = currentTranslations[key];
              //           }
              //         });
              //       }

              //       // 页面加载时更新翻译
              //       document.addEventListener('DOMContentLoaded', updateDropdownTranslations);

              //       // 监听语言切换
              //       const observer = new MutationObserver(function(mutations) {
              //         mutations.forEach(function(mutation) {
              //           if (mutation.type === 'attributes' && mutation.attributeName === 'lang') {
              //             updateDropdownTranslations();
              //           }
              //         });
              //       });
              //       observer.observe(document.documentElement, { attributes: true });
              //     </script>
              //   `,
              // },
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
