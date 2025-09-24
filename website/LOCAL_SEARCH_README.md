# XT API 本地搜索功能

## 概述

这是一个为 XT API 文档网站实现的本地搜索功能，专门搜索 `/Users/king/Downloads/xt-api-main 2/website/docs` 目录下的 API 接口文档。

## 功能特性

- ✅ **本地搜索**: 无需网络连接，完全本地化搜索
- ✅ **实时搜索**: 输入即搜索，300ms 防抖优化
- ✅ **智能匹配**: 支持标题、内容、关键词、路径搜索
- ✅ **高亮显示**: 搜索结果中关键词高亮显示
- ✅ **分类标签**: 显示文档类型（现货、合约、跟单等）
- ✅ **键盘导航**: 支持方向键导航和快捷键操作
- ✅ **响应式设计**: 支持桌面端和移动端
- ✅ **多语言支持**: 支持中英文搜索

## 文件结构

```
src/
├── plugins/local-search/           # 本地搜索插件
│   ├── index.ts                   # 插件主文件
│   ├── client-module.tsx          # 客户端搜索模块
│   └── styles.module.css          # 搜索界面样式
├── components/LocalSearchBar/     # 搜索栏组件
│   ├── index.tsx                  # 搜索栏主组件
│   └── styles.module.css          # 搜索栏样式
├── theme/NavbarItem/              # 导航栏组件
│   ├── LocalSearchNavbarItem.tsx  # 导航栏搜索项
│   └── ComponentTypes.tsx         # 组件类型映射
└── pages/search-test.tsx          # 搜索测试页面
```

## 使用方法

### 1. 访问测试页面

访问 `http://localhost:3000/search-test` 来测试搜索功能。

### 2. 搜索操作

- **打开搜索**: 点击搜索栏或按 `/` 键
- **输入搜索**: 输入至少 2 个字符开始搜索
- **导航结果**: 使用 `↑` `↓` 方向键导航
- **选择结果**: 按 `Enter` 键或点击选择
- **关闭搜索**: 按 `ESC` 键或点击外部区域

### 3. 搜索建议

尝试搜索以下关键词：

- `现货` - 搜索现货交易相关文档
- `合约` - 搜索合约交易相关文档
- `API` - 搜索 API 相关文档
- `订单` - 搜索订单相关接口
- `用户` - 搜索用户中心相关文档
- `跟单` - 搜索跟单交易相关文档
- `保证金` - 搜索保证金相关文档

## 技术实现

### 搜索索引构建

插件在构建时自动扫描 `docs` 目录，为每个 MDX/MD 文件创建搜索索引：

```typescript
interface SearchIndexItem {
  id: string; // 文档 ID
  title: string; // 文档标题
  description: string; // 文档描述
  content: string; // 清理后的内容
  keywords: string[]; // 提取的关键词
  url: string; // 文档 URL
  path: string; // 文件路径
  type: string; // 文档类型
  category: string; // 文档分类
}
```

### 搜索算法

使用多维度评分算法：

- **标题匹配**: 15 分（完全匹配）
- **标题包含**: 10 分
- **关键词匹配**: 8 分
- **描述匹配**: 6 分
- **路径匹配**: 5 分
- **内容匹配**: 2 分

### 关键词提取

自动提取以下类型的关键词：

- 文档标题和描述中的词汇
- 文件路径中的词汇
- API 端点路径
- HTTP 方法（GET、POST 等）
- 参数名称

## 配置选项

在 `docusaurus.config.ts` 中配置：

```typescript
[
  './src/plugins/local-search/index.ts',
  {
    docsDir: 'docs', // 搜索的文档目录
    indexFile: 'search-index.json', // 索引文件输出路径
    maxResults: 20, // 最大搜索结果数
    minSearchLength: 2, // 最小搜索字符数
  },
];
```

## 样式定制

搜索界面使用 CSS Modules，可以通过修改 `styles.module.css` 文件来自定义样式：

- `.searchOverlay` - 搜索遮罩层
- `.searchModal` - 搜索模态框
- `.searchInput` - 搜索输入框
- `.searchResults` - 搜索结果区域
- `.resultItem` - 单个搜索结果项
- `.resultType` - 结果类型标签

## 性能优化

- **防抖搜索**: 300ms 防抖，避免频繁搜索
- **结果限制**: 最多显示 20 个结果
- **内容截断**: 搜索结果内容截断到 200 字符
- **懒加载**: 搜索结果按需渲染

## 浏览器支持

- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+

## 故障排除

### 1. 搜索索引未生成

检查 `docs` 目录是否存在且包含 MDX/MD 文件。

### 2. 搜索结果为空

- 确保输入至少 2 个字符
- 检查搜索关键词是否存在于文档中
- 查看浏览器控制台是否有错误信息

### 3. 样式显示异常

- 检查 CSS Modules 是否正确加载
- 确保没有样式冲突
- 验证 CSS 语法是否正确

## 开发说明

### 添加新的搜索类型

1. 在 `determineDocumentType` 函数中添加新的类型判断
2. 在 `getTypeLabel` 函数中添加类型标签
3. 在 `getTypeClassName` 函数中添加 CSS 类名映射
4. 在 CSS 文件中添加对应的样式

### 修改搜索算法

编辑 `calculateScore` 函数来调整搜索评分逻辑。

### 自定义搜索界面

修改 `client-module.tsx` 中的 JSX 结构来自定义搜索界面布局。

## 许可证

MIT License
