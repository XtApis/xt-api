/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/* eslint-disable @docusaurus/no-untranslated-text */
/* eslint-disable jsx-a11y/no-autofocus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/no-danger */
/* eslint-disable react/button-has-type */
/* eslint-disable @docusaurus/prefer-docusaurus-heading */
/* eslint-disable no-nested-ternary */
import React, {useState, useEffect, useMemo} from 'react';
import {useHistory} from '@docusaurus/router';
import {loadDocumentIndex} from './DocumentIndexer';
import type { DocumentItem} from './DocumentIndexer';
import styles from './styles.module.css';

interface SearchResult extends DocumentItem {
  score: number;
  highlights: {
    title: string;
    content: string;
  };
}

export default function SimpleSearch(): JSX.Element {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [searchIndex, setSearchIndex] = useState<DocumentItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();

  // 加载文档索引
  useEffect(() => {
    const loadIndex = async () => {
      setIsLoading(true);
      try {
        const index = await loadDocumentIndex();
        setSearchIndex(index);
        console.log(`Loaded ${index.length} documents for search`);
      } catch (error) {
        console.error('Failed to load search index:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadIndex();
  }, []);

  // 辅助函数：转义正则表达式特殊字符
  const escapeRegExp = (string: string): string => {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  };

  // 搜索逻辑
  const performSearch = useMemo(() => {
    return (searchQuery: string): SearchResult[] => {
      if (!searchQuery || searchQuery.length < 2) {
        return [];
      }

      const searchTerm = searchQuery.toLowerCase().trim();
      const searchResults: SearchResult[] = [];

      // 将查询词分割成多个关键词
      const keywords = searchTerm
        .split(/[\s\-_/]+/)
        .filter((word) => word.length > 1);

      searchIndex.forEach((item) => {
        let score = 0;
        const highlights = {title: item.title, content: item.content};
        const lowerTitle = item.title.toLowerCase();
        const lowerDescription = item.description.toLowerCase();
        const lowerContent = item.content.toLowerCase();
        const lowerPath = item.path.toLowerCase();
        const lowerUrl = item.url.toLowerCase();

        // 1. 完全匹配 - 最高分
        if (lowerTitle.includes(searchTerm)) {
          score += 20;
        }
        if (lowerDescription.includes(searchTerm)) {
          score += 15;
        }
        if (lowerPath.includes(searchTerm)) {
          score += 12;
        }
        if (lowerUrl.includes(searchTerm)) {
          score += 10;
        }

        // 2. 关键词匹配
        keywords.forEach((keyword) => {
          if (lowerTitle.includes(keyword)) {
            score += 8;
          }
          if (lowerDescription.includes(keyword)) {
            score += 6;
          }
          if (lowerPath.includes(keyword)) {
            score += 5;
          }
          if (lowerContent.includes(keyword)) {
            score += 3;
          }
          if (item.type.toLowerCase().includes(keyword)) {
            score += 2;
          }
          if (item.category.toLowerCase().includes(keyword)) {
            score += 2;
          }
        });

        // 3. 特殊匹配模式
        // 路径匹配 (如 "entrust/cancel" 匹配 "futures_entrust/cancelTrack")
        if (searchTerm.includes('/')) {
          const pathParts = searchTerm.split('/');
          let pathMatches = 0;
          pathParts.forEach((part) => {
            if (lowerPath.includes(part) || lowerUrl.includes(part)) {
              pathMatches += 1;
            }
          });
          if (pathMatches === pathParts.length) {
            score += 15; // 所有路径部分都匹配
          } else if (pathMatches > 0) {
            score += pathMatches * 3; // 部分路径匹配
          }
        }

        // 4. API 接口特殊匹配
        // 匹配常见的API模式：cancel-track, cancelTrack等
        const normalizedQuery = searchTerm.replace(/[-_]/g, '').toLowerCase();
        const normalizedTitle = lowerTitle.replace(/[-_\s]/g, '');
        const normalizedPath = lowerPath.replace(/[-_]/g, '');

        if (normalizedTitle.includes(normalizedQuery)) {
          score += 12;
        }
        if (normalizedPath.includes(normalizedQuery)) {
          score += 10;
        }

        // 5. 高亮处理
        if (score > 0) {
          // 高亮标题
          let highlightedTitle = item.title;
          let highlightedContent = item.content;

          // 尝试高亮完整查询
          const titleRegex = new RegExp(escapeRegExp(searchTerm), 'gi');
          const contentRegex = new RegExp(escapeRegExp(searchTerm), 'gi');

          if (titleRegex.test(item.title)) {
            highlightedTitle = item.title.replace(
              titleRegex,
              (match) => `<mark>${match}</mark>`,
            );
          }
          if (contentRegex.test(item.content)) {
            highlightedContent = item.content.replace(
              contentRegex,
              (match) => `<mark>${match}</mark>`,
            );
          }

          // 如果完整查询没有匹配，尝试高亮关键词
          if (
            !titleRegex.test(item.title) &&
            !contentRegex.test(item.content)
          ) {
            keywords.forEach((keyword) => {
              const keywordRegex = new RegExp(escapeRegExp(keyword), 'gi');
              highlightedTitle = highlightedTitle.replace(
                keywordRegex,
                (match) => `<mark>${match}</mark>`,
              );
              highlightedContent = highlightedContent.replace(
                keywordRegex,
                (match) => `<mark>${match}</mark>`,
              );
            });
          }

          highlights.title = highlightedTitle;
          highlights.content = highlightedContent;

          searchResults.push({
            ...item,
            score,
            highlights,
          });
        }
      });

      // 按分数排序
      return searchResults.sort((a, b) => b.score - a.score);
    };
  }, [searchIndex, escapeRegExp]);

  // 处理搜索
  useEffect(() => {
    if (query.length >= 2) {
      const searchResults = performSearch(query);
      setResults(searchResults);
      setSelectedIndex(0);
    } else {
      setResults([]);
    }
  }, [query, performSearch]);

  // 处理结果点击
  const handleResultClick = (result: SearchResult) => {
    history.push(result.url);
    setIsOpen(false);
    setQuery('');
  };

  // 处理键盘事件
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
    } else if (e.key === 'Enter' && results[selectedIndex]) {
      handleResultClick(results[selectedIndex]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => Math.min(prev + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => Math.max(prev - 1, 0));
    }
  };

  return (
    <>
      {/* 搜索按钮 */}
      <button
        className={styles.searchButton}
        onClick={() => setIsOpen(true)}
        aria-label="搜索 API 文档">
        🔍 搜索
      </button>

      {/* 搜索弹窗 */}
      {isOpen && (
        <div className={styles.overlay} onClick={() => setIsOpen(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            {/* 搜索输入框 */}
            <div className={styles.searchInput}>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="搜索 API 文档..."
                autoFocus
              />
              <button
                className={styles.closeButton}
                onClick={() => setIsOpen(false)}>
                ✕
              </button>
            </div>

            {/* 搜索结果 */}
            <div className={styles.results}>
              {isLoading ? (
                <div className={styles.emptyState}>
                  <p>🔄 正在加载文档索引...</p>
                </div>
              ) : query.length < 2 ? (
                <div className={styles.emptyState}>
                  <p>输入至少 2 个字符开始搜索</p>
                  <div className={styles.searchTips}>
                    <h4>搜索提示：</h4>
                    <ul>
                      <li>搜索 API 接口名称（如：期货委托、现货交易、跟单）</li>
                      <li>搜索功能关键词（如：下单、撤单、查询、WebSocket）</li>
                      <li>搜索参数名称（如：价格、数量、订单、持仓）</li>
                      <li>搜索文档类型（如：基础信息、错误码、签名算法）</li>
                    </ul>
                    <p
                      style={{
                        marginTop: '16px',
                        fontSize: '14px',
                        color: '#888',
                      }}>
                      已索引 {searchIndex.length} 个文档
                    </p>
                  </div>
                </div>
              ) : results.length === 0 ? (
                <div className={styles.noResults}>
                  <div className={styles.noResultsIcon}>🔍</div>
                  <p>没有找到相关结果</p>
                  <p>尝试其他关键词或检查拼写</p>
                </div>
              ) : (
                <div className={styles.resultsList}>
                  {results.map((result, index) => (
                    <div
                      key={result.id}
                      className={`${styles.resultItem} ${
                        index === selectedIndex ? styles.selected : ''
                      }`}
                      onClick={() => handleResultClick(result)}>
                      <div className={styles.resultHeader}>
                        <h3
                          className={styles.resultTitle}
                          dangerouslySetInnerHTML={{
                            __html: result.highlights.title,
                          }}
                        />
                        <div className={styles.resultTags}>
                          <span className={styles.resultCategory}>
                            {result.category}
                          </span>
                          <span className={styles.resultType}>
                            {result.type}
                          </span>
                        </div>
                      </div>
                      <p
                        className={styles.resultDescription}
                        dangerouslySetInnerHTML={{
                          __html:
                            result.highlights.content || result.description,
                        }}
                      />
                      <div className={styles.resultPath}>{result.path}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 键盘导航提示 */}
            <div className={styles.keyboardHints}>
              <span>↑↓ 导航</span>
              <span>Enter 选择</span>
              <span>ESC 关闭</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
