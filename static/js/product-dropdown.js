/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// ====== Dropdown open/close timers/state ======
let hoverTimeout;
let closeTimeout;
let openedByClick = false;
let overTrigger = false;
let overMenu = false;
let menuOpen = false;

// 移出后不立即隐藏（单位 ms）
const HIDE_DELAY = 800; // hover 打开后：移出触发区/菜单后延迟关闭
const CLICK_HIDE_DELAY = 1200; // click 打开后：移出触发区/菜单后延迟关闭（想一直不关可改成 null）

function onReady(fn) {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', fn);
  } else {
    fn();
  }
}

function clearTimers() {
  if (hoverTimeout) clearTimeout(hoverTimeout);
  if (closeTimeout) clearTimeout(closeTimeout);
  hoverTimeout = null;
  closeTimeout = null;
}

function setMenuVisible(dropdown, dropdownMenu, trigger, visible) {
  if (!dropdown || !dropdownMenu || !trigger) return;

  if (visible) {
    dropdown.classList.add('dropdown--show');
    dropdownMenu.style.display = 'block';
    dropdownMenu.style.opacity = '1';
    dropdownMenu.style.visibility = 'visible';
    trigger.setAttribute('aria-expanded', 'true');
    menuOpen = true;
  } else {
    dropdown.classList.remove('dropdown--show');
    dropdownMenu.style.display = 'none';
    dropdownMenu.style.opacity = '0';
    dropdownMenu.style.visibility = 'hidden';
    trigger.setAttribute('aria-expanded', 'false');
    menuOpen = false;
    openedByClick = false;
  }
}

function scheduleClose(dropdown, dropdownMenu, trigger, delay) {
  if (delay == null) return; // 允许关闭延迟被禁用
  if (closeTimeout) clearTimeout(closeTimeout);
  closeTimeout = setTimeout(() => {
    // 只有在鼠标不在触发区也不在菜单里时才关闭
    if (!overTrigger && !overMenu) {
      setMenuVisible(dropdown, dropdownMenu, trigger, false);
    }
  }, delay);
}

