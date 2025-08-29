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

export default function UserCenter(): JSX.Element {
  return (
    <Layout title="User Center" description="XT API User Center Documentation">
      <main className="container margin-vert--lg">
        <div className="row">
          <div className="col col--8 col--offset--2">
            <Heading as="h1">
              <Translate>User Center</Translate>
            </Heading>
            <p>
              <Translate>
                Welcome to XT API User Center. Manage your account settings, API
                keys, and trading preferences.
              </Translate>
            </p>

            <Heading as="h2">
              <Translate>Account Management</Translate>
            </Heading>
            <p>
              <Translate>
                Access your account information, update personal details, and
                manage security settings.
              </Translate>
            </p>

            <Heading as="h2">
              <Translate>API Key Management</Translate>
            </Heading>
            <ul>
              <li>
                <Translate>Create new API keys</Translate>
              </li>
              <li>
                <Translate>Manage permissions</Translate>
              </li>
              <li>
                <Translate>Monitor usage</Translate>
              </li>
              <li>
                <Translate>Security settings</Translate>
              </li>
            </ul>

            <Heading as="h2">
              <Translate>Trading Preferences</Translate>
            </Heading>
            <p>
              <Translate>
                Customize your trading experience with personalized settings and
                default configurations.
              </Translate>
            </p>

            <Heading as="h2">
              <Translate>Support & Help</Translate>
            </Heading>
            <p>
              <Translate>
                Get help with your account, API usage, or trading questions
                through our support channels.
              </Translate>
            </p>
          </div>
        </div>
      </main>
    </Layout>
  );
}
