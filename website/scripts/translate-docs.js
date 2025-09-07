#!/usr/bin/env node

/**
 * 翻译文档内容脚本
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
const docTranslations = {
  // 标题翻译
  'Introduction': '介绍',
  'Getting Started': '开始使用',
  'API Documentation': 'API 文档',
  'Spot Trading': '现货交易',
  'Futures Trading': '期货交易',
  'Margin Trading': '杠杆交易',
  'Copy Trading': '跟单交易',
  'Futures Copy': '期货跟单',
  'Trading Third Party': '第三方交易',
  'User Center': '用户中心',
  'Index': '指数',
  'All Products': '所有产品',
  
  // 功能模块
  'Balance': '余额',
  'Deposit&Withdrawal': '充提',
  'Market': '市场',
  'Order': '订单',
  'Trade': '交易',
  'Transfer': '转账',
  'WebSocket Private': 'WebSocket 私有',
  'WebSocket Public': 'WebSocket 公共',
  'Futures WebSocket': '期货 WebSocket',
  'Access Description': '访问说明',
  'API Basic Info': 'API 基础信息',
  'API Demo': 'API 演示',
  'Apply API': '申请 API',
  'Error Code': '错误码',
  'Limit Rules': '限制规则',
  'Rest API': 'REST API',
  'Return Format': '返回格式',
  'Sign Statement': '签名说明',
  'Sign Steps': '签名步骤',
  'Contact Us': '联系我们',
  'FAQ': '常见问题',
  'Public Module': '公共模块',
  
  // 描述文本
  'Comprehensive API solutions for all your trading needs': '为您的所有交易需求提供全面的 API 解决方案',
  'XT API Documentation': 'XT API 文档',
  'Welcome to XT API Documentation': '欢迎使用 XT API 文档',
  'This documentation provides comprehensive API solutions for all your trading needs.': '本文档为您的所有交易需求提供全面的 API 解决方案。'
};

/**
 * 翻译MDX文件内容
 */
function translateMdxContent(content) {
  let translatedContent = content;
  
  // 翻译标题
  Object.entries(docTranslations).forEach(([en, zh]) => {
    // 翻译 # 标题
    const h1Regex = new RegExp(`^# ${en.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, 'gm');
    translatedContent = translatedContent.replace(h1Regex, `# ${zh}`);
    
    // 翻译 ## 标题
    const h2Regex = new RegExp(`^## ${en.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, 'gm');
    translatedContent = translatedContent.replace(h2Regex, `## ${zh}`);
    
    // 翻译 ### 标题
    const h3Regex = new RegExp(`^### ${en.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, 'gm');
    translatedContent = translatedContent.replace(h3Regex, `### ${zh}`);
    
    // 翻译 #### 标题
    const h4Regex = new RegExp(`^#### ${en.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, 'gm');
    translatedContent = translatedContent.replace(h4Regex, `#### ${zh}`);
    
    // 翻译段落中的文本
    const paragraphRegex = new RegExp(`\\b${en.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'g');
    translatedContent = translatedContent.replace(paragraphRegex, zh);
  });
  
  return translatedContent;
}

/**
 * 递归翻译目录中的所有文件
 */
function translateDirectory(dirPath) {
  const items = fs.readdirSync(dirPath);
  
  items.forEach(item => {
    const itemPath = path.join(dirPath, item);
    const stat = fs.statSync(itemPath);
    
    if (stat.isDirectory()) {
      translateDirectory(itemPath);
    } else if (item.endsWith('.mdx') || item.endsWith('.md')) {
      console.log(`翻译文件: ${itemPath}`);
      const content = fs.readFileSync(itemPath, 'utf8');
      const translatedContent = translateMdxContent(content);
      fs.writeFileSync(itemPath, translatedContent);
    }
  });
}

/**
 * 主函数
 */
function main() {
  console.log('🚀 开始翻译文档内容...');
  
  const zhDocsPath = path.join(__dirname, '../i18n/zh-Hans/docusaurus-plugin-content-docs/current');
  
  if (!fs.existsSync(zhDocsPath)) {
    console.error('❌ 中文文档目录不存在:', zhDocsPath);
    return;
  }
  
  translateDirectory(zhDocsPath);
  
  console.log('✅ 文档翻译完成！');
}

if (require.main === module) {
  main();
}

module.exports = { translateMdxContent, docTranslations };
