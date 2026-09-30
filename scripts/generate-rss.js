
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BLOG_POSTS_PATH = path.join(__dirname, '../src/data/blogPosts.json');
const PUBLIC_DIR = path.join(__dirname, '../public');
const DIST_DIR = path.join(__dirname, '../dist');

// Basic RSS 2.0 Template
const generateRSS = (posts) => {
    const siteUrl = 'https://pricem8.uk';

    const items = posts.map(post => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${siteUrl}/blog/${post.slug}</link>
      <guid>${siteUrl}/blog/${post.slug}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <description><![CDATA[${post.excerpt}]]></description>
      <content:encoded><![CDATA[${post.excerpt}]]></content:encoded>
    </item>
  `).join('');

    return `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>PriceM8 Blog</title>
    <link>${siteUrl}</link>
    <description>Tips, guides, and news for UK tradespeople.</description>
    <language>en-gb</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml" />
    ${items}
  </channel>
</rss>`;
};

try {
    const posts = JSON.parse(fs.readFileSync(BLOG_POSTS_PATH, 'utf8'));
    const rss = generateRSS(posts);

    // Write to public so it's copied on build
    fs.writeFileSync(path.join(PUBLIC_DIR, 'feed.xml'), rss);
    console.log('✅ RSS feed generated in public/feed.xml');

    // Also try to write to dist if it exists (for post-build)
    if (fs.existsSync(DIST_DIR)) {
        fs.writeFileSync(path.join(DIST_DIR, 'feed.xml'), rss);
        console.log('✅ RSS feed copied to dist/feed.xml');
    }

} catch (error) {
    console.error('❌ Error generating RSS feed:', error);
    process.exit(1);
}
