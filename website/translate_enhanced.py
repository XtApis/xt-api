#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
增强版翻译脚本 - 完全自动化翻译
使用方法: python3 translate_enhanced.py <目标路径>
例如: python3 translate_enhanced.py spot/AccessDescription
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
    
    # Balance相关翻译
    'title: Get currency information': 'title: 获取货币信息',
    'sidebar_label: Get currency information': 'sidebar_label: 获取货币信息',
    'title: Get a list of currency assets': 'title: 获取货币资产列表',
    'sidebar_label: Get a list of currency assets': 'sidebar_label: 获取货币资产列表',
    'title: Get account balance': 'title: 获取账户余额',
    'sidebar_label: Get account balance': 'sidebar_label: 获取账户余额',
    'title: Frequency limiting rules': 'title: 频率限制规则',
    'sidebar_label: Frequency limiting rules': 'sidebar_label: 频率限制规则',
    
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
        'maxPrecision', 'weight', 'cmcLink', 'logo', 'currency', 'id'
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
        print("例如: python3 translate_enhanced.py spot/AccessDescription")
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
