import React from "react";
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/layout/Footer";
import CTABanner from "@/components/common/CTABanner";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const PlaybooksPage = () => {
  // Playbooks data
  const playbooks = [
    {
      title: "AI Quotient Assessment",
      description: "Evaluate your organization's readiness for AI implementation across five key pillars with our comprehensive AI Quotient Assessment tool.",
      link: "/ai-quotient",
      image: "https://images.unsplash.com/photo-1677442135743-d896c4eef678"
    },
    {
      title: "Growth Acceleration Playbook",
      description: "A step-by-step framework for identifying and removing growth bottlenecks in your organization.",
      link: "/playbooks/growth-acceleration",
      image: "https://images.unsplash.com/photo-1553877522-43269d4ea984"
    },
    {
      title: "Sales Enablement Playbook",
      description: "Equip your sales team with the tools, content, and strategies they need to close more deals efficiently.",
      link: "/playbooks/sales-enablement",
      image: "https://images.unsplash.com/photo-1579389083078-4e7018379f7e"
    }
  ];

  return (
    <>
      <SEO 
        title="Tools & Playbooks | Prometheus Agency"
        description="Access our proven tools, playbooks and assessment resources for accelerating business growth across sales, marketing, and operations."
        canonical="/playbooks"
        ogType="website"
      />
      
      <Navbar />
      
      <main id="main-content">
        {/* Hero Section */}
        <section className="pt-24 pb-16 bg-gradient-to-br from-white to-gray-50" aria-labelledby="hero-heading">
          <div className="container-custom">
            <div className="text-center max-w-3xl mx-auto">
              <h1 id="hero-heading" className="text-4xl md:text-5xl font-semibold text-prometheus-navy mb-6">
                Tools & Playbooks
              </h1>
              <p className="text-lg text-prometheus-gray mb-8">
                Access our proven tools, playbooks and assessment resources to accelerate your business growth. 
                Each resource provides actionable insights and frameworks developed from our experience 
                working with hundreds of growing companies.
              </p>
              <Button asChild size="lg" className="bg-prometheus-navy hover:bg-prometheus-navy/90">
                <Link to="/ai-quotient">Take the AI Quotient Assessment</Link>
              </Button>
            </div>
          </div>
        </section>
        
        {/* Playbooks Grid */}
        <section className="py-16 bg-white" aria-labelledby="playbooks-heading">
          <div className="container-custom">
            <h2 id="playbooks-heading" className="text-3xl font-semibold text-prometheus-navy mb-12 text-center">
              Our Playbooks
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {playbooks.map((playbook, index) => (
                <Card 
                  key={index} 
                  className="overflow-hidden border border-gray-100 hover:border-prometheus-orange hover:shadow-md transition-all"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={playbook.image} 
                      alt={playbook.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-medium text-prometheus-navy mb-3">
                      {playbook.title}
                    </h3>
                    <p className="text-prometheus-gray mb-4">
                      {playbook.description}
                    </p>
                    <Link 
                      to={playbook.link}
                      className="inline-flex items-center text-prometheus-orange font-medium hover:underline"
                    >
                      Access now <ArrowRight size={16} className="ml-2" aria-hidden="true" />
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        {/* Coming Soon Section */}
        <section className="py-16 bg-gray-50" aria-labelledby="coming-soon-heading">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 id="coming-soon-heading" className="text-3xl font-semibold text-prometheus-navy mb-4">
                Coming Soon
              </h2>
              <p className="text-lg text-prometheus-gray max-w-2xl mx-auto">
                We're constantly developing new playbooks based on client success stories and 
                industry best practices. Sign up to be notified when new resources are available.
              </p>
            </div>
            
            <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow border border-gray-100">
              <h3 className="text-xl font-medium text-prometheus-navy mb-4">
                Get notified about new playbooks
              </h3>
              <div className="flex flex-col sm:flex-row gap-3 mb-3">
                <input 
                  type="email"
                  placeholder="Enter your email"
                  className="px-4 py-2 border border-gray-300 rounded flex-1"
                  aria-label="Email for playbook notifications"
                />
                <Button className="bg-prometheus-orange hover:bg-prometheus-orange/90">
                  Subscribe
                </Button>
              </div>
              <p className="text-sm text-prometheus-gray">
                We respect your privacy and will never share your information.
              </p>
            </div>
          </div>
        </section>
        
        <CTABanner
          title="Need a Custom Playbook for Your Business?"
          description="Schedule a consultation with our strategists to develop a custom growth playbook tailored to your unique business needs."
          buttonText="Schedule a Consultation"
          buttonLink="/book-audit"
        />
      </main>
      
      <Footer />
    </>
  );
};

export default PlaybooksPage;
