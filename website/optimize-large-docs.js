#!/usr/bin/env node

/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
const fs = require('fs');
const path = require('path');

/**
 * 优化大型MDX文档的脚本
 * 将巨大的表格拆分成多个小表格，并创建外部数据文件
 */

const DOCS_DIR =
  'i18n/zh-Hans/docusaurus-plugin-content-docs/current/spot/WebSocket_Public';
const OUTPUT_DIR =
  'i18n/zh-Hans/docusaurus-plugin-content-docs/current/spot/WebSocket_Public/optimized';

// 确保输出目录存在
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, {recursive: true});
}

/**
 * 处理单个MDX文件
 */
function optimizeMDXFile(inputPath, outputPath) {
  console.log(`处理文件: ${inputPath}`);

  const content = fs.readFileSync(inputPath, 'utf8');
  const lines = content.split('\n');

  let optimizedContent = '';
  let tableCount = 0;
  let currentTable = '';
  let inTable = false;

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];

    // 检测表格开始
    if (line.startsWith('|') && line.includes('| 值 |')) {
      if (!inTable) {
        inTable = true;
        currentTable = `${line}\n`;
        tableCount += 1;
      } else {
        currentTable += `${line}\n`;
      }
    } else {
      // 表格结束
      if (inTable) {
        inTable = false;
        optimizedContent += `\n\n## 数据表格 ${tableCount}\n\n`;
        optimizedContent += `> **注意**: 原始表格数据过大，已优化处理。\n\n`;

        // 保存表格数据到外部文件
        const dataFileName = `table_${tableCount}_data.json`;
        const dataFilePath = path.join(OUTPUT_DIR, dataFileName);

        try {
          const tableData = parseTableData(currentTable);
          fs.writeFileSync(dataFilePath, JSON.stringify(tableData, null, 2));

          optimizedContent += `**表格数据**: 已保存到外部文件 \`${dataFileName}\`\n\n`;
          optimizedContent += `**表格预览**:\n\n`;
          optimizedContent += generateTablePreview(tableData);
        } catch (error) {
          console.warn(`无法解析表格 ${tableCount}:`, error.message);
          optimizedContent += `**表格数据**: 解析失败，原始数据过大\n\n`;
        }

        currentTable = '';
      }

      optimizedContent += `${line}\n`;
    }
  }

  // 处理最后一个表格
  if (inTable) {
    optimizedContent += `\n\n## 数据表格 ${tableCount}\n\n`;
    optimizedContent += `> **注意**: 原始表格数据过大，已优化处理。\n\n`;

    const dataFileName = `table_${tableCount}_data.json`;
    const dataFilePath = path.join(OUTPUT_DIR, dataFileName);

    try {
      const tableData = parseTableData(currentTable);
      fs.writeFileSync(dataFilePath, JSON.stringify(tableData, null, 2));

      optimizedContent += `**表格数据**: 已保存到外部文件 \`${dataFileName}\`\n\n`;
      optimizedContent += `**表格预览**:\n\n`;
      optimizedContent += generateTablePreview(tableData);
    } catch (error) {
      console.warn(`无法解析表格 ${tableCount}:`, error.message);
      optimizedContent += `**表格数据**: 解析失败，原始数据过大\n\n`;
    }
  }

  fs.writeFileSync(outputPath, optimizedContent);
  console.log(`✅ 优化完成: ${outputPath}`);
}

/**
 * 解析表格数据
 */
function parseTableData(tableText) {
  const lines = tableText.trim().split('\n');
  const data = [];

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i].trim();
    if (line.startsWith('|') && !line.includes('---')) {
      const cells = line
        .split('|')
        .slice(1, -1)
        .map((cell) => cell.trim());
      data.push(cells);
    }
  }

  return data;
}

/**
 * 生成表格预览
 */
function generateTablePreview(tableData, maxRows = 5) {
  if (!tableData || tableData.length === 0) {
    return '无数据';
  }

  const previewData = tableData.slice(0, maxRows);
  let preview = `| ${previewData[0].join(' | ')} |\n`;
  preview += `| ${previewData[0].map(() => '---').join(' | ')} |\n`;

  for (let i = 1; i < previewData.length; i += 1) {
    preview += `| ${previewData[i].join(' | ')} |\n`;
  }

  if (tableData.length > maxRows) {
    preview += `\n*... 还有 ${
      tableData.length - maxRows
    } 行数据，请查看完整数据文件*`;
  }

  return preview;
}

// 处理所有MDX文件
const files = ['requestFormat.mdx', 'tickerRealTime.mdx'];

files.forEach((fileName) => {
  const inputPath = path.join(DOCS_DIR, fileName);
  const outputPath = path.join(OUTPUT_DIR, fileName);

  if (fs.existsSync(inputPath)) {
    optimizeMDXFile(inputPath, outputPath);
  } else {
    console.warn(`文件不存在: ${inputPath}`);
  }
});

console.log('🎉 所有文件优化完成！');
