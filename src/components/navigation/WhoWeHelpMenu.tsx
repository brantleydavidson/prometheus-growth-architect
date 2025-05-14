
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
        <button className="flex items-center gap-1 font-medium text-base hover:text-prometheus-orange transition-colors">
          Who We Help <ChevronDown size={16} />
        </button>
      </HoverCardTrigger>
      <HoverCardContent className="w-96 p-0 shadow-lg bg-white rounded-md border border-gray-200 animate-fade-in">
        <div className="p-4 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-prometheus-navy">Who We Help</h3>
        </div>
        <div className="p-4">
          <div className="mb-6">
            <Link to="/b2b" className="text-lg font-medium text-prometheus-navy hover:text-prometheus-orange transition-colors flex items-center justify-between">
              Win More B2B Deals
              <ChevronDown className="rotate-270" size={16} />
            </Link>
            <ul className="mt-2 space-y-2 pl-2">
              <li>
                <Link to="/manufacturing" className="text-sm text-gray-700 hover:text-prometheus-orange transition-colors block">
                  Manufacturing — <span className="text-prometheus-gray">"Turn idle line-time into booked POs."</span>
                </Link>
              </li>
              <li>
                <Link to="/professional-services" className="text-sm text-gray-700 hover:text-prometheus-orange transition-colors block">
                  Professional Services — <span className="text-prometheus-gray">"Cut proposal cycles by 30%."</span>
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <Link to="/dtc" className="text-lg font-medium text-prometheus-navy hover:text-prometheus-orange transition-colors flex items-center justify-between">
              Sell More Direct-to-Consumer
              <ChevronDown className="rotate-270" size={16} />
            </Link>
            <ul className="mt-2 space-y-2 pl-2">
              <li>
                <Link to="/restoration" className="text-sm text-gray-700 hover:text-prometheus-orange transition-colors block">
                  Restoration — <span className="text-prometheus-gray">"Surface 40% more emergency leads."</span>
                </Link>
              </li>
              <li>
                <Link to="/ecommerce" className="text-sm text-gray-700 hover:text-prometheus-orange transition-colors block">
                  eCommerce — <span className="text-prometheus-gray">"Lift repeat purchase rate by 25%."</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default WhoWeHelpMenu;
