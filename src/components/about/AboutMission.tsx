import React from "react";
import { Rocket } from "lucide-react";

const AboutMission = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center mb-6">
            <Rocket size={32} className="text-prometheus-orange mr-3" />
            <h2 className="text-3xl font-semibold text-prometheus-navy">Our Mission</h2>
          </div>
          
          <p className="text-xl mb-6 text-prometheus-gray">
            We ignite growth, transforming our client's marketing and sales strategies into 
            an integrated powerhouse. With strategic forethought, we convert technical challenges 
            into engines of innovation and efficiency, fueling our client's business.
          </p>
          
          <p className="text-lg text-prometheus-gray font-medium">
            From rising innovators to established market leaders, our expertise is proven.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutMission;
