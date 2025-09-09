# 增强版翻译脚本使用指南

## 脚本介绍

`translate_enhanced.py` 是一个完全自动化的翻译脚本，能够自动完成所有翻译工作，无需手动修正。

## 主要特性

### ✅ 完全自动化

- 自动翻译标题和侧边栏标签
- 自动翻译表格标题和内容
- 自动翻译常见短语和描述
- 自动翻译代码注释
- 保护 JSON 字段名不被翻译

### ✅ 智能翻译

- 使用正则表达式精确匹配
- 分步骤翻译，避免冲突
- 保护重要字段名不被误翻译
- 支持多种格式的表格

### ✅ 全面覆盖

- 支持所有 API 文档类型
- 包含完整的翻译映射表
- 自动处理各种边缘情况

## 使用方法

### 基本用法

```bash
# 翻译整个模块
python3 translate_enhanced.py spot
python3 translate_enhanced.py futures
python3 translate_enhanced.py margin-spot

# 翻译特定目录
python3 translate_enhanced.py spot/Balance
python3 translate_enhanced.py spot/Market
python3 translate_enhanced.py spot/Order

# 翻译特定子目录（注意特殊字符）
python3 translate_enhanced.py spot/AccessDescription
python3 translate_enhanced.py "spot/Deposit&Withdrawal"  # 使用引号包围包含特殊字符的路径
```

### 特殊字符处理

如果路径包含特殊字符（如 `&`、`(`、`)` 等），需要使用引号包围：

```bash
# ✅ 正确用法
python3 translate_enhanced.py "spot/Deposit&Withdrawal"
python3 translate_enhanced.py "spot/WebSocket_Private"

# ❌ 错误用法（会被shell解释为命令）
python3 translate_enhanced.py spot/Deposit&Withdrawal
```

### 完整工作流程

```bash
# 1. 运行翻译脚本
python3 translate_enhanced.py spot/Balance

# 2. 重新构建网站
yarn build

# 3. 启动服务器测试
yarn serve
# 或者
docusaurus serve
```

## 翻译内容

### 自动翻译的内容

- **文件头部信息**：`title`、`sidebar_label` 等
- **表格标题**：参数表格的列标题
- **常见短语**：`Type`、`Description`、`Parameters` 等
- **接口描述**：各种接口的说明文字
- **代码注释**：JSON 示例中的注释
- **参数说明**：参数描述和示例

### 保护的字段

- **JSON 字段名**：`fullName`、`currencyId`、`assets` 等
- **API 路径**：`/v4/balances`、`/v4/public/currencies` 等
- **技术术语**：`GET`、`POST`、`JSON` 等

## 示例

### 翻译前

```markdown
---
id: GetCurrencyInfo
title: Get currency information
sidebar_label: Get currency information
---

**Type:** GET

**Description:** `/v4/public/currencies`

### Parameters

| name | type | mandatory | default | description            | ranges |
| ---- | ---- | --------- | ------- | ---------------------- | ------ |
| –    | –    | false     | N/A     | No parameters required | –      |

### Notes

This endpoint retrieves information of all supported currencies.
```

### 翻译后

```markdown
---
id: GetCurrencyInfo
title: 获取货币信息
sidebar_label: 获取货币信息
---

**类型:** GET

**描述:** `/v4/public/currencies`

### 参数

| 名称 | 类型 | 必填  | 默认值 | 描述     | 范围 |
| ---- | ---- | ----- | ------ | -------- | ---- |
| –    | –    | false | N/A    | 无需参数 | –    |

### 注意事项

此接口获取所有支持的货币信息。
```

## 支持的模块

- **Spot Trading** (`spot`)
- **Futures Trading** (`futures`)
- **Margin Trading** (`margin-spot`)
- **Copy Trading** (`copy-trading`)
- **Futures Copy** (`futures-copy`)
- **Trading Third Party** (`trading-third-party`)
- **User Center** (`user-center`)

## 注意事项

1. **运行前备份**：虽然脚本很安全，但建议先备份重要文件
2. **检查结果**：翻译完成后建议检查几个页面确保效果
3. **重新构建**：翻译完成后必须运行 `yarn build` 重新构建
4. **测试验证**：构建完成后测试页面显示效果

## 故障排除

### 如果翻译不完整

1. 检查文件路径是否正确
2. 确认目标目录存在
3. 查看错误信息并修复

### 如果 JSON 字段被误翻译

1. 脚本已包含保护机制
2. 如果仍有问题，可以手动恢复字段名
3. 更新脚本的 `protect_json_fields` 函数

### 如果表格格式有问题

1. 脚本使用正则表达式匹配表格
2. 如果表格格式特殊，可能需要手动调整
3. 可以更新脚本的 `translate_table_headers` 函数

## 更新翻译映射

如果需要添加新的翻译规则，可以编辑脚本中的 `translations` 字典：

```python
translations = {
    '新的英文短语': '对应的中文翻译',
    # 添加更多翻译规则...
}
```

## 总结

这个增强版翻译脚本能够：

- ✅ 完全自动化翻译
- ✅ 智能保护重要字段
- ✅ 支持所有文档类型
- ✅ 无需手动修正
- ✅ 提供详细的使用说明

使用这个脚本，你可以轻松完成整个项目的多语言翻译工作！
