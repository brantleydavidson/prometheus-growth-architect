
import React from "react";
import { Link } from "react-router-dom";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { ChevronDown } from "lucide-react";

const ServicesMenu = () => {
  return (
    <HoverCard openDelay={100} closeDelay={150}>
      <HoverCardTrigger asChild>
        <button className="flex items-center gap-1 font-medium text-base hover:text-prometheus-orange transition-colors">
          Services <ChevronDown size={16} />
        </button>
      </HoverCardTrigger>
      <HoverCardContent className="w-72 p-0 shadow-lg bg-white rounded-md border border-gray-200 animate-fade-in">
        <div className="p-4 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-prometheus-navy">Our Services</h3>
        </div>
        <div className="p-4 flex flex-col space-y-2">
          <Link to="/services/ai-enablement" className="text-base font-medium text-prometheus-navy hover:text-prometheus-orange transition-colors">
            AI Enablement & Integration
          </Link>
          <Link to="/services/consulting-gtm" className="text-base font-medium text-prometheus-navy hover:text-prometheus-orange transition-colors">
            Consulting & GTM Strategy
          </Link>
          <Link to="/services/crm-implementation" className="text-base text-gray-700 hover:text-prometheus-orange transition-colors">
            CRM Implementation
          </Link>
          <Link to="/services/customer-journey" className="text-base text-gray-700 hover:text-prometheus-orange transition-colors">
            Customer Journey Mapping
          </Link>
          <Link to="/services/paid-media" className="text-base text-gray-700 hover:text-prometheus-orange transition-colors">
            Paid Media
          </Link>
          <Link to="/services/reporting-analytics" className="text-base text-gray-700 hover:text-prometheus-orange transition-colors">
            Reporting & Analytics
          </Link>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default ServicesMenu;
