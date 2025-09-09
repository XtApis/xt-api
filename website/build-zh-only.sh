#!/bin/bash

echo "🚀 开始构建中文版本..."

# 设置环境变量
export NODE_OPTIONS="--max-old-space-size=8192"
export DOCUSAURUS_SLOWER=true

# 清理之前的构建
echo "🧹 清理之前的构建..."
yarn clear

# 只构建中文版本
echo "📖 构建中文版本..."
yarn build:zh:memory-optimized

echo "🎉 中文版本构建完成！"
