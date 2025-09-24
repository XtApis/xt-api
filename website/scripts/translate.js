#!/usr/bin/env node
/* eslint-disable header/header */

/**
 * 自动翻译脚本 - 支持中英文双语
 * 使用方法: node scripts/translate.js
 */

/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const fs = require('fs');
const path = require('path');

// 翻译映射表
const translations = {
  'zh-Hans': {
    // 导航菜单
    'All Products': '所有产品',
    Index: '指数',
    'Spot Trading': '现货交易',
    'Futures Trading': '期货交易',
    'Margin Trading': '杠杆交易',
    'Copy Trading': '跟单交易',
    'Futures Copy': '期货跟单',
    'Trading Third Party': '第三方交易',
    'User Center': '用户中心',

    // API 相关
    'API Resources and Support': 'API 资源和支持',
    'Index APIs': '指数 API',
    'Spot Trading APIs': '现货交易 API',
    'Futures Trading APIs': '期货交易 API',
    'Margin Trading APIs': '杠杆交易 API',
    'Copy Trading API': '跟单交易 API',
    'Futures Copy API': '期货跟单 API',
    'Trading Third Party API': '第三方交易 API',
    'User Center API': '用户中心 API',

    // 功能模块
    Balance: '余额',
    'Balance APIs': '余额 API',
    'Deposit&Withdrawal': '充提',
    'Deposit&Withdrawal APIs': '充提 API',
    Market: '市场',
    'Market APIs': '市场 API',
    Order: '订单',
    'Order APIs': '订单 API',
    Trade: '交易',
    'Trade APIs': '交易 API',
    Transfer: '转账',
    'Transfer APIs': '转账 API',

    // WebSocket
    'WebSocket Private': 'WebSocket 私有',
    'WebSocket Private APIs': 'WebSocket 私有 API',
    'WebSocket Public': 'WebSocket 公共',
    'WebSocket Public APIs': 'WebSocket 公共 API',
    'Futures WebSocket': '期货 WebSocket',
    'Futures WebSocket APIs': '期货 WebSocket API',

    // 其他
    'Margin Balance': '杠杆余额',
    'Margin Balance APIs': '杠杆余额 API',
    'Copy Account': '跟单账户',
    'Copy Account APIs': '跟单账户 API',

    // 描述文本
    'Comprehensive API solutions for all your trading needs':
      '为您的所有交易需求提供全面的 API 解决方案',

    // 搜索相关
    Search: '搜索',
    'Search API docs...': '搜索 API 文档...',
    'Search API Documentation': '搜索 API 文档',
    'Loading document index...': '正在加载文档索引...',
    'Enter at least 2 characters to start searching':
      '输入至少 2 个字符开始搜索',
    'Search Tips:': '搜索提示：',
    'Search API interface names (e.g.: futures trading, spot trading, copy trading)':
      '搜索 API 接口名称（如：期货交易、现货交易、跟单交易）',
    'Search function keywords (e.g.: order, cancel, query, WebSocket)':
      '搜索功能关键词（如：订单、取消、查询、WebSocket）',
    'Search parameter names (e.g.: price, quantity, order, position)':
      '搜索参数名称（如：价格、数量、订单、持仓）',
    'Search document types (e.g.: basic info, error codes, signature algorithm)':
      '搜索文档类型（如：基础信息、错误码、签名算法）',
    'Indexed {count} documents': '已索引 {count} 个文档',
    'No results found': '没有找到相关结果',
    'Try other keywords or check spelling': '尝试其他关键词或检查拼写',
    '↑↓ Navigate': '↑↓ 导航',
    'Enter Select': 'Enter 选择',
    'ESC Close': 'ESC 关闭',
  },
};

/**
 * 翻译HTML内容
 */
