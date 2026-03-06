#!/usr/bin/env python3
"""
Documentation Sync Checker

This script checks:
1. Whether English and Chinese documentation files are in sync (1:1 matching)
2. Whether all products listed in "All Products" have corresponding documentation directories
3. Whether navbar translations are properly configured in i18n files
4. Whether sidebar category translations exist for all products

Usage:
    python3 scripts/check_docs_sync.py

To add a new product, simply add a new entry to PRODUCTS_CONFIG below.
"""

import os
import json
from pathlib import Path
from typing import Set, Dict, List, Tuple, Optional
from dataclasses import dataclass
from enum import Enum

# =============================================================================
# CONFIGURATION - Add new products here
# =============================================================================

PRODUCTS_CONFIG = [
    # Each product is a dict with:
    #   - name_en: English name (used in navbar)
    #   - name_zh: Chinese name (used in navbar)
    #   - desc_en: English description (used in navbar)
    #   - desc_zh: Chinese description (used in navbar)
    #   - doc_dir: Directory name in docs/ and i18n/.../current/
    #   - sidebar_id: Sidebar ID (usually same as doc_dir)
    #   - categories: List of (english_name, chinese_name) tuples for sidebar categories
    #   - navbar_subcategories: List of (english_name, chinese_name) tuples for navbar dropdown subcategories
    #                           These appear in product-dropdown.js and need translations in product-dropdown-i18n.js

    {
        "name_en": "Index",
        "name_zh": "行情指数",
        "desc_en": "Index APIs",
        "desc_zh": "行情指数 API",
        "doc_dir": "index_overview",
        "sidebar_id": "index_overview",
        "categories": [],  # No subcategories
        "navbar_subcategories": [],  # No navbar subcategories
    },
    {
        "name_en": "Spot Trading",
        "name_zh": "现货交易",
        "desc_en": "Spot Trading APIs",
        "desc_zh": "现货交易 API",
        "doc_dir": "spot",
        "sidebar_id": "spot",
        "categories": [
            ("Access Description", "访问说明"),
            ("Balance", "账户余额"),
            ("Deposit&Withdrawal", "充币与提币"),
            ("Market", "行情"),
            ("Order", "订单"),
            ("Trade", "交易"),
            ("Transfer", "资金划转"),
            ("WebSocket Private", "WebSocket 私有接口"),
            ("WebSocket Public", "WebSocket 公共接口"),
        ],
        "navbar_subcategories": [],  # Uses same categories as sidebar
    },
    {
        "name_en": "Futures Trading",
        "name_zh": "合约交易",
        "desc_en": "Futures Trading APIs",
        "desc_zh": "合约交易 API",
        "doc_dir": "futures",
        "sidebar_id": "futures",
        "categories": [
            ("Access Description", "访问说明"),
            ("Entrust", "委托"),
            ("MarketData", "行情数据"),
            ("Order", "订单"),
            ("PythonPackage", "Python 开发包"),
            ("Quote collection", "行情收集"),
            ("User", "用户"),
            ("UserWebsocket", "用户 WebSocket"),
            ("WebsocKetV2", "WebSocket V2 接口"),  # Note: directory has typo WebsocKetV2
        ]
    },
    {
        "name_en": "Margin Trading",
        "name_zh": "杠杆交易",
        "desc_en": "Margin Trading APIs",
        "desc_zh": "杠杆交易 API",
        "doc_dir": "margin-spot",
        "sidebar_id": "margin-spot",
        "categories": [
            ("Access Description", "访问说明"),
            ("Balance", "账户余额"),
            ("Market", "行情"),
        ]
    },
    {
        "name_en": "Copy Trading",
        "name_zh": "跟单交易",
        "desc_en": "Copy Trading API",
        "desc_zh": "跟单交易 API",
        "doc_dir": "copy-trading",
        "sidebar_id": "copy-trading",
        "categories": [
            ("Access Description", "访问说明"),
            ("Copy tradeing", "跟单交易"),
        ]
    },
    {
        "name_en": "Futures Copy",
        "name_zh": "合约跟单",
        "desc_en": "Futures Copy API",
        "desc_zh": "合约跟单 API",
        "doc_dir": "futures-copy",
        "sidebar_id": "futures-copy",
        "categories": [
            ("Access Description", "访问说明"),
            ("Copy Trading", "合约跟单"),
        ]
    },
    {
        "name_en": "Trading Third Party",
        "name_zh": "第三方交易",
        "desc_en": "Trading Third Party API",
        "desc_zh": "第三方交易 API",
        "doc_dir": "trading-third-party",
        "sidebar_id": "trading-third-party",
        "categories": [
            ("Access Description", "访问说明"),
            ("Balance", "账户余额"),
            ("OAuth Interface", "OAuth 接口"),
            ("Order", "订单"),
            ("Trade", "交易"),
            ("User Registration", "用户注册"),
        ]
    },
    {
        "name_en": "User Center",
        "name_zh": "用户中心",
        "desc_en": "User Center API",
        "desc_zh": "用户中心 API",
        "doc_dir": "user-center",
        "sidebar_id": "user-center",
        "categories": [
            ("Access Description", "访问说明"),
            ("Account", "账户"),
            ("ApiKey", "API 密钥"),
            ("WebSocket Notice", "WebSocket Notice"),
        ]
    },
    {
        "name_en": "Referral Program",
        "name_zh": "返佣计划",
        "desc_en": "Referral Program API",
        "desc_zh": "返佣计划 API",
        "doc_dir": "Referral Commission",
        "sidebar_id": "Referral Commission",
        "categories": [
            ("Access Description", "访问说明"),
            ("Referral Commission", "返佣管理"),
        ]
    },
    {
        "name_en": "Loan",
        "name_zh": "借贷",
        "desc_en": "Loan API",
        "desc_zh": "借贷 API",
        "doc_dir": "loan",
        "sidebar_id": "loan",
        "categories": [
            ("Access Description", "访问说明"),
            ("Adjust Collateral", "调整抵押品"),
            ("Auto Add Collateral Switch", "自动补仓开关"),
            ("Borrow Money", "借款"),
            ("Loan Product Inquiry", "借贷产品查询"),
            ("One Click Repay", "一键还款"),
            ("Renew Loan", "续贷"),
            ("Repay", "还款"),
            ("inquire", "查询"),
        ]
    },
    {
        "name_en": "Earn",
        "name_zh": "理财",
        "desc_en": "Earn API",
        "desc_zh": "理财 API",
        "doc_dir": "earn",
        "sidebar_id": "earn",
        "categories": [
            ("Access Description", "概述"),
            ("Auto Earn", "自动理财接口"),
            ("Order Management", "订单管理接口"),
            ("Query", "查询接口"),
            ("Special Products", "特殊产品接口"),
        ],
        # Navbar subcategories: these appear in the dropdown menu and need translations in product-dropdown-i18n.js
        "navbar_subcategories": [
            ("Auto Earn", "自动理财"),
            ("Auto Earn APIs", "自动理财 API"),
            ("Order Management", "订单管理"),
            ("Order Management APIs", "订单管理 API"),
            ("Query", "查询"),
            ("Query APIs", "查询 API"),
            ("Special Products", "特殊产品"),
            ("Special Products APIs", "特殊产品 API"),
        ],
    },
    {
        "name_en": "Broker",
        "name_zh": "经纪商",
        "desc_en": "Broker API",
        "desc_zh": "经纪商 API",
        "doc_dir": "broker",
        "sidebar_id": "broker",
        "categories": [
            ("Access Description", "访问说明"),
            ("API List", "接口列表"),
            ("Independent Broker", "独立经纪商"),
        ],
        "navbar_subcategories": [
            ("Access Description", "访问说明"),
            ("Access Description APIs", "访问说明 API"),
            ("API List", "接口列表"),
            ("Independent Broker", "独立经纪商"),
            ("Independent Broker APIs", "独立经纪商 API"),
        ],
    },

    {
        "name_en": "Claude Code Plugin",
        "name_zh": "Claude Code 交易插件",
        "desc_en": "Claude Code Plugin Docs",
        "desc_zh": "Claude Code 交易插件文档",
        "doc_dir": "claude-code-plugin",
        "sidebar_id": "claude-code-plugin",
        "categories": [
            ("Getting Started", "快速开始"),
            ("Trading", "交易"),
        ],
        "navbar_subcategories": [],
    },

    # =========================================================================
    # ADD NEW PRODUCTS BELOW - Example:
    # =========================================================================
    # {
    #     "name_en": "Staking",
    #     "name_zh": "质押",
    #     "desc_en": "Staking API",
    #     "desc_zh": "质押 API",
    #     "doc_dir": "staking",
    #     "sidebar_id": "staking",
    #     "categories": [
    #         ("Access Description", "访问说明"),
    #         ("Stake", "质押操作"),
    #         ("Rewards", "收益查询"),
    #     ]
    # },
]

