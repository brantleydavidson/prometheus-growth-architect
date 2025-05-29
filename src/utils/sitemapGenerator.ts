/**
 * Sitemap Generator for SEO
 */

export interface SitemapEntry {
  url: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

// Static routes for the sitemap
export const staticRoutes: SitemapEntry[] = [
  { url: '/', changefreq: 'weekly', priority: 1.0 },
  { url: '/services', changefreq: 'weekly', priority: 0.9 },
  { url: '/services/ai-enablement', changefreq: 'monthly', priority: 0.8 },
  { url: '/services/crm-implementation', changefreq: 'monthly', priority: 0.8 },
  { url: '/services/consulting-gtm', changefreq: 'monthly', priority: 0.8 },
  { url: '/services/customer-journey', changefreq: 'monthly', priority: 0.8 },
  { url: '/services/paid-media', changefreq: 'monthly', priority: 0.8 },
  { url: '/services/reporting-analytics', changefreq: 'monthly', priority: 0.8 },
  { url: '/services/crm-strategy', changefreq: 'weekly', priority: 0.9 },
  { url: '/services/crm-integration', changefreq: 'weekly', priority: 0.9 },
  { url: '/about', changefreq: 'monthly', priority: 0.7 },
  { url: '/insights', changefreq: 'daily', priority: 0.8 },
  { url: '/book-audit', changefreq: 'monthly', priority: 0.9 },
  { url: '/playbooks', changefreq: 'weekly', priority: 0.8 },
  { url: '/ai-quotient', changefreq: 'monthly', priority: 0.7 },
  
  // Industry pages
  { url: '/b2b', changefreq: 'weekly', priority: 0.8 },
  { url: '/dtc', changefreq: 'weekly', priority: 0.8 },
  { url: '/manufacturing', changefreq: 'monthly', priority: 0.7 },
  { url: '/professional-services', changefreq: 'monthly', priority: 0.7 },
  { url: '/restoration', changefreq: 'monthly', priority: 0.7 },
  { url: '/ecommerce', changefreq: 'monthly', priority: 0.7 },
  { url: '/saas', changefreq: 'monthly', priority: 0.7 },
  { url: '/consumer-services', changefreq: 'monthly', priority: 0.7 },
  
  // Executive resources
  { url: '/hubspot-executive-cheatsheet', changefreq: 'monthly', priority: 0.6 },
  { url: '/salesforce-vs-hubspot', changefreq: 'weekly', priority: 0.9 },
  { url: '/crm-for-roofers', changefreq: 'weekly', priority: 0.8 },
];

// Generate XML sitemap
export function generateXMLSitemap(entries: SitemapEntry[], baseUrl: string = 'https://prometheusagency.co'): string {
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

// Generate individual sitemap entry
function generateSitemapEntry(entry: SitemapEntry, baseUrl: string): string {
  const fullUrl = entry.url.startsWith('http') ? entry.url : `${baseUrl}${entry.url}`;
  const lastmod = entry.lastmod || new Date().toISOString().split('T')[0];
  
  return `  <url>
    <loc>${fullUrl}</loc>
    <lastmod>${lastmod}</lastmod>
    ${entry.changefreq ? `<changefreq>${entry.changefreq}</changefreq>` : ''}
    ${entry.priority !== undefined ? `<priority>${entry.priority}</priority>` : ''}
  </url>`;
}

// Generate sitemap index for multiple sitemaps
export function generateSitemapIndex(sitemaps: Array<{ loc: string; lastmod?: string }>, baseUrl: string = 'https://prometheusagency.co'): string {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemaps.map(sitemap => `  <sitemap>
    <loc>${baseUrl}${sitemap.loc}</loc>
    <lastmod>${sitemap.lastmod || new Date().toISOString()}</lastmod>
  </sitemap>`).join('\n')}
</sitemapindex>`;
  
  return xml;
}

// Generate robots.txt content
export function generateRobotsTxt(environment: 'production' | 'staging' = 'production'): string {
  if (environment === 'staging') {
    return `# Staging environment - Block all crawlers
User-agent: *
Disallow: /

# Block AI crawlers specifically
User-agent: GPTBot
Disallow: /

User-agent: ChatGPT-User
Disallow: /

User-agent: CCBot
Disallow: /

User-agent: anthropic-ai
Disallow: /

User-agent: Claude-Web
Disallow: /`;
  }
  
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

// Generate URL list for static generation
export function generateUrlList(routes: SitemapEntry[], baseUrl: string = 'https://prometheusagency.co'): string[] {
  return routes.map(route => {
    const path = route.url;
    return path.startsWith('http') ? path : `${baseUrl}${path}`;
  });
}

// Create HTML sitemap for users
export function generateHTMLSitemap(routes: SitemapEntry[]): string {
  const grouped = groupRoutesByCategory(routes);
  
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sitemap - Prometheus Agency</title>
  <meta name="description" content="Complete sitemap of Prometheus Agency website. Find all our pages about AI enablement, CRM consulting, and growth strategies.">
  <style>
    body { font-family: system-ui, -apple-system, sans-serif; line-height: 1.6; color: #333; max-width: 800px; margin: 0 auto; padding: 2rem; }
    h1 { color: #002E5D; }
    h2 { color: #FF6B35; margin-top: 2rem; }
    ul { list-style-type: none; padding-left: 0; }
    li { margin: 0.5rem 0; }
    a { color: #002E5D; text-decoration: none; }
    a:hover { color: #FF6B35; text-decoration: underline; }
    .priority { color: #666; font-size: 0.9em; }
  </style>
</head>
<body>
  <h1>Sitemap</h1>
  ${Object.entries(grouped).map(([category, categoryRoutes]) => `
    <h2>${category}</h2>
    <ul>
      ${categoryRoutes.map(route => `
        <li>
          <a href="${route.url}">${getPageTitle(route.url)}</a>
          ${route.priority ? `<span class="priority">(Priority: ${route.priority})</span>` : ''}
        </li>
      `).join('')}
    </ul>
  `).join('')}
</body>
</html>`;
}

// Helper to group routes by category
function groupRoutesByCategory(routes: SitemapEntry[]): Record<string, SitemapEntry[]> {
  const groups: Record<string, SitemapEntry[]> = {
    'Main Pages': [],
    'Services': [],
    'Industries': [],
    'Resources': [],
    'Other': []
  };
  
  routes.forEach(route => {
    if (route.url === '/' || route.url === '/about' || route.url === '/book-audit') {
      groups['Main Pages'].push(route);
    } else if (route.url.includes('/services')) {
      groups['Services'].push(route);
    } else if (['/b2b', '/dtc', '/manufacturing', '/professional-services', '/restoration', '/ecommerce', '/saas', '/consumer-services'].includes(route.url)) {
      groups['Industries'].push(route);
    } else if (route.url === '/insights' || route.url === '/playbooks' || route.url === '/ai-quotient') {
      groups['Resources'].push(route);
    } else {
      groups['Other'].push(route);
    }
  });
  
  // Remove empty groups
  Object.keys(groups).forEach(key => {
    if (groups[key].length === 0) delete groups[key];
  });
  
  return groups;
}

// Helper to get page title from URL
function getPageTitle(url: string): string {
  const titles: Record<string, string> = {
    '/': 'Home',
    '/services': 'Our Services',
    '/services/ai-enablement': 'AI Enablement',
    '/services/crm-implementation': 'CRM Implementation',
    '/services/consulting-gtm': 'GTM Consulting',
    '/services/customer-journey': 'Customer Journey Mapping',
    '/services/paid-media': 'Paid Media Management',
    '/services/reporting-analytics': 'Reporting & Analytics',
    '/about': 'About Us',
    '/insights': 'Insights & Blog',
    '/book-audit': 'Book a Growth Audit',
    '/playbooks': 'Growth Playbooks',
    '/ai-quotient': 'AI Quotient Assessment',
    '/b2b': 'B2B Solutions',
    '/dtc': 'DTC Solutions',
    '/manufacturing': 'Manufacturing',
    '/professional-services': 'Professional Services',
    '/restoration': 'Restoration Services',
    '/ecommerce': 'E-commerce',
    '/saas': 'SaaS',
    '/consumer-services': 'Consumer Services',
    '/hubspot-executive-cheatsheet': 'HubSpot Executive Cheat Sheet',
    '/salesforce-vs-hubspot': 'Salesforce vs HubSpot',
    '/crm-for-roofers': 'CRM for Roofers'
  };
  
  return titles[url] || url.split('/').pop()?.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) || url;
} 