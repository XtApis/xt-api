# Babel 构建错误修复说明

## 问题描述

在构建 `docusaurus-theme-openapi` 包时出现错误：
```
Error: spawn babel ENOENT
```

**原因**：`docusaurus-theme-openapi` 包的构建脚本使用了 `babel` 命令，但该包缺少必要的 Babel 依赖。

## 已修复内容

已在 `website/packages/docusaurus-theme-openapi/package.json` 中添加以下依赖：

- `@babel/cli` - Babel 命令行工具
- `@babel/core` - Babel 核心库
- `@babel/preset-typescript` - TypeScript 预设
- `@babel/plugin-transform-modules-commonjs` - CommonJS 转换插件
- `@babel/plugin-proposal-nullish-coalescing-operator` - 空值合并操作符插件
- `@babel/plugin-proposal-optional-chaining` - 可选链操作符插件
- `cross-env` - 跨平台环境变量设置
- `prettier` - 代码格式化工具

同时更新了构建脚本，使用 `node_modules/.bin/babel` 确保正确找到 babel 命令。

## 解决步骤

1. **重新安装依赖**（从项目根目录）：
   ```bash
   cd /path/to/xt-api
   yarn install
   ```

2. **如果仍有问题，清理后重新安装**：
   ```bash
   # 清理 node_modules 和 lock 文件
   rm -rf node_modules website/node_modules website/packages/*/node_modules
   rm yarn.lock
   
   # 重新安装
   yarn install
   ```

3. **验证修复**：
   ```bash
   cd website
   yarn build
   ```

## 注意事项

- 必须在**项目根目录**运行 `yarn install`，因为这是一个 monorepo 项目
- 确保使用 Node.js 22（见 `.nvmrc` 文件）
- 如果使用 `sudo`，请使用 `sudo -E` 保留环境变量

## 相关文件

- `website/packages/docusaurus-theme-openapi/package.json` - 已修复
- `website/packages/docusaurus-theme-openapi/babel.config.js` - Babel 配置文件

