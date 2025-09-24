<div align="center">
  <h1 align="center">
    XT API Documentation / XT API 文档
    <br />
    <br />
    <a href="https://xt.com">
      <img src="https://xt.com/static/media/logo.8a8b8b8b.png" alt="XT Exchange" width="200">
    </a>
  </h1>
</div>

<p align="center">
  <a href="https://xt.com"><img src="https://img.shields.io/badge/XT-Exchange-blue" alt="XT Exchange" /></a>
  <a href="https://github.com/XtApis/api"><img src="https://img.shields.io/github/stars/XtApis/api?style=social" alt="GitHub Stars" /></a>
  <a href="https://t.me/XT_api"><img src="https://img.shields.io/badge/Telegram-Support-blue" alt="Telegram Support" /></a>
  <a href="https://pypi.org/project/pyxt/"><img src="https://img.shields.io/pypi/v/pyxt" alt="Python SDK" /></a>
  <a href="https://www.npmjs.com/package/xt-open-api"><img src="https://img.shields.io/npm/v/xt-open-api" alt="JavaScript SDK" /></a>
</p>

## 🇺🇸 English | 🇨🇳 中文

---

## 🇺🇸 English

### Introduction

Welcome to XT API documentation! XT provides REST and WebSocket APIs to suit your trading needs.

### Quick Start

#### Environment Information

