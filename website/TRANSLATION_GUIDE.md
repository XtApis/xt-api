# 多语言翻译指南

## 翻译脚本使用方法

### 1. 自定义路径翻译脚本

使用 `translate_custom.py` 脚本来翻译指定路径下的所有 MDX 文件。

#### 基本用法

```bash
python3 translate_custom.py <目标路径>
```

#### 示例

```bash
# 翻译spot/Access Description目录下的所有文件
python3 translate_custom.py spot/Access Description

# 翻译整个spot目录下的所有文件
python3 translate_custom.py spot

# 翻译futures目录下的所有文件
python3 translate_custom.py futures

# 翻译margin-spot目录下的所有文件
python3 translate_custom.py margin-spot

# 翻译copy-trading目录下的所有文件
python3 translate_custom.py copy-trading

# 翻译trading-third-party目录下的所有文件
python3 translate_custom.py trading-third-party

# 翻译user-center目录下的所有文件
python3 translate_custom.py user-center
```

### 2. 翻译内容

脚本会自动翻译以下内容：

- **页面标题** (`title`)
- **侧边栏标签** (`sidebar_label`)
- **页面内容** (包括标题、描述、表格等)
- **常见 API 术语**
- **错误信息和提示**

### 3. 翻译映射表

脚本包含了一个扩展的翻译映射表，包括：

- API 相关术语
- 技术概念
- 用户界面元素
- 错误消息
- 常见短语

### 4. 文件结构

翻译后的文件会保存在：

```
i18n/zh-Hans/docusaurus-plugin-content-docs/current/<目标路径>/
```

### 5. 注意事项

1. **备份重要文件**：在运行翻译脚本前，建议备份重要文件
2. **检查翻译质量**：翻译完成后，请检查翻译质量并根据需要进行调整
3. **保持一致性**：确保相同术语在整个文档中保持一致的翻译
4. **测试功能**：翻译完成后，请测试网站功能是否正常

### 6. 添加新的翻译规则

如果需要添加新的翻译规则，请编辑 `translate_custom.py` 文件中的 `translations` 字典：

```python
translations = {
    'English text': '中文翻译',
    # 添加更多翻译规则...
}
```

### 7. 构建和测试

翻译完成后，请运行以下命令构建和测试：

```bash
# 构建网站
yarn build

# 启动开发服务器
yarn serve

# 访问中文页面
# http://localhost:3000/zh-Hans/docs/<路径>
```

### 8. 常见问题

**Q: 翻译后页面显示异常怎么办？** A: 检查 MDX 文件的格式是否正确，确保 Markdown 语法没有被破坏。

**Q: 某些术语翻译不准确怎么办？** A: 可以手动编辑翻译后的文件，或者修改翻译脚本中的映射表。

**Q: 如何只翻译特定文件？** A: 可以将文件移动到单独的目录中，然后使用脚本翻译该目录。

### 9. 支持的目录

- `spot` - 现货交易 API
- `futures` - 期货交易 API
- `margin-spot` - 保证金现货 API
- `copy-trading` - 跟单交易 API
- `futures-copy` - 期货跟单 API
- `trading-third-party` - 第三方交易 API
- `user-center` - 用户中心 API
- `index_overview` - 概览页面

### 10. 翻译质量检查清单

- [ ] 页面标题已翻译
- [ ] 侧边栏标签已翻译
- [ ] 内容描述已翻译
- [ ] 表格标题已翻译
- [ ] 代码注释已翻译（如需要）
- [ ] 链接文本已翻译
- [ ] 错误消息已翻译
- [ ] 术语翻译一致
- [ ] 语法正确
- [ ] 格式保持完整
