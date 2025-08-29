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

export default function FuturesCopy(): JSX.Element {
  return (
    <Layout
      title="Futures Copy Trading"
      description="XT API Futures Copy Trading Documentation">
      <main className="container margin-vert--lg">
        <div className="row">
          <div className="col col--8 col--offset--2">
            <Heading as="h1">
              <Translate>Futures Copy Trading</Translate>
            </Heading>
            <p>
              <Translate>
                Welcome to XT API Futures Copy Trading documentation. Copy the
                futures trading strategies of professional traders with
                automated execution.
              </Translate>
            </p>

            <Heading as="h2">
              <Translate>Futures Copy Trading Features</Translate>
            </Heading>
            <p>
              <Translate>
                Our futures copy trading platform allows you to automatically
                replicate the futures trading activities of verified
                professional traders.
              </Translate>
            </p>

            <Heading as="h2">
              <Translate>Advanced Features</Translate>
            </Heading>
            <ul>
              <li>
                <Translate>Leverage copy trading</Translate>
              </li>
              <li>
                <Translate>Real-time position copying</Translate>
              </li>
              <li>
                <Translate>Risk management controls</Translate>
              </li>
              <li>
                <Translate>Performance analytics</Translate>
              </li>
              <li>
                <Translate>Multiple trader selection</Translate>
              </li>
            </ul>

            <Heading as="h2">
              <Translate>Leverage Considerations</Translate>
            </Heading>
            <p>
              <Translate>
                Since futures trading involves leverage, copy trading amplifies
                both potential gains and losses. Ensure you understand the risks
                involved.
              </Translate>
            </p>

            <Heading as="h2">
              <Translate>Available Markets</Translate>
            </Heading>
            <p>
              <Translate>
                Copy trades across various futures markets including perpetual
                contracts for major cryptocurrencies.
              </Translate>
            </p>
          </div>
        </div>
      </main>
    </Layout>
  );
}
