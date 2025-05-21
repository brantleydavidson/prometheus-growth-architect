import React from "react";
import SubcategoryTemplate from "@/components/subcategory/SubcategoryTemplate";

const EcommercePage = () => {
  return (
    <SubcategoryTemplate
      title="eCommerce Growth Solutions"
      subtitle="Lift repeat purchase rate by 25% with strategic customer journeys."
      description="Today's eCommerce brands face intense competition and rising customer acquisition costs. Success depends not just on attracting new customers, but on maximizing their lifetime value through repeat purchases and brand loyalty. Our specialized strategies help you retain customers and increase their average order value."
      challenges={[
        "Rising customer acquisition costs making new customer growth unsustainable",
        "Low repeat purchase rates and customer lifetime value",
        "Ineffective email and SMS marketing campaigns with poor personalization",
        "Abandoned cart recovery and cross-sell opportunities being missed",
        "Difficulty creating cohesive customer journeys across multiple channels"
      ]}
      benefits={[
        "Increase repeat purchase rates through strategic customer journeys",
        "Implement personalized post-purchase sequences that drive additional sales",
        "Create effective loyalty programs that incentivize repeat business",
        "Optimize abandoned cart recovery with multi-channel approaches",
        "Enhance average order value through strategic product bundling and recommendations"
      ]}
      solution="Our eCommerce growth strategies focus on transforming one-time buyers into loyal, repeat customers. We implement comprehensive customer journey mapping, strategic email and SMS sequences, and data-driven personalization to ensure customers receive the right offers at the right time, maximizing their lifetime value to your business."
      industry="dtc"
      seoTitle="eCommerce Growth Strategies | Prometheus Agency"
      seoDescription="Increase customer lifetime value and repeat purchase rates by 25% with strategic eCommerce marketing solutions from Prometheus Agency."
      imagePath="/placeholder.svg"
      testimonial={{
        quote: "Prometheus has been a great partner to help us plan, develop and execute marketing strategies that will enable MSP Diesel Solutions to reach new customers.",
        author: "Travis Stewart",
        position: "VP of Sales",
        company: "MSP Diesel Solutions"
      }}
    />
  );
};

export default EcommercePage;
