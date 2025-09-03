const { algoliasearch } = require('algoliasearch');

const client = algoliasearch('GHKOVREISY', 'a93fbf3ab1a21a9096793fda3bf8faa9');
const indexName = 'xt_api_docs';

async function testDocusaurusSearch() {
  try {
    console.log('🔍 测试 Docusaurus 搜索请求...');
    
    // 模拟 Docusaurus 发送的搜索请求
    const { results } = await client.search({
      requests: [{
        indexName,
        query: 'api',
        attributesToRetrieve: [
          'hierarchy.lvl0',
          'hierarchy.lvl1', 
          'hierarchy.lvl2',
          'hierarchy.lvl3',
          'hierarchy.lvl4',
          'hierarchy.lvl5',
          'hierarchy.lvl6',
          'content',
          'type',
          'url'
        ],
        attributesToSnippet: [
          'hierarchy.lvl1:10',
          'hierarchy.lvl2:10', 
          'hierarchy.lvl3:10',
          'hierarchy.lvl4:10',
          'hierarchy.lvl5:10',
          'hierarchy.lvl6:10',
          'content:10'
        ],
        snippetEllipsisText: '…',
        highlightPreTag: '<mark>',
        highlightPostTag: '</mark>',
        hitsPerPage: 20,
        clickAnalytics: false,
        // 先不添加 facetFilters，看看是否能搜到结果
        // facetFilters: [
        //   'language:en',
        //   ['docusaurus_tag:default', 'docusaurus_tag:docs-default-current', 'docusaurus_tag:docs-community-current', 'docusaurus_tag:docs-docs-tests-current']
        // ]
      }]
    });
    
    console.log(`📊 搜索结果数量: ${results[0].hits.length}`);
    
    if (results[0].hits.length > 0) {
      console.log('✅ 找到搜索结果:');
      results[0].hits.slice(0, 3).forEach((hit, index) => {
        console.log(`${index + 1}. ${hit.hierarchy?.lvl1 || hit.objectID}`);
        console.log(`   URL: ${hit.url}`);
        console.log(`   Content: ${hit.content?.substring(0, 100)}...`);
        console.log('');
      });
    } else {
      console.log('❌ 没有找到搜索结果');
      
      // 尝试不带任何过滤器的简单搜索
      console.log('\n🔍 尝试简单搜索...');
      const simpleResult = await client.search({
        requests: [{
          indexName,
          query: 'api',
          hitsPerPage: 5
        }]
      });
      
      console.log(`📊 简单搜索结果数量: ${simpleResult.results[0].hits.length}`);
      if (simpleResult.results[0].hits.length > 0) {
        console.log('✅ 简单搜索有结果，问题可能在于过滤器或属性配置');
      }
    }
    
  } catch (error) {
    console.error('❌ 搜索失败:', error);
  }
}

testDocusaurusSearch();
