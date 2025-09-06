/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const fs = require('fs');
const path = require('path');
const {algoliasearch} = require('algoliasearch');
const matter = require('gray-matter');

// Algolia 配置
const client = algoliasearch('GTNEYZMA9V', 'c17bcebd2d5d3ec62b4aa36c46fedb6a');
const indexName = 'xt_api_docs';

// 文档目录
const docsDir = path.join(__dirname, '../docs');

/**
 * 递归读取目录中的所有 Markdown 文件
 */
async function getAllMarkdownFiles(dir, fileList = []) {
  const files = await fs.promises.readdir(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = await fs.promises.stat(filePath);

    if (stat.isDirectory()) {
      await getAllMarkdownFiles(filePath, fileList);
    } else if (path.extname(file) === '.md' || path.extname(file) === '.mdx') {
      fileList.push(filePath);
    }
  }

  return fileList;
}

/**
 * 处理 Markdown 文件内容
 */
async function processMarkdownFile(filePath) {
  const content = await fs.promises.readFile(filePath, 'utf8');
  const {data, content: markdownContent} = matter(content);

  // 获取相对路径作为 URL
  const relativePath = path.relative(docsDir, filePath);
  let urlPath = relativePath
    .replace(/\.(?:md|mdx)$/, '')
    .replace(/\\/g, '/')
    .replace(/\/index$/, '');

  // 确保 URL 路径格式正确
  if (urlPath && !urlPath.startsWith('/')) {
    urlPath = `/${  urlPath}`;
  }
  if (!urlPath) {
    urlPath = '/';
  }

  // 清理 Markdown 内容
  const cleanContent = markdownContent
    .replace(/```[\s\S]*?```/g, '') // 移除代码块
    .replace(/`[^`]+`/g, '') // 移除行内代码
    .replace(/\[(?<text>[^\]]+)\]\([^)]+\)/g, '$<text>') // 移除链接格式，保留文字
    .replace(/[#*_~]/g, '') // 移除 Markdown 标记
    .replace(/\n+/g, ' ') // 将换行符替换为空格
    .trim()
    .substring(0, 8000); // 限制内容长度，避免超过 Algolia 限制

  // 构建层级结构
  // const pathParts = relativePath.split('/');
  const category = getCategory(relativePath);
  const title = data.title || path.basename(filePath, path.extname(filePath));

  // 确保 URL 格式正确
  let finalUrl = `/docs${urlPath}`;

  // 验证 URL 格式
  try {
    // eslint-disable-next-line no-new
    new URL(finalUrl, 'http://localhost:3000');
  } catch (e) {
    console.warn(`⚠️  无效的 URL: "${finalUrl}" for file: ${relativePath}`);
    finalUrl = `/docs/${relativePath
      .replace(/\.(?:md|mdx)$/, '')
      .replace(/\\/g, '/')}`;
  }

  return {
    objectID: urlPath.replace(/^\//, '') || relativePath,
    content: cleanContent,
    type: 'content',
    url: finalUrl,

    // Docusaurus 期望的层级结构
    hierarchy: {
      lvl0: category,
      lvl1: title,
      lvl2: null,
      lvl3: null,
      lvl4: null,
      lvl5: null,
      lvl6: null,
    },

    // Docusaurus 标签
    language: 'en',
    docusaurus_tag: 'docs-default-current',

    // 额外信息
    anchor: null,
    path: relativePath,
  };
}

/**
 * 根据文件路径推断分类
 */
function getCategory(filePath) {
  const pathParts = filePath.split('/');
  if (pathParts.length > 1) {
    return pathParts[0];
  }
  return 'docs';
}

/**
 * 检查记录大小并分割过大的记录
 */
function validateAndSplitRecords(records) {
  const validRecords = [];
  const maxSize = 9000; // 留一些余量

  records.forEach((record) => {
    const recordSize = JSON.stringify(record).length;

    if (recordSize <= maxSize) {
      validRecords.push(record);
    } else {
      // 分割过大的记录
      console.log(
        `⚠️  记录 "${record.title}" 太大 (${recordSize} bytes)，正在分割...`,
      );

      const contentChunks = [];
      const chunkSize = 4000; // 每个块的内容大小

      for (let i = 0; i < record.content.length; i += chunkSize) {
        const chunk = record.content.substring(i, i + chunkSize);
        contentChunks.push(chunk);
      }

      contentChunks.forEach((chunk, index) => {
        const chunkRecord = {
          ...record,
          objectID: `${record.objectID}_chunk_${index}`,
          content: chunk,
          description: chunk.substring(0, 200),
          title: `${record.title} (Part ${index + 1})`,
        };
        validRecords.push(chunkRecord);
      });
    }
  });

  return validRecords;
}

/**
 * 主函数：索引所有文档
 */
async function indexDocuments() {
  try {
    console.log('🔍 正在扫描文档文件...');

    // 获取所有 Markdown 文件
    const markdownFiles = await getAllMarkdownFiles(docsDir);
    console.log(`📁 找到 ${markdownFiles.length} 个文档文件`);

    // 处理所有文件
    const processedFiles = await Promise.all(
      markdownFiles.map(processMarkdownFile),
    );
    const rawRecords = processedFiles.filter((record) => {
      // 过滤掉有问题的记录
      if (!record.url || record.url === '/docs/' || record.url === '/docs') {
        console.warn(`⚠️  跳过无效记录: ${record.objectID}`);
        return false;
      }
      return true;
    });
    console.log(`📄 处理了 ${rawRecords.length} 个文档记录`);

    // 验证并分割过大的记录
    const records = validateAndSplitRecords(rawRecords);
    console.log(`✅ 验证后得到 ${records.length} 个记录`);

    // 上传到 Algolia
    console.log('🚀 正在上传到 Algolia...');
    const {taskIDs} = await client.saveObjects({
      indexName,
      objects: records,
    });

    console.log('✅ 成功上传到 Algolia!');
    console.log(`📊 任务 ID:`, taskIDs);
    console.log(`🔗 索引名称: ${indexName}`);

    // 配置搜索属性
    console.log('⚙️  正在配置搜索属性...');
    await client.setSettings({
      indexName,
      indexSettings: {
        searchableAttributes: [
          'unordered(hierarchy.lvl0)',
          'unordered(hierarchy.lvl1)',
          'unordered(hierarchy.lvl2)',
          'unordered(hierarchy.lvl3)',
          'unordered(hierarchy.lvl4)',
          'unordered(hierarchy.lvl5)',
          'unordered(hierarchy.lvl6)',
          'content',
        ],
        attributesForFaceting: ['language', 'docusaurus_tag', 'type'],
        customRanking: ['desc(hierarchy.lvl0)', 'desc(hierarchy.lvl1)'],
        attributesToRetrieve: [
          'hierarchy.lvl0',
          'hierarchy.lvl1',
          'hierarchy.lvl2',
          'hierarchy.lvl3',
          'hierarchy.lvl4',
          'hierarchy.lvl5',
          'hierarchy.lvl6',
          'content',
          'type',
          'url',
        ],
        attributesToSnippet: [
          'hierarchy.lvl1:10',
          'hierarchy.lvl2:10',
          'hierarchy.lvl3:10',
          'hierarchy.lvl4:10',
          'hierarchy.lvl5:10',
          'hierarchy.lvl6:10',
          'content:10',
        ],
      },
    });

    console.log('🎉 Algolia 搜索配置完成!');
  } catch (error) {
    console.error('❌ 索引过程中出现错误:', error);
    process.exit(1);
  }
}

// 运行脚本
if (require.main === module) {
  indexDocuments();
}

module.exports = {indexDocuments};
