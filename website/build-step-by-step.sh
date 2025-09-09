#!/bin/bash

echo "🚀 开始分步构建中文版本..."

# 设置环境变量
export NODE_OPTIONS="--max-old-space-size=6144"
export DOCUSAURUS_SLOWER=true

# 清理
echo "🧹 清理之前的构建..."
yarn clear

# 先构建英文版本（如果还没有）
if [ ! -d "build" ]; then
    echo "📖 先构建英文版本..."
    yarn build:en
    if [ $? -ne 0 ]; then
        echo "❌ 英文版本构建失败"
        exit 1
    fi
    echo "✅ 英文版本构建成功"
fi

# 备份英文版本
echo "💾 备份英文版本..."
if [ -d "build" ]; then
    cp -r build build-en-backup
fi

# 构建中文版本
echo "📖 构建中文版本..."
yarn build:zh:memory-optimized

if [ $? -eq 0 ]; then
    echo "✅ 中文版本构建成功"
    
    # 合并构建结果
    if [ -d "build-en-backup" ]; then
        echo "🔗 合并构建结果..."
        # 将中文版本复制到英文版本中
        cp -r build/zh-Hans build-en-backup/
        rm -rf build
        mv build-en-backup build
    fi
    
    echo "🎉 构建完成！"
    echo "📁 构建结果位于: build/"
else
    echo "❌ 中文版本构建失败"
    exit 1
fi
