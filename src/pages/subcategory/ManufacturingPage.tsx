
import React from "react";
import SubcategoryTemplate from "@/components/subcategory/SubcategoryTemplate";

const ManufacturingPage = () => {
  return (
    <SubcategoryTemplate
      title="Manufacturing Growth Solutions"
      subtitle="Turn idle line-time into booked POs with strategic sales and marketing."
      description="Manufacturing companies face unique challenges in today's rapidly evolving market. From inconsistent sales pipelines to difficulty showcasing product value digitally, manufacturers need specialized strategies to drive growth and maximize production capacity."
      challenges={[
        "Inconsistent sales pipelines leading to feast-or-famine production cycles",
        "Difficulty communicating complex product value propositions to potential clients",
        "Reliance on aging, inefficient CRM systems that don't support modern sales processes",
        "Struggles with digital transformation and online lead generation",
        "Disconnected marketing and sales efforts resulting in wasted resources"
      ]}
      benefits={[
        "Develop steady, predictable sales pipelines to optimize production planning",
        "Implement integrated CRM systems that connect marketing, sales, and production",
        "Create compelling digital assets that effectively communicate your product value",
        "Build scalable marketing and sales processes that grow with your business",
        "Reduce customer acquisition costs through targeted, data-driven campaigns"
      ]}
      solution="We help manufacturing businesses create integrated sales and marketing systems that generate consistent, qualified leads and convert them into long-term customers. Our approach combines strategic CRM implementation, digital marketing optimization, and sales process refinement to ensure your production lines stay busy with profitable orders."
      industry="b2b"
      seoTitle="Manufacturing Growth Solutions | Prometheus Agency"
      seoDescription="Transform your manufacturing business with strategic sales and marketing solutions designed to convert idle line-time into booked POs. Contact Prometheus Agency today."
      imagePath="/placeholder.svg"
      testimonial={{
        quote: "Working with Prometheus has transformed our approach to sales. We've seen a 35% increase in our order book and much more consistent production scheduling.",
        author: "Michael Freeman",
        position: "Director of Sales",
        company: "Precision Manufacturing Inc."
      }}
    />
  );
};

export default ManufacturingPage;