// =========================
// 1) 原始 DOMContentLoaded
// =========================
onReady(() => {
  const productData = {
    Index: {
      title: 'Index',
      description: 'Explore our index APIs',
      products: [
        {
          title: 'Index',
          description: 'Index APIs',
          href: '/docs/index_overview/overview',
        },
        // {
        //  title: 'API Resources and Support',
        //  description: 'API Resources and Support',
        //  href: '/docs/index_overview/index_overview_resource',
        // },
      ],
    },
    spot: {
      title: 'spot',
      description: 'spot',
      products: [
        {
          title: 'Access Description',
          description: 'Access Description APIs',
          href: '/docs/spot/Access Description/BasicInformationOfTheInterface',
        },
        {
          title: 'Balance',
          description: 'Balance APIs',
          href: '/docs/spot/Balance/GetCurrencies',
        },
        {
          title: 'Deposit&Withdrawal',
          description: 'Deposit&Withdrawal APIs',
          href: '/docs/spot/Deposit&Withdrawal/GetSupportedCurrencies',
        },
        {
          title: 'Market',
          description: 'Market APIs',
          href: '/docs/spot/Market/GetServerTime',
        },
        {
          title: 'Order',
          description: 'Order APIs',
          href: '/docs/spot/Order/GetSingleOrder',
        },
        {
          title: 'Trade',
          description: 'Trade APIs',
          href: '/docs/spot/Trade/QueryTrade',
        },
        {
          title: 'Transfer',
          description: 'Transfer APIs',
          href: '/docs/spot/Transfer/TransferBetweenUserSystems',
        },
        {
          title: 'WebSocket Private',
          description: 'WebSocket Private APIs',
          href: '/docs/spot/WebSocket Private/RequestMessageFormat',
        },
        {
          title: 'WebSocket Public',
          description: 'WebSocket Public APIs',
          href: '/docs/spot/WebSocket Public/wss-general',
        },
      ],
    },
    futures: {
      title: 'Futures',
      description: 'Futures Trading APIs',
      products: [
        {
          title: 'Access Description',
          description: 'Access Description APIs',
          href: '/docs/futures/Access Description/BasicInformationOfTheInterface',
        },
        {
          title: 'Entrust',
          description: 'Entrust APIs',
          href: '/docs/futures/Entrust/CreateTriggerOrders',
        },
        {
          title: 'Market Data',
          description: 'Market Data APIs',
          href: '/docs/futures/MarketData/GetClientIp',
        },
        {
          title: 'Order',
          description: 'Order APIs',
          href: '/docs/futures/Order/Create Orders',
        },
        {
          title: 'Python Package',
          description: 'Python Package APIs',
          href: '/docs/futures/PythonPackage/Python Package',
        },
        {
          title: 'Quote Collection',
          description: 'Quote Collection APIs',
          href: '/docs/futures/Quote collection/get-futures-info',
        },
        {
          title: 'User',
          description: 'User APIs',
          href: '/docs/futures/User/GetAccountInfo',
        },
        {
          title: 'WebSocket V2',
          description: 'WebSocket V2 APIs',
          href: '/docs/futures/WebsocketV2/General_WSS_information',
        },
      ],
    },
    marginSpot: {
      title: 'Margin Spot',
      description: 'Margin Spot Trading APIs',
      products: [
        {
          title: 'Access Description',
          description: 'Access Description APIs',
          href: '/docs/margin-spot/Access Description/BasicInformationOfTheInterface',
        },
        {
          title: 'Balance',
          description: 'Balance APIs',
          href: '/docs/margin-spot/Balance/GetBalanceBySymbol',
        },
        {
          title: 'Market',
          description: 'Market APIs',
          href: '/docs/margin-spot/Market/GetSymbolList',
        },
      ],
    },
    copyTrading: {
      title: 'Copy Trading',
      description: 'Copy Trading APIs',
      products: [
        {
          title: 'Access Description',
          description: 'Access Description APIs',
          href: '/docs/copy-trading/Access Description/BasicInformationOfTheInterface',
        },
        {
          title: 'Copy Trading',
          description: 'Copy Trading APIs',
          href: '/docs/copy-trading/Copy tradeing/GetCurrentLeaderOrder',
        },
      ],
    },
    futuresCopy: {
      title: 'Futures Copy',
      description: 'Futures Copy Trading APIs',
      products: [
        {
          title: 'Access Description',
          description: 'Access Description APIs',
          href: '/docs/futures-copy/Access Description/BasicInformationOfTheInterface',
        },
        {
          title: 'Copy Trading',
          description: 'Copy Trading APIs',
          href: '/docs/futures-copy/Copy Trading/ChooseLeader',
        },
        // {
        //   title: 'Installation',
        //   description: 'Installation Guide',
        //   href: '/docs/futures-copy/installation',
        // },
      ],
    },
    tradingThirdParty: {
      title: 'Trading Third Party',
      description: 'Third Party Integration APIs',
      products: [
        {
          title: 'Access Description',
          description: 'Access Description APIs',
          href: '/docs/trading-third-party/Access Description/BasicInformationOfTheInterface',
        },
        {
          title: 'Balance',
          description: 'Balance APIs',
          href: '/docs/trading-third-party/Balance/GetSingleCurrencyAsset',
        },
        {
          title: 'OAuth Interface',
          description: 'OAuth Interface APIs',
          href: '/docs/trading-third-party/OAuth Interface/ApplyToken',
        },
        {
          title: 'Order',
          description: 'Order APIs',
          href: '/docs/trading-third-party/Order/GetSingleOrder',
        },
        {
          title: 'Trade',
          description: 'Trade APIs',
          href: '/docs/trading-third-party/Trade/QueryTrade',
        },
        {
          title: 'User Registration',
          description: 'User Registration APIs',
          href: '/docs/trading-third-party/User Registration/UserRegistration',
        },
      ],
    },
    userCenter: {
      title: 'User Center',
      description: 'User Management APIs',
      products: [
        {
          title: 'Access Description',
          description: 'Access Description APIs',
          href: '/docs/user-center/Access Description/BasicInformationOfTheInterface',
        },
        {
          title: 'Account',
          description: 'Account APIs',
          href: '/docs/user-center/Account/QueryAccountList',
        },
        {
          title: 'ApiKey',
          description: 'ApiKey APIs',
          href: '/docs/user-center/ApiKey/QueryUserApiKey',
        },
      ],
    },
    referralProgram: {
      title: 'Referral Program',
      description: 'Referral Program APIs',
      products: [
        {
          title: 'Access Description',
          description: 'Access Description APIs',
          href: '/docs/Referral Commission/Access Description/BasicInformation',
        },
        {
          title: 'Referral Management',
          description: 'Referral Management APIs',
          href: '/docs/Referral Commission/Referral Commission/GetAllUsersOfAffiliate',
        },
      ],
    },
    loan: {
      title: 'Loan',
      description: 'Loan APIs',
      products: [
        {
          title: 'Access Description',
          description: 'Access Description APIs',
          href: '/docs/loan/Access Description/BasicInformation',
        },
        {
          title: 'Borrow Money',
          description: 'Borrow Money APIs',
          href: '/docs/loan/Borrow Money/LoanBorrow',
        },
        {
          title: 'Repay',
          description: 'Repay APIs',
          href: '/docs/loan/Repay/LoanRepay',
        },
        {
          title: 'Adjust Collateral',
          description: 'Adjust Collateral APIs',
          href: '/docs/loan/Adjust Collateral/LoanAdjustPledge',
        },
        {
          title: 'Renew Loan',
          description: 'Renew Loan APIs',
          href: '/docs/loan/Renew Loan/LoanRenew',
        },
        {
          title: 'One Click Repay',
          description: 'One Click Repay APIs',
          href: '/docs/loan/One Click Repay/LoanBatchRepay',
        },
        {
          title: 'Auto Add Collateral Switch',
          description: 'Auto Add Collateral Switch APIs',
          href: '/docs/loan/Auto Add Collateral Switch/LoanAutoAdjustSwitch',
        },
        {
          title: 'Loan Inquiry',
          description: 'Loan Inquiry APIs',
          href: '/docs/loan/inquire/AdjustPledgeHistoryQuery',
        },
        {
          title: 'Loan Product Inquiry',
          description: 'Loan Product Inquiry APIs',
          href: '/docs/loan/Loan Product Inquiry/LoanCurrency',
        },
      ],
    },
    earn: {
      title: 'Earn',
      description: 'Earn APIs',
      products: [
        {
          title: 'Access Description',
          description: 'Access Description APIs',
          href: '/docs/earn/Access Description/BasicInformation',
        },
        {
          title: 'Auto Earn',
          description: 'Auto Earn APIs',
          href: '/docs/earn/Auto Earn/AutoSubscribeSet',
        },
        {
          title: 'Order Management',
          description: 'Order Management APIs',
          href: '/docs/earn/Order Management/SubscribeRedeem',
        },
        {
          title: 'Query',
          description: 'Query APIs',
          href: '/docs/earn/Query/ProductList',
        },
        {
          title: 'Special Products',
          description: 'Special Products APIs',
          href: '/docs/earn/Special Products/XRWURedeemQuota',
        },
      ],
    },
    broker: {
      title: 'Broker',
      description: 'Broker APIs',
      products: [
        {
          title: 'Access Description',
          description: 'Access Description APIs',
          href: '/docs/broker/Access Description/BasicInformation',
        },
        {
          title: 'Binding',
          description: 'Binding APIs',
          href: '/docs/broker/Binding/BindUserAccount',
        },
      ],
    },

    Trading: {
      title: 'Trading',
      description: 'Explore our trading APIs',
      products: [
        {
          title: 'Spot Trading',
          description: 'Spot Trading APIs',
          href: '/docs/spot/Access Description/BasicInformationOfTheInterface',
        },
        {
          title: 'Futures Trading',
          description: 'Futures Trading APIs',
          href: '/docs/futures/Access Description/BasicInformationOfTheInterface',
        },
        {
          title: 'Margin Trading',
          description: 'Margin Trading APIs',
          href: '/docs/margin-spot/Access Description/BasicInformationOfTheInterface',
        },
        {
          title: 'Copy Trading',
          description: 'Copy Trading API',
          href: '/docs/copy-trading/Access Description/BasicInformationOfTheInterface',
        },
        {
          title: 'Futures Copy',
          description: 'Futures Copy API',
          href: '/docs/futures-copy/Access Description/BasicInformationOfTheInterface',
        },
      ],
    },
    Institutional: {
      title: 'Institutional',
      description: 'Explore our institutional APIs',
      products: [
        {
          title: 'Trading Third Party',
          description: 'Third Party Integration',
          href: '/docs/trading-third-party/Access Description/BasicInformationOfTheInterface',
        },
        {
          title: 'User Center',
          description: 'User Management APIs',
          href: '/docs/user-center/Access Description/BasicInformationOfTheInterface',
        },
      ],
    },
    Resources: {
      title: 'Resources',
      description: 'Explore our resources and documentation',
      products: [
        {
          title: 'API Overview',
          description: 'Complete API Documentation',
          href: '/docs/index_overview/overview',
        },
        {
          title: 'Changelog',
          description: 'API Updates & Changes',
          href: '/docs/changelog/index',
        },
      ],
    },
  };

  function updateProducts(category) {
    const categoryData = productData[category];
    if (!categoryData) {
      return;
    }

    const categoryTitle = document.getElementById('categoryTitle');
    const categoryDescription = document.getElementById('categoryDescription');
    const productsContent = document.getElementById('productsContent');

    if (categoryTitle) {
      categoryTitle.textContent = categoryData.title;
    }
    if (categoryDescription) {
      categoryDescription.textContent = categoryData.description;
    }

    if (productsContent) {
      // 获取当前语言
      const currentLang = document.documentElement.lang || 'en';
      const basePath = currentLang === 'zh-CN' ? '/zh-CN' : '';

      productsContent.innerHTML = categoryData.products
        .map((product) => {
          const titleKey = (product.title || '').replace(/&/g, '&amp;');
          const descKey = (product.description || '').replace(/&/g, '&amp;');
          // 为链接添加语言前缀
          const localizedHref = basePath + product.href;
          return `
        <a href="${localizedHref}" class="product-item">
          <div class="product-title" data-i18n="item.label.${titleKey}">${product.title}</div>
          <div class="product-description" data-i18n="item.label.${descKey}">${product.description}</div>
        </a>
      `;
        })
        .join('');
      if (window.updateProductDropdownTranslations) {
        setTimeout(window.updateProductDropdownTranslations, 50);
      }
    }
  }

  // Handle category switching
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('category-item')) {
      e.preventDefault();

      // Remove active class from all category items
      document.querySelectorAll('.category-item').forEach((item) => {
        item.classList.remove('active');
      });

      // Add active class to clicked item
      e.target.classList.add('active');

      // Update products based on selected category
      const category = e.target.getAttribute('data-category');
      updateProducts(category);
    }
  });

  // Initialize with Trading category
  updateProducts('Trading');

  // ====== 关键：Product 下拉菜单行为（点击打开 + 延迟关闭 + 不影响菜单内点击切换） ======
  const trigger = document.getElementById('productDropdown');
  const dropdown = trigger ? trigger.closest('.dropdown') : null;
  const dropdownMenu = dropdown ? dropdown.querySelector('.dropdown__menu') : null;

  if (dropdown && dropdownMenu && trigger) {
    // Force full width styling（保留你原来的逻辑，但选择器更稳）
    const applyFullWidth = () => {
      dropdownMenu.style.width = '100vw';
      dropdownMenu.style.maxWidth = '100vw';
      dropdownMenu.style.minWidth = '100vw';
      dropdownMenu.style.left = '0';
      dropdownMenu.style.right = '0';
      dropdownMenu.style.marginLeft = '0';
      dropdownMenu.style.marginRight = '0';
      dropdownMenu.style.position = 'fixed';
      dropdownMenu.style.top = '60px';
      dropdownMenu.style.zIndex = '1000';
      dropdownMenu.style.maxHeight = '80vh';
      dropdownMenu.style.overflowY = 'auto';

      // inner 容器（你页面里是 li > div）
      const innerDiv = dropdownMenu.querySelector('li > div');
      if (innerDiv) {
        innerDiv.style.width = '100vw';
        innerDiv.style.maxWidth = '100vw';
        innerDiv.style.minWidth = '100vw';
        innerDiv.style.margin = '0';
      }
    };

    applyFullWidth();
    setTimeout(applyFullWidth, 100);
    setTimeout(applyFullWidth, 500);

    // 初始隐藏（避免 async 情况下样式不一致）
    setMenuVisible(dropdown, dropdownMenu, trigger, false);

    // 点击 Product：切换开/关（不会影响菜单内部点击）
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      clearTimers();

      if (menuOpen) {
        setMenuVisible(dropdown, dropdownMenu, trigger, false);
      } else {
        openedByClick = true;
        overTrigger = true;
        setMenuVisible(dropdown, dropdownMenu, trigger, true);
      }
    });

    // 点击菜单内部：不关闭（让 showCategory / 链接跳转正常执行）
    dropdownMenu.addEventListener('click', (e) => {
      e.stopPropagation();
      // 不要 preventDefault，避免链接无法跳转/切换
    });

    // 点击页面其它区域：关闭
    document.addEventListener('click', (e) => {
      if (!menuOpen) return;
      if (dropdown.contains(e.target)) return;
      setMenuVisible(dropdown, dropdownMenu, trigger, false);
    });

    // hover 进入触发区：打开（不强制覆盖 click 打开的状态）
    trigger.addEventListener('mouseenter', () => {
      overTrigger = true;
      if (closeTimeout) clearTimeout(closeTimeout);
      hoverTimeout = setTimeout(() => {
        if (!menuOpen) {
          openedByClick = false;
          setMenuVisible(dropdown, dropdownMenu, trigger, true);
        }
      }, 0);
    });

    trigger.addEventListener('mouseleave', () => {
      overTrigger = false;
      // 如果是 click 打开的，用 CLICK_HIDE_DELAY；否则用 HIDE_DELAY
      scheduleClose(
        dropdown,
        dropdownMenu,
        trigger,
        openedByClick ? CLICK_HIDE_DELAY : HIDE_DELAY,
      );
    });

    // hover 进入菜单：保持打开
    dropdownMenu.addEventListener('mouseenter', () => {
      overMenu = true;
      if (closeTimeout) clearTimeout(closeTimeout);
      if (!menuOpen) {
        openedByClick = false;
        setMenuVisible(dropdown, dropdownMenu, trigger, true);
      }
    });

    dropdownMenu.addEventListener('mouseleave', () => {
      overMenu = false;
      scheduleClose(
        dropdown,
        dropdownMenu,
        trigger,
        openedByClick ? CLICK_HIDE_DELAY : HIDE_DELAY,
      );
    });
  }
});

