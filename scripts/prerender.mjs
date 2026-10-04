// Prerendering step: visits every real route of the already-built SPA in headless Chrome,
// waits for React to render (including each page's useSEO/useJsonLd effects, which set the
// real per-page title/meta/canonical/OG/JSON-LD), and writes the resulting full HTML to
// dist/<route>/index.html.
//
// Why this exists: this is a client-rendered React SPA (createRoot, not hydrateRoot — see
// src/main.tsx) with no SSR. Without this step, dist/index.html is one empty <div id="root">
// shell reused for every URL, and any crawler that doesn't execute JavaScript (a meaningful
// share of AI crawlers — GPTBot, ClaudeBot, PerplexityBot don't reliably run JS) sees nothing
// but that empty shell and one static, generic meta description, for every single page. This
// is the single biggest lever for AI-search visibility specifically — bigger than any content
// or schema change. Because createRoot discards existing DOM content rather than hydrating it,
// shipping real prerendered HTML here is purely additive for real visitors: they get the
// prerendered page for an instant, then React mounts fresh over it exactly as before.
//
// Routes come from the same two sources as generate-sitemap.js (the static list + blogPosts.json)
// plus the two noindex-but-real pages (get-started, links), which still deserve real content for
// direct visits and social-card unfurls even though they're excluded from the sitemap.

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import blogPosts from '../src/data/blogPosts.json' with { type: 'json' };

// Vercel's build image doesn't have the shared libraries puppeteer's bundled Chrome needs
// (libnspr4.so etc. are missing), so on Vercel we launch a Linux binary built for serverless/CI
// instead (@sparticuz/chromium) via puppeteer-core. Locally, puppeteer's own bundled Chrome
// works fine and is simpler, so we only pull in the serverless path when actually on Vercel.
const browserLauncher = process.env.VERCEL
  ? (await import('puppeteer-core'))
  : (await import('puppeteer'));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DIST_DIR = path.join(__dirname, '../dist');
const PORT = 4321;

const STATIC_ROUTES = [
  '/',
  '/pricing',
  '/blog',
  '/construction-estimating-software',
  '/construction-quoting-software',
  '/roast-my-quote',
  '/contact',
  '/privacy-policy',
  '/terms-of-service',
  '/get-started',
  '/links',
];

const routes = [
  ...STATIC_ROUTES,
  ...blogPosts.map((p) => `/blog/${p.slug}`),
];

function outputPathFor(route) {
  if (route === '/') return path.join(DIST_DIR, 'index.html');
  return path.join(DIST_DIR, route.replace(/^\//, ''), 'index.html');
}

async function main() {
  if (!fs.existsSync(DIST_DIR)) {
    console.error('❌ dist/ not found — run `vite build` before prerendering.');
    process.exit(1);
  }

  const app = express();
  app.use(express.static(DIST_DIR));
  // SPA fallback for the server itself, not used for output generation, just so client-side
  // routes resolve correctly while puppeteer is crawling them.
  app.get('*', (_req, res) => res.sendFile(path.join(DIST_DIR, 'index.html')));
  const server = app.listen(PORT);

  const browser = process.env.VERCEL
    ? await (async () => {
        const chromium = (await import('@sparticuz/chromium')).default;
        return browserLauncher.default.launch({
          args: chromium.args,
          executablePath: await chromium.executablePath(),
          headless: true,
        });
      })()
    : await browserLauncher.default.launch({ headless: true });
  let ok = 0;
  let failed = 0;

  for (const route of routes) {
    const page = await browser.newPage();
    try {
      await page.goto(`http://localhost:${PORT}${route}`, { waitUntil: 'networkidle0', timeout: 30000 });
      // Belt-and-braces: confirm the SEO effect actually ran (title changed from the raw
      // index.html default) before trusting the snapshot, rather than assuming networkidle0
      // means React finished.
      await page.waitForFunction(
        () => document.title && document.title.length > 0 && !!document.querySelector('meta[name="description"]'),
        { timeout: 10000 }
      );
      const html = await page.content();

      const outPath = outputPathFor(route);
      fs.mkdirSync(path.dirname(outPath), { recursive: true });
      fs.writeFileSync(outPath, html);
      ok++;
      console.log(`  ✓ ${route}`);
    } catch (err) {
      failed++;
      console.error(`  ✗ ${route} — ${err.message}`);
    } finally {
      await page.close();
    }
  }

  await browser.close();
  server.close();

  console.log(`✅ Prerendered ${ok}/${routes.length} routes${failed ? ` (${failed} failed)` : ''}`);
  if (failed > 0) process.exit(1);
}

main();
