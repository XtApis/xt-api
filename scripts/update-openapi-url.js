const fs = require('fs');
const path = require('path');

// 目标文件路径
const targetFile = path.resolve(__dirname, '../api-docs/en/contract/biz-quotation.yml');

// 从环境变量获取 Base URL，如果没有则不执行
const newUrl = process.env.API_BASE_URL;

if (!newUrl) {
  console.log('⚠️  未提供 API_BASE_URL 环境变量，跳过 Server URL 更新。');
  process.exit(0); // 正常退出，不阻断流程
}

try {
  let content = fs.readFileSync(targetFile, 'utf8');

  // 使用正则匹配 servers 下的 url 字段
  // 匹配结构:
  // servers:
  //   - url: "..."
  const regex = /(servers:\s*\n\s*-\s*url:\s*)["'].*?["']/;

  if (regex.test(content)) {
    const newContent = content.replace(regex, `$1"${newUrl}"`);
    fs.writeFileSync(targetFile, newContent);
    console.log(`✅  Server URL 已更新为: ${newUrl}`);
    console.log(`📂  文件: ${targetFile}`);
  } else {
    console.warn('⚠️  未在文件中找到符合格式的 servers url 配置，请检查 YAML 格式。');
  }

} catch (err) {
  console.error('❌  更新 OpenAPI URL 失败:', err);
  process.exit(1);
}
