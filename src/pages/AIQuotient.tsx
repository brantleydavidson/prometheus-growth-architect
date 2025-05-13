
import React from "react";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import QuotientForm from "@/components/forms/QuotientForm";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ArrowRight, BarChart, Circle, Layers, Target, Users } from "lucide-react";
import CTABanner from "@/components/common/CTABanner";

const AIQuotientPage = () => {
  return (
    <>
      <SEO 
        title="AI Readiness Assessment - Check Your Organization's AI Quotient"
        description="Evaluate your organization's readiness for AI implementation across five key pillars with our comprehensive AI Quotient Assessment tool."
        canonical="/ai-quotient"
        ogType="website"
      />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-purple-50 to-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Measure Your AI Readiness
              </h1>
              <p className="text-lg text-gray-700 mb-8 max-w-xl">
                Our AI Quotient Assessment evaluates your organization's readiness for AI implementation 
                across five key pillars, providing actionable insights to accelerate your AI journey.
              </p>
              <Button size="lg" className="group" onClick={() => {
                const formSection = document.getElementById('assessment-form');
                formSection?.scrollIntoView({ behavior: 'smooth' });
              }}>
                Start Assessment 
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
            
            <div className="flex-1">
              <div className="bg-white rounded-lg shadow-xl p-6">
                <div className="flex items-center mb-4">
                  <BarChart className="h-8 w-8 text-primary mr-3" />
                  <h2 className="text-2xl font-bold">AI Quotient Score</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {pillars.map((pillar, index) => (
                    <div key={index} className="flex items-center p-3 bg-gray-50 rounded-md">
                      {pillar.icon}
                      <span className="ml-3 font-medium">{pillar.name}</span>
                    </div>
                  ))}
                </div>
                
                <div className="bg-gray-50 p-4 rounded-md">
                  <p className="text-sm text-gray-600">
                    25 questions • 5-10 minutes • Personalized report
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Assessment Benefits */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            What You'll Discover
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                <p className="text-gray-700">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Assessment Form */}
      <section id="assessment-form" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-3">
              AI Quotient Assessment
            </h2>
            <p className="text-center text-gray-700 mb-8 max-w-2xl mx-auto">
              Complete the assessment below to receive your organization's AI Quotient score and 
              tailored recommendations for improvement.
            </p>
            
            <QuotientForm />
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <CTABanner 
        title="Ready to Transform Your Business with AI?"
        description="Book a strategy session with our experts to discuss how we can help implement AI solutions tailored to your business needs."
        buttonText="Book a Strategy Session"
        buttonLink="/book-audit"
      />
    </>
  );
};

// Pillar icons for the hero section
const pillars = [
  { 
    name: "Data Spine Health", 
    icon: <Layers className="h-5 w-5 text-blue-500" /> 
  },
  { 
    name: "Funnel Intelligence", 
    icon: <Target className="h-5 w-5 text-amber-500" /> 
  },
  { 
    name: "Automation Maturity", 
    icon: <Circle className="h-5 w-5 text-green-500" /> 
  },
  { 
    name: "Content Operations", 
    icon: <Users className="h-5 w-5 text-purple-500" /> 
  }
];

// Benefits of taking the assessment
const benefits = [
  {
    title: "AI Readiness Score",
    description: "Get a quantitative measure of your organization's readiness for AI implementation across five critical pillars.",
    icon: <BarChart className="h-6 w-6 text-primary" />
  },
  {
    title: "Gap Analysis",
    description: "Identify specific areas where your organization needs to improve to successfully implement AI solutions.",
    icon: <Target className="h-6 w-6 text-primary" />
  },
  {
    title: "Actionable Roadmap",
    description: "Receive tailored recommendations and a step-by-step roadmap to enhance your AI readiness and implementation success.",
    icon: <ArrowRight className="h-6 w-6 text-primary" />
  }
];

export default AIQuotientPage;
