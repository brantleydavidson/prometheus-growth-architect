import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export interface CaseStudy {
  title: string;
  description: string;
  industry: string;
  result: string;
  image: string;
}

interface SuccessStoriesSectionProps {
  caseStudies: CaseStudy[];
}

const SuccessStoriesSection: React.FC<SuccessStoriesSectionProps> = ({ caseStudies }) => (
  <section className="py-16 bg-gray-50">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-4">Success Stories</h2>
      <p className="text-center text-gray-700 max-w-3xl mx-auto mb-12">
        See how our strategic recommendations have helped businesses like yours achieve remarkable growth.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {caseStudies.map((study, index) => (
          <Card key={index} className="h-full flex flex-col">
            <div className="h-48 overflow-hidden">
              <img
                src={study.image}
                alt={study.title}
                className="w-full h-full object-cover transition-transform hover:scale-105"
              />
            </div>
            <CardContent className="p-6 flex-1 flex flex-col">
              <div className="mb-4">
                <span className="inline-block bg-primary/10 text-primary text-sm font-medium px-3 py-1 rounded-full">
                  {study.industry}
                </span>
              </div>
              <h3 className="text-xl font-bold mb-2">{study.title}</h3>
              <p className="text-gray-600 mb-4 flex-1">{study.description}</p>
              <div className="mt-auto">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-primary">{study.result}</span>
                  <Link to="#" className="text-gray-500 hover:text-gray-700 text-sm font-medium flex items-center">
                    Read Case Study
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  </section>
);

export default SuccessStoriesSection; 