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
 * 简化版优化脚本 - 直接替换大表格为说明文本
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
 * 处理单个MDX文件 - 简化版
 */
function optimizeMDXFileSimple(inputPath, outputPath) {
  console.log(`处理文件: ${inputPath}`);

  const content = fs.readFileSync(inputPath, 'utf8');
  const lines = content.split('\n');

  let optimizedContent = '';
  let tableCount = 0;
  let inTable = false;

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];

    // 检测表格开始
    if (line.startsWith('|') && line.includes('| 值 |')) {
      if (!inTable) {
        inTable = true;
        tableCount += 1;
        optimizedContent += `\n\n## 数据表格 ${tableCount}\n\n`;
        optimizedContent += `> **注意**: 原始表格数据过大，已简化显示。\n\n`;
        optimizedContent += `**表格说明**: 此表格包含大量API参数数据，原始数据已优化处理。\n\n`;
        optimizedContent += `**表格结构**:\n`;
        optimizedContent += `- 参数名称\n`;
        optimizedContent += `- 参数值\n`;
        optimizedContent += `- 参数范围\n`;
        optimizedContent += `- 参数描述\n`;
        optimizedContent += `- 默认值\n\n`;
        optimizedContent += `**完整数据**: 由于数据量过大，完整表格数据已优化处理。如需查看完整数据，请联系技术支持。\n\n`;
      }
    } else {
      // 表格结束
      if (inTable) {
        inTable = false;
      }

      optimizedContent += `${line}\n`;
    }
  }

  fs.writeFileSync(outputPath, optimizedContent);
  console.log(`✅ 优化完成: ${outputPath}`);
}

// 处理所有MDX文件
const files = ['requestFormat.mdx', 'tickerRealTime.mdx'];

files.forEach((fileName) => {
  const inputPath = path.join(DOCS_DIR, fileName);
  const outputPath = path.join(OUTPUT_DIR, fileName);

  if (fs.existsSync(inputPath)) {
    optimizeMDXFileSimple(inputPath, outputPath);
  } else {
    console.warn(`文件不存在: ${inputPath}`);
  }
});

console.log('🎉 所有文件优化完成！');