# Directories to ignore in extra directory check
IGNORED_DIRECTORIES = {"changelog", "contract", "user"}

# =============================================================================
# AUTO-GENERATED FROM CONFIG - Do not edit manually
# =============================================================================

# Base paths
PROJECT_ROOT = Path(__file__).parent.parent
DOCS_EN_PATH = PROJECT_ROOT / "docs"
DOCS_ZH_PATH = PROJECT_ROOT / "i18n" / "zh-CN" / "docusaurus-plugin-content-docs" / "current"
I18N_CODE_JSON = PROJECT_ROOT / "i18n" / "zh-CN" / "code.json"
I18N_CURRENT_JSON = PROJECT_ROOT / "i18n" / "zh-CN" / "docusaurus-plugin-content-docs" / "current.json"
I18N_DROPDOWN_JS = PROJECT_ROOT / "static" / "js" / "product-dropdown-i18n.js"
PRODUCT_DROPDOWN_JS = PROJECT_ROOT / "static" / "js" / "product-dropdown.js"
DOCUSAURUS_CONFIG = PROJECT_ROOT / "docusaurus.config.ts"


def build_navbar_translations() -> Dict[str, str]:
    """Build navbar translations from config.
    Includes product names, descriptions, and navbar subcategories.
    These all appear in the navbar dropdown and need translations in product-dropdown-i18n.js.
    """
    translations = {
        "item.label.All Products": "所有产品",
        "item.label.Comprehensive API solutions for all your trading needs": "为您的所有交易需求提供全面的 API 解决方案",
    }
    for product in PRODUCTS_CONFIG:
        # Product name and description (these appear in navbar dropdown)
        translations[f"item.label.{product['name_en']}"] = product['name_zh']
        translations[f"item.label.{product['desc_en']}"] = product['desc_zh']

        # Navbar subcategories (these also appear in navbar dropdown)
        if 'navbar_subcategories' in product:
            for sub_en, sub_zh in product['navbar_subcategories']:
                translations[f"item.label.{sub_en}"] = sub_zh
    return translations


