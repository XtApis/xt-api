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

export default function FAQ(): JSX.Element {
  return (
    <Layout title="FAQ" description="Frequently asked questions about XT API">
      <main className="container margin-vert--lg">
        <div className="row">
          <div className="col col--8 col--offset--2">
            <Heading as="h1">
              <Translate>Frequently Asked Questions</Translate>
            </Heading>
            <p>
              <Translate>
                Common questions and answers about XT API integration, trading
                operations, and platform usage.
              </Translate>
            </p>

            <Heading as="h2">
              <Translate>General Questions</Translate>
            </Heading>
            <p>
              <Translate>
                Basic questions about the platform and getting started.
              </Translate>
            </p>

            <Heading as="h2">
              <Translate>API Integration</Translate>
            </Heading>
            <p>
              <Translate>
                Questions about API authentication, rate limits, and integration
                best practices.
              </Translate>
            </p>

            <Heading as="h2">
              <Translate>Trading Operations</Translate>
            </Heading>
            <p>
              <Translate>
                Questions about placing orders, managing positions, and trading
                strategies.
              </Translate>
            </p>

            <Heading as="h2">
              <Translate>Account & Security</Translate>
            </Heading>
            <p>
              <Translate>
                Questions about account management, security features, and API
                key management.
              </Translate>
            </p>

            <Heading as="h2">
              <Translate>Technical Support</Translate>
            </Heading>
            <p>
              <Translate>
                Questions about error handling, troubleshooting, and getting
                technical support.
              </Translate>
            </p>

            <Heading as="h2">
              <Translate>Platform Features</Translate>
            </Heading>
            <p>
              <Translate>
                Questions about specific platform features, trading instruments,
                and available markets.
              </Translate>
            </p>

            <Heading as="h2">
              <Translate>Rate Limits & Performance</Translate>
            </Heading>
            <p>
              <Translate>
                Questions about API rate limits, performance optimization, and
                best practices for high-frequency trading.
              </Translate>
            </p>

            <Heading as="h2">
              <Translate>WebSocket & Real-time Data</Translate>
            </Heading>
            <p>
              <Translate>
                Questions about WebSocket connections, real-time data feeds, and
                streaming market information.
              </Translate>
            </p>
          </div>
        </div>
      </main>
    </Layout>
  );
}
