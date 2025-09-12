#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
增强版翻译脚本 - 完全自动化翻译
使用方法: python3 translate_enhanced.py <目标路径>
例如: python3 translate_enhanced.py spot/Access Description
"""

import os
import sys
import re
from pathlib import Path

# 完整的翻译映射表
translations = {
    # 基础标题和标签翻译
    'title: REST API': 'title: REST API',
    'sidebar_label: REST API': 'sidebar_label: REST API',
    'title: Basic Information of the Interface': 'title: 接口基本信息',
    'sidebar_label: Basic Information of the Interface': 'sidebar_label: 接口基本信息',
    'title: Frequency Limiting Rules': 'title: 频率限制规则',
    'sidebar_label: Frequency Limiting Rules': 'sidebar_label: 频率限制规则',
    'title: Signature Instructions': 'title: 签名说明',
    'sidebar_label: Signature Instructions': 'sidebar_label: 签名说明',
    'title: Signature generation': 'title: 签名生成',
    'sidebar_label: Signature generation': 'sidebar_label: 签名生成',
    'title: Signature Statement': 'title: 签名声明',
    'sidebar_label: Signature Statement': 'sidebar_label: 签名声明',
    'title: API Key Application Steps': 'title: API密钥申请步骤',
    'sidebar_label: API Key Application Steps': 'sidebar_label: API密钥申请步骤',
    'title: API Code Library': 'title: API代码库',
    'sidebar_label: API Code Library': 'sidebar_label: API代码库',
    'title: Response Format': 'title: 响应格式',
    'sidebar_label: Response Format': 'sidebar_label: 响应格式',
    'title: Response Code': 'title: 响应代码',
    'sidebar_label: Response Code': 'sidebar_label: 响应代码',
    'title: Public module': 'title: 公共模块',
    'sidebar_label: Public module': 'sidebar_label: 公共模块',
    'title: FAQ': 'title: 常见问题',
    'sidebar_label: FAQ': 'sidebar_label: 常见问题',
    'title: Contact us': 'title: 联系我们',
    'sidebar_label: Contact us': 'sidebar_label: 联系我们',

    # 签名相关翻译
    'Signature Rules': '签名规则',
    'AppKey & SecretKey': 'AppKey 和 SecretKey',
    'Timestamp': '时间戳',
    'Signature': '签名',
    'RecvWindow': '接收窗口',
    'Signature Algorithms': '签名算法',
    'Required Signature Parameters': '必需的签名参数',
    'Name': '名称',
    'Mandatory': '必需',
    'Example': '示例',
    'Description': '描述',
    'API密钥': 'API密钥',
    '时间戳': '时间戳',
    '签名': '签名',
    '接收窗口': '接收窗口',
    '毫秒s': '毫秒',
    '默认': '默认值',
    'HmacSHA256': 'HmacSHA256',
    'HmacMD5': 'HmacMD5',
    'HmacSHA1': 'HmacSHA1',
    'HmacSHA224': 'HmacSHA224',
    'HmacSHA384': 'HmacSHA384',
    'HmacSHA512': 'HmacSHA512',

    # 修复混合语言问题
    'id: 签名Statement': 'id: SignatureStatement',
    'Distributed offline': '离线分发',
    'Different calls should use different': '不同的调用应使用不同的',
    'Add a timestamp in': '添加时间戳，单位为',
    'of the request time': '请求时间',
    'The validity of the request is calculated based on this value': '请求的有效性基于此值计算',
    'All request data must be signed': '所有请求数据必须签名',
    'The validity period is set by': '有效期由',
    'is not recommended': '不推荐',
    'This mechanism handles': '此机制处理',
    'and helps ensure timeliness in high-frequency trading': '并有助于确保高频交易的及时性',
    'are calculated with HSC-based protocols': '使用基于HSC的协议计算',
    'Supported': '支持',
    'If the timestamp is more than': '如果时间戳超过',
    'older than server time, the request is invalid': '比服务器时间早，请求无效',
    'If the client timestamp is more than': '如果客户端时间戳超过',
    'ahead of the server, the request is also rejected': '比服务器早，请求也会被拒绝',
    'seconds': '秒',
    'maximum': '最大',
    'network jitter': '网络抖动',

    # API 相关翻译
    'title: Get client ip': 'title: 获取客户端IP',
    'sidebar_label: Get client ip': 'sidebar_label: 获取客户端IP',
    'Get client ip': '获取客户端IP',

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
    'title: Create Orders': 'title: 创建订单',
    'sidebar_label: Create Orders': 'sidebar_label: 创建订单',
    'Create Orders': '创建订单',

    'title: See Order History': 'title: 查看订单历史',
    'sidebar_label: See Order History': 'sidebar_label: 查看订单历史',
    'See Order History': '查看订单历史',

    'title: See Transaction Details': 'title: 查看交易详情',
    'sidebar_label: See Transaction Details': 'sidebar_label: 查看交易详情',
    'See Transaction Details': '查看交易详情',

    'title: Update Orders': 'title: 更新订单',
    'sidebar_label: Update Orders': 'sidebar_label: 更新订单',
    'Update Orders': '更新订单',

    'title: Bulk Orders': 'title: 批量订单',
    'sidebar_label: Bulk Orders': 'sidebar_label: 批量订单',
    'Bulk Orders': '批量订单',

    'title: See Orders by ID': 'title: 根据ID查看订单',
    'sidebar_label: See Orders by ID': 'sidebar_label: 根据ID查看订单',
    'See Orders by ID': '根据ID查看订单',

    'title: See Orders': 'title: 查看订单',
    'sidebar_label: See Orders': 'sidebar_label: 查看订单',
    'See Orders': '查看订单',

    'title: Cancel Orders': 'title: 取消订单',
    'sidebar_label: Cancel Orders': 'sidebar_label: 取消订单',
    'Cancel Orders': '取消订单',

    'title: Batch Cancel Orders': 'title: 批量取消订单',
    'sidebar_label: Batch Cancel Orders': 'sidebar_label: 批量取消订单',
    'Batch Cancel Orders': '批量取消订单',

    'title: Cancel All Orders': 'title: 取消所有订单',
    'sidebar_label: Cancel All Orders': 'sidebar_label: 取消所有订单',
    'Cancel All Orders': '取消所有订单',

    # 导航标题翻译
    'Access Description': '访问描述',
    'Entrust': '委托',
    'MarketData': '行情数据',
    'Order': '订单',
    'PythonPackage': 'Python包',
    'Python Package': 'Python包',
    'Quote collection': '行情集合',
    'User': '用户',
    'UserWebsocket': '用户WebSocket',
    'WebsocketV2': 'WebSocket V2',

    # Python Package 相关翻译
    'title: Python Package': 'title: Python包',
    'sidebar_label: Python Package': 'sidebar_label: Python包',
    'Official Python3 API connector for XT.COM\'s HTTP APIs': 'XT.COM HTTP API的官方Python3连接器',
    'You can find the official Python3 API connector for XT.COM\'s HTTP APIs at the following link:': '您可以在以下链接找到XT.COM HTTP API的官方Python3连接器：',
    'PyPI Project: pyxt': 'PyPI项目: pyxt',
    '示例 Code': '示例代码',
    'You can add your Python example code here': '您可以在此处添加Python示例代码',
    '示例 usage of the pyxt connector': 'pyxt连接器的使用示例',

    # margin-spot 相关翻译
    'title: BasicInformationOfTheInterface': 'title: BasicInformationOfTheInterface',
    'sidebar_label: BasicInformationOfTheInterface': 'sidebar_label: BasicInformationOfTheInterface',
    'RBasicInformationOfTheInterface': 'BasicInformationOfTheInterface',
    'description: BasicInformationOfTheInterface': 'description: REST API',
    'id: REST API': 'id: BasicInformationOfTheInterface',  # 保持ID不变，只翻译显示内容

    # 修复其他被错误翻译的ID
    'id: 接口基本信息': 'id: apiBasicInfo',
    'id: 频率限制规则': 'id: limitRules',
    'id: 签名说明': 'id: signStatement',
    'id: 签名生成': 'id: signSteps',
    'id: API密钥申请步骤': 'id: applyApi',
    'id: API代码库': 'id: apiDemo',
    'id: 响应格式': 'id: returnFormat',
    'id: 错误代码': 'id: errorCode',
    'id: 公共模块': 'id: publicModule',
    'id: 常见问题': 'id: FAQ',
    'id: 联系我们': 'id: contactUs',
    'id: Create 订单': 'id: CreateOrder',
    'id: 获取交易对信息': 'id: getSymbolInfo',
    'id: 获取借贷列表': 'id: getLoanList',
    'id: 还款': 'id: repay',
    'id: 利息': 'id: interest',
    'id: 按交易对获取余额': 'id: GetBalanceBySymbol',
    'id: Create订单': 'id: CreateOrder',
    'id: 获取交易对信息': 'id: getSymbolInfo',

    # futures模块ID修复
    'id: 请求Message格式': 'id: RequestMessageFormat',
    'id: 响应_message_format': 'id: ResponseMessageFormat',
    'id: 响应Message格式': 'id: ResponseMessageFormat',
    'id: 心跳': 'id: Heartbeat',
    'id: _futures_documentation_signsteps': 'id: signSteps',
    'id: futures_documentation_apiBasicInfo': 'id: apiBasicInfo',
    'id: Return格式': 'id: returnFormat',

    # spot模块ID修复
    'id: 响应Message格式': 'id: responseFormat',
    'id: 心跳': 'id: heartBeat',

    'title: Basic information of the interface': 'title: 接口基本信息',
    'sidebar_label: Basic information of the interface': 'sidebar_label: 接口基本信息',
    'Basic information of the interface': '接口基本信息',

    'title: Frequency Limiting Rules': 'title: 频率限制规则',
    'sidebar_label: Frequency Limiting Rules': 'sidebar_label: 频率限制规则',
    'Frequency Limiting Rules': '频率限制规则',

    'title: Signature Instructions': 'title: 签名说明',
    'sidebar_label: Signature Instructions': 'sidebar_label: 签名说明',
    'Signature Instructions': '签名说明',

    'title: Signature Generation': 'title: 签名生成',
    'sidebar_label: Signature Generation': 'sidebar_label: 签名生成',
    'Signature Generation': '签名生成',

    'title: API Key Application Steps': 'title: API密钥申请步骤',
    'sidebar_label: API Key Application Steps': 'sidebar_label: API密钥申请步骤',
    'API Key Application Steps': 'API密钥申请步骤',

    'title: API Code Library': 'title: API代码库',
    'sidebar_label: API Code Library': 'sidebar_label: API代码库',
    'API Code Library': 'API代码库',

    'title: Response Format': 'title: 响应格式',
    'sidebar_label: Response Format': 'sidebar_label: 响应格式',
    'Response Format': '响应格式',

    'title: Error Code': 'title: 错误代码',
    'sidebar_label: Error Code': 'sidebar_label: 错误代码',
    'Error Code': '错误代码',

    'title: Public Module': 'title: 公共模块',
    'sidebar_label: Public Module': 'sidebar_label: 公共模块',
    'Public Module': '公共模块',

    'title: FAQ': 'title: 常见问题',
    'sidebar_label: FAQ': 'sidebar_label: 常见问题',
    'FAQ': '常见问题',

    'title: Contact Us': 'title: 联系我们',
    'sidebar_label: Contact Us': 'sidebar_label: 联系我们',
    'Contact Us': '联系我们',

    # 其他常见翻译
    'Production environment': '生产环境',
    'Edit this page': '编辑此页',
    'Last updated on': '最后更新于',
    'Next': '下一页',
    'Previous': '上一页',

    # MarketData 相关标题翻译
    'title: Get Configuration Information for Listed And Tradeable Symbols': 'title: 获取已上市和可交易符号的配置信息',
    'sidebar_label: Get Configuration Information for Listed And Tradeable Symbols': 'sidebar_label: 获取已上市和可交易符号的配置信息',
    'Get Configuration Information for Listed And Tradeable Symbols': '获取已上市和可交易符号的配置信息',

    'title: Get Mark Price for All Trading Pairs': 'title: 获取所有交易对的标记价格',
    'sidebar_label: Get Mark Price for All Trading Pairs': 'sidebar_label: 获取所有交易对的标记价格',
    'Get Mark Price for All Trading Pairs': '获取所有交易对的标记价格',

    'title: Get Mark Price for Single Trading Pair': 'title: 获取单个交易对的标记价格',
    'sidebar_label: Get Mark Price for Single Trading Pair': 'sidebar_label: 获取单个交易对的标记价格',
    'Get Mark Price for Single Trading Pair': '获取单个交易对的标记价格',

    'title: Get Index Price for All Trading Pairs': 'title: 获取所有交易对的指数价格',
    'sidebar_label: Get Index Price for All Trading Pairs': 'sidebar_label: 获取所有交易对的指数价格',
    'Get Index Price for All Trading Pairs': '获取所有交易对的指数价格',

    'title: Get Index Price for Single Trading Pair': 'title: 获取单个交易对的指数价格',
    'sidebar_label: Get Index Price for Single Trading Pair': 'sidebar_label: 获取单个交易对的指数价格',
    'Get Index Price for Single Trading Pair': '获取单个交易对的指数价格',

    'title: Get Trading Pair Currency': 'title: 获取交易对货币',
    'sidebar_label: Get Trading Pair Currency': 'sidebar_label: 获取交易对货币',
    'Get Trading Pair Currency': '获取交易对货币',

    'title: Get Trading Pair Information of Kline': 'title: 获取交易对K线信息',
    'sidebar_label: Get Trading Pair Information of Kline': 'sidebar_label: 获取交易对K线信息',
    'Get Trading Pair Information of Kline': '获取交易对K线信息',

    'title: Get Depth Data of Trading Pairs': 'title: 获取交易对深度数据',
    'sidebar_label: Get Depth Data of Trading Pairs': 'sidebar_label: 获取交易对深度数据',
    'Get Depth Data of Trading Pairs': '获取交易对深度数据',

    'title: Get Latest Transaction Information of Trading Pairs': 'title: 获取交易对最新交易信息',
    'sidebar_label: Get Latest Transaction Information of Trading Pairs': 'sidebar_label: 获取交易对最新交易信息',
    'Get Latest Transaction Information of Trading Pairs': '获取交易对最新交易信息',

    'title: Get Market Information for All Trading Pairs': 'title: 获取所有交易对的市场信息',
    'sidebar_label: Get Market Information for All Trading Pairs': 'sidebar_label: 获取所有交易对的市场信息',
    'Get Market Information for All Trading Pairs': '获取所有交易对的市场信息',

    'title: Get Market Information for Specific Trading Pair': 'title: 获取特定交易对的市场信息',
    'sidebar_label: Get Market Information for Specific Trading Pair': 'sidebar_label: 获取特定交易对的市场信息',
    'Get Market Information for Specific Trading Pair': '获取特定交易对的市场信息',

    'title: Get Aggregated Market Information for All Trading Pairs': 'title: 获取所有交易对的聚合市场信息',
    'sidebar_label: Get Aggregated Market Information for All Trading Pairs': 'sidebar_label: 获取所有交易对的聚合市场信息',
    'Get Aggregated Market Information for All Trading Pairs': '获取所有交易对的聚合市场信息',

    'title: Get Aggregated Market Information for Specific Trading Pair': 'title: 获取特定交易对的聚合市场信息',
    'sidebar_label: Get Aggregated Market Information for Specific Trading Pair': 'sidebar_label: 获取特定交易对的聚合市场信息',
    'Get Aggregated Market Information for Specific Trading Pair': '获取特定交易对的聚合市场信息',

    'title: Get Ask Bid Market Information for All Trading Pairs': 'title: 获取所有交易对的买卖盘市场信息',
    'sidebar_label: Get Ask Bid Market Information for All Trading Pairs': 'sidebar_label: 获取所有交易对的买卖盘市场信息',
    'Get Ask Bid Market Information for All Trading Pairs': '获取所有交易对的买卖盘市场信息',

    'title: Get Ask Bid Market Information for Specific Trading Pair': 'title: 获取特定交易对的买卖盘市场信息',
    'sidebar_label: Get Ask Bid Market Information for Specific Trading Pair': 'sidebar_label: 获取特定交易对的买卖盘市场信息',
    'Get Ask Bid Market Information for Specific Trading Pair': '获取特定交易对的买卖盘市场信息',

    'title: Get Trading Pair Risk Fund Balance': 'title: 获取交易对风险基金余额',
    'sidebar_label: Get Trading Pair Risk Fund Balance': 'sidebar_label: 获取交易对风险基金余额',
    'Get Trading Pair Risk Fund Balance': '获取交易对风险基金余额',

    'title: Get Funding Rate Information': 'title: 获取资金费率信息',
    'sidebar_label: Get Funding Rate Information': 'sidebar_label: 获取资金费率信息',
    'Get Funding Rate Information': '获取资金费率信息',

    'title: Get Funding Rate Records': 'title: 获取资金费率记录',
    'sidebar_label: Get Funding Rate Records': 'sidebar_label: 获取资金费率记录',
    'Get Funding Rate Records': '获取资金费率记录',

    'title: See Leverage Stratification of Single Trading Pair': 'title: 查看单个交易对的杠杆分层',
    'sidebar_label: See Leverage Stratification of Single Trading Pair': 'sidebar_label: 查看单个交易对的杠杆分层',
    'See Leverage Stratification of Single Trading Pair': '查看单个交易对的杠杆分层',

    'title: Get the open position of a trading pair': 'title: 获取交易对的未平仓头寸',
    'sidebar_label: Get the open position of a trading pair': 'sidebar_label: 获取交易对的未平仓头寸',
    'Get the open position of a trading pair': '获取交易对的未平仓头寸',

    'title: Get Configuration Information for Single Trading Pair': 'title: 获取单个交易对的配置信息',
    'sidebar_label: Get Configuration Information for Single Trading Pair': 'sidebar_label: 获取单个交易对的配置信息',
    'Get Configuration Information for Single Trading Pair': '获取单个交易对的配置信息',
    'Type:': '类型:',
    'Description:': '描述:',
    'Note:': '注意:',
    'Parameters': '参数',
    'This method does not require a signature': '此方法不需要签名',
    'Name': '名称',
    'Type': '类型',
    'Mandatory': '必需',
    'Default': '默认值',
    'Description': '描述',
    'Ranges': '范围',
    'false': '否',
    'true': '是',
    'number': '数字',
    'string': '字符串',
    'boolean': '布尔值',
    'array': '数组',
    'object': '对象',

    # Balance相关翻译
    'title: Get currency information': 'title: 获取货币信息',
    'sidebar_label: Get currency information': 'sidebar_label: 获取货币信息',
    'title: Get a list of currency assets': 'title: 获取货币资产列表',
    'sidebar_label: Get a list of currency assets': 'sidebar_label: 获取货币资产列表',
    'title: Get account balance': 'title: 获取账户余额',
    'sidebar_label: Get account balance': 'sidebar_label: 获取账户余额',
    'title: Frequency limiting rules': 'title: 频率限制规则',
    'sidebar_label: Frequency limiting rules': 'sidebar_label: 频率限制规则',

    # Deposit&Withdrawal相关翻译
    'title: Get information of currencies (available for deposit and withdraw)': 'title: 获取支持的货币信息（可用于充值和提现）',
    'sidebar_label: Get supported currencies': 'sidebar_label: 获取支持的货币',
    'title: Get deposit address': 'title: 获取充值地址',
    'sidebar_label: Get deposit address': 'sidebar_label: 获取充值地址',
    'title: Get deposit history': 'title: 获取充值历史',
    'sidebar_label: Get deposit history': 'sidebar_label: 获取充值历史',
    'title: Withdraw': 'title: 提现',
    'sidebar_label: Withdraw': 'sidebar_label: 提现',
    'title: Get withdrawal history': 'title: 获取提现历史',
    'sidebar_label: Get withdrawal history': 'sidebar_label: 获取提现历史',
    'title: Get withdrawal detail': 'title: 获取提现详情',
    'sidebar_label: Get withdrawal detail': 'sidebar_label: 获取提现详情',

    # 更多Deposit&Withdrawal标题翻译
    'title: Get the deposit address': 'title: 获取充值地址',
    'sidebar_label: Get the deposit address': 'sidebar_label: 获取充值地址',
    'title: Get deposit history': 'title: 获取充值历史',
    'sidebar_label: Get deposit history': 'sidebar_label: 获取充值历史',
    'title: Withdraw': 'title: 提现',
    'sidebar_label: Withdraw': 'sidebar_label: 提现',
    'title: Get withdrawal history': 'title: 获取提现历史',
    'sidebar_label: Get withdrawal history': 'sidebar_label: 获取提现历史',
    'title: Get withdrawal detail': 'title: 获取提现详情',
    'sidebar_label: Get withdrawal detail': 'sidebar_label: 获取提现详情',

    # Market相关翻译
    'title: Get server time': 'title: 获取服务器时间',
    'sidebar_label: Get server time': 'sidebar_label: 获取服务器时间',
    'title: Get client ip': 'title: 获取客户端IP',
    'sidebar_label: Get client ip': 'sidebar_label: 获取客户端IP',
    'title: Get symbol information': 'title: 获取交易对信息',
    'sidebar_label: Get symbol information': 'sidebar_label: 获取交易对信息',
    'title: Get depth data': 'title: 获取深度数据',
    'sidebar_label: Get depth data': 'sidebar_label: 获取深度数据',
    'title: Get K-line data': 'title: 获取K线数据',
    'sidebar_label: Get K-line data': 'sidebar_label: 获取K线数据',
    'title: Query the list of recent transactions': 'title: 查询最近交易列表',
    'sidebar_label: Query the list of recent transactions': 'sidebar_label: 查询最近交易列表',
    'title: Query historical transaction list': 'title: 查询历史交易列表',
    'sidebar_label: Query historical transaction list': 'sidebar_label: 查询历史交易列表',
    'title: Get latest prices ticker': 'title: 获取最新价格行情',
    'sidebar_label: Get latest prices ticker': 'sidebar_label: 获取最新价格行情',
    'title: Get the best pending order ticker': 'title: 获取最佳挂单行情',
    'sidebar_label: Get the best pending order ticker': 'sidebar_label: 获取最佳挂单行情',
    'title: Get 24h statistics ticker': 'title: 获取24小时统计行情',
    'sidebar_label: Get 24h statistics ticker': 'sidebar_label: 获取24小时统计行情',
    'title: Full ticker': 'title: 完整行情',
    'sidebar_label: Full ticker': 'sidebar_label: 完整行情',

    # Order相关翻译
    'title: Place order': 'title: 下单',
    'sidebar_label: Place order': 'sidebar_label: 下单',
            'title: Get single order': 'title: 获取单个订单',
            'sidebar_label: Get single order': 'sidebar_label: 获取单个订单',
            'title: Get single': 'title: 获取单个订单',
            'sidebar_label: Get single': 'sidebar_label: 获取单个订单',
    'title: Get open orders': 'title: 获取开放订单',
    'sidebar_label: Get open orders': 'sidebar_label: 获取开放订单',
    'title: Cancel order': 'title: 取消订单',
    'sidebar_label: Cancel order': 'sidebar_label: 取消订单',
    'title: Cancel all orders': 'title: 取消所有订单',
    'sidebar_label: Cancel all orders': 'sidebar_label: 取消所有订单',
    'title: Get order history': 'title: 获取订单历史',
    'sidebar_label: Get order history': 'sidebar_label: 获取订单历史',
    'title: Batch place order': 'title: 批量下单',
    'sidebar_label: Batch place order': 'sidebar_label: 批量下单',
    'title: Batch cancel order': 'title: 批量取消订单',
    'sidebar_label: Batch cancel order': 'sidebar_label: 批量取消订单',
    'title: Update order': 'title: 更新订单',
    'sidebar_label: Update order': 'sidebar_label: 更新订单',

    # Trade相关翻译
    'title: Query trade': 'title: 查询交易',
    'sidebar_label: Query trade': 'sidebar_label: 查询交易',
    'title: Get trade history': 'title: 获取交易历史',
    'sidebar_label: Get trade history': 'sidebar_label: 获取交易历史',

    # Transfer相关翻译
    'title: Internal transfer': 'title: 内部转账',
    'sidebar_label: Internal transfer': 'sidebar_label: 内部转账',
    'title: Transfer between sub accounts': 'title: 子账户间转账',
    'sidebar_label: Transfer between sub accounts': 'sidebar_label: 子账户间转账',
    'title: Transfer between user systems': 'title: 用户系统间转账',
    'sidebar_label: Transfer between user systems': 'sidebar_label: 用户系统间转账',

    # 通用内容翻译
    '**Type:**': '**类型:**',
    '**Description:**': '**描述:**',
    '**描述:**': '**描述:**',
    '### Parameters': '### 参数',
    '### Notes': '### 注意事项',
    '### Response Example': '### 响应示例',
    '### Response 示例': '### 响应示例',
    '### 注意s': '### 注意事项',
    '### 注意s': '### 注意事项',

    # 表格标题翻译
    '| name | type | mandatory | default | description | ranges |': '| 名称 | 类型 | 必填 | 默认值 | 描述 | 范围 |',
    '| name | type | mandatory | default | description            | ranges |': '| 名称 | 类型 | 必填 | 默认值 | 描述            | 范围 |',
    '| --- | --- | --- | --- | --- | --- |': '| --- | --- | --- | --- | --- | --- |',
    '| --- | --- | --------- | ------- | ---------------------- | ------ |': '| --- | --- | --------- | ------- | ---------------------- | ------ |',

    # 参数描述翻译
    'No parameters required': '无需参数',
    'List of currencies, comma separated (e.g. usdt,btc)': '货币列表，逗号分隔 (例如: usdt,btc)',
    'Limit flow rules:': '限流规则:',
    'This endpoint retrieves information of all supported currencies.': '此接口获取所有支持的货币信息。',
    'This endpoint retrieves the user\'s account balance information.': '此接口获取用户的账户余额信息。',
    'This endpoint retrieves a list of currency assets.': '此接口获取货币资产列表。',

    # API相关翻译
    'API Key': 'API密钥',
    'API Key Application': 'API密钥申请',
    'API Code Library': 'API代码库',
    'Some interfaces may require the user\'s **API Key**.': '某些接口可能需要用户的**API密钥**。',
    'How to create an API Key': '如何创建API密钥',
    'please refer to the official documentation': '请参考官方文档',
    'A lightweight Java codebase that provides methods allowing users to directly call the API.': '一个轻量级的Java代码库，提供允许用户直接调用API的方法。',

    # 频率限制相关
    'Some interfaces will have limited flow control': '某些接口会有流控限制',
    'The flow limit is mainly divided into': '流控主要分为',
    'gateway flow limit': '网关流控',
    'WAF flow limit': 'WAF流控',
    'If the interface request triggers the gateway flow limit': '如果接口请求触发网关流控',
    'will be returned': '会返回',
    'indicating that the access frequency exceeds the limit': '表示访问频率超限',
    'will be blocked': '会被封禁',
    'Gateway flow limiting is divided into': '网关流控分为',
    'IP flow limiting': 'IP流控',
    'apiKey flow limiting': 'apiKey流控',
    'Example descriptions': '示例说明',
    'indicates the limit of the number of requests': '表示该接口的请求次数限制',
    'per second per IP': '每秒每IP',
    'per second per apiKey': '每秒每apiKey',

    # 签名相关
    'Since XT needs to provide some open interfaces for third-party platforms': '由于XT需要为第三方平台提供一些开放接口',
    'the issue of **data security** needs to be considered': '需要考虑**数据安全**问题',
    'Such as': '如',
    'Whether the data has been tampered with': '数据是否被篡改',
    'Whether the data is outdated': '数据是否过期',
    'Whether the data can be submitted repeatedly': '数据是否可以重复提交',
    'The access frequency of the interface': '接口的访问频率',
    'Among these, **whether data has been tampered with is the most important issue**': '其中，**数据是否被篡改是最重要的问题**',
    'Apply for `appkey` and `secretkey` in the user center first': '先在用户中心申请`appkey`和`secretkey`',
    'each user\'s keys are different': '每个用户的密钥都不同',
    'Add `timestamp`': '添加`timestamp`',
    'Its value should be the **unix timestamp (milliseconds)** of the time when the request is sent': '其值应为发送请求时的**unix时间戳（毫秒）**',
    'The time of the data is calculated based on this value': '数据的时间基于此值计算',
    'Add `signature`': '添加`signature`',
    'its value is obtained by the signature algorithm rule': '其值通过签名算法规则获得',
    'Add `recvwindow`': '添加`recvwindow`',
    'defines the valid time of the request': '定义请求的有效时间',
    'Valid time is fixed at a certain value': '有效时间固定为某个值',
    'When a request is received, the server checks if': '当收到请求时，服务器检查',
    'Any request older than **5000 ms** is invalid': '任何超过**5000毫秒**的请求都无效',
    'If the client\'s timestamp is more than **1 second ahead of server time**, the request is invalid': '如果客户端的时间戳比服务器时间提前超过**1秒**，请求无效',
    'Note': '注意',
    'Online conditions are not always 100% reliable': '在线条件并不总是100%可靠',
    'That\'s why we provide the `recvWindow` parameter': '这就是我们提供`recvWindow`参数的原因',
    'For high-frequency trading, adjust `recvWindow` to meet timeliness needs': '对于高频交易，调整`recvWindow`以满足时效性需求',
    'RecvWindow longer than **5 seconds** is **not recommended**': '不建议使用超过**5秒**的RecvWindow',
    'Add `algorithms`': '添加`algorithms`',
    'signature method': '签名方法',
    'Recommended': '推荐',
    'Supported algorithms': '支持的算法',
    'Reserved, signed version number': '保留，签名版本号',
    'Default': '默认',
    'millisecond': '毫秒',

    # 签名生成相关翻译
    'Take `https://sapi.xt.com/v4/order` as an example.': '以`https://sapi.xt.com/v4/order`为例。',
    'The following **appKey/secret** are **for demo only**': '以下**appKey/secret**仅用于演示',
    'Required Headers': '必需请求头',
    'Sample Request Body': '示例请求体',
    'Data Part Concatenation': '数据部分拼接',
    'Header Part Concatenation': '请求头部分拼接',
    'Generate Signature': '生成签名',
    'Complete Example': '完整示例',
    'Sample original signature message': '示例原始签名消息',
    'Sample request (cURL)': '示例请求（cURL）',
    'Matters needing attention': '注意事项',
    'method': '方法',
    'path': '路径',
    'query': '查询参数',
    'body': '请求体',
    'uppercase HTTP method': '大写的HTTP方法',
    'concrete RESTful path after filling variables': '填充变量后的具体RESTful路径',
    'sort all `key=value` by key (lexicographical)': '按key（字典序）排序所有`key=value`',
    'join with `&`': '用`&`连接',
    'use the **raw JSON string**': '使用**原始JSON字符串**',
    'no conversion/sorting': '不进行转换/排序',
    'not supported': '不支持',
    'If multiple forms exist, concatenate **in order**': '如果存在多种形式，按**顺序**拼接',
    'Finally, splice by `#` **with leading markers**': '最后，用`#`**带前导标记**拼接',
    'Notice': '注意',
    'query present, body empty': '有查询参数，请求体为空',
    'query empty, body present': '查询参数为空，有请求体',
    'both present': '两者都存在',
    'Mini Examples': '小示例',
    'Method': '方法',
    'Path': '路径',
    'Query Example': '查询参数示例',
    'Body Examples': '请求体示例',
    'Mixed (query + body/json)': '混合（查询参数 + 请求体/json）',
    'Sort the following header keys **in natural ascending alphabetical order**': '按**自然升序字母顺序**排序以下请求头键',
    'Concatenate **`original = X + Y`**': '拼接**`original = X + Y`**',
    'no delimiter beyond the `#` already in `Y`': '除了`Y`中已有的`#`外，无其他分隔符',
    'Add the generated value to the request header': '将生成的值添加到请求头',
    'Ensure **Content-Type**, **signature original message**, and **final request payload** are **consistent**': '确保**Content-Type**、**签名原始消息**和**最终请求负载****一致**',
    'should be **milliseconds** of the **send time**': '应该是**发送时间**的**毫秒数**',
    'pair with a reasonable `validate-recvwindow` to tolerate network jitter': '与合理的`validate-recvwindow`配对以容忍网络抖动',
    'When body is JSON, use the **exact raw JSON string** for signing': '当请求体是JSON时，使用**确切的原始JSON字符串**进行签名',
    'don\'t reorder keys or prettify': '不要重新排序键或美化',

    # Deposit&Withdrawal相关翻译
    'The `currency` and `chain` fields in the response are required inputs for other **deposit/withdrawal APIs**.': '响应中的`currency`和`chain`字段是其他**充值/提现API**的必需输入。',
    'Each currency includes its supported transfer networks, deposit/withdrawal status, and fee details.': '每种货币都包含其支持的转账网络、充值/提现状态和费用详情。',
    'Currency': '货币',
    'Supported Transfer Network': '支持的转账网络',
    'Deposit supported': '支持充值',
    'Withdrawal supported': '支持提现',
    'Future Address (if applicable)': '未来地址（如适用）',
    'Minimum deposit amount': '最小充值金额',
    'Deposit fee rate (percentage)': '充值费率（百分比）',
    'Deposit confirmation block count': '充值确认区块数',
    'Minimum withdrawal amount': '最小提现金额',
    'Withdrawal amount precision': '提现金额精度',
    'Withdrawal fee': '提现手续费',
    'Withdrawal fee currency': '提现手续费币种',

    # 更多参数和描述翻译
    'Network for deposit': '充值网络',
    'Currency name': '货币名称',
    '货币 name': '货币名称',
    'This endpoint retrieves the deposit address for a specified currency on a given chain.': '此接口获取指定货币在给定链上的充值地址。',
    'Some currencies may require a **memo/tag** in addition to the address.': '某些货币可能需要在地址之外提供**备注/标签**。',
    'Always confirm the network matches the currency to avoid loss of funds.': '始终确认网络与货币匹配，以避免资金损失。',
    'Wallet address': '钱包地址',
    'Memo/Tag if required, otherwise empty': '如需要备注/标签，否则为空',

    # 其他常见翻译
    'Due to reasons such as high latency and poor stability, it is not recommended to access the API through a proxy.': '由于延迟高、稳定性差等原因，不建议通过代理访问API。',
    'GET request parameters are placed in **query Params**, POST request parameters are placed in **request body**.': 'GET请求参数放在**query Params**中，POST请求参数放在**request body**中。',
    'Please set the request header information to:': '请设置请求头信息为：',
    'For requests that start other than `/public`, the request message needs to be **signed**.': '对于不以`/public`开头的请求，请求消息需要进行**签名**。',

    # 代码注释翻译
    '// currency id': '// 货币ID',
    '// currency name': '// 货币名称',
    '// currency full name': '// 货币全名',
    '// currency logo': '// 货币图标',
    '// cmc link': '// CMC链接',
    '// Recharge status (0=close, 1=open)': '// 充值状态 (0=关闭, 1=开启)',
    '// Withdrawal status (0=close, 1=open)': '// 提现状态 (0=关闭, 1=开启)',
    '// Small asset exchange switch [0=close, 1=open]': '// 小额资产兑换开关 [0=关闭, 1=开启]',
    '// Swipe switch [0=close, 1=open]': '// 划转开关 [0=关闭, 1=开启]',
}

def translate_title_and_sidebar(content):
    """翻译标题和侧边栏标签"""
    # 翻译title字段
    title_patterns = [
        (r'title: Get currency information', 'title: 获取货币信息'),
        (r'title: Get a list of currency assets', 'title: 获取货币资产列表'),
        (r'title: Get account balance', 'title: 获取账户余额'),
        (r'title: Frequency limiting rules', 'title: 频率限制规则'),
        (r'title: Basic Information of the Interface', 'title: 接口基本信息'),
        (r'title: Frequency Limiting Rules', 'title: 频率限制规则'),
        (r'title: Signature Instructions', 'title: 签名说明'),
        (r'title: Signature generation', 'title: 签名生成'),
        (r'title: API Key Application Steps', 'title: API密钥申请步骤'),
        (r'title: API Code Library', 'title: API代码库'),
        (r'title: REST API', 'title: REST API'),
        (r'title: Response Format', 'title: 响应格式'),
        (r'title: Response Code', 'title: 响应代码'),
        (r'title: Public module', 'title: 公共模块'),
        (r'title: FAQ', 'title: 常见问题'),
        (r'title: Contact us', 'title: 联系我们'),
        # Deposit&Withdrawal相关
        (r'title: Get the deposit address', 'title: 获取充值地址'),
        (r'title: Get deposit address', 'title: 获取充值地址'),
        (r'title: Get deposit history', 'title: 获取充值历史'),
        (r'title: Withdraw', 'title: 提现'),
        (r'title: Get withdrawal history', 'title: 获取提现历史'),
        (r'title: Get withdrawal detail', 'title: 获取提现详情'),
        (r'title: Get information of currencies \(available for deposit and withdraw\)', 'title: 获取支持的货币信息（可用于充值和提现）'),
    ]

    # 翻译sidebar_label字段
    sidebar_patterns = [
        (r'sidebar_label: Get currency information', 'sidebar_label: 获取货币信息'),
        (r'sidebar_label: Get a list of currency assets', 'sidebar_label: 获取货币资产列表'),
        (r'sidebar_label: Get account balance', 'sidebar_label: 获取账户余额'),
        (r'sidebar_label: Frequency limiting rules', 'sidebar_label: 频率限制规则'),
        (r'sidebar_label: Basic Information of the Interface', 'sidebar_label: 接口基本信息'),
        (r'sidebar_label: Frequency Limiting Rules', 'sidebar_label: 频率限制规则'),
        (r'sidebar_label: Signature Instructions', 'sidebar_label: 签名说明'),
        (r'sidebar_label: Signature generation', 'sidebar_label: 签名生成'),
        (r'sidebar_label: API Key Application Steps', 'sidebar_label: API密钥申请步骤'),
        (r'sidebar_label: API Code Library', 'sidebar_label: API代码库'),
        (r'sidebar_label: REST API', 'sidebar_label: REST API'),
        (r'sidebar_label: Response Format', 'sidebar_label: 响应格式'),
        (r'sidebar_label: Response Code', 'sidebar_label: 响应代码'),
        (r'sidebar_label: Public module', 'sidebar_label: 公共模块'),
        (r'sidebar_label: FAQ', 'sidebar_label: 常见问题'),
        (r'sidebar_label: Contact us', 'sidebar_label: 联系我们'),
        # Deposit&Withdrawal相关
        (r'sidebar_label: Get the deposit address', 'sidebar_label: 获取充值地址'),
        (r'sidebar_label: Get deposit address', 'sidebar_label: 获取充值地址'),
        (r'sidebar_label: Get deposit history', 'sidebar_label: 获取充值历史'),
        (r'sidebar_label: Withdraw', 'sidebar_label: 提现'),
        (r'sidebar_label: Get withdrawal history', 'sidebar_label: 获取提现历史'),
        (r'sidebar_label: Get withdrawal detail', 'sidebar_label: 获取提现详情'),
        (r'sidebar_label: Get supported currencies', 'sidebar_label: 获取支持的货币'),
    ]

    # 应用标题翻译
    for pattern, replacement in title_patterns:
        content = re.sub(pattern, replacement, content)

    # 应用侧边栏翻译
    for pattern, replacement in sidebar_patterns:
        content = re.sub(pattern, replacement, content)

    return content

def translate_table_headers(content):
    """翻译表格标题"""
    # 翻译参数表格标题
    content = re.sub(r'\| name \| type \| mandatory \| default \| description \| ranges \|',
                     '| 名称 | 类型 | 必填 | 默认值 | 描述 | 范围 |', content)
    content = re.sub(r'\| name \| type \| mandatory \| default \| description\s+\| ranges \|',
                     '| 名称 | 类型 | 必填 | 默认值 | 描述 | 范围 |', content)

    # 翻译表格分隔符
    content = re.sub(r'\| ---- \| ---- \| --------- \| ------- \| ---------------------- \| ------ \|',
                     '| ---- | ---- | --------- | ------- | ---------------------- | ------ |', content)
    content = re.sub(r'\| --- \| --- \| --- \| --- \| --- \| --- \|',
                     '| --- | --- | --- | --- | --- | --- |', content)

    return content

def translate_common_phrases(content):
    """翻译常见短语"""
    # 翻译基础内容
    content = re.sub(r'\*\*Type:\*\*', '**类型:**', content)
    content = re.sub(r'\*\*Description:\*\*', '**描述:**', content)
    content = re.sub(r'### Parameters', '### 参数', content)
    content = re.sub(r'### Notes', '### 注意事项', content)
    content = re.sub(r'### Response Example', '### 响应示例', content)
    content = re.sub(r'### 注意s', '### 注意事项', content)

    # 翻译参数描述
    content = re.sub(r'No parameters required', '无需参数', content)
    content = re.sub(r'List of currencies, comma separated \(e\.g\. usdt,btc\)',
                     '货币列表，逗号分隔 (例如: usdt,btc)', content)
    content = re.sub(r'Limit flow rules:', '限流规则:', content)

    # 翻译接口描述
    content = re.sub(r'This endpoint retrieves information of all supported currencies\.',
                     '此接口获取所有支持的货币信息。', content)
    content = re.sub(r'This endpoint retrieves the user\'s account balance information\.',
                     '此接口获取用户的账户余额信息。', content)
    content = re.sub(r'This endpoint retrieves a list of currency assets\.',
                     '此接口获取货币资产列表。', content)

    return content

def translate_code_comments(content):
    """翻译代码注释"""
    comment_translations = {
        '// currency id': '// 货币ID',
        '// currency name': '// 货币名称',
        '// currency full name': '// 货币全名',
        '// currency logo': '// 货币图标',
        '// cmc link': '// CMC链接',
        '// Recharge status (0=close, 1=open)': '// 充值状态 (0=关闭, 1=开启)',
        '// Withdrawal status (0=close, 1=open)': '// 提现状态 (0=关闭, 1=开启)',
        '// Small asset exchange switch [0=close, 1=open]': '// 小额资产兑换开关 [0=关闭, 1=开启]',
        '// Swipe switch [0=close, 1=open]': '// 划转开关 [0=关闭, 1=开启)',
    }

    for en, zh in comment_translations.items():
        content = content.replace(en, zh)

    return content

def protect_json_fields(content):
    """保护JSON字段名不被翻译"""
    # 保护常见的JSON字段名
    json_fields = [
        'fullName', 'currencyId', 'frozenAmount', 'availableAmount',
        'totalAmount', 'convertBtcAmount', 'totalBtcAmount', 'assets',
        'depositStatus', 'withdrawStatus', 'convertEnabled', 'transferEnabled',
        'maxPrecision', 'weight', 'cmcLink', 'logo', 'currency', 'id',
        'supportChains', 'depositEnabled', 'withdrawEnabled', 'contract',
        'depositMinAmount', 'depositFeeRate', 'depositConfirmations',
        'withdrawMinAmount', 'withdrawPrecision', 'withdrawFeeAmount',
        'withdrawFeeCurrency', 'chain', 'baseCurrency', 'quoteCurrency', 'feeCurrency'
    ]

    # 如果字段名被翻译了，恢复它们
    for field in json_fields:
        # 查找被翻译的字段名并恢复
        content = re.sub(rf'"{field}":', f'"{field}":', content)
        content = re.sub(rf'"{field}":', f'"{field}":', content)

    return content

def translate_content(content):
    """完整翻译内容"""
    # 1. 翻译标题和侧边栏
    content = translate_title_and_sidebar(content)

    # 2. 翻译表格标题
    content = translate_table_headers(content)

    # 3. 翻译常见短语
    content = translate_common_phrases(content)

    # 4. 翻译代码注释
    content = translate_code_comments(content)

    # 5. 应用通用翻译映射
    for en, zh in translations.items():
        content = content.replace(en, zh)

    # 6. 保护JSON字段名不被翻译
    content = protect_json_fields(content)

    return content

def translate_mdx_file(file_path):
    """翻译单个MDX文件"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()

        # 翻译内容
        translated_content = translate_content(content)

        # 写回文件
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(translated_content)

        print(f"✅ 已翻译: {file_path}")
        return True
    except Exception as e:
        print(f"❌ 翻译失败: {file_path} - {e}")
        return False

