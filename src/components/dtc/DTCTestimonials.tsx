
import React from "react";
import TestimonialCard from "@/components/common/TestimonialCard";

interface Testimonial {
  quote: string;
  author: string;
  company: string;
  categories: string[];
}

const DTCTestimonials = () => {
  // Mock testimonial data
  const testimonials: Testimonial[] = [
    {
      quote: "Our lead generation increased by 40% within just 30 days of implementing Prometheus's strategy.",
      author: "Jennifer Wilson",
      company: "Restoration Experts",
      categories: ["Restoration", "DTC"],
    },
    {
      quote: "Their AI approach to customer acquisition completely changed our business model for the better.",
      author: "Robert Chen",
      company: "Direct Home Solutions",
      categories: ["Home Services", "DTC"],
    },
    {
      quote: "We've seen a 25% increase in repeat purchases since working with the Prometheus team.",
      author: "Emily Thomas",
      company: "Consumer Goods Inc.",
      categories: ["eCommerce", "DTC"],
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="section-title">What Our DTC Clients Say</h2>
          <p className="section-subtitle">
            Don't just take our word for it. Here's what our clients have achieved 
            by partnering with Prometheus.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default DTCTestimonials;
