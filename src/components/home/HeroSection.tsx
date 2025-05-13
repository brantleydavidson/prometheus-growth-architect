
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="pt-16 pb-24 overflow-hidden">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="animate-grid-snap">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-prometheus-navy mb-6 leading-tight">
              Tame the Tech. <br/>
              <span className="text-prometheus-orange">Unleash the Growth.</span>
            </h1>
            <p className="text-lg md:text-xl text-prometheus-gray mb-8 max-w-lg">
              We help B2B and DTC businesses transform technology chaos into 
              strategic growth engines with AI enablement and proven GTM strategies.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/book-audit">
                <Button className="bg-prometheus-orange hover:bg-prometheus-orange/90 text-white px-6 py-6 text-base w-full sm:w-auto">
                  Book Growth Audit
                </Button>
              </Link>
              <Link to="/services">
                <Button variant="outline" className="border-prometheus-navy text-prometheus-navy hover:bg-prometheus-navy hover:text-white px-6 py-6 text-base flex items-center gap-2 w-full sm:w-auto">
                  Explore Services
                  <ArrowRight size={16} />
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="relative animate-grid-snap" style={{ animationDelay: "200ms" }}>
            <div className="relative aspect-video overflow-hidden rounded-lg shadow-xl">
              {/* This would be a video or animation in the real implementation */}
              <div className="absolute inset-0 bg-gradient-to-br from-prometheus-orange to-prometheus-gold opacity-30"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="bg-prometheus-navy/80 p-6 rounded-lg">
                    <p className="text-xl font-medium mb-3">From Chaos to Control</p>
                    <div className="text-4xl font-bold mb-2">+42%</div>
                    <p>Average Revenue Growth</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating selector tiles */}
            <div className="absolute -bottom-8 right-0 flex space-x-3">
              <Link to="/b2b" className="bg-white py-2 px-4 rounded shadow-lg border border-gray-100 text-prometheus-navy font-medium hover:border-prometheus-orange transition-colors text-sm">
                B2B
              </Link>
              <Link to="/dtc" className="bg-white py-2 px-4 rounded shadow-lg border border-gray-100 text-prometheus-navy font-medium hover:border-prometheus-orange transition-colors text-sm">
                DTC
              </Link>
              <Link to="/services/ai-enablement" className="bg-white py-2 px-4 rounded shadow-lg border border-gray-100 text-prometheus-navy font-medium hover:border-prometheus-orange transition-colors text-sm">
                AI Suite
              </Link>
              <Link to="/services/consulting-gtm" className="bg-white py-2 px-4 rounded shadow-lg border border-gray-100 text-prometheus-navy font-medium hover:border-prometheus-orange transition-colors text-sm">
                Consulting
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
