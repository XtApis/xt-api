const { algoliasearch } = require('algoliasearch');

const client = algoliasearch('GHKOVREISY', 'a93fbf3ab1a21a9096793fda3bf8faa9');
const indexName = 'xt_api_docs';

async function testWithFilters() {
  try {
    console.log('🔍 测试带有 facetFilters 的搜索...');
    
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
        facetFilters: [
          'language:en',
          ['docusaurus_tag:default', 'docusaurus_tag:docs-default-current', 'docusaurus_tag:docs-community-current', 'docusaurus_tag:docs-docs-tests-current']
        ]
      }]
    });
    
    console.log(`📊 带过滤器的搜索结果数量: ${results[0].hits.length}`);
    
    if (results[0].hits.length === 0) {
      console.log('❌ 过滤器导致没有结果，让我们检查数据中的 facet 值...');
      
      // 获取一些记录来检查它们的 facet 值
      const { results: allResults } = await client.search({
        requests: [{
          indexName,
          query: '',
          hitsPerPage: 5
        }]
      });
      
      console.log('\n📋 检查现有记录的 facet 值:');
      allResults[0].hits.forEach((hit, index) => {
        console.log(`${index + 1}. ObjectID: ${hit.objectID}`);
        console.log(`   language: ${hit.language}`);
        console.log(`   docusaurus_tag: ${hit.docusaurus_tag}`);
        console.log('');
      });
    } else {
      console.log('✅ 带过滤器的搜索有结果！');
    }
    
  } catch (error) {
    console.error('❌ 搜索失败:', error);
  }
}

testWithFilters();
