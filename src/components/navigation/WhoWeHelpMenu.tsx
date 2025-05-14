
import React from "react";
import { Link } from "react-router-dom";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { ChevronDown } from "lucide-react";

const WhoWeHelpMenu = () => {
  return (
    <HoverCard openDelay={100} closeDelay={150}>
      <HoverCardTrigger asChild>
        <button 
          className="flex items-center gap-1 font-medium text-base hover:text-prometheus-orange transition-colors"
          aria-expanded="false"
          aria-haspopup="true"
          aria-label="Who We Help navigation"
        >
          Who We Help <ChevronDown size={16} aria-hidden="true" />
        </button>
      </HoverCardTrigger>
      <HoverCardContent className="w-96 p-0 shadow-lg bg-white rounded-md border border-gray-200 animate-fade-in">
        <nav className="p-4" aria-label="Who We Help submenu">
          <div className="mb-6">
            <Link to="/b2b" className="text-lg font-medium text-prometheus-navy hover:text-prometheus-orange transition-colors flex items-center justify-between">
              B2B
              <ChevronDown className="rotate-270" size={16} aria-hidden="true" />
            </Link>
            <ul className="mt-2 space-y-2 pl-2">
              <li>
                <Link to="/manufacturing" className="text-sm text-gray-700 hover:text-prometheus-orange transition-colors block">
                  Manufacturing
                </Link>
              </li>
              <li>
                <Link to="/professional-services" className="text-sm text-gray-700 hover:text-prometheus-orange transition-colors block">
                  Professional Services
                </Link>
              </li>
              <li>
                <Link to="/saas" className="text-sm text-gray-700 hover:text-prometheus-orange transition-colors block">
                  SaaS
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <Link to="/dtc" className="text-lg font-medium text-prometheus-navy hover:text-prometheus-orange transition-colors flex items-center justify-between">
              DTC
              <ChevronDown className="rotate-270" size={16} aria-hidden="true" />
            </Link>
            <ul className="mt-2 space-y-2 pl-2">
              <li>
                <Link to="/restoration" className="text-sm text-gray-700 hover:text-prometheus-orange transition-colors block">
                  Restoration
                </Link>
              </li>
              <li>
                <Link to="/ecommerce" className="text-sm text-gray-700 hover:text-prometheus-orange transition-colors block">
                  eCommerce
                </Link>
              </li>
              <li>
                <Link to="/consumer-services" className="text-sm text-gray-700 hover:text-prometheus-orange transition-colors block">
                  Consumer Services
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </HoverCardContent>
    </HoverCard>
  );
};

export default WhoWeHelpMenu;
