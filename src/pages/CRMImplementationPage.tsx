import React from "react";
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/layout/Footer";
import CTABanner from "@/components/common/CTABanner";
import SEO from "@/components/SEO";
import { Database, Settings, ActivitySquare, CheckCircle, BarChart3 } from "lucide-react";

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
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left: Text */}
              <div>
                <h1 className="text-4xl md:text-5xl font-semibold text-prometheus-navy mb-6 leading-tight">
                  CRM Implementation <span className="text-prometheus-orange">&amp; Optimization</span>
                </h1>
                <p className="text-lg text-prometheus-gray mb-8 max-w-xl">
                  Build a revenue engine with HubSpot, Salesforce, or Microsoft Dynamics—implemented in weeks, not months.
                </p>
                <div className="bg-prometheus-orange/10 border border-prometheus-orange/30 rounded-lg p-6 mb-8 max-w-xl text-left">
                  <h3 className="text-xl font-medium text-prometheus-navy mb-3">What Sets Us Apart</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-2">
                      <span className="text-prometheus-orange font-medium mt-1">✔️</span>
                      <span>Revenue-model first, technology second</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-prometheus-orange font-medium mt-1">✔️</span>
                      <span>AI-driven automations baked in from day one</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-prometheus-orange font-medium mt-1">✔️</span>
                      <span>Live in weeks, optimized continuously</span>
                    </li>
                  </ul>
                </div>
              </div>
              {/* Right: Image */}
              <div className="flex justify-center lg:justify-end">
                <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden shadow-lg w-full max-w-xl">
                  <img src="https://images.unsplash.com/photo-1521791055366-0d553872125f?auto=format&fit=crop&w=900&q=80" alt="CRM dashboard mockup" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Capabilities Section */}
        <section className="py-20">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-semibold text-prometheus-navy mb-4">Our CRM Capabilities</h2>
              <p className="text-lg text-prometheus-gray max-w-2xl mx-auto">
                From data architecture to adoption enablement, we cover the full spectrum required to turn your CRM into a profit center.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: <Database className="text-prometheus-orange" size={32} />, title: "Data Architecture", desc: "Model objects & relationships around your buyer journey." },
                { icon: <ActivitySquare className="text-prometheus-orange" size={32} />, title: "AI-Driven Automation", desc: "Lead scoring, lifecycle nudges, and forecast insights." },
                { icon: <CheckCircle className="text-prometheus-orange" size={32} />, title: "User Adoption", desc: "Role-based training and on-screen guidance for 80%+ adoption." },
                { icon: <BarChart3 className="text-prometheus-orange" size={32} />, title: "Forecast & Reporting", desc: "Dashboards that surface revenue KPIs in real-time." },
              ].map((cap, idx) => (
                <div key={idx} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center transition-all duration-200 hover:border-prometheus-orange">
                  <div className="mb-4 flex justify-center">{cap.icon}</div>
                  <h3 className="text-xl font-medium text-prometheus-navy mb-2">{cap.title}</h3>
                  <p className="text-prometheus-gray text-sm">{cap.desc}</p>
                </div>
              ))}
            </div>
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

        {/* Case Study Section */}
        <section className="py-16 bg-white">
          <div className="container-custom grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Philosophy</h2>
              <p className="text-lg text-prometheus-gray mb-8">
                A successful CRM implementation aligns people, process, and data before a single field is created. We start with your revenue model, map critical conversions, and design the data structure to reflect how money actually moves through your business. Then we add AI-driven automations—lead scoring, lifecycle nudges, forecast insights—that turn the system from a database into an always-on growth engine.
              </p>
              <h2 className="text-3xl font-semibold text-prometheus-navy mb-6">Case Study: 80% User Adoption in 60 Days</h2>
              <p className="text-lg text-prometheus-gray mb-6">
                Discover how we helped a manufacturing company replace legacy systems, migrate 250k records, and achieve 80% CRM adoption in just two months—unlocking a 38% increase in forecast accuracy.
              </p>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-medium text-prometheus-navy mb-2">The Challenge</h3>
                  <p>Disconnected data sources and low sales team adoption led to inaccurate forecasting and stalled growth.</p>
                </div>
                <div>
                  <h3 className="text-xl font-medium text-prometheus-navy mb-2">Our Solution</h3>
                  <p>Re-architected pipeline stages, implemented AI-powered deal scoring, and rolled out a gamified onboarding plan.</p>
                </div>
                <div>
                  <h3 className="text-xl font-medium text-prometheus-navy mb-2">The Results</h3>
                  <ul className="space-y-2">
                    <li>• 80% weekly active CRM users</li>
                    <li>• 38% boost in forecast accuracy</li>
                    <li>• 25% faster lead response time</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-100">
              <blockquote className="italic text-lg text-prometheus-gray mb-6">
                "Prometheus Agency turned our underused CRM into the heartbeat of our sales process. The adoption plan alone paid for the engagement in under a quarter."
              </blockquote>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
                <div>
                  <p className="font-medium text-prometheus-navy">Lisa Carter</p>
                  <p className="text-sm text-prometheus-gray">VP Sales, IndustrialCo</p>
                </div>
              </div>
            </div>
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