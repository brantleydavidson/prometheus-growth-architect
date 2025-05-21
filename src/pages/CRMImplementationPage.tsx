import React from "react";
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/layout/Footer";
import CTABanner from "@/components/common/CTABanner";
import SEO from "@/components/SEO";

const CRMImplementationPage = () => {
  return (
    <>
      <SEO
        title="CRM Implementation & Optimization | Prometheus Agency"
        description="Build a revenue engine with HubSpot, Salesforce, or Microsoft Dynamics—implemented in weeks, not months."
        canonical="/services/crm-implementation"
      />
      <Navbar />
      <main>
        {/* Hero */}
        <section className="pt-24 pb-16 bg-gradient-to-br from-white to-gray-50">
          <div className="container-custom text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-semibold text-prometheus-navy mb-6">
              CRM Implementation&nbsp;&amp;&nbsp;Optimization
            </h1>
            <p className="text-lg text-prometheus-gray mb-8">
              Build a revenue engine with HubSpot, Salesforce, or Microsoft Dynamics—implemented in weeks, not months.
            </p>
          </div>
        </section>

        {/* Philosophy */}
        <section className="py-16 bg-white">
          <div className="container-custom max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Our Philosophy</h2>
            <p className="text-lg text-prometheus-gray">
              A successful CRM implementation aligns people, process, and data before a single field is created. We start with your revenue model, map critical conversions, and design the data structure to reflect how money actually moves through your business. Then we add AI-driven automations—lead scoring, lifecycle nudges, forecast insights—that turn the system from a database into an always-on growth engine.
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
                  title: "Discovery & Architecture",
                  desc: "We audit existing systems, interview stakeholders, and define success metrics."
                },
                {
                  title: "Build & Integrate",
                  desc: "Custom objects, pipelines, and workflows are stood up inside your chosen platform, with bi-directional sync to finance, marketing, and support tools."
                },
                {
                  title: "Enable & Optimize",
                  desc: "Teams are trained, dashboards are refined, and automation rules are tuned against live data for continuous improvement."
                }
              ].map((step, idx) => (
                <div key={idx} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                  <h3 className="text-xl font-semibold mb-3 text-prometheus-navy">
                    {step.title}
                  </h3>
                  <p className="text-prometheus-gray text-sm">
                    {step.desc}
                  </p>
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
              Higher pipeline velocity, cleaner attribution, and a CRM adoption rate north of 80 percent within the first quarter.
              Leaders gain real-time visibility into forecast accuracy; reps gain hours back each week; marketing gains closed-loop feedback on campaign ROI.
            </p>
          </div>
        </section>

        {/* Why Prometheus */}
        <section className="py-16 bg-gray-50">
          <div className="container-custom max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Why Prometheus Agency</h2>
            <p className="text-prometheus-gray">
              We've launched 200-plus CRM instances across B2B manufacturing, restoration services, and tech. Our blend of RevOps strategy and hands-on admin work means you get both the roadmap and the roll-up-your-sleeves execution.
            </p>
          </div>
        </section>

        {/* CTA */}
        <CTABanner
          title="Ready to turn your CRM into a revenue engine?"
          description="Schedule a 30-minute discovery call."
          buttonText="Book Discovery Call"
          buttonLink="/book-audit"
        />
      </main>
      <Footer />
    </>
  );
};

export default CRMImplementationPage; 