def build_sidebar_categories() -> Dict[str, List[Tuple[str, str]]]:
    """Build sidebar categories from config."""
    categories = {}
    for product in PRODUCTS_CONFIG:
        if product['categories']:
            categories[product['sidebar_id']] = product['categories']
    return categories


NAVBAR_TRANSLATIONS = build_navbar_translations()
EXPECTED_SIDEBAR_CATEGORIES = build_sidebar_categories()


# =============================================================================
# CHECK FUNCTIONS
# =============================================================================

class Status(Enum):
    OK = "OK"
    MISSING = "MISSING"
    EXTRA = "EXTRA"


@dataclass
class CheckResult:
    status: Status
    message: str
    details: List[str] = None

    def __post_init__(self):
        if self.details is None:
            self.details = []


def load_json_file(path: Path) -> Optional[Dict]:
    """Load a JSON file and return its contents."""
    if not path.exists():
        return None
    try:
        with open(path, 'r', encoding='utf-8') as f:
            return json.load(f)
    except json.JSONDecodeError:
        return None


def get_doc_files(base_path: Path, relative_to: Path = None) -> Set[str]:
    """Get all documentation files (.md, .mdx) under a path, returning relative paths.
    Excludes files starting with '_' (hidden/internal files).
    """
    if not base_path.exists():
        return set()

    doc_files = set()
    for ext in ["*.md", "*.mdx"]:
        for file_path in base_path.rglob(ext):
            # Skip files starting with '_' (hidden/internal files)
            if file_path.name.startswith('_'):
                continue
            if relative_to:
                rel_path = file_path.relative_to(relative_to)
            else:
                rel_path = file_path.relative_to(base_path)
            doc_files.add(str(rel_path))

    return doc_files


def check_product_directories() -> List[Tuple[str, CheckResult]]:
    """Check if all products have corresponding documentation directories."""
    results = []

    for product in PRODUCTS_CONFIG:
        name = product['name_en']
        desc = product['desc_en']
        en_dir = product['doc_dir']
        zh_dir = product['doc_dir']

        en_path = DOCS_EN_PATH / en_dir
        zh_path = DOCS_ZH_PATH / zh_dir

        en_exists = en_path.exists() and en_path.is_dir()
        zh_exists = zh_path.exists() and zh_path.is_dir()

        if en_exists and zh_exists:
            en_files = list(en_path.rglob("*.md")) + list(en_path.rglob("*.mdx"))
            zh_files = list(zh_path.rglob("*.md")) + list(zh_path.rglob("*.mdx"))

            if en_files and zh_files:
                result = CheckResult(
                    Status.OK,
                    f"Both EN and ZH directories exist with content",
                    [f"EN: {len(en_files)} files", f"ZH: {len(zh_files)} files"]
                )
            elif en_files:
                result = CheckResult(
                    Status.MISSING,
                    f"ZH directory exists but is empty",
                    [f"EN: {len(en_files)} files", "ZH: 0 files"]
                )
            elif zh_files:
                result = CheckResult(
                    Status.MISSING,
                    f"EN directory exists but is empty",
                    ["EN: 0 files", f"ZH: {len(zh_files)} files"]
                )
            else:
                result = CheckResult(
                    Status.MISSING,
                    f"Both directories exist but are empty"
                )
        elif en_exists:
            result = CheckResult(
                Status.MISSING,
                f"ZH directory missing",
                [f"EN: {en_path}", f"ZH expected: {zh_path}"]
            )
        elif zh_exists:
            result = CheckResult(
                Status.MISSING,
                f"EN directory missing",
                [f"EN expected: {en_path}", f"ZH: {zh_path}"]
            )
        else:
            result = CheckResult(
                Status.MISSING,
                f"Both EN and ZH directories missing",
                [f"EN expected: {en_path}", f"ZH expected: {zh_path}"]
            )

        results.append((f"{name} ({desc})", result))

    return results


