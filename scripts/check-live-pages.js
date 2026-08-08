#!/usr/bin/env node

const { execFile } = require("node:child_process");
const { promisify } = require("node:util");

const execFileAsync = promisify(execFile);
const DEFAULT_BASE_URL = "https://doc.xt.com/";
const DEFAULT_CONCURRENCY = 8;
const DEFAULT_TIMEOUT_MS = 30_000;
const DEFAULT_RETRIES = 3;

function parsePositiveInt(value, fallback, name) {
  if (value === undefined) return fallback;
  const parsed = Number.parseInt(value, 10);
  if (!Number.isInteger(parsed) || parsed <= 0) {
    throw new Error(`${name} must be a positive integer`);
  }
  return parsed;
}

function parseArgs(argv) {
  const options = {
    baseUrl: DEFAULT_BASE_URL,
    concurrency: DEFAULT_CONCURRENCY,
    timeoutMs: DEFAULT_TIMEOUT_MS,
    retries: DEFAULT_RETRIES,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    const value = argv[index + 1];
    if (arg === "--base-url") {
      if (!value) throw new Error("--base-url requires a value");
      options.baseUrl = value;
      index += 1;
    } else if (arg === "--concurrency") {
      options.concurrency = parsePositiveInt(value, undefined, "concurrency");
      index += 1;
    } else if (arg === "--timeout-ms") {
      options.timeoutMs = parsePositiveInt(value, undefined, "timeout-ms");
      index += 1;
    } else if (arg === "--retries") {
      options.retries = parsePositiveInt(value, undefined, "retries");
      index += 1;
    } else if (arg === "--help" || arg === "-h") {
      options.help = true;
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }

  options.baseUrl = new URL(options.baseUrl);
  if (!options.baseUrl.pathname.endsWith("/")) options.baseUrl.pathname += "/";
  return options;
}

function printHelp() {
  console.log(`Usage: node scripts/check-live-pages.js [options]

Checks every page listed in the live Docusaurus sitemap.

Options:
  --base-url <url>       Site to check (default: ${DEFAULT_BASE_URL})
  --concurrency <count>  Concurrent requests (default: ${DEFAULT_CONCURRENCY})
  --timeout-ms <ms>      Per-request timeout (default: ${DEFAULT_TIMEOUT_MS})
  --retries <count>      Attempts per page (default: ${DEFAULT_RETRIES})
  -h, --help             Show this help
`);
}

function extractLocations(xml) {
  return [...xml.matchAll(/<loc>\s*([^<]+?)\s*<\/loc>/gi)].map((match) =>
    match[1]
      .replaceAll("&amp;", "&")
      .replaceAll("&lt;", "<")
      .replaceAll("&gt;", ">")
      .trim(),
  );
}

function normalizeToTarget(rawUrl, baseUrl) {
  const source = new URL(rawUrl, baseUrl);
  const target = new URL(baseUrl);
  target.pathname = source.pathname;
  target.search = source.search;
  target.hash = "";
  return target.href;
}

async function fetchWithTimeout(url, timeoutMs) {
  if (process.env.HTTPS_PROXY || process.env.HTTP_PROXY || process.env.ALL_PROXY) {
    const marker = "__XT_DOC_CHECK_METADATA__";
    const { stdout } = await execFileAsync(
      "curl",
      [
        "--silent",
        "--show-error",
        "--location",
        "--max-time",
        String(Math.ceil(timeoutMs / 1000)),
        "--user-agent",
        "XT-Docs-Live-Page-Checker/1.0",
        "--write-out",
        `\\n${marker}%{http_code}|%{url_effective}|%{content_type}`,
        url,
      ],
      { encoding: "utf8", maxBuffer: 20 * 1024 * 1024 },
    );
    const markerIndex = stdout.lastIndexOf(`\n${marker}`);
    if (markerIndex === -1) throw new Error("curl returned no response metadata");
    const body = stdout.slice(0, markerIndex);
    const [statusText, finalUrl, contentType] = stdout
      .slice(markerIndex + marker.length + 1)
      .split("|");
    const status = Number.parseInt(statusText, 10);
    return {
      ok: status >= 200 && status < 300,
      status,
      url: finalUrl,
      headers: { get: (name) => (name.toLowerCase() === "content-type" ? contentType : null) },
      text: async () => body,
    };
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, {
      redirect: "follow",
      signal: controller.signal,
      headers: {
        accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "user-agent": "XT-Docs-Live-Page-Checker/1.0",
      },
    });
  } finally {
    clearTimeout(timer);
  }
}

