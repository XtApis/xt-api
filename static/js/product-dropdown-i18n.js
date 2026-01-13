/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

(function initProductDropdownI18n() {
  function getTranslations() {
    return {
      en: {
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
        'item.label.Deposit&Withdrawal': 'Deposit & Withdrawal',
        'item.label.Deposit&amp;Withdrawal': 'Deposit & Withdrawal',
        'item.label.Market': 'Market',
        'item.label.Order': 'Order',
        'item.label.Trade': 'Trade',
        'item.label.Transfer': 'Transfer',
        'item.label.WebSocket Private': 'WebSocket Private',
        'item.label.WebSocket Public': 'WebSocket Public',
        'item.label.Spot': 'Spot',
        'item.label.Futures': 'Futures',
        'item.label.Explore our index APIs': 'Explore our index APIs',
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
        'item.label.Account': 'Account',
        'item.label.ApiKey': 'ApiKey',
        'item.label.Referral Commission': 'Referral Commission',
        'item.label.OAuth Interface': 'OAuth Interface',
        'item.label.User Registration': 'User Registration',
        'item.label.Index APIs': 'Index APIs',
        'item.label.Spot Trading APIs': 'Spot Trading APIs',
        'item.label.Futures Trading APIs': 'Futures Trading APIs',
        'item.label.Margin Trading APIs': 'Margin Trading APIs',
        'item.label.Copy Trading API': 'Copy Trading API',
        'item.label.Futures Copy API': 'Futures Copy API',
        'item.label.Installation': 'Installation',
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
        'item.label.Account APIs': 'Account APIs',
        'item.label.ApiKey APIs': 'ApiKey APIs',
        'item.label.Referral Commission APIs': 'Referral Commission APIs',
        'item.label.OAuth Interface APIs': 'OAuth Interface APIs',
        'item.label.User Registration APIs': 'User Registration APIs',
        'item.label.Comprehensive API solutions for all your trading needs':
          'Comprehensive API solutions for all your trading needs',
        'item.label.Installation Guide': 'Installation Guide',
        'item.label.Referral Program': 'Referral Program',
        'item.label.Referral Program API': 'Referral Program API',
        'item.label.Referral Program APIs': 'Referral Program APIs',
        'item.label.Referral Management': 'Referral Management',
        'item.label.Referral Management APIs': 'Referral Management APIs',
        'item.label.Loan': 'Loan',
        'item.label.Loan API': 'Loan API',
        'item.label.Loan APIs': 'Loan APIs',
        'item.label.Borrow Money': 'Borrow Money',
        'item.label.Borrow Money APIs': 'Borrow Money APIs',
        'item.label.Repay': 'Repay',
        'item.label.Repay APIs': 'Repay APIs',
        'item.label.Adjust Collateral': 'Adjust Collateral',
        'item.label.Adjust Collateral APIs': 'Adjust Collateral APIs',
        'item.label.Renew Loan': 'Renew Loan',
        'item.label.Renew Loan APIs': 'Renew Loan APIs',
        'item.label.One Click Repay': 'One Click Repay',
        'item.label.One Click Repay APIs': 'One Click Repay APIs',
        'item.label.Auto Add Collateral Switch': 'Auto Add Collateral Switch',
        'item.label.Auto Add Collateral Switch APIs':
          'Auto Add Collateral Switch APIs',
        'item.label.Loan Inquiry': 'Loan Inquiry',
        'item.label.Loan Inquiry APIs': 'Loan Inquiry APIs',
        'item.label.Loan Product Inquiry': 'Loan Product Inquiry',
        'item.label.Loan Product Inquiry APIs': 'Loan Product Inquiry APIs',
        'item.label.Earn': 'Earn',
        'item.label.Earn API': 'Earn API',
        'item.label.Earn APIs': 'Earn APIs',
        'item.label.Broker': 'Broker',
        'item.label.Broker API': 'Broker API',
        'item.label.Broker APIs': 'Broker APIs',
        'item.label.Binding': 'Binding',
        'item.label.Binding APIs': 'Binding APIs',
      },
      'zh-CN': {
        'item.label.All Products': '所有产品',
        'item.label.Index': '指数',
        'item.label.Spot Trading': '现货交易',
        'item.label.Futures Trading': '合约交易',
        'item.label.Margin Trading': '杠杆交易',
        'item.label.Copy Trading': '跟单交易',
        'item.label.Futures Copy': '合约跟单',
        'item.label.Trading Third Party': '第三方交易',
        'item.label.User Center': '用户中心',
        'item.label.Balance': '账户余额',
        'item.label.Deposit&Withdrawal': '充币与提币',
        'item.label.Deposit&amp;Withdrawal': '充币与提币',
        'item.label.Market': '行情',
        'item.label.Order': '订单',
        'item.label.Trade': '交易',
        'item.label.Transfer': '资金划转',
        'item.label.WebSocket Private': 'WebSocket 私有接口',
        'item.label.WebSocket Public': 'WebSocket 公共接口',
        'item.label.Spot': '现货交易',
        'item.label.Futures': '合约交易',
        'item.label.Explore our index APIs': '浏览指数 API',
        'item.label.Futures WebSocket': '合约 WebSocket',
        'item.label.Access Description': '访问说明',
        'item.label.Entrust': '委托',
        'item.label.Market Data': '行情数据',
        'item.label.Python Package': 'Python 开发包',
        'item.label.Quote Collection': '行情收集',
        'item.label.User': '用户',
        'item.label.WebSocket V2': 'WebSocket V2 接口',
        'item.label.Margin Balance': '杠杆余额',
        'item.label.Copy Account': '跟单账户',
        'item.label.Account': '账户',
        'item.label.ApiKey': 'ApiKey',
        'item.label.Referral Commission': '返佣',
        'item.label.OAuth Interface': 'OAuth 接口',
        'item.label.User Registration': '用户注册',
        'item.label.Index APIs': '指数 API',
        'item.label.Spot Trading APIs': '现货交易 API',
        'item.label.Futures Trading APIs': '合约交易 API',
        'item.label.Margin Trading APIs': '杠杆交易 API',
        'item.label.Copy Trading APIs': '跟单交易 API',
        'item.label.Copy Trading API': '跟单交易 API',
        'item.label.Futures Copy API': '合约跟单 API',
        'item.label.Futures Copy Trading APIs': '合约跟单 API',
        'item.label.Installation': '安装',
        'item.label.Trading Third Party API': '第三方交易 API',
        'item.label.User Center API': '用户中心 API',
        'item.label.Third Party Integration APIs': '第三方集成 API',
        'item.label.User Management APIs': '用户管理 API',
        'item.label.Margin Spot': '杠杆现货',
        'item.label.Margin Spot Trading APIs': '杠杆现货交易 API',
        'item.label.Balance APIs': '账户余额 API',
        'item.label.Deposit&Withdrawal APIs': '充币与提币 API',
        'item.label.Deposit&amp;Withdrawal APIs': '充币与提币 API',
        'item.label.Market APIs': '行情 API',
        'item.label.Order APIs': '订单 API',
        'item.label.Trade APIs': '交易 API',
        'item.label.Transfer APIs': '资金划转 API',
        'item.label.WebSocket Private APIs': 'WebSocket 私有接口 API',
        'item.label.WebSocket Public APIs': 'WebSocket 公共接口 API',
        'item.label.Futures WebSocket APIs': '合约 WebSocket API',
        'item.label.Access Description APIs': '访问说明 API',
        'item.label.Entrust APIs': '委托 API',
        'item.label.Market Data APIs': '行情数据 API',
        'item.label.Python Package APIs': 'Python 开发包 API',
        'item.label.Quote Collection APIs': '行情收集 API',
        'item.label.User APIs': '用户 API',
        'item.label.WebSocket V2 APIs': 'WebSocket V2 接口 API',
        'item.label.Margin Balance APIs': '杠杆余额 API',
        'item.label.Copy Account APIs': '跟单账户 API',
        'item.label.Account APIs': '账户 API',
        'item.label.ApiKey APIs': 'ApiKey API',
        'item.label.Referral Commission APIs': '返佣 API',
        'item.label.OAuth Interface APIs': 'OAuth 接口 API',
        'item.label.User Registration APIs': '用户注册 API',
        'item.label.Comprehensive API solutions for all your trading needs':
          '为您的所有交易需求提供全面的 API 解决方案',
        'item.label.Installation Guide': '安装向导',
        'item.label.Referral Program': '邀请返佣',
        'item.label.Referral Program API': '邀请返佣 API',
        'item.label.Referral Program APIs': '邀请返佣 API',
        'item.label.Referral Management': '邀请返佣',
        'item.label.Referral Management APIs': '邀请返佣 API',
        'item.label.Loan': '借贷',
        'item.label.Loan API': '借贷 API',
        'item.label.Loan APIs': '借贷 API',
        'item.label.Borrow Money': '借款',
        'item.label.Borrow Money APIs': '借款 API',
        'item.label.Repay': '还款',
        'item.label.Repay APIs': '还款 API',
        'item.label.Adjust Collateral': '调整质押物',
        'item.label.Adjust Collateral APIs': '调整质押物 API',
        'item.label.Renew Loan': '续借',
        'item.label.Renew Loan APIs': '续借 API',
        'item.label.One Click Repay': '一键还款',
        'item.label.One Click Repay APIs': '一键还款 API',
        'item.label.Auto Add Collateral Switch': '自动补仓开关',
        'item.label.Auto Add Collateral Switch APIs': '自动补仓开关 API',
        'item.label.Loan Inquiry': '查询接口',
        'item.label.Loan Inquiry APIs': '查询接口 API',
        'item.label.Loan Product Inquiry': '产品信息查询',
        'item.label.Loan Product Inquiry APIs': '产品信息查询 API',
        'item.label.Earn': '理财',
        'item.label.Earn API': '理财 API',
        'item.label.Earn APIs': '理财 API',
        'item.label.Broker': '经纪商',
        'item.label.Broker API': '经纪商 API',
        'item.label.Broker APIs': '经纪商 API',
        'item.label.Binding': '绑定接口',
        'item.label.Binding APIs': '绑定接口 API',
      },
    };
  }

  function updateDropdownTranslations() {
    try {
      const locale = document.documentElement.lang || 'en';
      const translations = getTranslations();
      const current = translations[locale] || translations.en;
      const elements = document.querySelectorAll('[data-i18n]');

      elements.forEach((el) => {
        const key = el.getAttribute('data-i18n');
        if (key && current[key]) {
          el.textContent = current[key];
        }
      });
    } catch (e) {
      // noop
    }
  }

  function setupDropdownObserver() {
    try {
      const observer = new MutationObserver(() => {
        setTimeout(updateDropdownTranslations, 100);
      });
      observer.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['class', 'style'],
      });
    } catch (e) {
      // noop
    }
  }

  function setupLangObserver() {
    try {
      const langObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (
            mutation.type === 'attributes' &&
            mutation.attributeName === 'lang'
          ) {
            setTimeout(updateDropdownTranslations, 100);
          }
        });
      });
      langObserver.observe(document.documentElement, {attributes: true});
    } catch (e) {
      // noop
    }
  }

  function boot() {
    updateDropdownTranslations();
    setupDropdownObserver();
    setupLangObserver();

    window.addEventListener('focus', () => {
      setTimeout(updateDropdownTranslations, 100);
    });

    document.addEventListener('mouseover', (event) => {
      const dropdown = event.target.closest('.navbar__item--dropdown');
      if (dropdown) {
        setTimeout(updateDropdownTranslations, 50);
      }
    });

    setTimeout(updateDropdownTranslations, 100);
    setTimeout(updateDropdownTranslations, 500);
    setTimeout(updateDropdownTranslations, 1000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

  // expose for other scripts to optionally call
  window.updateProductDropdownTranslations = updateDropdownTranslations;
})();
