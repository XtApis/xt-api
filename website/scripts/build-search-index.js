/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
 
/* eslint-disable regexp/no-super-linear-backtracking */
/* eslint-disable prefer-named-capture-group */
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// 文档根目录
const DOCS_DIR = path.join(__dirname, '../docs');
const OUTPUT_FILE = path.join(__dirname, '../public/search-index.json');

// 从文档路径提取类型和类别
function extractTypeAndCategory(filePath) {
  const pathParts = filePath.split('/');

  if (pathParts.includes('futures')) {
    return {type: 'futures', category: '合约交易'};
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
function generateUrl(filePath) {
  const relativePath = path.relative(DOCS_DIR, filePath);
  const urlPath = relativePath
    .replace(/\.mdx?$/, '')
    .replace(/\/index$/, '')
    .replace(/\\/g, '/'); // 处理 Windows 路径

  return `/docs/${urlPath}`;
}

// 清理文本内容，移除 markdown 语法
function cleanContent(content) {
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

// 递归遍历目录获取所有 .md 和 .mdx 文件
function getAllMarkdownFiles(dir) {
  const files = [];

  function walkDir(currentDir) {
    const items = fs.readdirSync(currentDir);

    for (const item of items) {
      const fullPath = path.join(currentDir, item);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        walkDir(fullPath);
      } else if (stat.isFile() && /\.mdx?$/.test(item)) {
        files.push(fullPath);
      }
    }
  }

  walkDir(dir);
  return files;
}

// 处理单个文档文件
function processDocument(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const {data: frontmatter, content: markdownContent} = matter(content);

    // 提取标题
    let title = frontmatter.title || frontmatter.sidebar_label || '';
    if (!title) {
      const h1Match = markdownContent.match(/^#\s+(.+)$/m);
      if (h1Match) {
        title = h1Match[1].trim();
      } else {
        title = path.basename(filePath, path.extname(filePath));
      }
    }

    // 提取描述
    let description = frontmatter.description || '';
    if (!description) {
      const paragraphMatch = markdownContent.match(/\n\n([^#\n][^\n]{20,200})/);
      if (paragraphMatch) {
        description = paragraphMatch[1].trim().substring(0, 150);
        if (description.length === 150) {
          description += '...';
        }
      }
    }

    // 清理内容
    const cleanedContent = cleanContent(markdownContent);

    // 生成 ID 和 URL
    const relativePath = path.relative(DOCS_DIR, filePath);
    const id = relativePath.replace(/[/\\]/g, '-').replace(/\.mdx?$/, '');
    const url = generateUrl(filePath);
    const {type, category} = extractTypeAndCategory(relativePath);

    return {
      id,
      title,
      description,
      content: cleanedContent.substring(0, 500), // 限制内容长度
      url,
      path: relativePath.replace(/\.mdx?$/, '').replace(/\\/g, '/'),
      type,
      category,
    };
  } catch (error) {
    console.warn(`Error processing ${filePath}:`, error.message);
    return null;
  }
}

// 主函数
function buildSearchIndex() {
  console.log('Building search index...');

  // 确保输出目录存在
  const outputDir = path.dirname(OUTPUT_FILE);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, {recursive: true});
  }

  // 获取所有 markdown 文件
  const markdownFiles = getAllMarkdownFiles(DOCS_DIR);
  console.log(`Found ${markdownFiles.length} markdown files`);

  // 处理所有文档
  const documents = markdownFiles
    .map(processDocument)
    .filter((doc) => doc !== null)
    .filter((doc) => doc.title && doc.title.trim() !== ''); // 过滤掉没有标题的文档

  console.log(`Processed ${documents.length} documents`);

  // 写入搜索索引文件
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(documents, null, 2));
  console.log(`Search index saved to ${OUTPUT_FILE}`);

  // 打印一些统计信息
  const typeStats = documents.reduce((stats, doc) => {
    stats[doc.type] = (stats[doc.type] || 0) + 1;
    return stats;
  }, {});

  console.log('Document types:');
  Object.entries(typeStats).forEach(([type, count]) => {
    console.log(`  ${type}: ${count} documents`);
  });
}

// 如果直接运行此脚本
if (require.main === module) {
  buildSearchIndex();
}

module.exports = {buildSearchIndex};
