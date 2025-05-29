import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { 
  generateMetaTags, 
  setMetaTags, 
  setAIBotTags, 
  setSecurityHeaders, 
  generateRobotsTag,
  type MetaTags 
} from '@/utils/seoMetaTags';
import { 
  generateOrganizationSchema, 
  generateWebPageSchema, 
  generateProfessionalServiceSchema,
  generateLocalBusinessSchema,
  injectSchemas,
  type WebPage,
  organizationData,
  generateCRMServiceSchema,
  generateSoftwareApplicationSchema,
  generateServiceSchema
} from '@/utils/structuredData';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  type?: string;
  customSchema?: any[];
  noindex?: boolean;
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  keywords,
  image,
  type,
  customSchema = [],
  noindex = false
}) => {
  const location = useLocation();
  const pathname = location.pathname;
  
  useEffect(() => {
    // Determine environment
    const environment = window.location.hostname.includes('.io') 
      ? 'staging' 
      : window.location.hostname === 'localhost' 
      ? 'development' 
      : 'production';
    
    // Generate meta tags
    const metaTags: MetaTags = generateMetaTags(pathname, {
      title,
      description,
      keywords,
      image: image || organizationData.logo,
      type,
      robots: noindex ? 'noindex, nofollow' : generateRobotsTag(environment)
    });
    
    // Set meta tags
    setMetaTags(metaTags);
    
    // Set AI bot tags
    setAIBotTags({
      // Add your verification codes here when you have them
      // openai: 'your-openai-verification-code',
      // anthropic: 'your-anthropic-verification-code',
      // google: 'your-google-verification-code',
      // perplexity: 'your-perplexity-verification-code'
    });
    
    // Set security headers
    setSecurityHeaders();
    
    // Generate breadcrumbs for pages
    const breadcrumbs = generateBreadcrumbs(pathname);
    
    // Generate page schema
    const pageSchema: WebPage = {
      name: metaTags.title,
      description: metaTags.description,
      url: metaTags.canonical || window.location.href,
      breadcrumb: breadcrumbs
    };
    
    // Inject structured data
    const schemas = [
      generateOrganizationSchema(),
      generateWebPageSchema(pageSchema),
      ...customSchema
    ];
    
    // Add specialized schemas based on page type
    if (pathname === '/') {
      schemas.push(generateProfessionalServiceSchema());
      schemas.push(generateCRMServiceSchema());
    } else if (pathname === '/services/crm-implementation') {
      schemas.push(generateCRMServiceSchema());
      schemas.push(generateWebPageSchema({
        name: 'CRM Implementation Services',
        description: 'Expert CRM implementation for HubSpot, Salesforce, and Dynamics',
        url: `https://prometheusagency.co${pathname}`,
        breadcrumb: [
          { name: 'Home', url: 'https://prometheusagency.co' },
          { name: 'Services', url: 'https://prometheusagency.co/services' },
          { name: 'CRM Implementation', url: `https://prometheusagency.co${pathname}` }
        ]
      }));
    } else if (pathname === '/salesforce-vs-hubspot') {
      schemas.push(generateSoftwareApplicationSchema('hubspot'));
      schemas.push(generateSoftwareApplicationSchema('salesforce'));
      schemas.push(generateWebPageSchema({
        name: 'Salesforce vs HubSpot Comparison',
        description: 'Comprehensive comparison of Salesforce and HubSpot CRM platforms',
        url: `https://prometheusagency.co${pathname}`
      }));
    } else if (pathname === '/services/crm-strategy') {
      schemas.push(generateCRMServiceSchema());
      schemas.push(generateWebPageSchema({
        name: 'CRM Strategy Consulting',
        description: 'Strategic CRM planning and analytics services',
        url: `https://prometheusagency.co${pathname}`,
        breadcrumb: [
          { name: 'Home', url: 'https://prometheusagency.co' },
          { name: 'Services', url: 'https://prometheusagency.co/services' },
          { name: 'CRM Strategy', url: `https://prometheusagency.co${pathname}` }
        ]
      }));
    } else if (pathname === '/services/crm-integration') {
      schemas.push(generateCRMServiceSchema());
      schemas.push(generateWebPageSchema({
        name: 'CRM Integration Services',
        description: 'Expert CRM integration with marketing, sales, and AI tools',
        url: `https://prometheusagency.co${pathname}`,
        breadcrumb: [
          { name: 'Home', url: 'https://prometheusagency.co' },
          { name: 'Services', url: 'https://prometheusagency.co/services' },
          { name: 'CRM Integration', url: `https://prometheusagency.co${pathname}` }
        ]
      }));
    } else if (pathname === '/crm-for-roofers') {
      schemas.push(generateServiceSchema({
        name: 'CRM for Roofers',
        description: 'Specialized CRM solutions for roofing contractors',
        provider: organizationData,
        serviceType: 'CRM Implementation',
        areaServed: ['United States', 'Tennessee', 'Arkansas', 'Mississippi']
      }));
    } else if (pathname === '/manufacturing') {
      schemas.push(generateServiceSchema({
        name: 'CRM for Manufacturing',
        description: 'CRM solutions tailored for manufacturing companies',
        provider: organizationData,
        serviceType: 'Industry-Specific CRM',
        areaServed: ['United States']
      }));
    } else if (pathname === '/professional-services' || pathname === '/construction') {
      schemas.push(generateServiceSchema({
        name: 'CRM for Construction Companies',
        description: 'CRM implementation for construction and contracting businesses',
        provider: organizationData,
        serviceType: 'Industry-Specific CRM',
        areaServed: ['United States']
      }));
    } else if (pathname === '/consumer-services') {
      schemas.push(generateServiceSchema({
        name: 'CRM for Pest Control',
        description: 'CRM solutions for pest control and home service companies',
        provider: organizationData,
        serviceType: 'Industry-Specific CRM',
        areaServed: ['United States']
      }));
    } else if (pathname === '/restoration') {
      schemas.push(generateServiceSchema({
        name: 'Restoration CRM Software',
        description: 'CRM for water damage and restoration companies',
        provider: organizationData,
        serviceType: 'Industry-Specific CRM',
        areaServed: ['United States']
      }));
    } else if (pathname === '/about') {
      schemas.push(generateLocalBusinessSchema());
    } else if (pathname.startsWith('/insights/')) {
      // Blog post schema would be added here based on post data
      schemas.push(generateWebPageSchema({
        name: metaTags.title,
        description: metaTags.description,
        url: `https://prometheusagency.co${pathname}`
      }));
    } else {
      // Default webpage schema
      schemas.push(generateWebPageSchema({
        name: metaTags.title,
        description: metaTags.description,
        url: `https://prometheusagency.co${pathname}`
      }));
    }
    
    injectSchemas(schemas);
    
    // Cleanup function to remove injected schemas
    return () => {
      // Remove injected JSON-LD scripts
      const scripts = document.querySelectorAll('script[type="application/ld+json"]');
      scripts.forEach(script => script.remove());
    };
  }, [pathname, title, description, keywords, image, type, customSchema, noindex]);
  
  // This component doesn't render anything visible
  return null;
};

