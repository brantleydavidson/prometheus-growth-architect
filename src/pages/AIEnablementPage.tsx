
import React from "react";
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/layout/Footer";
import CTABanner from "@/components/common/CTABanner";
import SEO from "@/components/SEO";
import { getServicePageSchema, getBreadcrumbSchema } from "@/utils/schema";
import { Card, CardContent } from "@/components/ui/card";
import { Bot, Cpu, Database, Lightbulb, MessageSquare, TrendingUp } from "lucide-react";

const AIEnablementPage = () => {
  // Generate structured data for SEO
  const serviceSchema = getServicePageSchema(
    "AI Enablement Services",
    "Transform your business operations and decision-making with strategic AI implementation and integration services.",
    "/services/ai-enablement"
  );
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Services", url: "/services" },
    { name: "AI Enablement", url: "/services/ai-enablement" },
  ]);

  // Combine schemas
  const combinedSchema = [serviceSchema, breadcrumbSchema];

  const aiCapabilities = [
    {
      icon: <MessageSquare className="text-prometheus-orange" size={32} />,
      title: "Conversational AI",
      description: "Deploy intelligent chatbots and virtual assistants that streamline customer interactions and internal processes."
    },
    {
      icon: <TrendingUp className="text-prometheus-orange" size={32} />,
      title: "Predictive Analytics",
      description: "Forecast trends, identify opportunities, and make data-driven decisions with custom predictive models."
    },
    {
      icon: <Database className="text-prometheus-orange" size={32} />,
      title: "Data Integration",
      description: "Connect and normalize data across platforms to create a unified source of truth for AI applications."
    },
    {
      icon: <Cpu className="text-prometheus-orange" size={32} />,
      title: "Process Automation",
      description: "Eliminate repetitive tasks and streamline workflows with intelligent process automation."
    },
    {
      icon: <Lightbulb className="text-prometheus-orange" size={32} />,
      title: "Innovation Workshops",
      description: "Discover new AI-powered opportunities through guided ideation and strategic planning sessions."
    },
    {
      icon: <Bot className="text-prometheus-orange" size={32} />,
      title: "Custom AI Solutions",
      description: "Develop bespoke AI applications tailored to your specific business challenges and opportunities."
    }
  ];

  return (
    <>
      <SEO 
        title="AI Enablement Services | Prometheus Agency"
        description="Transform your business operations and decision-making with strategic AI implementation and integration services."
        canonical="/services/ai-enablement"
        schemaMarkup={combinedSchema}
      />
      
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="pt-24 pb-16 bg-gradient-to-br from-white to-gray-50">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl md:text-5xl font-semibold text-prometheus-navy mb-6 leading-tight">
                  AI Enablement <span className="text-prometheus-orange">That Delivers Results</span>
                </h1>
                <p className="text-lg text-prometheus-gray mb-8 max-w-lg">
                  Move beyond AI hype to practical implementation that drives measurable business outcomes. 
                  Our strategic approach ensures AI investments deliver real ROI.
                </p>
                
                <div className="bg-prometheus-orange/10 border border-prometheus-orange/20 rounded-lg p-6 mb-8">
                  <h3 className="text-xl font-medium text-prometheus-navy mb-3">
                    The Prometheus AI Advantage
                  </h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-prometheus-orange font-medium">✓</span>
                      <span>Implementation focused on business outcomes, not technology for its own sake</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-prometheus-orange font-medium">✓</span>
                      <span>Seamless integration with your existing technology stack</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-prometheus-orange font-medium">✓</span>
                      <span>Comprehensive training and knowledge transfer to your team</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="relative">
                <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden shadow-lg">
                  <img 
                    src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b" 
                    alt="AI technology visualization with data analytics dashboard" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Capabilities Section */}
        <section className="py-20">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-semibold text-prometheus-navy mb-4">
                Our AI Capabilities
              </h2>
              <p className="text-lg text-prometheus-gray max-w-2xl mx-auto">
                Strategic AI services that transform how your business operates, competes, and delivers value.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {aiCapabilities.map((capability, index) => (
                <Card key={index} className="border border-gray-100 hover:border-prometheus-orange transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="mb-4">
                      {capability.icon}
                    </div>
                    <h3 className="text-xl font-medium text-prometheus-navy mb-2">
                      {capability.title}
                    </h3>
                    <p className="text-prometheus-gray">
                      {capability.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        {/* Case Study Section */}
        <section className="py-16 bg-gray-50">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-semibold text-prometheus-navy mb-6">
                  Case Study: AI-Driven Growth
                </h2>
                <p className="text-lg text-prometheus-gray mb-6">
                  Learn how we helped a B2B SaaS company reduce sales cycles by 35% through 
                  strategic AI enablement and process optimization.
                </p>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-medium text-prometheus-navy mb-2">The Challenge</h3>
                    <p>
                      Long sales cycles with multiple decision-makers and inconsistent qualification process 
                      leading to wasted resources and missed opportunities.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-medium text-prometheus-navy mb-2">Our Solution</h3>
                    <p>
                      AI-powered lead scoring and qualification system integrated with existing CRM, 
                      plus automated nurture sequences tailored to each buyer's journey stage.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-medium text-prometheus-navy mb-2">The Results</h3>
                    <ul className="space-y-2">
                      <li>• 35% reduction in sales cycle length</li>
                      <li>• 42% increase in qualified opportunities</li>
                      <li>• 28% improvement in close rates</li>
                      <li>• $1.2M additional revenue in first year</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-100">
                <blockquote className="italic text-lg text-prometheus-gray mb-6">
                  "Prometheus Agency's AI implementation completely transformed how we identify and engage with 
                  prospects. Their practical approach to AI enablement delivered immediate ROI while setting us 
                  up for long-term success."
                </blockquote>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
                  <div>
                    <p className="font-medium text-prometheus-navy">Mark Thompson</p>
                    <p className="text-sm text-prometheus-gray">CRO, TechGrowth Solutions</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <CTABanner
          title="Ready to Harness the Power of AI?"
          description="Book a complimentary AI Strategy Session to discover how we can help you implement AI that drives real business results."
          buttonText="Book Your AI Strategy Session"
          buttonLink="/book-audit"
          color="orange"
        />
      </main>
      <Footer />
    </>
  );
};

export default AIEnablementPage;
