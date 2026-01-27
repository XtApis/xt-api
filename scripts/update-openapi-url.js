const fs = require('fs');
const path = require('path');

// 目标文件夹路径
const targetDir = path.resolve(__dirname, '../api-docs/');

// 从环境变量获取 Base URL，如果没有则不执行
const newUrl = process.env.API_BASE_URL;

if (!newUrl) {
  console.log('⚠️  未提供 API_BASE_URL 环境变量，跳过 Server URL 更新。');
  process.exit(0); // 正常退出，不阻断流程
}

// 递归遍历文件夹查找所有 .yml 或 .yaml 文件
function getAllYamlFiles(dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath);

  arrayOfFiles = arrayOfFiles || [];

  files.forEach(function(file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllYamlFiles(dirPath + "/" + file, arrayOfFiles);
    } else {
      if (file.endsWith('.yml') || file.endsWith('.yaml')) {
        arrayOfFiles.push(path.join(dirPath, "/", file));
      }
    }
  });

  return arrayOfFiles;
}

try {
  const files = getAllYamlFiles(targetDir);

  if (files.length === 0) {
    console.log('⚠️  未找到任何 YAML 文件。');
    process.exit(0);
  }

  files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');

    // 使用正则匹配 servers 下的 url 字段
    // 匹配结构:
    // servers:
    //   - url: "..."
    const regex = /(servers:\s*\n\s*-\s*url:\s*)["'].*?["']/;

    if (regex.test(content)) {
      const newContent = content.replace(regex, `$1"${newUrl}"`);
      fs.writeFileSync(file, newContent);
      console.log(`✅  Server URL 已更新为: ${newUrl}`);
      console.log(`📂  文件: ${file}`);
    } 
  });

} catch (err) {
  console.error('❌  更新 OpenAPI URL 失败:', err);
  process.exit(1);
}
