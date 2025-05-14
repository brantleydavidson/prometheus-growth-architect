
import React from "react";
import { Briefcase, Lightbulb, PencilRuler, Search } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const ProcessCard = ({ title, description, icon }) => {
  return (
    <Card className="border-none shadow-md hover:shadow-lg transition-shadow h-full">
      <CardContent className="pt-6">
        <div className="mb-4 text-prometheus-gold">
          {icon}
        </div>
        <h3 className="text-xl font-semibold mb-3 text-prometheus-navy">{title}</h3>
        <p className="text-prometheus-gray">{description}</p>
      </CardContent>
    </Card>
  );
};

const AboutWorkProcess = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container-custom">
        <div className="mb-12 text-center lg:text-left">
          <h2 className="section-title mb-6">How We Work</h2>
          <p className="section-subtitle">
            Our solutions turn technical challenges into business opportunities, 
            helping you achieve your goals and stay ahead of the competition.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <ProcessCard 
            title="Enterprise Solutions"
            description="Our enterprise solutions are designed to help businesses overcome technical challenges and achieve growth. We provide comprehensive strategies and support to drive success."
            icon={<Briefcase size={32} />}
          />
          
          <ProcessCard 
            title="AI-driven Efficiency"
            description="Leveraging the power of AI, we optimize processes and workflows to improve efficiency and productivity. Our AI-driven solutions enable businesses to streamline operations."
            icon={<Lightbulb size={32} />}
          />
          
          <ProcessCard 
            title="Customized Plans"
            description="We understand that every business is unique. That's why we create customized plans tailored to the specific needs and goals of each client for maximum impact."
            icon={<PencilRuler size={32} />}
          />
          
          <ProcessCard 
            title="Expert Guidance"
            description="Our team of experts provides guidance and support throughout the entire process. We work closely with our clients to understand their challenges."
            icon={<Search size={32} />}
          />
        </div>
      </div>
    </section>
  );
};

export default AboutWorkProcess;
