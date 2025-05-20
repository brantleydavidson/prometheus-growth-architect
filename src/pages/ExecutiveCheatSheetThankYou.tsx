import React from "react";
import SEO from "@/components/SEO";
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const ExecutiveCheatSheetThankYou: React.FC = () => {
  // Placeholder download link; replace with real PDF asset URL
  const downloadUrl = "/assets/executive_ai_cheatsheet.pdf";

  return (
    <>
      <SEO
        title="Cheatsheet Sent | Prometheus Agency"
        description="Your Executive AI Transformation Cheatsheet is on its way!"
        canonical="/executive-cheatsheet/thank-you"
        ogType="website"
      />

      <Navbar />

      <section className="py-24 bg-gradient-to-b from-emerald-50 to-white text-center">
        <div className="container mx-auto px-4 max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold text-prometheus-navy mb-6">
            Your Cheatsheet Is On Its Way!
          </h1>
          <p className="text-lg text-gray-700 mb-8">
            Check your inbox for the download link. If it doesn't arrive within a few minutes, please check your spam folder.
            You can also download it directly below.
          </p>
          <a href={downloadUrl} target="_blank" rel="noopener noreferrer">
            <Button size="lg">Download PDF</Button>
          </a>
          <p className="text-sm text-gray-500 mt-6">
            Want to discuss a tailored AI roadmap for your organization? <Link to="/book-audit" className="text-primary underline underline-offset-2">Book a strategy session</Link>.
          </p>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default ExecutiveCheatSheetThankYou; 