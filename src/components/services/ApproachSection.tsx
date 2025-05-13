
import React from "react";

const ApproachSection = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="section-title">Our Approach</h2>
          <p className="section-subtitle">
            We believe in a systematic, results-driven approach that ensures 
            you get maximum value from our partnership.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Step 1 */}
            <div className="flex flex-col md:flex-row gap-8 mb-12">
              <div className="md:w-1/3 flex flex-col items-center md:items-end">
                <div className="w-12 h-12 rounded-full bg-prometheus-orange text-white flex items-center justify-center text-xl font-semibold mb-4">1</div>
                <h3 className="text-xl font-semibold text-prometheus-navy mb-2 text-center md:text-right">Discovery & Assessment</h3>
              </div>
              <div className="md:w-2/3 md:pt-4">
                <p className="text-prometheus-gray">
                  We conduct a thorough analysis of your current systems, processes, 
                  and market position to identify <strong>opportunities and challenges</strong>.
                </p>
              </div>
            </div>
            
            {/* Step 2 */}
            <div className="flex flex-col md:flex-row gap-8 mb-12">
              <div className="md:w-1/3 flex flex-col items-center md:items-end">
                <div className="w-12 h-12 rounded-full bg-prometheus-orange text-white flex items-center justify-center text-xl font-semibold mb-4">2</div>
                <h3 className="text-xl font-semibold text-prometheus-navy mb-2 text-center md:text-right">Strategic Planning</h3>
              </div>
              <div className="md:w-2/3 md:pt-4">
                <p className="text-prometheus-gray">
                  We develop a customized roadmap with <strong>clear objectives</strong>, 
                  timelines, and success metrics aligned with your business goals.
                </p>
              </div>
            </div>
            
            {/* Step 3 */}
            <div className="flex flex-col md:flex-row gap-8 mb-12">
              <div className="md:w-1/3 flex flex-col items-center md:items-end">
                <div className="w-12 h-12 rounded-full bg-prometheus-orange text-white flex items-center justify-center text-xl font-semibold mb-4">3</div>
                <h3 className="text-xl font-semibold text-prometheus-navy mb-2 text-center md:text-right">Implementation</h3>
              </div>
              <div className="md:w-2/3 md:pt-4">
                <p className="text-prometheus-gray">
                  Our expert team executes the plan with precision, 
                  implementing <strong>technology solutions</strong> and processes that drive results.
                </p>
              </div>
            </div>
            
            {/* Step 4 */}
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/3 flex flex-col items-center md:items-end">
                <div className="w-12 h-12 rounded-full bg-prometheus-orange text-white flex items-center justify-center text-xl font-semibold mb-4">4</div>
                <h3 className="text-xl font-semibold text-prometheus-navy mb-2 text-center md:text-right">Optimization & Growth</h3>
              </div>
              <div className="md:w-2/3 md:pt-4">
                <p className="text-prometheus-gray">
                  We continuously measure results, refine strategies, and 
                  identify new opportunities to <strong>maximize your ROI</strong>.
                </p>
              </div>
            </div>
            
            {/* Vertical Line */}
            <div className="absolute top-0 left-1/3 transform -translate-x-1/2 w-0.5 h-full bg-prometheus-orange/20 hidden md:block"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ApproachSection;