def check_file_sync_for_product(doc_dir: str) -> Tuple[Set[str], Set[str], Set[str]]:
    """Check file synchronization for a specific product."""
    en_path = DOCS_EN_PATH / doc_dir
    zh_path = DOCS_ZH_PATH / doc_dir

    en_files = get_doc_files(en_path)
    zh_files = get_doc_files(zh_path)

    common = en_files & zh_files
    en_only = en_files - zh_files
    zh_only = zh_files - en_files

    return common, en_only, zh_only


def check_all_docs_sync() -> Dict[str, Tuple[Set[str], Set[str], Set[str]]]:
    """Check synchronization for all product documentation."""
    results = {}

    for product in PRODUCTS_CONFIG:
        name = product['name_en']
        doc_dir = product['doc_dir']
        common, en_only, zh_only = check_file_sync_for_product(doc_dir)
        results[name] = (common, en_only, zh_only)

    return results


def check_extra_directories() -> Tuple[Set[str], Set[str]]:
    """Check for directories that exist but are not in the products list.
    Excludes directories in IGNORED_DIRECTORIES.
    """
    product_dirs = {p['doc_dir'] for p in PRODUCTS_CONFIG}

    en_dirs = set()
    if DOCS_EN_PATH.exists():
        en_dirs = {d.name for d in DOCS_EN_PATH.iterdir()
                   if d.is_dir() and not d.name.startswith('.')}

    zh_dirs = set()
    if DOCS_ZH_PATH.exists():
        zh_dirs = {d.name for d in DOCS_ZH_PATH.iterdir()
                   if d.is_dir() and not d.name.startswith('.')}

    extra_en = en_dirs - product_dirs - IGNORED_DIRECTORIES
    extra_zh = zh_dirs - product_dirs - IGNORED_DIRECTORIES

    return extra_en, extra_zh


def parse_dropdown_i18n_js() -> Dict[str, Dict[str, str]]:
    """Parse the product-dropdown-i18n.js file to extract translations."""
    if not I18N_DROPDOWN_JS.exists():
        return {}

    import re
    content = I18N_DROPDOWN_JS.read_text(encoding='utf-8')

    translations = {'en': {}, 'zh-CN': {}}

    # Find zh-CN section
    zh_match = re.search(r"'zh-CN':\s*\{([^}]+(?:\{[^}]*\}[^}]*)*)\}", content, re.DOTALL)
    if zh_match:
        zh_content = zh_match.group(1)
        # Extract key-value pairs
        pairs = re.findall(r"'([^']+)':\s*'([^']*)'", zh_content)
        for key, value in pairs:
            translations['zh-CN'][key] = value

    return translations


def check_navbar_translations() -> Tuple[List[str], List[str], Dict[str, str]]:
    """Check if navbar items have proper Chinese translations in product-dropdown-i18n.js."""
    js_translations = parse_dropdown_i18n_js()
    zh_translations = js_translations.get('zh-CN', {})

    if not zh_translations:
        return list(NAVBAR_TRANSLATIONS.keys()), [], {}

    missing_keys = []
    untranslated_keys = []
    current_translations = {}

    for key, expected_zh in NAVBAR_TRANSLATIONS.items():
        full_key = f"item.label.{key}" if not key.startswith("item.label.") else key
        if full_key not in zh_translations:
            missing_keys.append(key)
        else:
            current_value = zh_translations[full_key]
            current_translations[key] = current_value
            # Check if not translated (same as English key)
            en_value = key.replace("item.label.", "") if key.startswith("item.label.") else key
            if current_value == en_value:
                untranslated_keys.append(key)

    return missing_keys, untranslated_keys, current_translations


