
import React from "react";
import SubcategoryTemplate from "@/components/subcategory/SubcategoryTemplate";

const ConsumerServicesPage = () => {
  const title = "Consumer Services Growth Solutions";
  const subtitle = "Build trust and drive growth for your consumer service business";
  const description = "Consumer service businesses face unique challenges with local competition, establishing trust, and scaling operations while maintaining service quality. Our specialized approach helps service-based businesses stand out, attract ideal customers, and build long-term relationships.";
  
  const benefits = [
    "Build a trusted local brand with strategic digital marketing",
    "Generate consistent high-quality leads for your service business",
    "Improve scheduling efficiency and capacity utilization",
    "Create scalable marketing systems that grow with your business",
    "Leverage customer reviews and social proof to build credibility",
    "Develop pricing strategies that reflect your value proposition"
  ];
  
  const challenges = [
    "Standing out in crowded local service markets",
    "Building trust with skeptical consumers researching options online",
    "Managing seasonal demand fluctuations effectively",
    "Balancing growth with maintaining service quality standards",
    "Converting price-sensitive consumers into long-term customers",
    "Creating predictable marketing systems for consistent lead flow"
  ];
  
  const solution = "Our consumer services growth approach combines local marketing expertise with AI-powered targeting to help you attract the right customers, build trust quickly, and create systems for consistent growth. We focus on digital presence, reputation management, and conversion optimization tailored to service businesses.";
  
  const ctaText = "Book Your Service Business Audit";
  const ctaLink = "/book-audit";
  
  const imagePath = "https://images.unsplash.com/photo-1556740738-b6a63e27c4df";
  
  const testimonial = {
    quote: "Prometheus transformed our marketing approach and helped us stand out in a crowded market. Our lead quality improved dramatically and we've grown 45% year over year.",
    author: "Thomas Reynolds",
    position: "Owner",
    company: "Elite Home Services"
  };
  
  const seoTitle = "Consumer Services Marketing & Growth | Prometheus Agency";
  const seoDescription = "Drive growth for your consumer service business with our specialized marketing strategies. Build trust, generate quality leads, and scale operations efficiently.";
  
  return (
    <SubcategoryTemplate
      title={title}
      subtitle={subtitle}
      description={description}
      benefits={benefits}
      challenges={challenges}
      solution={solution}
      ctaText={ctaText}
      ctaLink={ctaLink}
      industry="dtc"
      seoTitle={seoTitle}
      seoDescription={seoDescription}
      imagePath={imagePath}
      testimonial={testimonial}
    />
  );
};

export default ConsumerServicesPage;
