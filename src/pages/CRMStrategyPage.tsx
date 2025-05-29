import React from 'react';
import Navbar from '../components/navigation/Navbar';
import Footer from '../components/layout/Footer';
import { Button } from '../components/ui/button';
import { Link } from 'react-router-dom';
import { Target, TrendingUp, Users, BarChart3, Layers, ArrowRight } from 'lucide-react';
import SEOHead from '../components/common/SEOHead';

const CRMStrategyPage = () => {
  return (
    <>
      <SEOHead 
        title="CRM Strategy Consulting | Data-Driven CRM Analytics & Planning"
        description="Expert CRM strategy development and analytics consulting. Create a winning CRM strategy aligned with business goals. Optimize customer journey, sales processes, and revenue growth."
        keywords={['CRM strategy', 'CRM analytics', 'CRM consulting', 'CRM implementation']}
      />
      
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-prometheus-darkblue to-prometheus-blue">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold mb-6">
              Strategic CRM Planning & Analytics
            </h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Develop a comprehensive CRM strategy that aligns technology with business objectives. 
              Data-driven approach to customer relationship management and revenue optimization.
            </p>
            <div className="flex justify-center gap-4">
              <Link to="/book-audit">
                <Button size="lg" className="bg-prometheus-orange hover:bg-orange-600">
                  Get CRM Strategy Consultation
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

      {/* Strategic Components */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">CRM Strategy Framework</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <Target className="w-12 h-12 text-prometheus-orange mb-4" />
              <h3 className="text-xl font-bold mb-3">Business Alignment</h3>
              <p className="text-gray-600 mb-4">
                Map CRM capabilities to business objectives, ensuring technology supports growth goals.
              </p>
              <ul className="text-sm space-y-2">
                <li>• Revenue targets mapping</li>
                <li>• Customer lifecycle optimization</li>
                <li>• Process automation opportunities</li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <BarChart3 className="w-12 h-12 text-prometheus-orange mb-4" />
              <h3 className="text-xl font-bold mb-3">CRM Analytics Design</h3>
              <p className="text-gray-600 mb-4">
                Build comprehensive analytics frameworks for data-driven decision making.
              </p>
              <ul className="text-sm space-y-2">
                <li>• KPI dashboard development</li>
                <li>• Predictive analytics models</li>
                <li>• Customer segmentation</li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <Layers className="w-12 h-12 text-prometheus-orange mb-4" />
              <h3 className="text-xl font-bold mb-3">Technology Stack</h3>
              <p className="text-gray-600 mb-4">
                Select and integrate the optimal CRM platform and complementary tools.
              </p>
              <ul className="text-sm space-y-2">
                <li>• Platform evaluation</li>
                <li>• Integration architecture</li>
                <li>• Scalability planning</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Strategic Process */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">Our CRM Strategy Development Process</h2>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              <div className="flex items-start">
                <div className="bg-prometheus-orange text-white rounded-full w-12 h-12 flex items-center justify-center mr-6 flex-shrink-0">1</div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Current State Assessment</h3>
                  <p className="text-gray-600">
                    Analyze existing processes, technology, and data to understand your starting point. 
                    Identify gaps, inefficiencies, and opportunities for improvement.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-prometheus-orange text-white rounded-full w-12 h-12 flex items-center justify-center mr-6 flex-shrink-0">2</div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Future State Design</h3>
                  <p className="text-gray-600">
                    Define optimal customer journeys, sales processes, and service workflows. 
                    Design CRM architecture to support business growth and scalability.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-prometheus-orange text-white rounded-full w-12 h-12 flex items-center justify-center mr-6 flex-shrink-0">3</div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Analytics Framework</h3>
                  <p className="text-gray-600">
                    Develop comprehensive CRM analytics strategy with KPIs, dashboards, and reporting. 
                    Enable data-driven decision making across all customer touchpoints.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-prometheus-orange text-white rounded-full w-12 h-12 flex items-center justify-center mr-6 flex-shrink-0">4</div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Implementation Roadmap</h3>
                  <p className="text-gray-600">
                    Create phased approach to CRM transformation with clear milestones and success metrics. 
                    Prioritize quick wins while building toward long-term vision.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Analytics Focus */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">CRM Analytics That Drive Results</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold mb-6">Key Analytics Areas</h3>
              <div className="space-y-4">
                <div className="border-l-4 border-prometheus-orange pl-4">
                  <h4 className="font-semibold mb-1">Sales Performance Analytics</h4>
                  <p className="text-gray-600">Pipeline velocity, conversion rates, deal size trends, rep productivity</p>
                </div>
                <div className="border-l-4 border-prometheus-orange pl-4">
                  <h4 className="font-semibold mb-1">Customer Behavior Analytics</h4>
                  <p className="text-gray-600">Engagement patterns, purchase history, lifetime value, churn predictors</p>
                </div>
                <div className="border-l-4 border-prometheus-orange pl-4">
                  <h4 className="font-semibold mb-1">Marketing Attribution</h4>
                  <p className="text-gray-600">Campaign ROI, lead source analysis, multi-touch attribution models</p>
                </div>
                <div className="border-l-4 border-prometheus-orange pl-4">
                  <h4 className="font-semibold mb-1">Service Quality Metrics</h4>
                  <p className="text-gray-600">Response times, resolution rates, customer satisfaction scores</p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold mb-6">Strategic Outcomes</h3>
              <div className="bg-prometheus-lightblue p-6 rounded-lg">
                <div className="space-y-4">
                  <div className="flex items-center">
                    <TrendingUp className="w-8 h-8 text-prometheus-orange mr-4" />
                    <div>
                      <h4 className="font-semibold">25-40% Revenue Growth</h4>
                      <p className="text-sm text-gray-600">Through optimized processes and data insights</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Users className="w-8 h-8 text-prometheus-orange mr-4" />
                    <div>
                      <h4 className="font-semibold">30% Better Customer Retention</h4>
                      <p className="text-sm text-gray-600">Via proactive engagement strategies</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <BarChart3 className="w-8 h-8 text-prometheus-orange mr-4" />
                    <div>
                      <h4 className="font-semibold">50% Faster Decision Making</h4>
                      <p className="text-sm text-gray-600">With real-time analytics dashboards</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Industry-Specific Strategies */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">Industry-Specific CRM Strategies</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Link to="/manufacturing" className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-bold mb-3">Manufacturing CRM Strategy</h3>
              <p className="text-gray-600 mb-4">
                Align CRM with production cycles, dealer networks, and complex B2B sales processes.
              </p>
              <span className="text-prometheus-orange font-semibold flex items-center">
                Learn More <ArrowRight className="ml-2 w-4 h-4" />
              </span>
            </Link>
            
            <Link to="/professional-services" className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-bold mb-3">Construction CRM Strategy</h3>
              <p className="text-gray-600 mb-4">
                Optimize for project-based sales, bid management, and long sales cycles.
              </p>
              <span className="text-prometheus-orange font-semibold flex items-center">
                Learn More <ArrowRight className="ml-2 w-4 h-4" />
              </span>
            </Link>
            
            <Link to="/consumer-services" className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-bold mb-3">Service Industry CRM Strategy</h3>
              <p className="text-gray-600 mb-4">
                Focus on route optimization, recurring revenue, and customer lifetime value.
              </p>
              <span className="text-prometheus-orange font-semibold flex items-center">
                Learn More <ArrowRight className="ml-2 w-4 h-4" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-prometheus-darkblue text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Transform Your CRM Strategy?</h2>
          <p className="text-xl mb-8">
            Get expert guidance on developing a CRM strategy that drives measurable business results. 
            Our consultants combine deep CRM expertise with industry knowledge to deliver strategic advantage.
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/book-audit">
              <Button size="lg" className="bg-prometheus-orange hover:bg-orange-600">
                Schedule Strategy Session
              </Button>
            </Link>
            <Link to="/insights">
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-prometheus-darkblue">
                Read CRM Strategy Insights
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default CRMStrategyPage; 