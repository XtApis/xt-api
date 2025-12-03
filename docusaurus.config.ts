import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import type * as Plugin from "@docusaurus/types/src/plugin";
import type * as OpenApiPlugin from "docusaurus-plugin-openapi-docs";
// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'My Site',
  tagline: 'Dinosaurs are cool',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://apidoc.xt.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'facebook', // Usually your GitHub org/user name.
  projectName: 'docusaurus', // Usually your repo name.

  onBrokenLinks: 'throw',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-CN".
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'zh-CN'],
    path: 'i18n',
    localeConfigs: {
      en: {
        label: 'English',
        direction: 'ltr',
        htmlLang: 'en',
        calendar: 'gregory',
        path: 'en',
      },
      'zh-CN': {
        label: '简体中文',
        direction: 'ltr',
        htmlLang: 'zh-CN',
        calendar: 'gregory',
        path: 'zh-CN',
      },
    },
  },
  scripts: [
    {
      src: '/js/product-dropdown.js',
      async: true,
    },
    {
      src: '/js/product-dropdown-i18n.js',
      async: true,
    },
    {
      src: '/js/logo-i18n.js',
      async: true,
    },
  ],
  // themes: ['@docusaurus/theme-search-algolia'],

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
          docItemComponent: "@theme/ApiItem",
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            "https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/",
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            "https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/",
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    [
      'docusaurus-plugin-openapi-docs',
      {
        id: "api", // plugin id
        docsPluginId: "api", // must match the docs plugin id to generate into the right docs instance
        config: {
          user_en: {
            specPath: "api-docs/en/user/biz-user.yml",
            outputDir: "api_docs/user",
            sidebarOptions: {
              groupPathsBy: "tag",
              sidebarCollapsible: false,
            },
          } satisfies OpenApiPlugin.Options,
          // user_zh: {
          //   specPath: "api-docs/zh/user/biz-user.yml",
          //   outputDir: "i18n/zh-CN/docusaurus-plugin-content-docs/current/user",
          //   sidebarOptions: {
          //     groupPathsBy: "tag",
          //     sidebarCollapsible: false,
          //   },
          // } satisfies OpenApiPlugin.Options,
          contract_en: {
            specPath: "api-docs/en/contract/biz-quotation.yml",
            outputDir: "api_docs/contract",
            sidebarOptions: {
              groupPathsBy: "tag",
              sidebarCollapsible: false,
            },
          } satisfies OpenApiPlugin.Options,
          // contract_zh: {
          //   specPath: "api-docs/zh/contract/biz-quotation.yml",
          //   outputDir: "i18n/zh-CN/docusaurus-plugin-content-docs/current/contract",
          //   sidebarOptions: {
          //     groupPathsBy: "tag",
          //     sidebarCollapsible: false,
          //   },
          // } satisfies OpenApiPlugin.Options,
        }
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'api',
        path: 'api_docs',
        routeBasePath: 'api',
        sidebarPath: './sidebarsApi.ts',
        docItemComponent: "@theme/ApiItem",
      },
    ],
  ],
  themes: ["docusaurus-theme-openapi-docs"],

  themeConfig: {
    api: {
      authPersistance: "localStorage",
    },
    languageTabs: [
      {
        highlight: "python",
        language: "python",
        logoClass: "python",
      },
      {
        highlight: "bash",
        language: "curl",
        logoClass: "bash",
      },
      {
        highlight: "go",
        language: "go",
        logoClass: "go",
      },
      {
        highlight: "javascript",
        language: "nodejs",
        logoClass: "nodejs",
      },
    ],
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: '',
      logo: {
        alt: '',
        src: 'img/xtlogo.png?v=2',
        srcDark: 'img/xtlogo.png?v=2',
        width: 85,
        height: 36,
        href: '/docs/index_overview/overview',
      },
      items: [
        {
          type: 'dropdown',
          position: 'left',
          label: 'Product',
          id: 'productDropdown',
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

                        <div style="padding: 12px 20px; cursor: pointer; transition: background-color 0.2s; color: #6b7280; font-size: 14px;"
                             onmouseover="this.style.backgroundColor='#f3f4f6'; this.style.color='#1f2937';"
                             onmouseout="this.style.backgroundColor='transparent'; this.style.color='#6b7280';"
                             onclick="showCategory('referralProgram')"
                             data-category="referralProgram"
                             data-i18n="item.label.Referral Program">Referral Program</div>

                        <div style="padding: 12px 20px; cursor: pointer; transition: background-color 0.2s; color: #6b7280; font-size: 14px;"
                             onmouseover="this.style.backgroundColor='#f3f4f6'; this.style.color='#1f2937';"
                             onmouseout="this.style.backgroundColor='transparent'; this.style.color='#6b7280';"
                             onclick="showCategory('loan')"
                             data-category="loan"
                             data-i18n="item.label.Loan">Loan</div>
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

                        <a href="/docs/Referral Commission/Access Description/BasicInformation"
                           style="text-decoration: none; color: inherit; transition: opacity 0.2s;"
                           onmouseover="this.style.opacity='0.7';"
                           onmouseout="this.style.opacity='1';">
                          <div style="font-weight: 600; margin-bottom: 4px; font-size: 14px; color: #1f2937;"
                               data-i18n="item.label.Referral Program">Referral Program</div>
                          <div style="font-size: 12px; color: #6b7280;"
                               data-i18n="item.label.Referral Program API">Referral Program API</div>
                        </a>

                        <a href="/docs/loan/Access Description/BasicInformation"
                           style="text-decoration: none; color: inherit; transition: opacity 0.2s;"
                           onmouseover="this.style.opacity='0.7';"
                           onmouseout="this.style.opacity='1';">
                          <div style="font-weight: 600; margin-bottom: 4px; font-size: 14px; color: #1f2937;"
                               data-i18n="item.label.Loan">Loan</div>
                          <div style="font-size: 12px; color: #6b7280;"
                               data-i18n="item.label.Loan API">Loan API</div>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              `,
            },
          ],
        },

        // {
        //   type: 'docSidebar',
        //   sidebarId: 'api',
        //   docsPluginId: 'api',
        //   position: 'left',
        //   label: 'API',
        // },
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
          href: 'https://github.com/XtApis/api',
          position: 'right',
          className: 'header-github-link',
          'aria-label': 'GitHub repository',
        },
      ],
    },
    // footer: {
    //   style: 'dark',
    //   links: [
    //     {
    //       title: 'Docs',
    //       items: [
    //         {
    //           label: 'Tutorial',
    //           to: '/docs/intro',
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
    //           label: 'Discord',
    //           href: 'https://discordapp.com/invite/docusaurus',
    //         },
    //         {
    //           label: 'X',
    //           href: 'https://x.com/docusaurus',
    //         },
    //       ],
    //     },
    //   ],
    //   copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
    // },
    algolia: {
      appId: 'HX14Y3C71P',
      indexName: 'xt_api_docs',
      apiKey: '76dd2c09c07cdf160217d50a8c5bff2c',
      // 禁用上下文搜索，这有助于避免某些 URL 解析错误
      contextualSearch: false,
      // 确保搜索参数为空，避免干扰
      searchParameters: {},
      searchPagePath: 'search',
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
