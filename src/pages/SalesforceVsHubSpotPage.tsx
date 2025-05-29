import React from 'react';
import Navbar from '../components/navigation/Navbar';
import OptimizedImage from '../components/common/OptimizedImage';
import { Button } from '../components/ui/button';
import { Link } from 'react-router-dom';
import { Check, X, ArrowRight, BarChart, Users, Zap, DollarSign } from 'lucide-react';
import Footer from '../components/layout/Footer';
import SEOHead from '../components/common/SEOHead';

const SalesforceVsHubSpotPage = () => {
  const comparisonData = [
    {
      feature: 'Pricing Model',
      salesforce: 'Per user/month, starting at $25',
      hubspot: 'Free tier available, paid from $50/month',
      winner: 'hubspot'
    },
    {
      feature: 'Ease of Use',
      salesforce: 'Steeper learning curve, highly customizable',
      hubspot: 'User-friendly interface, quick adoption',
      winner: 'hubspot'
    },
    {
      feature: 'Customization',
      salesforce: 'Extensive customization options',
      hubspot: 'Good customization, some limitations',
      winner: 'salesforce'
    },
    {
      feature: 'Enterprise Features',
      salesforce: 'Comprehensive enterprise capabilities',
      hubspot: 'Growing enterprise features',
      winner: 'salesforce'
    },
    {
      feature: 'Marketing Automation',
      salesforce: 'Requires Pardot (additional cost)',
      hubspot: 'Built-in marketing hub',
      winner: 'hubspot'
    },
    {
      feature: 'Implementation Time',
      salesforce: '3-6 months average',
      hubspot: '1-3 months average',
      winner: 'hubspot'
    },
    {
      feature: 'API & Integrations',
      salesforce: '3000+ integrations',
      hubspot: '1000+ integrations',
      winner: 'salesforce'
    },
    {
      feature: 'Support',
      salesforce: 'Tiered support, additional cost',
      hubspot: 'Included support, active community',
      winner: 'hubspot'
    }
  ];

  const industries = {
    salesforce: ['Manufacturing', 'Financial Services', 'Healthcare', 'Large Enterprises'],
    hubspot: ['SaaS', 'Professional Services', 'E-commerce', 'Growing Businesses']
  };

  return (
    <>
      <SEOHead 
        title="Salesforce vs HubSpot 2024: Complete CRM Comparison Guide"
        description="Detailed comparison of Salesforce vs HubSpot CRM. Compare pricing, features, implementation, and find which CRM is best for your industry. Expert analysis from CRM consultants."
        keywords={['Salesforce vs HubSpot', 'CRM comparison', 'Salesforce vs Dynamics', 'HubSpot CRM pricing', 'CRM implementation']}
      />
      
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-prometheus-darkblue to-prometheus-blue">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold mb-6">
              Salesforce vs HubSpot: Which CRM is Right for You?
            </h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              A comprehensive comparison of the two leading CRM platforms. 
              Expert insights from CRM implementation specialists who've deployed both systems.
            </p>
            <div className="flex justify-center gap-4">
              <Link to="/book-audit">
                <Button size="lg" className="bg-prometheus-orange hover:bg-orange-600">
                  Get Expert CRM Advice
                </Button>
              </Link>
              <Link to="/services/crm-implementation">
                <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-prometheus-darkblue">
                  View Implementation Services
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <BarChart className="w-12 h-12 mx-auto mb-4 text-prometheus-orange" />
              <h3 className="text-2xl font-bold">33%</h3>
              <p className="text-gray-600">Salesforce Market Share</p>
            </div>
            <div className="text-center">
              <Users className="w-12 h-12 mx-auto mb-4 text-prometheus-orange" />
              <h3 className="text-2xl font-bold">22%</h3>
              <p className="text-gray-600">HubSpot Market Share</p>
            </div>
            <div className="text-center">
              <Zap className="w-12 h-12 mx-auto mb-4 text-prometheus-orange" />
              <h3 className="text-2xl font-bold">150K+</h3>
              <p className="text-gray-600">Salesforce Customers</p>
            </div>
            <div className="text-center">
              <DollarSign className="w-12 h-12 mx-auto mb-4 text-prometheus-orange" />
              <h3 className="text-2xl font-bold">194K+</h3>
              <p className="text-gray-600">HubSpot Customers</p>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Comparison Table */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">Feature-by-Feature Comparison</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-4 text-left">Feature</th>
                  <th className="p-4 text-center">Salesforce</th>
                  <th className="p-4 text-center">HubSpot</th>
                  <th className="p-4 text-center">Winner</th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((item, index) => (
                  <tr key={index} className="border-b">
                    <td className="p-4 font-semibold">{item.feature}</td>
                    <td className="p-4 text-center">{item.salesforce}</td>
                    <td className="p-4 text-center">{item.hubspot}</td>
                    <td className="p-4 text-center">
                      {item.winner === 'salesforce' ? (
                        <span className="text-blue-600 font-semibold">Salesforce</span>
                      ) : (
                        <span className="text-orange-600 font-semibold">HubSpot</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Best For Industries */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">Best CRM by Industry</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold mb-6 text-blue-600">Salesforce Best For:</h3>
              <ul className="space-y-3">
                {industries.salesforce.map((industry, index) => (
                  <li key={index} className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    <span>{industry}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <p className="text-gray-600 mb-4">
                  Ideal for complex sales processes, large teams, and enterprises needing extensive customization.
                </p>
                <Link to="/services/crm-implementation">
                  <Button className="w-full">Explore Salesforce Implementation</Button>
                </Link>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold mb-6 text-orange-600">HubSpot Best For:</h3>
              <ul className="space-y-3">
                {industries.hubspot.map((industry, index) => (
                  <li key={index} className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    <span>{industry}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <p className="text-gray-600 mb-4">
                  Perfect for integrated marketing and sales, quick implementation, and businesses prioritizing ease of use.
                </p>
                <Link to="/services/crm-implementation">
                  <Button className="w-full bg-prometheus-orange hover:bg-orange-600">
                    Explore HubSpot Implementation
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Comparison */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">Pricing Comparison</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-lg">
              <h3 className="text-2xl font-bold mb-4">Salesforce Pricing</h3>
              <ul className="space-y-3 mb-6">
                <li className="flex justify-between">
                  <span>Essentials:</span>
                  <span className="font-bold">$25/user/month</span>
                </li>
                <li className="flex justify-between">
                  <span>Professional:</span>
                  <span className="font-bold">$75/user/month</span>
                </li>
                <li className="flex justify-between">
                  <span>Enterprise:</span>
                  <span className="font-bold">$150/user/month</span>
                </li>
                <li className="flex justify-between">
                  <span>Unlimited:</span>
                  <span className="font-bold">$300/user/month</span>
                </li>
              </ul>
              <p className="text-sm text-gray-600">*Annual billing, prices may vary</p>
            </div>
            
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-8 rounded-lg">
              <h3 className="text-2xl font-bold mb-4">HubSpot CRM Pricing</h3>
              <ul className="space-y-3 mb-6">
                <li className="flex justify-between">
                  <span>Free:</span>
                  <span className="font-bold">$0/month</span>
                </li>
                <li className="flex justify-between">
                  <span>Starter:</span>
                  <span className="font-bold">$50/month</span>
                </li>
                <li className="flex justify-between">
                  <span>Professional:</span>
                  <span className="font-bold">$500/month</span>
                </li>
                <li className="flex justify-between">
                  <span>Enterprise:</span>
                  <span className="font-bold">$1,200/month</span>
                </li>
              </ul>
              <p className="text-sm text-gray-600">*Includes 2-10 users depending on tier</p>
            </div>
          </div>
        </div>
      </section>

      {/* Implementation Timeline */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">CRM Implementation Timeline</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold mb-6">Typical Salesforce Implementation</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">1</div>
                  <div>
                    <h4 className="font-semibold">Discovery & Planning (2-4 weeks)</h4>
                    <p className="text-gray-600">Requirements gathering, architecture design</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">2</div>
                  <div>
                    <h4 className="font-semibold">Configuration & Customization (4-8 weeks)</h4>
                    <p className="text-gray-600">Building custom objects, workflows, integrations</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">3</div>
                  <div>
                    <h4 className="font-semibold">Testing & Training (2-4 weeks)</h4>
                    <p className="text-gray-600">UAT, user training, documentation</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">4</div>
                  <div>
                    <h4 className="font-semibold">Go-Live & Support (2-4 weeks)</h4>
                    <p className="text-gray-600">Deployment, hypercare, optimization</p>
                  </div>
                </div>
              </div>
              <p className="mt-6 font-semibold text-blue-600">Total: 3-6 months</p>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold mb-6">Typical HubSpot Implementation</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">1</div>
                  <div>
                    <h4 className="font-semibold">Discovery & Setup (1-2 weeks)</h4>
                    <p className="text-gray-600">Portal setup, initial configuration</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">2</div>
                  <div>
                    <h4 className="font-semibold">Configuration & Migration (2-4 weeks)</h4>
                    <p className="text-gray-600">Data import, workflow setup, integrations</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">3</div>
                  <div>
                    <h4 className="font-semibold">Training & Testing (1-2 weeks)</h4>
                    <p className="text-gray-600">Team training, process testing</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">4</div>
                  <div>
                    <h4 className="font-semibold">Launch & Optimization (1-2 weeks)</h4>
                    <p className="text-gray-600">Go-live, monitoring, quick wins</p>
                  </div>
                </div>
              </div>
              <p className="mt-6 font-semibold text-orange-600">Total: 1-3 months</p>
            </div>
          </div>
        </div>
      </section>

      {/* Decision Framework */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">Which CRM Should You Choose?</h2>
          <div className="bg-white rounded-lg shadow-xl p-8">
            <h3 className="text-2xl font-bold mb-6">Choose Salesforce If:</h3>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start">
                <Check className="w-5 h-5 text-green-500 mr-3 mt-1" />
                <span>You need extensive customization and complex workflows</span>
              </li>
              <li className="flex items-start">
                <Check className="w-5 h-5 text-green-500 mr-3 mt-1" />
                <span>Your organization has 100+ users or complex hierarchies</span>
              </li>
              <li className="flex items-start">
                <Check className="w-5 h-5 text-green-500 mr-3 mt-1" />
                <span>You require advanced reporting and analytics capabilities</span>
              </li>
              <li className="flex items-start">
                <Check className="w-5 h-5 text-green-500 mr-3 mt-1" />
                <span>Integration with enterprise systems is critical</span>
              </li>
            </ul>
            
            <h3 className="text-2xl font-bold mb-6">Choose HubSpot If:</h3>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start">
                <Check className="w-5 h-5 text-green-500 mr-3 mt-1" />
                <span>You want integrated marketing, sales, and service tools</span>
              </li>
              <li className="flex items-start">
                <Check className="w-5 h-5 text-green-500 mr-3 mt-1" />
                <span>Quick implementation and user adoption are priorities</span>
              </li>
              <li className="flex items-start">
                <Check className="w-5 h-5 text-green-500 mr-3 mt-1" />
                <span>You prefer transparent, predictable pricing</span>
              </li>
              <li className="flex items-start">
                <Check className="w-5 h-5 text-green-500 mr-3 mt-1" />
                <span>Your team values intuitive, user-friendly interfaces</span>
              </li>
            </ul>
            
            <div className="bg-prometheus-lightblue p-6 rounded-lg">
              <h4 className="text-xl font-bold mb-3">Need Expert Guidance?</h4>
              <p className="mb-4">
                Our CRM consultants have implemented both Salesforce and HubSpot for hundreds of clients. 
                We'll help you choose the right platform and ensure successful implementation.
              </p>
              <Link to="/book-audit">
                <Button size="lg" className="bg-prometheus-orange hover:bg-orange-600">
                  Get Free CRM Consultation <ArrowRight className="ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Related Resources */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">Related CRM Resources</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Link to="/services/crm-implementation" className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-bold mb-3">CRM Implementation Process</h3>
              <p className="text-gray-600 mb-4">
                Learn about our proven CRM implementation methodology for both platforms.
              </p>
              <span className="text-prometheus-orange font-semibold flex items-center">
                Learn More <ArrowRight className="ml-2 w-4 h-4" />
              </span>
            </Link>
            
            <Link to="/services/crm-strategy" className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-bold mb-3">CRM Strategy Consulting</h3>
              <p className="text-gray-600 mb-4">
                Develop a comprehensive CRM strategy aligned with your business goals.
              </p>
              <span className="text-prometheus-orange font-semibold flex items-center">
                Learn More <ArrowRight className="ml-2 w-4 h-4" />
              </span>
            </Link>
            
            <Link to="/manufacturing" className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-bold mb-3">CRM for Manufacturing</h3>
              <p className="text-gray-600 mb-4">
                Specialized CRM solutions for manufacturing companies and workflows.
              </p>
              <span className="text-prometheus-orange font-semibold flex items-center">
                Learn More <ArrowRight className="ml-2 w-4 h-4" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default SalesforceVsHubSpotPage; 