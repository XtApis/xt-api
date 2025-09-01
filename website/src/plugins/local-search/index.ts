/**
 * Local Search Plugin for XT API Documentation
 * 本地搜索插件，专门搜索 docs 目录下的 API 接口文档
 */

import type {Plugin} from '@docusaurus/types';
import {Joi} from '@docusaurus/utils-validation';
import path from 'path';
import fs from 'fs-extra';
import matter from 'gray-matter';

export interface LocalSearchPluginOptions {
  // 搜索的文档目录
  docsDir: string;
  // 索引文件输出路径
  indexFile: string;
  // 搜索结果最大数量
  maxResults: number;
  // 搜索的最小字符数
  minSearchLength: number;
}

const DEFAULT_OPTIONS: LocalSearchPluginOptions = {
  docsDir: 'docs',
  indexFile: 'search-index.json',
  maxResults: 20,
  minSearchLength: 2,
};

const pluginOptionsSchema = Joi.object({
  docsDir: Joi.string().default(DEFAULT_OPTIONS.docsDir),
  indexFile: Joi.string().default(DEFAULT_OPTIONS.indexFile),
  maxResults: Joi.number().default(DEFAULT_OPTIONS.maxResults),
  minSearchLength: Joi.number().default(DEFAULT_OPTIONS.minSearchLength),
}).unknown(true); // 允许未知字段，如 Docusaurus 自动添加的 id

export default function localSearchPlugin(
  context: any,
  options: Partial<LocalSearchPluginOptions>
): Plugin {
  const {siteDir, generatedFilesDir} = context;
  const opts = {...DEFAULT_OPTIONS, ...options};
  
  // 验证配置
  const {error, value} = pluginOptionsSchema.validate(opts);
  if (error) {
    console.warn(`Local search plugin validation warning: ${error.message}`);
  }

  const finalOptions = (value || opts) as LocalSearchPluginOptions;
  const docsPath = path.resolve(siteDir, finalOptions.docsDir);

  return {
    name: 'local-search-plugin',
    
    async loadContent() {
      try {
        // 构建搜索索引
        return await buildSearchIndex(docsPath, finalOptions);
      } catch (error) {
        console.warn('Failed to build search index:', error);
        return [];
      }
    },

    async contentLoaded({content, actions}) {
      try {
        const {createData} = actions;
        
        // 保存搜索索引到生成的文件中
        await createData('search-index.json', JSON.stringify(content, null, 2));
        
        // 同时复制到公共目录，以便客户端可以直接访问
        const publicDir = path.join(siteDir, 'public');
        const publicIndexPath = path.join(publicDir, 'search-index.json');
        
        // 确保公共目录存在
        if (!await fs.pathExists(publicDir)) {
          await fs.mkdir(publicDir, {recursive: true});
        }
        
        // 复制搜索索引到公共目录
        await fs.writeFile(publicIndexPath, JSON.stringify(content, null, 2));
        console.log(`Search index copied to public directory: ${publicIndexPath}`);
      } catch (error) {
        console.warn('Failed to save search index:', error);
      }
    },

    getClientModules() {
      return [path.resolve(__dirname, 'client-module.tsx')];
    },
  };
}

/**
 * 构建搜索索引
 */
async function buildSearchIndex(docsPath: string, options: LocalSearchPluginOptions) {
  const searchIndex: SearchIndexItem[] = [];
  
  if (!await fs.pathExists(docsPath)) {
    console.warn(`Docs directory not found: ${docsPath}`);
    return searchIndex;
  }

  // 递归扫描文档目录
  await scanDirectory(docsPath, '', searchIndex, options);
  
  console.log(`Local search index built with ${searchIndex.length} items`);
  return searchIndex;
}

/**
 * 递归扫描目录
 */
async function scanDirectory(
  dirPath: string, 
  relativePath: string, 
  searchIndex: SearchIndexItem[], 
  options: LocalSearchPluginOptions
) {
  const items = await fs.readdir(dirPath);
  
  for (const item of items) {
    const itemPath = path.join(dirPath, item);
    const itemRelativePath = path.join(relativePath, item);
    const stat = await fs.stat(itemPath);
    
    if (stat.isDirectory()) {
      // 递归扫描子目录
      await scanDirectory(itemPath, itemRelativePath, searchIndex, options);
    } else if (item.endsWith('.mdx') || item.endsWith('.md')) {
      // 处理 Markdown 文件
      await processMarkdownFile(itemPath, itemRelativePath, searchIndex, options);
    }
  }
}

/**
 * 处理 Markdown 文件
 */
