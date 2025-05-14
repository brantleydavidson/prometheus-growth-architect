
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight } from "lucide-react";

const WhoWeHelpPanel = () => {
  return (
    <section className="py-20 bg-prometheus-navy text-white">
      <div className="container-custom">
        <h2 className="section-title text-white text-center mb-6">Who We Help</h2>
        <p className="text-white/80 text-center mb-16 max-w-2xl mx-auto">
          We specialize in solving the unique challenges faced by both B2B and DTC businesses, 
          with tailored strategies for each market segment.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* B2B Panel */}
          <div className="bg-white/5 p-8 rounded-lg border border-white/10 hover:border-prometheus-orange/50 transition-all group">
            <h3 className="text-2xl font-semibold mb-4">Win More B2B Deals</h3>
            <p className="text-white/80 mb-6">
              Complex sales cycles, multiple stakeholders, and long lead times make B2B growth challenging. 
              We help you create <strong>efficient pipelines</strong> and convert more leads into customers.
            </p>
            
            <ul className="space-y-3 mb-10">
              <li className="flex items-start gap-2">
                <CheckCircle size={20} className="text-prometheus-orange mt-1 flex-shrink-0" aria-hidden="true" />
                <span>Shorten sales cycles by up to 35%</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle size={20} className="text-prometheus-orange mt-1 flex-shrink-0" aria-hidden="true" />
                <span>Improve lead qualification with AI-powered insights</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle size={20} className="text-prometheus-orange mt-1 flex-shrink-0" aria-hidden="true" />
                <span>Align marketing and sales for consistent messaging</span>
              </li>
            </ul>
            
            <Link to="/b2b" className="block mt-auto">
              <Button className="w-full bg-prometheus-orange hover:bg-prometheus-orange/90 text-white group-hover:translate-y-0 translate-y-1 transition-transform flex items-center justify-center gap-2">
                Explore B2B Solutions
                <ArrowRight size={16} />
              </Button>
            </Link>
          </div>
          
          {/* DTC Panel */}
          <div className="bg-white/5 p-8 rounded-lg border border-white/10 hover:border-prometheus-gold/50 transition-all group">
            <h3 className="text-2xl font-semibold mb-4">Sell More Direct-to-Consumer</h3>
            <p className="text-white/80 mb-6">
              Standing out in crowded markets with rising acquisition costs makes DTC growth challenging. 
              We help you find and convert more customers with <strong>precision targeting</strong>.
            </p>
            
            <ul className="space-y-3 mb-10">
              <li className="flex items-start gap-2">
                <CheckCircle size={20} className="text-prometheus-gold mt-1 flex-shrink-0" aria-hidden="true" />
                <span>Reduce customer acquisition costs by up to 28%</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle size={20} className="text-prometheus-gold mt-1 flex-shrink-0" aria-hidden="true" />
                <span>Increase customer lifetime value with personalization</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle size={20} className="text-prometheus-gold mt-1 flex-shrink-0" aria-hidden="true" />
                <span>Create seamless omnichannel customer experiences</span>
              </li>
            </ul>
            
            <Link to="/dtc" className="block mt-auto">
              <Button className="w-full bg-prometheus-gold hover:bg-prometheus-gold/90 text-white group-hover:translate-y-0 translate-y-1 transition-transform flex items-center justify-center gap-2">
                Explore DTC Solutions
                <ArrowRight size={16} />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhoWeHelpPanel;
