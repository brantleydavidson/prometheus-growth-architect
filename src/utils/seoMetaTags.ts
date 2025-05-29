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
  title: 'Prometheus Agency - AI Enablement & GTM Strategies',
  description: 'Transform your business with AI-powered solutions and expert GTM strategies. HubSpot partner specializing in CRM implementation for B2B and DTC companies.',
  keywords: [
    'AI enablement',
    'GTM strategy',
    'HubSpot partner',
    'CRM consulting',
    'B2B marketing',
    'DTC growth',
    'marketing automation',
    'sales enablement',
    'revenue operations',
    'AI transformation'
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
    title: 'Prometheus Agency - AI Enablement & GTM Strategies for Growth',
    description: 'Unlock exponential growth with AI-powered solutions and proven GTM strategies. Expert HubSpot partner helping B2B and DTC businesses scale efficiently.'
  },
  '/services': {
    title: 'Our Services - AI, CRM & Growth Solutions | Prometheus Agency',
    description: 'Comprehensive AI enablement, CRM implementation, and GTM consulting services. Transform your business with our proven methodologies and expert guidance.'
  },
  '/services/ai-enablement': {
    title: 'AI Enablement Services - Transform Your Business | Prometheus Agency',
    description: 'Leverage cutting-edge AI to automate processes, enhance decision-making, and drive growth. Custom AI solutions for B2B and DTC businesses.'
  },
  '/services/crm-implementation': {
    title: 'CRM Implementation - HubSpot & Salesforce Experts | Prometheus Agency',
    description: 'Expert CRM implementation and optimization services. Certified HubSpot partner helping businesses streamline operations and accelerate growth.'
  },
  '/about': {
    title: 'About Us - Meet the Team | Prometheus Agency',
    description: 'Learn about Prometheus Agency\'s mission to bring enterprise-level strategies to growing businesses. Meet our team of growth experts and AI specialists.'
  },
  '/insights': {
    title: 'Insights & Resources - Marketing & AI Blog | Prometheus Agency',
    description: 'Expert insights on AI, CRM, GTM strategies, and growth marketing. Stay ahead with our latest articles, case studies, and industry analysis.'
  },
  '/book-audit': {
    title: 'Book Your Free Growth Audit | Prometheus Agency',
    description: 'Get a personalized growth audit and discover untapped opportunities. Free consultation with our AI and GTM experts.'
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