async function checkPage(url, options) {
  let lastError;
  const startedAt = Date.now();

  for (let attempt = 1; attempt <= options.retries; attempt += 1) {
    try {
      const response = await fetchWithTimeout(url, options.timeoutMs);
      const body = await response.text();
      const contentType = response.headers.get("content-type") || "";
      const looksLikeHtml = /text\/html|application\/xhtml\+xml/i.test(contentType);
      const hasHtmlDocument = /<html(?:\s|>)/i.test(body);
      const looksLike404 = /<title>[^<]*(?:404|page not found)[^<]*<\/title>/i.test(body);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      if (!looksLikeHtml || !hasHtmlDocument) {
        throw new Error(`unexpected content type: ${contentType || "missing"}`);
      }
      if (looksLike404) {
        throw new Error("page body looks like a 404 page");
      }

      return {
        ok: true,
        url,
        finalUrl: response.url,
        status: response.status,
        durationMs: Date.now() - startedAt,
      };
    } catch (error) {
      const detail = error?.stderr?.trim();
      lastError = detail ? new Error(detail) : error?.cause || error;
      if (attempt < options.retries) {
        await new Promise((resolve) => setTimeout(resolve, 250 * attempt));
      }
    }
  }

  return {
    ok: false,
    url,
    error: lastError instanceof Error ? lastError.message : String(lastError),
    durationMs: Date.now() - startedAt,
  };
}

async function mapConcurrent(items, concurrency, worker) {
  const results = new Array(items.length);
  let nextIndex = 0;

  async function runWorker() {
    while (true) {
      const index = nextIndex;
      nextIndex += 1;
      if (index >= items.length) return;
      results[index] = await worker(items[index], index);
    }
  }

  await Promise.all(
    Array.from({ length: Math.min(concurrency, items.length) }, () => runWorker()),
  );
  return results;
}

async function loadSitemapUrls(options) {
  const sitemapUrl = new URL("sitemap.xml", options.baseUrl).href;
  const response = await fetchWithTimeout(sitemapUrl, options.timeoutMs);
  if (!response.ok) throw new Error(`Sitemap returned HTTP ${response.status}: ${sitemapUrl}`);
  const xml = await response.text();
  const locations = extractLocations(xml);
  if (locations.length === 0) throw new Error(`No <loc> entries found in ${sitemapUrl}`);

  return [...new Set([
    options.baseUrl.href,
    ...locations.map((url) => normalizeToTarget(url, options.baseUrl)),
  ])].sort();
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  if (options.help) {
    printHelp();
    return;
  }

  console.log(`Loading sitemap from ${new URL("sitemap.xml", options.baseUrl).href}`);
  const urls = await loadSitemapUrls(options);
  console.log(`Checking ${urls.length} pages on ${options.baseUrl.origin}...`);

  let completed = 0;
  const results = await mapConcurrent(urls, options.concurrency, async (url) => {
    const result = await checkPage(url, options);
    completed += 1;
    if (!result.ok) console.error(`FAIL ${url} (${result.error})`);
    if (completed % 100 === 0 || completed === urls.length) {
      console.log(`Progress: ${completed}/${urls.length}`);
    }
    return result;
  });

  const failures = results.filter((result) => !result.ok);
  const redirects = results.filter(
    (result) => result.ok && new URL(result.finalUrl).href !== new URL(result.url).href,
  );
  const slowest = results
    .filter((result) => result.ok)
    .sort((a, b) => b.durationMs - a.durationMs)
    .slice(0, 5);

  console.log(`\nPages checked: ${results.length}`);
  console.log(`Passed: ${results.length - failures.length}`);
  console.log(`Failed: ${failures.length}`);
  console.log(`Redirected: ${redirects.length}`);
  console.log("Slowest pages:");
  for (const result of slowest) console.log(`  ${result.durationMs}ms ${result.url}`);

  if (failures.length > 0) {
    console.error("\nFailed pages:");
    for (const failure of failures) console.error(`  ${failure.url} - ${failure.error}`);
    process.exitCode = 1;
  } else {
    console.log("\nOK: every sitemap page is accessible.");
  }
}

main().catch((error) => {
  console.error(`Live page check failed: ${error instanceof Error ? error.message : error}`);
  process.exitCode = 1;
});
