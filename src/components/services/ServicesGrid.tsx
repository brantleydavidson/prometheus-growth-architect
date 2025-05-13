
import React from "react";
import ServiceCard, { ServiceCardProps } from "./ServiceCard";
import { Bot, LineChart, Users, Database, BarChart3, Zap } from "lucide-react";

export const servicesList = [
  {
    icon: Bot,
    title: "AI Enablement & Integration",
    description: "Harness the power of AI to automate processes, gain insights, and create competitive advantages.",
    link: "/services/ai-enablement",
    featured: true,
    color: "bg-prometheus-orange/10",
    textColor: "text-prometheus-orange",
  },
  {
    icon: LineChart,
    title: "Consulting & GTM Strategy",
    description: "Develop comprehensive go-to-market strategies that align your team and accelerate growth.",
    link: "/services/consulting-gtm",
    featured: true,
    color: "bg-prometheus-gold/10",
    textColor: "text-prometheus-gold",
  },
  {
    icon: Database,
    title: "CRM Implementation",
    description: "Deploy and optimize customer relationship management systems that drive results.",
    link: "/services/crm-implementation",
    color: "bg-prometheus-navy/10",
    textColor: "text-prometheus-navy",
  },
  {
    icon: Users,
    title: "Customer Journey Mapping",
    description: "Create seamless, personalized customer experiences across all touchpoints.",
    link: "/services/customer-journey",
    color: "bg-prometheus-navy/10",
    textColor: "text-prometheus-navy",
  },
  {
    icon: Zap,
    title: "Paid Media",
    description: "Develop and execute high-performance paid advertising campaigns that drive quality leads.",
    link: "/services/paid-media",
    color: "bg-prometheus-navy/10",
    textColor: "text-prometheus-navy",
  },
  {
    icon: BarChart3,
    title: "Reporting & Analytics",
    description: "Transform data into actionable insights with custom dashboards and reporting.",
    link: "/services/reporting-analytics",
    color: "bg-prometheus-navy/10",
    textColor: "text-prometheus-navy",
  },
];

interface ServicesGridProps {
  services?: ServiceCardProps[];
}

const ServicesGrid = ({ services = servicesList }: ServicesGridProps) => {
  return (
    <section className="py-20">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="section-title">Our Service Offerings</h2>
          <p className="section-subtitle">
            We offer a comprehensive suite of services that can be tailored to your 
            specific business challenges and growth objectives.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;
