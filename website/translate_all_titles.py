#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
全面标题翻译脚本
翻译所有模块的标题和侧边栏标签
"""

import os
import re
import sys
from pathlib import Path

def get_translation_mappings():
    """获取完整的翻译映射表"""
    return {
        # Entrust 相关标题翻译
        'title: Create Trigger Orders': 'title: 创建触发订单',
        'sidebar_label: Create Trigger Orders': 'sidebar_label: 创建触发订单',
        'Create Trigger Orders': '创建触发订单',
        
        'title: Cancel Trigger Orders': 'title: 取消触发订单',
        'sidebar_label: Cancel Trigger Orders': 'sidebar_label: 取消触发订单',
        'Cancel Trigger Orders': '取消触发订单',
        
        'title: Cancel All Trigger Orders': 'title: 取消所有触发订单',
        'sidebar_label: Cancel All Trigger Orders': 'sidebar_label: 取消所有触发订单',
        'Cancel All Trigger Orders': '取消所有触发订单',
        
        'title: See Trigger Orders': 'title: 查看触发订单',
        'sidebar_label: See Trigger Orders': 'sidebar_label: 查看触发订单',
        'See Trigger Orders': '查看触发订单',
        
        'title: See Trigger Orders base on EntrustId': 'title: 根据委托ID查看触发订单',
        'sidebar_label: See Trigger Orders base on EntrustId': 'sidebar_label: 根据委托ID查看触发订单',
        'See Trigger Orders base on EntrustId': '根据委托ID查看触发订单',
        
        'title: See Trigger Orders History': 'title: 查看触发订单历史',
        'sidebar_label: See Trigger Orders History': 'sidebar_label: 查看触发订单历史',
        'See Trigger Orders History': '查看触发订单历史',
        
        'title: Create Stop Limit': 'title: 创建止损限价',
        'sidebar_label: Create Stop Limit': 'sidebar_label: 创建止损限价',
        'Create Stop Limit': '创建止损限价',
        
        'title: Cancel Stop Limit': 'title: 取消止损限价',
        'sidebar_label: Cancel Stop Limit': 'sidebar_label: 取消止损限价',
        'Cancel Stop Limit': '取消止损限价',
        
        'title: Cancel All Stop Limit': 'title: 取消所有止损限价',
        'sidebar_label: Cancel All Stop Limit': 'sidebar_label: 取消所有止损限价',
        'Cancel All Stop Limit': '取消所有止损限价',
        
        'title: See Stop Limit': 'title: 查看止损限价',
        'sidebar_label: See Stop Limit': 'sidebar_label: 查看止损限价',
        'See Stop Limit': '查看止损限价',
        
        'title: See Stop Limit base on ProfitId': 'title: 根据利润ID查看止损限价',
        'sidebar_label: See Stop Limit base on ProfitId': 'sidebar_label: 根据利润ID查看止损限价',
        'See Stop Limit base on ProfitId': '根据利润ID查看止损限价',
        
        'title: Alter Stop Limit': 'title: 修改止损限价',
        'sidebar_label: Alter Stop Limit': 'sidebar_label: 修改止损限价',
        'Alter Stop Limit': '修改止损限价',
        
        'title: Create Track': 'title: 创建跟踪',
        'sidebar_label: Create Track': 'sidebar_label: 创建跟踪',
        'Create Track': '创建跟踪',
        
        'title: Cancel single track': 'title: 取消单个跟踪',
        'sidebar_label: Cancel single track': 'sidebar_label: 取消单个跟踪',
        'Cancel single track': '取消单个跟踪',
        
        'title: Get track list (all active)': 'title: 获取跟踪列表（所有活跃）',
        'sidebar_label: Get track list (all active)': 'sidebar_label: 获取跟踪列表（所有活跃）',
        'Get track list (all active)': '获取跟踪列表（所有活跃）',
        
        'title: Cancel all track': 'title: 取消所有跟踪',
        'sidebar_label: Cancel all track': 'sidebar_label: 取消所有跟踪',
        'Cancel all track': '取消所有跟踪',
        
        'title: Get history track list (inactive)': 'title: 获取历史跟踪列表（非活跃）',
        'sidebar_label: Get history track list (inactive)': 'sidebar_label: 获取历史跟踪列表（非活跃）',
        'Get history track list (inactive)': '获取历史跟踪列表（非活跃）',
        
        'title: Get single order track detail': 'title: 获取单个订单跟踪详情',
        'sidebar_label: Get single order track detail': 'sidebar_label: 获取单个订单跟踪详情',
        'Get single order track detail': '获取单个订单跟踪详情',
        
        # Order 相关标题翻译
        'title: Create Order': 'title: 创建订单',
        'sidebar_label: Create Order': 'sidebar_label: 创建订单',
        'Create Order': '创建订单',
        
        'title: Cancel Order': 'title: 取消订单',
        'sidebar_label: Cancel Order': 'sidebar_label: 取消订单',
        'Cancel Order': '取消订单',
        
        'title: Cancel All Orders': 'title: 取消所有订单',
        'sidebar_label: Cancel All Orders': 'sidebar_label: 取消所有订单',
        'Cancel All Orders': '取消所有订单',
        
        'title: Get Order': 'title: 获取订单',
        'sidebar_label: Get Order': 'sidebar_label: 获取订单',
        'Get Order': '获取订单',
        
        'title: Get Order History': 'title: 获取订单历史',
        'sidebar_label: Get Order History': 'sidebar_label: 获取订单历史',
        'Get Order History': '获取订单历史',
        
        'title: Get Open Orders': 'title: 获取未平仓订单',
        'sidebar_label: Get Open Orders': 'sidebar_label: 获取未平仓订单',
        'Get Open Orders': '获取未平仓订单',
        
        'title: Batch Create Order': 'title: 批量创建订单',
        'sidebar_label: Batch Create Order': 'sidebar_label: 批量创建订单',
        'Batch Create Order': '批量创建订单',
        
        'title: Batch Cancel Order': 'title: 批量取消订单',
        'sidebar_label: Batch Cancel Order': 'sidebar_label: 批量取消订单',
        'Batch Cancel Order': '批量取消订单',
        
        'title: Get Order Detail': 'title: 获取订单详情',
        'sidebar_label: Get Order Detail': 'sidebar_label: 获取订单详情',
        'Get Order Detail': '获取订单详情',
        
        'title: Get Order List': 'title: 获取订单列表',
        'sidebar_label: Get Order List': 'sidebar_label: 获取订单列表',
        'Get Order List': '获取订单列表',
        
        # User 相关标题翻译
        'title: Get Account Information': 'title: 获取账户信息',
        'sidebar_label: Get Account Information': 'sidebar_label: 获取账户信息',
        'Get Account Information': '获取账户信息',
        
        'title: Get Account Balance': 'title: 获取账户余额',
        'sidebar_label: Get Account Balance': 'sidebar_label: 获取账户余额',
        'Get Account Balance': '获取账户余额',
        
        'title: Get Account Position': 'title: 获取账户持仓',
        'sidebar_label: Get Account Position': 'sidebar_label: 获取账户持仓',
        'Get Account Position': '获取账户持仓',
        
        'title: Get Account History': 'title: 获取账户历史',
        'sidebar_label: Get Account History': 'sidebar_label: 获取账户历史',
        'Get Account History': '获取账户历史',
        
        'title: Get Account Settings': 'title: 获取账户设置',
        'sidebar_label: Get Account Settings': 'sidebar_label: 获取账户设置',
        'Get Account Settings': '获取账户设置',
        
        'title: Update Account Settings': 'title: 更新账户设置',
        'sidebar_label: Update Account Settings': 'sidebar_label: 更新账户设置',
        'Update Account Settings': '更新账户设置',
        
        'title: Get User Profile': 'title: 获取用户资料',
        'sidebar_label: Get User Profile': 'sidebar_label: 获取用户资料',
        'Get User Profile': '获取用户资料',
        
        'title: Update User Profile': 'title: 更新用户资料',
        'sidebar_label: Update User Profile': 'sidebar_label: 更新用户资料',
        'Update User Profile': '更新用户资料',
        
        # Spot 相关标题翻译
        'title: Get Symbol Information': 'title: 获取交易对信息',
        'sidebar_label: Get Symbol Information': 'sidebar_label: 获取交易对信息',
        'Get Symbol Information': '获取交易对信息',
        
        'title: Get Ticker': 'title: 获取行情',
        'sidebar_label: Get Ticker': 'sidebar_label: 获取行情',
        'Get Ticker': '获取行情',
        
        'title: Get Order Book': 'title: 获取订单簿',
        'sidebar_label: Get Order Book': 'sidebar_label: 获取订单簿',
        'Get Order Book': '获取订单簿',
        
        'title: Get Recent Trades': 'title: 获取最近交易',
        'sidebar_label: Get Recent Trades': 'sidebar_label: 获取最近交易',
        'Get Recent Trades': '获取最近交易',
        
        'title: Get Klines': 'title: 获取K线数据',
        'sidebar_label: Get Klines': 'sidebar_label: 获取K线数据',
        'Get Klines': '获取K线数据',
        
        'title: Get 24hr Ticker': 'title: 获取24小时行情',
        'sidebar_label: Get 24hr Ticker': 'sidebar_label: 获取24小时行情',
        'Get 24hr Ticker': '获取24小时行情',
        
        'title: Get Price': 'title: 获取价格',
        'sidebar_label: Get Price': 'sidebar_label: 获取价格',
        'Get Price': '获取价格',
        
        'title: Get Average Price': 'title: 获取平均价格',
        'sidebar_label: Get Average Price': 'sidebar_label: 获取平均价格',
        'Get Average Price': '获取平均价格',
        
        # Margin Spot 相关标题翻译
        'title: Get Margin Account': 'title: 获取杠杆账户',
        'sidebar_label: Get Margin Account': 'sidebar_label: 获取杠杆账户',
        'Get Margin Account': '获取杠杆账户',
        
        'title: Get Margin Account Balance': 'title: 获取杠杆账户余额',
        'sidebar_label: Get Margin Account Balance': 'sidebar_label: 获取杠杆账户余额',
        'Get Margin Account Balance': '获取杠杆账户余额',
        
        'title: Get Margin Account Position': 'title: 获取杠杆账户持仓',
        'sidebar_label: Get Margin Account Position': 'sidebar_label: 获取杠杆账户持仓',
        'Get Margin Account Position': '获取杠杆账户持仓',
        
        'title: Get Margin Account History': 'title: 获取杠杆账户历史',
        'sidebar_label: Get Margin Account History': 'sidebar_label: 获取杠杆账户历史',
        'Get Margin Account History': '获取杠杆账户历史',
        
        'title: Get Margin Account Settings': 'title: 获取杠杆账户设置',
        'sidebar_label: Get Margin Account Settings': 'sidebar_label: 获取杠杆账户设置',
        'Get Margin Account Settings': '获取杠杆账户设置',
        
        'title: Update Margin Account Settings': 'title: 更新杠杆账户设置',
        'sidebar_label: Update Margin Account Settings': 'sidebar_label: 更新杠杆账户设置',
        'Update Margin Account Settings': '更新杠杆账户设置',
        
        # 通用术语翻译
        'Client order ID': '客户端订单ID',
        'Trading pair': '交易对',
        'Order side: BUY; SELL': '订单方向：买入；卖出',
        'BUY;SELL': '买入；卖出',
        'BUY': '买入',
        'SELL': '卖出',
        'String': '字符串',
        'Number': '数字',
        'Boolean': '布尔值',
        'Array': '数组',
        'Object': '对象',
        'Yes': '是',
        'No': '否',
        'Required': '必需',
        'Optional': '可选',
        'Default': '默认值',
        'Range': '范围',
        'Description': '描述',
        'Name': '名称',
        'Type': '类型',
        'Mandatory': '必需',
        'Default Value': '默认值',
        'Parameters': '参数',
        'Request': '请求',
        'Response': '响应',
        'Example': '示例',
        'Note': '注意',
        'Remark': '备注',
        'Limit Flow Rules': '限流规则',
        'Content-Type': '内容类型',
        'application/x-www-form-urlencoded': 'application/x-www-form-urlencoded',
        'application/json': 'application/json',
    }

def translate_file(file_path, translations):
    """翻译单个文件"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original_content = content
        
        # 应用所有翻译映射
        for english, chinese in translations.items():
            content = content.replace(english, chinese)
        
        # 如果内容有变化，写回文件
        if content != original_content:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
            return True
        return False
        
    except Exception as e:
        print(f"❌ 翻译文件失败 {file_path}: {e}")
        return False

