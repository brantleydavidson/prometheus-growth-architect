
import React from "react";
import { MapPin, Building, Lightbulb } from "lucide-react";

const ProcessStrip = () => {
  return (
    <section className="py-20">
      <div className="container-custom">
        <h2 className="section-title text-center mb-16">Our Process</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Map */}
          <div className="text-center bg-white p-8 rounded-lg shadow-md border border-gray-100 hover:border-prometheus-orange hover:shadow-lg transition-all">
            <div className="mx-auto w-16 h-16 rounded-full bg-prometheus-orange/10 flex items-center justify-center mb-6">
              <MapPin size={32} className="text-prometheus-orange" />
            </div>
            <h3 className="text-xl font-semibold text-prometheus-navy mb-3">Map</h3>
            <p className="text-prometheus-gray">
              We analyze your current tech stack, processes, and market position 
              to identify growth blockers and opportunities.
            </p>
          </div>
          
          {/* Flame divider would go here in a real implementation */}
          
          {/* Build */}
          <div className="text-center bg-white p-8 rounded-lg shadow-md border border-gray-100 hover:border-prometheus-orange hover:shadow-lg transition-all">
            <div className="mx-auto w-16 h-16 rounded-full bg-prometheus-orange/10 flex items-center justify-center mb-6">
              <Building size={32} className="text-prometheus-orange" />
            </div>
            <h3 className="text-xl font-semibold text-prometheus-navy mb-3">Build</h3>
            <p className="text-prometheus-gray">
              We implement technology solutions and establish processes that 
              deliver measurable ROI and create competitive advantages.
            </p>
          </div>
          
          {/* Flame divider would go here in a real implementation */}
          
          {/* Train */}
          <div className="text-center bg-white p-8 rounded-lg shadow-md border border-gray-100 hover:border-prometheus-orange hover:shadow-lg transition-all">
            <div className="mx-auto w-16 h-16 rounded-full bg-prometheus-orange/10 flex items-center justify-center mb-6">
              <Lightbulb size={32} className="text-prometheus-orange" />
            </div>
            <h3 className="text-xl font-semibold text-prometheus-navy mb-3">Train</h3>
            <p className="text-prometheus-gray">
              We empower your team with the knowledge and skills needed to 
              maximize the value of your new growth engine.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessStrip;
