/**
 * Structured Data utilities for SEO and AI understanding
 */

export interface Organization {
  name: string;
  url: string;
  logo: string;
  description: string;
  email: string;
  phone: string;
  address: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  sameAs: string[];
  founders: Array<{
    name: string;
    jobTitle: string;
  }>;
}

export interface Service {
  name: string;
  description: string;
  provider: Organization;
  serviceType: string;
  areaServed: string | string[];
  availableChannel?: {
    serviceUrl: string;
    servicePhone: string;
  };
}

export interface BlogPost {
  headline: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified: string;
  author: {
    name: string;
    url?: string;
  };
  publisher: Organization;
  mainEntityOfPage: string;
  keywords: string[];
}

export interface WebPage {
  name: string;
  description: string;
  url: string;
  breadcrumb?: Array<{
    name: string;
    url: string;
  }>;
}

export interface FAQItem {
  question: string;
  answer: string;
}

// Organization data
export const organizationData: Organization = {
  name: 'Prometheus Agency',
  url: 'https://prometheusagency.co',
  logo: 'https://xkarbwfzxfxgtnefcout.supabase.co/storage/v1/object/public/cms_media/Prometheus%20Assets/prometheus_logo_white_orange_icon.png',
  description: 'AI enablement and GTM strategies for B2B and DTC businesses. Expert HubSpot partner providing CRM consulting, implementation, and growth solutions.',
  email: 'hello@prometheusagency.co',
  phone: '+1-501-701-2311',
  address: {
    streetAddress: '1321 Markham St',
    addressLocality: 'Conway',
    addressRegion: 'AR',
    postalCode: '72032',
    addressCountry: 'US'
  },
  sameAs: [
    'https://www.linkedin.com/company/prometheus-agency',
    'https://twitter.com/prometheusagency',
    'https://www.facebook.com/prometheusagency'
  ],
  founders: [
    {
      name: 'Brantley Davidson',
      jobTitle: 'CEO & Founder'
    }
  ]
};

// Generate Organization Schema
export function generateOrganizationSchema(org: Organization = organizationData) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: org.name,
    url: org.url,
    logo: org.logo,
    description: org.description,
    email: org.email,
    telephone: org.phone,
    address: {
      '@type': 'PostalAddress',
      ...org.address
    },
    sameAs: org.sameAs,
    founder: org.founders.map(founder => ({
      '@type': 'Person',
      name: founder.name,
      jobTitle: founder.jobTitle
    }))
  };
}

// Generate Service Schema
export function generateServiceSchema(service: Service) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.description,
    provider: generateOrganizationSchema(service.provider),
    serviceType: service.serviceType,
    areaServed: Array.isArray(service.areaServed) 
      ? service.areaServed.map(area => ({ '@type': 'Place', name: area }))
      : { '@type': 'Place', name: service.areaServed },
    ...(service.availableChannel && {
      availableChannel: {
        '@type': 'ServiceChannel',
        serviceUrl: service.availableChannel.serviceUrl,
        servicePhone: service.availableChannel.servicePhone
      }
    })
  };
}

// Generate BlogPosting Schema
export function generateBlogSchema(post: BlogPost) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.headline,
    description: post.description,
    image: post.image,
    datePublished: post.datePublished,
    dateModified: post.dateModified,
    author: {
      '@type': 'Person',
      name: post.author.name,
      ...(post.author.url && { url: post.author.url })
    },
    publisher: generateOrganizationSchema(post.publisher),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': post.mainEntityOfPage
    },
    keywords: post.keywords.join(', ')
  };
}

// Generate WebPage Schema with Breadcrumbs
export function generateWebPageSchema(page: WebPage) {
  const schema: any = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: page.name,
    description: page.description,
    url: page.url
  };

  if (page.breadcrumb && page.breadcrumb.length > 0) {
    schema.breadcrumb = {
      '@type': 'BreadcrumbList',
      itemListElement: page.breadcrumb.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: item.url
      }))
    };
  }

  return schema;
}

// Generate FAQ Schema
export function generateFAQSchema(faqs: FAQItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };
}

// Generate Local Business Schema
export function generateLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://prometheusagency.co/#business',
    name: organizationData.name,
    image: organizationData.logo,
    url: organizationData.url,
    telephone: organizationData.phone,
    email: organizationData.email,
    address: {
      '@type': 'PostalAddress',
      ...organizationData.address
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 35.0886963,
      longitude: -92.4421011
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '17:00'
    },
    priceRange: '$$',
    servesCuisine: 'Marketing Agency',
    sameAs: organizationData.sameAs
  };
}

// Generate Professional Service Schema
export function generateProfessionalServiceSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: organizationData.name,
    description: organizationData.description,
    url: organizationData.url,
    logo: organizationData.logo,
    telephone: organizationData.phone,
    email: organizationData.email,
    address: {
      '@type': 'PostalAddress',
      ...organizationData.address
    },
    areaServed: [
      { '@type': 'City', name: 'Conway, AR' },
      { '@type': 'City', name: 'Little Rock, AR' },
      { '@type': 'City', name: 'Jackson, MS' },
      { '@type': 'State', name: 'Arkansas' },
      { '@type': 'State', name: 'Mississippi' },
      { '@type': 'Country', name: 'United States' }
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Marketing and CRM Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'AI Enablement',
            description: 'Transform your business with AI-powered solutions'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'CRM Implementation',
            description: 'HubSpot and Salesforce CRM setup and optimization'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'GTM Strategy',
            description: 'Go-to-market strategies for B2B and DTC businesses'
          }
        }
      ]
    }
  };
}

// Inject Schema into head
export function injectSchema(schema: any) {
  if (typeof window === 'undefined') return;
  
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.text = JSON.stringify(schema);
  document.head.appendChild(script);
}

// Helper to inject multiple schemas
export function injectSchemas(schemas: any[]) {
  schemas.forEach(schema => injectSchema(schema));
} 