// =========================
// 2) 全局 showCategory
// =========================
window.showCategory = function showCategory(category) {
  const productData = {
    AllProducts: {
      title: 'All Products',
      description: 'Comprehensive API solutions for all your trading needs',
      products: [
        {
          title: 'Index',
          description: 'Index APIs',
          href: '/docs/index_overview/overview',
        },
        // {
        //   title: 'API Resources and Support',
        //   description: 'API Resources and Support',
        //   href: '/docs/index_overview/index_overview_resource',
        // },
        {
          title: 'Spot Trading',
          description: 'Spot Trading APIs',
          href: '/docs/spot/Access Description/BasicInformationOfTheInterface',
        },
        {
          title: 'Futures Trading',
          description: 'Futures Trading APIs',
          href: '/docs/futures/Access Description/BasicInformationOfTheInterface',
        },
        {
          title: 'Margin Trading',
          description: 'Margin Trading APIs',
          href: '/docs/margin-spot/Access Description/BasicInformationOfTheInterface',
        },
        {
          title: 'Copy Trading',
          description: 'Copy Trading API',
          href: '/docs/copy-trading/Access Description/BasicInformationOfTheInterface',
        },
        {
          title: 'Futures Copy',
          description: 'Futures Copy API',
          href: '/docs/futures-copy/Access Description/BasicInformationOfTheInterface',
        },
        {
          title: 'Trading Third Party',
          description: 'Trading Third Party API',
          href: '/docs/trading-third-party/Access Description/BasicInformationOfTheInterface',
        },
        {
          title: 'User Center',
          description: 'User Center API',
          href: '/docs/user-center/Access Description/BasicInformationOfTheInterface',
        },
        {
          title: 'Referral Program',
          description: 'Referral Program API',
          href: '/docs/Referral Commission/Access Description/BasicInformation',
        },
        {
          title: 'Loan',
          description: 'Loan API',
          href: '/docs/loan/Access Description/BasicInformation',
        },
        {
          title: 'Earn',
          description: 'Earn API',
          href: '/docs/earn/Access Description/BasicInformation',
        },
        {
          title: 'Broker',
          description: 'Broker API',
          href: '/docs/broker/Access Description/BasicInformation',
        },
      ],
    },
    Index: {
      title: 'Index',
      description: 'Explore our index APIs',
      products: [
        {
          title: 'Index',
          description: 'Index APIs',
          href: '/docs/index_overview/overview',
        },
      ],
    },
    spot: {
      title: 'Spot',
      description: 'Spot Trading APIs',
      products: [
        {
          title: 'Access Description',
          description: 'Access Description APIs',
          href: '/docs/spot/Access Description/BasicInformationOfTheInterface',
        },
        {
          title: 'Balance',
          description: 'Balance APIs',
          href: '/docs/spot/Balance/GetCurrencies',
        },
        {
          title: 'Deposit&Withdrawal',
          description: 'Deposit&Withdrawal APIs',
          href: '/docs/spot/Deposit&Withdrawal/GetSupportedCurrencies',
        },
        {
          title: 'Market',
          description: 'Market APIs',
          href: '/docs/spot/Market/GetServerTime',
        },
        {
          title: 'Order',
          description: 'Order APIs',
          href: '/docs/spot/Order/GetSingleOrder',
        },
        {
          title: 'Trade',
          description: 'Trade APIs',
          href: '/docs/spot/Trade/QueryTrade',
        },
        {
          title: 'Transfer',
          description: 'Transfer APIs',
          href: '/docs/spot/Transfer/TransferBetweenUserSystems',
        },
        {
          title: 'WebSocket Private',
          description: 'WebSocket Private APIs',
          href: '/docs/spot/WebSocket Private/RequestMessageFormat',
        },
        {
          title: 'WebSocket Public',
          description: 'WebSocket Public APIs',
          href: '/docs/spot/WebSocket Public/wss-general',
        },
      ],
    },
    futures: {
      title: 'Futures',
      description: 'Futures Trading APIs',
      products: [
        {
          title: 'Access Description',
          description: 'Access Description APIs',
          href: '/docs/futures/Access Description/BasicInformationOfTheInterface',
        },
        {
          title: 'Entrust',
          description: 'Entrust APIs',
          href: '/docs/futures/Entrust/CreateTriggerOrders',
        },
        {
          title: 'Market Data',
          description: 'Market Data APIs',
          href: '/docs/futures/MarketData/GetClientIp',
        },
        {
          title: 'Order',
          description: 'Order APIs',
          href: '/docs/futures/Order/Create Orders',
        },
        {
          title: 'Python Package',
          description: 'Python Package APIs',
          href: '/docs/futures/PythonPackage/Python Package',
        },
        {
          title: 'Quote Collection',
          description: 'Quote Collection APIs',
          href: '/docs/futures/Quote collection/get-futures-info',
        },
        {
          title: 'User',
          description: 'User APIs',
          href: '/docs/futures/User/GetAccountInfo',
        },
        {
          title: 'WebSocket V2',
          description: 'WebSocket V2 APIs',
          href: '/docs/futures/WebsocketV2/General_WSS_information',
        },
      ],
    },
    marginSpot: {
      title: 'Margin Spot',
      description: 'Margin Spot Trading APIs',
      products: [
        {
          title: 'Access Description',
          description: 'Access Description APIs',
          href: '/docs/margin-spot/Access Description/BasicInformationOfTheInterface',
        },
        {
          title: 'Balance',
          description: 'Balance APIs',
          href: '/docs/margin-spot/Balance/GetBalanceBySymbol',
        },
        {
          title: 'Market',
          description: 'Market APIs',
          href: '/docs/margin-spot/Market/GetSymbolList',
        },
      ],
    },
    copyTrading: {
      title: 'Copy Trading',
      description: 'Copy Trading APIs',
      products: [
        {
          title: 'Access Description',
          description: 'Access Description APIs',
          href: '/docs/copy-trading/Access Description/BasicInformationOfTheInterface',
        },
        {
          title: 'Copy Trading',
          description: 'Copy Trading APIs',
          href: '/docs/copy-trading/Copy tradeing/GetCurrentLeaderOrder',
        },
      ],
    },
    futuresCopy: {
      title: 'Futures Copy',
      description: 'Futures Copy Trading APIs',
      products: [
        {
          title: 'Access Description',
          description: 'Access Description APIs',
          href: '/docs/futures-copy/Access Description/BasicInformationOfTheInterface',
        },
        {
          title: 'Copy Trading',
          description: 'Copy Trading APIs',
          href: '/docs/futures-copy/Copy Trading/ChooseLeader',
        },
      ],
    },
    tradingThirdParty: {
      title: 'Trading Third Party',
      description: 'Third Party Integration APIs',
      products: [
        {
          title: 'Access Description',
          description: 'Access Description APIs',
          href: '/docs/trading-third-party/Access Description/BasicInformationOfTheInterface',
        },
        {
          title: 'Balance',
          description: 'Balance APIs',
          href: '/docs/trading-third-party/Balance/GetSingleCurrencyAsset',
        },
        {
          title: 'OAuth Interface',
          description: 'OAuth Interface APIs',
          href: '/docs/trading-third-party/OAuth Interface/ApplyToken',
        },
        {
          title: 'Order',
          description: 'Order APIs',
          href: '/docs/trading-third-party/Order/GetSingleOrder',
        },
        {
          title: 'Trade',
          description: 'Trade APIs',
          href: '/docs/trading-third-party/Trade/QueryTrade',
        },
        {
          title: 'User Registration',
          description: 'User Registration APIs',
          href: '/docs/trading-third-party/User Registration/UserRegistration',
        },
      ],
    },
    userCenter: {
      title: 'User Center',
      description: 'User Management APIs',
      products: [
        {
          title: 'Access Description',
          description: 'Access Description APIs',
          href: '/docs/user-center/Access Description/BasicInformationOfTheInterface',
        },
        {
          title: 'Account',
          description: 'Account APIs',
          href: '/docs/user-center/Account/QueryAccountList',
        },
        {
          title: 'ApiKey',
          description: 'ApiKey APIs',
          href: '/docs/user-center/ApiKey/QueryUserApiKey',
        },
      ],
    },
    referralProgram: {
      title: 'Referral Program',
      description: 'Referral Program APIs',
      products: [
        {
          title: 'Access Description',
          description: 'Access Description APIs',
          href: '/docs/Referral Commission/Access Description/BasicInformation',
        },
        {
          title: 'Referral Management',
          description: 'Referral Management APIs',
          href: '/docs/Referral Commission/Referral Commission/GetAllUsersOfAffiliate',
        },
      ],
    },
    loan: {
      title: 'Loan',
      description: 'Loan APIs',
      products: [
        {
          title: 'Access Description',
          description: 'Access Description APIs',
          href: '/docs/loan/Access Description/BasicInformation',
        },
        {
          title: 'Borrow Money',
          description: 'Borrow Money APIs',
          href: '/docs/loan/Borrow Money/LoanBorrow',
        },
        {
          title: 'Repay',
          description: 'Repay APIs',
          href: '/docs/loan/Repay/LoanRepay',
        },
        {
          title: 'Adjust Collateral',
          description: 'Adjust Collateral APIs',
          href: '/docs/loan/Adjust Collateral/LoanAdjustPledge',
        },
        {
          title: 'Renew Loan',
          description: 'Renew Loan APIs',
          href: '/docs/loan/Renew Loan/LoanRenew',
        },
        {
          title: 'One Click Repay',
          description: 'One Click Repay APIs',
          href: '/docs/loan/One Click Repay/LoanBatchRepay',
        },
        {
          title: 'Auto Add Collateral Switch',
          description: 'Auto Add Collateral Switch APIs',
          href: '/docs/loan/Auto Add Collateral Switch/LoanAutoAdjustSwitch',
        },
        {
          title: 'Loan Inquiry',
          description: 'Loan Inquiry APIs',
          href: '/docs/loan/inquire/AdjustPledgeHistoryQuery',
        },
        {
          title: 'Loan Product Inquiry',
          description: 'Loan Product Inquiry APIs',
          href: '/docs/loan/Loan Product Inquiry/LoanCurrency',
        },
      ],
    },
    earn: {
      title: 'Earn',
      description: 'Earn APIs',
      products: [
        {
          title: 'Access Description',
          description: 'Access Description APIs',
          href: '/docs/earn/Access Description/BasicInformation',
        },
        {
          title: 'Auto Earn',
          description: 'Auto Earn APIs',
          href: '/docs/earn/Auto Earn/AutoSubscribeSet',
        },
        {
          title: 'Order Management',
          description: 'Order Management APIs',
          href: '/docs/earn/Order Management/SubscribeRedeem',
        },
        {
          title: 'Query',
          description: 'Query APIs',
          href: '/docs/earn/Query/ProductList',
        },
        {
          title: 'Special Products',
          description: 'Special Products APIs',
          href: '/docs/earn/Special Products/XRWURedeemQuota',
        },
      ],
    },
    broker: {
      title: 'Broker',
      description: 'Broker APIs',
      products: [
        {
          title: 'Access Description',
          description: 'Access Description APIs',
          href: '/docs/broker/Access Description/BasicInformation',
        },
        {
          title: 'Binding',
          description: 'Binding APIs',
          href: '/docs/broker/Binding/BindUserAccount',
        },
      ],
    },
    Trading: {
      title: 'Trading',
      description: 'Explore our trading APIs',
      products: [
        {
          title: 'Spot Trading',
          description: 'Spot Trading APIs',
          href: '/docs/spot/Access Description/BasicInformationOfTheInterface',
        },
        {
          title: 'Futures Trading',
          description: 'Futures Trading APIs',
          href: '/docs/futures/Access Description/BasicInformationOfTheInterface',
        },
        {
          title: 'Margin Trading',
          description: 'Margin Trading APIs',
          href: '/docs/margin-spot/Access Description/BasicInformationOfTheInterface',
        },
        {
          title: 'Copy Trading',
          description: 'Copy Trading API',
          href: '/docs/copy-trading/Access Description/BasicInformationOfTheInterface',
        },
        {
          title: 'Futures Copy',
          description: 'Futures Copy API',
          href: '/docs/futures-copy/Access Description/BasicInformationOfTheInterface',
        },
      ],
    },
    Institutional: {
      title: 'Institutional',
      description: 'Explore our institutional APIs',
      products: [
        {
          title: 'Trading Third Party',
          description: 'Third Party Integration',
          href: '/docs/trading-third-party/Access Description/BasicInformationOfTheInterface',
        },
        {
          title: 'User Center',
          description: 'User Management APIs',
          href: '/docs/user-center/Access Description/BasicInformationOfTheInterface',
        },
      ],
    },
    Resources: {
      title: 'Resources',
      description: 'Explore our resources and documentation',
      products: [
        {
          title: 'API Overview',
          description: 'Complete API Documentation',
          href: '/docs/index_overview/overview',
        },
        {
          title: 'Changelog',
          description: 'API Updates & Changes',
          href: '/docs/changelog/index',
        },
      ],
    },
  };

  const categoryData = productData[category];
  if (!categoryData) {
    return;
  }

  const categoryTitle = document.getElementById('categoryTitle');
  const categoryDesc = document.getElementById('categoryDesc');
  const productsGrid = document.getElementById('productsGrid');

  if (categoryTitle) {
    // Map internal category keys to i18n label keys
    const labelMap = {
      AllProducts: 'All Products',
      Index: 'Index',
      spot: 'Spot Trading',
      futures: 'Futures Trading',
      marginSpot: 'Margin Trading',
      copyTrading: 'Copy Trading',
      futuresCopy: 'Futures Copy',
      tradingThirdParty: 'Trading Third Party',
      userCenter: 'User Center',
      referralProgram: 'Referral Program',
      loan: 'Loan',
      earn: 'Earn',
      broker: 'Broker',
    };
    const titleLabel = labelMap[category] || categoryData.title || '';
    const titleKey = titleLabel.replace(/&/g, '&amp;');
    categoryTitle.setAttribute('data-i18n', `item.label.${titleKey}`);
    categoryTitle.textContent = titleLabel;
  }
  if (categoryDesc && categoryData.description) {
    categoryDesc.textContent = categoryData.description;
  }

  if (window.updateProductDropdownTranslations) {
    setTimeout(window.updateProductDropdownTranslations, 50);
  }

  if (productsGrid) {
    // 获取当前语言
    const currentLang = document.documentElement.lang || 'en';
    const basePath = currentLang === 'zh-CN' ? '/zh-CN' : '';

    productsGrid.innerHTML = categoryData.products
      .map((product) => {
        const titleKey = (product.title || '').replace(/&/g, '&amp;');
        const descKey = (product.description || '').replace(/&/g, '&amp;');
        // 为链接添加语言前缀
        const localizedHref = basePath + product.href;
        return `
      <a href="${localizedHref}" style="text-decoration: none; color: inherit; transition: opacity 0.2s;" onmouseover="this.style.opacity='0.7';" onmouseout="this.style.opacity='1';">
        <div style="font-weight: 600; margin-bottom: 4px; font-size: 14px; color: #1f2937;" data-i18n="item.label.${titleKey}">${product.title}</div>
        <div style="font-size: 12px; color: #6b7280;" data-i18n="item.label.${descKey}">${product.description}</div>
      </a>
    `;
      })
      .join('');
    if (window.updateProductDropdownTranslations) {
      setTimeout(window.updateProductDropdownTranslations, 50);
    }
  }

  // Update button states - try both selectors
  let allButtons = document.querySelectorAll('div[data-category]');
  if (allButtons.length === 0) {
    allButtons = document.querySelectorAll('div[onclick^="showCategory"]');
  }

  // Also clear the "All Products" static element
  let allProductsElement = document.getElementById('all-products-nav');
  if (!allProductsElement) {
    // Fallback to old method
    allProductsElement = document.querySelector('div[style*="All Products"]');
    if (!allProductsElement) {
      const allDivs = document.querySelectorAll('div');
      allDivs.forEach((div) => {
        if (div.textContent && div.textContent.trim() === 'All Products') {
          allProductsElement = div;
        }
      });
    }
  }
  if (allProductsElement) {
    allProductsElement.style.backgroundColor = 'transparent';
    allProductsElement.style.borderRight = 'none';
    allProductsElement.style.color = '#6b7280';
  }

  // Also clear the right content area highlights
  // Clear all links that might have been highlighted
  const allLinks = document.querySelectorAll('a');
  allLinks.forEach((link) => {
    // Only clear links that have our custom styling
    if (
      link.style.backgroundColor === 'rgb(243, 244, 246)' ||
      link.style.borderRight === '3px solid rgb(59, 130, 246)'
    ) {
      link.style.backgroundColor = 'transparent';
      link.style.borderRight = 'none';
      link.style.color = 'inherit';
      link.style.padding = '';
      link.style.borderRadius = '';
    }
  });

  allButtons.forEach((btn) => {
    btn.style.backgroundColor = 'transparent';
    btn.style.color = '#6b7280';
    btn.style.borderRight = 'none';
    // 确保清除所有可能的选中状态
    btn.classList.remove('active');
  });

  // Find and highlight the active button
  let activeButton = document.querySelector(`div[data-category="${category}"]`);
  if (!activeButton) {
    // Try to find by onclick attribute
    const buttons = document.querySelectorAll('div[onclick^="showCategory"]');
    buttons.forEach((btn) => {
      const onclickAttr = btn.getAttribute('onclick');
      if (onclickAttr?.includes(`'${category}'`)) {
        activeButton = btn;
      }
    });
  }

  if (activeButton) {
    // Special case: when AllProducts is selected, highlight "All Products"
    console.log('Category is AllProducts:', category === 'AllProducts');
    if (category === 'AllProducts') {
      console.log('Processing AllProducts selection...');
      let allProductsElementById = document.getElementById('all-products-nav');
      if (!allProductsElementById) {
        // Fallback to old method
        allProductsElementById = document.querySelector('div[style*="All Products"]');
        if (!allProductsElementById) {
          const allDivs = document.querySelectorAll('div');
          allDivs.forEach((div) => {
            if (div.textContent && div.textContent.trim() === 'All Products') {
              allProductsElementById = div;
            }
          });
        }
      }
      if (allProductsElementById) {
        allProductsElementById.style.backgroundColor = '#f3f4f6';
        allProductsElementById.style.borderRight = '3px solid #3b82f6';
        allProductsElementById.style.color = '#1f2937';
      }

      // Also highlight the "Index" item in the right content area
      console.log('Looking for right content Index link...');
      const rightContentIndex = document.getElementById('index-content-link');
      console.log('rightContentIndex by ID:', rightContentIndex);

      if (rightContentIndex) {
        console.log('Found right content Index link by ID:', rightContentIndex);
        rightContentIndex.style.backgroundColor = '#f3f4f6';
        rightContentIndex.style.borderRight = '3px solid #3b82f6';
        rightContentIndex.style.color = '#1f2937';
        rightContentIndex.style.padding = '8px 12px';
        rightContentIndex.style.borderRadius = '4px';
        console.log('Applied styles to right content Index link');
      } else {
        console.log('Right content Index link not found by ID, trying fallback...');
        // Fallback method
        const allLinksFallback = document.querySelectorAll('a');
        console.log('Total links found for fallback:', allLinksFallback.length);
        allLinksFallback.forEach((link, index) => {
          const linkText = link.textContent ? link.textContent.trim() : '';
          console.log(`Link ${index}: "${linkText}" -> ${link.href}`);
          if (linkText === 'Index' && link.href) {
            console.log('Found Index link by fallback:', link);
            link.style.backgroundColor = '#f3f4f6';
            link.style.borderRight = '3px solid #3b82f6';
            link.style.color = '#1f2937';
            link.style.padding = '8px 12px';
            link.style.borderRadius = '4px';
            console.log('Applied styles to fallback Index link');
          }
        });
      }
    } else {
      // For other categories, highlight the specific button
      activeButton.style.backgroundColor = '#f3f4f6';
      activeButton.style.color = '#1f2937';
      activeButton.style.borderRight = '3px solid #3b82f6';
    }
  }
};

