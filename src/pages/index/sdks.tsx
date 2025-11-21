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

export default function SDKs(): JSX.Element {
  return (
    <Layout
      title="SDKs & Libraries"
      description="Official and community SDKs for XT API">
      <main className="container margin-vert--lg">
        <div className="row">
          <div className="col col--8 col--offset--2">
            <Heading as="h1">
              <Translate>SDKs & Libraries</Translate>
            </Heading>
            <p>
              <Translate>
                Official and community-maintained SDKs for popular programming
                languages to simplify your XT API integration.
              </Translate>
            </p>

            <Heading as="h2">
              <Translate>Official SDKs</Translate>
            </Heading>
            <p>
              <Translate>
                Our official SDKs provide comprehensive coverage of all API
                endpoints with built-in authentication and error handling.
              </Translate>
            </p>

            <Heading as="h2">
              <Translate>Available Languages</Translate>
            </Heading>
            <ul>
              <li>
                <Translate>Python SDK</Translate>
              </li>
              <li>
                <Translate>JavaScript/Node.js SDK</Translate>
              </li>
              <li>
                <Translate>Java SDK</Translate>
              </li>
              <li>
                <Translate>Go SDK</Translate>
              </li>
            </ul>

            <Heading as="h2">
              <Translate>Community Libraries</Translate>
            </Heading>
            <p>
              <Translate>
                Community-contributed libraries and wrappers for additional
                programming languages and frameworks.
              </Translate>
            </p>

            <Heading as="h2">
              <Translate>Getting Started</Translate>
            </Heading>
            <p>
              <Translate>
                Download and install your preferred SDK, then follow the quick
                start guide to begin development.
              </Translate>
            </p>

            <Heading as="h2">
              <Translate>Documentation</Translate>
            </Heading>
            <p>
              <Translate>
                Each SDK includes comprehensive documentation with examples, API
                reference, and best practices.
              </Translate>
            </p>
          </div>
        </div>
      </main>
    </Layout>
  );
}