def main():
    """主函数"""
    if len(sys.argv) != 2:
        print("使用方法: python3 translate_enhanced.py <目标路径>")
        print("例如: python3 translate_enhanced.py spot/Access Description")
        print("例如: python3 translate_enhanced.py spot")
        print("例如: python3 translate_enhanced.py futures")
        return

    target_path = sys.argv[1]

    # 中文文档目录路径
    zh_docs_dir = Path("/Users/king/Downloads/xt-api-main 2/website/i18n/zh-Hans/docusaurus-plugin-content-docs/current")
    target_dir = zh_docs_dir / target_path

    if not target_dir.exists():
        print(f"❌ 目录不存在: {target_dir}")
        return

    # 统计信息
    total_files = 0
    success_files = 0

    # 遍历指定路径下的所有MDX文件
    for mdx_file in target_dir.rglob("*.mdx"):
        total_files += 1
        if translate_mdx_file(mdx_file):
            success_files += 1

    print(f"\n📊 翻译完成统计:")
    print(f"   目标路径: {target_path}")
    print(f"   总文件数: {total_files}")
    print(f"   成功翻译: {success_files}")
    print(f"   失败文件: {total_files - success_files}")

    if success_files > 0:
        print(f"\n🎉 翻译完成！请运行 'yarn build' 重新构建网站。")

if __name__ == "__main__":
    main()
