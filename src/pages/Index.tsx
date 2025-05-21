import React from "react";
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import WhoWeHelpPanel from "@/components/home/WhoWeHelpPanel";
import ProcessStrip from "@/components/home/ProcessStrip";
import CTABanner from "@/components/common/CTABanner";
import SEO from "@/components/SEO";
import { getHomePageSchema, getBreadcrumbSchema } from "@/utils/schema";
import { Link } from "react-router-dom";
import AboutPartners from "@/components/about/AboutPartners";

const Index = () => {
  // Get structured data for the home page
  const homeSchema = getHomePageSchema();
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" }
  ]);
  
  const schemaMarkup = [homeSchema, breadcrumbSchema];

  return (
    <>
      <SEO 
        title="Prometheus Agency - Tame Your Tech. Unleash Growth."
        description="We help B2B and DTC businesses transform technology chaos into strategic growth engines with AI enablement and proven GTM strategies."
        canonical="/"
        schemaMarkup={schemaMarkup}
      />
      
      <Navbar />
      <main>
        <HeroSection />
        
        {/* Introduction Section with Proper Heading Structure */}
        <section className="bg-white py-12">
          <div className="container-custom">
            <h2 className="text-3xl md:text-4xl font-bold text-prometheus-navy mb-6">
              Strategic Growth Solutions for Modern Businesses
            </h2>
            <p className="text-lg text-prometheus-gray mb-6 max-w-3xl">
              At <strong>Prometheus Agency</strong>, we specialize in transforming technological complexity into 
              sustainable growth for both B2B and DTC businesses. Our team of experts leverages 
              cutting-edge AI technologies and proven go-to-market strategies to help you navigate 
              the digital landscape and achieve measurable results.
            </p>
            <p className="text-lg text-prometheus-gray mb-8">
              Whether you're struggling with lengthy sales cycles, rising customer acquisition costs, 
              or inefficient tech stacks, our tailored solutions address your unique challenges and 
              unlock new opportunities for growth and efficiency.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/services" className="inline-flex items-center text-prometheus-orange hover:text-prometheus-orange/80 font-medium">
                Discover our full range of services <span className="ml-2">→</span>
              </Link>
            </div>
          </div>
        </section>
        
        <AboutPartners />
        
        {/* Additional Value Proposition Section */}
        <section className="py-20 bg-gray-50">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl font-semibold text-prometheus-navy mb-6">
                  Why Businesses Choose Prometheus
                </h2>
                <p className="text-lg text-prometheus-gray mb-6">
                  Our unique approach combines strategic insight, technological expertise, and operational 
                  excellence to deliver measurable growth for our clients.
                </p>
                
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-prometheus-orange/10 flex items-center justify-center shrink-0">
                      <span className="text-prometheus-orange font-semibold text-xl">1</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-medium text-prometheus-navy mb-2">Strategic Focus</h3>
                      <p className="text-prometheus-gray">
                        We prioritize business outcomes over technical complexity, ensuring every solution 
                        drives meaningful growth and ROI.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-prometheus-orange/10 flex items-center justify-center shrink-0">
                      <span className="text-prometheus-orange font-semibold text-xl">2</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-medium text-prometheus-navy mb-2">Practical Implementation</h3>
                      <p className="text-prometheus-gray">
                        Our recommendations aren't theoretical—they're actionable plans with clear steps, 
                        timelines, and accountability.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-prometheus-orange/10 flex items-center justify-center shrink-0">
                      <span className="text-prometheus-orange font-semibold text-xl">3</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-medium text-prometheus-navy mb-2">Holistic Approach</h3>
                      <p className="text-prometheus-gray">
                        We integrate technology, strategy, and process optimization to create comprehensive 
                        solutions that address the entire customer journey.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 grid-rows-2 gap-4">
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                  <div className="text-3xl md:text-4xl font-bold text-prometheus-orange mb-2">9.1/10</div>
                  <p className="text-prometheus-gray">Client Satisfaction Rating</p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                  <div className="text-3xl md:text-4xl font-bold text-prometheus-orange mb-2">300+</div>
                  <p className="text-prometheus-gray">Projects Completed</p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                  <div className="text-3xl md:text-4xl font-bold text-prometheus-orange mb-2">16+</div>
                  <p className="text-prometheus-gray">CRM Strategies Delivered</p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                  <div className="text-3xl md:text-4xl font-bold text-prometheus-orange mb-2">58%</div>
                  <p className="text-prometheus-gray">Average Reduction in Manual Effort</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <CTABanner
          title="Ready to Transform Chaos into Growth?"
          description="Book a complimentary Growth Audit to discover how we can help you tame your technology and unleash sustainable growth."
          buttonText="Book Your Growth Audit"
          buttonLink="/book-audit"
          color="orange"
        />
      </main>
      <Footer />
    </>
  );
};

export default Index;
