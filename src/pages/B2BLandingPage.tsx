import React from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/layout/Footer";
import CTABanner from "@/components/common/CTABanner";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, ArrowRight } from "lucide-react";

const B2BLandingPage = () => {
  // SEO data
  const seoTitle = "B2B Growth Solutions | Prometheus Agency";
  const seoDescription = "Transform your B2B sales process with AI-enabled strategies that shorten sales cycles and align your teams for consistent growth.";
  
  // Main industries we serve
  const industries = [
    {
      name: "Manufacturing",
      description: "Optimize complex sales processes for manufacturing businesses with our data-driven approach.",
      link: "/manufacturing",
      icon: "/images/icons/b2b-manufacturing-icon.png"
    },
    {
      name: "Professional Services",
      description: "Elevate your professional services firm with streamlined client acquisition and retention strategies.",
      link: "/professional-services",
      icon: "/images/icons/b2b-professional-services-icon.png"
    },
    {
      name: "SaaS",
      description: "Accelerate growth for your SaaS business with optimized customer acquisition and expansion strategies.",
      link: "/saas",
      icon: "/images/icons/b2b-services-saas-icon.png"
    }
  ];

  // Benefits
  const benefits = [
    "Shorten sales cycles by up to 35%",
    "Align marketing and sales teams for cohesive execution",
    "Navigate complex B2B buying committees effectively",
    "Track and attribute ROI across lengthy customer journeys",
    "Optimize resource allocation for maximum growth impact",
    "Leverage AI to identify high-value prospects earlier"
  ];

  return (
    <>
      <SEO 
        title={seoTitle}
        description={seoDescription}
        canonical="/b2b"
        ogType="website"
      />
      
      <Navbar />
      
      <main id="main-content">
        {/* Hero Section */}
        <section className="pt-24 pb-16 bg-gradient-to-br from-white to-gray-50" aria-labelledby="hero-heading">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 id="hero-heading" className="text-4xl md:text-5xl font-semibold text-prometheus-navy mb-6 leading-tight">
                  B2B Growth <span className="text-prometheus-orange">Without the Complexity</span>
                </h1>
                <p className="text-lg text-prometheus-gray mb-8 max-w-lg">
                  Transform your technology chaos into a strategic advantage that shortens sales cycles, 
                  aligns teams, and delivers measurable ROI for your B2B organization.
                </p>
                <div className="space-y-4 mb-8">
                  {benefits.slice(0, 3).map((benefit, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="text-prometheus-orange mt-1 flex-shrink-0" size={20} aria-hidden="true" />
                      <p>{benefit}</p>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild size="lg" className="bg-prometheus-orange hover:bg-prometheus-orange/90">
                    <Link to="/book-audit">Book Growth Audit</Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link to="/services">Explore Services</Link>
                  </Button>
                </div>
              </div>
              
              <div className="relative">
                <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden shadow-lg">
                  <img 
                    src="/images/pages/b2b-page-main-hero.png" 
                    alt="B2B professionals analyzing growth data" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Industries Section */}
        <section className="py-20 bg-white" aria-labelledby="industries-heading">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 id="industries-heading" className="text-3xl font-semibold text-prometheus-navy mb-4">
                B2B Industries We Serve
              </h2>
              <p className="text-lg text-prometheus-gray max-w-2xl mx-auto">
                We understand the unique challenges of different B2B sectors and have developed 
                specialized approaches for each.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {industries.map((industry, index) => (
                <Card key={index} className="border border-gray-100 hover:border-prometheus-orange transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="mb-4">
                      <img 
                        src={industry.icon} 
                        alt={`${industry.name} icon`} 
                        className="w-16 h-16"
                      />
                    </div>
                    <h3 className="text-xl font-medium text-prometheus-navy mb-2">
                      {industry.name}
                    </h3>
                    <p className="text-prometheus-gray mb-4">
                      {industry.description}
                    </p>
                    <Link 
                      to={industry.link}
                      className="inline-flex items-center text-prometheus-orange font-medium hover:underline"
                    >
                      Learn more <ArrowRight size={16} className="ml-2" aria-hidden="true" />
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        {/* Additional Benefits Section */}
        <section className="py-16 bg-gray-50" aria-labelledby="benefits-heading">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 id="benefits-heading" className="text-3xl font-semibold text-prometheus-navy mb-6">
                  Why B2B Organizations Choose Prometheus
                </h2>
                <p className="text-lg text-prometheus-gray mb-6">
                  We understand the unique challenges of B2B growth and have developed proven strategies
                  to address them head-on.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="text-prometheus-orange mt-1 flex-shrink-0" size={20} aria-hidden="true" />
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
                  <div className="w-12 h-12 bg-gray-200 rounded-full mr-4" aria-hidden="true"></div>
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

export default B2BLandingPage;
