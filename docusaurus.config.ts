import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

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
  url: 'https://your-docusaurus-site.example.com',
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
  // may want to replace "en" with "zh-Hans".
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
      'docusaurus-preset-openapi',
      {
        proxy: false,
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      },
    ],
  ],

  themeConfig: {
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

<!-- script moved to static file: /js/product-dropdown-i18n.js -->
<!--
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
        { title: 'Futures Trading', titleZh: '合约交易', subtitle: 'Futures Trading APIs', subtitleZh: '合约交易 API', href: '/docs/futures/Access Description/BasicInformationOfTheInterface' },
        { title: 'Margin Trading', titleZh: '杠杆交易', subtitle: 'Margin Trading APIs', subtitleZh: '杠杆交易 API', href: '/docs/margin-spot/Access Description/BasicInformationOfTheInterface' },
        { title: 'Copy Trading', titleZh: '跟单交易', subtitle: 'Copy Trading API', subtitleZh: '跟单交易 API', href: '/docs/copy-trading/Access Description/BasicInformationOfTheInterface' },
        { title: 'Futures Copy', titleZh: '合约跟单', subtitle: 'Futures Copy API', subtitleZh: '合约跟单 API', href: '/docs/futures-copy/Access Description/BasicInformationOfTheInterface' },
        { title: 'Trading Third Party', titleZh: '第三方交易', subtitle: 'Trading Third Party API', subtitleZh: '第三方交易 API', href: '/docs/trading-third-party/Access Description/BasicInformationOfTheInterface' },
        { title: 'User Center', titleZh: '用户中心', subtitle: 'User Center API', subtitleZh: '用户中心 API', href: '/docs/user-center/Access Description/BasicInformationOfTheInterface' },
        { title: 'Balance', titleZh: '余额', subtitle: 'Balance APIs', subtitleZh: '余额 API', href: '/docs/spot/Balance/GetCurrencies' },
        { title: 'Deposit&Withdrawal', titleZh: '充提', subtitle: 'Deposit&Withdrawal APIs', subtitleZh: '充提 API', href: '/docs/spot/Deposit&Withdrawal/GetSupportedCurrencies' },
        { title: 'Market', titleZh: '市场', subtitle: 'Market APIs', subtitleZh: '市场 API', href: '/docs/spot/Market/GetServerTime' },
        { title: 'Order', titleZh: '订单', subtitle: 'Order APIs', subtitleZh: '订单 API', href: '/docs/spot/Order/PlaceOrder' },
        { title: 'Trade', titleZh: '交易', subtitle: 'Trade APIs', subtitleZh: '交易 API', href: '/docs/spot/Trade/QueryTrade' },
        { title: 'Transfer', titleZh: '转账', subtitle: 'Transfer APIs', subtitleZh: '转账 API', href: '/docs/spot/Transfer/InternalTransfer' },
        { title: 'WebSocket Private', titleZh: 'WebSocket 私有', subtitle: 'WebSocket Private APIs', subtitleZh: 'WebSocket 私有 API', href: '/docs/spot/WebSocket Private/RequestMessageFormat' },
        { title: 'WebSocket Public', titleZh: 'WebSocket 公共', subtitle: 'WebSocket Public APIs', subtitleZh: 'WebSocket 公共 API', href: '/docs/spot/WebSocket Public/subscribeParam' },
        { title: 'Futures WebSocket', titleZh: '合约 WebSocket', subtitle: 'Futures WebSocket APIs', subtitleZh: '合约 WebSocket API', href: '/docs/futures/WEBSOCKET(V2)/General_WSS_information' },
        { title: 'Margin Balance', titleZh: '杠杆余额', subtitle: 'Margin Balance APIs', subtitleZh: '杠杆余额 API', href: '/docs/margin-spot/Balance/GetBalanceBySymbol' },
        { title: 'Copy Account', titleZh: '跟单账户', subtitle: 'Copy Account APIs', subtitleZh: '跟单账户 API', href: '/docs/copy-trading/Copy tradeing/GetCurrentLeaderOrder' }
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
        { title: 'Balance', titleZh: '余额', subtitle: 'Balance APIs', subtitleZh: '余额 API', href: '/docs/spot/Balance/GetCurrencies' },
        { title: 'Deposit&Withdrawal', titleZh: '充提', subtitle: 'Deposit&Withdrawal APIs', subtitleZh: '充提 API', href: '/docs/spot/Deposit&Withdrawal/GetSupportedCurrencies' },
        { title: 'Market', titleZh: '市场', subtitle: 'Market APIs', subtitleZh: '市场 API', href: '/docs/spot/Market/GetServerTime' },
        { title: 'Order', titleZh: '订单', subtitle: 'Order APIs', subtitleZh: '订单 API', href: '/docs/spot/Order/PlaceOrder' },
        { title: 'Trade', titleZh: '交易', subtitle: 'Trade APIs', subtitleZh: '交易 API', href: '/docs/spot/Trade/QueryTrade' },
        { title: 'Transfer', titleZh: '转账', subtitle: 'Transfer APIs', subtitleZh: '转账 API', href: '/docs/spot/Transfer/InternalTransfer' },
        { title: 'WebSocket Private', titleZh: 'WebSocket 私有', subtitle: 'WebSocket Private APIs', subtitleZh: 'WebSocket 私有 API', href: '/docs/spot/WebSocket Private/RequestMessageFormat' },
        { title: 'WebSocket Public', titleZh: 'WebSocket 公共', subtitle: 'WebSocket Public APIs', subtitleZh: 'WebSocket 公共 API', href: '/docs/spot/WebSocket Public/subscribeParam' }
      ]
    },
    'futures': {
      title: 'Futures Trading',
      titleZh: '合约交易',
      desc: 'Futures trading APIs and derivatives',
      descZh: '合约交易 API 和合约交易',
      products: [
        { title: 'Access Description', titleZh: '访问描述', subtitle: 'Access Description APIs', subtitleZh: '访问描述 API', href: '/docs/futures/Access Description/BasicInformationOfTheInterface' },
        { title: 'Entrust', titleZh: '委托', subtitle: 'Entrust APIs', subtitleZh: '委托 API', href: '/docs/futures/Entrust/CreateTriggerOrders' },
        { title: 'Market Data', titleZh: '市场数据', subtitle: 'Market Data APIs', subtitleZh: '市场数据 API', href: '/docs/futures/Market Data/get-client-ip' },
        { title: 'Order', titleZh: '订单', subtitle: 'Order APIs', subtitleZh: '订单 API', href: '/docs/futures/Order/create-orders' },
        { title: 'Python Package', titleZh: 'Python 包', subtitle: 'Python Package APIs', subtitleZh: 'Python 包 API', href: '/docs/futures/Python Package/PythonPackage' },
        { title: 'Quote Collection', titleZh: '行情收集', subtitle: 'Quote Collection APIs', subtitleZh: '行情收集 API', href: '/docs/futures/Quote collection/get-futures-info' },
        { title: 'User', titleZh: '用户', subtitle: 'User APIs', subtitleZh: '用户 API', href: '/docs/futures/User/GetAccountInfo' },
        { title: 'WebSocket V2', titleZh: 'WebSocket V2', subtitle: 'WebSocket V2 APIs', subtitleZh: 'WebSocket V2 API', href: '/docs/futures/WEBSOCKET(V2)/Request message format' }
      ]
    },
    'marginSpot': {
      title: 'Margin Trading',
      titleZh: '杠杆交易',
      desc: 'Margin trading and leverage APIs',
      descZh: '杠杆交易和杠杆 API',
      products: [
        { title: 'Margin Trading', titleZh: '杠杆交易', subtitle: 'Margin Trading APIs', subtitleZh: '杠杆交易 API', href: '/docs/margin-spot/Access Description/BasicInformationOfTheInterface' },
        { title: 'Margin Balance', titleZh: '杠杆余额', subtitle: 'Margin Balance APIs', subtitleZh: '杠杆余额 API', href: '/docs/margin-spot/Balance/GetBalanceBySymbol' }
      ]
    },
    'copyTrading': {
      title: 'Copy Trading',
      titleZh: '跟单交易',
      desc: 'Copy trading and social trading APIs',
      descZh: '跟单交易和社交交易 API',
      products: [
        { title: 'Copy Trading', titleZh: '跟单交易', subtitle: 'Copy Trading API', subtitleZh: '跟单交易 API', href: '/docs/copy-trading/Access Description/BasicInformationOfTheInterface' },
        { title: 'Copy Account', titleZh: '跟单账户', subtitle: 'Copy Account APIs', subtitleZh: '跟单账户 API', href: '/docs/copy-trading/Copy tradeing/GetCurrentLeaderOrder' }
      ]
    },
    'futuresCopy': {
      title: 'Futures Copy',
      titleZh: '合约跟单',
      desc: 'Futures copy trading APIs',
      descZh: '合约跟单交易 API',
      products: [
        { title: 'Futures Copy', titleZh: '合约跟单', subtitle: 'Futures Copy API', subtitleZh: '合约跟单 API', href: '/docs/futures-copy/Access Description/BasicInformationOfTheInterface' }
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

        // 转义特殊字符用于 data-i18n 属性
        const titleKey = product.title.replace(/&/g, '&amp;');
        const subtitleKey = product.subtitle.replace(/&/g, '&amp;');

        html += \`
          <a href="\${product.href}"
             style="text-decoration: none; color: inherit; transition: opacity 0.2s;"
             onmouseover="this.style.opacity='0.7';"
             onmouseout="this.style.opacity='1';">
            <div style="font-weight: 600; margin-bottom: 4px; font-size: 14px; color: #1f2937;" data-i18n="item.label.\${titleKey}">\${title}</div>
            <div style="font-size: 12px; color: #6b7280;" data-i18n="item.label.\${subtitleKey}">\${subtitle}</div>
          </a>
        \`;
      });

      productsGrid.innerHTML = html;
      console.log('✅ Updated products grid with', category.products.length, 'products');

      // 立即更新翻译
      setTimeout(() => {
        updateDropdownTranslations();
      }, 50);
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
        'item.label.Deposit&amp;Withdrawal': 'Deposit&Withdrawal',
        'item.label.Market': 'Market',
        'item.label.Order': 'Order',
        'item.label.Trade': 'Trade',
        'item.label.Transfer': 'Transfer',
        'item.label.WebSocket Private': 'WebSocket Private',
        'item.label.WebSocket Public': 'WebSocket Public',
        'item.label.Futures WebSocket': 'Futures WebSocket',
        'item.label.Access Description': 'Access Description',
        'item.label.Entrust': 'Entrust',
        'item.label.Market Data': 'Market Data',
        'item.label.Python Package': 'Python Package',
        'item.label.Quote Collection': 'Quote Collection',
        'item.label.User': 'User',
        'item.label.WebSocket V2': 'WebSocket V2',
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
        'item.label.Deposit&amp;Withdrawal APIs': 'Deposit&Withdrawal APIs',
        'item.label.Market APIs': 'Market APIs',
        'item.label.Order APIs': 'Order APIs',
        'item.label.Trade APIs': 'Trade APIs',
        'item.label.Transfer APIs': 'Transfer APIs',
        'item.label.WebSocket Private APIs': 'WebSocket Private APIs',
        'item.label.WebSocket Public APIs': 'WebSocket Public APIs',
        'item.label.Futures WebSocket APIs': 'Futures WebSocket APIs',
        'item.label.Access Description APIs': 'Access Description APIs',
        'item.label.Entrust APIs': 'Entrust APIs',
        'item.label.Market Data APIs': 'Market Data APIs',
        'item.label.Python Package APIs': 'Python Package APIs',
        'item.label.Quote Collection APIs': 'Quote Collection APIs',
        'item.label.User APIs': 'User APIs',
        'item.label.WebSocket V2 APIs': 'WebSocket V2 APIs',
        'item.label.Margin Balance APIs': 'Margin Balance APIs',
        'item.label.Copy Account APIs': 'Copy Account APIs',
        'item.label.Comprehensive API solutions for all your trading needs': 'Comprehensive API solutions for all your trading needs'
      },
      'zh-Hans': {
        'item.label.All Products': '所有产品',
        'item.label.Index': '指数',
        'item.label.Spot Trading': '现货交易',
        'item.label.Futures Trading': '合约交易',
        'item.label.Margin Trading': '杠杆交易',
        'item.label.Copy Trading': '跟单交易',
        'item.label.Futures Copy': '合约跟单',
        'item.label.Trading Third Party': '第三方交易',
        'item.label.User Center': '用户中心',
        'item.label.Balance': '余额',
        'item.label.Deposit&Withdrawal': '充提',
        'item.label.Deposit&amp;Withdrawal': '充提',
        'item.label.Market': '市场',
        'item.label.Order': '订单',
        'item.label.Trade': '交易',
        'item.label.Transfer': '转账',
        'item.label.WebSocket Private': 'WebSocket 私有',
        'item.label.WebSocket Public': 'WebSocket 公共',
        'item.label.Futures WebSocket': '合约 WebSocket',
        'item.label.Access Description': '访问描述',
        'item.label.Entrust': '委托',
        'item.label.Market Data': '市场数据',
        'item.label.Python Package': 'Python 包',
        'item.label.Quote Collection': '行情收集',
        'item.label.User': '用户',
        'item.label.WebSocket V2': 'WebSocket V2',
        'item.label.Margin Balance': '杠杆余额',
        'item.label.Copy Account': '跟单账户',
        'item.label.Index APIs': '指数 API',
        'item.label.Spot Trading APIs': '现货交易 API',
        'item.label.Futures Trading APIs': '合约交易 API',
        'item.label.Margin Trading APIs': '杠杆交易 API',
        'item.label.Copy Trading API': '跟单交易 API',
        'item.label.Futures Copy API': '合约跟单 API',
        'item.label.Trading Third Party API': '第三方交易 API',
        'item.label.User Center API': '用户中心 API',
        'item.label.Balance APIs': '余额 API',
        'item.label.Deposit&Withdrawal APIs': '充提 API',
        'item.label.Deposit&amp;Withdrawal APIs': '充提 API',
        'item.label.Market APIs': '市场 API',
        'item.label.Order APIs': '订单 API',
        'item.label.Trade APIs': '交易 API',
        'item.label.Transfer APIs': '转账 API',
        'item.label.WebSocket Private APIs': 'WebSocket 私有 API',
        'item.label.WebSocket Public APIs': 'WebSocket 公共 API',
        'item.label.Futures WebSocket APIs': '合约 WebSocket API',
        'item.label.Access Description APIs': '访问描述 API',
        'item.label.Entrust APIs': '委托 API',
        'item.label.Market Data APIs': '市场数据 API',
        'item.label.Python Package APIs': 'Python 包 API',
        'item.label.Quote Collection APIs': '行情收集 API',
        'item.label.User APIs': '用户 API',
        'item.label.WebSocket V2 APIs': 'WebSocket V2 API',
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
      if (typeof showCategory === 'function') {
        showCategory('AllProducts');
      }
    });
  } else {
    console.log('✅ DOM already loaded');
    updateDropdownTranslations();
    setupDropdownObserver();
    if (typeof showCategory === 'function') {
      showCategory('AllProducts');
    }
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

-->

              `,
            },
          ],
        },

        { to: '/api', label: 'API', position: 'left' },
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
