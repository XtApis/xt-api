import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "contract_zh/合约",
    },
    {
      type: "category",
      label: "basic-error-controller",
      link: {
        type: "doc",
        id: "contract_zh/basic-error-controller",
      },
      items: [
        {
          type: "doc",
          id: "contract_zh/error-using-get",
          label: "error",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "contract_zh/error-using-put",
          label: "error",
          className: "api-method put",
        },
        {
          type: "doc",
          id: "contract_zh/error-using-post",
          label: "error",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "contract_zh/error-using-delete",
          label: "error",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "contract_zh/error-using-options",
          label: "error",
          className: "api-method options",
        },
        {
          type: "doc",
          id: "contract_zh/error-using-head",
          label: "error",
          className: "api-method head",
        },
        {
          type: "doc",
          id: "contract_zh/error-using-patch",
          label: "error",
          className: "api-method patch",
        },
        {
          type: "doc",
          id: "contract_zh/error-using-trace",
          label: "error",
          className: "api-method trace",
        },
      ],
    },
    {
      type: "category",
      label: "operation-handler",
      link: {
        type: "doc",
        id: "contract_zh/operation-handler",
      },
      items: [
        {
          type: "doc",
          id: "contract_zh/handle-using-get",
          label: "handle",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "contract_zh/handle-using-get-1",
          label: "handle",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "contract_zh/handle-using-get-2",
          label: "handle",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "web-mvc-links-handler",
      link: {
        type: "doc",
        id: "contract_zh/web-mvc-links-handler",
      },
      items: [
        {
          type: "doc",
          id: "contract_zh/links-using-get",
          label: "links",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "内部获取交易对配置信息",
      link: {
        type: "doc",
        id: "contract_zh/内部获取交易对配置信息",
      },
      items: [
        {
          type: "doc",
          id: "contract_zh/get-depth-using-get-1",
          label: "获取交易对的深度信息",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "contract_zh/get-risk-balance-list-using-get-1",
          label: "获取交易对风险基金余额",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "contract_zh/get-bracket-list-using-get",
          label: "查询所有交易对杠杆分层",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "contract_zh/get-whitelist-using-get",
          label: "(内部)获取资金费白名单",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "contract_zh/country-agentuid-filter-using-post",
          label: "(内部)用户分国家区域代理uid展示币对",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "contract_zh/get-symbol-list-using-get",
          label: "(内部)获取所有交易对的配置信息",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "contract_zh/get-tenant-symbol-list-using-get",
          label: "(内部)获取所有租户交易对的信息",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "contract_zh/get-symbol-list-using-get-1",
          label: "获取所有交易对的配置信息",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "内部获取行情信息",
      link: {
        type: "doc",
        id: "contract_zh/内部获取行情信息",
      },
      items: [
        {
          type: "doc",
          id: "contract_zh/get-kline-using-get",
          label: "获取交易对的k线信息",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "合约信息",
      link: {
        type: "doc",
        id: "contract_zh/合约信息",
      },
      items: [
        {
          type: "doc",
          id: "contract_zh/get-open-interest-using-get",
          label: "获取交易对仓位头寸",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "contract_zh/get-risk-balance-list-using-get",
          label: "获取交易对风险基金余额",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "外部接口信息",
      link: {
        type: "doc",
        id: "contract_zh/外部接口信息",
      },
      items: [
        {
          type: "doc",
          id: "contract_zh/get-contracts-using-get",
          label: "获取合约信息",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "contract_zh/get-depth-using-get",
          label: "获取交易对的深度信息",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "市场异动",
      link: {
        type: "doc",
        id: "contract_zh/市场异动",
      },
      items: [
        {
          type: "doc",
          id: "contract_zh/category-using-get",
          label: "获取异动分类",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "contract_zh/list-using-get",
          label: "获取市场异动列表",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "服务器时间",
      link: {
        type: "doc",
        id: "contract_zh/服务器时间",
      },
      items: [
        {
          type: "doc",
          id: "contract_zh/get-server-time-using-get",
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
        id: "contract_zh/杠杆分层",
      },
      items: [
        {
          type: "doc",
          id: "contract_zh/get-bracket-detail-using-get",
          label: "查询单个交易对杠杆分层",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "contract_zh/get-bracket-list-using-get-1",
          label: "查询所有交易对杠杆分层",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "获取事件合约配置信息",
      link: {
        type: "doc",
        id: "contract_zh/获取事件合约配置信息",
      },
      items: [
        {
          type: "doc",
          id: "contract_zh/get-event-future-limit-using-get",
          label: "获取事件合约限制信息",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "contract_zh/get-event-future-list-using-get",
          label: "获取所事件合约配置信息",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "获取交易对配置信息",
      link: {
        type: "doc",
        id: "contract_zh/获取交易对配置信息",
      },
      items: [
        {
          type: "doc",
          id: "contract_zh/get-all-symbols-using-get",
          label: "获取所有交易对",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "contract_zh/get-coin-detail-using-get",
          label: "获取币种详情",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "contract_zh/get-coin-list-using-get",
          label: "获取交易对币种",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "contract_zh/get-symbol-detail-using-get",
          label: "获取单个交易对的配置信息",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "contract_zh/get-symbol-list-using-get-3",
          label: "获取所有交易对的配置信息",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "获取交易对配置信息(v2)",
      link: {
        type: "doc",
        id: "contract_zh/获取交易对配置信息-v-2",
      },
      items: [
        {
          type: "doc",
          id: "contract_zh/get-symbol-list-using-get-4",
          label: "获取所有交易对的配置信息",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "获取交易对配置信息(v3)",
      link: {
        type: "doc",
        id: "contract_zh/获取交易对配置信息-v-3",
      },
      items: [
        {
          type: "doc",
          id: "contract_zh/get-symbol-list-using-get-5",
          label: "获取所有交易对的配置信息",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "获取板块配置信息",
      link: {
        type: "doc",
        id: "contract_zh/获取板块配置信息",
      },
      items: [
        {
          type: "doc",
          id: "contract_zh/get-symbol-list-using-get-2",
          label: "获取板块信息",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "行情接口",
      link: {
        type: "doc",
        id: "contract_zh/行情接口",
      },
      items: [
        {
          type: "doc",
          id: "contract_zh/get-deals-using-get",
          label: "获取交易对的最新成交信息",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "contract_zh/get-depth-using-get-2",
          label: "获取交易对的深度信息",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "contract_zh/get-funding-rate-using-get",
          label: "获取资金费率",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "contract_zh/get-funding-rate-record-using-get",
          label: "getFundingRateRecord",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "contract_zh/get-index-price-by-symbol-using-get",
          label: "获取单个交易对的指数价格",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "contract_zh/get-mark-price-by-symbol-using-get",
          label: "获取单个交易对的标记价格",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "contract_zh/get-ticker-using-get",
          label: "获取指定交易对的行情信息",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "contract_zh/get-ticker-book-using-get",
          label: "获取指定交易对的买一卖一行情信息",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "行情类接口",
      link: {
        type: "doc",
        id: "contract_zh/行情类接口",
      },
      items: [
        {
          type: "doc",
          id: "contract_zh/get-trade-list-using-get",
          label: "查询成交明细",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "contract_zh/get-agg-ticker-using-get",
          label: "获取指定交易对的聚合行情信息",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "contract_zh/get-agg-tickers-using-get",
          label: "获取全交易对的聚合行情信息",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "contract_zh/get-deals-using-get-1",
          label: "获取交易对的最新成交信息",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "contract_zh/get-deliver-kline-using-get",
          label: "获取交割合约的k线信息",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "contract_zh/get-depth-using-get-3",
          label: "获取交易对的深度信息",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "contract_zh/get-funding-rate-using-get-1",
          label: "获取资金费率",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "contract_zh/get-funding-rate-record-using-get-1",
          label: "获取资金费率记录",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "contract_zh/get-funding-rate-record-chart-using-get",
          label: "获取资金费率图表",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "contract_zh/get-funding-rate-tool-record-using-get",
          label: "获取资金费率工具记录",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "contract_zh/get-funding-rate-tool-using-get",
          label: "获取资金费率工具",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "contract_zh/get-all-index-price-using-get",
          label: "获取所有交易对的指数价格",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "contract_zh/find-index-price-list-using-get",
          label: "获取指定交易对的指数价格",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "contract_zh/get-indicator-using-get",
          label: "获取k线指标",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "contract_zh/get-kline-using-get-1",
          label: "获取交易对的k线信息",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "contract_zh/get-all-mark-price-using-get",
          label: "获取所有交易对的标记价格",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "contract_zh/get-open-price-using-get",
          label: "获取交易对指定时区当天0点的开盘时间，不传symbol获取所有可交货币对",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "contract_zh/get-index-price-by-symbol-using-get-1",
          label: "获取单个交易对的指数价格",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "contract_zh/get-mark-price-by-symbol-using-get-1",
          label: "获取单个交易对的标记价格",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "contract_zh/get-ticker-using-get-1",
          label: "获取指定交易对的行情信息",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "contract_zh/get-ticker-book-using-get-1",
          label: "获取指定交易对的买一卖一行情信息",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "contract_zh/get-ticker-books-using-get",
          label: "获取全交易对的买一卖一行情信息",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "contract_zh/get-tickers-using-get",
          label: "获取全交易对的行情信息",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "contract_zh/get-trade-stats-using-get",
          label: "获取统计信息",
          className: "api-method get",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
