/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-named-capture-group */
/* eslint-disable regexp/no-super-linear-backtracking */
interface DocumentItem {
  id: string;
  title: string;
  description: string;
  content: string;
  url: string;
  path: string;
  type: string;
  category: string;
}

// 从文档路径提取类型和类别
function extractTypeAndCategory(filePath: string): {
  type: string;
  category: string;
} {
  const pathParts = filePath.split('/');

  if (pathParts.includes('futures')) {
    return {type: 'futures', category: '期货交易'};
  } else if (pathParts.includes('spot')) {
    return {type: 'spot', category: '现货交易'};
  } else if (pathParts.includes('copy-trading')) {
    return {type: 'copy-trading', category: '跟单交易'};
  } else if (pathParts.includes('margin-spot')) {
    return {type: 'margin-spot', category: '杠杆现货'};
  } else if (pathParts.includes('user-center')) {
    return {type: 'user-center', category: '用户中心'};
  } else if (pathParts.includes('trading-third-party')) {
    return {type: 'trading-third-party', category: '第三方交易'};
  } else {
    return {type: 'general', category: '通用文档'};
  }
}

// 从文件路径生成 URL
function generateUrl(filePath: string): string {
  // 移除文件扩展名并转换为 URL 路径
  const urlPath = filePath
    .replace(/\.mdx?$/, '')
    .replace(/\/index$/, '')
    .replace(/^docs\//, '/docs/');

  return urlPath;
}

// 从 MDX 内容中提取标题和描述
function extractTitleAndDescription(content: string): {
  title: string;
  description: string;
} {
  let title = '';
  let description = '';

  // 尝试从 frontmatter 中提取标题
  const frontmatterMatch = content.match(/^---\s*\n([\s\S]*?)\n---/);
  if (frontmatterMatch) {
    const frontmatter = frontmatterMatch[1];
    const titleMatch = frontmatter.match(/title:\s*['"]?([^'"]+)['"]?/);
    const descMatch = frontmatter.match(/description:\s*['"]?([^'"]+)['"]?/);

    if (titleMatch) {title = titleMatch[1].trim();}
    if (descMatch) {description = descMatch[1].trim();}
  }

  // 如果没有找到标题，尝试从第一个 # 标题中提取
  if (!title) {
    const h1Match = content.match(/^#\s+(.+)$/m);
    if (h1Match) {
      title = h1Match[1].trim();
    }
  }

  // 如果没有找到描述，尝试从第一个段落中提取
  if (!description) {
    const paragraphMatch = content.match(/\n\n([^#\n][^\n]{20,200})/);
    if (paragraphMatch) {
      description = `${paragraphMatch[1].trim().substring(0, 150)  }...`;
    }
  }

  return {title, description};
}

// 清理文本内容，移除 markdown 语法
function cleanContent(content: string): string {
  return (
    content
      // 移除 frontmatter
      .replace(/^---\s*\n[\s\S]*?\n---\s*\n/, '')
      // 移除代码块
      .replace(/```[\s\S]*?```/g, '')
      // 移除行内代码
      .replace(/`[^`]+`/g, '')
      // 移除链接但保留文本
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      // 移除图片
      .replace(/!\[([^\]]*)\]\([^)]+\)/g, '')
      // 移除标题标记
      .replace(/^#{1,6}\s+/gm, '')
      // 移除多余的空白
      .replace(/\s+/g, ' ')
      .trim()
  );
}

// 预定义的文档索引（作为备选方案）
export const fallbackDocuments: DocumentItem[] = [
  // 期货交易相关
  {
    id: 'futures-basic-info',
    title: '期货交易基础信息',
    description: '期货交易 API 基础信息，包括接口访问说明、请求格式等',
    content: '期货交易 API 基础信息 接口访问 请求格式 响应格式 错误码 签名算法',
    url: '/docs/futures/futures_documentation/apiBasicInfo',
    path: 'futures/futures_documentation/apiBasicInfo',
    type: 'futures',
    category: '期货交易',
  },
  {
    id: 'futures-entrust',
    title: '期货委托接口',
    description: '期货交易委托相关接口，包括下单、撤单、查询等功能',
    content: '期货委托 下单 撤单 查询订单 订单历史 持仓查询',
    url: '/docs/futures/futures_entrust',
    path: 'futures/futures_entrust',
    type: 'futures',
    category: '期货交易',
  },
  {
    id: 'futures-market-data',
    title: '期货行情数据',
    description: '期货市场行情数据接口，包括实时价格、深度、K线等',
    content: '期货行情 实时价格 市场深度 K线数据 成交记录 24小时统计',
    url: '/docs/futures/futures_quotes',
    path: 'futures/futures_quotes',
    type: 'futures',
    category: '期货交易',
  },
  {
    id: 'futures-websocket',
    title: '期货 WebSocket',
    description: '期货 WebSocket 接口，用于实时数据推送',
    content: 'WebSocket 实时推送 订阅 行情推送 订单推送 持仓推送',
    url: '/docs/futures/futures_websocket',
    path: 'futures/futures_websocket',
    type: 'futures',
    category: '期货交易',
  },
  {
    id: 'futures-user',
    title: '期货用户接口',
    description: '期货用户相关接口，包括账户信息、资金管理等',
    content: '用户信息 账户余额 资金划转 持仓信息 交易记录',
    url: '/docs/futures/futures_user',
    path: 'futures/futures_user',
    type: 'futures',
    category: '期货交易',
  },

  // 现货交易相关
  {
    id: 'spot-trading',
    title: '现货交易 API',
    description:
      'XT 现货交易 API 提供全面的功能，包括市场数据查询、下单交易、账户管理等',
    content:
      '现货交易 API 主要功能：市场数据（实时价格、深度、K线数据）、交易操作（买入、卖出、撤单）、账户管理（余额查询、资金划转）、订单管理（订单查询、历史记录）',
    url: '/docs/spot',
    path: 'spot/index',
    type: 'spot',
    category: '现货交易',
  },

  // 跟单交易相关
  {
    id: 'copy-trading',
    title: '跟单交易 API',
    description: 'XT 跟单交易 API 支持跟随专业交易员进行交易',
    content:
      '跟单交易 API 功能：交易员列表、跟单设置、风险控制、收益统计、历史记录',
    url: '/docs/copy-trading',
    path: 'copy-trading/index',
    type: 'copy-trading',
    category: '跟单交易',
  },

  // 杠杆现货相关
  {
    id: 'margin-spot',
    title: '杠杆现货 API',
    description: 'XT 杠杆现货 API 支持现货杠杆交易',
    content:
      '杠杆现货 API 功能：杠杆设置、风险控制、资金管理、订单管理、历史记录',
    url: '/docs/margin-spot',
    path: 'margin-spot/index',
    type: 'margin-spot',
    category: '杠杆现货',
  },

  // 用户中心相关
  {
    id: 'user-center',
    title: '用户中心 API',
    description: 'XT 用户中心 API 提供用户账户管理功能',
    content:
      '用户中心 API 功能：账户信息、安全设置、实名认证、子账户管理、API密钥管理',
    url: '/docs/user-center',
    path: 'user-center/index',
    type: 'user-center',
    category: '用户中心',
  },

  // 第三方交易相关
  {
    id: 'trading-third-party',
    title: '第三方交易 API',
    description: '第三方交易授权和接口调用相关功能',
    content: '第三方授权 OAuth2 用户注册 账户管理 交易接口 余额查询',
    url: '/docs/trading-third-party',
    path: 'trading-third-party/index',
    type: 'trading-third-party',
    category: '第三方交易',
  },
];

// 动态加载文档索引的函数（在客户端运行）
export async function loadDocumentIndex(): Promise<DocumentItem[]> {
  try {
    // 尝试从服务器加载动态生成的索引
    const response = await fetch('/search-index.json');
    if (response.ok) {
      const data = await response.json();
      if (Array.isArray(data) && data.length > 0) {
        return data;
      }
    }
  } catch (error) {
    console.warn('Failed to load dynamic search index:', error);
  }

  // 如果动态加载失败，返回预定义的索引
  console.log('Using fallback document index');
  return fallbackDocuments;
}

export type {DocumentItem};
