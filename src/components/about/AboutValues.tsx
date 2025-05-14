
import React from "react";
import { Users, Star, Award, RefreshCw, MessageSquare } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const ValueCard = ({ title, description, icon }) => {
  return (
    <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
      <CardContent className="pt-6">
        <div className="mb-4 text-prometheus-orange">
          {icon}
        </div>
        <h3 className="text-xl font-semibold mb-3 text-prometheus-navy">{title}</h3>
        <p className="text-prometheus-gray">{description}</p>
      </CardContent>
    </Card>
  );
};

const AboutValues = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <div className="mb-12 text-center lg:text-left">
          <h2 className="section-title mb-2">Who We Are</h2>
          <h3 className="text-2xl font-semibold text-prometheus-orange mb-8">Driven by Values, Defined by Excellence</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <ValueCard 
            title="People-First"
            description="At Prometheus, we value relationships over transactions. By prioritizing people—clients, their customers, and our team—we build trust, collaboration, and mutual growth."
            icon={<Users size={32} />}
          />
          
          <ValueCard 
            title="Competitive Spirit"
            description="At Prometheus, our passion drives us to exceed expectations and inspire our clients to achieve more. We embrace every challenge with determination."
            icon={<Award size={32} />}
          />
          
          <ValueCard 
            title="Adaptable"
            description="In digital marketing, adaptability is our strength. We excel at adjusting to new trends and technologies, ensuring our strategies remain relevant and effective."
            icon={<RefreshCw size={32} />}
          />
          
          <ValueCard 
            title="Candid"
            description="Transparency is key for us. We value open communication, providing honest feedback and real-time reporting to keep clients informed and foster growth."
            icon={<MessageSquare size={32} />}
          />
        </div>
      </div>
    </section>
  );
};

export default AboutValues;
