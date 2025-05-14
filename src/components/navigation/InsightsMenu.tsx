
import React from "react";
import { Link } from "react-router-dom";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { ChevronDown } from "lucide-react";

const InsightsMenu = () => {
  return (
    <HoverCard openDelay={100} closeDelay={150}>
      <HoverCardTrigger asChild>
        <button className="flex items-center gap-1 font-medium text-base hover:text-prometheus-orange transition-colors">
          Insights <ChevronDown size={16} />
        </button>
      </HoverCardTrigger>
      <HoverCardContent className="w-72 p-0 shadow-lg bg-white rounded-md border border-gray-200 animate-fade-in">
        <div className="p-4 flex flex-col space-y-2">
          <Link
            to="/ai-quotient"
            className="text-base font-medium text-prometheus-navy hover:text-prometheus-orange transition-colors"
          >
            AI Quotient Assessment
          </Link>
          <Link
            to="/insights"
            className="text-base font-medium text-prometheus-navy hover:text-prometheus-orange transition-colors"
          >
            All Articles & Playbooks
          </Link>
          <hr className="my-2" />
          <Link
            to="/insights/crm-consulting"
            className="text-base text-gray-700 hover:text-prometheus-orange transition-colors"
          >
            CRM Consulting
          </Link>
          <Link
            to="/insights/crm-consulting-services-in-conway-ar"
            className="text-base text-gray-700 hover:text-prometheus-orange transition-colors"
          >
            CRM Consulting in Conway
          </Link>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default InsightsMenu;
