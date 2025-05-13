
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const DTCHero = () => {
  return (
    <section className="pt-16 pb-24 bg-prometheus-navy text-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-semibold mb-6 leading-tight">
              Sell More Direct-to-Consumer with Lower Acquisition Costs
            </h1>
            <p className="text-white/80 text-lg mb-4 max-w-lg">
              Stop wasting ad spend on poorly targeted campaigns. We help DTC businesses 
              acquire more customers at a <strong>lower cost</strong> and increase their lifetime value.
            </p>
            <p className="text-white/80 text-lg mb-8 max-w-lg">
              Our specialized DTC strategies combine sophisticated targeting, personalized customer 
              journeys, and data-driven optimizations to maximize your marketing ROI.
            </p>
            <div className="p-6 bg-white/10 rounded-lg border border-white/20 mb-8">
              <h3 className="text-xl font-medium mb-4">Free DTC Growth Audit</h3>
              <p className="mb-4 text-white/70">
                Get a complimentary analysis of your customer acquisition strategy with 
                actionable recommendations to reduce costs and increase conversions.
              </p>
              <Link to="/book-audit">
                <Button className="w-full bg-prometheus-gold hover:bg-prometheus-gold/90">
                  Request Your Free Audit
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="relative">
            <div className="relative aspect-video rounded-lg overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-prometheus-gold to-prometheus-orange opacity-30" aria-hidden="true"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="bg-prometheus-navy/80 p-6 rounded-lg">
                    <p className="text-xl font-medium mb-3">Average Customer Results</p>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-4xl font-bold mb-2 text-prometheus-gold">
                          28%
                        </div>
                        <p>Lower Acquisition Cost</p>
                      </div>
                      <div>
                        <div className="text-4xl font-bold mb-2 text-prometheus-gold">
                          47%
                        </div>
                        <p>Higher Conversion Rate</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DTCHero;
