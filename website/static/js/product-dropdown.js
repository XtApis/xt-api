/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
let hoverTimeout;

document.addEventListener('DOMContentLoaded', () => {
  const productData = {
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
          href: '/docs/futures/AccessDescription/apiDemo',
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
    if (!categoryData) {return;}

    const categoryTitle = document.getElementById('categoryTitle');
    const categoryDescription = document.getElementById('categoryDescription');
    const productsContent = document.getElementById('productsContent');

    if (categoryTitle) {categoryTitle.textContent = categoryData.title;}
    if (categoryDescription)
      {categoryDescription.textContent = categoryData.description;}

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

// Global function for category switching - must be defined outside DOMContentLoaded
window.showCategory = function showCategory(category) {
  const productData = {
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
          href: '/docs/futures/AccessDescription/apiDemo',
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
  if (!categoryData) {return;}

  const categoryTitle = document.getElementById('categoryTitle');
  const categoryDesc = document.getElementById('categoryDesc');
  const productsGrid = document.getElementById('productsGrid');

  if (categoryTitle) {categoryTitle.textContent = categoryData.title;}
  if (categoryDesc) {categoryDesc.textContent = categoryData.description;}

  if (productsGrid) {
    productsGrid.innerHTML = categoryData.products
      .map(
        (product) => `
      <a href="${product.href}" style="padding: 15px; background: #f8f9fa; border: 1px solid #dee2e6; border-radius: 8px; text-decoration: none; color: #333; transition: all 0.2s;" onmouseover="this.style.background='#007bff'; this.style.color='white';" onmouseout="this.style.background='#f8f9fa'; this.style.color='#333';">
        <div style="font-weight: 600; margin-bottom: 5px;">${product.title}</div>
        <div style="font-size: 14px; color: #666;">${product.description}</div>
      </a>
    `,
      )
      .join('');
  }

  // Update button states
  document
    .querySelectorAll('button[onmouseover^="showCategory"]')
    .forEach((btn) => {
      btn.style.background = '#6c757d';
    });
  if (window.event?.target) {
    window.event.target.style.background = '#007bff';
  }
};
