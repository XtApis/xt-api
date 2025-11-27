import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "user_zh/用户",
    },
    {
      type: "category",
      label: "basic-error-controller",
      link: {
        type: "doc",
        id: "user_zh/basic-error-controller",
      },
      items: [
        {
          type: "doc",
          id: "user_zh/error-using-get",
          label: "error",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "user_zh/error-using-put",
          label: "error",
          className: "api-method put",
        },
        {
          type: "doc",
          id: "user_zh/error-using-post",
          label: "error",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "user_zh/error-using-delete",
          label: "error",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "user_zh/error-using-options",
          label: "error",
          className: "api-method options",
        },
        {
          type: "doc",
          id: "user_zh/error-using-head",
          label: "error",
          className: "api-method head",
        },
        {
          type: "doc",
          id: "user_zh/error-using-patch",
          label: "error",
          className: "api-method patch",
        },
        {
          type: "doc",
          id: "user_zh/error-using-trace",
          label: "error",
          className: "api-method trace",
        },
      ],
    },
    {
      type: "category",
      label: "listenKey",
      link: {
        type: "doc",
        id: "user_zh/listen-key",
      },
      items: [
        {
          type: "doc",
          id: "user_zh/get-listen-key-using-get",
          label: "获取listenKey",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "operation-handler",
      link: {
        type: "doc",
        id: "user_zh/operation-handler",
      },
      items: [
        {
          type: "doc",
          id: "user_zh/handle-using-get",
          label: "handle",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "user_zh/handle-using-get-1",
          label: "handle",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "user_zh/handle-using-get-2",
          label: "handle",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "symbol-controller",
      link: {
        type: "doc",
        id: "user_zh/symbol-controller",
      },
      items: [
        {
          type: "doc",
          id: "user_zh/get-symbol-detail-by-name-using-get",
          label: "获取单个交易对的配置信息",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "web-mvc-links-handler",
      link: {
        type: "doc",
        id: "user_zh/web-mvc-links-handler",
      },
      items: [
        {
          type: "doc",
          id: "user_zh/links-using-get",
          label: "links",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "内部接口",
      link: {
        type: "doc",
        id: "user_zh/内部接口",
      },
      items: [
        {
          type: "doc",
          id: "user_zh/get-balance-bills-using-get-1",
          label: "获取用户账务流水",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "user_zh/fund-using-get-1",
          label: "获取账户资金",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "user_zh/fund-using-get",
          label: "获取账户资金",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "user_zh/get-account-info-using-get",
          label: "获取用户合约信息",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "user_zh/get-history-trade-amount-using-post",
          label: "批量获取用户历史合约交易量",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "user_zh/get-coin-list-using-get",
          label: "币种列表",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "user_zh/attention-using-post",
          label: "关注/取消关注",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "user_zh/is-follower-using-post",
          label: "用户是否跟单员",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "user_zh/coin-check-using-get",
          label: "是否可划转",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "user_zh/cold-start-using-post",
          label: "聪明钱冷启动执行接口",
          className: "menu__list-item--deprecated api-method post",
        },
        {
          type: "doc",
          id: "user_zh/cold-start-pro-using-post",
          label: "聪明钱冷启动执行接口2",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "user_zh/get-symbol-info-using-get",
          label: "交易对信息",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "user_zh/find-all-using-get",
          label: "查询所有交易对",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "分享",
      link: {
        type: "doc",
        id: "user_zh/分享",
      },
      items: [
        {
          type: "doc",
          id: "user_zh/get-template-using-get",
          label: "获取分享文案模版",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "合约告知书",
      link: {
        type: "doc",
        id: "user_zh/合约告知书",
      },
      items: [
        {
          type: "doc",
          id: "user_zh/is-read-notice-using-get",
          label: "是否已阅读风险告知书",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "user_zh/read-notice-using-post",
          label: "阅读风险告知书",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "合约聪明钱",
      link: {
        type: "doc",
        id: "user_zh/合约聪明钱",
      },
      items: [
        {
          type: "doc",
          id: "user_zh/deal-sub-account-using-post",
          label: "加入子账号、移除子账号",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "user_zh/get-desc-using-get",
          label: "查询描述",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "user_zh/get-smart-money-sub-accounts-using-get",
          label: "查询子账号列表",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "user_zh/update-notify-using-post",
          label: "开、关推送接口",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "user_zh/get-trader-amount-using-get",
          label: "查询累计收益&资产",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "user_zh/get-trader-using-get",
          label: "查询绩效分析【交易数据】",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "user_zh/top-traders-using-get",
          label: "分页查询顶级交易员",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "user_zh/get-mark-using-get",
          label: "掩码处理接口",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "user_zh/get-trader-amount-for-self-using-get",
          label: "查询累计收益&资产【用于我的主页】",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "user_zh/get-trader-for-self-using-get",
          label: "我的主页，主账号可以看子账号，子账号只能看自身。",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "user_zh/top-traders-for-self-using-get",
          label: "查询我的订阅【查询开关状态、订阅状态的接口】",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "user_zh/update-sub-using-post",
          label: "订阅&取消订阅",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "user_zh/update-desc-using-post",
          label: "更新描述",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "user_zh/update-share-position-using-post",
          label: "分享我的仓位开关",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "user_zh/update-trading-set-using-post",
          label: "实盘设置开启、关闭",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "合约聪明钱-order",
      link: {
        type: "doc",
        id: "user_zh/合约聪明钱-order",
      },
      items: [
        {
          type: "doc",
          id: "user_zh/list-history-using-get",
          label: "查询历史仓位",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "user_zh/get-active-position-using-get",
          label: "获取当前持仓信息",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "user_zh/get-trade-list-using-get",
          label: "查询成交明细",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "user_zh/list-history-for-self-using-get",
          label: "查询历史仓位【个人中心】",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "user_zh/get-active-position-for-self-using-get",
          label: "获取当前持仓信息【个人中心】",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "user_zh/get-trade-list-for-self-using-get",
          label: "查询成交明细【个人中心】",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "外部兼容接口",
      link: {
        type: "doc",
        id: "user_zh/外部兼容接口",
      },
      items: [
        {
          type: "doc",
          id: "user_zh/is-open-using-get",
          label: "校验子账号是否开通合约",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "user_zh/get-user-open-status-using-get",
          label: "是否已经开通合约",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "user_zh/get-balance-convert-using-get",
          label: "资产总计转化",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "user_zh/get-balance-using-get-1",
          label: "资产列表",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "user_zh/get-balance-by-coin-using-get-1",
          label: "单币种资产",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "user_zh/get-transfer-coins-using-get",
          label: "划转币种列表",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "接管记录",
      link: {
        type: "doc",
        id: "user_zh/接管记录",
      },
      items: [
        {
          type: "doc",
          id: "user_zh/get-list-using-get",
          label: "查询接管记录",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "操盘手相关",
      link: {
        type: "doc",
        id: "user_zh/操盘手相关",
      },
      items: [
        {
          type: "doc",
          id: "user_zh/apply-using-post",
          label: "申请跟单操盘手",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "服务器时间",
      link: {
        type: "doc",
        id: "user_zh/服务器时间",
      },
      items: [
        {
          type: "doc",
          id: "user_zh/get-server-time-using-get",
          label: "获取服务器时间",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "杠杆分层",
      link: {
        type: "doc",
        id: "user_zh/杠杆分层",
      },
      items: [
        {
          type: "doc",
          id: "user_zh/get-bracket-detail-using-get",
          label: "查询单个交易对杠杆分层",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "user_zh/get-bracket-list-using-get",
          label: "查询所有交易对杠杆分层",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "用户合约相关信息",
      link: {
        type: "doc",
        id: "user_zh/用户合约相关信息",
      },
      items: [
        {
          type: "doc",
          id: "user_zh/agree-predict-agreement-using-post",
          label: "同意预测合约协议",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "user_zh/is-open-predict-using-get",
          label: "查询预测合约协议是否开通",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "user_zh/get-account-using-get",
          label: "获取账户相关信息",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "user_zh/open-futures-using-post",
          label: "开通合约",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "user_zh/check-region-using-get",
          label: "检查开通合约地区",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "用户满意度反馈",
      link: {
        type: "doc",
        id: "user_zh/用户满意度反馈",
      },
      items: [
        {
          type: "doc",
          id: "user_zh/check-using-get",
          label: "获取反馈",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "user_zh/submit-using-post",
          label: "提交反馈",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "user_zh/get-feedbacks-using-get",
          label: "反馈功能标签列表",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "用户相关内部接口",
      link: {
        type: "doc",
        id: "user_zh/用户相关内部接口",
      },
      items: [
        {
          type: "doc",
          id: "user_zh/get-user-step-rate-2-using-get",
          label: "获取用户阶梯费率(对外)",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "用户福利-赠金",
      link: {
        type: "doc",
        id: "user_zh/用户福利-赠金",
      },
      items: [
        {
          type: "doc",
          id: "user_zh/bonus-list-using-get",
          label: "体验金详情",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "user_zh/deposit-coupon-list-using-get",
          label: "储值券详情",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "user_zh/get-welfare-coupon-using-get",
          label: "合约可用赠金券",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "用户自动减仓",
      link: {
        type: "doc",
        id: "user_zh/用户自动减仓",
      },
      items: [
        {
          type: "doc",
          id: "user_zh/get-auto-deleverage-history-using-get",
          label: "获取自动减仓历史",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "用户设置",
      link: {
        type: "doc",
        id: "user_zh/用户设置",
      },
      items: [
        {
          type: "doc",
          id: "user_zh/get-fund-rate-clearing-notification-using-get",
          label: "查询资金费率提醒开关是否开启",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "user_zh/update-fund-rate-clearing-notification-using-post",
          label: "设置资金费率提醒开关",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "user_zh/get-order-execution-notification-using-get",
          label: "查询合约订单成交提醒开关是否开启",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "user_zh/update-order-execution-notification-using-post",
          label: "设置合约订单成交提醒开关",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "user_zh/get-profit-trigger-using-get",
          label: "止盈止损提醒开关是否开启",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "user_zh/update-profit-trigger-using-post",
          label: "设置止盈止损提醒开关",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "user_zh/get-price-protection-using-get",
          label: "查询止盈止损价差保护开关是否开启",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "user_zh/update-price-protection-using-post",
          label: "设置止盈止损价差保护开关",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "用户资金相关",
      link: {
        type: "doc",
        id: "user_zh/用户资金相关",
      },
      items: [
        {
          type: "doc",
          id: "user_zh/get-balance-bills-using-get",
          label: "获取用户账务流水",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "user_zh/get-coupon-record-using-get",
          label: "获取抵扣金记录",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "user_zh/get-balance-by-coin-using-get",
          label: "获取用户单币种资金",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "user_zh/exchange-using-post",
          label: "资金划转(合约子账户间划转)",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "user_zh/get-funding-list-using-get",
          label: "获取资金费用",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "user_zh/get-balance-using-get",
          label: "获取用户资金",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "用户阶梯等级费率",
      link: {
        type: "doc",
        id: "user_zh/用户阶梯等级费率",
      },
      items: [
        {
          type: "doc",
          id: "user_zh/get-public-other-platforms-using-get",
          label: "获取第三方平台（无需登录）",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "user_zh/get-public-step-rates-using-get",
          label: "获取用户费率表（无需登录）",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "user_zh/get-user-step-rate-2-using-get-1",
          label: "获取用户阶梯费率(对外)",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "user_zh/get-other-platforms-using-get",
          label: "获取第三方平台",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "user_zh/get-step-rates-using-get",
          label: "获取用户费率表",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "user_zh/get-user-step-apply-result-using-get",
          label: "获取用户申请临时等级结果",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "user_zh/get-user-step-rate-using-get",
          label: "获取用户阶梯费率",
          className: "menu__list-item--deprecated api-method get",
        },
        {
          type: "doc",
          id: "user_zh/find-recent-trade-using-get",
          label: "查询用户近30日交易量",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "user_zh/upload-using-post",
          label: "上传图片",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "user_zh/user-step-apply-using-post",
          label: "用户阶梯费率申请",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "自选交易对",
      link: {
        type: "doc",
        id: "user_zh/自选交易对",
      },
      items: [
        {
          type: "doc",
          id: "user_zh/collect-symbol-using-post",
          label: "收藏交易对（废弃）",
          className: "menu__list-item--deprecated api-method post",
        },
        {
          type: "doc",
          id: "user_zh/cancel-collect-symbol-using-post",
          label: "取消收藏交易对（废弃）",
          className: "menu__list-item--deprecated api-method post",
        },
        {
          type: "doc",
          id: "user_zh/get-collection-list-using-get",
          label: "自选交易对列表",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "user_zh/update-collection-symbols-using-post",
          label: "更新自选交易对",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "账户内部接口",
      link: {
        type: "doc",
        id: "user_zh/账户内部接口",
      },
      items: [
        {
          type: "doc",
          id: "user_zh/get-info-using-get",
          label: "获取用户合约信息",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "user_zh/open-futures-using-post-1",
          label: "开通合约",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "资金相关内部接口",
      link: {
        type: "doc",
        id: "user_zh/资金相关内部接口",
      },
      items: [
        {
          type: "doc",
          id: "user_zh/get-balance-using-get-2",
          label: "资产列表",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "user_zh/get-balance-by-coin-using-get-2",
          label: "获取用户单币种资金",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "user_zh/get-funding-list-using-get-1",
          label: "获取资金费用",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "user_zh/get-balance-using-get-3",
          label: "获取用户资金",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "通用功能接口",
      link: {
        type: "doc",
        id: "user_zh/通用功能接口",
      },
      items: [
        {
          type: "doc",
          id: "user_zh/down-load-from-private-using-get",
          label: "私有目录,下载图片",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "user_zh/upload-private-using-post",
          label: "上传图片，私有目录",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "user_zh/upload-public-using-post",
          label: "上传图片，公共目录",
          className: "api-method post",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
