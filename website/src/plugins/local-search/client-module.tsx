/**
 * Local Search Client Module
 * 本地搜索客户端模块，提供搜索界面和搜索逻辑
 */

import React, {useState, useEffect, useMemo, useCallback} from 'react';
import {useHistory} from '@docusaurus/router';
import {usePluginData} from '@docusaurus/useGlobalData';
// import {useKeyboardNavigation} from '@docusaurus/theme-common';
import {createPortal} from 'react-dom';
import styles from './styles.module.css';

interface SearchIndexItem {
  id: string;
  title: string;
  description: string;
  content: string;
  keywords: string[];
  url: string;
  path: string;
  type: string;
  category: string;
}

interface SearchResult extends SearchIndexItem {
  score: number;
  highlights: {
    title: string;
    content: string;
  };
}

interface LocalSearchProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

export default function LocalSearch({isOpen, onClose, onOpen}: LocalSearchProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [searchIndex, setSearchIndex] = useState<SearchIndexItem[]>([]);
  const [indexLoaded, setIndexLoaded] = useState(false);
  
  const history = useHistory();
  
  // 尝试从插件数据获取
  let pluginIndexData: SearchIndexItem[] = [];
  try {
    pluginIndexData = usePluginData('local-search-plugin', 'search-index.json') as SearchIndexItem[];
  } catch (e) {
    console.log('Plugin data not available');
  }
  
  // 加载搜索索引
  useEffect(() => {
    const loadSearchIndex = async () => {
      try {
        let indexData: SearchIndexItem[] = pluginIndexData;
        
        // 如果插件数据不可用，尝试直接获取
        if (!indexData || indexData.length === 0) {
          console.log('Trying to fetch search index directly...');
          const response = await fetch('/search-index.json');
          if (response.ok) {
            indexData = await response.json();
          } else {
            console.error('Failed to fetch search index:', response.status, response.statusText);
            // 尝试从插件数据获取
            try {
              const globalData = (window as any).__DOCUSAURUS_GLOBAL_DATA__;
              if (globalData && globalData['local-search-plugin']) {
                indexData = globalData['local-search-plugin']['search-index.json'];
                console.log('Found search index in global data');
              }
            } catch (e) {
              console.error('Failed to get from global data:', e);
            }
            
            // 最后尝试：从内嵌的搜索索引获取
            if (!indexData || indexData.length === 0) {
              console.log('Trying to load embedded search index...');
              try {
                const embeddedResponse = await fetch('/_dogfooding/search-index.json');
                if (embeddedResponse.ok) {
                  indexData = await embeddedResponse.json();
                  console.log('Loaded from embedded search index');
                }
              } catch (e) {
                console.error('Failed to load embedded index:', e);
              }
            }
          }
        }
        
        if (indexData && Array.isArray(indexData)) {
          console.log(`Search index loaded with ${indexData.length} items`);
          setSearchIndex(indexData);
          setIndexLoaded(true);
        } else {
          console.error('Invalid search index format:', indexData);
        }
      } catch (error) {
        console.error('Failed to load search index:', error);
      }
    };
    
    loadSearchIndex();
  }, [pluginIndexData]);

  // 搜索逻辑
  const performSearch = useCallback((searchQuery: string) => {
    if (!searchQuery || searchQuery.length < 2) {
      setResults([]);
      return;
    }

    if (!indexLoaded || !searchIndex || searchIndex.length === 0) {
      console.log('Search index not ready yet');
      return;
    }

    setIsLoading(true);
    
    try {
      const searchResults = searchInIndex(searchQuery, searchIndex);
      setResults(searchResults);
      setSelectedIndex(0);
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  }, [searchIndex, indexLoaded]);

  // 防抖搜索
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      performSearch(query);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query, performSearch]);

  // 键盘导航 - 简化版本
  // const {navigate} = useKeyboardNavigation({
  //   onNavigate: (direction) => {
  //     if (direction === 'down') {
  //       setSelectedIndex(prev => Math.min(prev + 1, results.length - 1));
  //     } else if (direction === 'up') {
  //       setSelectedIndex(prev => Math.max(prev - 1, 0));
  //     }
  //   },
  //   onSelect: () => {
  //     if (results[selectedIndex]) {
  //       handleResultClick(results[selectedIndex]);
  //     }
  //   },
  //   onClose,
  // });

  // 处理结果点击
  const handleResultClick = useCallback((result: SearchResult) => {
    history.push(result.url);
    onClose();
    setQuery('');
  }, [history, onClose]);

  // 处理输入变化
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  }, []);

  // 处理键盘事件
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    } else if (e.key === 'Enter' && results[selectedIndex]) {
      handleResultClick(results[selectedIndex]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => Math.min(prev + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => Math.max(prev - 1, 0));
    }
  }, [results, selectedIndex, handleResultClick, onClose]);

  // 渲染搜索结果
  const renderResults = () => {
    if (isLoading) {
      return (
        <div className={styles.searchResults}>
          <div className={styles.loading}>
            <div className={styles.spinner}></div>
            <span>搜索中...</span>
          </div>
        </div>
      );
    }

    if (!query || query.length < 2) {
      return (
        <div className={styles.searchResults}>
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>🔍</div>
            <p>输入至少 2 个字符开始搜索</p>
            <div className={styles.searchTips}>
              <h4>搜索提示：</h4>
              <ul>
                <li>搜索 API 接口名称</li>
                <li>搜索功能关键词</li>
                <li>搜索参数名称</li>
                <li>搜索错误代码</li>
              </ul>
            </div>
          </div>
        </div>
      );
    }

    if (results.length === 0) {
      return (
        <div className={styles.searchResults}>
          <div className={styles.noResults}>
            <div className={styles.noResultsIcon}>❌</div>
            <p>没有找到相关结果</p>
            <p className={styles.noResultsQuery}>搜索: "{query}"</p>
            <div className={styles.searchSuggestions}>
              <h4>建议：</h4>
              <ul>
                <li>检查拼写是否正确</li>
                <li>尝试使用不同的关键词</li>
                <li>使用更通用的搜索词</li>
                <li>查看文档目录结构</li>
              </ul>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className={styles.searchResults}>
        <div className={styles.resultsHeader}>
          <span>找到 {results.length} 个结果</span>
        </div>
        <div className={styles.resultsList}>
          {results.map((result, index) => (
            <div
              key={result.id}
              className={`${styles.resultItem} ${index === selectedIndex ? styles.selected : ''}`}
              onClick={() => handleResultClick(result)}
            >
              <div className={styles.resultHeader}>
                <h3 
                  className={styles.resultTitle}
                  dangerouslySetInnerHTML={{__html: result.highlights.title}}
                />
                <span className={`${styles.resultType} ${getTypeClassName(result.type, styles)}`}>
                  {getTypeLabel(result.type)}
                </span>
              </div>
              <div className={styles.resultPath}>
                {result.path}
              </div>
              {result.description && (
                <div className={styles.resultDescription}>
                  {result.description}
                </div>
              )}
              <div 
                className={styles.resultContent}
                dangerouslySetInnerHTML={{__html: result.highlights.content}}
              />
            </div>
          ))}
        </div>
      </div>
    );
  };

  if (!isOpen) {
    return null;
  }

  return createPortal(
    <div className={styles.searchOverlay} onClick={onClose}>
      <div className={styles.searchModal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.searchHeader}>
          <div className={styles.searchInputContainer}>
            <input
              type="text"
              className={styles.searchInput}
              placeholder="搜索 API 接口..."
              value={query}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              autoFocus
            />
            <button 
              className={styles.searchClose}
              onClick={onClose}
              aria-label="关闭搜索"
            >
              ✕
            </button>
          </div>
        </div>
        {renderResults()}
        <div className={styles.searchFooter}>
          <div className={styles.keyboardHints}>
            <span>← → 选择</span>
            <span>↑ ↓ 导航</span>
            <span>ESC 关闭</span>
          </div>
          <div className={styles.searchInfo}>
            <span>本地搜索</span>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

/**
 * 在索引中搜索
 */
function searchInIndex(query: string, index: SearchIndexItem[]): SearchResult[] {
  const searchTerms = query.toLowerCase().split(/\s+/).filter(term => term.length > 0);
  const results: SearchResult[] = [];

  for (const item of index) {
    const score = calculateScore(item, searchTerms);
    if (score > 0) {
      results.push({
        ...item,
        score,
        highlights: generateHighlights(item, searchTerms),
      });
    }
  }

  // 按分数排序
  results.sort((a, b) => b.score - a.score);
  
  // 限制结果数量
  return results.slice(0, 20);
}

/**
 * 计算搜索分数
 */
function calculateScore(item: SearchIndexItem, searchTerms: string[]): number {
  let score = 0;
  const title = item.title.toLowerCase();
  const content = item.content.toLowerCase();
  const keywords = item.keywords.join(' ').toLowerCase();
  const path = item.path.toLowerCase();

  for (const term of searchTerms) {
    // 标题完全匹配
    if (title.includes(term)) {
      score += 10;
    }
    
    // 标题开头匹配
    if (title.startsWith(term)) {
      score += 15;
    }
    
    // 关键词匹配
    if (keywords.includes(term)) {
      score += 8;
    }
    
    // 路径匹配
    if (path.includes(term)) {
      score += 5;
    }
    
    // 内容匹配
    if (content.includes(term)) {
      score += 2;
    }
    
    // 描述匹配
    if (item.description.toLowerCase().includes(term)) {
      score += 6;
    }
  }

  return score;
}

/**
 * 生成高亮显示
 */
function generateHighlights(item: SearchIndexItem, searchTerms: string[]): {title: string; content: string} {
  const highlightTerm = (text: string, terms: string[]): string => {
    let highlighted = text;
    for (const term of terms) {
      const regex = new RegExp(`(${escapeRegExp(term)})`, 'gi');
      highlighted = highlighted.replace(regex, '<mark>$1</mark>');
    }
    return highlighted;
  };

  return {
    title: highlightTerm(item.title, searchTerms),
    content: highlightTerm(truncateContent(item.content, 200), searchTerms),
  };
}

/**
 * 转义正则表达式特殊字符
 */
function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * 截断内容
 */
function truncateContent(content: string, maxLength: number): string {
  if (content.length <= maxLength) {
    return content;
  }
  
  const truncated = content.substring(0, maxLength);
  const lastSpace = truncated.lastIndexOf(' ');
  return lastSpace > 0 ? truncated.substring(0, lastSpace) + '...' : truncated + '...';
}

/**
 * 获取类型标签
 */
function getTypeLabel(type: string): string {
  const typeLabels: Record<string, string> = {
    'futures': '期货',
    'spot': '现货',
    'copy-trading': '跟单',
    'margin-spot': '保证金',
    'futures-copy': '期货跟单',
    'trading-third-party': '第三方',
    'user-center': '用户中心',
    'general': '通用',
  };
  
  return typeLabels[type] || type;
}

/**
 * 获取类型对应的 CSS 类名
 */
function getTypeClassName(type: string, styles: any): string {
  const typeClassMap: Record<string, string> = {
    'futures': styles.futures,
    'spot': styles.spot,
    'copy-trading': styles.resultTypeCopyTrading,
    'margin-spot': styles.resultTypeMarginSpot,
    'futures-copy': styles.resultTypeFuturesCopy,
    'trading-third-party': styles.resultTypeTradingThirdParty,
    'user-center': styles.resultTypeUserCenter,
    'general': styles.general,
  };
  
  return typeClassMap[type] || styles.general;
}
