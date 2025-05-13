
import React from 'react';
// Import react-helmet-async properly using named exports
import * as ReactHelmetAsync from 'react-helmet-async';
const { Helmet } = ReactHelmetAsync;

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogType?: string;
  ogImage?: string;
  schemaMarkup?: object;
  faqSchema?: {
    question: string;
    answer: string;
  }[];
}

const SEO: React.FC<SEOProps> = ({
  title = 'Prometheus Agency - AI Enablement and GTM Strategy',
  description = 'We help B2B and DTC businesses transform technology chaos into strategic growth engines with AI enablement and proven GTM strategies.',
  canonical,
  ogType = 'website',
  ogImage = 'https://prometheusagency.co/opengraph-image.png',
  schemaMarkup = null,
  faqSchema = null
}) => {
  // Build full canonical URL if relative path is provided
  const fullCanonical = canonical 
    ? canonical.startsWith('http') ? canonical : `https://prometheusagency.co${canonical}` 
    : 'https://prometheusagency.co';

  // Generate FAQPage schema if FAQs are provided
  const generateFAQSchema = () => {
    if (!faqSchema || faqSchema.length === 0) return null;
    
    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqSchema.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    };
  };

  const faqSchemaMarkup = generateFAQSchema();

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={fullCanonical} />
      
      {/* Open Graph / Social Media */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:type" content={ogType} />
      <meta property="og:image" content={ogImage} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* Additional SEO tags */}
      <meta name="robots" content="index, follow" />
      <html lang="en" />
      
      {/* Schema.org JSON-LD */}
      {schemaMarkup && (
        <script type="application/ld+json">
          {JSON.stringify(schemaMarkup)}
        </script>
      )}
      
      {/* FAQ Schema (if provided) */}
      {faqSchemaMarkup && (
        <script type="application/ld+json">
          {JSON.stringify(faqSchemaMarkup)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
