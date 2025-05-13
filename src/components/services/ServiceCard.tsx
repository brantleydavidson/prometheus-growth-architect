
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { LucideIcon } from "lucide-react";

export interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  link: string;
  featured?: boolean;
  color?: string;
  textColor?: string;
}

const ServiceCard = ({
  icon: Icon,
  title,
  description,
  link,
  featured = false,
  color = "bg-prometheus-navy/10",
  textColor = "text-prometheus-navy",
}: ServiceCardProps) => {
  return (
    <div 
      className={`p-8 rounded-lg border ${
        featured 
          ? "border-2 border-prometheus-orange shadow-lg" 
          : "border-gray-200"
      } hover:shadow-xl transition-all`}
    >
      <div className={`w-14 h-14 rounded-full ${color} flex items-center justify-center mb-6`}>
        <Icon size={28} className={textColor} aria-hidden="true" />
      </div>
      <h3 className="text-xl font-semibold text-prometheus-navy mb-3">
        {title}
      </h3>
      <p className="text-prometheus-gray mb-6">
        {description}
      </p>
      <Link to={link}>
        <Button 
          variant="outline" 
          className={`w-full border-prometheus-navy text-prometheus-navy hover:bg-prometheus-navy hover:text-white flex items-center justify-center gap-2 ${
            featured ? "mt-4" : ""
          }`}
        >
          Learn More
          <ArrowRight size={16} />
        </Button>
      </Link>
      {featured && (
        <div className="mt-4 text-center">
          <span className="text-sm font-medium text-prometheus-orange">Featured Service</span>
        </div>
      )}
    </div>
  );
};

export default ServiceCard;
