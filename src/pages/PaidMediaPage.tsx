import React from "react";
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/layout/Footer";
import CTABanner from "@/components/common/CTABanner";
import SEO from "@/components/SEO";

const PaidMediaPage = () => {
  return (
    <>
      <SEO
        title="Paid Media Services | Prometheus Agency"
        description="Precision targeting, creative built for scroll speed, and AI-driven optimizations—all tied back to revenue inside your CRM."
        canonical="/services/paid-media"
      />
      <Navbar />
      <main>
        <section className="pt-24 pb-16 bg-gradient-to-br from-white to-gray-50">
          <div className="container-custom text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-semibold text-prometheus-navy mb-6">
              Paid Media that Fuels Pipeline
            </h1>
            <p className="text-lg text-prometheus-gray mb-8">
              Precision targeting, creative built for scroll speed, and AI-driven optimizations—all tied back to revenue inside your CRM.
            </p>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container-custom max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Our Philosophy</h2>
            <p className="text-lg text-prometheus-gray">
              Ad platforms change daily, but the fundamentals hold: relevance wins, speed matters, and data beats opinions. We deploy dynamic creative testing at scale, refresh audiences weekly, and let machine learning reallocate budget in near real-time.
            </p>
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="container-custom max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-10">Engagement Blueprint</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Blueprint & Forecast",
                  desc: "We model reach, CPL, and expected revenue before launch, anchoring budgets to realistic outcomes."
                },
                {
                  title: "Build & Launch",
                  desc: "Campaigns across LinkedIn, Meta, Google, and display go live with channel-specific creative and consistent UTM hygiene."
                },
                {
                  title: "Optimize & Expand",
                  desc: "Daily pacing checks, weekly creative swaps, and monthly strategy reviews keep ROAS on target while uncovering new pockets of demand."
                }
              ].map((step, idx) => (
                <div key={idx} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                  <h3 className="text-xl font-semibold mb-3 text-prometheus-navy">{step.title}</h3>
                  <p className="text-prometheus-gray text-sm">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container-custom max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Outcomes You'll See</h2>
            <p className="text-prometheus-gray mb-8">
              Lower cost per opportunity, faster payback periods, and a feedback loop that sharpens messaging across owned channels. Many clients see 3–5× pipeline impact within the first 60 days.
            </p>
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="container-custom max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Why Prometheus Agency</h2>
            <p className="text-prometheus-gray">
              Our media strategists sit next to RevOps engineers, ensuring ad insights translate directly into CRM intelligence and sales actions.
            </p>
          </div>
        </section>

        <CTABanner
          title="Ready to turn ad spend into dependable revenue?"
          description="Let's talk forecasting."
          buttonText="Discuss Forecasting"
          buttonLink="/book-audit"
        />
      </main>
      <Footer />
    </>
  );
};

export default PaidMediaPage; 