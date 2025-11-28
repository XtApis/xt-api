# Website

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

## Installation

```bash
yarn
```

## Local Development

```bash
yarn start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

## Build

```bash
yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

## Deployment

Using SSH:

```bash
USE_SSH=true yarn deploy
```

Not using SSH:

```bash
GIT_USER=<Your GitHub username> yarn deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.

## Sidebar i18n Key Fix (重要)

当我们从 OpenAPI 生成器自动生成 `api_docs` / i18n `sidebar.ts` 文件时，可能会出现多个侧边栏项拥有相同的可见标签，从而导致 Docusaurus 在构建翻译（`zh-CN` 等）阶段报错："Multiple docs sidebar items produce the same translation key"。

为避免该问题，本仓库提供脚本 `scripts/ensure-i18n-sidebar-keys.js`，它会在生成器输出侧栏后为每个 `category` 和 `doc` 项注入唯一的 `key` 属性（如果缺失）。请在执行 `docusaurus build` 之前运行该脚本。

推荐本地流程：

```bash
# 如果你有单独的 OpenAPI 生成步骤
npm run openapi:generate
node scripts/ensure-i18n-sidebar-keys.js
npm run build
```

推荐 npm 脚本（仓库已添加）：

- `npm run fix-sidebar-keys` — 运行 `scripts/ensure-i18n-sidebar-keys.js`。
- `npm run openapi:generate` — 运行 OpenAPI 生成（alias 到 `gen-api-docs`）。
- `npm run build:site` — 完整流程：生成 OpenAPI -> 修补 keys -> 构建网站。

CI（GitHub Actions）示例片段：

```yaml
- name: Build site
	run: |
		npm ci
		npm run openapi:generate   # 如果你有独立生成步骤
		npm run fix-sidebar-keys
		npm run build
```

把 `npm run fix-sidebar-keys` 放在 `docusaurus build` 之前可以避免 zh-CN 构建因重复翻译 key 而失败。
