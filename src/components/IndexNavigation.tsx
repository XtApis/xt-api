/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from "react";
import Link from "@docusaurus/Link";

interface IndexNavigationProps {
  activePage: string;
}

function IndexNavigation({ activePage }: IndexNavigationProps) {
  const navItems = [
    { href: "/index-page", label: "Overview", icon: "📖", key: "overview" },
    {
      href: "/index/quick-start",
      label: "Quick Start",
      icon: "🚀",
      key: "quick-start",
    },
    {
      href: "/index/api-reference",
      label: "API Reference",
      icon: "📚",
      key: "api-reference",
    },
    { href: "/index/sdks", label: "SDKs & Libraries", icon: "🔧", key: "sdks" },
    { href: "/index/examples", label: "Examples", icon: "💻", key: "examples" },
    { href: "/index/faq", label: "FAQ", icon: "❓", key: "faq" },
  ];

  return (
    <>
      <style>{`
        .index-navigation {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1rem;
          margin: 2rem 0;
        }
        
        .index-nav-item {
          background: #f8f9fa;
          border: 1px solid #e9ecef;
          border-radius: 8px;
          padding: 1rem;
          transition: all 0.3s ease;
        }
        
        .index-nav-item:hover {
          background: #e9ecef;
          border-color: #007bff;
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }
        
        .index-nav-link {
          display: flex;
          align-items: center;
          text-decoration: none;
          color: #495057;
          font-weight: 500;
        }
        
        .index-nav-link:hover {
          color: #007bff;
          text-decoration: none;
        }
        
        .index-nav-link.active {
          color: #007bff;
          background: #e7f3ff;
          border-radius: 6px;
          padding: 0.5rem;
          margin: -0.5rem;
        }
        
        .index-nav-icon {
          font-size: 1.5rem;
          margin-right: 0.75rem;
          width: 2rem;
          text-align: center;
        }
        
        @media (max-width: 768px) {
          .index-navigation {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="index-navigation">
        {navItems.map((item) => (
          <div key={item.key} className="index-nav-item">
            <Link
              to={item.href}
              className={`index-nav-link ${
                activePage === item.key ? "active" : ""
              }`}
            >
              <span className="index-nav-icon">{item.icon}</span>
              {item.label}
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}

export default IndexNavigation;
