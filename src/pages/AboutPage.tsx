
import React from "react";
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/layout/Footer";
import SEO from "@/components/SEO";
import AboutHero from "@/components/about/AboutHero";
import AboutValues from "@/components/about/AboutValues";
import AboutWorkProcess from "@/components/about/AboutWorkProcess";
import AboutMission from "@/components/about/AboutMission";
import AboutPartners from "@/components/about/AboutPartners";
import AboutTech from "@/components/about/AboutTech";
import AboutTeam from "@/components/about/AboutTeam";
import CTABanner from "@/components/common/CTABanner";

const AboutPage = () => {
  return (
    <>
      <SEO 
        title="About Us | Prometheus Agency"
        description="Learn about Prometheus Agency's mission, values, and how we bring enterprise-level strategies to help businesses transform challenges into growth opportunities."
        canonical="/about"
        schemaMarkup={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          "name": "About Prometheus Agency",
          "description": "Prometheus Agency brings enterprise-level strategies to businesses, helping them transform technical challenges into growth opportunities.",
          "url": "https://prometheusagency.co/about",
          "mainEntity": {
            "@type": "Organization",
            "name": "Prometheus Agency",
            "url": "https://prometheusagency.co",
            "logo": "https://prometheusagency.co/logo.png"
          }
        }}
      />
      
      <Navbar />
      <main>
        <AboutHero />
        <AboutValues />
        <AboutWorkProcess />
        <AboutMission />
        <AboutPartners />
        <AboutTech />
        <AboutTeam />
        
        <CTABanner
          title="Ready to Transform Your Business?"
          description="Contact Prometheus Agency to discuss your Growth or CRM needs. Our team of experts will align your marketing and sales strategies for success."
          buttonText="Book A Call"
          buttonLink="/book-audit"
          color="orange"
        />
      </main>
      <Footer />
    </>
  );
};

export default AboutPage;