async function processMarkdownFile(
  filePath: string, 
  relativePath: string, 
  searchIndex: SearchIndexItem[], 
  options: LocalSearchPluginOptions
) {
  try {
    const content = await fs.readFile(filePath, 'utf-8');
    const {data: frontMatter, content: markdownContent} = matter(content);
    
    // 提取文档信息
    const title = frontMatter.title || extractTitleFromContent(markdownContent);
    const description = frontMatter.description || '';
    const id = frontMatter.id || path.basename(relativePath, path.extname(relativePath));
    
    // 清理 Markdown 内容用于搜索
    const cleanContent = cleanMarkdownContent(markdownContent);
    
    // 生成搜索关键词
    const keywords = generateKeywords(title, description, cleanContent, relativePath);
    
    // 生成 URL 路径
    const url = generateUrl(relativePath);
    
    // 创建搜索索引项
    const searchItem: SearchIndexItem = {
      id,
      title,
      description,
      content: cleanContent,
      keywords,
      url,
      path: relativePath,
      type: determineDocumentType(relativePath),
      category: extractCategory(relativePath),
    };
    
    searchIndex.push(searchItem);
  } catch (error) {
    console.warn(`Failed to process file ${filePath}:`, error);
  }
}

/**
 * 从内容中提取标题
 */
function extractTitleFromContent(content: string): string {
  const lines = content.split('\n');
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith('# ')) {
      return trimmed.substring(2).trim();
    }
  }
  return 'Untitled';
}

/**
 * 清理 Markdown 内容
 */
function cleanMarkdownContent(content: string): string {
  return content
    // 移除 Markdown 语法
    .replace(/#{1,6}\s+/g, '') // 标题
    .replace(/\*\*(.*?)\*\*/g, '$1') // 粗体
    .replace(/\*(.*?)\*/g, '$1') // 斜体
    .replace(/`(.*?)`/g, '$1') // 行内代码
    .replace(/```[\s\S]*?```/g, '') // 代码块
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // 链接
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, '$1') // 图片
    .replace(/^\s*[-*+]\s+/gm, '') // 列表项
    .replace(/^\s*\d+\.\s+/gm, '') // 有序列表
    .replace(/\n+/g, ' ') // 多个换行符替换为空格
    .replace(/\s+/g, ' ') // 多个空格替换为单个空格
    .trim();
}

/**
 * 生成搜索关键词
 */
function generateKeywords(title: string, description: string, content: string, path: string): string[] {
  const keywords = new Set<string>();
  
  // 添加标题关键词
  title.toLowerCase().split(/\s+/).forEach(word => {
    if (word.length >= 2) keywords.add(word);
  });
  
  // 添加描述关键词
  description.toLowerCase().split(/\s+/).forEach(word => {
    if (word.length >= 2) keywords.add(word);
  });
  
  // 添加路径关键词
  path.toLowerCase().split(/[/._-]/).forEach(word => {
    if (word.length >= 2) keywords.add(word);
  });
  
  // 添加内容中的 API 相关关键词
  const apiKeywords = extractApiKeywords(content);
  apiKeywords.forEach(keyword => keywords.add(keyword));
  
  return Array.from(keywords);
}

/**
 * 提取 API 相关关键词
 */
function extractApiKeywords(content: string): string[] {
  const keywords = new Set<string>();
  
  // 提取 API 端点
  const apiEndpoints = content.match(/\/[a-zA-Z0-9\/_-]+/g) || [];
  apiEndpoints.forEach(endpoint => {
    const parts = endpoint.split('/').filter(part => part.length > 0);
    parts.forEach(part => {
      if (part.length >= 2) keywords.add(part);
    });
  });
  
  // 提取 HTTP 方法
  const httpMethods = content.match(/\b(GET|POST|PUT|DELETE|PATCH)\b/g) || [];
  httpMethods.forEach(method => keywords.add(method.toLowerCase()));
  
  // 提取参数名
  const params = content.match(/\b[a-zA-Z_][a-zA-Z0-9_]*\b/g) || [];
  params.forEach(param => {
    if (param.length >= 3 && param.length <= 20) {
      keywords.add(param);
    }
  });
  
  return Array.from(keywords);
}

/**
 * 生成 URL 路径
 */
function generateUrl(relativePath: string): string {
  const pathWithoutExt = relativePath.replace(/\.(mdx?|md)$/, '');
  return `/docs/${pathWithoutExt}`;
}

/**
 * 确定文档类型
 */
function determineDocumentType(relativePath: string): string {
  if (relativePath.includes('futures')) return 'futures';
  if (relativePath.includes('spot')) return 'spot';
  if (relativePath.includes('copy-trading')) return 'copy-trading';
  if (relativePath.includes('margin-spot')) return 'margin-spot';
  if (relativePath.includes('futures-copy')) return 'futures-copy';
  if (relativePath.includes('trading-third-party')) return 'trading-third-party';
  if (relativePath.includes('user-center')) return 'user-center';
  return 'general';
}

/**
 * 提取分类
 */
function extractCategory(relativePath: string): string {
  const parts = relativePath.split('/');
  if (parts.length > 1) {
    return parts[0];
  }
  return 'root';
}

/**
 * 搜索索引项接口
 */
export interface SearchIndexItem {
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
