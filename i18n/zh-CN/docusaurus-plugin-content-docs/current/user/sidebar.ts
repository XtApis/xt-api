import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "zh-CN/docusaurus-plugin-content-docs/current/user/用户",
    },
    {
      type: "category",
      label: "basic-error-controller",
      key: "user-basic-error-controller",
      collapsible: false,
      items: [
        {
          type: "doc",
          id: "zh-CN/docusaurus-plugin-content-docs/current/user/error-using-get"
          key: "user-error-using-get",,
          label: "error",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "zh-CN/docusaurus-plugin-content-docs/current/user/error-using-put"
          key: "user-error-using-put",,
          label: "error",
          className: "api-method put",
        },
        {
          type: "doc",
          id: "zh-CN/docusaurus-plugin-content-docs/current/user/error-using-post"
          key: "user-error-using-post",,
          label: "error",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "zh-CN/docusaurus-plugin-content-docs/current/user/error-using-delete"
          key: "user-error-using-delete",,
          label: "error",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "zh-CN/docusaurus-plugin-content-docs/current/user/error-using-options"
          key: "user-error-using-options",,
          label: "error",
          className: "api-method options",
        },
        {
          type: "doc",
          id: "zh-CN/docusaurus-plugin-content-docs/current/user/error-using-head"
          key: "user-error-using-head",,
          label: "error",
          className: "api-method head",
        },
        {
          type: "doc",
          id: "zh-CN/docusaurus-plugin-content-docs/current/user/error-using-patch"
          key: "user-error-using-patch",,
          label: "error",
          className: "api-method patch",
        },
        {
          type: "doc",
          id: "zh-CN/docusaurus-plugin-content-docs/current/user/error-using-trace",
          label: "error",
          className: "api-method trace",
        },
      ],
    },
    {
      type: "category",
      label: "listenKey",
      key: "user-listenkey",
      collapsible: false,
      items: [
        {
          type: "doc",
          id: "zh-CN/docusaurus-plugin-content-docs/current/user/get-listen-key-using-get",
          label: "获取listenKey",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "operation-handler",
      key: "user-operation-handler",
      collapsible: false,
      items: [
        {
          type: "doc",
          id: "zh-CN/docusaurus-plugin-content-docs/current/user/handle-using-get"
          key: "user-handle-using-get",,
          label: "handle",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "zh-CN/docusaurus-plugin-content-docs/current/user/handle-using-get-1"
          key: "user-handle-using-get-1",,
          label: "handle",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "zh-CN/docusaurus-plugin-content-docs/current/user/handle-using-get-2",
          label: "handle",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "symbol-controller",
      key: "user-symbol-controller",
      collapsible: false,
      items: [
        {
          type: "doc",
          id: "zh-CN/docusaurus-plugin-content-docs/current/user/get-symbol-detail-by-name-using-get",
          label: "获取单个交易对的配置信息",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "web-mvc-links-handler",
      key: "user-web-mvc-links-handler",
      collapsible: false,
      items: [
        {
          type: "doc",
          id: "zh-CN/docusaurus-plugin-content-docs/current/user/links-using-get",
          label: "links",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "内部接口",
      key: "user-6",
      collapsible: false,
      items: [
        {
          type: "doc",
          id: "zh-CN/docusaurus-plugin-content-docs/current/user/get-balance-bills-using-get-1"
          key: "user-get-balance-bills-using-get-1",,
          label: "获取用户账务流水",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "zh-CN/docusaurus-plugin-content-docs/current/user/fund-using-get-1"
          key: "user-fund-using-get-1",,
          label: "获取账户资金",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "zh-CN/docusaurus-plugin-content-docs/current/user/fund-using-get"
          key: "user-fund-using-get",,
          label: "获取账户资金",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "zh-CN/docusaurus-plugin-content-docs/current/user/get-account-info-using-get"
          key: "user-get-account-info-using-get",,
          label: "获取用户合约信息",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "zh-CN/docusaurus-plugin-content-docs/current/user/get-history-trade-amount-using-post"
          key: "user-get-history-trade-amount-using-post",,
          label: "批量获取用户历史合约交易量",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "zh-CN/docusaurus-plugin-content-docs/current/user/get-coin-list-using-get"
          key: "user-get-coin-list-using-get",,
          label: "币种列表",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "zh-CN/docusaurus-plugin-content-docs/current/user/attention-using-post"
          key: "user-attention-using-post",,
          label: "关注/取消关注",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "zh-CN/docusaurus-plugin-content-docs/current/user/is-follower-using-post"
          key: "user-is-follower-using-post",,
          label: "用户是否跟单员",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "zh-CN/docusaurus-plugin-content-docs/current/user/coin-check-using-get"
          key: "user-coin-check-using-get",,
          label: "是否可划转",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "zh-CN/docusaurus-plugin-content-docs/current/user/cold-start-using-post"
          key: "user-cold-start-using-post",,
          label: "聪明钱冷启动执行接口",
          className: "menu__list-item--deprecated api-method post",
        },
        {
          type: "doc",
          id: "zh-CN/docusaurus-plugin-content-docs/current/user/cold-start-pro-using-post"
          key: "user-cold-start-pro-using-post",,
          label: "聪明钱冷启动执行接口2",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "zh-CN/docusaurus-plugin-content-docs/current/user/get-symbol-info-using-get"
          key: "user-get-symbol-info-using-get",,
          label: "交易对信息",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "zh-CN/docusaurus-plugin-content-docs/current/user/find-all-using-get",
          label: "查询所有交易对",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "分享",
      key: "user-7",
      collapsible: false,
      items: [
        {
          type: "doc",
          id: "zh-CN/docusaurus-plugin-content-docs/current/user/get-template-using-get",
          label: "获取分享文案模版",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "合约告知书",
      key: "user-8",
      collapsible: false,
      items: [
        {
          type: "doc",
          id: "zh-CN/docusaurus-plugin-content-docs/current/user/is-read-notice-using-get"
          key: "user-is-read-notice-using-get",,
          label: "是否已阅读风险告知书",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "zh-CN/docusaurus-plugin-content-docs/current/user/read-notice-using-post",
          label: "阅读风险告知书",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "合约聪明钱",
      key: "user-9",
      collapsible: false,
      items: [
        {
          type: "doc",
          id: "zh-CN/docusaurus-plugin-content-docs/current/user/deal-sub-account-using-post"
          key: "user-deal-sub-account-using-post",,
          label: "加入子账号、移除子账号",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "zh-CN/docusaurus-plugin-content-docs/current/user/get-desc-using-get"
          key: "user-get-desc-using-get",,
          label: "查询描述",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "zh-CN/docusaurus-plugin-content-docs/current/user/get-smart-money-sub-accounts-using-get"
          key: "user-get-smart-money-sub-accounts-using-get",,
          label: "查询子账号列表",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "zh-CN/docusaurus-plugin-content-docs/current/user/update-notify-using-post"
          key: "user-update-notify-using-post",,
          label: "开、关推送接口",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "zh-CN/docusaurus-plugin-content-docs/current/user/get-trader-amount-using-get"
          key: "user-get-trader-amount-using-get",,
          label: "查询累计收益&资产",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "zh-CN/docusaurus-plugin-content-docs/current/user/get-trader-using-get"
          key: "user-get-trader-using-get",,
          label: "查询绩效分析【交易数据】",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "zh-CN/docusaurus-plugin-content-docs/current/user/top-traders-using-get"
          key: "user-top-traders-using-get",,
          label: "分页查询顶级交易员",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "zh-CN/docusaurus-plugin-content-docs/current/user/get-mark-using-get"
          key: "user-get-mark-using-get",,
          label: "掩码处理接口",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "zh-CN/docusaurus-plugin-content-docs/current/user/get-trader-amount-for-self-using-get"
          key: "user-get-trader-amount-for-self-using-get",,
          label: "查询累计收益&资产【用于我的主页】",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "zh-CN/docusaurus-plugin-content-docs/current/user/get-trader-for-self-using-get"
          key: "user-get-trader-for-self-using-get",,
          label: "我的主页，主账号可以看子账号，子账号只能看自身。",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "zh-CN/docusaurus-plugin-content-docs/current/user/top-traders-for-self-using-get"
          key: "user-top-traders-for-self-using-get",,
          label: "查询我的订阅【查询开关状态、订阅状态的接口】",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "zh-CN/docusaurus-plugin-content-docs/current/user/update-sub-using-post"
          key: "user-update-sub-using-post",,
          label: "订阅&取消订阅",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "zh-CN/docusaurus-plugin-content-docs/current/user/update-desc-using-post"
          key: "user-update-desc-using-post",,
          label: "更新描述",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "zh-CN/docusaurus-plugin-content-docs/current/user/update-share-position-using-post"
          key: "user-update-share-position-using-post",,
          label: "分享我的仓位开关",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "zh-CN/docusaurus-plugin-content-docs/current/user/update-trading-set-using-post",
          label: "实盘设置开启、关闭",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "合约聪明钱-order",
      key: "user-order",
      collapsible: false,
      items: [
        {
          type: "doc",
          id: "zh-CN/docusaurus-plugin-content-docs/current/user/list-history-using-get"
          key: "user-list-history-using-get",,
          label: "查询历史仓位",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "zh-CN/docusaurus-plugin-content-docs/current/user/get-active-position-using-get"
          key: "user-get-active-position-using-get",,
          label: "获取当前持仓信息",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "zh-CN/docusaurus-plugin-content-docs/current/user/get-trade-list-using-get"
          key: "user-get-trade-list-using-get",,
          label: "查询成交明细",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "zh-CN/docusaurus-plugin-content-docs/current/user/list-history-for-self-using-get"
          key: "user-list-history-for-self-using-get",,
          label: "查询历史仓位【个人中心】",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "zh-CN/docusaurus-plugin-content-docs/current/user/get-active-position-for-self-using-get"
          key: "user-get-active-position-for-self-using-get",,
          label: "获取当前持仓信息【个人中心】",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "zh-CN/docusaurus-plugin-content-docs/current/user/get-trade-list-for-self-using-get",
          label: "查询成交明细【个人中心】",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "外部兼容接口",
      key: "user-11",
      collapsible: false,
      items: [
        {
          type: "doc",
          id: "zh-CN/docusaurus-plugin-content-docs/current/user/is-open-using-get"
          key: "user-is-open-using-get",,
          label: "校验子账号是否开通合约",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "zh-CN/docusaurus-plugin-content-docs/current/user/get-user-open-status-using-get"
          key: "user-get-user-open-status-using-get",,
          label: "是否已经开通合约",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "zh-CN/docusaurus-plugin-content-docs/current/user/get-balance-convert-using-get"
          key: "user-get-balance-convert-using-get",,
          label: "资产总计转化",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "zh-CN/docusaurus-plugin-content-docs/current/user/get-balance-using-get-1"
          key: "user-get-balance-using-get-1",,
          label: "资产列表",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "zh-CN/docusaurus-plugin-content-docs/current/user/get-balance-by-coin-using-get-1"
          key: "user-get-balance-by-coin-using-get-1",,
          label: "单币种资产",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "zh-CN/docusaurus-plugin-content-docs/current/user/get-transfer-coins-using-get",
          label: "划转币种列表",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "接管记录",
      key: "user-12",
      collapsible: false,
      items: [
        {
          type: "doc",
          id: "zh-CN/docusaurus-plugin-content-docs/current/user/get-list-using-get",
          label: "查询接管记录",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "操盘手相关",
      key: "user-13",
      collapsible: false,
      items: [
        {
          type: "doc",
          id: "zh-CN/docusaurus-plugin-content-docs/current/user/apply-using-post",
          label: "申请跟单操盘手",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "服务器时间",
      key: "user-14",
      collapsible: false,
      items: [
        {
          type: "doc",
          id: "zh-CN/docusaurus-plugin-content-docs/current/user/get-server-time-using-get",
          label: "获取服务器时间",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "杠杆分层",
      key: "user-15",
      collapsible: false,
      items: [
        {
          type: "doc",
          id: "zh-CN/docusaurus-plugin-content-docs/current/user/get-bracket-detail-using-get"
          key: "user-get-bracket-detail-using-get",,
          label: "查询单个交易对杠杆分层",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "zh-CN/docusaurus-plugin-content-docs/current/user/get-bracket-list-using-get",
          label: "查询所有交易对杠杆分层",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "用户合约相关信息",
      key: "user-16",
      collapsible: false,
      items: [
        {
          type: "doc",
          id: "zh-CN/docusaurus-plugin-content-docs/current/user/agree-predict-agreement-using-post"
          key: "user-agree-predict-agreement-using-post",,
          label: "同意预测合约协议",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "zh-CN/docusaurus-plugin-content-docs/current/user/is-open-predict-using-get"
          key: "user-is-open-predict-using-get",,
          label: "查询预测合约协议是否开通",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "zh-CN/docusaurus-plugin-content-docs/current/user/get-account-using-get"
          key: "user-get-account-using-get",,
          label: "获取账户相关信息",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "zh-CN/docusaurus-plugin-content-docs/current/user/open-futures-using-post"
          key: "user-open-futures-using-post",,
          label: "开通合约",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "zh-CN/docusaurus-plugin-content-docs/current/user/check-region-using-get",
          label: "检查开通合约地区",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "用户满意度反馈",
      key: "user-17",
      collapsible: false,
      items: [
        {
          type: "doc",
          id: "zh-CN/docusaurus-plugin-content-docs/current/user/check-using-get"
          key: "user-check-using-get",,
          label: "获取反馈",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "zh-CN/docusaurus-plugin-content-docs/current/user/submit-using-post"
          key: "user-submit-using-post",,
          label: "提交反馈",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "zh-CN/docusaurus-plugin-content-docs/current/user/get-feedbacks-using-get",
          label: "反馈功能标签列表",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "用户相关内部接口",
      key: "user-18",
      collapsible: false,
      items: [
        {
          type: "doc",
          id: "zh-CN/docusaurus-plugin-content-docs/current/user/get-user-step-rate-2-using-get",
          label: "获取用户阶梯费率(对外)",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "用户福利-赠金",
      key: "user-19",
      collapsible: false,
      items: [
        {
          type: "doc",
          id: "zh-CN/docusaurus-plugin-content-docs/current/user/bonus-list-using-get"
          key: "user-bonus-list-using-get",,
          label: "体验金详情",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "zh-CN/docusaurus-plugin-content-docs/current/user/deposit-coupon-list-using-get"
          key: "user-deposit-coupon-list-using-get",,
          label: "储值券详情",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "zh-CN/docusaurus-plugin-content-docs/current/user/get-welfare-coupon-using-get",
          label: "合约可用赠金券",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "用户自动减仓",
      key: "user-20",
      collapsible: false,
      items: [
        {
          type: "doc",
          id: "zh-CN/docusaurus-plugin-content-docs/current/user/get-auto-deleverage-history-using-get",
          label: "获取自动减仓历史",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "用户设置",
      key: "user-21",
      collapsible: false,
      items: [
        {
          type: "doc",
          id: "zh-CN/docusaurus-plugin-content-docs/current/user/get-fund-rate-clearing-notification-using-get"
          key: "user-get-fund-rate-clearing-notification-using-get",,
          label: "查询资金费率提醒开关是否开启",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "zh-CN/docusaurus-plugin-content-docs/current/user/update-fund-rate-clearing-notification-using-post"
          key: "user-update-fund-rate-clearing-notification-using-post",,
          label: "设置资金费率提醒开关",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "zh-CN/docusaurus-plugin-content-docs/current/user/get-order-execution-notification-using-get"
          key: "user-get-order-execution-notification-using-get",,
          label: "查询合约订单成交提醒开关是否开启",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "zh-CN/docusaurus-plugin-content-docs/current/user/update-order-execution-notification-using-post"
          key: "user-update-order-execution-notification-using-post",,
          label: "设置合约订单成交提醒开关",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "zh-CN/docusaurus-plugin-content-docs/current/user/get-profit-trigger-using-get"
          key: "user-get-profit-trigger-using-get",,
          label: "止盈止损提醒开关是否开启",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "zh-CN/docusaurus-plugin-content-docs/current/user/update-profit-trigger-using-post"
          key: "user-update-profit-trigger-using-post",,
          label: "设置止盈止损提醒开关",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "zh-CN/docusaurus-plugin-content-docs/current/user/get-price-protection-using-get"
          key: "user-get-price-protection-using-get",,
          label: "查询止盈止损价差保护开关是否开启",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "zh-CN/docusaurus-plugin-content-docs/current/user/update-price-protection-using-post",
          label: "设置止盈止损价差保护开关",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "用户资金相关",
      key: "user-22",
      collapsible: false,
      items: [
        {
          type: "doc",
          id: "zh-CN/docusaurus-plugin-content-docs/current/user/get-balance-bills-using-get"
          key: "user-get-balance-bills-using-get",,
          label: "获取用户账务流水",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "zh-CN/docusaurus-plugin-content-docs/current/user/get-coupon-record-using-get"
          key: "user-get-coupon-record-using-get",,
          label: "获取抵扣金记录",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "zh-CN/docusaurus-plugin-content-docs/current/user/get-balance-by-coin-using-get"
          key: "user-get-balance-by-coin-using-get",,
          label: "获取用户单币种资金",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "zh-CN/docusaurus-plugin-content-docs/current/user/exchange-using-post"
          key: "user-exchange-using-post",,
          label: "资金划转(合约子账户间划转)",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "zh-CN/docusaurus-plugin-content-docs/current/user/get-funding-list-using-get"
          key: "user-get-funding-list-using-get",,
          label: "获取资金费用",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "zh-CN/docusaurus-plugin-content-docs/current/user/get-balance-using-get",
          label: "获取用户资金",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "用户阶梯等级费率",
      key: "user-23",
      collapsible: false,
      items: [
        {
          type: "doc",
          id: "zh-CN/docusaurus-plugin-content-docs/current/user/get-public-other-platforms-using-get"
          key: "user-get-public-other-platforms-using-get",,
          label: "获取第三方平台（无需登录）",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "zh-CN/docusaurus-plugin-content-docs/current/user/get-public-step-rates-using-get"
          key: "user-get-public-step-rates-using-get",,
          label: "获取用户费率表（无需登录）",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "zh-CN/docusaurus-plugin-content-docs/current/user/get-user-step-rate-2-using-get-1"
          key: "user-get-user-step-rate-2-using-get-1",,
          label: "获取用户阶梯费率(对外)",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "zh-CN/docusaurus-plugin-content-docs/current/user/get-other-platforms-using-get"
          key: "user-get-other-platforms-using-get",,
          label: "获取第三方平台",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "zh-CN/docusaurus-plugin-content-docs/current/user/get-step-rates-using-get"
          key: "user-get-step-rates-using-get",,
          label: "获取用户费率表",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "zh-CN/docusaurus-plugin-content-docs/current/user/get-user-step-apply-result-using-get"
          key: "user-get-user-step-apply-result-using-get",,
          label: "获取用户申请临时等级结果",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "zh-CN/docusaurus-plugin-content-docs/current/user/get-user-step-rate-using-get"
          key: "user-get-user-step-rate-using-get",,
          label: "获取用户阶梯费率",
          className: "menu__list-item--deprecated api-method get",
        },
        {
          type: "doc",
          id: "zh-CN/docusaurus-plugin-content-docs/current/user/find-recent-trade-using-get"
          key: "user-find-recent-trade-using-get",,
          label: "查询用户近30日交易量",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "zh-CN/docusaurus-plugin-content-docs/current/user/upload-using-post"
          key: "user-upload-using-post",,
          label: "上传图片",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "zh-CN/docusaurus-plugin-content-docs/current/user/user-step-apply-using-post",
          label: "用户阶梯费率申请",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "自选交易对",
      key: "user-24",
      collapsible: false,
      items: [
        {
          type: "doc",
          id: "zh-CN/docusaurus-plugin-content-docs/current/user/collect-symbol-using-post"
          key: "user-collect-symbol-using-post",,
          label: "收藏交易对（废弃）",
          className: "menu__list-item--deprecated api-method post",
        },
        {
          type: "doc",
          id: "zh-CN/docusaurus-plugin-content-docs/current/user/cancel-collect-symbol-using-post"
          key: "user-cancel-collect-symbol-using-post",,
          label: "取消收藏交易对（废弃）",
          className: "menu__list-item--deprecated api-method post",
        },
        {
          type: "doc",
          id: "zh-CN/docusaurus-plugin-content-docs/current/user/get-collection-list-using-get"
          key: "user-get-collection-list-using-get",,
          label: "自选交易对列表",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "zh-CN/docusaurus-plugin-content-docs/current/user/update-collection-symbols-using-post",
          label: "更新自选交易对",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "账户内部接口",
      key: "user-25",
      collapsible: false,
      items: [
        {
          type: "doc",
          id: "zh-CN/docusaurus-plugin-content-docs/current/user/get-info-using-get"
          key: "user-get-info-using-get",,
          label: "获取用户合约信息",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "zh-CN/docusaurus-plugin-content-docs/current/user/open-futures-using-post-1",
          label: "开通合约",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "资金相关内部接口",
      key: "user-26",
      collapsible: false,
      items: [
        {
          type: "doc",
          id: "zh-CN/docusaurus-plugin-content-docs/current/user/get-balance-using-get-2"
          key: "user-get-balance-using-get-2",,
          label: "资产列表",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "zh-CN/docusaurus-plugin-content-docs/current/user/get-balance-by-coin-using-get-2"
          key: "user-get-balance-by-coin-using-get-2",,
          label: "获取用户单币种资金",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "zh-CN/docusaurus-plugin-content-docs/current/user/get-funding-list-using-get-1"
          key: "user-get-funding-list-using-get-1",,
          label: "获取资金费用",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "zh-CN/docusaurus-plugin-content-docs/current/user/get-balance-using-get-3",
          label: "获取用户资金",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "通用功能接口",
      key: "user-27",
      collapsible: false,
      items: [
        {
          type: "doc",
          id: "zh-CN/docusaurus-plugin-content-docs/current/user/down-load-from-private-using-get"
          key: "user-down-load-from-private-using-get",,
          label: "私有目录,下载图片",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "zh-CN/docusaurus-plugin-content-docs/current/user/upload-private-using-post"
          key: "user-upload-private-using-post",,
          label: "上传图片，私有目录",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "zh-CN/docusaurus-plugin-content-docs/current/user/upload-public-using-post"
          key: "user-upload-public-using-post",,
          label: "上传图片，公共目录",
          className: "api-method post",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
