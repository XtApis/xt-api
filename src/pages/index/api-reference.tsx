/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from "react";
import Translate from "@docusaurus/Translate";
import Layout from "@theme/Layout";
import Heading from "@theme/Heading";
import IndexNavigation from "@site/src/components/IndexNavigation";

export default function ApiReference() {
  return (
    <Layout
      title="API Reference"
      description="Complete API reference for XT trading platform"
    >
      <main className="container margin-vert--lg">
        <div className="row">
          <div className="col col--8 col--offset--2">
            <Heading as="h1">
              <Translate>API Reference</Translate>
            </Heading>
            <p>
              <Translate>
                Complete reference documentation for all XT API endpoints,
                parameters, and response formats.
              </Translate>
            </p>

            <Heading as="h2">
              <Translate>Authentication</Translate>
            </Heading>
            <p>
              <Translate>
                Learn about API key authentication, signature generation, and
                security best practices.
              </Translate>
            </p>

            <Heading as="h2">
              <Translate>Rate Limits</Translate>
            </Heading>
            <p>
              <Translate>
                Understand rate limiting policies and how to optimize your API
                usage for better performance.
              </Translate>
            </p>

            <Heading as="h2">
              <Translate>Error Codes</Translate>
            </Heading>
            <p>
              <Translate>
                Comprehensive list of error codes and their meanings to help you
                troubleshoot API issues.
              </Translate>
            </p>

            <Heading as="h2">
              <Translate>Endpoints</Translate>
            </Heading>
            <ul>
              <li>
                <Translate>Account & Balance</Translate>
              </li>
              <li>
                <Translate>Trading Operations</Translate>
              </li>
              <li>
                <Translate>Market Data</Translate>
              </li>
              <li>
                <Translate>Order Management</Translate>
              </li>
            </ul>

            <Heading as="h2">
              <Translate>Response Formats</Translate>
            </Heading>
            <p>
              <Translate>
                Standard response format for all API endpoints with consistent
                error handling and data structures.
              </Translate>
            </p>

            <IndexNavigation activePage="api-reference" />

            <div className="alert alert--warning">
              <strong>Important:</strong> Always refer to the latest API
              documentation as endpoints and parameters may be updated.
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
