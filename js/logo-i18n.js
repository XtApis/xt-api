/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

(function initLogoI18n() {
  console.log('🚀 Initializing logo i18n handler');

  function handleLogoClick(event) {
    // 阻止默认行为
    event.preventDefault();

    // 获取当前语言
    const currentLang = document.documentElement.lang || 'en';
    console.log('🌐 Current language:', currentLang);

    // 根据当前语言构建正确的路径
    const basePath = currentLang === 'zh-Hans' ? '/zh-Hans' : '';
    const targetUrl = `${basePath  }/docs/index_overview/overview`;

    console.log('🎯 Navigating to:', targetUrl);

    // 使用 replace 而不是 href 来避免历史记录问题
    window.location.replace(targetUrl);
  }

  function setupLogoClickHandler() {
    // 查找 logo 链接
    const logoLink = document.querySelector(
      '.navbar__brand a, .navbar__logo a',
    );

    if (logoLink) {
      console.log('✅ Found logo link, setting up click handler');
      logoLink.addEventListener('click', handleLogoClick);
    } else {
      console.log('⚠️ Logo link not found, retrying...');
      // 如果没找到，延迟重试
      setTimeout(setupLogoClickHandler, 100);
    }
  }

  // 页面加载完成后设置监听器
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      console.log('📄 DOMContentLoaded fired');
      setupLogoClickHandler();
    });
  } else {
    console.log('✅ DOM already loaded');
    setupLogoClickHandler();
  }

  // 延迟执行，确保所有元素都已渲染
  setTimeout(setupLogoClickHandler, 100);
  setTimeout(setupLogoClickHandler, 500);
  setTimeout(setupLogoClickHandler, 1000);

  console.log('🎉 Logo i18n handler initialized');
})();
