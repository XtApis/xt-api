/**
 * Search Test Page
 * 搜索测试页面
 */

import React, {useState} from 'react';
import Layout from '@theme/Layout';
import LocalSearchBar from '../components/LocalSearchBar';

export default function SearchTest() {
  return (
    <Layout title="搜索测试" description="本地搜索功能测试页面">
      <div style={{padding: '2rem', maxWidth: '800px', margin: '0 auto'}}>
        <h1>本地搜索功能测试</h1>
        
        <div style={{marginBottom: '2rem'}}>
          <h2>搜索栏组件</h2>
          <LocalSearchBar />
        </div>
        
        <div style={{marginBottom: '2rem'}}>
          <h2>测试说明</h2>
          <p>这个页面用于测试本地搜索功能。你可以：</p>
          <ul>
            <li>点击搜索栏打开搜索界面</li>
            <li>输入关键词搜索 API 接口文档</li>
            <li>使用键盘快捷键 "/" 快速打开搜索</li>
            <li>使用方向键导航搜索结果</li>
            <li>按 Enter 键选择结果</li>
            <li>按 ESC 键关闭搜索</li>
          </ul>
        </div>
        
        <div style={{marginBottom: '2rem'}}>
          <h2>搜索建议</h2>
          <p>尝试搜索以下关键词：</p>
          <ul>
            <li><code>现货</code> - 搜索现货交易相关文档</li>
            <li><code>期货</code> - 搜索期货交易相关文档</li>
            <li><code>API</code> - 搜索 API 相关文档</li>
            <li><code>订单</code> - 搜索订单相关接口</li>
            <li><code>用户</code> - 搜索用户中心相关文档</li>
          </ul>
        </div>
        
        <div>
          <h2>功能特性</h2>
          <ul>
            <li>✅ 本地搜索，无需网络连接</li>
            <li>✅ 实时搜索，输入即搜索</li>
            <li>✅ 智能匹配，支持标题、内容、关键词搜索</li>
            <li>✅ 高亮显示，搜索结果高亮关键词</li>
            <li>✅ 分类标签，显示文档类型</li>
            <li>✅ 键盘导航，支持方向键和快捷键</li>
            <li>✅ 响应式设计，支持移动端</li>
          </ul>
        </div>
      </div>
    </Layout>
  );
}