def check_sidebar_translations() -> Dict[str, List[Tuple[str, str, str]]]:
    """Check if sidebar categories have proper Chinese translations in current.json."""
    current_json = load_json_file(I18N_CURRENT_JSON)
    if current_json is None:
        return {product: [(cat, expected, "FILE MISSING") for cat, expected in cats]
                for product, cats in EXPECTED_SIDEBAR_CATEGORIES.items()}

    results = {}

    for product, categories in EXPECTED_SIDEBAR_CATEGORIES.items():
        product_results = []
        for category_en, expected_zh in categories:
            key = f"sidebar.{product}.category.{category_en}"
            if key in current_json:
                actual_zh = current_json[key].get("message", "")
                product_results.append((category_en, expected_zh, actual_zh))
            else:
                product_results.append((category_en, expected_zh, "MISSING"))

        results[product] = product_results

    return results


def get_actual_categories_from_docs(product_dir: str, use_labels: bool = False) -> Set[str]:
    """Get actual category directories from documentation.

    Args:
        product_dir: The product directory name
        use_labels: If True, return _category_.json labels instead of folder names
    """
    en_path = DOCS_EN_PATH / product_dir
    if not en_path.exists():
        return set()

    categories = set()
    for item in en_path.iterdir():
        if item.is_dir() and not item.name.startswith('_') and not item.name.startswith('.'):
            if use_labels:
                label = get_category_label_from_docs(product_dir, item.name)
                categories.add(label)
            else:
                categories.add(item.name)

    return categories


def parse_docusaurus_config_nav_categories() -> List[str]:
    """Parse docusaurus.config.ts to extract left sidebar navigation categories."""
    import re
    if not DOCUSAURUS_CONFIG.exists():
        return []

    content = DOCUSAURUS_CONFIG.read_text(encoding='utf-8')
    categories = []

    # Match data-category="xxx" attributes
    data_category_matches = re.findall(r'data-category="([^"]+)"', content)
    for cat in data_category_matches:
        if cat not in categories:
            categories.append(cat)

    # Also match onclick="showCategory('xxx')" for AllProducts
    onclick_matches = re.findall(r"onclick=\"showCategory\('([^']+)'\)\"", content)
    for cat in onclick_matches:
        if cat not in categories:
            categories.append(cat)

    return categories


def parse_docusaurus_config_product_cards() -> List[str]:
    """Parse docusaurus.config.ts to extract product cards from productsGrid."""
    import re
    if not DOCUSAURUS_CONFIG.exists():
        return []

    content = DOCUSAURUS_CONFIG.read_text(encoding='utf-8')
    products = []

    # Find the productsGrid section
    grid_match = re.search(r'id="productsGrid"[\s\S]*?</div>\s*</div>\s*</div>\s*</div>', content)
    if not grid_match:
        return products

    grid_content = grid_match.group(0)

    # Match product titles from data-i18n attributes
    product_matches = re.findall(r'<a[^>]*href="[^"]*"[^>]*>[\s\S]*?<div[^>]*data-i18n="item\.label\.([^"]+)"[^>]*>[^<]*</div>', grid_content)

    seen = set()
    for prod in product_matches:
        if prod not in seen:
            products.append(prod)
            seen.add(prod)

    return products


def parse_dropdown_js_all_products() -> List[str]:
    """Parse product-dropdown.js to extract AllProducts product list."""
    import re
    if not PRODUCT_DROPDOWN_JS.exists():
        return []

    content = PRODUCT_DROPDOWN_JS.read_text(encoding='utf-8')
    products = []

    # Find AllProducts section in the showCategory function
    all_products_match = re.search(r'AllProducts:\s*\{[\s\S]*?products:\s*\[([\s\S]*?)\]\s*,?\s*\}', content)
    if not all_products_match:
        return products

    products_array = all_products_match.group(1)

    # Match title: 'xxx'
    title_matches = re.findall(r"title:\s*'([^']+)'", products_array)
    for title in title_matches:
        products.append(title)

    return products


def parse_dropdown_js_broker_products() -> List[str]:
    """Parse product-dropdown.js to extract broker products list."""
    import re
    if not PRODUCT_DROPDOWN_JS.exists():
        return []

    content = PRODUCT_DROPDOWN_JS.read_text(encoding='utf-8')
    products = []

    # Find broker section (look for the one with title: 'Broker' and products array)
    broker_match = re.search(r"broker:\s*\{[\s\S]*?title:\s*'Broker'[\s\S]*?products:\s*\[([\s\S]*?)\]\s*,?\s*\}", content)
    if not broker_match:
        return products

    products_array = broker_match.group(1)

    # Match title: 'xxx'
    title_matches = re.findall(r"title:\s*'([^']+)'", products_array)
    for title in title_matches:
        products.append(title)

    return products


