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
const {execSync} = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 开始分离构建过程...');

// 清理之前的构建
console.log('🧹 清理之前的构建...');
execSync('yarn clear', {stdio: 'inherit'});

// 构建英文版本
console.log('📖 构建英文版本...');
try {
  execSync('yarn build:en', {stdio: 'inherit'});
  console.log('✅ 英文版本构建成功');
} catch (error) {
  console.error('❌ 英文版本构建失败:', error.message);
  process.exit(1);
}

// 备份英文版本
console.log('💾 备份英文版本...');
fs.copySync(path.join(__dirname, 'build'), path.join(__dirname, 'build-en'));

// 清理以便构建中文版本
console.log('🧹 清理中间文件以便构建中文版本...');
execSync('docusaurus clear', {stdio: 'inherit'});

// 构建中文版本
console.log('📖 构建中文版本...');
try {
  execSync('yarn build:zh', {stdio: 'inherit'});
  console.log('✅ 中文版本构建成功');
} catch (error) {
  console.error('❌ 中文版本构建失败:', error.message);
  process.exit(1);
}

console.log('🎉 所有版本构建完成！');
