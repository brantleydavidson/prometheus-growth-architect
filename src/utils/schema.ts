
/**
 * Schema.org structured data utilities
 * Generates JSON-LD schema markup for different page types
 */

// Base organization schema that can be reused across pages
export const getOrganizationSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Prometheus Agency",
    "url": "https://prometheusagency.co",
    "logo": "https://prometheusagency.co/logo.png",
    "sameAs": [
      "https://facebook.com/prometheusagency",
      "https://twitter.com/prometheusagency",
      "https://linkedin.com/company/prometheusagency"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-555-123-4567",
      "contactType": "customer service",
      "email": "info@prometheusagency.co"
    }
  };
};

// Home page schema
export const getHomePageSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Prometheus Agency - Tame the Tech. Unleash the Growth.",
    "description": "We help B2B and DTC businesses transform technology chaos into strategic growth engines with AI enablement and proven GTM strategies.",
    "url": "https://prometheusagency.co",
    "publisher": getOrganizationSchema()
  };
};

// Service page schema enhanced with combined types
export const getServicePageSchema = (name: string, description: string, url: string, serviceType: string, areaServed?: string) => {
  return {
    "@context": "https://schema.org",
    "@type": ["Service", "WebPage"],
    "name": name,
    "description": description,
    "url": `https://prometheusagency.co${url}`,
    "provider": getOrganizationSchema(),
    "serviceType": serviceType,
    ...(areaServed ? { "areaServed": areaServed } : {})
  };
};

// Article schema
export const getArticleSchema = (title: string, description: string, url: string, image: string, datePublished: string, author: string) => {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": description,
    "image": image,
    "datePublished": datePublished,
    "author": {
      "@type": "Person",
      "name": author
    },
    "publisher": getOrganizationSchema(),
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://prometheusagency.co${url}`
    }
  };
};

// Combined Article and Service schema for location-specific service articles
export const getServiceArticleSchema = (
  title: string, 
  description: string, 
  url: string, 
  image: string, 
  datePublished: string, 
  author: string,
  serviceType: string,
  areaServed: string
) => {
  return {
    "@context": "https://schema.org",
    "@type": ["Article", "Service"],
    "headline": title,
    "description": description,
    "image": image,
    "datePublished": datePublished,
    "author": {
      "@type": "Person",
      "name": author
    },
    "serviceType": serviceType,
    "areaServed": areaServed,
    "provider": getOrganizationSchema(),
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://prometheusagency.co${url}`
    }
  };
};

// B2B page schema
export const getB2BPageSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "B2B Solutions - Prometheus Agency",
    "description": "Strategic growth solutions for B2B businesses. Leverage AI and proven GTM strategies to transform your technology stack.",
    "url": "https://prometheusagency.co/b2b",
    "publisher": getOrganizationSchema()
  };
};

// DTC page schema
export const getDTCPageSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "DTC Solutions - Prometheus Agency",
    "description": "Direct-to-Consumer growth strategies powered by AI. Transform your customer acquisition and retention through smart technology.",
    "url": "https://prometheusagency.co/dtc",
    "publisher": getOrganizationSchema()
  };
};

// BreadcrumbList schema
export const getBreadcrumbSchema = (items: {name: string, url: string}[]) => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": `https://prometheusagency.co${item.url}`
    }))
  };
};

// FAQ Page schema
export const getFAQPageSchema = (faqs: {question: string, answer: string}[]) => {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
};
