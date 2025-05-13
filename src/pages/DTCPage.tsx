
import React from "react";
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/layout/Footer";
import CTABanner from "@/components/common/CTABanner";
import SEO from "@/components/SEO";
import DTCHero from "@/components/dtc/DTCHero";
import PainToSolution from "@/components/dtc/PainToSolution";
import DTCTestimonials from "@/components/dtc/DTCTestimonials";

const DTCPage = () => {
  return (
    <>
      <SEO 
        title="DTC Solutions | Prometheus Agency"
        description="Lower acquisition costs and higher conversions for Direct-to-Consumer businesses through AI-driven targeting and customer journey optimization."
        canonical="/dtc"
      />
      
      <Navbar />
      <main>
        <DTCHero />
        <PainToSolution />
        <DTCTestimonials />
        
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
