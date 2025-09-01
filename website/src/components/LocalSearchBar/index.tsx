/**
 * Local Search Bar Component
 * 本地搜索栏组件
 */

import React, {useState, useCallback} from 'react';
import {useHistory} from '@docusaurus/router';
import LocalSearch from '../../plugins/local-search/client-module';
import styles from './styles.module.css';

interface LocalSearchBarProps {
  className?: string;
}

export default function LocalSearchBar({className}: LocalSearchBarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const history = useHistory();

  const handleOpen = useCallback(() => {
    setIsOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === '/' && !isOpen) {
      e.preventDefault();
      handleOpen();
    } else if (e.key === 'Escape' && isOpen) {
      handleClose();
    }
  }, [isOpen, handleOpen, handleClose]);

  // 全局键盘事件监听
  React.useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && !isOpen && !e.ctrlKey && !e.metaKey) {
        // 检查是否在输入框中
        const target = e.target as HTMLElement;
        if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.contentEditable === 'true') {
          return;
        }
        e.preventDefault();
        handleOpen();
      }
    };

    document.addEventListener('keydown', handleGlobalKeyDown);
    return () => document.removeEventListener('keydown', handleGlobalKeyDown);
  }, [isOpen, handleOpen]);

  return (
    <>
      <div className={`${styles.searchBar} ${className || ''}`}>
        <button
          className={styles.searchButton}
          onClick={handleOpen}
          onKeyDown={handleKeyDown}
          aria-label="搜索 API 接口"
          title="搜索 API 接口 (按 / 键)"
        >
          <svg
            className={styles.searchIcon}
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"
              fill="currentColor"
            />
          </svg>
          <span className={styles.searchText}>搜索 API 接口</span>
          <kbd className={styles.searchShortcut}>/</kbd>
        </button>
      </div>
      
      <LocalSearch
        isOpen={isOpen}
        onOpen={handleOpen}
        onClose={handleClose}
      />
    </>
  );
}