function translateHtmlContent(content, locale) {
  if (locale === 'en') {
    return content; // 英文不需要翻译
  }

  const localeTranslations = translations[locale] || {};
  let translatedContent = content;

  // 翻译HTML标签内的文本
  Object.entries(localeTranslations).forEach(([en, translated]) => {
    // 匹配 >英文< 的模式
    const regex = new RegExp(
      `>${en.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}<`,
      'g',
    );
    translatedContent = translatedContent.replace(regex, `>${translated}<`);

    // 匹配 onclick="showCategory('英文')" 的模式
    const onclickRegex = new RegExp(
      `onclick="showCategory\\('${en.replace(
        /[.*+?^${}()|[\]\\]/g,
        '\\$&',
      )}'\\)"`,
      'g',
    );
    translatedContent = translatedContent.replace(
      onclickRegex,
      `onclick="showCategory('${en}')"`,
    );
  });

  return translatedContent;
}

/**
 * 翻译JSON文件
 */
function translateJsonFile(filePath, locale) {
  if (locale === 'en') {
    return; // 英文不需要翻译
  }

  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  文件不存在: ${filePath}`);
    return;
  }

  const content = fs.readFileSync(filePath, 'utf8');
  const data = JSON.parse(content);
  const localeTranslations = translations[locale] || {};

  // 递归翻译JSON对象
  function translateObject(obj) {
    if (typeof obj === 'string') {
      return localeTranslations[obj] || obj;
    } else if (typeof obj === 'object' && obj !== null) {
      if (Array.isArray(obj)) {
        return obj.map(translateObject);
      } else {
        const translated = {};
        for (const [key, value] of Object.entries(obj)) {
          translated[key] = translateObject(value);
        }
        return translated;
      }
    }
    return obj;
  }

  const translatedData = translateObject(data);
  fs.writeFileSync(filePath, JSON.stringify(translatedData, null, 2));
  console.log(`✅ 已翻译: ${filePath}`);
}

/**
 * 创建翻译目录结构
 */
function createTranslationStructure() {
  const i18nDir = path.join(__dirname, '../i18n');

  // 确保i18n目录存在
  if (!fs.existsSync(i18nDir)) {
    fs.mkdirSync(i18nDir, {recursive: true});
  }

  // 创建中文目录
  const zhHansDir = path.join(i18nDir, 'zh-Hans');
  if (!fs.existsSync(zhHansDir)) {
    fs.mkdirSync(zhHansDir, {recursive: true});
  }

  // 复制英文翻译文件到中文目录
  const enCodeFile = path.join(i18nDir, 'en/code.json');
  const zhHansCodeFile = path.join(zhHansDir, 'code.json');

  if (fs.existsSync(enCodeFile)) {
    fs.copyFileSync(enCodeFile, zhHansCodeFile);
    translateJsonFile(zhHansCodeFile, 'zh-Hans');
  }

  console.log('✅ 翻译目录结构已创建');
}

/**
 * 翻译Docusaurus配置文件
 */
function translateDocusaurusConfig(locale) {
  const configPath = path.join(__dirname, '../docusaurus.config.ts');
  let configContent = fs.readFileSync(configPath, 'utf8');

  // 翻译HTML内容
  configContent = translateHtmlContent(configContent, locale);

  // 保存翻译后的配置
  const translatedConfigPath = path.join(
    __dirname,
    `../docusaurus.config.${locale}.ts`,
  );
  fs.writeFileSync(translatedConfigPath, configContent);

  console.log(`✅ 已生成 ${locale} 语言配置: docusaurus.config.${locale}.ts`);
}

/**
 * 主函数
 */
function main() {
  console.log('🚀 开始翻译流程...');

  // 创建翻译目录结构
  createTranslationStructure();

  // 翻译配置文件
  ['en', 'zh-Hans'].forEach((locale) => {
    translateDocusaurusConfig(locale);
  });

  console.log('🎉 翻译完成！');
  console.log('');
  console.log('📝 使用方法:');
  console.log('  英文版本: yarn start --locale en');
  console.log('  中文版本: yarn start --locale zh-Hans');
  console.log('  构建所有版本: yarn build');
}

// 运行主函数
if (require.main === module) {
  main();
}

module.exports = {
  translateHtmlContent,
  translateJsonFile,
  translations,
};
