/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
let hoverTimeout;

document.addEventListener('DOMContentLoaded', () => {
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
        {
          title: 'API Resources and Support',
          description: 'API Resources and Support',
          href: '/docs/index_overview/index_overview_resource',
        },
      ],
    },
    spot: {
      title: 'spot',
      description: 'spot',
      products: [
        {
          title: 'AccessDescription',
          description: 'AccessDescription APIs',
          href: '/docs/spot/AccessDescription/RestApi',
        },
        {
          title: 'Balance',
          description: 'Balance APIs',
          href: '/docs/spot/Balance/GetCurrencyInfo',
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
          title: 'WebSocket_Private',
          description: 'WebSocket_Private APIs',
          href: '/docs/spot/WebSocket_Private/RequestMessageFormat',
        },
        {
          title: 'WebSocket_Public',
          description: 'WebSocket_Public APIs',
          href: '/docs/spot/WebSocket_Public/wss-general',
        },
      ],
    },
    futures: {
      title: 'Futures',
      description: 'Futures Trading APIs',
      products: [
        {
          title: 'AccessDescription',
          description: 'AccessDescription APIs',
          href: '/docs/futures/AccessDescription/RestApi',
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
          href: '/docs/futures/PythonPackage/PythonPackage',
        },
        {
          title: 'Quote Collection',
          description: 'Quote Collection APIs',
          href: '/docs/futures/Quote collection/GetDepthInfo',
        },
        {
          title: 'User',
          description: 'User APIs',
          href: '/docs/futures/User/GetUserInfo',
        },
        {
          title: 'WebSocket V2',
          description: 'WebSocket V2 APIs',
          href: '/docs/futures/WEBSOCKET(V2)/Request message format',
        },
      ],
    },
    marginSpot: {
      title: 'Margin Spot',
      description: 'Margin Spot Trading APIs',
      products: [
        {
          title: 'AccessDescription',
          description: 'AccessDescription APIs',
          href: '/docs/margin-spot/AccessDescription/RestApi',
        },
        {
          title: 'Balance',
          description: 'Balance APIs',
          href: '/docs/margin-spot/Balance/GetBalance',
        },
        {
          title: 'Market',
          description: 'Market APIs',
          href: '/docs/margin-spot/Market/GetServerTime',
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
          href: '/docs/copy-trading/Access Description/RestApi',
        },
        {
          title: 'Copy Trading',
          description: 'Copy Trading APIs',
          href: '/docs/copy-trading/Copy tradeing/ChooseLeader',
        },
      ],
    },
    futuresCopy: {
      title: 'Futures Copy',
      description: 'Futures Copy Trading APIs',
      products: [
        {
          title: 'AccessDescription',
          description: 'AccessDescription APIs',
          href: '/docs/futures-copy/AccessDescription/RestApi',
        },
        {
          title: 'Copy Trading',
          description: 'Copy Trading APIs',
          href: '/docs/futures-copy/Copy Trading/ChooseLeader',
        },
        {
          title: 'Installation',
          description: 'Installation Guide',
          href: '/docs/futures-copy/installation',
        },
      ],
    },
    tradingThirdParty: {
      title: 'Trading Third Party',
      description: 'Third Party Integration APIs',
      products: [
        {
          title: 'AccessDescription',
          description: 'AccessDescription APIs',
          href: '/docs/trading-third-party/AccessDescription/RestAPI',
        },
        {
          title: 'Balance',
          description: 'Balance APIs',
          href: '/docs/trading-third-party/Balance/GetBalance',
        },
        {
          title: 'OAuth Interface',
          description: 'OAuth Interface APIs',
          href: '/docs/trading-third-party/OAuth Interface/OAuth',
        },
        {
          title: 'Order',
          description: 'Order APIs',
          href: '/docs/trading-third-party/Order/CreateOrder',
        },
        {
          title: 'Trade',
          description: 'Trade APIs',
          href: '/docs/trading-third-party/Trade/QueryTrade',
        },
        {
          title: 'User Registration',
          description: 'User Registration APIs',
          href: '/docs/trading-third-party/User Registration/User_Registration',
        },
      ],
    },
    userCenter: {
      title: 'User Center',
      description: 'User Management APIs',
      products: [
        {
          title: 'AccessDescription',
          description: 'AccessDescription APIs',
          href: '/docs/user-center/AccessDescription/RestAPI',
        },
        {
          title: 'Account',
          description: 'Account APIs',
          href: '/docs/user-center/Account/GetAccountInfo',
        },
        {
          title: 'ApiKey',
          description: 'ApiKey APIs',
          href: '/docs/user-center/ApiKey/CreateApiKey',
        },
        {
          title: 'Referral Commission',
          description: 'Referral Commission APIs',
          href: '/docs/user-center/Referral Commission/GetReferralInfo',
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
          href: '/docs/spot/AccessDescription/RestApi',
        },
        {
          title: 'Futures Trading',
          description: 'Futures Trading APIs',
          href: '/docs/futures/AccessDescription/RestApi',
        },
        {
          title: 'Margin Trading',
          description: 'Margin Trading APIs',
          href: '/docs/margin-spot/AccessDescription/RestApi',
        },
        {
          title: 'Copy Trading',
          description: 'Copy Trading API',
          href: '/docs/copy-trading/Access Description/RestApi',
        },
        {
          title: 'Futures Copy',
          description: 'Futures Copy API',
          href: '/docs/futures-copy/AccessDescription/RestApi',
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
          href: '/docs/trading-third-party/AccessDescription/RestAPI',
        },
        {
          title: 'User Center',
          description: 'User Management APIs',
          href: '/docs/user-center/AccessDescription/RestAPI',
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
      productsContent.innerHTML = categoryData.products
        .map(
          (product) => `
        <a href="${product.href}" class="product-item">
          <div class="product-title">${product.title}</div>
          <div class="product-description">${product.description}</div>
        </a>
      `,
        )
        .join('');
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

  // Add hover delay for better UX
  const dropdown = document.querySelector('.dropdown--hoverable');
  const dropdownMenu = document.querySelector('.dropdown__menu');

  if (dropdown && dropdownMenu) {
    // Force full width styling
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
      dropdownMenu.style.maxHeight = '400px';
      dropdownMenu.style.overflowY = 'auto';

      // Also target the inner div
      const innerDiv = dropdownMenu.querySelector(
        'div[style*="padding: 15px; width: 100%"]',
      );
      if (innerDiv) {
        innerDiv.style.width = '100vw';
        innerDiv.style.maxWidth = '100vw';
        innerDiv.style.minWidth = '100vw';
        innerDiv.style.margin = '0';
      }
    };

    // Apply immediately
    applyFullWidth();

    // Apply again after a short delay to ensure it sticks
    setTimeout(applyFullWidth, 100);
    setTimeout(applyFullWidth, 500);

    // Show menu on hover with small delay to prevent flickering
    dropdown.addEventListener('mouseenter', () => {
      clearTimeout(hoverTimeout);
      hoverTimeout = setTimeout(() => {
        dropdownMenu.style.display = 'block';
        dropdownMenu.style.opacity = '1';
        dropdownMenu.style.visibility = 'visible';
      }, 50); // Small delay to prevent flickering
    });

    // Hide menu when leaving dropdown container with delay
    dropdown.addEventListener('mouseleave', () => {
      clearTimeout(hoverTimeout);
      hoverTimeout = setTimeout(() => {
        dropdownMenu.style.display = 'none';
        dropdownMenu.style.opacity = '0';
        dropdownMenu.style.visibility = 'hidden';
      }, 100); // Small delay to prevent flickering
    });

    // Keep menu visible when hovering over the menu itself
    dropdownMenu.addEventListener('mouseenter', () => {
      clearTimeout(hoverTimeout);
      dropdownMenu.style.display = 'block';
      dropdownMenu.style.opacity = '1';
      dropdownMenu.style.visibility = 'visible';
    });

    // Hide menu when leaving the menu itself with delay
    dropdownMenu.addEventListener('mouseleave', () => {
      clearTimeout(hoverTimeout);
      hoverTimeout = setTimeout(() => {
        dropdownMenu.style.display = 'none';
        dropdownMenu.style.opacity = '0';
        dropdownMenu.style.visibility = 'hidden';
      }, 100); // Small delay to prevent flickering
    });
  }
});

