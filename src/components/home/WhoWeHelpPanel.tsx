
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight } from "lucide-react";

const WhoWeHelpPanel = () => {
  return (
    <section className="py-20 bg-prometheus-navy text-white">
      <div className="container-custom">
        <h2 className="section-title text-white text-center mb-16">Who We Help</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* B2B Panel */}
          <div className="bg-white/5 p-8 rounded-lg border border-white/10 hover:border-prometheus-orange/50 transition-all group">
            <h3 className="text-2xl font-semibold mb-4">Win More B2B Deals</h3>
            <p className="text-white/80 mb-6">
              Complex sales cycles, multiple stakeholders, and long lead times make B2B growth challenging. 
              We help you create efficient pipelines and convert more leads into customers.
            </p>
            
            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-2">
                <CheckCircle size={20} className="text-prometheus-orange mt-1 flex-shrink-0" />
                <span>Shorten sales cycles by up to 35%</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle size={20} className="text-prometheus-orange mt-1 flex-shrink-0" />
                <span>Improve lead qualification with AI-powered insights</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle size={20} className="text-prometheus-orange mt-1 flex-shrink-0" />
                <span>Align marketing and sales for consistent messaging</span>
              </li>
            </ul>
            
            <div className="space-y-2">
              <p className="font-medium text-prometheus-gold mb-2">Industries we serve:</p>
              <div className="flex flex-wrap gap-2 mb-6">
                <Link to="/manufacturing" className="text-sm bg-white/10 px-3 py-1 rounded-full hover:bg-white/20 transition-colors">
                  Manufacturing
                </Link>
                <Link to="/professional-services" className="text-sm bg-white/10 px-3 py-1 rounded-full hover:bg-white/20 transition-colors">
                  Professional Services
                </Link>
                <span className="text-sm bg-white/10 px-3 py-1 rounded-full text-white/50">
                  SaaS (Coming Soon)
                </span>
              </div>
            </div>
            
            <Link to="/b2b">
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
              We help you find and convert more customers with precision targeting.
            </p>
            
            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-2">
                <CheckCircle size={20} className="text-prometheus-gold mt-1 flex-shrink-0" />
                <span>Reduce customer acquisition costs by up to 28%</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle size={20} className="text-prometheus-gold mt-1 flex-shrink-0" />
                <span>Increase customer lifetime value with personalization</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle size={20} className="text-prometheus-gold mt-1 flex-shrink-0" />
                <span>Create seamless omnichannel customer experiences</span>
              </li>
            </ul>
            
            <div className="space-y-2">
              <p className="font-medium text-prometheus-gold mb-2">Industries we serve:</p>
              <div className="flex flex-wrap gap-2 mb-6">
                <Link to="/restoration" className="text-sm bg-white/10 px-3 py-1 rounded-full hover:bg-white/20 transition-colors">
                  Restoration
                </Link>
                <span className="text-sm bg-white/10 px-3 py-1 rounded-full text-white/50">
                  eCommerce (Coming Soon)
                </span>
                <span className="text-sm bg-white/10 px-3 py-1 rounded-full text-white/50">
                  Home Services (Coming Soon)
                </span>
              </div>
            </div>
            
            <Link to="/dtc">
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
