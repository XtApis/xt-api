import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "zh-CN/docusaurus-plugin-content-docs/current/contract/合约",
    },
    {
      type: "category",
      label: "basic-error-controller",
      key: "contract-basic-error-controller",
      collapsible: false,
      items: [
        {
          type: "doc",
          id: "zh-CN/docusaurus-plugin-content-docs/current/contract/error-using-get"
          key: "contract-error-using-get",,
          label: "error",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "zh-CN/docusaurus-plugin-content-docs/current/contract/error-using-put"
          key: "contract-error-using-put",,
          label: "error",
          className: "api-method put",
        },
        {
          type: "doc",
          id: "zh-CN/docusaurus-plugin-content-docs/current/contract/error-using-post"
          key: "contract-error-using-post",,
          label: "error",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "zh-CN/docusaurus-plugin-content-docs/current/contract/error-using-delete"
          key: "contract-error-using-delete",,
          label: "error",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "zh-CN/docusaurus-plugin-content-docs/current/contract/error-using-options"
          key: "contract-error-using-options",,
          label: "error",
          className: "api-method options",
        },
        {
          type: "doc",
          id: "zh-CN/docusaurus-plugin-content-docs/current/contract/error-using-head"
          key: "contract-error-using-head",,
          label: "error",
          className: "api-method head",
        },
        {
          type: "doc",
          id: "zh-CN/docusaurus-plugin-content-docs/current/contract/error-using-patch"
          key: "contract-error-using-patch",,
          label: "error",
          className: "api-method patch",
        },
        {
          type: "doc",
          id: "zh-CN/docusaurus-plugin-content-docs/current/contract/error-using-trace",
          label: "error",
          className: "api-method trace",
        },
      ],
    },
    {
      type: "category",
      label: "operation-handler",
      key: "contract-operation-handler",
      collapsible: false,
      items: [
        {
          type: "doc",
          id: "zh-CN/docusaurus-plugin-content-docs/current/contract/handle-using-get"
          key: "contract-handle-using-get",,
          label: "handle",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "zh-CN/docusaurus-plugin-content-docs/current/contract/handle-using-get-1"
          key: "contract-handle-using-get-1",,
          label: "handle",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "zh-CN/docusaurus-plugin-content-docs/current/contract/handle-using-get-2",
          label: "handle",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "web-mvc-links-handler",
      key: "contract-web-mvc-links-handler",
      collapsible: false,
      items: [
        {
          type: "doc",
          id: "zh-CN/docusaurus-plugin-content-docs/current/contract/links-using-get",
          label: "links",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "内部获取交易对配置信息",
      key: "contract-4",
      collapsible: false,
      items: [
        {
          type: "doc",
          id: "zh-CN/docusaurus-plugin-content-docs/current/contract/get-depth-using-get-1"
          key: "contract-get-depth-using-get-1",,
          label: "获取交易对的深度信息",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "zh-CN/docusaurus-plugin-content-docs/current/contract/get-risk-balance-list-using-get-1"
          key: "contract-get-risk-balance-list-using-get-1",,
          label: "获取交易对风险基金余额",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "zh-CN/docusaurus-plugin-content-docs/current/contract/get-bracket-list-using-get"
          key: "contract-get-bracket-list-using-get",,
          label: "查询所有交易对杠杆分层",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "zh-CN/docusaurus-plugin-content-docs/current/contract/get-whitelist-using-get"
          key: "contract-get-whitelist-using-get",,
          label: "(内部)获取资金费白名单",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "zh-CN/docusaurus-plugin-content-docs/current/contract/country-agentuid-filter-using-post"
          key: "contract-country-agentuid-filter-using-post",,
          label: "(内部)用户分国家区域代理uid展示币对",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "zh-CN/docusaurus-plugin-content-docs/current/contract/get-symbol-list-using-get"
          key: "contract-get-symbol-list-using-get",,
          label: "(内部)获取所有交易对的配置信息",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "zh-CN/docusaurus-plugin-content-docs/current/contract/get-tenant-symbol-list-using-get"
          key: "contract-get-tenant-symbol-list-using-get",,
          label: "(内部)获取所有租户交易对的信息",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "zh-CN/docusaurus-plugin-content-docs/current/contract/get-symbol-list-using-get-1",
          label: "获取所有交易对的配置信息",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "内部获取行情信息",
      key: "contract-5",
      collapsible: false,
      items: [
        {
          type: "doc",
          id: "zh-CN/docusaurus-plugin-content-docs/current/contract/get-kline-using-get",
          label: "获取交易对的k线信息",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "合约信息",
      key: "contract-6",
      collapsible: false,
      items: [
        {
          type: "doc",
          id: "zh-CN/docusaurus-plugin-content-docs/current/contract/get-open-interest-using-get"
          key: "contract-get-open-interest-using-get",,
          label: "获取交易对仓位头寸",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "zh-CN/docusaurus-plugin-content-docs/current/contract/get-risk-balance-list-using-get",
          label: "获取交易对风险基金余额",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "外部接口信息",
      key: "contract-7",
      collapsible: false,
      items: [
        {
          type: "doc",
          id: "zh-CN/docusaurus-plugin-content-docs/current/contract/get-contracts-using-get"
          key: "contract-get-contracts-using-get",,
          label: "获取合约信息",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "zh-CN/docusaurus-plugin-content-docs/current/contract/get-depth-using-get",
          label: "获取交易对的深度信息",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "市场异动",
      key: "contract-8",
      collapsible: false,
      items: [
        {
          type: "doc",
          id: "zh-CN/docusaurus-plugin-content-docs/current/contract/category-using-get"
          key: "contract-category-using-get",,
          label: "获取异动分类",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "zh-CN/docusaurus-plugin-content-docs/current/contract/list-using-get",
          label: "获取市场异动列表",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "服务器时间",
      key: "contract-9",
      collapsible: false,
      items: [
        {
          type: "doc",
          id: "zh-CN/docusaurus-plugin-content-docs/current/contract/get-server-time-using-get",
          label: "获取服务器时间",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "杠杆分层",
      key: "contract-10",
      collapsible: false,
      items: [
        {
          type: "doc",
          id: "zh-CN/docusaurus-plugin-content-docs/current/contract/get-bracket-detail-using-get"
          key: "contract-get-bracket-detail-using-get",,
          label: "查询单个交易对杠杆分层",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "zh-CN/docusaurus-plugin-content-docs/current/contract/get-bracket-list-using-get-1",
          label: "查询所有交易对杠杆分层",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "获取事件合约配置信息",
      key: "contract-11",
      collapsible: false,
      items: [
        {
          type: "doc",
          id: "zh-CN/docusaurus-plugin-content-docs/current/contract/get-event-future-limit-using-get"
          key: "contract-get-event-future-limit-using-get",,
          label: "获取事件合约限制信息",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "zh-CN/docusaurus-plugin-content-docs/current/contract/get-event-future-list-using-get",
          label: "获取所事件合约配置信息",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "获取交易对配置信息",
      key: "contract-12",
      collapsible: false,
      items: [
        {
          type: "doc",
          id: "zh-CN/docusaurus-plugin-content-docs/current/contract/get-all-symbols-using-get"
          key: "contract-get-all-symbols-using-get",,
          label: "获取所有交易对",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "zh-CN/docusaurus-plugin-content-docs/current/contract/get-coin-detail-using-get"
          key: "contract-get-coin-detail-using-get",,
          label: "获取币种详情",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "zh-CN/docusaurus-plugin-content-docs/current/contract/get-coin-list-using-get"
          key: "contract-get-coin-list-using-get",,
          label: "获取交易对币种",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "zh-CN/docusaurus-plugin-content-docs/current/contract/get-symbol-detail-using-get"
          key: "contract-get-symbol-detail-using-get",,
          label: "获取单个交易对的配置信息",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "zh-CN/docusaurus-plugin-content-docs/current/contract/get-symbol-list-using-get-3",
          label: "获取所有交易对的配置信息",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "获取交易对配置信息(v2)",
      key: "contract-v2",
      collapsible: false,
      items: [
        {
          type: "doc",
          id: "zh-CN/docusaurus-plugin-content-docs/current/contract/get-symbol-list-using-get-4",
          label: "获取所有交易对的配置信息",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "获取交易对配置信息(v3)",
      key: "contract-v3",
      collapsible: false,
      items: [
        {
          type: "doc",
          id: "zh-CN/docusaurus-plugin-content-docs/current/contract/get-symbol-list-using-get-5",
          label: "获取所有交易对的配置信息",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "获取板块配置信息",
      key: "contract-15",
      collapsible: false,
      items: [
        {
          type: "doc",
          id: "zh-CN/docusaurus-plugin-content-docs/current/contract/get-symbol-list-using-get-2",
          label: "获取板块信息",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "行情接口",
      key: "contract-16",
      collapsible: false,
      items: [
        {
          type: "doc",
          id: "zh-CN/docusaurus-plugin-content-docs/current/contract/get-deals-using-get"
          key: "contract-get-deals-using-get",,
          label: "获取交易对的最新成交信息",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "zh-CN/docusaurus-plugin-content-docs/current/contract/get-depth-using-get-2"
          key: "contract-get-depth-using-get-2",,
          label: "获取交易对的深度信息",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "zh-CN/docusaurus-plugin-content-docs/current/contract/get-funding-rate-using-get"
          key: "contract-get-funding-rate-using-get",,
          label: "获取资金费率",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "zh-CN/docusaurus-plugin-content-docs/current/contract/get-funding-rate-record-using-get"
          key: "contract-get-funding-rate-record-using-get",,
          label: "getFundingRateRecord",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "zh-CN/docusaurus-plugin-content-docs/current/contract/get-index-price-by-symbol-using-get"
          key: "contract-get-index-price-by-symbol-using-get",,
          label: "获取单个交易对的指数价格",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "zh-CN/docusaurus-plugin-content-docs/current/contract/get-mark-price-by-symbol-using-get"
          key: "contract-get-mark-price-by-symbol-using-get",,
          label: "获取单个交易对的标记价格",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "zh-CN/docusaurus-plugin-content-docs/current/contract/get-ticker-using-get"
          key: "contract-get-ticker-using-get",,
          label: "获取指定交易对的行情信息",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "zh-CN/docusaurus-plugin-content-docs/current/contract/get-ticker-book-using-get",
          label: "获取指定交易对的买一卖一行情信息",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "行情类接口",
      key: "contract-17",
      collapsible: false,
      items: [
        {
          type: "doc",
          id: "zh-CN/docusaurus-plugin-content-docs/current/contract/get-trade-list-using-get"
          key: "contract-get-trade-list-using-get",,
          label: "查询成交明细",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "zh-CN/docusaurus-plugin-content-docs/current/contract/get-agg-ticker-using-get"
          key: "contract-get-agg-ticker-using-get",,
          label: "获取指定交易对的聚合行情信息",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "zh-CN/docusaurus-plugin-content-docs/current/contract/get-agg-tickers-using-get"
          key: "contract-get-agg-tickers-using-get",,
          label: "获取全交易对的聚合行情信息",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "zh-CN/docusaurus-plugin-content-docs/current/contract/get-deals-using-get-1"
          key: "contract-get-deals-using-get-1",,
          label: "获取交易对的最新成交信息",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "zh-CN/docusaurus-plugin-content-docs/current/contract/get-deliver-kline-using-get"
          key: "contract-get-deliver-kline-using-get",,
          label: "获取交割合约的k线信息",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "zh-CN/docusaurus-plugin-content-docs/current/contract/get-depth-using-get-3"
          key: "contract-get-depth-using-get-3",,
          label: "获取交易对的深度信息",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "zh-CN/docusaurus-plugin-content-docs/current/contract/get-funding-rate-using-get-1"
          key: "contract-get-funding-rate-using-get-1",,
          label: "获取资金费率",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "zh-CN/docusaurus-plugin-content-docs/current/contract/get-funding-rate-record-using-get-1"
          key: "contract-get-funding-rate-record-using-get-1",,
          label: "获取资金费率记录",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "zh-CN/docusaurus-plugin-content-docs/current/contract/get-funding-rate-record-chart-using-get"
          key: "contract-get-funding-rate-record-chart-using-get",,
          label: "获取资金费率图表",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "zh-CN/docusaurus-plugin-content-docs/current/contract/get-funding-rate-tool-record-using-get"
          key: "contract-get-funding-rate-tool-record-using-get",,
          label: "获取资金费率工具记录",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "zh-CN/docusaurus-plugin-content-docs/current/contract/get-funding-rate-tool-using-get"
          key: "contract-get-funding-rate-tool-using-get",,
          label: "获取资金费率工具",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "zh-CN/docusaurus-plugin-content-docs/current/contract/get-all-index-price-using-get"
          key: "contract-get-all-index-price-using-get",,
          label: "获取所有交易对的指数价格",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "zh-CN/docusaurus-plugin-content-docs/current/contract/find-index-price-list-using-get"
          key: "contract-find-index-price-list-using-get",,
          label: "获取指定交易对的指数价格",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "zh-CN/docusaurus-plugin-content-docs/current/contract/get-indicator-using-get"
          key: "contract-get-indicator-using-get",,
          label: "获取k线指标",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "zh-CN/docusaurus-plugin-content-docs/current/contract/get-kline-using-get-1"
          key: "contract-get-kline-using-get-1",,
          label: "获取交易对的k线信息",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "zh-CN/docusaurus-plugin-content-docs/current/contract/get-all-mark-price-using-get"
          key: "contract-get-all-mark-price-using-get",,
          label: "获取所有交易对的标记价格",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "zh-CN/docusaurus-plugin-content-docs/current/contract/get-open-price-using-get"
          key: "contract-get-open-price-using-get",,
          label: "获取交易对指定时区当天0点的开盘时间，不传symbol获取所有可交货币对",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "zh-CN/docusaurus-plugin-content-docs/current/contract/get-index-price-by-symbol-using-get-1"
          key: "contract-get-index-price-by-symbol-using-get-1",,
          label: "获取单个交易对的指数价格",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "zh-CN/docusaurus-plugin-content-docs/current/contract/get-mark-price-by-symbol-using-get-1"
          key: "contract-get-mark-price-by-symbol-using-get-1",,
          label: "获取单个交易对的标记价格",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "zh-CN/docusaurus-plugin-content-docs/current/contract/get-ticker-using-get-1"
          key: "contract-get-ticker-using-get-1",,
          label: "获取指定交易对的行情信息",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "zh-CN/docusaurus-plugin-content-docs/current/contract/get-ticker-book-using-get-1"
          key: "contract-get-ticker-book-using-get-1",,
          label: "获取指定交易对的买一卖一行情信息",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "zh-CN/docusaurus-plugin-content-docs/current/contract/get-ticker-books-using-get"
          key: "contract-get-ticker-books-using-get",,
          label: "获取全交易对的买一卖一行情信息",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "zh-CN/docusaurus-plugin-content-docs/current/contract/get-tickers-using-get"
          key: "contract-get-tickers-using-get",,
          label: "获取全交易对的行情信息",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "zh-CN/docusaurus-plugin-content-docs/current/contract/get-trade-stats-using-get"
          key: "contract-get-trade-stats-using-get",,
          label: "获取统计信息",
          className: "api-method get",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