- **Spot Trading API**: [https://sapi.xt.com](https://sapi.xt.com)
- **Futures Trading API (USDT-M)**: [https://fapi.xt.com](https://fapi.xt.com)
- **Futures Trading API (Coin-M)**: [https://dapi.xt.com](https://dapi.xt.com)

#### Tutorials

- **Python Spot Trading Tutorial**: [Python Spot Trading Tutorial](https://github.com/kelvinxue/pyxt/blob/main/examples/spot_guide.ipynb)
- **Python Derivatives Trading Tutorial**: [Python Derivatives Trading Tutorial](https://github.com/kelvinxue/pyxt/blob/main/examples/future_guide.ipynb)

### API Categories

#### Core Trading APIs

- **Spot Trading** - Spot market trading, order management, account queries
- **Futures Trading** - Futures contract trading, leverage trading, risk control
- **Margin Spot** - Spot leverage trading, lending management
- **Copy Trading** - Copy trading, strategy following

#### User Center APIs

- **Account Management** - User information, account queries
- **API Keys** - Key creation, permission management
- **Referral System** - Referral commissions, commission queries

#### Third-Party Trading APIs

- **OAuth Interface** - Third-party authorization login
- **User Registration** - Third-party user registration
- **Order Management** - Third-party order operations

### SDK Support

#### Python SDK

Use Python SDK for easier integration:

```bash
pip install pyxt
```

- **GitHub**: [pyxt](https://github.com/kelvinxue/pyxt)
- **PyPI**: [pyxt](https://pypi.org/project/pyxt/)

#### Java SDK

Lightweight Java code library:

- **GitHub**: [xt4-java-demo](https://github.com/xt-com/xt4-java-demo)

#### JavaScript SDK

JavaScript SDK provides access to various endpoints for interacting with the XT platform:

```bash
npm install xt-open-api
```

- **NPM**: [xt-open-api](https://www.npmjs.com/package/xt-open-api)

### Main Features

- **REST API** - Complete RESTful API interfaces
- **WebSocket API** - Real-time data push and trading
- **Multi-language Support** - Python, Java, JavaScript SDKs
- **Complete Documentation** - Detailed API documentation and examples
- **Test Environment** - Testnet environment for development and testing

### Documentation Structure

```
docs/
├── spot/                    # Spot Trading API
├── futures/                 # Futures Trading API
├── margin-spot/            # Margin Spot API
├── copy-trading/           # Copy Trading API
├── futures-copy/           # Futures Copy API
├── user-center/            # User Center API
├── trading-third-party/    # Third-Party Trading API
└── index_overview/         # Overview and Quick Start
```

### Getting Started

1. **Get API Keys** - Apply for API keys on the XT platform
2. **Choose SDK** - Select the appropriate SDK for your development language
3. **Read Documentation** - Check the detailed documentation for the corresponding API
4. **Run Examples** - Start development using the provided example code

### Support & Contact

- **Telegram Group**: [XT API Support Group](https://t.me/XT_api)
- **Online Support**: Please consult online customer service for any questions
- **GitHub Issues**: [Submit Issues](https://github.com/XtApis/api/issues)

### License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

### Contributing

Contributions to code and documentation are welcome! Please check the [Contributing Guide](./CONTRIBUTING.md) to learn how to participate in the project.

---

## 🇨🇳 中文

### 简介

欢迎使用 XT API 文档！XT 提供 REST 和 WebSocket API 来满足您的交易需求。

### 快速开始

#### 环境信息

- **现货交易 API**: [https://sapi.xt.com](https://sapi.xt.com)
- **合约交易 API (USDT-M)**: [https://fapi.xt.com](https://fapi.xt.com)
- **合约交易 API (Coin-M)**: [https://dapi.xt.com](https://dapi.xt.com)

#### 教程

- **Python 现货交易教程**: [Python Spot Trading Tutorial](https://github.com/kelvinxue/pyxt/blob/main/examples/spot_guide.ipynb)
- **Python 衍生品交易教程**: [Python Derivatives Trading Tutorial](https://github.com/kelvinxue/pyxt/blob/main/examples/future_guide.ipynb)

### API 分类

#### 核心交易 API

- **现货交易** - 现货市场交易、订单管理、账户查询
- **合约交易** - 期货合约交易、杠杆交易、风险控制
- **保证金现货** - 现货杠杆交易、借贷管理
- **跟单交易** - 复制交易、策略跟随

#### 用户中心 API

- **账户管理** - 用户信息、账户查询
- **API 密钥** - 密钥创建、权限管理
- **返佣系统** - 推荐返佣、佣金查询

#### 第三方交易 API

- **OAuth 接口** - 第三方授权登录
- **用户注册** - 第三方用户注册
- **订单管理** - 第三方订单操作

### SDK 支持

#### Python SDK

使用 Python SDK 进行更简单的集成：

```bash
pip install pyxt
```

- **GitHub**: [pyxt](https://github.com/kelvinxue/pyxt)
- **PyPI**: [pyxt](https://pypi.org/project/pyxt/)

#### Java SDK

轻量级 Java 代码库：

- **GitHub**: [xt4-java-demo](https://github.com/xt-com/xt4-java-demo)

#### JavaScript SDK

JavaScript SDK 提供访问 XT 平台各种端点的功能：

```bash
npm install xt-open-api
```

- **NPM**: [xt-open-api](https://www.npmjs.com/package/xt-open-api)

### 主要功能

- **REST API** - 完整的 RESTful API 接口
- **WebSocket API** - 实时数据推送和交易
- **多语言支持** - Python、Java、JavaScript SDK
- **完整文档** - 详细的 API 文档和示例
- **测试环境** - 提供测试网环境进行开发测试

### 文档结构

```
docs/
├── spot/                    # 现货交易 API
├── futures/                 # 合约交易 API
├── margin-spot/            # 保证金现货 API
├── copy-trading/           # 跟单交易 API
├── futures-copy/           # 合约跟单 API
├── user-center/            # 用户中心 API
├── trading-third-party/    # 第三方交易 API
└── index_overview/         # 概览和快速开始
```

### 开始使用

1. **获取 API 密钥** - 在 XT 平台申请 API 密钥
2. **选择 SDK** - 根据您的开发语言选择合适的 SDK
3. **阅读文档** - 查看对应 API 的详细文档
4. **运行示例** - 使用提供的示例代码开始开发

### 支持与联系

- **Telegram 群组**: [XT API Support Group](https://t.me/XT_api)
- **在线客服**: 如有任何问题，请咨询在线客服
- **GitHub Issues**: [提交问题](https://github.com/XtApis/api/issues)

### 许可证

本项目采用 MIT 许可证。详情请参阅 [LICENSE](./LICENSE) 文件。

### 贡献

欢迎贡献代码和文档！请查看 [贡献指南](./CONTRIBUTING.md) 了解如何参与项目。

---

<div align="center">
  <p>Powered by <a href="https://xt.com">XT Exchange</a> | 由 <a href="https://xt.com">XT Exchange</a> 提供支持</p>
</div>
