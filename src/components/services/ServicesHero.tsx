
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const ServicesHero = () => {
  return (
    <section className="pt-24 pb-16 bg-gradient-to-br from-white to-gray-50">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <h1 className="text-4xl md:text-5xl font-semibold text-prometheus-navy mb-6 leading-tight">
              Strategic Services for <span className="text-prometheus-orange">Measurable Growth</span>
            </h1>
            <p className="text-lg text-prometheus-gray mb-8 max-w-xl">
              Our comprehensive suite of services addresses every aspect of your growth strategy, 
              from AI enablement to go-to-market execution and technology optimization.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/book-audit">
                <Button className="bg-prometheus-orange hover:bg-prometheus-orange/90 text-white px-6 py-6 text-base w-full sm:w-auto">
                  Book Growth Audit
                </Button>
              </Link>
              <Link to="/services/ai-enablement">
                <Button variant="outline" className="border-prometheus-navy text-prometheus-navy hover:bg-prometheus-navy hover:text-white px-6 py-6 text-base flex items-center gap-2 w-full sm:w-auto">
                  Explore AI Services
                  <ArrowRight size={16} />
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="lg:col-span-5">
            <div className="grid grid-cols-2 gap-4">
              <div className="aspect-square bg-prometheus-orange/10 rounded-lg p-6 flex flex-col items-center justify-center text-center">
                <div className="text-4xl font-bold text-prometheus-orange mb-2">12+</div>
                <p className="text-prometheus-navy font-medium">Service Areas</p>
              </div>
              <div className="aspect-square bg-prometheus-gold/10 rounded-lg p-6 flex flex-col items-center justify-center text-center">
                <div className="text-4xl font-bold text-prometheus-gold mb-2">100%</div>
                <p className="text-prometheus-navy font-medium">Customized</p>
              </div>
              <div className="aspect-square bg-prometheus-navy/10 rounded-lg p-6 flex flex-col items-center justify-center text-center">
                <div className="text-4xl font-bold text-prometheus-navy mb-2">3X</div>
                <p className="text-prometheus-navy font-medium">ROI Average</p>
              </div>
              <div className="aspect-square bg-prometheus-cyan/10 rounded-lg p-6 flex flex-col items-center justify-center text-center">
                <div className="text-4xl font-bold text-prometheus-cyan mb-2">42%</div>
                <p className="text-prometheus-navy font-medium">Growth Rate</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesHero;