// =========================
// 3) 绑定分类点击事件逻辑
// =========================
onReady(() => {
  console.log('DOMContentLoaded fired');
  // Wait a bit for the navbar to be rendered
  setTimeout(() => {
    console.log('Timeout fired, looking for All Products element...');
    console.log('Current page URL:', window.location.href);
    console.log('Document body:', document.body);
    // Add click event to "All Products" element
    let allProductsElement = document.getElementById('all-products-nav');
    if (!allProductsElement) {
      console.log('All Products element not found by ID, trying alternative selector...');
      // Try alternative selector
      allProductsElement = document.querySelector('div[style*="All Products"]');
      if (!allProductsElement) {
        const allDivs = document.querySelectorAll('div');
        allDivs.forEach((div) => {
          if (div.textContent && div.textContent.trim() === 'All Products') {
            allProductsElement = div;
          }
        });
      }
    }

    if (allProductsElement) {
      console.log('Found All Products element:', allProductsElement);
      allProductsElement.style.cursor = 'pointer';
      allProductsElement.addEventListener('click', () => {
        console.log('All Products clicked!');
        window.showCategory('AllProducts');
      });
    } else {
      console.log('All Products element not found at all!');
    }

    // Initialize with AllProducts category to ensure only one button is selected
    window.showCategory('AllProducts');
    const categoryButtons = document.querySelectorAll('div[data-category]');
    console.log('Found category buttons:', categoryButtons.length);

    if (categoryButtons.length === 0) {
      console.log('No category buttons found, trying alternative selector...');
      const altButtons = document.querySelectorAll('div[onclick^="showCategory"]');
      console.log('Found alternative buttons:', altButtons.length);

      // Use alternative buttons if data-category buttons not found
      altButtons.forEach((button) => {
        button.addEventListener('click', function clickHandler(e) {
          e.preventDefault();
          e.stopPropagation();

          const category = this.getAttribute('onclick').match(
            /showCategory\('(?<categoryName>[^']+)'\)/,
          ).groups.categoryName;
          console.log('Clicked category (alt):', category);

          // Update button states before calling showCategory
          altButtons.forEach((btn) => {
            btn.style.backgroundColor = 'transparent';
            btn.style.color = '#6b7280';
            btn.style.borderRight = 'none';
            btn.classList.remove('active');
          });

          // Call showCategory which will handle all button states
          window.showCategory(category);
        });
      });
    } else {
      categoryButtons.forEach((button) => {
        button.addEventListener('click', function clickHandler(e) {
          e.preventDefault();
          e.stopPropagation();

          const category = this.getAttribute('data-category');
          console.log('Clicked category:', category);

          // Update button states before calling showCategory
          categoryButtons.forEach((btn) => {
            btn.style.backgroundColor = 'transparent';
            btn.style.color = '#6b7280';
            btn.style.borderRight = 'none';
            btn.classList.remove('active');
          });

          // Call showCategory which will handle all button states
          window.showCategory(category);
        });
      });
    }
  }, 1500);
});
