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
  description: 'Leading CRM implementation and AI consulting firm. Expert HubSpot and Salesforce implementation, CRM strategy, and integration services for manufacturing, construction, and service industries.',
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
      { '@type': 'City', name: 'Memphis, TN' },
      { '@type': 'State', name: 'Arkansas' },
      { '@type': 'State', name: 'Mississippi' },
      { '@type': 'State', name: 'Tennessee' },
      { '@type': 'Country', name: 'United States' }
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'CRM Implementation and Consulting Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'CRM Implementation',
            description: 'Expert CRM implementation services for HubSpot, Salesforce, and Microsoft Dynamics. Specialized solutions for manufacturing, construction, and service industries.'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'CRM Consulting',
            description: 'Strategic CRM consulting to optimize your customer relationship management. CRM strategy development, analytics, and process optimization.'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'CRM Integration',
            description: 'Seamless CRM integration with marketing automation, ERP, accounting, and AI tools. Custom API development and system integration.'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'AI Consulting Services',
            description: 'AI CRM software implementation and LLM integration consulting. Transform your CRM with predictive analytics and automation.'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Industry-Specific CRM',
            description: 'Specialized CRM solutions for manufacturing, construction companies, roofers, pest control, and restoration businesses.'
          }
        }
      ]
    }
  };
}

// Generate CRM Service Schema
export function generateCRMServiceSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'CRM Implementation and Consulting',
    provider: generateOrganizationSchema(organizationData),
    areaServed: [
      { '@type': 'State', name: 'Tennessee' },
      { '@type': 'State', name: 'Arkansas' },
      { '@type': 'State', name: 'Mississippi' },
      { '@type': 'City', name: 'Memphis' },
      { '@type': 'Country', name: 'United States' }
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'CRM Platform Expertise',
      itemListElement: [
        {
          '@type': 'Offer',
          name: 'HubSpot CRM Implementation',
          description: 'HubSpot consulting and implementation services. Expert setup, customization, and training.'
        },
        {
          '@type': 'Offer',
          name: 'Salesforce Implementation',
          description: 'Salesforce CRM implementation and customization for complex business processes.'
        },
        {
          '@type': 'Offer',
          name: 'Microsoft Dynamics CRM',
          description: 'Dynamics 365 implementation and integration with Microsoft ecosystem.'
        }
      ]
    }
  };
}

// Generate Software Application Schema for CRM platforms
export function generateSoftwareApplicationSchema(platform: 'hubspot' | 'salesforce' | 'dynamics') {
  const platforms = {
    hubspot: {
      name: 'HubSpot CRM',
      description: 'All-in-one CRM platform with marketing, sales, and service hubs',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web-based, iOS, Android',
      offers: {
        price: '0',
        priceCurrency: 'USD',
        description: 'Free tier available, paid plans from $50/month'
      }
    },
    salesforce: {
      name: 'Salesforce CRM',
      description: 'Enterprise CRM platform with extensive customization capabilities',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web-based, iOS, Android',
      offers: {
        price: '25',
        priceCurrency: 'USD',
        description: 'Starting at $25/user/month'
      }
    },
    dynamics: {
      name: 'Microsoft Dynamics 365',
      description: 'Integrated CRM and ERP platform with AI capabilities',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web-based, iOS, Android, Windows',
      offers: {
        price: '65',
        priceCurrency: 'USD',
        description: 'Starting at $65/user/month'
      }
    }
  };

  const app = platforms[platform];
  
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: app.name,
    description: app.description,
    applicationCategory: app.applicationCategory,
    operatingSystem: app.operatingSystem,
    offers: {
      '@type': 'Offer',
      ...app.offers
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: platform === 'hubspot' ? '4.5' : platform === 'salesforce' ? '4.3' : '4.2',
      reviewCount: platform === 'hubspot' ? '8943' : platform === 'salesforce' ? '12567' : '5234'
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