// Global function for category switching
// must be defined outside DOMContentLoaded
window.showCategory = function showCategory(category) {
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
        {
          title: 'API Resources and Support',
          description: 'API Resources and Support',
          href: '/docs/index_overview/index_overview_resource',
        },
      ],
    },
    spot: {
      title: 'Spot',
      description: 'Spot Trading APIs',
      products: [
        {
          title: 'AccessDescription',
          description: 'AccessDescription APIs',
          href: '/docs/spot/AccessDescription/RestApi',
        },
        {
          title: 'Balance',
          description: 'Balance APIs',
          href: '/docs/spot/Balance/GetCurrencyInfo',
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
          title: 'WebSocket_Private',
          description: 'WebSocket_Private APIs',
          href: '/docs/spot/WebSocket_Private/RequestMessageFormat',
        },
        {
          title: 'WebSocket_Public',
          description: 'WebSocket_Public APIs',
          href: '/docs/spot/WebSocket_Public/wss-general',
        },
      ],
    },
    futures: {
      title: 'Futures',
      description: 'Futures Trading APIs',
      products: [
        {
          title: 'AccessDescription',
          description: 'AccessDescription APIs',
          href: '/docs/futures/AccessDescription/RestApi',
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
          href: '/docs/futures/PythonPackage/PythonPackage',
        },
        {
          title: 'Quote Collection',
          description: 'Quote Collection APIs',
          href: '/docs/futures/Quote collection/GetDepthInfo',
        },
        {
          title: 'User',
          description: 'User APIs',
          href: '/docs/futures/User/GetUserInfo',
        },
        {
          title: 'WebSocket V2',
          description: 'WebSocket V2 APIs',
          href: '/docs/futures/WEBSOCKET(V2)/Request message format',
        },
      ],
    },
    marginSpot: {
      title: 'Margin Spot',
      description: 'Margin Spot Trading APIs',
      products: [
        {
          title: 'AccessDescription',
          description: 'AccessDescription APIs',
          href: '/docs/margin-spot/AccessDescription/RestApi',
        },
        {
          title: 'Balance',
          description: 'Balance APIs',
          href: '/docs/margin-spot/Balance/GetBalance',
        },
        {
          title: 'Market',
          description: 'Market APIs',
          href: '/docs/margin-spot/Market/GetServerTime',
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
          href: '/docs/copy-trading/Access Description/RestApi',
        },
        {
          title: 'Copy Trading',
          description: 'Copy Trading APIs',
          href: '/docs/copy-trading/Copy tradeing/ChooseLeader',
        },
      ],
    },
    futuresCopy: {
      title: 'Futures Copy',
      description: 'Futures Copy Trading APIs',
      products: [
        {
          title: 'AccessDescription',
          description: 'AccessDescription APIs',
          href: '/docs/futures-copy/AccessDescription/RestApi',
        },
        {
          title: 'Copy Trading',
          description: 'Copy Trading APIs',
          href: '/docs/futures-copy/Copy Trading/ChooseLeader',
        },
        {
          title: 'Installation',
          description: 'Installation Guide',
          href: '/docs/futures-copy/installation',
        },
      ],
    },
    tradingThirdParty: {
      title: 'Trading Third Party',
      description: 'Third Party Integration APIs',
      products: [
        {
          title: 'AccessDescription',
          description: 'AccessDescription APIs',
          href: '/docs/trading-third-party/AccessDescription/RestAPI',
        },
        {
          title: 'Balance',
          description: 'Balance APIs',
          href: '/docs/trading-third-party/Balance/GetBalance',
        },
        {
          title: 'OAuth Interface',
          description: 'OAuth Interface APIs',
          href: '/docs/trading-third-party/OAuth Interface/OAuth',
        },
        {
          title: 'Order',
          description: 'Order APIs',
          href: '/docs/trading-third-party/Order/CreateOrder',
        },
        {
          title: 'Trade',
          description: 'Trade APIs',
          href: '/docs/trading-third-party/Trade/QueryTrade',
        },
        {
          title: 'User Registration',
          description: 'User Registration APIs',
          href: '/docs/trading-third-party/User Registration/User_Registration',
        },
      ],
    },
    userCenter: {
      title: 'User Center',
      description: 'User Management APIs',
      products: [
        {
          title: 'AccessDescription',
          description: 'AccessDescription APIs',
          href: '/docs/user-center/AccessDescription/RestAPI',
        },
        {
          title: 'Account',
          description: 'Account APIs',
          href: '/docs/user-center/Account/GetAccountInfo',
        },
        {
          title: 'ApiKey',
          description: 'ApiKey APIs',
          href: '/docs/user-center/ApiKey/CreateApiKey',
        },
        {
          title: 'Referral Commission',
          description: 'Referral Commission APIs',
          href: '/docs/user-center/Referral Commission/GetReferralInfo',
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
          href: '/docs/spot/AccessDescription/RestApi',
        },
        {
          title: 'Futures Trading',
          description: 'Futures Trading APIs',
          href: '/docs/futures/AccessDescription/RestApi',
        },
        {
          title: 'Margin Trading',
          description: 'Margin Trading APIs',
          href: '/docs/margin-spot/AccessDescription/RestApi',
        },
        {
          title: 'Copy Trading',
          description: 'Copy Trading API',
          href: '/docs/copy-trading/Access Description/RestApi',
        },
        {
          title: 'Futures Copy',
          description: 'Futures Copy API',
          href: '/docs/futures-copy/AccessDescription/RestApi',
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
          href: '/docs/trading-third-party/AccessDescription/RestAPI',
        },
        {
          title: 'User Center',
          description: 'User Management APIs',
          href: '/docs/user-center/AccessDescription/RestAPI',
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
    categoryTitle.textContent = categoryData.title;
  }
  if (categoryDesc) {
    categoryDesc.textContent = categoryData.description;
  }

  if (productsGrid) {
    productsGrid.innerHTML = categoryData.products
      .map(
        (product) => `
      <a href="${product.href}" style="text-decoration: none; color: inherit; transition: opacity 0.2s;" onmouseover="this.style.opacity='0.7';" onmouseout="this.style.opacity='1';">
        <div style="font-weight: 600; margin-bottom: 4px; font-size: 14px; color: #1f2937;">${product.title}</div>
        <div style="font-size: 12px; color: #6b7280;">${product.description}</div>
      </a>
    `,
      )
      .join('');
  }

  // Update button states - try both selectors
  let allButtons = document.querySelectorAll('div[data-category]');
  if (allButtons.length === 0) {
    allButtons = document.querySelectorAll('div[onclick^="showCategory"]');
  }

  allButtons.forEach((btn) => {
    btn.style.backgroundColor = 'transparent';
    btn.style.color = '#6b7280';
    btn.style.borderRight = 'none';
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
    activeButton.style.backgroundColor = '#f3f4f6';
    activeButton.style.color = '#1f2937';
    activeButton.style.borderRight = '3px solid #3b82f6';
  }
};

// Add event listeners for category buttons after DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Wait a bit for the navbar to be rendered
  setTimeout(() => {
    const categoryButtons = document.querySelectorAll('div[data-category]');
    console.log('Found category buttons:', categoryButtons.length);

    if (categoryButtons.length === 0) {
      console.log('No category buttons found, trying alternative selector...');
      const altButtons = document.querySelectorAll(
        'div[onclick^="showCategory"]',
      );
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
          });

          // Set active state for clicked button
          this.style.backgroundColor = '#f3f4f6';
          this.style.color = '#1f2937';
          this.style.borderRight = '3px solid #3b82f6';

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
          });

          // Set active state for clicked button
          this.style.backgroundColor = '#f3f4f6';
          this.style.color = '#1f2937';
          this.style.borderRight = '3px solid #3b82f6';

          window.showCategory(category);
        });
      });
    }
  }, 2000);
});
