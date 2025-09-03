const { algoliasearch } = require('algoliasearch');

const client = algoliasearch('GHKOVREISY', 'a93fbf3ab1a21a9096793fda3bf8faa9');
const indexName = 'xt_api_docs';

async function testUrls() {
  try {
    const { results } = await client.search({
      requests: [{
        indexName,
        query: 'api',
        hitsPerPage: 5
      }]
    });
    
    console.log('搜索结果：');
    results[0].hits.forEach((hit, index) => {
      console.log(`${index + 1}. URL: "${hit.url}"`);
      console.log(`   ObjectID: "${hit.objectID}"`);
      console.log(`   Title: "${hit.hierarchy?.lvl1 || 'N/A'}"`);
      
      // 测试 URL 是否有效
      try {
        new URL(hit.url, 'http://localhost:3000');
        console.log('   ✅ URL 格式正确');
      } catch (e) {
        console.log(`   ❌ URL 格式错误: ${e.message}`);
      }
      console.log('');
    });
    
  } catch (error) {
    console.error('搜索失败:', error);
  }
}

testUrls();
