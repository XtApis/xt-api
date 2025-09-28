/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const path = require('path');
const fs = require('fs');
const fse = require('fs-extra');
const matter = require('gray-matter');
const {algoliasearch} = require('algoliasearch');

const ROOT = path.join(__dirname, '..');
const DOCS_DIR = path.join(ROOT, 'docs');
const ZH_DOCS_DIR = path.join(
  ROOT,
  'i18n/zh-Hans/docusaurus-plugin-content-docs/current',
);

const APP_ID = process.env.ALGOLIA_APP_ID;
const ADMIN_KEY = process.env.ALGOLIA_ADMIN_API_KEY;
const INDEX_NAME = process.env.ALGOLIA_INDEX_NAME || 'xt_api_docs';

if (!APP_ID || !ADMIN_KEY) {
  console.error('Missing ALGOLIA_APP_ID or ALGOLIA_ADMIN_API_KEY');
  process.exit(1);
}

function walk(dir) {
  const out = [];
  if (!fs.existsSync(dir)) {
    return out;
  }
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    const st = fs.statSync(p);
    if (st.isDirectory()) {
      out.push(...walk(p));
    } else if (/\.(?:md|mdx)$/i.test(p)) {
      out.push(p);
    }
  }
  return out;
}

function buildUrl(file, lang) {
  const base = lang === 'zh-Hans' ? '/zh-Hans/docs/' : '/docs/';
  const rel = (
    lang === 'zh-Hans'
      ? path.relative(ZH_DOCS_DIR, file)
      : path.relative(DOCS_DIR, file)
  )
    .replace(/\\/g, '/')
    .replace(/\.(?:md|mdx)$/i, '');
  // URL encode the path segments to handle spaces and special characters
  const encodedRel = rel
    .split('/')
    .map((segment) => encodeURIComponent(segment))
    .join('/');
  return base + encodedRel;
}

function extractApiPaths(content) {
  const s = new Set();
  const re =
    /\/(?:api|future|futures|spot|user|margin|copy|trading|index)[^\s`"')<>]*/gi;
  for (const m of content.matchAll(re)) {
    s.add(m[0]);
  }
  return Array.from(s);
}

function fileToRecord(file, lang) {
  const raw = fse.readFileSync(file, 'utf8');
  const {data, content} = matter(raw);
  const title =
    data.title || data.sidebar_label || path.basename(file, path.extname(file));
  const keywords = Array.isArray(data.keywords) ? data.keywords : [];
  const url = buildUrl(file, lang);
  const apiPaths = extractApiPaths(content);
  return {
    objectID: `${lang}:${url}`,
    url,
    language: lang,
    title,
    hierarchy: {
      lvl0: data.sidebar_label || title,
      lvl1: data.id || '',
    },
    keywords: Array.from(new Set([...keywords, ...apiPaths])),
    content: content.slice(0, 5000),
    docusaurus_tag: 'docs-default-current',
    type: 'content',
  };
}

function buildAll() {
  const recs = [];
  walk(DOCS_DIR).forEach((f) => recs.push(fileToRecord(f, 'en')));
  walk(ZH_DOCS_DIR).forEach((f) => recs.push(fileToRecord(f, 'zh-Hans')));
  return recs;
}

async function run() {
  const client = algoliasearch(APP_ID, ADMIN_KEY);
  const records = buildAll();
  console.log(`Uploading ${records.length} records to ${INDEX_NAME}...`);

  await client.setSettings({
    indexName: INDEX_NAME,
    indexSettings: {
      searchableAttributes: [
        'unordered(url)',
        'unordered(title)',
        'unordered(keywords)',
        'unordered(hierarchy.lvl0)',
        'unordered(hierarchy.lvl1)',
        'unordered(hierarchy.lvl2)',
        'unordered(hierarchy.lvl3)',
        'unordered(hierarchy.lvl4)',
        'unordered(hierarchy.lvl5)',
        'unordered(hierarchy.lvl6)',
        'unordered(content)',
      ],
      attributesForFaceting: ['language', 'docusaurus_tag', 'type'],
    },
  });

  await client.replaceAllObjects({
    indexName: INDEX_NAME,
    objects: records,
    autoGenerateObjectIDIfNotExist: true,
  });
  console.log('Done');
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
