/**
 * SEO Meta Tags utilities for search engines and AI crawlers
 */

export interface MetaTags {
  title: string;
  description: string;
  keywords?: string[];
  canonical?: string;
  robots?: string;
  author?: string;
  image?: string;
  type?: string;
  locale?: string;
  siteName?: string;
  twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player';
  twitterSite?: string;
  twitterCreator?: string;
  jsonLd?: any[];
}

export interface AIBotTags {
  openai?: string;
  anthropic?: string;
  google?: string;
  perplexity?: string;
}

// Default meta tags
export const defaultMetaTags: MetaTags = {
  title: 'CRM Implementation & AI Consulting Services | Prometheus Agency',
  description: 'Expert CRM consulting and implementation for HubSpot, Salesforce & Dynamics. Specialized in manufacturing, construction, restoration CRM solutions. AI-powered CRM integration services.',
  keywords: [
    'CRM implementation',
    'CRM consulting',
    'Salesforce implementation',
    'HubSpot consulting',
    'CRM for manufacturing',
    'CRM for construction companies',
    'Salesforce vs HubSpot',
    'Salesforce vs Dynamics',
    'CRM implementation process',
    'CRM for roofers',
    'CRM strategy',
    'CRM analytics',
    'restoration CRM software',
    'CRM integration',
    'AI CRM software',
    'CRM for pest control',
    'HubSpot CRM pricing',
    'AI consulting services',
    'CRM implementation Tennessee',
    'HubSpot consulting Memphis',
    'LLM integration consulting'
  ],
  author: 'Prometheus Agency',
  type: 'website',
  locale: 'en_US',
  siteName: 'Prometheus Agency',
  twitterCard: 'summary_large_image',
  twitterSite: '@prometheusagency'
};

