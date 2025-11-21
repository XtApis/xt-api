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

export default function QuickStart() {
  return (
    <Layout
      title="Quick Start"
      description="Quick start guide for XT API integration"
    >
      <main className="container margin-vert--lg">
        <div className="row">
          <div className="col col--8 col--offset--2">
            <Heading as="h1">
              <Translate>Quick Start Guide</Translate>
            </Heading>
            <p>
              <Translate>
                Get started with XT API in minutes. Follow this guide to set up
                your account and make your first API call.
              </Translate>
            </p>

            <Heading as="h2">
              <Translate>Prerequisites</Translate>
            </Heading>
            <p>
              <Translate>
                Before you begin, ensure you have an XT account and basic
                programming knowledge.
              </Translate>
            </p>

            <Heading as="h2">
              <Translate>Step 1: Create Account</Translate>
            </Heading>
            <p>
              <Translate>
                Sign up for an XT account and complete the verification process
                to access API features.
              </Translate>
            </p>

            <Heading as="h2">
              <Translate>Step 2: Generate API Keys</Translate>
            </Heading>
            <p>
              <Translate>
                Create API keys in your account settings with appropriate
                permissions for your use case.
              </Translate>
            </p>

            <Heading as="h2">
              <Translate>Step 3: Make Your First Call</Translate>
            </Heading>
            <p>
              <Translate>
                Test your API connection with a simple request to get account
                information or market data.
              </Translate>
            </p>

            <IndexNavigation activePage="quick-start" />

            <div className="alert alert--info">
              <strong>Note:</strong> Always test your API integration on our
              testnet before using it on the main network.
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
