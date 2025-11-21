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

export default function MarginSpot(): JSX.Element {
  return (
    <Layout
      title="Margin Spot Trading"
      description="XT API Margin Spot Trading Documentation">
      <main className="container margin-vert--lg">
        <div className="row">
          <div className="col col--8 col--offset--2">
            <Heading as="h1">
              <Translate>Margin Spot Trading</Translate>
            </Heading>
            <p>
              <Translate>
                Welcome to XT API Margin Spot Trading documentation. Learn how
                to trade with borrowed funds to amplify your trading potential.
              </Translate>
            </p>

            <Heading as="h2">
              <Translate>What is Margin Trading?</Translate>
            </Heading>
            <p>
              <Translate>
                Margin trading allows you to borrow funds to increase your
                trading position size. This can amplify both profits and losses,
                so understanding the risks is crucial.
              </Translate>
            </p>

            <Heading as="h2">
              <Translate>Margin Requirements</Translate>
            </Heading>
            <ul>
              <li>
                <Translate>Initial margin requirements</Translate>
              </li>
              <li>
                <Translate>Maintenance margin levels</Translate>
              </li>
              <li>
                <Translate>Liquidation procedures</Translate>
              </li>
              <li>
                <Translate>Interest rates and fees</Translate>
              </li>
            </ul>

            <Heading as="h2">
              <Translate>Risk Considerations</Translate>
            </Heading>
            <p>
              <Translate>
                Margin trading involves significant risk. Always ensure you have
                sufficient collateral and understand the liquidation process
                before starting.
              </Translate>
            </p>

            <Heading as="h2">
              <Translate>Available Pairs</Translate>
            </Heading>
            <p>
              <Translate>
                Check which trading pairs are available for margin trading and
                their specific requirements.
              </Translate>
            </p>
          </div>
        </div>
      </main>
    </Layout>
  );
}
