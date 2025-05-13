
import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogType?: string;
  ogImage?: string;
}

const SEO: React.FC<SEOProps> = ({
  title = 'Prometheus Agency - AI Enablement and GTM Strategy',
  description = 'We help B2B and DTC businesses transform technology chaos into strategic growth engines with AI enablement and proven GTM strategies.',
  canonical,
  ogType = 'website',
  ogImage = 'https://prometheusagency.co/opengraph-image.png'
}) => {
  // Build full canonical URL if relative path is provided
  const fullCanonical = canonical 
    ? canonical.startsWith('http') ? canonical : `https://prometheusagency.co${canonical}` 
    : 'https://prometheusagency.co';

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
    </Helmet>
  );
};

export default SEO;
