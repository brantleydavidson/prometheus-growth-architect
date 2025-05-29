import React from "react";
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/layout/Footer";
import CTABanner from "@/components/common/CTABanner";
import SEO from "@/components/SEO";
import { getB2BPageSchema, getBreadcrumbSchema } from "@/utils/schema";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

const B2BPage = () => {
  // Generate structured data for SEO
  const schemaMarkup = getB2BPageSchema();
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "B2B Solutions", url: "/b2b" },
  ]);

  // Combine schemas
  const combinedSchema = [schemaMarkup, breadcrumbSchema];

  const benefits = [
    "Shorten sales cycles by up to 35%",
    "Align marketing and sales teams for cohesive execution",
    "Navigate complex B2B buying committees effectively",
    "Track and attribute ROI across lengthy customer journeys",
    "Optimize resource allocation for maximum growth impact",
    "Leverage AI to identify high-value prospects earlier"
  ];

  const solutions = [
    {
      title: "CRM Implementation & Optimization",
      description: "Custom CRM solutions designed for complex B2B sales cycles and multiple stakeholders.",
      icon: "https://placehold.co/100x100/gray/white?text=CRM"
    },
    {
      title: "Marketing & Sales Alignment",
      description: "Strategic frameworks that align your teams around shared goals and consistent messaging.",
      icon: "https://placehold.co/100x100/gray/white?text=MSA"
    },
    {
      title: "AI-Enabled Lead Scoring",
      description: "Predictive models that identify your most promising prospects based on behavioral patterns.",
      icon: "https://placehold.co/100x100/gray/white?text=AI"
    },
    {
      title: "Account-Based Marketing",
      description: "Targeted approaches for engaging key decision makers within strategic accounts.",
      icon: "https://placehold.co/100x100/gray/white?text=ABM"
    }
  ];

  return (
    <>
      <SEO 
        title="B2B Growth Solutions | Prometheus Agency"
        description="Shorten sales cycles and align teams with our strategic B2B growth solutions. AI-powered lead identification and proven ROI tracking."
        canonical="/b2b"
        schemaMarkup={combinedSchema}
      />
      
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="pt-24 pb-16 bg-gradient-to-br from-white to-gray-50">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl md:text-5xl font-semibold text-prometheus-navy mb-6 leading-tight">
                  B2B Growth <span className="text-prometheus-orange">Without the Complexity</span>
                </h1>
                <p className="text-lg text-prometheus-gray mb-8 max-w-lg">
                  Transform your technology chaos into a strategic advantage that shortens sales cycles, 
                  aligns teams, and delivers measurable ROI for your B2B organization.
                </p>
                <div className="space-y-4 mb-8">
                  {benefits.slice(0, 3).map((benefit, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="text-prometheus-orange mt-1" size={20} />
                      <p>{benefit}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="relative">
                <img
                  src="/images/pages/b2b-page-main-hero.png"
                  alt="B2B Solutions Hero - Prometheus Agency"
                  width="1200"
                  height="600"
                  loading="eager"
                  style={{ width: '100%', height: 'auto' }}
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Solutions Section */}
        <section className="py-20">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-semibold text-prometheus-navy mb-4">
                Our B2B Growth Solutions
              </h2>
              <p className="text-lg text-prometheus-gray max-w-2xl mx-auto">
                Strategic services designed specifically for the complexities of B2B sales environments.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {solutions.map((solution, index) => (
                <Card key={index} className="border border-gray-100 hover:border-prometheus-orange transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="mb-4">
                      <img 
                        src={solution.icon} 
                        alt={`${solution.title} icon`} 
                        className="w-16 h-16"
                      />
                    </div>
                    <h3 className="text-xl font-medium text-prometheus-navy mb-2">
                      {solution.title}
                    </h3>
                    <p className="text-prometheus-gray">
                      {solution.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        {/* Additional Benefits Section */}
        <section className="py-16 bg-gray-50">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-semibold text-prometheus-navy mb-6">
                  Why B2B Organizations Choose Prometheus
                </h2>
                <p className="text-lg text-prometheus-gray mb-6">
                  We understand the unique challenges of B2B growth and have developed proven strategies
                  to address them head-on.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="text-prometheus-orange mt-1" size={20} />
                      <p>{benefit}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-100">
                <blockquote className="italic text-lg text-prometheus-gray mb-6">
                  "Prometheus Agency helped us transform our disjointed tech stack and misaligned teams into
                  a cohesive growth engine. Our sales cycles shortened by 42% and revenue increased by 38% in
                  the first six months alone."
                </blockquote>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
                  <div>
                    <p className="font-medium text-prometheus-navy">Sarah Johnson</p>
                    <p className="text-sm text-prometheus-gray">CMO, EnterpriseGrowth Inc.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <CTABanner
          title="Ready to Transform Your B2B Growth Strategy?"
          description="Book a complimentary Growth Audit to discover how we can help you overcome complex B2B challenges."
          buttonText="Book Your B2B Growth Audit"
          buttonLink="/book-audit"
          color="navy"
        />
      </main>
      <Footer />
    </>
  );
};

export default B2BPage;
