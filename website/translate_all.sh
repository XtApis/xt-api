#!/bin/bash

# 全面翻译脚本 - 翻译所有文档
# 使用方法: ./translate_all.sh

set -e

echo "🚀 开始全面翻译所有文档..."

# 定义所有需要翻译的路径
PATHS=(
    "futures/AccessDescription"
    "futures/MarketData"
    "futures/Order"
    "futures/User"
    "futures/Entrust"
    "spot/Market"
    "spot/Deposit&Withdrawal"
    "spot/Transfer"
    "spot/User"
    "spot/Order"
    "margin-spot/Account"
    "margin-spot/Market"
    "margin-spot/Order"
    "margin-spot/User"
    "futures-copy/Order"
    "futures-copy/User"
    "trading-third-party/Order"
    "trading-third-party/User"
)

# 统计变量
TOTAL_FILES=0
SUCCESS_FILES=0
FAILED_FILES=0

echo "📋 需要翻译的路径:"
for path in "${PATHS[@]}"; do
    if [ -d "docs/$path" ]; then
        file_count=$(find "docs/$path" -name "*.mdx" -o -name "*.md" | wc -l)
        echo "   - $path ($file_count 个文件)"
        TOTAL_FILES=$((TOTAL_FILES + file_count))
    else
        echo "   - $path (路径不存在，跳过)"
    fi
done

echo ""
echo "📊 总计需要翻译的文件: $TOTAL_FILES 个"
echo ""

# 开始翻译
for path in "${PATHS[@]}"; do
    if [ -d "docs/$path" ]; then
        echo "🔄 正在翻译: $path"
        if ./run_translate.sh "$path" > /dev/null 2>&1; then
            file_count=$(find "docs/$path" -name "*.mdx" -o -name "*.md" | wc -l)
            SUCCESS_FILES=$((SUCCESS_FILES + file_count))
            echo "   ✅ 成功翻译 $file_count 个文件"
        else
            echo "   ❌ 翻译失败"
            FAILED_FILES=$((FAILED_FILES + 1))
        fi
    fi
done

echo ""
echo "📊 翻译完成统计:"
echo "   - 总文件数: $TOTAL_FILES"
echo "   - 成功翻译: $SUCCESS_FILES"
echo "   - 失败文件: $FAILED_FILES"
echo "   - 成功率: $(( SUCCESS_FILES * 100 / TOTAL_FILES ))%"

if [ $FAILED_FILES -eq 0 ]; then
    echo ""
    echo "🎉 所有文档翻译完成！"
    echo "💡 建议运行 'yarn build' 重新构建网站"
else
    echo ""
    echo "⚠️  有 $FAILED_FILES 个路径翻译失败，请检查错误信息"
fi
