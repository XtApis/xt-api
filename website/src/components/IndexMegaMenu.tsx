/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, {useState, useRef, useEffect} from 'react';
import Link from '@docusaurus/Link';

function IndexMegaMenu(): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('Index');
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const categories = [
    {
      key: 'Index',
      label: 'Index',
      icon: '📖',
      description: 'Explore our index APIs',
      color: '#007bff',
      items: [
        {
          href: '/docs/index_overview/overview',
          label: 'Index',
          description: 'Index APIs',
        },
        {
          href: '/docs/index_overview/index_overview_resource',
          label: 'API Resources and Support',
          description: 'API Resources and Support',
        },
      ],
    },
    {
      key: 'spot',
      label: 'Spot',
      icon: '💰',
      description: 'Spot Trading APIs',
      color: '#28a745',
      items: [
        {
          href: '/docs/spot/AccessDescription/RestApi',
          label: 'AccessDescription',
          description: 'AccessDescription APIs',
        },
        {
          href: '/docs/spot/Balance/GetCurrencyInfo',
          label: 'Balance',
          description: 'Balance APIs',
        },
        {
          href: '/docs/spot/Deposit&Withdrawal/GetSupportedCurrencies',
          label: 'Deposit&Withdrawal',
          description: 'Deposit&Withdrawal APIs',
        },
        {
          href: '/docs/spot/Market/GetServerTime',
          label: 'Market',
          description: 'Market APIs',
        },
        {
          href: '/docs/spot/Order/GetSingleOrder',
          label: 'Order',
          description: 'Order APIs',
        },
        {
          href: '/docs/spot/Trade/QueryTrade',
          label: 'Trade',
          description: 'Trade APIs',
        },
        {
          href: '/docs/spot/Transfer/TransferBetweenUserSystems',
          label: 'Transfer',
          description: 'Transfer APIs',
        },
        {
          href: '/docs/spot/WebSocket_Private/RequestMessageFormat',
          label: 'WebSocket_Private',
          description: 'WebSocket_Private APIs',
        },
        {
          href: '/docs/spot/WebSocket_Public/wss-general',
          label: 'WebSocket_Public',
          description: 'WebSocket_Public APIs',
        },
      ],
    },
    {
      key: 'futures',
      label: 'Futures',
      icon: '📈',
      description: 'Futures Trading APIs',
      color: '#ffc107',
      items: [
        {
          href: '/docs/futures/AccessDescription/apiDemo',
          label: 'AccessDescription',
          description: 'AccessDescription APIs',
        },
        {
          href: '/docs/futures/Entrust/GetEntrust',
          label: 'Entrust',
          description: 'Entrust APIs',
        },
        {
          href: '/docs/futures/Market data/GetServerTime',
          label: 'Market Data',
          description: 'Market Data APIs',
        },
        {
          href: '/docs/futures/Order/Create Orders',
          label: 'Order',
          description: 'Order APIs',
        },
        {
          href: '/docs/futures/PythonPackage/PythonPackage',
          label: 'Python Package',
          description: 'Python Package APIs',
        },
        {
          href: '/docs/futures/Quote collection/GetDepthInfo',
          label: 'Quote Collection',
          description: 'Quote Collection APIs',
        },
        {
          href: '/docs/futures/User/GetUserInfo',
          label: 'User',
          description: 'User APIs',
        },
        {
          href: '/docs/futures/WEBSOCKET(V2)/Request message format',
          label: 'WebSocket V2',
          description: 'WebSocket V2 APIs',
        },
      ],
    },
    {
      key: 'marginSpot',
      label: 'Margin Spot',
      icon: '⚖️',
      description: 'Margin Spot Trading APIs',
      color: '#17a2b8',
      items: [
        {
          href: '/docs/margin-spot/AccessDescription/RestApi',
          label: 'AccessDescription',
          description: 'AccessDescription APIs',
        },
        {
          href: '/docs/margin-spot/Balance/GetBalance',
          label: 'Balance',
          description: 'Balance APIs',
        },
        {
          href: '/docs/margin-spot/Market/GetServerTime',
          label: 'Market',
          description: 'Market APIs',
        },
      ],
    },
    {
      key: 'copyTrading',
      label: 'Copy Trading',
      icon: '👥',
      description: 'Copy Trading APIs',
      color: '#6f42c1',
      items: [
        {
          href: '/docs/copy-trading/Access Description/RestApi',
          label: 'Access Description',
          description: 'Access Description APIs',
        },
        {
          href: '/docs/copy-trading/Copy tradeing/ChooseLeader',
          label: 'Copy Trading',
          description: 'Copy Trading APIs',
        },
      ],
    },
    {
      key: 'futuresCopy',
      label: 'Futures Copy',
      icon: '🔄',
      description: 'Futures Copy Trading APIs',
      color: '#e83e8c',
      items: [
        {
          href: '/docs/futures-copy/AccessDescription/RestApi',
          label: 'AccessDescription',
          description: 'AccessDescription APIs',
        },
        {
          href: '/docs/futures-copy/Copy Trading/ChooseLeader',
          label: 'Copy Trading',
          description: 'Copy Trading APIs',
        },
        {
          href: '/docs/futures-copy/installation',
          label: 'Installation',
          description: 'Installation Guide',
        },
      ],
    },
    {
      key: 'tradingThirdParty',
      label: 'Trading Third Party',
      icon: '🔗',
      description: 'Third Party Integration APIs',
      color: '#fd7e14',
      items: [
        {
          href: '/docs/trading-third-party/AccessDescription/RestAPI',
          label: 'AccessDescription',
          description: 'AccessDescription APIs',
        },
        {
          href: '/docs/trading-third-party/Balance/GetBalance',
          label: 'Balance',
          description: 'Balance APIs',
        },
        {
          href: '/docs/trading-third-party/OAuth Interface/OAuth',
          label: 'OAuth Interface',
          description: 'OAuth Interface APIs',
        },
        {
          href: '/docs/trading-third-party/Order/CreateOrder',
          label: 'Order',
          description: 'Order APIs',
        },
        {
          href: '/docs/trading-third-party/Trade/QueryTrade',
          label: 'Trade',
          description: 'Trade APIs',
        },
        {
          href: '/docs/trading-third-party/User Registration/User_Registration',
          label: 'User Registration',
          description: 'User Registration APIs',
        },
      ],
    },
    {
      key: 'userCenter',
      label: 'User Center',
      icon: '👤',
      description: 'User Management APIs',
      color: '#20c997',
      items: [
        {
          href: '/docs/user-center/AccessDescription/RestAPI',
          label: 'AccessDescription',
          description: 'AccessDescription APIs',
        },
        {
          href: '/docs/user-center/Account/GetAccountInfo',
          label: 'Account',
          description: 'Account APIs',
        },
        {
          href: '/docs/user-center/ApiKey/CreateApiKey',
          label: 'ApiKey',
          description: 'ApiKey APIs',
        },
        {
          href: '/docs/user-center/Referral Commission/GetReferralInfo',
          label: 'Referral Commission',
          description: 'Referral Commission APIs',
        },
      ],
    },
  ];

  const activeCategoryData = categories.find(
    (cat) => cat.key === activeCategory,
  );

  return (
    <>
      <style>{`
        .index-mega-menu {
          position: relative;
          display: inline-block;
        }
        
        .index-mega-menu-trigger {
          background: none;
          border: none;
          color: inherit;
          font: inherit;
          cursor: pointer;
          padding: 0.5rem 1rem;
          border-radius: 4px;
          transition: all 0.2s ease;
          font-weight: 500;
        }
        
        .index-mega-menu-trigger:hover {
          background-color: rgba(0,0,0,0.05);
          color: #007bff;
        }
        
        .index-mega-menu-dropdown {
          position: absolute;
          top: 100%;
          left: 0;
          width: 800px;
          background: white;
          border: 1px solid #e9ecef;
          border-radius: 12px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.15);
          z-index: 1001;
          display: flex;
          overflow: hidden;
          margin-top: 0.5rem;
          opacity: 0;
          transform: translateY(-10px);
          transition: all 0.3s ease;
          pointer-events: none;
        }
        
        .index-mega-menu-dropdown.show {
          opacity: 1;
          transform: translateY(0);
          pointer-events: auto;
        }
        
        .index-mega-menu-left {
          width: 220px;
          background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
          border-right: 1px solid #e9ecef;
          padding: 1.5rem 0;
          flex-shrink: 0;
        }
        
        .index-mega-menu-right {
          flex: 1;
          padding: 2rem;
          background: white;
        }
        
        .index-category-item {
          padding: 1rem 1.5rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          transition: all 0.3s ease;
          border-left: 4px solid transparent;
          margin: 0 0.5rem;
          border-radius: 8px;
        }
        
        .index-category-item:hover {
          background: rgba(255,255,255,0.8);
          transform: translateX(5px);
        }
        
        .index-category-item.active {
          background: white;
          border-left-color: var(--category-color);
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
        
        .index-category-icon {
          font-size: 1.5rem;
          margin-right: 1rem;
          width: 2rem;
          text-align: center;
        }
        
        .index-category-content {
          flex: 1;
        }
        
        .index-category-label {
          font-weight: 600;
          color: #212529;
          margin-bottom: 0.25rem;
        }
        
        .index-category-description {
          font-size: 0.875rem;
          color: #6c757d;
          line-height: 1.4;
        }
        
        .index-content-header {
          margin-bottom: 2rem;
        }
        
        .index-content-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: #212529;
          margin-bottom: 0.5rem;
          display: flex;
          align-items: center;
        }
        
        .index-content-title::before {
          content: '';
          width: 4px;
          height: 1.5rem;
          background: var(--category-color);
          margin-right: 1rem;
          border-radius: 2px;
        }
        
        .index-content-description {
          color: #6c757d;
          font-size: 1rem;
          line-height: 1.6;
        }
        
        .index-content-items {
          display: grid;
          gap: 1rem;
        }
        
        .index-content-item {
          padding: 1.25rem;
          border: 1px solid #e9ecef;
          border-radius: 8px;
          transition: all 0.3s ease;
          background: #f8f9fa;
        }
        
        .index-content-item:hover {
          border-color: var(--category-color);
          background: white;
          box-shadow: 0 4px 16px rgba(0,0,0,0.1);
          transform: translateY(-2px);
        }
        
        .index-content-item a {
          text-decoration: none;
          color: inherit;
          display: block;
        }
        
        .index-content-item-title {
          font-weight: 600;
          color: var(--category-color);
          margin-bottom: 0.5rem;
          font-size: 1.1rem;
        }
        
        .index-content-item-description {
          font-size: 0.9rem;
          color: #6c757d;
          line-height: 1.5;
        }
        
        @media (max-width: 768px) {
          .index-mega-menu-dropdown {
            width: 100vw;
            left: -1rem;
            right: -1rem;
          }
          
          .index-mega-menu-left {
            width: 180px;
          }
          
          .index-mega-menu-right {
            padding: 1.5rem;
          }
        }
      `}</style>

      <div className="index-mega-menu" ref={menuRef}>
        <button
          type="button"
          className="index-mega-menu-trigger"
          onMouseEnter={() => setIsOpen(true)}
          onClick={() => setIsOpen(!isOpen)}>
          Index
        </button>

        <div
          className={`index-mega-menu-dropdown ${isOpen ? 'show' : ''}`}
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
          style={
            {
              '--category-color': activeCategoryData?.color,
            } as React.CSSProperties
          }>
          <div className="index-mega-menu-left">
            {categories.map((category) => (
              <div
                key={category.key}
                className={`index-category-item ${
                  activeCategory === category.key ? 'active' : ''
                }`}
                onClick={() => setActiveCategory(category.key)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setActiveCategory(category.key);
                  }
                }}
                role="button"
                tabIndex={0}
                style={
                  {'--category-color': category.color} as React.CSSProperties
                }>
                <span className="index-category-icon">{category.icon}</span>
                <div className="index-category-content">
                  <div className="index-category-label">{category.label}</div>
                  <div className="index-category-description">
                    {category.description}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="index-mega-menu-right">
            <div className="index-content-header">
              <div className="index-content-title">
                {activeCategoryData?.label}
              </div>
              <div className="index-content-description">
                {activeCategoryData?.description}
              </div>
            </div>

            <div className="index-content-items">
              {activeCategoryData?.items.map((item) => (
                <div key={item.href} className="index-content-item">
                  <Link to={item.href}>
                    <div className="index-content-item-title">{item.label}</div>
                    <div className="index-content-item-description">
                      {item.description}
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default IndexMegaMenu;
