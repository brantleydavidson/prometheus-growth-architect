import React from "react";
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/layout/Footer";
import CTABanner from "@/components/common/CTABanner";
import SEO from "@/components/SEO";

const ReportingAnalyticsPage = () => {
  return (
    <>
      <SEO
        title="Reporting & Analytics | Prometheus Agency"
        description="Real-time answers to the questions that keep revenue leaders up at night."
        canonical="/services/reporting-analytics"
      />
      <Navbar />
      <main>
        <section className="pt-24 pb-16 bg-gradient-to-br from-white to-gray-50">
          <div className="container-custom text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-semibold text-prometheus-navy mb-6">
              Reporting & Analytics
            </h1>
            <p className="text-lg text-prometheus-gray mb-8">
              Real-time answers to the questions that keep revenue leaders up at night.
            </p>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container-custom max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Our Philosophy</h2>
            <p className="text-lg text-prometheus-gray">
              Every metric should influence a decision. We strip reporting down to the essentials, automate data hygiene, and layer AI to surface patterns humans miss. The goal is simple: faster, smarter decisions that compound growth.
            </p>
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="container-custom max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-10">Engagement Blueprint</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Data Inventory & Hygiene",
                  desc: "We audit objects, properties, and integrations to resolve duplicates, fill gaps, and standardize naming conventions."
                },
                {
                  title: "Dashboard Design",
                  desc: "Engagement and revenue metrics are visualized in HubSpot, Salesforce, or Looker Studio with stakeholder-specific drill-downs."
                },
                {
                  title: "Insight Automation",
                  desc: "We embed GPT-powered prompts that translate raw numbers into plain-English narratives so your team knows not just what happened, but why."
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
              A single source of truth, executive-level confidence in the numbers, and weekly insights that shave inefficiencies from spend and process. Clients routinely cut reporting time by 70 percent within a month.
            </p>
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="container-custom max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Why Prometheus Agency</h2>
            <p className="text-prometheus-gray">
              Our analysts and RevOps architects understand both the story the numbers tell and the plumbing that delivers them. That bridge ensures insights translate into execution.
            </p>
          </div>
        </section>

        <CTABanner
          title="Ready for reporting that drives action?"
          description="Schedule a discovery call."
          buttonText="Schedule Call"
          buttonLink="/book-audit"
        />
      </main>
      <Footer />
    </>
  );
};

export default ReportingAnalyticsPage; 