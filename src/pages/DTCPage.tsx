
import React from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight } from "lucide-react";
import TestimonialCard from "@/components/common/TestimonialCard";
import CTABanner from "@/components/common/CTABanner";

const DTCPage = () => {
  // Mock testimonial data
  const testimonials = [
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
    <>
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="pt-16 pb-24 bg-prometheus-navy text-white">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl md:text-5xl font-semibold mb-6 leading-tight">
                  Sell More Direct-to-Consumer with Lower Acquisition Costs
                </h1>
                <p className="text-white/80 text-lg mb-8 max-w-lg">
                  Stop wasting ad spend on poorly targeted campaigns. We help DTC businesses 
                  acquire more customers at a lower cost and increase their lifetime value.
                </p>
                <div className="p-6 bg-white/10 rounded-lg border border-white/20 mb-8">
                  <h3 className="text-xl font-medium mb-4">Free DTC Growth Audit</h3>
                  <p className="mb-4 text-white/70">
                    Get a complimentary analysis of your customer acquisition strategy with 
                    actionable recommendations to reduce costs and increase conversions.
                  </p>
                  <Link to="/book-audit">
                    <Button className="w-full bg-prometheus-gold hover:bg-prometheus-gold/90">
                      Request Your Free Audit
                    </Button>
                  </Link>
                </div>
              </div>
              
              <div className="relative">
                <div className="relative aspect-video rounded-lg overflow-hidden">
                  {/* This would be a video or image in the real implementation */}
                  <div className="absolute inset-0 bg-gradient-to-br from-prometheus-gold to-prometheus-orange opacity-30"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="bg-prometheus-navy/80 p-6 rounded-lg">
                        <p className="text-xl font-medium mb-3">Average Customer Results</p>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <div className="text-4xl font-bold mb-2 text-prometheus-gold">
                              28%
                            </div>
                            <p>Lower Acquisition Cost</p>
                          </div>
                          <div>
                            <div className="text-4xl font-bold mb-2 text-prometheus-gold">
                              47%
                            </div>
                            <p>Higher Conversion Rate</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Pain to Possibility Section */}
        <section className="py-20">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="section-title">From Pain to Possibility</h2>
              <p className="section-subtitle">
                DTC companies face unique challenges in today's crowded marketplace. 
                Here's how we transform common pain points into growth.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
              {/* Pain Point 1 */}
              <div className="flex gap-6">
                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-red-600 font-semibold">1</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-prometheus-navy mb-3">
                    Rising Customer Acquisition Costs
                  </h3>
                  <p className="text-prometheus-gray mb-4">
                    Your advertising costs keep increasing while conversion rates remain flat, 
                    squeezing your margins and limiting growth.
                  </p>
                  <div className="p-4 bg-green-50 rounded-md border border-green-100">
                    <p className="flex items-start gap-2">
                      <CheckCircle size={20} className="text-green-600 mt-1 flex-shrink-0" />
                      <span className="text-green-800">
                        We implement AI-powered targeting and optimization systems that 
                        identify your most profitable customer segments and reduce wasted ad spend.
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Pain Point 2 */}
              <div className="flex gap-6">
                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-red-600 font-semibold">2</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-prometheus-navy mb-3">
                    Low Customer Lifetime Value
                  </h3>
                  <p className="text-prometheus-gray mb-4">
                    Your customers make one purchase and disappear, forcing you to 
                    constantly acquire new ones at a high cost.
                  </p>
                  <div className="p-4 bg-green-50 rounded-md border border-green-100">
                    <p className="flex items-start gap-2">
                      <CheckCircle size={20} className="text-green-600 mt-1 flex-shrink-0" />
                      <span className="text-green-800">
                        We create personalized customer journeys and automated retention systems 
                        that nurture relationships and drive repeat purchases.
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Pain Point 3 */}
              <div className="flex gap-6">
                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-red-600 font-semibold">3</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-prometheus-navy mb-3">
                    Platform Dependency
                  </h3>
                  <p className="text-prometheus-gray mb-4">
                    Your business is too dependent on a single platform (e.g., Facebook, Amazon) 
                    making you vulnerable to algorithm changes and rising fees.
                  </p>
                  <div className="p-4 bg-green-50 rounded-md border border-green-100">
                    <p className="flex items-start gap-2">
                      <CheckCircle size={20} className="text-green-600 mt-1 flex-shrink-0" />
                      <span className="text-green-800">
                        We develop multi-channel acquisition and fulfillment strategies that 
                        reduce risk and create a more resilient business model.
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Pain Point 4 */}
              <div className="flex gap-6">
                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-red-600 font-semibold">4</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-prometheus-navy mb-3">
                    Poor Customer Data Integration
                  </h3>
                  <p className="text-prometheus-gray mb-4">
                    Your customer data is scattered across various platforms, making it 
                    impossible to get a complete view of your customers and their behaviors.
                  </p>
                  <div className="p-4 bg-green-50 rounded-md border border-green-100">
                    <p className="flex items-start gap-2">
                      <CheckCircle size={20} className="text-green-600 mt-1 flex-shrink-0" />
                      <span className="text-green-800">
                        We consolidate your customer data into a unified platform and implement 
                        analytics that reveal actionable insights for personalization and targeting.
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-16 text-center">
              <Link to="/restoration">
                <Button className="bg-prometheus-navy hover:bg-prometheus-navy/90 text-white flex items-center gap-2 mx-auto">
                  Explore Restoration Solutions
                  <ArrowRight size={16} />
                </Button>
              </Link>
            </div>
          </div>
        </section>
        
        {/* Testimonials Section */}
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
        
        <CTABanner
          title="Ready to Boost Your DTC Growth?"
          description="Book a complimentary Growth Audit to discover how we can help you acquire more customers at a lower cost."
          buttonText="Book Your Growth Audit"
          buttonLink="/book-audit"
          color="gold"
        />
      </main>
      <Footer />
    </>
  );
};

export default DTCPage;
