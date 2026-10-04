// Generates sitemap.xml from the actual current routes, the same way generate-rss.js builds
// feed.xml from blogPosts.json — so the sitemap can't drift out of sync with the real site
// again the way the old hand-written one did (it still listed /trades, /testimonials and
// three blog posts that don't exist any more, by the time this was written).

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BLOG_POSTS_PATH = path.join(__dirname, '../src/data/blogPosts.json');
const PUBLIC_DIR = path.join(__dirname, '../public');
const DIST_DIR = path.join(__dirname, '../dist');
const SITE_URL = 'https://pricem8.uk';

// Every real, indexable, static route. Keep in sync with src/App.tsx — redirect-only routes
// (/about, /features, /trades, /testimonials, /real-data, /offer*, /lp/*) and noindex pages
// (/get-started, /links) are deliberately excluded.
const STATIC_ROUTES = [
    { path: '/', changefreq: 'weekly', priority: '1.0' },
    { path: '/pricing', changefreq: 'monthly', priority: '0.9' },
    { path: '/blog', changefreq: 'weekly', priority: '0.8' },
    { path: '/construction-estimating-software', changefreq: 'monthly', priority: '0.7' },
    { path: '/construction-quoting-software', changefreq: 'monthly', priority: '0.7' },
    { path: '/roast-my-quote', changefreq: 'monthly', priority: '0.6' },
    { path: '/contact', changefreq: 'monthly', priority: '0.5' },
    { path: '/privacy-policy', changefreq: 'yearly', priority: '0.3' },
    { path: '/terms-of-service', changefreq: 'yearly', priority: '0.3' },
];

const urlEntry = ({ path: p, changefreq, priority, lastmod }) => `  <url>
    <loc>${SITE_URL}${p}</loc>
${lastmod ? `    <lastmod>${lastmod}</lastmod>\n` : ''}    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;

try {
    const posts = JSON.parse(fs.readFileSync(BLOG_POSTS_PATH, 'utf8'));

    const blogEntries = posts.map((post) => urlEntry({
        path: `/blog/${post.slug}`,
        changefreq: 'monthly',
        priority: '0.7',
        lastmod: post.date,
    }));

    const staticEntries = STATIC_ROUTES.map(urlEntry);

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Static pages -->
${staticEntries.join('\n')}

  <!-- Blog posts -->
${blogEntries.join('\n')}
</urlset>
`;

    fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap.xml'), sitemap);
    console.log(`✅ Sitemap generated in public/sitemap.xml (${STATIC_ROUTES.length} static + ${posts.length} blog URLs)`);

    if (fs.existsSync(DIST_DIR)) {
        fs.writeFileSync(path.join(DIST_DIR, 'sitemap.xml'), sitemap);
        console.log('✅ Sitemap copied to dist/sitemap.xml');
    }
} catch (error) {
    console.error('❌ Error generating sitemap:', error);
    process.exit(1);
}
