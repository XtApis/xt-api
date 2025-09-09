#!/bin/bash

# 翻译脚本 - 支持中英文双语翻译
# 使用方法: ./run_translate.sh <目标路径>
# 例如: ./run_translate.sh futures/AccessDescription

set -e

# 检查参数
if [ $# -eq 0 ]; then
    echo "❌ 错误: 请提供要翻译的路径"
    echo "使用方法: $0 <目标路径>"
    echo "例如: $0 futures/AccessDescription"
    exit 1
fi

TARGET_PATH="$1"
echo "🚀 开始翻译路径: $TARGET_PATH"

# 检查目标路径是否存在
if [ ! -d "docs/$TARGET_PATH" ]; then
    echo "❌ 错误: 路径 docs/$TARGET_PATH 不存在"
    echo "可用的路径:"
    find docs -type d -maxdepth 2 | grep -v "^docs$" | sort
    exit 1
fi

# 检查翻译脚本是否存在
if [ ! -f "translate_enhanced.py" ]; then
    echo "❌ 错误: translate_enhanced.py 脚本不存在"
    exit 1
fi

# 检查 Python 是否可用
if ! command -v python3 &> /dev/null; then
    echo "❌ 错误: Python3 未安装或不在 PATH 中"
    exit 1
fi

echo "📖 开始翻译文档..."

# 运行翻译脚本
python3 translate_enhanced.py "$TARGET_PATH"

if [ $? -eq 0 ]; then
    echo "✅ 翻译完成！"
    echo "📁 翻译后的文件位置:"
    echo "   - 英文: docs/$TARGET_PATH/"
    echo "   - 中文: i18n/zh-Hans/docusaurus-plugin-content-docs/current/$TARGET_PATH/"
    
    # 显示翻译统计
    echo ""
    echo "📊 翻译统计:"
    EN_FILES=$(find "docs/$TARGET_PATH" -name "*.mdx" -o -name "*.md" | wc -l)
    ZH_FILES=$(find "i18n/zh-Hans/docusaurus-plugin-content-docs/current/$TARGET_PATH" -name "*.mdx" -o -name "*.md" 2>/dev/null | wc -l)
    echo "   - 英文文件: $EN_FILES 个"
    echo "   - 中文文件: $ZH_FILES 个"
    
    echo ""
    echo "🎉 翻译成功完成！"
else
    echo "❌ 翻译失败"
    exit 1
fi
