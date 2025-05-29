/**
 * Script to generate sitemap.xml and robots.txt files
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import functions (we'll need to compile TypeScript or copy the logic)
const staticRoutes = [
  { url: '/', changefreq: 'weekly', priority: 1.0 },
  { url: '/services', changefreq: 'weekly', priority: 0.9 },
  { url: '/services/ai-enablement', changefreq: 'monthly', priority: 0.8 },
  { url: '/services/crm-implementation', changefreq: 'monthly', priority: 0.8 },
  { url: '/services/consulting-gtm', changefreq: 'monthly', priority: 0.8 },
  { url: '/services/customer-journey', changefreq: 'monthly', priority: 0.8 },
  { url: '/services/paid-media', changefreq: 'monthly', priority: 0.8 },
  { url: '/services/reporting-analytics', changefreq: 'monthly', priority: 0.8 },
  { url: '/about', changefreq: 'monthly', priority: 0.7 },
  { url: '/insights', changefreq: 'daily', priority: 0.8 },
  { url: '/book-audit', changefreq: 'monthly', priority: 0.9 },
  { url: '/playbooks', changefreq: 'weekly', priority: 0.8 },
  { url: '/ai-quotient', changefreq: 'monthly', priority: 0.7 },
  { url: '/b2b', changefreq: 'weekly', priority: 0.8 },
  { url: '/dtc', changefreq: 'weekly', priority: 0.8 },
  { url: '/manufacturing', changefreq: 'monthly', priority: 0.7 },
  { url: '/professional-services', changefreq: 'monthly', priority: 0.7 },
  { url: '/restoration', changefreq: 'monthly', priority: 0.7 },
  { url: '/ecommerce', changefreq: 'monthly', priority: 0.7 },
  { url: '/saas', changefreq: 'monthly', priority: 0.7 },
  { url: '/consumer-services', changefreq: 'monthly', priority: 0.7 },
  { url: '/hubspot-executive-cheatsheet', changefreq: 'monthly', priority: 0.6 },
];

function generateSitemapEntry(entry, baseUrl) {
  const fullUrl = entry.url.startsWith('http') ? entry.url : `${baseUrl}${entry.url}`;
  const lastmod = entry.lastmod || new Date().toISOString().split('T')[0];
  
  return `  <url>
    <loc>${fullUrl}</loc>
    <lastmod>${lastmod}</lastmod>
    ${entry.changefreq ? `<changefreq>${entry.changefreq}</changefreq>` : ''}
    ${entry.priority !== undefined ? `<priority>${entry.priority}</priority>` : ''}
  </url>`;
}

function generateXMLSitemap(entries, baseUrl = 'https://prometheusagency.co') {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${entries.map(entry => generateSitemapEntry(entry, baseUrl)).join('\n')}
</urlset>`;
  
  return xml;
}

function generateRobotsTxt() {
  return `# Production environment
# Default - Allow all crawlers
User-agent: *
Allow: /
Crawl-delay: 1

# Sitemap location
Sitemap: https://prometheusagency.co/sitemap.xml

# Specific rules for search engines
User-agent: Googlebot
Allow: /
Crawl-delay: 0

User-agent: Bingbot
Allow: /
Crawl-delay: 1

# AI Crawlers - Allow with restrictions
User-agent: GPTBot
Allow: /
Crawl-delay: 2

User-agent: ChatGPT-User
Allow: /
Crawl-delay: 2

User-agent: CCBot
Allow: /
Crawl-delay: 5

User-agent: anthropic-ai
Allow: /
Crawl-delay: 2

User-agent: Claude-Web
Allow: /
Crawl-delay: 2

User-agent: PerplexityBot
Allow: /
Crawl-delay: 2

# Block bad bots
User-agent: AhrefsBot
Disallow: /

User-agent: SemrushBot
Disallow: /

User-agent: DotBot
Disallow: /

User-agent: MJ12bot
Disallow: /

# Protect sensitive areas
User-agent: *
Disallow: /admin/
Disallow: /api/
Disallow: /_next/
Disallow: /static/
Disallow: /*.json$
Disallow: /*?*utm_
Disallow: /*?*fbclid=
Disallow: /*?*gclid=

# Allow important files
Allow: /robots.txt
Allow: /sitemap.xml
Allow: /manifest.json`;
}

// Generate files
async function generateFiles() {
  try {
    // Generate sitemap.xml
    const sitemap = generateXMLSitemap(staticRoutes);
    fs.writeFileSync(path.join(__dirname, '..', 'public', 'sitemap.xml'), sitemap);
    console.log('✅ Generated sitemap.xml');
    
    // Generate robots.txt (only if it doesn't exist or is the basic one)
    const robotsPath = path.join(__dirname, '..', 'public', 'robots.txt');
    const currentRobots = fs.existsSync(robotsPath) ? fs.readFileSync(robotsPath, 'utf-8') : '';
    
    // Only update if it's the basic robots.txt
    if (!currentRobots.includes('AI Crawlers')) {
      const robots = generateRobotsTxt();
      fs.writeFileSync(robotsPath, robots);
      console.log('✅ Generated robots.txt');
    } else {
      console.log('ℹ️  Skipped robots.txt (already customized)');
    }
    
  } catch (error) {
    console.error('❌ Error generating files:', error);
    process.exit(1);
  }
}

// Run the script
generateFiles(); 