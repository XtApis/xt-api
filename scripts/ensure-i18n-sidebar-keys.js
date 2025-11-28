#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

function slugify(s) {
  // Preserve Unicode characters (Chinese) so we don't produce empty slugs.
  return String(s)
    .trim()
    .replace(/\s+/g, '-')
    .replace(/["'`\\/]+/g, '')
    .replace(/\-+/g, '-')
    .replace(/^\-+|\-+$/g, '')
    .slice(0, 60);
}

function findSidebarFiles(root) {
  const results = [];
  function walk(dir) {
    let entries;
    try {
      entries = fs.readdirSync(dir, { withFileTypes: true });
    } catch (e) {
      return;
    }
    for (const e of entries) {
      const full = path.join(dir, e.name);
      if (e.isDirectory()) walk(full);
      else if (e.isFile() && e.name === 'sidebar.ts') results.push(full);
    }
  }
  if (fs.existsSync(root)) walk(root);
  return results;
}

function processFile(file) {
  let content = fs.readFileSync(file, 'utf8');
  const prefix = path.basename(path.dirname(file)); // e.g. 'contract' or 'user'
  let changed = false;
  let counter = 0;

  // Inject keys for categories
  const catRegex = /type:\s*"category"/g;
  let m;
  while ((m = catRegex.exec(content)) !== null) {
    const startPos = m.index;
    const look = content.slice(startPos, startPos + 1200);
    const labelMatch = /label:\s*"([^"]+)",/.exec(look);
    if (!labelMatch) continue;
    const label = labelMatch[1];
    const labelRelIndex = labelMatch.index;
    const absLabelIndex = startPos + labelRelIndex;
    const afterLabelIndex = absLabelIndex + labelMatch[0].length;

    // Check for existing key within the nearby object
    const objectChunk = content.slice(startPos, startPos + 1200);
    if (/\bkey:\s*['\"]/.test(objectChunk)) continue;

    counter += 1;
    const key = `${prefix}-${slugify(label) || String(counter)}`;
    const insertion = `\n      key: "${key}",`;

    // Insert after the label line
    content = content.slice(0, afterLabelIndex) + insertion + content.slice(afterLabelIndex);
    changed = true;

    // advance regex lastIndex to avoid infinite loops (skip past insertion)
    catRegex.lastIndex = afterLabelIndex + insertion.length;
  }

  // Inject keys for doc items (to avoid duplicate doc labels)
  const docRegex = /type:\s*"doc"/g;
  while ((m = docRegex.exec(content)) !== null) {
    const startPos = m.index;
    const look = content.slice(startPos, startPos + 400);
    const idMatch = /id:\s*"([^"]+)"/.exec(look);
    if (!idMatch) continue;
    const id = idMatch[1];

    // Check if a key already exists nearby
    const objectChunk = content.slice(startPos, startPos + 400);
    if (/\bkey:\s*['\"]/.test(objectChunk)) continue;

    // Build a key using parent folder and basename from id
    const parts = id.split('/');
    const basename = parts[parts.length - 1] || id;
    const parent = parts.length >= 2 ? parts[parts.length - 2] : prefix;
    const key = `${parent}-${slugify(basename)}`;

    // Find insertion point: after the id line
    const idRelIndex = look.indexOf(idMatch[0]);
    const absIdIndex = startPos + idRelIndex + idMatch[0].length;
    const insertion = `\n          key: "${key}",`;

    content = content.slice(0, absIdIndex) + insertion + content.slice(absIdIndex);
    changed = true;

    // advance regex lastIndex to skip past our insertion
    docRegex.lastIndex = absIdIndex + insertion.length;
  }

  if (changed) {
    fs.writeFileSync(file, content, 'utf8');
    console.log('Patched:', file);
  }
  return changed;
}

function main() {
  const root = path.join(process.cwd(), 'i18n', 'zh-CN', 'docusaurus-plugin-content-docs', 'current');
  const files = findSidebarFiles(root);
  if (files.length === 0) {
    console.error('No sidebar.ts files found under', root);
    process.exit(1);
  }
  let any = false;
  for (const f of files) {
    try {
      const changed = processFile(f);
      any = any || changed;
    } catch (e) {
      console.error('Error processing', f, e);
    }
  }
  if (!any) {
    console.log('No changes required (keys already present).');
  } else {
    console.log('Done. Please run a clean build to verify.');
  }
}

if (require.main === module) main();
