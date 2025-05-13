
import React from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { ChevronRight, CheckCircle, Brain, Clock, LineChart, Database, Shield } from "lucide-react";
import CTABanner from "@/components/common/CTABanner";

const AIEnablementPage = () => {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="pt-16 pb-24 bg-prometheus-navy text-white">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-1 text-sm font-medium mb-6">
                  <span className="w-2 h-2 bg-prometheus-orange rounded-full"></span>
                  AI Enablement & Integration
                </div>
                <h1 className="text-4xl md:text-5xl font-semibold mb-6 leading-tight">
                  Transform Your Business With Strategic AI Implementation
                </h1>
                <p className="text-white/80 text-lg mb-8 max-w-lg">
                  Move beyond the AI hype and implement practical solutions that deliver 
                  real business value. Our AI Enablement service helps you identify, 
                  implement, and scale AI tools that drive measurable results.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="#ai-quotient-quiz">
                    <Button className="bg-prometheus-orange hover:bg-prometheus-orange/90 text-white px-6 py-6 text-base w-full sm:w-auto">
                      Take the AI Quotient™ Quiz
                    </Button>
                  </Link>
                  <Link to="/book-audit">
                    <Button variant="outline" className="border-white text-white hover:bg-white hover:text-prometheus-navy px-6 py-6 text-base flex items-center gap-2 w-full sm:w-auto">
                      Book a Strategy Call
                      <ChevronRight size={16} />
                    </Button>
                  </Link>
                </div>
              </div>
              
              <div className="relative">
                <div className="relative aspect-video rounded-lg overflow-hidden">
                  {/* This would be a video or image in the real implementation */}
                  <div className="absolute inset-0 bg-gradient-to-br from-prometheus-orange to-prometheus-gold opacity-30"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="bg-prometheus-navy/80 p-6 rounded-lg">
                        <p className="text-xl font-medium mb-3">Client Success Story</p>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <div className="text-4xl font-bold mb-2 text-prometheus-orange">
                              63%
                            </div>
                            <p>Faster Data Analysis</p>
                          </div>
                          <div>
                            <div className="text-4xl font-bold mb-2 text-prometheus-orange">
                              42%
                            </div>
                            <p>Reduced Process Costs</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* AI Pillars Section */}
        <section className="py-20">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="section-title">The 5 Pillars of AI Readiness</h2>
              <p className="section-subtitle">
                Successful AI implementation requires more than just technology. 
                Our framework ensures your organization is ready across all critical dimensions.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
              {/* Pillar 1 */}
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 hover:border-prometheus-orange hover:shadow-lg transition-all text-center">
                <div className="mx-auto w-16 h-16 rounded-full bg-prometheus-orange/10 flex items-center justify-center mb-6">
                  <Database size={24} className="text-prometheus-orange" />
                </div>
                <h3 className="text-lg font-semibold text-prometheus-navy mb-3">Data Spine Health</h3>
                <p className="text-prometheus-gray text-sm">
                  The quality, accessibility, and structure of your data determines 
                  the potential success of your AI initiatives.
                </p>
              </div>
              
              {/* Pillar 2 */}
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 hover:border-prometheus-orange hover:shadow-lg transition-all text-center">
                <div className="mx-auto w-16 h-16 rounded-full bg-prometheus-orange/10 flex items-center justify-center mb-6">
                  <LineChart size={24} className="text-prometheus-orange" />
                </div>
                <h3 className="text-lg font-semibold text-prometheus-navy mb-3">Funnel Intelligence</h3>
                <p className="text-prometheus-gray text-sm">
                  How effectively you track and analyze your customer journey impacts 
                  AI's ability to optimize conversions.
                </p>
              </div>
              
              {/* Pillar 3 */}
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 hover:border-prometheus-orange hover:shadow-lg transition-all text-center">
                <div className="mx-auto w-16 h-16 rounded-full bg-prometheus-orange/10 flex items-center justify-center mb-6">
                  <Clock size={24} className="text-prometheus-orange" />
                </div>
                <h3 className="text-lg font-semibold text-prometheus-navy mb-3">Automation</h3>
                <p className="text-prometheus-gray text-sm">
                  Your current level of process automation determines how quickly AI can 
                  be integrated into workflows.
                </p>
              </div>
              
              {/* Pillar 4 */}
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 hover:border-prometheus-orange hover:shadow-lg transition-all text-center">
                <div className="mx-auto w-16 h-16 rounded-full bg-prometheus-orange/10 flex items-center justify-center mb-6">
                  <Brain size={24} className="text-prometheus-orange" />
                </div>
                <h3 className="text-lg font-semibold text-prometheus-navy mb-3">Content Operations</h3>
                <p className="text-prometheus-gray text-sm">
                  Your content creation and management processes impact AI's ability to 
                  enhance marketing effectiveness.
                </p>
              </div>
              
              {/* Pillar 5 */}
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 hover:border-prometheus-orange hover:shadow-lg transition-all text-center">
                <div className="mx-auto w-16 h-16 rounded-full bg-prometheus-orange/10 flex items-center justify-center mb-6">
                  <Shield size={24} className="text-prometheus-orange" />
                </div>
                <h3 className="text-lg font-semibold text-prometheus-navy mb-3">Governance</h3>
                <p className="text-prometheus-gray text-sm">
                  Your policies, oversight, and risk management frameworks determine AI's 
                  ethical implementation and compliance.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* AI Quotient Quiz Section */}
        <section id="ai-quotient-quiz" className="py-20 bg-gray-50">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-semibold text-prometheus-navy mb-6">
                  Discover Your AI Readiness Level
                </h2>
                <p className="text-prometheus-gray mb-6">
                  Take our AI Quotient™ Assessment to understand where your organization 
                  stands across the 5 pillars of AI readiness and receive a personalized 
                  roadmap for implementation.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-2">
                    <CheckCircle size={20} className="text-prometheus-orange mt-1 flex-shrink-0" />
                    <span className="text-prometheus-gray">25 questions across the 5 key pillars of AI readiness</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle size={20} className="text-prometheus-orange mt-1 flex-shrink-0" />
                    <span className="text-prometheus-gray">Detailed scoring and analysis of your current state</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle size={20} className="text-prometheus-orange mt-1 flex-shrink-0" />
                    <span className="text-prometheus-gray">Personalized recommendations and next steps</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle size={20} className="text-prometheus-orange mt-1 flex-shrink-0" />
                    <span className="text-prometheus-gray">Benchmarking against industry standards</span>
                  </li>
                </ul>
                <Button className="bg-prometheus-orange hover:bg-prometheus-orange/90 text-white px-6 py-6 text-base">
                  Take the AI Quotient™ Quiz
                </Button>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200">
                {/* Placeholder for Quiz Embed/Form */}
                <div className="p-6 border-2 border-dashed border-gray-200 rounded-lg flex flex-col items-center justify-center min-h-[400px]">
                  <h3 className="text-2xl font-semibold text-prometheus-navy mb-4 text-center">
                    AI Quotient™ Assessment
                  </h3>
                  <p className="text-prometheus-gray text-center mb-6">
                    Complete this assessment to receive your personalized AI readiness score and implementation roadmap.
                  </p>
                  <Button className="bg-prometheus-orange hover:bg-prometheus-orange/90 text-white">
                    Start Assessment
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* AI Implementation Process */}
        <section className="py-20">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="section-title">Our AI Implementation Process</h2>
              <p className="section-subtitle">
                We've developed a proven methodology for implementing AI solutions that deliver 
                measurable ROI quickly and scale effectively.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* QuickStart-30 */}
              <div className="bg-white p-8 rounded-lg shadow-md border border-gray-100">
                <div className="inline-flex items-center gap-2 bg-prometheus-orange/10 text-prometheus-orange rounded-full px-4 py-1 text-sm font-medium mb-6">
                  Phase 1: QuickStart-30
                </div>
                <h3 className="text-2xl font-semibold text-prometheus-navy mb-4">
                  From Assessment to First Results in 30 Days
                </h3>
                <p className="text-prometheus-gray mb-6">
                  We identify and implement your first high-impact AI use case within 30 days, 
                  creating immediate value while laying the groundwork for broader adoption.
                </p>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-prometheus-navy flex items-center justify-center text-white font-medium flex-shrink-0">1</div>
                    <div>
                      <h4 className="font-medium text-prometheus-navy mb-1">Assessment & Prioritization</h4>
                      <p className="text-sm text-prometheus-gray">Complete AI Quotient™ assessment and identify your highest-impact, lowest-effort opportunity.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-prometheus-navy flex items-center justify-center text-white font-medium flex-shrink-0">2</div>
                    <div>
                      <h4 className="font-medium text-prometheus-navy mb-1">Rapid Prototype</h4>
                      <p className="text-sm text-prometheus-gray">Develop and test an AI solution for your priority use case within 2 weeks.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-prometheus-navy flex items-center justify-center text-white font-medium flex-shrink-0">3</div>
                    <div>
                      <h4 className="font-medium text-prometheus-navy mb-1">Implementation & Training</h4>
                      <p className="text-sm text-prometheus-gray">Deploy the solution and train your team on effective usage and monitoring.</p>
                    </div>
                  </li>
                </ul>
                <div className="p-4 bg-green-50 rounded-md border border-green-100">
                  <p className="flex items-start gap-2 text-sm">
                    <CheckCircle size={16} className="text-green-600 mt-1 flex-shrink-0" />
                    <span className="text-green-800">
                      <strong>Typical outcomes:</strong> 20-30% efficiency improvement in the target process, 
                      clear ROI measurement, and identified opportunities for expansion.
                    </span>
                  </p>
                </div>
              </div>
              
              {/* Lift-90 */}
              <div className="bg-white p-8 rounded-lg shadow-md border border-gray-100">
                <div className="inline-flex items-center gap-2 bg-prometheus-gold/10 text-prometheus-gold rounded-full px-4 py-1 text-sm font-medium mb-6">
                  Phase 2: Lift-90
                </div>
                <h3 className="text-2xl font-semibold text-prometheus-navy mb-4">
                  Scaling AI Across Your Organization
                </h3>
                <p className="text-prometheus-gray mb-6">
                  Building on your initial success, we implement a comprehensive AI strategy 
                  that addresses multiple use cases and creates transformative results.
                </p>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-prometheus-navy flex items-center justify-center text-white font-medium flex-shrink-0">1</div>
                    <div>
                      <h4 className="font-medium text-prometheus-navy mb-1">Strategic Roadmap</h4>
                      <p className="text-sm text-prometheus-gray">Develop a prioritized 90-day implementation plan across multiple functional areas.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-prometheus-navy flex items-center justify-center text-white font-medium flex-shrink-0">2</div>
                    <div>
                      <h4 className="font-medium text-prometheus-navy mb-1">Foundation Building</h4>
                      <p className="text-sm text-prometheus-gray">Establish data infrastructure, governance policies, and integration frameworks.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-prometheus-navy flex items-center justify-center text-white font-medium flex-shrink-0">3</div>
                    <div>
                      <h4 className="font-medium text-prometheus-navy mb-1">Multi-Solution Deployment</h4>
                      <p className="text-sm text-prometheus-gray">Implement 3-5 high-impact AI solutions across different functional areas.</p>
                    </div>
                  </li>
                </ul>
                <div className="p-4 bg-green-50 rounded-md border border-green-100">
                  <p className="flex items-start gap-2 text-sm">
                    <CheckCircle size={16} className="text-green-600 mt-1 flex-shrink-0" />
                    <span className="text-green-800">
                      <strong>Typical outcomes:</strong> 40-60% productivity improvements, 25-35% cost reductions, 
                      enhanced decision-making capabilities, and competitive differentiation.
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <CTABanner
          title="Ready to Start Your AI Journey?"
          description="Take the AI Quotient™ Assessment to discover your organization's readiness and receive a personalized implementation roadmap."
          buttonText="Take the Assessment"
          buttonLink="#ai-quotient-quiz"
          color="orange"
        />
      </main>
      <Footer />
    </>
  );
};

export default AIEnablementPage;
