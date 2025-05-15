
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
        <button 
          className="flex items-center gap-1 font-medium text-base hover:text-prometheus-orange transition-colors"
          aria-expanded="false"
          aria-haspopup="true"
          aria-label="Insights navigation"
        >
          Insights <ChevronDown size={16} aria-hidden="true" />
        </button>
      </HoverCardTrigger>
      <HoverCardContent className="w-72 p-0 shadow-lg bg-white rounded-md border border-gray-200 animate-fade-in">
        <nav className="p-4 flex flex-col space-y-2" aria-label="Insights submenu">
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
          <hr className="my-2" aria-hidden="true" />
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
          <Link
            to="/insights/hubspot-agency-partner-in-conway-ar"
            className="text-base text-gray-700 hover:text-prometheus-orange transition-colors"
          >
            HubSpot Partner in Conway
          </Link>
          <Link
            to="/insights/salesforce-crm-integration-in-jackson-ms"
            className="text-base text-gray-700 hover:text-prometheus-orange transition-colors"
          >
            Salesforce CRM in Jackson
          </Link>
          <Link
            to="/insights/crm-audit-services-in-jackson-ms"
            className="text-base text-gray-700 hover:text-prometheus-orange transition-colors"
          >
            CRM Audit Services in Jackson
          </Link>
          <Link
            to="/insights/crm-for-real-estate-agents-in-little-rock-ar"
            className="text-base text-gray-700 hover:text-prometheus-orange transition-colors"
          >
            CRM for Real Estate in Little Rock
          </Link>
        </nav>
      </HoverCardContent>
    </HoverCard>
  );
};

export default InsightsMenu;
