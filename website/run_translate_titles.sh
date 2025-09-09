#!/bin/bash

# 全面标题翻译脚本
# 使用方法: ./run_translate_titles.sh

set -e

echo "🚀 开始全面标题翻译..."

# 检查Python3是否可用
if ! command -v python3 &> /dev/null; then
    echo "❌ 错误: python3 未安装或不在PATH中。请安装Python3。"
    exit 1
fi

# 检查翻译脚本是否存在
if [ ! -f "translate_all_titles.py" ]; then
    echo "❌ 错误: 翻译脚本 'translate_all_titles.py' 不存在。"
    exit 1
fi

echo "📖 开始翻译所有标题..."

# 运行Python翻译脚本
python3 translate_all_titles.py

if [ $? -eq 0 ]; then
    echo "✅ 标题翻译完成！"
    echo "💡 建议运行 'yarn build' 重新构建网站"
else
    echo "❌ 标题翻译失败！请检查Python脚本输出的错误信息。"
    exit 1
fi