def translate_directory(directory_path, translations):
    """翻译目录中的所有MDX文件"""
    translated_count = 0
    total_count = 0
    
    for root, dirs, files in os.walk(directory_path):
        for file in files:
            if file.endswith('.mdx') or file.endswith('.md'):
                file_path = os.path.join(root, file)
                total_count += 1
                
                if translate_file(file_path, translations):
                    translated_count += 1
                    print(f"✅ 已翻译: {file_path}")
    
    return translated_count, total_count

def main():
    """主函数"""
    print("🚀 开始全面标题翻译...")
    
    # 获取翻译映射
    translations = get_translation_mappings()
    print(f"📋 加载了 {len(translations)} 个翻译映射")
    
    # 翻译所有文档
    docs_dir = "docs"
    if not os.path.exists(docs_dir):
        print(f"❌ 错误: 目录 '{docs_dir}' 不存在")
        return
    
    translated_count, total_count = translate_directory(docs_dir, translations)
    
    print(f"\n📊 翻译完成统计:")
    print(f"   总文件数: {total_count}")
    print(f"   成功翻译: {translated_count}")
    print(f"   失败文件: {total_count - translated_count}")
    print(f"   成功率: {translated_count * 100 // total_count if total_count > 0 else 0}%")
    
    if translated_count > 0:
        print("\n🎉 标题翻译完成！请运行 'yarn build' 重新构建网站。")
    else:
        print("\n⚠️  没有文件需要翻译。")

if __name__ == "__main__":
    main()
