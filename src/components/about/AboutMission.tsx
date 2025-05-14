
import React from "react";
import { Rocket } from "lucide-react";

const AboutMission = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5">
            <img 
              src="/lovable-uploads/f90ef8a0-a3ab-4689-97d1-fad07e16b477.png" 
              alt="Our Mission" 
              className="max-w-full h-auto rounded-lg shadow-lg"
            />
          </div>
          
          <div className="lg:col-span-7 text-left">
            <div className="flex items-center mb-4">
              <Rocket size={32} className="text-prometheus-orange mr-3" />
              <h2 className="text-3xl font-semibold text-prometheus-navy">Our Mission</h2>
            </div>
            
            <p className="text-xl mb-6 text-prometheus-gray">
              We ignite growth, transforming our client's marketing and sales strategies into 
              an integrated powerhouse. With strategic forethought, we convert technical challenges 
              into engines of innovation and efficiency, fueling our client's business.
            </p>
            
            <p className="text-lg mb-6 text-prometheus-gray font-medium">
              From rising innovators to established market leaders, our expertise is proven.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMission;
