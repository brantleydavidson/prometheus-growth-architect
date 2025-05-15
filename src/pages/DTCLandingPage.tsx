import React from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/layout/Footer";
import CTABanner from "@/components/common/CTABanner";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, ArrowRight } from "lucide-react";

const DTCLandingPage = () => {
  // SEO data
  const seoTitle = "Direct-to-Consumer Growth Solutions | Prometheus Agency";
  const seoDescription = "Drive DTC growth with AI-powered marketing strategies that lower acquisition costs and increase lifetime customer value.";
  
  // Main industries we serve
  const industries = [
    {
      name: "eCommerce",
      description: "Optimize your online store experience and marketing strategies to drive more conversions and repeat purchases.",
      link: "/ecommerce",
      icon: "/lovable-uploads/7dbfc2c4-9dea-4bcd-a3b3-c1177facb45a.png"
    },
    {
      name: "Restoration",
      description: "Build customer trust and showcase quality results with targeted digital marketing for restoration businesses.",
      link: "/restoration",
      icon: "/lovable-uploads/7dbfc2c4-9dea-4bcd-a3b3-c1177facb45a.png"
    },
    {
      name: "Consumer Services",
      description: "Stand out in competitive service markets with personalized customer experiences and targeted acquisition strategies.",
      link: "/consumer-services",
      icon: "/lovable-uploads/7dbfc2c4-9dea-4bcd-a3b3-c1177facb45a.png"
    }
  ];

  // Benefits
  const benefits = [
    "Reduce customer acquisition costs by up to 28%",
    "Increase customer lifetime value with personalized journeys",
    "Optimize ad spend with AI-powered targeting",
    "Create seamless omnichannel customer experiences",
    "Leverage first-party data for better marketing decisions",
    "Improve conversion rates through experimentation"
  ];

  return (
    <>
      <SEO 
        title={seoTitle}
        description={seoDescription}
        canonical="/dtc"
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
                  Grow Your DTC Brand <span className="text-prometheus-gold">More Efficiently</span>
                </h1>
                <p className="text-lg text-prometheus-gray mb-8 max-w-lg">
                  Overcome rising acquisition costs and crowded marketplaces with data-driven strategies
                  that find your ideal customers and turn them into loyal advocates.
                </p>
                <div className="space-y-4 mb-8">
                  {benefits.slice(0, 3).map((benefit, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="text-prometheus-gold mt-1 flex-shrink-0" size={20} aria-hidden="true" />
                      <p>{benefit}</p>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild size="lg" className="bg-prometheus-gold hover:bg-prometheus-gold/90">
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
                    src="https://images.unsplash.com/photo-1556742049-0a8e1b0c2188" 
                    alt="Direct-to-consumer marketing strategy session" 
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
                DTC Industries We Serve
              </h2>
              <p className="text-lg text-prometheus-gray max-w-2xl mx-auto">
                We've developed specialized approaches for different DTC sectors based on years of experience
                and data-driven insights.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {industries.map((industry, index) => (
                <Card key={index} className="border border-gray-100 hover:border-prometheus-gold transition-all duration-300">
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
                      className="inline-flex items-center text-prometheus-gold font-medium hover:underline"
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
                  Why DTC Brands Choose Prometheus
                </h2>
                <p className="text-lg text-prometheus-gray mb-6">
                  We understand the unique challenges of direct-to-consumer growth and have developed proven strategies
                  to overcome them.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="text-prometheus-gold mt-1 flex-shrink-0" size={20} aria-hidden="true" />
                      <p>{benefit}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-100">
                <blockquote className="italic text-lg text-prometheus-gray mb-6">
                  "Working with Prometheus transformed our marketing approach. They helped us reduce CPAs by 32% 
                  while increasing our average order value by 24%. The results exceeded our expectations."
                </blockquote>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-200 rounded-full mr-4" aria-hidden="true"></div>
                  <div>
                    <p className="font-medium text-prometheus-navy">Michael Chen</p>
                    <p className="text-sm text-prometheus-gray">Marketing Director, GrowDTC Brands</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <CTABanner
          title="Ready to Boost Your DTC Growth?"
          description="Book a complimentary Growth Audit to discover how we can help you acquire more customers at a lower cost."
          buttonText="Book Your DTC Growth Audit"
          buttonLink="/book-audit"
          color="gold"
        />
      </main>
      
      <Footer />
    </>
  );
};

export default DTCLandingPage;
