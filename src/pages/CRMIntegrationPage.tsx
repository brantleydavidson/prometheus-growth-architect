import React from 'react';
import Navbar from '../components/navigation/Navbar';
import Footer from '../components/layout/Footer';
import { Button } from '../components/ui/button';
import { Link } from 'react-router-dom';
import { Plug, Zap, Cloud, Database, Shield, ArrowRight } from 'lucide-react';
import SEOHead from '../components/common/SEOHead';

const CRMIntegrationPage = () => {
  const integrationCategories = [
    {
      title: 'Marketing Automation',
      icon: Zap,
      tools: ['Mailchimp', 'Marketo', 'Pardot', 'ActiveCampaign', 'Constant Contact'],
      benefits: 'Sync leads, track campaign performance, automate nurture sequences'
    },
    {
      title: 'ERP & Accounting',
      icon: Database,
      tools: ['QuickBooks', 'NetSuite', 'SAP', 'Microsoft Dynamics ERP', 'Sage'],
      benefits: 'Real-time order sync, invoice automation, financial reporting'
    },
    {
      title: 'Communication Tools',
      icon: Cloud,
      tools: ['Slack', 'Microsoft Teams', 'Zoom', 'Gmail', 'Outlook'],
      benefits: 'Centralized communications, meeting scheduling, email tracking'
    },
    {
      title: 'E-commerce Platforms',
      icon: Shield,
      tools: ['Shopify', 'WooCommerce', 'Magento', 'BigCommerce', 'Amazon'],
      benefits: 'Order management, customer data sync, inventory updates'
    }
  ];

  return (
    <>
      <SEOHead 
        title="CRM Integration Services | AI-Powered CRM System Integration"
        description="Expert CRM integration services for seamless connectivity. Connect your CRM with marketing, sales, accounting, and AI tools. Custom API integrations and automation."
        keywords={['CRM integration', 'AI CRM software', 'system integration', 'CRM API', 'CRM automation']}
      />
      
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-prometheus-darkblue to-prometheus-blue">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold mb-6">
              Seamless CRM Integration Services
            </h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Connect your CRM with all your business tools. Expert integration services for 
              marketing automation, ERP, AI tools, and custom applications.
            </p>
            <div className="flex justify-center gap-4">
              <Link to="/book-audit">
                <Button size="lg" className="bg-prometheus-orange hover:bg-orange-600">
                  Get Integration Assessment
                </Button>
              </Link>
              <Link to="/services/crm-implementation">
                <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-prometheus-darkblue">
                  View CRM Services
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Integration Benefits */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">Why CRM Integration Matters</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-prometheus-lightblue rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <Plug className="w-10 h-10 text-prometheus-orange" />
              </div>
              <h3 className="text-xl font-bold mb-3">Unified Data View</h3>
              <p className="text-gray-600">
                Break down data silos and get a 360-degree view of customers across all touchpoints.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-prometheus-lightblue rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <Zap className="w-10 h-10 text-prometheus-orange" />
              </div>
              <h3 className="text-xl font-bold mb-3">Process Automation</h3>
              <p className="text-gray-600">
                Eliminate manual data entry and automate workflows between systems.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-prometheus-lightblue rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <Database className="w-10 h-10 text-prometheus-orange" />
              </div>
              <h3 className="text-xl font-bold mb-3">Real-Time Insights</h3>
              <p className="text-gray-600">
                Access up-to-date information across all systems for better decision making.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Integration Categories */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">CRM Integration Ecosystem</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {integrationCategories.map((category, index) => {
              const Icon = category.icon;
              return (
                <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
                  <div className="flex items-center mb-4">
                    <Icon className="w-8 h-8 text-prometheus-orange mr-3" />
                    <h3 className="text-2xl font-bold">{category.title}</h3>
                  </div>
                  <p className="text-gray-600 mb-4">{category.benefits}</p>
                  <div className="flex flex-wrap gap-2">
                    {category.tools.map((tool, toolIndex) => (
                      <span key={toolIndex} className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* AI Integration Focus */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">AI-Powered CRM Integration</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-6">Next-Generation AI CRM Software Integration</h3>
              <p className="text-gray-600 mb-6">
                Transform your CRM with cutting-edge AI integrations that automate tasks, 
                predict outcomes, and enhance customer experiences.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <Zap className="w-5 h-5 text-prometheus-orange mr-3 mt-1" />
                  <div>
                    <strong>Predictive Analytics:</strong> Integrate AI models for lead scoring, 
                    churn prediction, and sales forecasting
                  </div>
                </li>
                <li className="flex items-start">
                  <Zap className="w-5 h-5 text-prometheus-orange mr-3 mt-1" />
                  <div>
                    <strong>Natural Language Processing:</strong> Sentiment analysis, automated 
                    email responses, and conversation intelligence
                  </div>
                </li>
                <li className="flex items-start">
                  <Zap className="w-5 h-5 text-prometheus-orange mr-3 mt-1" />
                  <div>
                    <strong>Chatbot Integration:</strong> AI-powered customer service bots 
                    connected to your CRM data
                  </div>
                </li>
                <li className="flex items-start">
                  <Zap className="w-5 h-5 text-prometheus-orange mr-3 mt-1" />
                  <div>
                    <strong>LLM Integration:</strong> Custom GPT integrations for content 
                    generation and data analysis
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="bg-prometheus-lightblue p-8 rounded-lg">
              <h4 className="text-xl font-bold mb-4">AI Integration Benefits</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span>Lead Conversion Rate</span>
                  <span className="font-bold text-prometheus-orange">+45%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Sales Productivity</span>
                  <span className="font-bold text-prometheus-orange">+38%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Customer Satisfaction</span>
                  <span className="font-bold text-prometheus-orange">+52%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Operational Efficiency</span>
                  <span className="font-bold text-prometheus-orange">+60%</span>
                </div>
              </div>
              <Link to="/services/ai-enablement">
                <Button className="w-full mt-6 bg-prometheus-orange hover:bg-orange-600">
                  Explore AI Services
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Integration Process */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">Our CRM Integration Process</h2>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              <div className="flex items-start">
                <div className="bg-prometheus-orange text-white rounded-full w-12 h-12 flex items-center justify-center mr-6 flex-shrink-0">1</div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Integration Assessment</h3>
                  <p className="text-gray-600">
                    Analyze your current tech stack, identify integration opportunities, and map data flows between systems.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-prometheus-orange text-white rounded-full w-12 h-12 flex items-center justify-center mr-6 flex-shrink-0">2</div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Architecture Design</h3>
                  <p className="text-gray-600">
                    Design secure, scalable integration architecture using APIs, webhooks, and middleware solutions.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-prometheus-orange text-white rounded-full w-12 h-12 flex items-center justify-center mr-6 flex-shrink-0">3</div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Development & Testing</h3>
                  <p className="text-gray-600">
                    Build custom integrations, configure pre-built connectors, and thoroughly test data synchronization.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-prometheus-orange text-white rounded-full w-12 h-12 flex items-center justify-center mr-6 flex-shrink-0">4</div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Deployment & Monitoring</h3>
                  <p className="text-gray-600">
                    Deploy integrations with minimal disruption and implement monitoring for ongoing reliability.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Platform-Specific Integrations */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">Platform-Specific Integration Expertise</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-4">Salesforce Integration</h3>
              <p className="text-gray-600 mb-4">
                Expert Salesforce API integration, AppExchange apps, and custom Lightning components.
              </p>
              <ul className="text-sm space-y-2 mb-6">
                <li>• REST & SOAP API integration</li>
                <li>• Salesforce Connect setup</li>
                <li>• Custom Apex development</li>
                <li>• Platform Events & CDC</li>
              </ul>
              <Link to="/salesforce-vs-hubspot">
                <Button variant="outline" className="w-full">Learn About Salesforce</Button>
              </Link>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-4">HubSpot Integration</h3>
              <p className="text-gray-600 mb-4">
                Seamless HubSpot API integration, custom workflows, and Operations Hub expertise.
              </p>
              <ul className="text-sm space-y-2 mb-6">
                <li>• HubSpot API v3 integration</li>
                <li>• Custom workflow actions</li>
                <li>• Operations Hub setup</li>
                <li>• Data sync optimization</li>
              </ul>
              <Link to="/salesforce-vs-hubspot">
                <Button variant="outline" className="w-full">Learn About HubSpot</Button>
              </Link>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-4">Microsoft Dynamics</h3>
              <p className="text-gray-600 mb-4">
                Dynamics 365 integration with Power Platform, Azure services, and custom plugins.
              </p>
              <ul className="text-sm space-y-2 mb-6">
                <li>• Power Automate flows</li>
                <li>• Azure Logic Apps</li>
                <li>• Custom plugin development</li>
                <li>• Dataverse integration</li>
              </ul>
              <Link to="/services/crm-implementation">
                <Button variant="outline" className="w-full">Learn About Dynamics</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-prometheus-darkblue text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Connect Your Business Systems?</h2>
          <p className="text-xl mb-8">
            Get expert help integrating your CRM with all your business tools. 
            Our integration specialists ensure seamless data flow and process automation.
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/book-audit">
              <Button size="lg" className="bg-prometheus-orange hover:bg-orange-600">
                Schedule Integration Consultation
              </Button>
            </Link>
            <Link to="/services/crm-implementation">
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-prometheus-darkblue">
                View All CRM Services
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default CRMIntegrationPage; 