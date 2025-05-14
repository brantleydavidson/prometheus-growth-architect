
import React from "react";
import SubcategoryTemplate from "@/components/subcategory/SubcategoryTemplate";

const SaaSPage = () => {
  const title = "SaaS Growth Solutions";
  const subtitle = "Scale your Software-as-a-Service business with proven growth strategies";
  const description = "SaaS businesses face unique challenges with customer acquisition costs, churn, and measuring product-market fit. Our tailored approach helps overcome these obstacles with data-driven strategies optimized for subscription-based models.";
  
  const benefits = [
    "Reduce customer acquisition costs with targeted marketing strategies",
    "Decrease churn rates through improved onboarding and engagement",
    "Optimize pricing strategies for maximum LTV:CAC ratio",
    "Implement product-led growth approaches to scale efficiently",
    "Leverage AI for personalized customer experiences and retention",
    "Create measurable growth frameworks with clear KPIs and metrics"
  ];
  
  const challenges = [
    "High customer acquisition costs that eat into profitability",
    "Increasing competition and market saturation in many categories",
    "Difficulty maintaining growth rates while expanding to new markets",
    "Complex sales processes for enterprise and upmarket customers",
    "Balancing product development with market needs and feedback",
    "Converting free trials and freemium users to paid customers"
  ];
  
  const solution = "Our SaaS growth approach combines deep analytics, customer journey optimization, and AI-powered insights to help you acquire the right customers at the right price, reduce churn, and maximize lifetime value. We work across product, marketing, and sales to create an integrated growth engine.";
  
  const ctaText = "Book Your SaaS Growth Audit";
  const ctaLink = "/book-audit";
  
  const imagePath = "https://images.unsplash.com/photo-1553877522-43269d4ea984";
  
  const testimonial = {
    quote: "Prometheus helped us reduce our CAC by 37% while increasing conversion rates from free to paid by 24%. Their systematic approach to growth transformed our business.",
    author: "Emily Rodriguez",
    position: "Growth Director",
    company: "SaaSify Solutions"
  };
  
  const seoTitle = "SaaS Growth Solutions | AI-Powered Strategies | Prometheus Agency";
  const seoDescription = "Scale your SaaS business with our proven growth strategies. Reduce CAC, decrease churn, and optimize your product-led growth with AI-powered insights.";
  
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
      industry="b2b"
      seoTitle={seoTitle}
      seoDescription={seoDescription}
      imagePath={imagePath}
      testimonial={testimonial}
    />
  );
};

export default SaaSPage;
