
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight } from "lucide-react";

interface PainPointProps {
  number: number;
  title: string;
  problem: string;
  solution: string;
}

const PainPoint = ({ number, title, problem, solution }: PainPointProps) => {
  return (
    <div className="flex gap-6">
      <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
        <span className="text-red-600 font-semibold">{number}</span>
      </div>
      <div>
        <h3 className="text-xl font-semibold text-prometheus-navy mb-3">
          {title}
        </h3>
        <p className="text-prometheus-gray mb-4">
          {problem}
        </p>
        <div className="p-4 bg-green-50 rounded-md border border-green-100">
          <p className="flex items-start gap-2">
            <CheckCircle size={20} className="text-green-600 mt-1 flex-shrink-0" aria-hidden="true" />
            <span className="text-green-800">
              {solution}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

const PainToSolution = () => {
  const painPoints = [
    {
      number: 1,
      title: "Rising Customer Acquisition Costs",
      problem: "Your advertising costs keep increasing while conversion rates remain flat, squeezing your margins and limiting growth.",
      solution: "We implement <strong>AI-powered targeting</strong> and optimization systems that identify your most profitable customer segments and reduce wasted ad spend."
    },
    {
      number: 2,
      title: "Low Customer Lifetime Value",
      problem: "Your customers make one purchase and disappear, forcing you to constantly acquire new ones at a high cost.",
      solution: "We create personalized customer journeys and automated retention systems that nurture relationships and drive repeat purchases."
    },
    {
      number: 3,
      title: "Platform Dependency",
      problem: "Your business is too dependent on a single platform (e.g., Facebook, Amazon) making you vulnerable to algorithm changes and rising fees.",
      solution: "We develop multi-channel acquisition and fulfillment strategies that reduce risk and create a more resilient business model."
    },
    {
      number: 4,
      title: "Poor Customer Data Integration",
      problem: "Your customer data is scattered across various platforms, making it impossible to get a complete view of your customers and their behaviors.",
      solution: "We consolidate your customer data into a unified platform and implement analytics that reveal actionable insights for personalization and targeting."
    }
  ];

  return (
    <section className="py-20">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="section-title">From Pain to Possibility</h2>
          <p className="section-subtitle">
            DTC companies face unique challenges in today's crowded marketplace. 
            Here's how we transform common pain points into growth.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
          {painPoints.map((point, index) => (
            <PainPoint 
              key={index}
              number={point.number}
              title={point.title}
              problem={point.problem}
              solution={<span dangerouslySetInnerHTML={{ __html: point.solution }} />}
            />
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <Link to="/restoration">
            <Button className="bg-prometheus-navy hover:bg-prometheus-navy/90 text-white flex items-center gap-2 mx-auto">
              Explore Restoration Solutions
              <ArrowRight size={16} />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PainToSolution;
