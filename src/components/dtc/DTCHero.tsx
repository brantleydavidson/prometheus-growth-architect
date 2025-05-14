
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, ShoppingBag, TrendingUp, Users } from "lucide-react";

const DTCHero = () => {
  const metrics = [
    {
      icon: <ShoppingBag size={24} className="text-prometheus-gold" />,
      value: "-28%",
      label: "Customer Acquisition Cost"
    },
    {
      icon: <TrendingUp size={24} className="text-prometheus-gold" />,
      value: "+47%",
      label: "Conversion Rates"
    },
    {
      icon: <Users size={24} className="text-prometheus-gold" />,
      value: "+120%",
      label: "Customer LTV"
    }
  ];

  return (
    <section className="pt-24 pb-16 bg-gradient-to-br from-white to-gray-50">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-left">
            <h1 className="text-4xl md:text-5xl font-semibold text-prometheus-navy mb-6 leading-tight">
              Grow Your DTC Brand <span className="text-prometheus-gold">Without Breaking the Bank</span>
            </h1>
            <p className="text-lg text-prometheus-gray mb-8 max-w-lg">
              Smart strategies for customer acquisition, retention, and lifetime value growth in an increasingly competitive DTC landscape.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Link to="/book-audit">
                <Button className="bg-prometheus-gold hover:bg-prometheus-gold/90 text-white px-6 py-6 text-base w-full sm:w-auto">
                  Book Growth Audit
                </Button>
              </Link>
              <Link to="/services">
                <Button variant="outline" className="border-prometheus-navy text-prometheus-navy hover:bg-prometheus-navy hover:text-white px-6 py-6 text-base flex items-center gap-2 w-full sm:w-auto">
                  Explore DTC Services
                  <ArrowRight size={16} />
                </Button>
              </Link>
            </div>
            
            {/* Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
              {metrics.map((metric, index) => (
                <div key={index} className="flex items-center gap-3">
                  {metric.icon}
                  <div>
                    <div className="text-2xl font-bold text-prometheus-navy">{metric.value}</div>
                    <div className="text-sm text-prometheus-gray">{metric.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative">
            <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1519389950473-47ba0277781c" 
                alt="DTC marketing team analyzing customer data and growth metrics" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DTCHero;
