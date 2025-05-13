
import React from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight } from "lucide-react";
import TestimonialCard from "@/components/common/TestimonialCard";
import CTABanner from "@/components/common/CTABanner";

const B2BPage = () => {
  // Mock testimonial data
  const testimonials = [
    {
      quote: "Prometheus helped us cut our sales cycle by 35% and increase our close rate significantly.",
      author: "John Smith",
      company: "Manufacturing Inc.",
      categories: ["Manufacturing", "B2B"],
    },
    {
      quote: "The team's strategy completely transformed how we approach the market and engage with prospects.",
      author: "Sarah Johnson",
      company: "Professional Services Co.",
      categories: ["Professional Services", "B2B"],
    },
    {
      quote: "Their AI implementation has given us a competitive edge in our industry. Highly recommend.",
      author: "Michael Davis",
      company: "Tech Solutions",
      categories: ["Technology", "B2B"],
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
                  Win More B2B Deals with Predictable Results
                </h1>
                <p className="text-white/80 text-lg mb-8 max-w-lg">
                  Stop losing deals to indecision and complexity. We help B2B businesses 
                  create streamlined sales processes that consistently win more profitable deals.
                </p>
                <div className="p-6 bg-white/10 rounded-lg border border-white/20 mb-8">
                  <h3 className="text-xl font-medium mb-4">Free B2B Growth Teardown</h3>
                  <p className="mb-4 text-white/70">
                    Get a complimentary analysis of your current sales and marketing approach with 
                    actionable recommendations you can implement today.
                  </p>
                  <Link to="/book-audit">
                    <Button className="w-full bg-prometheus-orange hover:bg-prometheus-orange/90">
                      Request Your Free Teardown
                    </Button>
                  </Link>
                </div>
              </div>
              
              <div className="relative">
                <div className="relative aspect-video rounded-lg overflow-hidden">
                  {/* This would be a video or image in the real implementation */}
                  <div className="absolute inset-0 bg-gradient-to-br from-prometheus-orange to-prometheus-gold opacity-30"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="bg-prometheus-navy/80 p-6 rounded-lg">
                        <p className="text-xl font-medium mb-3">Average Customer Results</p>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <div className="text-4xl font-bold mb-2 text-prometheus-orange">
                              35%
                            </div>
                            <p>Shorter Sales Cycles</p>
                          </div>
                          <div>
                            <div className="text-4xl font-bold mb-2 text-prometheus-orange">
                              42%
                            </div>
                            <p>More Closed Deals</p>
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
                B2B companies face unique challenges that require specialized 
                solutions. Here's how we transform common pain points into growth.
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
                    Long, Unpredictable Sales Cycles
                  </h3>
                  <p className="text-prometheus-gray mb-4">
                    Your sales team is spending months nurturing prospects with inconsistent results 
                    and forecasts that never materialize.
                  </p>
                  <div className="p-4 bg-green-50 rounded-md border border-green-100">
                    <p className="flex items-start gap-2">
                      <CheckCircle size={20} className="text-green-600 mt-1 flex-shrink-0" />
                      <span className="text-green-800">
                        We implement AI-powered lead scoring and qualification processes that 
                        identify the most promising opportunities so you can focus resources effectively.
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
                    Multiple Decision Makers
                  </h3>
                  <p className="text-prometheus-gray mb-4">
                    Your deals stall because you can't effectively engage and persuade all the 
                    stakeholders involved in the purchasing decision.
                  </p>
                  <div className="p-4 bg-green-50 rounded-md border border-green-100">
                    <p className="flex items-start gap-2">
                      <CheckCircle size={20} className="text-green-600 mt-1 flex-shrink-0" />
                      <span className="text-green-800">
                        We create stakeholder mapping systems and content strategies that address 
                        the unique concerns of each decision-maker in the buying committee.
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
                    Marketing and Sales Misalignment
                  </h3>
                  <p className="text-prometheus-gray mb-4">
                    Your marketing team generates leads that sales considers low quality, 
                    while sales pursues opportunities without leveraging marketing resources.
                  </p>
                  <div className="p-4 bg-green-50 rounded-md border border-green-100">
                    <p className="flex items-start gap-2">
                      <CheckCircle size={20} className="text-green-600 mt-1 flex-shrink-0" />
                      <span className="text-green-800">
                        We implement unified CRM and automation systems with clear SLAs 
                        between teams, creating a seamless revenue operation.
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
                    Poor ROI Tracking
                  </h3>
                  <p className="text-prometheus-gray mb-4">
                    You invest in marketing and sales technology but struggle to 
                    measure its impact on your bottom line.
                  </p>
                  <div className="p-4 bg-green-50 rounded-md border border-green-100">
                    <p className="flex items-start gap-2">
                      <CheckCircle size={20} className="text-green-600 mt-1 flex-shrink-0" />
                      <span className="text-green-800">
                        We set up attribution models and reporting dashboards that 
                        clearly show which activities drive revenue, so you can optimize spending.
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-16 text-center">
              <Link to="/manufacturing">
                <Button className="bg-prometheus-navy hover:bg-prometheus-navy/90 text-white flex items-center gap-2 mx-auto">
                  Explore Manufacturing Solutions
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
              <h2 className="section-title">What Our B2B Clients Say</h2>
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
          title="Ready to Win More B2B Deals?"
          description="Book a complimentary Growth Audit to discover how we can help you transform your B2B sales approach."
          buttonText="Book Your Growth Audit"
          buttonLink="/book-audit"
          color="navy"
        />
      </main>
      <Footer />
    </>
  );
};

export default B2BPage;