// Helper function to generate breadcrumbs
function generateBreadcrumbs(pathname: string): Array<{ name: string; url: string }> | undefined {
  if (pathname === '/') return undefined;
  
  const breadcrumbs = [
    { name: 'Home', url: 'https://prometheusagency.co' }
  ];
  
  const segments = pathname.split('/').filter(Boolean);
  let currentPath = '';
  
  segments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    
    // Skip adding breadcrumb for certain paths
    if (segment === 'admin' || segment === 'api') return;
    
    // Format segment name
    const name = formatSegmentName(segment, segments[index - 1]);
    
    breadcrumbs.push({
      name,
      url: `https://prometheusagency.co${currentPath}`
    });
  });
  
  return breadcrumbs.length > 1 ? breadcrumbs : undefined;
}

// Helper function to format segment names for breadcrumbs
function formatSegmentName(segment: string, previousSegment?: string): string {
  const specialCases: Record<string, string> = {
    'ai-enablement': 'AI Enablement',
    'crm-implementation': 'CRM Implementation',
    'consulting-gtm': 'GTM Consulting',
    'customer-journey': 'Customer Journey',
    'paid-media': 'Paid Media',
    'reporting-analytics': 'Reporting & Analytics',
    'book-audit': 'Book Audit',
    'ai-quotient': 'AI Quotient',
    'professional-services': 'Professional Services',
    'consumer-services': 'Consumer Services',
    'hubspot-executive-cheatsheet': 'HubSpot Executive Cheat Sheet',
    'b2b': 'B2B',
    'dtc': 'DTC',
    'saas': 'SaaS'
  };
  
  if (specialCases[segment]) {
    return specialCases[segment];
  }
  
  // Capitalize first letter of each word
  return segment
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export default SEOHead; 