// Page-specific meta tags
export const pageMetaTags: Record<string, Partial<MetaTags>> = {
  '/': {
    title: 'CRM Implementation & AI Consulting | Salesforce vs HubSpot Experts',
    description: 'Leading CRM consulting firm specializing in HubSpot, Salesforce & Dynamics implementation. Expert CRM solutions for manufacturing, construction, and restoration industries. AI-powered CRM integration.',
    keywords: ['CRM implementation', 'CRM consulting', 'Salesforce vs HubSpot', 'AI CRM software', 'CRM implementation Tennessee']
  },
  '/services': {
    title: 'CRM Implementation Services | HubSpot & Salesforce Consulting',
    description: 'Comprehensive CRM implementation process for businesses. Expert Salesforce implementation, HubSpot consulting, and AI CRM integration. Specialized solutions for manufacturing, construction, and pest control.',
    keywords: ['CRM implementation process', 'Salesforce implementation', 'HubSpot consulting', 'CRM integration', 'AI consulting services']
  },
  '/services/ai-enablement': {
    title: 'AI Consulting Services | LLM Integration & AI CRM Software',
    description: 'Transform your business with AI consulting services. Expert LLM integration consulting and AI-powered CRM software implementation. Custom AI solutions for CRM analytics and automation.',
    keywords: ['AI consulting services', 'LLM integration consulting', 'AI CRM software', 'CRM analytics']
  },
  '/services/crm-implementation': {
    title: 'CRM Implementation Process | Salesforce vs HubSpot vs Dynamics',
    description: 'Expert CRM implementation services comparing Salesforce vs HubSpot vs Dynamics. Proven CRM implementation process for manufacturing, construction, roofers, and pest control industries.',
    keywords: ['CRM implementation', 'CRM implementation process', 'Salesforce implementation', 'Salesforce vs HubSpot', 'Salesforce vs Dynamics']
  },
  '/manufacturing': {
    title: 'CRM for Manufacturing | Manufacturing CRM Implementation',
    description: 'Specialized CRM for manufacturing companies. Expert implementation of Salesforce, HubSpot, and Dynamics CRM solutions tailored for manufacturers. Improve production planning and customer management.',
    keywords: ['CRM for manufacturing', 'manufacturing CRM software', 'CRM implementation']
  },
  '/professional-services': {
    title: 'CRM for Construction Companies | Construction CRM Solutions',
    description: 'Industry-leading CRM for construction companies and contractors. Specialized CRM implementation for project management, bid tracking, and customer relationships in construction.',
    keywords: ['CRM for construction companies', 'construction CRM software', 'CRM implementation']
  },
  '/restoration': {
    title: 'Restoration CRM Software | CRM for Restoration Companies',
    description: 'Powerful restoration CRM software for water damage, fire restoration, and mold remediation companies. Streamline jobs, estimates, and insurance claims with specialized CRM solutions.',
    keywords: ['restoration CRM software', 'CRM for restoration', 'CRM implementation']
  },
  '/about': {
    title: 'CRM Consulting Experts | Tennessee & Memphis CRM Implementation',
    description: 'Meet the CRM consulting experts at Prometheus Agency. Based in Tennessee, serving Memphis and nationwide with HubSpot consulting, Salesforce implementation, and AI CRM integration services.',
    keywords: ['CRM consulting', 'CRM implementation Tennessee', 'HubSpot consulting Memphis']
  },
  '/insights': {
    title: 'CRM Strategy & Analytics Blog | CRM Implementation Insights',
    description: 'Expert insights on CRM strategy, analytics, and implementation best practices. Learn about Salesforce vs HubSpot comparisons, CRM for specific industries, and AI CRM innovations.',
    keywords: ['CRM strategy', 'CRM analytics', 'Salesforce vs HubSpot', 'CRM implementation']
  },
  '/book-audit': {
    title: 'Free CRM Consultation | HubSpot CRM Pricing & Implementation',
    description: 'Book your free CRM consultation. Get expert advice on HubSpot CRM pricing, Salesforce vs HubSpot comparison, and custom CRM implementation strategies for your industry.',
    keywords: ['CRM consulting', 'HubSpot CRM pricing', 'CRM implementation', 'free consultation']
  },
  '/services/consulting-gtm': {
    title: 'CRM Strategy Consulting | Go-to-Market CRM Implementation',
    description: 'Expert CRM strategy consulting for go-to-market success. Align your CRM implementation with business goals, optimize CRM analytics, and create data-driven growth strategies.',
    keywords: ['CRM strategy', 'CRM consulting', 'CRM analytics', 'CRM implementation']
  },
  '/consumer-services': {
    title: 'CRM for Pest Control & Home Services | Service Industry CRM',
    description: 'Specialized CRM for pest control companies and home service businesses. Manage routes, scheduling, customer contracts, and service history with industry-specific CRM solutions.',
    keywords: ['CRM for pest control', 'service industry CRM', 'CRM implementation']
  },
  '/b2b': {
    title: 'B2B CRM Implementation | Salesforce vs HubSpot for B2B',
    description: 'Enterprise B2B CRM implementation services. Expert comparison of Salesforce vs HubSpot vs Dynamics for B2B companies. Specialized CRM solutions for complex sales cycles.',
    keywords: ['B2B CRM', 'Salesforce vs HubSpot', 'Salesforce vs Dynamics', 'CRM implementation']
  },
  '/dtc': {
    title: 'DTC CRM Solutions | CRM for Roofers & Trade Businesses',
    description: 'Direct-to-consumer CRM implementation for roofers, contractors, and trade businesses. Streamline lead management, quotes, and customer relationships with specialized CRM solutions.',
    keywords: ['CRM for roofers', 'DTC CRM', 'CRM implementation', 'contractor CRM']
  },
  '/services/crm-integration': {
    title: 'CRM Integration Services | AI-Powered CRM Integration',
    description: 'Expert CRM integration services connecting your CRM with marketing automation, ERP, and AI tools. Seamless Salesforce, HubSpot, and Dynamics integrations for unified data management.',
    keywords: ['CRM integration', 'AI CRM software', 'CRM implementation', 'system integration']
  }
};

// Generate meta tags for a page
export function generateMetaTags(pathname: string, customTags?: Partial<MetaTags>): MetaTags {
  const pageTags = pageMetaTags[pathname] || {};
  
  return {
    ...defaultMetaTags,
    ...pageTags,
    ...customTags,
    canonical: customTags?.canonical || `https://prometheusagency.co${pathname}`
  };
}

