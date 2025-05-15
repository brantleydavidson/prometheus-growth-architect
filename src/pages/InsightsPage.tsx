
import React, { useState } from "react";
import SEO from "@/components/SEO";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import CTABanner from "@/components/common/CTABanner";
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/layout/Footer";
import DynamicBlogList from "@/components/blog/DynamicBlogList";

// Categories for filter
const categories = [
  "All Content",
  "AI Implementation",
  "B2B Strategy",
  "Data Strategy",
  "Automation",
  "Content Strategy",
  "CRM Implementation",
  "Marketing Automation",
  "DTC Marketing",
  "Real Estate"
];

const InsightsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All Content");
  
  // The filtering logic is now handled inside the DynamicBlogList component
  
  return (
    <>
      <SEO 
        title="Insights & Playbooks - AI Strategy and Implementation Resources"
        description="Explore our collection of insights, guides, and case studies on AI implementation, B2B growth strategies, and marketing automation."
        canonical="/insights"
        ogType="website"
        schemaMarkup={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "Insights & Playbooks - Prometheus Agency",
          "description": "Expert insights and practical resources on AI implementation, B2B growth strategies, and marketing automation.",
          "url": "https://prometheusagency.co/insights",
          "publisher": {
            "@type": "Organization",
            "name": "Prometheus Agency",
            "logo": {
              "@type": "ImageObject",
              "url": "https://prometheusagency.co/logo.png"
            }
          }
        }}
      />
      
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-purple-50 to-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Insights & Playbooks
            </h1>
            <p className="text-lg text-gray-700 mb-8">
              Practical resources, guides, and expert perspectives to help you navigate 
              the complexities of AI implementation and growth marketing.
            </p>
            <Link to="/ai-quotient">
              <Button size="lg" className="group">
                Take the AI Quotient Assessment
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Category Filter */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category, index) => (
              <Button
                key={index}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className="mb-2"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>
      
      {/* All Insights */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8">All Insights</h2>
          
          {/* Dynamic Blog List Component */}
          <DynamicBlogList />
        </div>
      </section>
      
      {/* Newsletter Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
            <p className="text-gray-700 mb-8">
              Get the latest insights, guides, and expert perspectives delivered directly to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 sm:flex-1"
              />
              <Button>Subscribe</Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <CTABanner 
        title="Ready to Transform Your Business with AI?"
        description="Book a strategy session with our experts to discuss how we can help implement AI solutions tailored to your business needs."
        buttonText="Book a Strategy Session"
        buttonLink="/book-audit"
      />
      
      <Footer />
    </>
  );
};

export default InsightsPage;
