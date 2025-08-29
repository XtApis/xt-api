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

export default function TradingThirdParty(): JSX.Element {
  return (
    <Layout
      title="Third Party Trading"
      description="XT API Third Party Trading Documentation">
      <main className="container margin-vert--lg">
        <div className="row">
          <div className="col col--8 col--offset--2">
            <Heading as="h1">
              <Translate>Third Party Trading</Translate>
            </Heading>
            <p>
              <Translate>
                Welcome to XT API Third Party Trading documentation. Learn how
                to integrate with third-party trading platforms and services.
              </Translate>
            </p>

            <Heading as="h2">
              <Translate>Integration Options</Translate>
            </Heading>
            <p>
              <Translate>
                Our API supports integration with various third-party trading
                platforms, portfolio managers, and automated trading systems.
              </Translate>
            </p>

            <Heading as="h2">
              <Translate>Supported Platforms</Translate>
            </Heading>
            <ul>
              <li>
                <Translate>TradingView integration</Translate>
              </li>
              <li>
                <Translate>Portfolio management tools</Translate>
              </li>
              <li>
                <Translate>Automated trading bots</Translate>
              </li>
              <li>
                <Translate>Risk management systems</Translate>
              </li>
              <li>
                <Translate>Analytics platforms</Translate>
              </li>
            </ul>

            <Heading as="h2">
              <Translate>API Authentication</Translate>
            </Heading>
            <p>
              <Translate>
                Secure your third-party integrations with API keys and proper
                authentication mechanisms.
              </Translate>
            </p>

            <Heading as="h2">
              <Translate>Getting Started</Translate>
            </Heading>
            <p>
              <Translate>
                Follow our integration guides to connect your preferred
                third-party trading platform with XT API.
              </Translate>
            </p>
          </div>
        </div>
      </main>
    </Layout>
  );
}
