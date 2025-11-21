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

export default function IndexPage() {
  return (
    <Layout
      title="XT API Documentation"
      description="Comprehensive documentation for XT API trading platform"
    >
      <main className="container margin-vert--lg">
        <div className="row">
          <div className="col col--8 col--offset--2">
            <Heading as="h1">
              <Translate>Welcome to XT API</Translate>
            </Heading>
            <p>
              <Translate>
                Comprehensive documentation for the XT cryptocurrency trading
                platform API. Learn how to integrate and trade programmatically.
              </Translate>
            </p>

            <Heading as="h2">
              <Translate>Getting Started</Translate>
            </Heading>
            <p>
              <Translate>
                New to XT API? Start here to learn the basics of authentication,
                making your first request, and understanding the platform.
              </Translate>
            </p>

            <Heading as="h2">
              <Translate>Core Features</Translate>
            </Heading>
            <ul>
              <li>
                <Translate>Spot Trading</Translate>
              </li>
              <li>
                <Translate>Futures Trading</Translate>
              </li>
              <li>
                <Translate>Copy Trading</Translate>
              </li>
              <li>
                <Translate>Margin Trading</Translate>
              </li>
              <li>
                <Translate>Real-time Data</Translate>
              </li>
            </ul>

            <Heading as="h2">
              <Translate>API Reference</Translate>
            </Heading>
            <p>
              <Translate>
                Complete API reference with all endpoints, parameters, and
                response formats for every trading operation.
              </Translate>
            </p>

            <Heading as="h2">
              <Translate>Examples</Translate>
            </Heading>
            <p>
              <Translate>
                Practical examples and code samples in multiple programming
                languages to help you get started quickly.
              </Translate>
            </p>

            <Heading as="h2">
              <Translate>SDKs & Libraries</Translate>
            </Heading>
            <p>
              <Translate>
                Official and community-maintained SDKs for popular programming
                languages to simplify your integration.
              </Translate>
            </p>

            <Heading as="h2">
              <Translate>Best Practices</Translate>
            </Heading>
            <p>
              <Translate>
                Learn about rate limiting, error handling, security best
                practices, and performance optimization.
              </Translate>
            </p>

            <Heading as="h2">
              <Translate>Support</Translate>
            </Heading>
            <p>
              <Translate>
                Need help? Find answers in our FAQ, join our community, or
                contact our support team directly.
              </Translate>
            </p>

            <Heading as="h2">
              <Translate>Community</Translate>
            </Heading>
            <p>
              <Translate>
                Connect with other developers, share your projects, and get help
                from the XT API community.
              </Translate>
            </p>

            <Heading as="h2">
              <Translate>Updates & Changelog</Translate>
            </Heading>
            <p>
              <Translate>
                Stay up to date with the latest API changes, new features, and
                important announcements.
              </Translate>
            </p>

            <Heading as="h2">
              <Translate>Migration Guides</Translate>
            </Heading>
            <p>
              <Translate>
                Guides for migrating from older API versions or other platforms
                to XT API.
              </Translate>
            </p>

            <Heading as="h2">
              <Translate>Security</Translate>
            </Heading>
            <p>
              <Translate>
                Learn about API key management, authentication methods, and
                security best practices for your integration.
              </Translate>
            </p>

            <Heading as="h2">
              <Translate>Performance</Translate>
            </Heading>
            <p>
              <Translate>
                Optimize your API usage with performance tips, caching
                strategies, and rate limiting guidelines.
              </Translate>
            </p>

            <Heading as="h2">
              <Translate>Testing</Translate>
            </Heading>
            <p>
              <Translate>
                Test your integration with our sandbox environment and learn
                about testing best practices.
              </Translate>
            </p>

            <Heading as="h2">
              <Translate>Deployment</Translate>
            </Heading>
            <p>
              <Translate>
                Deploy your trading application with confidence using our
                production deployment guidelines.
              </Translate>
            </p>

            <Heading as="h2">
              <Translate>Monitoring</Translate>
            </Heading>
            <p>
              <Translate>
                Monitor your API usage, track performance metrics, and set up
                alerts for your trading application.
              </Translate>
            </p>

            <Heading as="h2">
              <Translate>Troubleshooting</Translate>
            </Heading>
            <p>
              <Translate>
                Common issues and solutions for API integration, authentication,
                and trading operations.
              </Translate>
            </p>

            <Heading as="h2">
              <Translate>FAQ</Translate>
            </Heading>
            <p>
              <Translate>
                Frequently asked questions about XT API, trading operations, and
                common integration scenarios.
              </Translate>
            </p>

            <Heading as="h2">
              <Translate>Glossary</Translate>
            </Heading>
            <p>
              <Translate>
                Definitions and explanations of trading terms, API concepts, and
                platform-specific terminology.
              </Translate>
            </p>
          </div>
        </div>
      </main>
    </Layout>
  );
}
