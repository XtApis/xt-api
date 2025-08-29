/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import Translate from '@docusaurus/Translate';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

export default function CopyTrading(): JSX.Element {
  return (
    <Layout
      title="Copy Trading"
      description="XT API Copy Trading Documentation">
      <main className="container margin-vert--lg">
        <div className="row">
          <div className="col col--8 col--offset--2">
            <Heading as="h1">
              <Translate>Copy Trading</Translate>
            </Heading>
            <p>
              <Translate>
                Welcome to XT API Copy Trading documentation. Learn how to
                automatically copy the trades of successful traders and
                potentially improve your returns.
              </Translate>
            </p>

            <Heading as="h2">
              <Translate>How Copy Trading Works</Translate>
            </Heading>
            <p>
              <Translate>
                Copy trading allows you to automatically replicate the trading
                activities of experienced traders. When they place a trade, the
                same trade is executed in your account proportionally.
              </Translate>
            </p>

            <Heading as="h2">
              <Translate>Benefits</Translate>
            </Heading>
            <ul>
              <li>
                <Translate>Learn from experienced traders</Translate>
              </li>
              <li>
                <Translate>Automated trading execution</Translate>
              </li>
              <li>
                <Translate>
                  Diversification across multiple strategies
                </Translate>
              </li>
              <li>
                <Translate>Time-saving automation</Translate>
              </li>
              <li>
                <Translate>Risk management tools</Translate>
              </li>
            </ul>

            <Heading as="h2">
              <Translate>Getting Started</Translate>
            </Heading>
            <p>
              <Translate>
                Choose from our verified traders, set your copy amount, and
                start copying trades automatically. You can stop copying at any
                time.
              </Translate>
            </p>

            <Heading as="h2">
              <Translate>Risk Management</Translate>
            </Heading>
            <p>
              <Translate>
                Set stop-loss levels and maximum copy amounts to protect your
                capital while participating in copy trading.
              </Translate>
            </p>
          </div>
        </div>
      </main>
    </Layout>
  );
}
