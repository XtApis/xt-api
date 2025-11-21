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

export default function Examples(): JSX.Element {
  return (
    <Layout
      title="Code Examples"
      description="Code examples for XT API integration">
      <main className="container margin-vert--lg">
        <div className="row">
          <div className="col col--8 col--offset--2">
            <Heading as="h1">
              <Translate>Code Examples</Translate>
            </Heading>
            <p>
              <Translate>
                Practical code examples in multiple programming languages to
                help you integrate with XT API quickly.
              </Translate>
            </p>

            <Heading as="h2">
              <Translate>Getting Started Examples</Translate>
            </Heading>
            <p>
              <Translate>
                Basic examples showing how to authenticate, make your first API
                call, and handle responses.
              </Translate>
            </p>

            <Heading as="h2">
              <Translate>Available Languages</Translate>
            </Heading>
            <ul>
              <li>
                <Translate>Python</Translate>
              </li>
              <li>
                <Translate>JavaScript/Node.js</Translate>
              </li>
              <li>
                <Translate>Java</Translate>
              </li>
              <li>
                <Translate>Go</Translate>
              </li>
              <li>
                <Translate>C#</Translate>
              </li>
            </ul>

            <Heading as="h2">
              <Translate>Trading Examples</Translate>
            </Heading>
            <p>
              <Translate>
                Examples for placing orders, managing positions, and
                implementing trading strategies.
              </Translate>
            </p>

            <Heading as="h2">
              <Translate>Advanced Patterns</Translate>
            </Heading>
            <p>
              <Translate>
                Advanced examples including error handling, rate limiting, and
                best practices for production use.
              </Translate>
            </p>
          </div>
        </div>
      </main>
    </Layout>
  );
}