// Set document meta tags
export function setMetaTags(tags: MetaTags) {
  if (typeof document === 'undefined') return;

  // Basic meta tags
  document.title = tags.title;
  setMetaTag('description', tags.description);
  if (tags.keywords) {
    setMetaTag('keywords', tags.keywords.join(', '));
  }
  if (tags.author) {
    setMetaTag('author', tags.author);
  }
  if (tags.robots) {
    setMetaTag('robots', tags.robots);
  }

  // Canonical URL
  if (tags.canonical) {
    setLinkTag('canonical', tags.canonical);
  }

  // Open Graph tags
  setMetaTag('og:title', tags.title, 'property');
  setMetaTag('og:description', tags.description, 'property');
  setMetaTag('og:type', tags.type || 'website', 'property');
  setMetaTag('og:url', tags.canonical || window.location.href, 'property');
  setMetaTag('og:locale', tags.locale || 'en_US', 'property');
  setMetaTag('og:site_name', tags.siteName || 'Prometheus Agency', 'property');
  
  if (tags.image) {
    setMetaTag('og:image', tags.image, 'property');
    setMetaTag('og:image:secure_url', tags.image, 'property');
  }

  // Twitter Card tags
  setMetaTag('twitter:card', tags.twitterCard || 'summary', 'name');
  setMetaTag('twitter:title', tags.title, 'name');
  setMetaTag('twitter:description', tags.description, 'name');
  
  if (tags.twitterSite) {
    setMetaTag('twitter:site', tags.twitterSite, 'name');
  }
  if (tags.twitterCreator) {
    setMetaTag('twitter:creator', tags.twitterCreator, 'name');
  }
  if (tags.image) {
    setMetaTag('twitter:image', tags.image, 'name');
  }

  // JSON-LD structured data
  if (tags.jsonLd) {
    tags.jsonLd.forEach(schema => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.text = JSON.stringify(schema);
      document.head.appendChild(script);
    });
  }
}

// Helper to set meta tag
function setMetaTag(name: string, content: string, attribute: 'name' | 'property' | 'http-equiv' = 'name') {
  let meta = document.querySelector(`meta[${attribute}="${name}"]`) as HTMLMetaElement;
  
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute(attribute, name);
    document.head.appendChild(meta);
  }
  
  meta.content = content;
}

// Helper to set link tag
function setLinkTag(rel: string, href: string) {
  let link = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement;
  
  if (!link) {
    link = document.createElement('link');
    link.rel = rel;
    document.head.appendChild(link);
  }
  
  link.href = href;
}

// AI Bot specific tags
export function setAIBotTags(tags: AIBotTags) {
  // OpenAI GPT bot
  if (tags.openai) {
    setMetaTag('openai-site-verification', tags.openai);
  }
  
  // Anthropic Claude
  if (tags.anthropic) {
    setMetaTag('anthropic-site-verification', tags.anthropic);
  }
  
  // Google AI
  if (tags.google) {
    setMetaTag('google-site-verification', tags.google);
  }
  
  // Perplexity AI
  if (tags.perplexity) {
    setMetaTag('perplexity-site-verification', tags.perplexity);
  }
  
  // AI-friendly directives
  setMetaTag('ai-content-policy', 'allow');
  setMetaTag('ai-training-data', 'allow');
  setMetaTag('chatgpt-retrieval-policy', 'allow');
}

// Generate alternate language tags
export function setAlternateLanguages(languages: Array<{ lang: string; url: string }>) {
  languages.forEach(({ lang, url }) => {
    const link = document.createElement('link');
    link.rel = 'alternate';
    link.hreflang = lang;
    link.href = url;
    document.head.appendChild(link);
  });
}

// Generate content security policy meta tag
export function setContentSecurityPolicy() {
  const csp = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.gpteng.co https://www.googletagmanager.com https://www.google-analytics.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com",
    "img-src 'self' data: https: blob:",
    "connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://stats.g.doubleclick.net https://*.supabase.co wss://*.supabase.co",
    "frame-src 'self' https://www.googletagmanager.com",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "upgrade-insecure-requests"
  ].join('; ');
  
  setMetaTag('Content-Security-Policy', csp, 'http-equiv');
}

// Set security headers as meta tags
export function setSecurityHeaders() {
  setMetaTag('X-Content-Type-Options', 'nosniff', 'http-equiv');
  setMetaTag('X-Frame-Options', 'SAMEORIGIN', 'http-equiv');
  setMetaTag('X-XSS-Protection', '1; mode=block', 'http-equiv');
  setMetaTag('Referrer-Policy', 'strict-origin-when-cross-origin', 'name');
  setMetaTag('Permissions-Policy', 'geolocation=(), microphone=(), camera=()', 'http-equiv');
}

// Preload critical resources
export function preloadCriticalResources(resources: Array<{ href: string; as: string; type?: string }>) {
  resources.forEach(resource => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = resource.href;
    link.as = resource.as;
    if (resource.type) {
      link.type = resource.type;
    }
    document.head.appendChild(link);
  });
}

// Generate robots meta tag based on environment
export function generateRobotsTag(environment: 'production' | 'staging' | 'development'): string {
  switch (environment) {
    case 'production':
      return 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';
    case 'staging':
      return 'noindex, nofollow, noarchive, nosnippet';
    case 'development':
      return 'noindex, nofollow, noarchive, nosnippet';
    default:
      return 'noindex, nofollow';
  }
} 