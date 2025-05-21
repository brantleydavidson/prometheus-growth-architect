import React from "react";
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/layout/Footer";
import CTABanner from "@/components/common/CTABanner";
import SEO from "@/components/SEO";

const CustomerJourneyPage = () => {
  return (
    <>
      <SEO
        title="Customer Journey Mapping | Prometheus Agency"
        description="Convert touchpoints into a seamless story that moves buyers from curiosity to advocacy."
        canonical="/services/customer-journey"
      />
      <Navbar />
      <main>
        {/* Hero */}
        <section className="pt-24 pb-16 bg-gradient-to-br from-white to-gray-50">
          <div className="container-custom text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-semibold text-prometheus-navy mb-6">
              Customer Journey Mapping
            </h1>
            <p className="text-lg text-prometheus-gray mb-8">
              Convert touchpoints into a seamless story that moves buyers from curiosity to advocacy.
            </p>
          </div>
        </section>

        {/* Philosophy */}
        <section className="py-16 bg-white">
          <div className="container-custom max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Our Philosophy</h2>
            <p className="text-lg text-prometheus-gray">
              Great journeys are designed backwards—from the moment a customer renews or refers, all the way to first awareness. We anchor each stage to measurable intent signals, then align content, messaging, and operational triggers so buyers always know what comes next.
            </p>
          </div>
        </section>

        {/* Engagement Blueprint */}
        <section className="py-16 bg-gray-50">
          <div className="container-custom max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-10">Engagement Blueprint</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Research & Persona Alignment",
                  desc: "We analyze behavioral data, interview customers, and validate personas against real purchase patterns."
                },
                {
                  title: "Journey Visualization",
                  desc: "High-fidelity maps illustrate channels, emotions, and KPIs for each stage, giving teams a shared north star."
                },
                {
                  title: "Playbook Activation",
                  desc: "Email sequences, chat prompts, and ad retargeting flows are built directly in your CRM and automation stack, complete with SLA alerts."
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

        {/* Outcomes */}
        <section className="py-16 bg-white">
          <div className="container-custom max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Outcomes You'll See</h2>
            <p className="text-prometheus-gray mb-8">
              Shorter sales cycles, higher NPS, and an average 20 percent lift in marketing-qualified leads that convert to pipeline. Cross-functional teams gain clarity on who owns which moment and which metric.
            </p>
          </div>
        </section>

        {/* Why Prometheus */}
        <section className="py-16 bg-gray-50">
          <div className="container-custom max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Why Prometheus Agency</h2>
            <p className="text-prometheus-gray">
              We combine narrative strategy with RevOps engineering. That means the beautiful diagram your C-suite loves is the same blueprint your marketing automation actually runs.
            </p>
          </div>
        </section>

        {/* CTA */}
        <CTABanner
          title="Turn your buyer journey into your best sales asset."
          description="Book a workshop."
          buttonText="Book Workshop"
          buttonLink="/book-audit"
        />
      </main>
      <Footer />
    </>
  );
};

export default CustomerJourneyPage; 