
import React from "react";
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import ProofRibbon from "@/components/common/ProofRibbon";
import WhoWeHelpPanel from "@/components/home/WhoWeHelpPanel";
import ProcessStrip from "@/components/home/ProcessStrip";
import CTABanner from "@/components/common/CTABanner";
import SEO from "@/components/SEO";
import { getHomePageSchema } from "@/utils/schema";
import { Link } from "react-router-dom";

const Index = () => {
  // Mock data for the ProofRibbon component
  const clients = [
    {
      name: "Client 1",
      logo: "https://placehold.co/200x100/gray/white?text=LOGO+1",
    },
    {
      name: "Client 2",
      logo: "https://placehold.co/200x100/gray/white?text=LOGO+2",
    },
    {
      name: "Client 3",
      logo: "https://placehold.co/200x100/gray/white?text=LOGO+3",
    },
    {
      name: "Client 4",
      logo: "https://placehold.co/200x100/gray/white?text=LOGO+4",
    },
    {
      name: "Client 5",
      logo: "https://placehold.co/200x100/gray/white?text=LOGO+5",
    },
  ];

  const kpis = [
    {
      value: "+42%",
      label: "Average Revenue Growth",
    },
    {
      value: "-28%",
      label: "Reduced Acquisition Cost",
    },
    {
      value: "35%",
      label: "Shorter Sales Cycles",
    },
    {
      value: "47%",
      label: "Increased Conversion Rates",
    },
  ];

  // Get structured data for the home page
  const schemaMarkup = getHomePageSchema();

  return (
    <>
      <SEO 
        title="Prometheus Agency - Tame the Tech. Unleash the Growth."
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
            <h1 className="text-3xl md:text-4xl font-bold text-prometheus-navy mb-6">
              Strategic Growth Solutions for Modern Businesses
            </h1>
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
        
        <ProofRibbon clients={clients} kpis={kpis} />
        <WhoWeHelpPanel />
        <ProcessStrip />
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
