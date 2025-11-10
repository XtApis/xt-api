# OpenAPI 功能集成说明

本文档说明了从 `docusaurus-openapi-main` 项目迁移到 `xt-api` 项目的 OpenAPI 功能。

## 📦 迁移的内容

### 1. OpenAPI 包（website/packages/）

迁移了 6 个 OpenAPI 相关的包到 `website/packages/` 目录：

- **create-docusaurus-openapi**: OpenAPI 项目脚手架工具
- **docusaurus-plugin-openapi**: OpenAPI 插件，用于解析和展示 OpenAPI 规范
- **docusaurus-plugin-proxy**: API 请求代理插件
- **docusaurus-preset-openapi**: OpenAPI 预设配置
- **docusaurus-template-openapi**: OpenAPI 项目模板
- **docusaurus-theme-openapi**: OpenAPI 主题，包含 API 展示相关的 UI 组件

### 2. API 文档（website/api-docs/）

完整的 API 文档示例，包含：
- OpenAPI 规范示例文件（examples/）
- 文档和教程（docs/）
- 自定义主题和样式（src/）
- 静态资源（static/）

### 3. 脚本工具（website/api-scripts/）

OpenAPI 相关的管理脚本：
- `changelog.ts`: 生成更新日志
- `version.ts`: 版本管理
- `publish.ts`: 发布脚本
- `check-pr-title.ts`: PR 标题检查

### 4. 测试配置（website/api-cypress/）

Cypress 端到端测试配置，用于测试 OpenAPI 功能

## 🚀 使用方法

### 访问 API 文档

OpenAPI 功能已集成到主 website 项目中，通过以下方式访问：

```bash
# 启动 website 项目
yarn start:website

# 访问 API 文档
# 中文:   http://localhost:3000/api/zh
# English: http://localhost:3000/api/en
# 示例:    http://localhost:3000/api/examples
```

### 构建项目

```bash
# 构建所有包（包括 OpenAPI 包）
yarn build:packages

# 构建 website（包含 API 文档）
yarn build:website
```

### 添加新的 API 规范

1. 将 OpenAPI/Swagger 文件放在对应语言目录：
   - 中文：`website/api-docs/zh/<分组>/`
   - English：`website/api-docs/EN/<group>/`
2. 在 `website/docusaurus.config.ts` 中确认是否需要新增插件配置（同一分组下只需放入目录即可自动识别）
3. 在导航栏添加链接（可选）

```typescript
[
  'docusaurus-plugin-openapi',
  {
    id: 'api-zh',
    path: './api-docs/zh',
    routeBasePath: '/api/zh',
  },
]
```

## 📁 目录结构

```
xt-api/
└── website/                       # 主 website 项目
    ├── packages/                  # OpenAPI 相关包
    │   ├── create-docusaurus-openapi/
    │   ├── docusaurus-plugin-openapi/
    │   ├── docusaurus-plugin-proxy/
    │   ├── docusaurus-preset-openapi/
    │   ├── docusaurus-template-openapi/
    │   └── docusaurus-theme-openapi/
    ├── api-docs/                  # API 文档内容
    │   ├── EN/                    # English 规范目录
    │   │   └── xttest/openapi-biz-order.yml
    │   ├── zh/                    # 中文规范目录
    │   │   └── xttest/openapi-biz-order.yml
    │   └── examples/              # 示例 API 规范（官方示例）
    ├── api-scripts/               # 管理脚本
    ├── api-cypress/               # Cypress 测试
    └── docusaurus.config.ts       # 配置文件（已添加 OpenAPI 插件）
```

## 🔧 配置更新

### 根目录 package.json

更新了根目录的 `package.json`：

1. **Workspaces**: 添加了 OpenAPI 包的工作区
   - `website/packages/*` - OpenAPI 相关的包

### website/package.json

添加了 OpenAPI 依赖：
- `docusaurus-plugin-openapi`
- `docusaurus-plugin-proxy`
- `docusaurus-preset-openapi`
- `docusaurus-theme-openapi`

### website/docusaurus.config.ts

1. **Plugins**: 添加了 OpenAPI 插件配置
```typescript
[
  'docusaurus-plugin-openapi',
  {
    id: 'api-docs',
    path: './api-docs/examples',
    routeBasePath: '/api',
  },
]
```

2. **Navbar**: 添加了 API Reference 导航链接
```typescript
{
  to: '/api',
  label: 'API Reference',
  position: 'left',
}
```

## 📝 OpenAPI 功能特性

### 核心功能

1. **自动生成 API 文档**: 从 OpenAPI 规范自动生成交互式文档
2. **API 请求演示**: 内置 API 请求测试面板
3. **多种认证方式**: 支持 Bearer Token、API Key、OAuth 等
4. **请求/响应示例**: 展示完整的请求和响应示例
5. **代码生成**: 支持生成 cURL、多种编程语言的请求代码
6. **搜索和导航**: 完整的侧边栏导航和搜索功能

### 主题组件

- **ApiDemoPanel**: API 交互演示面板
- **ApiItem**: 单个 API 端点展示
- **ApiPage**: API 页面容器
- **Authorization**: 认证配置组件
- **FormComponents**: 表单输入组件（文本、文件上传、下拉选择等）
- **Response**: 响应展示组件
- **Server**: 服务器选择组件

## 🔗 相关资源

- 原始项目: [docusaurus-openapi](https://github.com/PaloAltoNetworks/docusaurus-openapi)
- Docusaurus 官方文档: [https://docusaurus.io](https://docusaurus.io)
- OpenAPI 规范: [https://swagger.io/specification/](https://swagger.io/specification/)

## 📅 迁移日期

迁移完成于: 2025-11-04

## ⚠️ 注意事项

1. 确保在使用前安装所有依赖: `yarn install`
2. OpenAPI 包需要先构建才能在演示项目中使用
3. 测试配置文件使用了不同的命名前缀（openapi-*）以避免与主项目冲突
4. 建议定期同步上游 docusaurus-openapi 项目的更新

---

如有问题，请参考演示项目的配置文件或查阅原始项目文档。