def get_category_label_from_docs(product_dir: str, category_dir: str) -> Optional[str]:
    """Get the label from _category_.json for a specific category directory."""
    category_json_path = DOCS_EN_PATH / product_dir / category_dir / "_category_.json"
    if category_json_path.exists():
        try:
            with open(category_json_path, 'r', encoding='utf-8') as f:
                data = json.load(f)
                return data.get('label', category_dir)
        except (json.JSONDecodeError, IOError):
            pass
    return category_dir


def check_nav_consistency() -> Tuple[List[str], List[str], List[str]]:
    """
    Check consistency between three areas:
    1. Left sidebar navigation categories (docusaurus.config.ts)
    2. Product cards in productsGrid (docusaurus.config.ts)
    3. AllProducts in product-dropdown.js

    Returns: (consistent_products, missing_products, extra_products)
    """
    # Category key to display label mapping
    category_to_label = {
        'AllProducts': 'All Products',
        'Index': 'Index',
        'spot': 'Spot Trading',
        'futures': 'Futures Trading',
        'marginSpot': 'Margin Trading',
        'copyTrading': 'Copy Trading',
        'futuresCopy': 'Futures Copy',
        'tradingThirdParty': 'Trading Third Party',
        'userCenter': 'User Center',
        'referralProgram': 'Referral Program',
        'loan': 'Loan',
        'earn': 'Earn',
        'broker': 'Broker',
    }

    # Expected products (excluding AllProducts)
    expected_products = [
        'Index', 'Spot Trading', 'Futures Trading', 'Margin Trading',
        'Copy Trading', 'Futures Copy', 'Trading Third Party', 'User Center',
        'Referral Program', 'Loan', 'Earn', 'Broker'
    ]

    nav_categories = parse_docusaurus_config_nav_categories()
    product_cards = parse_docusaurus_config_product_cards()
    all_products_list = parse_dropdown_js_all_products()

    # Convert nav categories to labels (excluding AllProducts)
    nav_labels = [category_to_label.get(c, c) for c in nav_categories if c != 'AllProducts']

    consistent = []
    missing = []
    extra = []

    for product in expected_products:
        in_nav = product in nav_labels
        in_cards = product in product_cards
        in_all_products = product in all_products_list

        if in_nav and in_cards and in_all_products:
            consistent.append(product)
        else:
            missing.append((product, in_nav, in_cards, in_all_products))

    return consistent, missing, extra


def check_broker_submenu_consistency() -> Tuple[List[Tuple[str, str]], List[str], List[str]]:
    """
    Check consistency between broker submenu in:
    1. docs/broker/ directory _category_.json labels
    2. product-dropdown.js broker products
    3. current.json sidebar translations

    Returns: (consistent_items, missing_in_dropdown, missing_in_current_json)
    """
    # Get broker categories from docs
    broker_path = DOCS_EN_PATH / "broker"
    doc_categories = []

    if broker_path.exists():
        for item in sorted(broker_path.iterdir()):
            if item.is_dir() and not item.name.startswith('_') and not item.name.startswith('.'):
                label = get_category_label_from_docs("broker", item.name)
                doc_categories.append((item.name, label))

    # Get broker products from dropdown JS
    dropdown_products = parse_dropdown_js_broker_products()

    # Get current.json translations
    current_json = load_json_file(I18N_CURRENT_JSON)

    consistent = []
    missing_in_dropdown = []
    missing_in_current = []

    for folder, label in doc_categories:
        in_dropdown = label in dropdown_products

        # Check current.json
        key = f"sidebar.broker.category.{label}"
        in_current = current_json and key in current_json

        if in_dropdown and in_current:
            zh_translation = current_json[key].get('message', '') if current_json else ''
            consistent.append((label, zh_translation))
        else:
            if not in_dropdown:
                missing_in_dropdown.append(label)
            if not in_current:
                missing_in_current.append(label)

    return consistent, missing_in_dropdown, missing_in_current


# =============================================================================
# OUTPUT FUNCTIONS
# =============================================================================

def print_separator(char="=", length=80):
    print(char * length)


def print_header(title: str):
    print()
    print_separator()
    print(f" {title}")
    print_separator()


