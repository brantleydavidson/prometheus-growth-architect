
import React from "react";
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/layout/Footer";
import CTABanner from "@/components/common/CTABanner";
import SEO from "@/components/SEO";
import ServicesHero from "@/components/services/ServicesHero";
import ServicesGrid from "@/components/services/ServicesGrid";
import ApproachSection from "@/components/services/ApproachSection";

const ServicesPage = () => {
  return (
    <>
      <SEO 
        title="Services | Prometheus Agency"
        description="Explore our range of strategic services designed to drive measurable business growth through technology and strategy."
        canonical="/services"
      />
      
      <Navbar />
      <main>
        <ServicesHero />
        <ServicesGrid />
        <ApproachSection />
        
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
