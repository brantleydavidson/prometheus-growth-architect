import React from 'react';
import { Helmet } from 'react-helmet-async';

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
  author?: string;
  datePublished?: string;
  articleType?: string;
  lang?: string;
}

const SEO: React.FC<SEOProps> = ({
  title = 'Prometheus Agency - AI Enablement and GTM Strategy',
  description = 'We help B2B and DTC businesses transform technology chaos into strategic growth engines with AI enablement and proven GTM strategies.',
  canonical,
  ogType = 'website',
  ogImage = 'https://prometheusagency.co/opengraph-image.png',
  schemaMarkup = null,
  faqSchema = null,
  author,
  datePublished,
  articleType,
  lang = 'en'
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

  // Generate Article schema if this is a blog post
  const generateArticleSchema = () => {
    if (ogType !== 'article' || !author || !datePublished) return null;
    
    return {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": title.split(' – ')[0], // Get title without site name
      "description": description,
      "image": ogImage,
      "datePublished": datePublished,
      "author": {
        "@type": "Person",
        "name": author
      },
      "publisher": {
        "@type": "Organization",
        "name": "Prometheus Agency",
        "url": "https://prometheusagency.co",
        "logo": {
          "@type": "ImageObject",
          "url": "https://prometheusagency.co/logo.png"
        }
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": fullCanonical
      }
    };
  };

  const faqSchemaMarkup = generateFAQSchema();
  const articleSchemaMarkup = generateArticleSchema();

  return (
    <Helmet>
      <html lang={lang} />
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={fullCanonical} />
      
      {/* Open Graph / Social Media */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:type" content={ogType} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:alt" content={`Image for ${title}`} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content={`Image for ${title}`} />
      
      {/* Additional SEO tags */}
      <meta name="robots" content="index, follow" />
      
      {/* Schema.org JSON-LD for custom schema */}
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
      
      {/* Article Schema (if blog post) */}
      {articleSchemaMarkup && (
        <script type="application/ld+json">
          {JSON.stringify(articleSchemaMarkup)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