def main():
    print("\n" + "=" * 80)
    print(" DOCUMENTATION SYNC CHECKER")
    print("=" * 80)
    print(f"\nEnglish docs path: {DOCS_EN_PATH}")
    print(f"Chinese docs path: {DOCS_ZH_PATH}")
    print(f"Products configured: {len(PRODUCTS_CONFIG)}")

    total_issues = 0

    # Check 1: Product directories
    print_header("1. PRODUCT DIRECTORY CHECK")
    print("\nChecking if all products have documentation directories...\n")

    product_results = check_product_directories()
    ok_count = 0
    issue_count = 0

    for product_name, result in product_results:
        status_icon = "✓" if result.status == Status.OK else "✗"
        status_color = "\033[92m" if result.status == Status.OK else "\033[91m"
        reset_color = "\033[0m"

        print(f"  {status_color}{status_icon}{reset_color} {product_name}")
        print(f"      Status: {result.message}")
        if result.details:
            for detail in result.details:
                print(f"      - {detail}")
        print()

        if result.status == Status.OK:
            ok_count += 1
        else:
            issue_count += 1

    print(f"\n  Summary: {ok_count} OK, {issue_count} issues")
    total_issues += issue_count

    # Check 2: File synchronization
    print_header("2. FILE SYNCHRONIZATION CHECK")
    print("\nChecking if EN and ZH documentation files match...\n")

    sync_results = check_all_docs_sync()
    total_common = 0
    total_en_only = 0
    total_zh_only = 0

    for product_name, (common, en_only, zh_only) in sync_results.items():
        total_common += len(common)
        total_en_only += len(en_only)
        total_zh_only += len(zh_only)

        if not en_only and not zh_only:
            status = "\033[92m✓ SYNCED\033[0m"
        else:
            status = "\033[91m✗ OUT OF SYNC\033[0m"

        print(f"  {product_name}: {status}")
        print(f"      Common files: {len(common)}")

        if en_only:
            print(f"      \033[93mEN only ({len(en_only)}):\033[0m")
            for f in sorted(en_only)[:5]:
                print(f"        - {f}")
            if len(en_only) > 5:
                print(f"        ... and {len(en_only) - 5} more")

        if zh_only:
            print(f"      \033[93mZH only ({len(zh_only)}):\033[0m")
            for f in sorted(zh_only)[:5]:
                print(f"        - {f}")
            if len(zh_only) > 5:
                print(f"        ... and {len(zh_only) - 5} more")

        print()

    print(f"\n  Summary:")
    print(f"    - Common (synced) files: {total_common}")
    print(f"    - EN-only files (missing ZH): {total_en_only}")
    print(f"    - ZH-only files (missing EN): {total_zh_only}")
    total_issues += total_en_only + total_zh_only

    # Check 3: Extra directories
    print_header("3. EXTRA DIRECTORIES CHECK")
    print("\nChecking for directories not listed in products...\n")

    extra_en, extra_zh = check_extra_directories()

    if extra_en:
        print(f"  \033[93mExtra EN directories (not in products list):\033[0m")
        for d in sorted(extra_en):
            print(f"    - {d}")
        total_issues += len(extra_en)
    else:
        print("  \033[92m✓ No extra EN directories\033[0m")

    print()

    if extra_zh:
        print(f"  \033[93mExtra ZH directories (not in products list):\033[0m")
        for d in sorted(extra_zh):
            print(f"    - {d}")
        total_issues += len(extra_zh)
    else:
        print("  \033[92m✓ No extra ZH directories\033[0m")

    # Check 4: Navbar translations
    print_header("4. NAVBAR TRANSLATION CHECK")
    print("\nChecking if All Products navbar items have Chinese translations...\n")

    missing_keys, untranslated_keys, current_translations = check_navbar_translations()

    if missing_keys:
        print(f"  \033[91m✗ Missing translation keys in code.json ({len(missing_keys)}):\033[0m")
        for key in missing_keys:
            expected = NAVBAR_TRANSLATIONS[key]
            print(f"    - \"{key}\": \"{expected}\"")
        total_issues += len(missing_keys)
    else:
        print("  \033[92m✓ All navbar keys exist in code.json\033[0m")

    print()

    if untranslated_keys:
        print(f"  \033[93m⚠ Keys with untranslated values ({len(untranslated_keys)}):\033[0m")
        for key in untranslated_keys:
            current = current_translations.get(key, "N/A")
            expected = NAVBAR_TRANSLATIONS[key]
            print(f"    - \"{key}\"")
            print(f"        Current: \"{current}\"")
            print(f"        Expected: \"{expected}\"")
        total_issues += len(untranslated_keys)
    else:
        print("  \033[92m✓ All navbar translations are properly translated\033[0m")

    # Check 5: Sidebar category translations
    print_header("5. SIDEBAR CATEGORY TRANSLATION CHECK")
    print("\nChecking if sidebar categories have Chinese translations...\n")

    sidebar_results = check_sidebar_translations()
    sidebar_issues = 0

    for product, categories in sidebar_results.items():
        has_issues = any(actual == "MISSING" or actual != expected
                        for _, expected, actual in categories)

        if has_issues:
            print(f"  \033[91m✗ {product}:\033[0m")
            for cat_en, expected_zh, actual_zh in categories:
                if actual_zh == "MISSING":
                    print(f"      \033[91m✗ {cat_en}: MISSING\033[0m")
                    print(f"          Key: sidebar.{product}.category.{cat_en}")
                    print(f"          Expected: \"{expected_zh}\"")
                    sidebar_issues += 1
                elif actual_zh != expected_zh:
                    print(f"      \033[93m⚠ {cat_en}: Mismatch\033[0m")
                    print(f"          Current: \"{actual_zh}\"")
                    print(f"          Expected: \"{expected_zh}\"")
                else:
                    print(f"      \033[92m✓ {cat_en}: {actual_zh}\033[0m")
        else:
            print(f"  \033[92m✓ {product}: All categories translated\033[0m")
        print()

    total_issues += sidebar_issues

    # Check 6: Verify actual doc categories vs expected
    print_header("6. ACTUAL CATEGORY CHECK")
    print("\nVerifying actual doc categories match expected translations...\n")

    for product in PRODUCTS_CONFIG:
        name = product['name_en']
        doc_dir = product['doc_dir']
        sidebar_id = product['sidebar_id']

        # Use labels from _category_.json instead of folder names
        actual_cats = get_actual_categories_from_docs(doc_dir, use_labels=True)
        expected_cats = {cat for cat, _ in EXPECTED_SIDEBAR_CATEGORIES.get(sidebar_id, [])}

        if not actual_cats:
            continue

        missing_in_expected = actual_cats - expected_cats
        extra_in_expected = expected_cats - actual_cats

        if missing_in_expected or extra_in_expected:
            print(f"  \033[93m⚠ {name} ({sidebar_id}):\033[0m")
            if missing_in_expected:
                print(f"      Categories in docs but not in translation config:")
                for cat in sorted(missing_in_expected):
                    print(f"        - {cat}")
            if extra_in_expected:
                print(f"      Categories in translation config but not in docs:")
                for cat in sorted(extra_in_expected):
                    print(f"        - {cat}")
        else:
            print(f"  \033[92m✓ {name}: Categories match\033[0m")

    # Check 7: Navigation consistency (three areas)
    print_header("7. NAVIGATION CONSISTENCY CHECK")
    print("\nChecking if left sidebar, product cards, and AllProducts are consistent...\n")

    consistent, missing, _ = check_nav_consistency()

    if missing:
        print(f"  \033[91m✗ Inconsistent products found:\033[0m")
        for item in missing:
            product, in_nav, in_cards, in_all = item
            print(f"      {product}:")
            print(f"        - Left sidebar: {'✓' if in_nav else '✗'}")
            print(f"        - Product cards: {'✓' if in_cards else '✗'}")
            print(f"        - AllProducts: {'✓' if in_all else '✗'}")
        total_issues += len(missing)
    else:
        print(f"  \033[92m✓ All {len(consistent)} products are consistent across all three areas\033[0m")
        for prod in consistent:
            print(f"      ✓ {prod}")

    # Check 8: Broker submenu consistency
    print_header("8. BROKER SUBMENU CONSISTENCY CHECK")
    print("\nChecking broker submenu across docs, dropdown, and current.json...\n")

    broker_consistent, missing_dropdown, missing_current = check_broker_submenu_consistency()

    if missing_dropdown or missing_current:
        if missing_dropdown:
            print(f"  \033[91m✗ Missing in product-dropdown.js:\033[0m")
            for label in missing_dropdown:
                print(f"      - {label}")
            total_issues += len(missing_dropdown)

        if missing_current:
            print(f"  \033[91m✗ Missing in current.json:\033[0m")
            for label in missing_current:
                print(f"      - sidebar.broker.category.{label}")
            total_issues += len(missing_current)
    else:
        print(f"  \033[92m✓ All broker submenu items are consistent:\033[0m")
        for label, zh in broker_consistent:
            print(f"      ✓ {label} -> {zh}")

    # Final summary
    print_header("FINAL SUMMARY")

    if total_issues > 0:
        print(f"\n  \033[91m⚠ TOTAL ISSUES FOUND: {total_issues}\033[0m")
        print("\n  Recommended actions:")
        if missing_keys or untranslated_keys:
            print("    1. Update i18n/zh-CN/code.json with navbar translations")
        if sidebar_issues > 0:
            print("    2. Update i18n/zh-CN/docusaurus-plugin-content-docs/current.json with sidebar translations")
        if total_en_only > 0:
            print(f"    3. Add Chinese translations for {total_en_only} EN-only files")
        if total_zh_only > 0:
            print(f"    4. Add English versions for {total_zh_only} ZH-only files")
        print()
        return 1
    else:
        print("\n  \033[92m✓ All checks passed! Documentation is in sync.\033[0m\n")
        return 0


if __name__ == "__main__":
    exit(main())
