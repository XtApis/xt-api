import type { SidebarsConfig, SidebarItem } from '@docusaurus/plugin-content-docs';
import userSidebar from './api_docs/user/sidebar';
import contractSidebar from './api_docs/contract/sidebar';

function slugify(s: string) {
  // Keep Unicode (e.g. Chinese) characters to avoid empty slugs.
  return String(s || '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/["'`\\/]+/g, '')
    .replace(/\-+/g, '-')
    .replace(/^\-+|\-+$/g, '')
    .slice(0, 60);
}

function ensureKeys(items: any[], prefix: string) {
  if (!Array.isArray(items)) return items;
  for (const it of items) {
    if (!it || typeof it !== 'object') continue;
    if (it.type === 'category') {
      if (!it.key) {
        const label = it.label || 'category';
        it.key = `${prefix}-${slugify(label)}`;
      }
      if (Array.isArray(it.items)) ensureKeys(it.items, `${prefix}-${slugify(String(it.label || ''))}`);
    } else if (it.type === 'doc') {
      if (!it.key) {
        const id = it.id || (typeof it === 'string' ? it : undefined) || 'doc';
        const parts = String(id).split('/');
        const basename = parts[parts.length - 1] || id;
        const parent = parts.length >= 2 ? parts[parts.length - 2] : prefix;
        it.key = `${parent}-${slugify(basename)}`;
      }
    } else if (Array.isArray((it as any).items)) {
      ensureKeys((it as any).items, prefix);
    }
  }
}

// Support generator output that either exports the full object
// `{ apisidebar: [...] }` or directly exports the array `[...]`.
const userItems = Array.isArray(userSidebar) ? userSidebar : userSidebar?.apisidebar || [];
const contractItems = Array.isArray(contractSidebar) ? contractSidebar : contractSidebar?.apisidebar || [];

ensureKeys(userItems, 'user');
ensureKeys(contractItems, 'contract');

const sidebars: SidebarsConfig = {
  api: [
    {
      type: 'category',
      label: 'User',
      items: userItems,
      ...(userItems.length === 0 ? { link: { type: 'doc', id: 'user/api.user' } } : {}),
    },
    {
      type: 'category',
      label: 'Contract',
      items: contractItems,
      ...(contractItems.length === 0 ? { link: { type: 'doc', id: 'contract/api.contract' } } : {}),
    },
  ],
};

export default sidebars;
