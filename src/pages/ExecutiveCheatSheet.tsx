import React from "react";
import { useNavigate } from "react-router-dom";
import SEO from "@/components/SEO";
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/layout/Footer";
import HubSpotForm from "@/components/hubspot/HubSpotForm";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, FileText, Sparkles } from "lucide-react";
import CTABanner from "@/components/common/CTABanner";

const ExecutiveCheatSheetPage: React.FC = () => {
  const navigate = useNavigate();

  const benefits = [
    {
      title: "Board-Ready Insights",
      description:
        "Cut through the noise with a one-pager that highlights exactly what leadership needs to know about AI readiness.",
      icon: <FileText className="h-6 w-6 text-primary" />,
    },
    {
      title: "Quick-Win Opportunities",
      description:
        "Identify low-effort, high-impact AI projects you can start this quarter to unlock revenue growth.",
      icon: <CheckCircle className="h-6 w-6 text-primary" />,
    },
    {
      title: "Actionable Frameworks",
      description:
        "Leverage proven frameworks and KPIs to align your teams and track AI success.",
      icon: <Sparkles className="h-6 w-6 text-primary" />,
    },
  ];

  return (
    <>
      <SEO
        title="Executive AI Transformation Cheatsheet | Prometheus Agency"
        description="Download our concise executive guide to fast-tracking AI value across your revenue operations."
        canonical="/executive-cheatsheet"
        ogType="website"
      />

      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-amber-50 to-white py-16 md:py-24">
        <div className="container mx-auto px-4 flex flex-col items-center text-center max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Get the Executive AI Transformation Cheatsheet
          </h1>
          <p className="text-lg text-gray-700 mb-8">
            A concise guide that helps senior leaders understand where to start, where to invest, and how to measure success with AI in RevOps.
          </p>
          <Button
            size="lg"
            className="group"
            onClick={() => {
              const formSection = document.getElementById("cheatsheet-form");
              formSection?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Get the Cheatsheet
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-md">
                {benefit.icon}
                <h3 className="text-xl font-semibold mt-4 mb-2 text-prometheus-navy">
                  {benefit.title}
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section id="cheatsheet-form" className="py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <HubSpotForm
            formId="executive-cheatsheet-form-id" // TODO: replace with real form ID
            onSubmitSuccess={() => navigate("/executive-cheatsheet/thank-you")}
            title="Get Your Cheatsheet"
            description="Fill out the form below and we'll send the PDF straight to your inbox."
          />
        </div>
      </section>

      {/* CTA Section */}
      <CTABanner
        title="Need a Customized AI Roadmap?"
        description="Book a strategy session with our experts to craft a roadmap tailored to your organization."
        buttonText="Book a Strategy Session"
        buttonLink="/book-audit"
      />

      <Footer />
    </>
  );
};

export default ExecutiveCheatSheetPage; 