#!/bin/bash

echo "🚀 开始内存优化构建中英文版本..."

# 设置环境变量
export NODE_OPTIONS="--max-old-space-size=20480 --max-semi-space-size=512"
export DOCUSAURUS_SLOWER=true
export NODE_ENV=production

# 清理
echo "🧹 清理之前的构建..."
yarn clear

# 设置垃圾回收优化
export NODE_OPTIONS="$NODE_OPTIONS --expose-gc --optimize-for-size"

echo "⚙️  内存优化设置："
echo "   - 最大堆内存: 20GB"
echo "   - 半空间大小: 512MB"
echo "   - 启用垃圾回收优化"
echo "   - 启用大小优化"

# 构建中英文版本
echo "📖 开始构建中英文版本..."
yarn build

if [ $? -eq 0 ]; then
    echo "✅ 中英文版本构建成功！"
    echo "📁 构建结果位于: build/"
    echo "🌐 可以使用 'yarn serve' 来预览网站"
    
    # 显示构建结果
    echo "📊 构建统计："
    du -sh build/
    echo "📁 包含的语言版本："
    ls -la build/ | grep -E "(en|zh-Hans)"
else
    echo "❌ 构建失败"
    echo "💡 建议："
    echo "   1. 检查系统内存是否足够"
    echo "   2. 尝试关闭其他应用程序"
    echo "   3. 考虑分批构建内容"
    exit 1
fi
