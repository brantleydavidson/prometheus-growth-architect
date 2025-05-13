
import React from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, Bot, LineChart, Users, Database, BarChart3, Zap } from "lucide-react";
import CTABanner from "@/components/common/CTABanner";
import SEO from "@/components/SEO";

const ServicesPage = () => {
  const services = [
    {
      icon: Bot,
      title: "AI Enablement & Integration",
      description: "Harness the power of AI to automate processes, gain insights, and create competitive advantages.",
      link: "/services/ai-enablement",
      featured: true,
      color: "bg-prometheus-orange/10",
      textColor: "text-prometheus-orange",
    },
    {
      icon: LineChart,
      title: "Consulting & GTM Strategy",
      description: "Develop comprehensive go-to-market strategies that align your team and accelerate growth.",
      link: "/services/consulting-gtm",
      featured: true,
      color: "bg-prometheus-gold/10",
      textColor: "text-prometheus-gold",
    },
    {
      icon: Database,
      title: "CRM Implementation",
      description: "Deploy and optimize customer relationship management systems that drive results.",
      link: "/services/crm-implementation",
      color: "bg-prometheus-navy/10",
      textColor: "text-prometheus-navy",
    },
    {
      icon: Users,
      title: "Customer Journey Mapping",
      description: "Create seamless, personalized customer experiences across all touchpoints.",
      link: "/services/customer-journey",
      color: "bg-prometheus-navy/10",
      textColor: "text-prometheus-navy",
    },
    {
      icon: Zap,
      title: "Paid Media",
      description: "Develop and execute high-performance paid advertising campaigns that drive quality leads.",
      link: "/services/paid-media",
      color: "bg-prometheus-navy/10",
      textColor: "text-prometheus-navy",
    },
    {
      icon: BarChart3,
      title: "Reporting & Analytics",
      description: "Transform data into actionable insights with custom dashboards and reporting.",
      link: "/services/reporting-analytics",
      color: "bg-prometheus-navy/10",
      textColor: "text-prometheus-navy",
    },
  ];

  return (
    <>
      <SEO 
        title="Services | Prometheus Agency"
        description="Explore our range of strategic services designed to drive measurable business growth through technology and strategy."
        canonical="/services"
      />
      
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="pt-16 pb-24 bg-prometheus-navy text-white">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-semibold mb-6">
                Services That Drive Measurable Growth
              </h1>
              <p className="text-white/80 text-lg mb-6 max-w-2xl mx-auto">
                We don't just implement technology – we create <strong>integrated growth systems</strong> 
                that deliver tangible business outcomes. Every service we offer is 
                designed to produce measurable ROI.
              </p>
              <p className="text-white/80 text-lg mb-12 max-w-2xl mx-auto">
                Our team of experts combines technical expertise with strategic thinking to help you
                navigate complex business challenges and capitalize on emerging opportunities.
              </p>
              <Link to="/book-audit">
                <Button className="bg-prometheus-orange hover:bg-prometheus-orange/90 px-8 py-6 text-base">
                  Book a Growth Audit
                </Button>
              </Link>
            </div>
          </div>
        </section>
        
        {/* Services Grid Section */}
        <section className="py-20">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="section-title">Our Service Offerings</h2>
              <p className="section-subtitle">
                We offer a comprehensive suite of services that can be tailored to your 
                specific business challenges and growth objectives.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <div 
                  key={index} 
                  className={`p-8 rounded-lg border ${
                    service.featured 
                      ? "border-2 border-prometheus-orange shadow-lg" 
                      : "border-gray-200"
                  } hover:shadow-xl transition-all`}
                >
                  <div className={`w-14 h-14 rounded-full ${service.color} flex items-center justify-center mb-6`}>
                    <service.icon size={28} className={service.textColor} aria-hidden="true" />
                  </div>
                  <h3 className="text-xl font-semibold text-prometheus-navy mb-3">
                    {service.title}
                  </h3>
                  <p className="text-prometheus-gray mb-6">
                    {service.description}
                  </p>
                  <Link to={service.link}>
                    <Button 
                      variant="outline" 
                      className={`w-full border-prometheus-navy text-prometheus-navy hover:bg-prometheus-navy hover:text-white flex items-center justify-center gap-2 ${
                        service.featured ? "mt-4" : ""
                      }`}
                    >
                      Learn More
                      <ArrowRight size={16} />
                    </Button>
                  </Link>
                  {service.featured && (
                    <div className="mt-4 text-center">
                      <span className="text-sm font-medium text-prometheus-orange">Featured Service</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Approach Section */}
        <section className="py-20 bg-gray-50">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="section-title">Our Approach</h2>
              <p className="section-subtitle">
                We believe in a systematic, results-driven approach that ensures 
                you get maximum value from our partnership.
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <div className="relative">
                {/* Step 1 */}
                <div className="flex flex-col md:flex-row gap-8 mb-12">
                  <div className="md:w-1/3 flex flex-col items-center md:items-end">
                    <div className="w-12 h-12 rounded-full bg-prometheus-orange text-white flex items-center justify-center text-xl font-semibold mb-4">1</div>
                    <h3 className="text-xl font-semibold text-prometheus-navy mb-2 text-center md:text-right">Discovery & Assessment</h3>
                  </div>
                  <div className="md:w-2/3 md:pt-4">
                    <p className="text-prometheus-gray">
                      We conduct a thorough analysis of your current systems, processes, 
                      and market position to identify <strong>opportunities and challenges</strong>.
                    </p>
                  </div>
                </div>
                
                {/* Step 2 */}
                <div className="flex flex-col md:flex-row gap-8 mb-12">
                  <div className="md:w-1/3 flex flex-col items-center md:items-end">
                    <div className="w-12 h-12 rounded-full bg-prometheus-orange text-white flex items-center justify-center text-xl font-semibold mb-4">2</div>
                    <h3 className="text-xl font-semibold text-prometheus-navy mb-2 text-center md:text-right">Strategic Planning</h3>
                  </div>
                  <div className="md:w-2/3 md:pt-4">
                    <p className="text-prometheus-gray">
                      We develop a customized roadmap with <strong>clear objectives</strong>, 
                      timelines, and success metrics aligned with your business goals.
                    </p>
                  </div>
                </div>
                
                {/* Step 3 */}
                <div className="flex flex-col md:flex-row gap-8 mb-12">
                  <div className="md:w-1/3 flex flex-col items-center md:items-end">
                    <div className="w-12 h-12 rounded-full bg-prometheus-orange text-white flex items-center justify-center text-xl font-semibold mb-4">3</div>
                    <h3 className="text-xl font-semibold text-prometheus-navy mb-2 text-center md:text-right">Implementation</h3>
                  </div>
                  <div className="md:w-2/3 md:pt-4">
                    <p className="text-prometheus-gray">
                      Our expert team executes the plan with precision, 
                      implementing <strong>technology solutions</strong> and processes that drive results.
                    </p>
                  </div>
                </div>
                
                {/* Step 4 */}
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="md:w-1/3 flex flex-col items-center md:items-end">
                    <div className="w-12 h-12 rounded-full bg-prometheus-orange text-white flex items-center justify-center text-xl font-semibold mb-4">4</div>
                    <h3 className="text-xl font-semibold text-prometheus-navy mb-2 text-center md:text-right">Optimization & Growth</h3>
                  </div>
                  <div className="md:w-2/3 md:pt-4">
                    <p className="text-prometheus-gray">
                      We continuously measure results, refine strategies, and 
                      identify new opportunities to <strong>maximize your ROI</strong>.
                    </p>
                  </div>
                </div>
                
                {/* Vertical Line */}
                <div className="absolute top-0 left-1/3 transform -translate-x-1/2 w-0.5 h-full bg-prometheus-orange/20 hidden md:block"></div>
              </div>
            </div>
          </div>
        </section>
        
        <CTABanner
          title="Ready to Accelerate Your Growth?"
          description="Book a complimentary Growth Audit to discover how our services can help you achieve your business objectives."
          buttonText="Book Your Growth Audit"
          buttonLink="/book-audit"
          color="orange"
        />
      </main>
      <Footer />
    </>
  );
};

export default ServicesPage;
