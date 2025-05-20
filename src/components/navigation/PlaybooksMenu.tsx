import React from "react";
import { Link } from "react-router-dom";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { ChevronDown } from "lucide-react";

const PlaybooksMenu = () => {
  return (
    <HoverCard openDelay={100} closeDelay={150}>
      <HoverCardTrigger asChild>
        <button 
          className="flex items-center gap-1 font-medium text-base hover:text-prometheus-orange transition-colors"
          aria-expanded="false"
          aria-haspopup="true"
          aria-label="Tools & Playbooks navigation"
        >
          Tools & Playbooks <ChevronDown size={16} aria-hidden="true" />
        </button>
      </HoverCardTrigger>
      <HoverCardContent className="w-72 p-0 shadow-lg bg-white rounded-md border border-gray-200 animate-fade-in">
        <nav className="p-4 flex flex-col space-y-2" aria-label="Tools & Playbooks submenu">
          <Link
            to="/playbooks"
            className="text-base font-medium text-prometheus-navy hover:text-prometheus-orange transition-colors"
          >
            All Tools & Playbooks
          </Link>
          <hr className="my-2" />
          <Link
            to="/ai-quotient"
            className="text-base font-medium text-prometheus-navy hover:text-prometheus-orange transition-colors"
          >
            AI Quotient Assessment
          </Link>
          <Link
            to="/playbooks/growth-acceleration"
            className="text-base font-medium text-prometheus-navy hover:text-prometheus-orange transition-colors"
          >
            Growth Acceleration
          </Link>
          <Link
            to="/playbooks/sales-enablement"
            className="text-base font-medium text-prometheus-navy hover:text-prometheus-orange transition-colors"
          >
            Sales Enablement
          </Link>
        </nav>
      </HoverCardContent>
    </HoverCard>
  );
};

export default PlaybooksMenu;
