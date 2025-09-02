/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Translate from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

// 删除所有未使用的组件函数

export default function Home(): ReactNode {
  // 自动重定向到 index overview 页面
  if (typeof window !== 'undefined') {
    window.location.replace('/docs/index_overview/overview');
  }

  const {
    siteConfig: {customFields},
  } = useDocusaurusContext();
  const {description} = customFields as {description: string};

  return (
    <Layout title="XT API" description={description}>
      <main>
        <div style={{textAlign: 'center', padding: '2rem'}}>
          <Heading as="h1">
            <Translate>正在跳转到 API 文档...</Translate>
          </Heading>
          <p>
            <Translate>如果没有自动跳转，请</Translate>
            <Link to="/docs/index_overview/overview">
              <Translate>点击这里</Translate>
            </Link>
          </p>
        </div>
      </main>
    </Layout>
  );
}
