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

export default function Spot(): JSX.Element {
  return (
    <Layout
      title="Spot Trading"
      description="XT API Spot Trading Documentation">
      <main className="container margin-vert--lg">
        <div className="row">
          <div className="col col--8 col--offset--2">
            <Heading as="h1">
              <Translate>Spot Trading</Translate>
            </Heading>
            <p>
              <Translate>
                Welcome to XT API Spot Trading documentation. Learn how to trade
                cryptocurrencies directly with real-time market execution.
              </Translate>
            </p>

            <Heading as="h2">
              <Translate>Spot Trading Features</Translate>
            </Heading>
            <p>
              <Translate>
                Our spot trading platform allows you to buy and sell
                cryptocurrencies at current market prices with instant
                settlement.
              </Translate>
            </p>

            <Heading as="h2">
              <Translate>Available Markets</Translate>
            </Heading>
            <ul>
              <li>
                <Translate>Major cryptocurrency pairs</Translate>
              </li>
              <li>
                <Translate>Real-time price feeds</Translate>
              </li>
              <li>
                <Translate>Advanced order types</Translate>
              </li>
              <li>
                <Translate>Instant settlement</Translate>
              </li>
              <li>
                <Translate>Low trading fees</Translate>
              </li>
            </ul>

            <Heading as="h2">
              <Translate>Getting Started</Translate>
            </Heading>
            <p>
              <Translate>
                Start trading by depositing funds, selecting a trading pair, and
                placing your first buy or sell order.
              </Translate>
            </p>
          </div>
        </div>
      </main>
    </Layout>
  );
}
