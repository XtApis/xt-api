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

export default function Futures(): JSX.Element {
  return (
    <Layout
      title="Futures Trading"
      description="XT API Futures Trading Documentation">
      <main className="container margin-vert--lg">
        <div className="row">
          <div className="col col--8 col--offset--2">
            <Heading as="h1">
              <Translate>Futures Trading</Translate>
            </Heading>
            <p>
              <Translate>
                Welcome to XT API Futures Trading documentation. Learn how to
                trade futures contracts with leverage and advanced order types.
              </Translate>
            </p>

            <Heading as="h2">
              <Translate>Futures Trading Features</Translate>
            </Heading>
            <p>
              <Translate>
                Our futures trading platform provides access to perpetual
                contracts with up to 125x leverage for advanced traders.
              </Translate>
            </p>

            <Heading as="h2">
              <Translate>Available Instruments</Translate>
            </Heading>
            <ul>
              <li>
                <Translate>Perpetual contracts</Translate>
              </li>
              <li>
                <Translate>High leverage options</Translate>
              </li>
              <li>
                <Translate>Advanced order types</Translate>
              </li>
              <li>
                <Translate>Real-time market data</Translate>
              </li>
              <li>
                <Translate>Risk management tools</Translate>
              </li>
            </ul>

            <Heading as="h2">
              <Translate>Risk Management</Translate>
            </Heading>
            <p>
              <Translate>
                Use stop-loss orders and position sizing to manage risk when
                trading futures with leverage.
              </Translate>
            </p>
          </div>
        </div>
      </main>
    </Layout>
  );
}
