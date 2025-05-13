
import React from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { ChevronRight, CheckCircle, Target, Users, Lightbulb, Zap, BarChart3 } from "lucide-react";
import CTABanner from "@/components/common/CTABanner";

const ConsultingPage = () => {
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
                  <span className="w-2 h-2 bg-prometheus-gold rounded-full"></span>
                  Consulting & GTM Strategy
                </div>
                <h1 className="text-4xl md:text-5xl font-semibold mb-6 leading-tight">
                  Turn Market Challenges Into Opportunities
                </h1>
                <p className="text-white/80 text-lg mb-8 max-w-lg">
                  Navigate complex markets with confidence. Our strategic consulting services 
                  help you develop comprehensive go-to-market strategies that accelerate growth 
                  and create sustainable competitive advantages.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="#gtm-gap-analyzer">
                    <Button className="bg-prometheus-gold hover:bg-prometheus-gold/90 text-white px-6 py-6 text-base w-full sm:w-auto">
                      Try the GTM Gap Analyzer
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
                  <div className="absolute inset-0 bg-gradient-to-br from-prometheus-gold to-prometheus-orange opacity-30"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="bg-prometheus-navy/80 p-6 rounded-lg">
                        <p className="text-xl font-medium mb-3">Client Success Story</p>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <div className="text-4xl font-bold mb-2 text-prometheus-gold">
                              3.2x
                            </div>
                            <p>Revenue Growth</p>
                          </div>
                          <div>
                            <div className="text-4xl font-bold mb-2 text-prometheus-gold">
                              27%
                            </div>
                            <p>Increased Margins</p>
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
        
        {/* Strategy Framework Section */}
        <section className="py-20">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="section-title">Our GTM Strategy Framework</h2>
              <p className="section-subtitle">
                We've developed a comprehensive approach to go-to-market strategy that 
                addresses all critical dimensions of business growth.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Market Positioning */}
              <div className="bg-white p-8 rounded-lg shadow-md border border-gray-100 hover:border-prometheus-gold hover:shadow-lg transition-all">
                <div className="w-16 h-16 rounded-full bg-prometheus-gold/10 flex items-center justify-center mb-6">
                  <Target size={28} className="text-prometheus-gold" />
                </div>
                <h3 className="text-xl font-semibold text-prometheus-navy mb-3">Market Positioning</h3>
                <p className="text-prometheus-gray mb-6">
                  Define your unique market position with clear value propositions that 
                  resonate with your target audience and differentiate you from competitors.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start gap-2">
                    <CheckCircle size={16} className="text-prometheus-gold mt-1 flex-shrink-0" />
                    <span className="text-sm text-prometheus-gray">Competitive analysis and market mapping</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle size={16} className="text-prometheus-gold mt-1 flex-shrink-0" />
                    <span className="text-sm text-prometheus-gray">Value proposition development</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle size={16} className="text-prometheus-gold mt-1 flex-shrink-0" />
                    <span className="text-sm text-prometheus-gray">Positioning statement crafting</span>
                  </li>
                </ul>
              </div>
              
              {/* Audience & Segmentation */}
              <div className="bg-white p-8 rounded-lg shadow-md border border-gray-100 hover:border-prometheus-gold hover:shadow-lg transition-all">
                <div className="w-16 h-16 rounded-full bg-prometheus-gold/10 flex items-center justify-center mb-6">
                  <Users size={28} className="text-prometheus-gold" />
                </div>
                <h3 className="text-xl font-semibold text-prometheus-navy mb-3">Audience & Segmentation</h3>
                <p className="text-prometheus-gray mb-6">
                  Identify and prioritize your ideal customer segments with detailed 
                  personas that guide marketing and sales efforts.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start gap-2">
                    <CheckCircle size={16} className="text-prometheus-gold mt-1 flex-shrink-0" />
                    <span className="text-sm text-prometheus-gray">Market segmentation analysis</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle size={16} className="text-prometheus-gold mt-1 flex-shrink-0" />
                    <span className="text-sm text-prometheus-gray">Buyer persona development</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle size={16} className="text-prometheus-gold mt-1 flex-shrink-0" />
                    <span className="text-sm text-prometheus-gray">Customer journey mapping</span>
                  </li>
                </ul>
              </div>
              
              {/* Channel Strategy */}
              <div className="bg-white p-8 rounded-lg shadow-md border border-gray-100 hover:border-prometheus-gold hover:shadow-lg transition-all">
                <div className="w-16 h-16 rounded-full bg-prometheus-gold/10 flex items-center justify-center mb-6">
                  <Lightbulb size={28} className="text-prometheus-gold" />
                </div>
                <h3 className="text-xl font-semibold text-prometheus-navy mb-3">Channel Strategy</h3>
                <p className="text-prometheus-gray mb-6">
                  Develop efficient acquisition and distribution channels that reach your 
                  target audience and optimize customer acquisition costs.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start gap-2">
                    <CheckCircle size={16} className="text-prometheus-gold mt-1 flex-shrink-0" />
                    <span className="text-sm text-prometheus-gray">Channel effectiveness analysis</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle size={16} className="text-prometheus-gold mt-1 flex-shrink-0" />
                    <span className="text-sm text-prometheus-gray">Multi-channel strategy development</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle size={16} className="text-prometheus-gold mt-1 flex-shrink-0" />
                    <span className="text-sm text-prometheus-gray">Partner and alliance planning</span>
                  </li>
                </ul>
              </div>
              
              {/* Messaging & Content */}
              <div className="bg-white p-8 rounded-lg shadow-md border border-gray-100 hover:border-prometheus-gold hover:shadow-lg transition-all">
                <div className="w-16 h-16 rounded-full bg-prometheus-gold/10 flex items-center justify-center mb-6">
                  <Zap size={28} className="text-prometheus-gold" />
                </div>
                <h3 className="text-xl font-semibold text-prometheus-navy mb-3">Messaging & Content</h3>
                <p className="text-prometheus-gray mb-6">
                  Create compelling messaging frameworks and content strategies that 
                  resonate with your target audience and drive engagement.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start gap-2">
                    <CheckCircle size={16} className="text-prometheus-gold mt-1 flex-shrink-0" />
                    <span className="text-sm text-prometheus-gray">Messaging architecture development</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle size={16} className="text-prometheus-gold mt-1 flex-shrink-0" />
                    <span className="text-sm text-prometheus-gray">Content strategy and planning</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle size={16} className="text-prometheus-gold mt-1 flex-shrink-0" />
                    <span className="text-sm text-prometheus-gray">Brand voice and tone guidelines</span>
                  </li>
                </ul>
              </div>
              
              {/* Sales Enablement */}
              <div className="bg-white p-8 rounded-lg shadow-md border border-gray-100 hover:border-prometheus-gold hover:shadow-lg transition-all">
                <div className="w-16 h-16 rounded-full bg-prometheus-gold/10 flex items-center justify-center mb-6">
                  <Users size={28} className="text-prometheus-gold" />
                </div>
                <h3 className="text-xl font-semibold text-prometheus-navy mb-3">Sales Enablement</h3>
                <p className="text-prometheus-gray mb-6">
                  Equip your sales team with the tools, processes, and content they need 
                  to effectively convert prospects into customers.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start gap-2">
                    <CheckCircle size={16} className="text-prometheus-gold mt-1 flex-shrink-0" />
                    <span className="text-sm text-prometheus-gray">Sales process optimization</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle size={16} className="text-prometheus-gold mt-1 flex-shrink-0" />
                    <span className="text-sm text-prometheus-gray">Sales toolkit development</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle size={16} className="text-prometheus-gold mt-1 flex-shrink-0" />
                    <span className="text-sm text-prometheus-gray">Training and enablement programs</span>
                  </li>
                </ul>
              </div>
              
              {/* Performance Measurement */}
              <div className="bg-white p-8 rounded-lg shadow-md border border-gray-100 hover:border-prometheus-gold hover:shadow-lg transition-all">
                <div className="w-16 h-16 rounded-full bg-prometheus-gold/10 flex items-center justify-center mb-6">
                  <BarChart3 size={28} className="text-prometheus-gold" />
                </div>
                <h3 className="text-xl font-semibold text-prometheus-navy mb-3">Performance Measurement</h3>
                <p className="text-prometheus-gray mb-6">
                  Establish clear metrics and reporting frameworks to track performance, 
                  measure ROI, and continuously optimize your GTM strategy.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start gap-2">
                    <CheckCircle size={16} className="text-prometheus-gold mt-1 flex-shrink-0" />
                    <span className="text-sm text-prometheus-gray">KPI framework development</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle size={16} className="text-prometheus-gold mt-1 flex-shrink-0" />
                    <span className="text-sm text-prometheus-gray">Dashboard and reporting setup</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle size={16} className="text-prometheus-gold mt-1 flex-shrink-0" />
                    <span className="text-sm text-prometheus-gray">Continuous improvement processes</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        
        {/* GTM Gap Analyzer */}
        <section id="gtm-gap-analyzer" className="py-20 bg-gray-50">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-semibold text-prometheus-navy mb-6">
                  Identify Your GTM Gaps
                </h2>
                <p className="text-prometheus-gray mb-6">
                  Take our GTM Gap Analyzer to identify the critical gaps in your current 
                  go-to-market approach and receive a personalized improvement plan.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-2">
                    <CheckCircle size={20} className="text-prometheus-gold mt-1 flex-shrink-0" />
                    <span className="text-prometheus-gray">15-minute assessment of your current GTM strategy</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle size={20} className="text-prometheus-gold mt-1 flex-shrink-0" />
                    <span className="text-prometheus-gray">Identification of critical gaps and opportunities</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle size={20} className="text-prometheus-gold mt-1 flex-shrink-0" />
                    <span className="text-prometheus-gray">Personalized recommendations for improvement</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle size={20} className="text-prometheus-gold mt-1 flex-shrink-0" />
                    <span className="text-prometheus-gray">Benchmarking against industry best practices</span>
                  </li>
                </ul>
                <Button className="bg-prometheus-gold hover:bg-prometheus-gold/90 text-white px-6 py-6 text-base">
                  Take the GTM Gap Analyzer
                </Button>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200">
                {/* Placeholder for Analyzer Embed/Form */}
                <div className="p-6 border-2 border-dashed border-gray-200 rounded-lg flex flex-col items-center justify-center min-h-[400px]">
                  <h3 className="text-2xl font-semibold text-prometheus-navy mb-4 text-center">
                    GTM Gap Analyzer
                  </h3>
                  <p className="text-prometheus-gray text-center mb-6">
                    Complete this assessment to receive your personalized GTM gap analysis and improvement plan.
                  </p>
                  <Button className="bg-prometheus-gold hover:bg-prometheus-gold/90 text-white">
                    Start Assessment
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Methodology Section */}
        <section className="py-20">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="section-title">Our Consulting Methodology</h2>
              <p className="section-subtitle">
                We follow a proven approach that combines deep analysis with practical 
                implementation to deliver measurable results.
              </p>
            </div>
            
            <div className="relative max-w-4xl mx-auto">
              {/* Step 1 */}
              <div className="flex flex-col md:flex-row items-start mb-16 relative">
                <div className="md:w-1/3 flex flex-col items-center md:items-end mb-6 md:mb-0">
                  <div className="w-16 h-16 rounded-full bg-prometheus-gold flex items-center justify-center text-white text-xl font-semibold mb-4">1</div>
                  <h3 className="text-xl font-semibold text-prometheus-navy text-center md:text-right">Discovery & Assessment</h3>
                </div>
                <div className="md:w-2/3 md:pl-12">
                  <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                    <p className="text-prometheus-gray mb-4">
                      We conduct a comprehensive analysis of your current market position, 
                      competitive landscape, and internal capabilities.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle size={16} className="text-prometheus-gold mt-1 flex-shrink-0" />
                        <span className="text-sm text-prometheus-gray">Market and competitive analysis</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle size={16} className="text-prometheus-gold mt-1 flex-shrink-0" />
                        <span className="text-sm text-prometheus-gray">Customer and prospect interviews</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle size={16} className="text-prometheus-gold mt-1 flex-shrink-0" />
                        <span className="text-sm text-prometheus-gray">Internal capabilities assessment</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              
              {/* Step 2 */}
              <div className="flex flex-col md:flex-row items-start mb-16 relative">
                <div className="md:w-1/3 flex flex-col items-center md:items-end mb-6 md:mb-0">
                  <div className="w-16 h-16 rounded-full bg-prometheus-gold flex items-center justify-center text-white text-xl font-semibold mb-4">2</div>
                  <h3 className="text-xl font-semibold text-prometheus-navy text-center md:text-right">Strategy Development</h3>
                </div>
                <div className="md:w-2/3 md:pl-12">
                  <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                    <p className="text-prometheus-gray mb-4">
                      We collaborate with your team to develop a comprehensive GTM strategy 
                      that addresses all critical dimensions of growth.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle size={16} className="text-prometheus-gold mt-1 flex-shrink-0" />
                        <span className="text-sm text-prometheus-gray">Positioning and messaging frameworks</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle size={16} className="text-prometheus-gold mt-1 flex-shrink-0" />
                        <span className="text-sm text-prometheus-gray">Target audience and segmentation strategy</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle size={16} className="text-prometheus-gold mt-1 flex-shrink-0" />
                        <span className="text-sm text-prometheus-gray">Channel and go-to-market planning</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              
              {/* Step 3 */}
              <div className="flex flex-col md:flex-row items-start mb-16 relative">
                <div className="md:w-1/3 flex flex-col items-center md:items-end mb-6 md:mb-0">
                  <div className="w-16 h-16 rounded-full bg-prometheus-gold flex items-center justify-center text-white text-xl font-semibold mb-4">3</div>
                  <h3 className="text-xl font-semibold text-prometheus-navy text-center md:text-right">Implementation Planning</h3>
                </div>
                <div className="md:w-2/3 md:pl-12">
                  <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                    <p className="text-prometheus-gray mb-4">
                      We translate strategy into actionable plans with clear timelines, 
                      responsibilities, and success metrics.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle size={16} className="text-prometheus-gold mt-1 flex-shrink-0" />
                        <span className="text-sm text-prometheus-gray">90-day implementation roadmap</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle size={16} className="text-prometheus-gold mt-1 flex-shrink-0" />
                        <span className="text-sm text-prometheus-gray">Resource allocation and budgeting</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle size={16} className="text-prometheus-gold mt-1 flex-shrink-0" />
                        <span className="text-sm text-prometheus-gray">KPI framework and measurement plan</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              
              {/* Step 4 */}
              <div className="flex flex-col md:flex-row items-start relative">
                <div className="md:w-1/3 flex flex-col items-center md:items-end mb-6 md:mb-0">
                  <div className="w-16 h-16 rounded-full bg-prometheus-gold flex items-center justify-center text-white text-xl font-semibold mb-4">4</div>
                  <h3 className="text-xl font-semibold text-prometheus-navy text-center md:text-right">Execution Support</h3>
                </div>
                <div className="md:w-2/3 md:pl-12">
                  <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                    <p className="text-prometheus-gray mb-4">
                      We provide ongoing support and guidance to ensure successful 
                      implementation and continuous optimization.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle size={16} className="text-prometheus-gold mt-1 flex-shrink-0" />
                        <span className="text-sm text-prometheus-gray">Implementation coaching and support</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle size={16} className="text-prometheus-gold mt-1 flex-shrink-0" />
                        <span className="text-sm text-prometheus-gray">Regular performance reviews</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle size={16} className="text-prometheus-gold mt-1 flex-shrink-0" />
                        <span className="text-sm text-prometheus-gray">Strategy refinement and optimization</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              
              {/* Vertical connecting line */}
              <div className="absolute left-[16.7%] top-16 bottom-16 w-0.5 bg-prometheus-gold/20 hidden md:block"></div>
            </div>
          </div>
        </section>
        
        <CTABanner
          title="Ready to Transform Your Go-to-Market Strategy?"
          description="Take the GTM Gap Analyzer or book a strategy call to discover how we can help you accelerate growth."
          buttonText="Take the GTM Gap Analyzer"
          buttonLink="#gtm-gap-analyzer"
          color="gold"
        />
      </main>
      <Footer />
    </>
  );
};

export default ConsultingPage;
