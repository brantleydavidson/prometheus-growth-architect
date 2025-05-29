import React from 'react';
import Navbar from '../components/navigation/Navbar';
import Footer from '../components/layout/Footer';
import { Button } from '../components/ui/button';
import { Link } from 'react-router-dom';
import { Check, Home, Calendar, FileText, DollarSign, Users, ArrowRight, X } from 'lucide-react';
import SEOHead from '../components/common/SEOHead';

const CRMForRoofersPage = () => {
  return (
    <>
      <SEOHead 
        title="CRM for Roofers | Roofing CRM Software & Implementation"
        description="Specialized CRM for roofers and roofing contractors. Manage leads, estimates, jobs, and crews efficiently. Industry-specific CRM implementation for roofing businesses."
        keywords={['CRM for roofers', 'roofing CRM software', 'contractor CRM', 'CRM implementation']}
      />
      
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-prometheus-darkblue to-prometheus-blue">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold mb-6">
              CRM for Roofers: Grow Your Roofing Business
            </h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Streamline lead management, automate estimates, and track jobs from first contact to final payment. 
              Purpose-built CRM solutions for roofing contractors.
            </p>
            <div className="flex justify-center gap-4">
              <Link to="/book-audit">
                <Button size="lg" className="bg-prometheus-orange hover:bg-orange-600">
                  Get Free CRM Demo
                </Button>
              </Link>
              <Link to="/services/crm-implementation">
                <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-prometheus-darkblue">
                  Learn About Implementation
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">CRM Features for Roofing Contractors</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <Home className="w-12 h-12 text-prometheus-orange mb-4" />
              <h3 className="text-xl font-bold mb-3">Lead & Referral Tracking</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                  <span>Storm damage lead tracking</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                  <span>Insurance claim management</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                  <span>Referral partner tracking</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <FileText className="w-12 h-12 text-prometheus-orange mb-4" />
              <h3 className="text-xl font-bold mb-3">Estimate & Proposal Automation</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                  <span>Material cost calculators</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                  <span>Digital proposal templates</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                  <span>E-signature integration</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <Calendar className="w-12 h-12 text-prometheus-orange mb-4" />
              <h3 className="text-xl font-bold mb-3">Job & Crew Scheduling</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                  <span>Crew calendar management</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                  <span>Weather-based scheduling</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                  <span>Customer notifications</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">Why Roofers Need a Specialized CRM</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold mb-6">Industry-Specific Challenges</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <X className="w-5 h-5 text-red-500 mr-3 mt-1" />
                  <div>
                    <strong>Seasonal Fluctuations:</strong> Managing varying workloads throughout the year
                  </div>
                </li>
                <li className="flex items-start">
                  <X className="w-5 h-5 text-red-500 mr-3 mt-1" />
                  <div>
                    <strong>Insurance Complexity:</strong> Tracking claims, adjusters, and approvals
                  </div>
                </li>
                <li className="flex items-start">
                  <X className="w-5 h-5 text-red-500 mr-3 mt-1" />
                  <div>
                    <strong>Lead Response Time:</strong> Competing for storm damage repairs
                  </div>
                </li>
                <li className="flex items-start">
                  <X className="w-5 h-5 text-red-500 mr-3 mt-1" />
                  <div>
                    <strong>Material Cost Volatility:</strong> Keeping estimates accurate and profitable
                  </div>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold mb-6">CRM Solutions</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-500 mr-3 mt-1" />
                  <div>
                    <strong>Automated Lead Distribution:</strong> Instant assignment to sales reps
                  </div>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-500 mr-3 mt-1" />
                  <div>
                    <strong>Insurance Integration:</strong> Track claims status and documentation
                  </div>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-500 mr-3 mt-1" />
                  <div>
                    <strong>Mobile Access:</strong> Update jobs and access customer info from the roof
                  </div>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-500 mr-3 mt-1" />
                  <div>
                    <strong>Dynamic Pricing:</strong> Real-time material cost updates in estimates
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ROI Stats */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">CRM ROI for Roofing Companies</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold text-prometheus-orange mb-2">47%</div>
              <p className="text-gray-600">Increase in Lead Conversion</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-prometheus-orange mb-2">2.5x</div>
              <p className="text-gray-600">Faster Quote Turnaround</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-prometheus-orange mb-2">35%</div>
              <p className="text-gray-600">Reduction in Admin Time</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-prometheus-orange mb-2">60%</div>
              <p className="text-gray-600">Improvement in Customer Satisfaction</p>
            </div>
          </div>
        </div>
      </section>

      {/* CRM Options */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">Recommended CRM Platforms for Roofers</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-4">HubSpot for Roofers</h3>
              <p className="text-gray-600 mb-4">
                Best for growing roofing companies wanting integrated marketing and sales tools.
              </p>
              <ul className="space-y-2 text-sm mb-6">
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  <span>Free tier available</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  <span>Easy to implement</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  <span>Great for digital marketing</span>
                </li>
              </ul>
              <Link to="/salesforce-vs-hubspot">
                <Button variant="outline" className="w-full">Compare Options</Button>
              </Link>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-4">JobNimbus</h3>
              <p className="text-gray-600 mb-4">
                Purpose-built for roofing contractors with industry-specific features.
              </p>
              <ul className="space-y-2 text-sm mb-6">
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  <span>Roofing templates</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  <span>Material ordering</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  <span>Insurance workflows</span>
                </li>
              </ul>
              <Link to="/services/crm-implementation">
                <Button variant="outline" className="w-full">Learn More</Button>
              </Link>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-4">Salesforce for Enterprise</h3>
              <p className="text-gray-600 mb-4">
                Ideal for large roofing companies or franchises needing advanced customization.
              </p>
              <ul className="space-y-2 text-sm mb-6">
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  <span>Unlimited customization</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  <span>Multi-location support</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  <span>Advanced analytics</span>
                </li>
              </ul>
              <Link to="/salesforce-vs-hubspot">
                <Button variant="outline" className="w-full">Compare Options</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Implementation Process */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">Roofing CRM Implementation Process</h2>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-prometheus-orange text-white rounded-full w-10 h-10 flex items-center justify-center mr-4 flex-shrink-0">1</div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Business Process Analysis</h3>
                  <p className="text-gray-600">
                    Map your current sales process from lead to completion, identifying bottlenecks and opportunities.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-prometheus-orange text-white rounded-full w-10 h-10 flex items-center justify-center mr-4 flex-shrink-0">2</div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Platform Selection & Customization</h3>
                  <p className="text-gray-600">
                    Choose the right CRM and customize it for roofing workflows, including estimate templates and job stages.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-prometheus-orange text-white rounded-full w-10 h-10 flex items-center justify-center mr-4 flex-shrink-0">3</div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Data Migration & Integration</h3>
                  <p className="text-gray-600">
                    Import existing customer data and integrate with accounting, material suppliers, and other tools.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-prometheus-orange text-white rounded-full w-10 h-10 flex items-center justify-center mr-4 flex-shrink-0">4</div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Team Training & Adoption</h3>
                  <p className="text-gray-600">
                    Train sales reps, estimators, and crews on using the CRM effectively in the field.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-prometheus-orange text-white rounded-full w-10 h-10 flex items-center justify-center mr-4 flex-shrink-0">5</div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Launch & Optimization</h3>
                  <p className="text-gray-600">
                    Go live with ongoing support and continuous optimization based on performance metrics.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-prometheus-darkblue text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Roofing Business?</h2>
          <p className="text-xl mb-8">
            Get expert guidance on selecting and implementing the perfect CRM for your roofing company. 
            Our consultants specialize in helping contractors streamline operations and grow revenue.
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/book-audit">
              <Button size="lg" className="bg-prometheus-orange hover:bg-orange-600">
                Schedule Free CRM Consultation
              </Button>
            </Link>
            <Link to="/services/crm-implementation">
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-prometheus-darkblue">
                View Implementation Services
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default CRMForRoofersPage; 