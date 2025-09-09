#!/bin/bash

echo "🚀 开始构建包含中文版本的网站..."

# 设置环境变量
export NODE_OPTIONS="--max-old-space-size=8192"
export DOCUSAURUS_SLOWER=true

# 清理
echo "🧹 清理之前的构建..."
yarn clear

# 先构建英文版本
echo "📖 构建英文版本..."
yarn build:en
if [ $? -ne 0 ]; then
    echo "❌ 英文版本构建失败"
    exit 1
fi
echo "✅ 英文版本构建成功"

# 备份英文版本
echo "💾 备份英文版本..."
cp -r build build-en-backup

# 尝试构建中文版本
echo "📖 尝试构建中文版本..."
yarn build:zh:memory-optimized

if [ $? -eq 0 ]; then
    echo "✅ 中文版本构建成功"
    
    # 合并构建结果
    echo "🔗 合并构建结果..."
    cp -r build/zh-Hans build-en-backup/
    rm -rf build
    mv build-en-backup build
    
    echo "🎉 完整构建完成！包含中英文版本"
else
    echo "⚠️  中文版本构建失败，使用仅英文版本"
    echo "💡 建议："
    echo "   1. 减少中文翻译文件的大小"
    echo "   2. 分批构建中文内容"
    echo "   3. 使用更强大的服务器进行构建"
    
    # 恢复英文版本
    rm -rf build
    mv build-en-backup build
fi

echo "📁 构建结果位于: build/"
echo "🌐 可以使用 'yarn serve' 来预览网站"
