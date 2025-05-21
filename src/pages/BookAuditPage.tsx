import React from "react";
import SEO from "@/components/SEO";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart, CheckCircle, Clock, MessageSquare, Users } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/layout/Footer";
import SuccessStoriesSection from "@/components/common/SuccessStoriesSection";

const BookAuditPage = () => {
  return (
    <>
      <SEO 
        title="Book a Growth Audit - Expert Review of Your Marketing Stack"
        description="Get a comprehensive audit of your marketing technology and strategy with actionable recommendations from our experts."
        canonical="/book-audit"
        ogType="website"
        schemaMarkup={{
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Growth Audit - Prometheus Agency",
          "description": "Comprehensive audit of marketing technology and strategy with actionable recommendations from our experts.",
          "provider": {
            "@type": "Organization",
            "name": "Prometheus Agency",
            "url": "https://prometheusagency.co",
          },
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          }
        }}
      />
      
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-purple-50 to-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Book Your Free Growth Audit
              </h1>
              <p className="text-lg text-gray-700 mb-6">
                Get a comprehensive review of your current marketing technology stack, 
                growth strategy, and AI readiness with actionable recommendations from our experts.
              </p>
              <div className="space-y-4 mb-8">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <p>{benefit}</p>
                  </div>
                ))}
              </div>
              <Button
                size="lg"
                className="group"
                onClick={() => {
                  const formSection = document.getElementById('booking-form');
                  formSection?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Book Your Free Audit Now
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
            
            <div className="lg:pl-12">
              <Card className="border-2 border-gray-200 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Strategy session" 
                  className="w-full h-64 object-cover"
                />
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 text-gray-500 mr-2" />
                      <span className="text-gray-600">45-60 minutes</span>
                    </div>
                    <div className="text-lg font-bold text-green-600">Free</div>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-4">What to expect:</h3>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start">
                      <MessageSquare className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                      <span>Deep-dive discussion about your business goals and challenges</span>
                    </li>
                    <li className="flex items-start">
                      <BarChart className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                      <span>Analysis of your current marketing stack and performance</span>
                    </li>
                    <li className="flex items-start">
                      <Users className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                      <span>Strategic recommendations from our expert team</span>
                    </li>
                  </ul>
                  
                  <div className="bg-gray-50 p-4 rounded-md mb-4">
                    <p className="text-sm text-gray-600 italic">
                      "The growth audit provided incredible value and actionable insights that helped us refocus our strategy immediately."
                    </p>
                    <p className="text-sm font-medium mt-2">
                      — Sarah Johnson, CMO at TechGrowth Inc.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
      
      {/* Process Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How the Process Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {process.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">{index + 1}</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Case Studies */}
      <SuccessStoriesSection caseStudies={caseStudies} />
      
      {/* Booking Form */}
      <section id="booking-form" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-4">Schedule Your Growth Audit</h2>
            <p className="text-center text-gray-700 mb-8">
              Fill out the form below and one of our experts will reach out to schedule your free consultation.
            </p>
            
            <Card className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                    First Name*
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name*
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address*
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                  Company Name*
                </label>
                <input
                  type="text"
                  id="company"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">
                  Website URL
                </label>
                <input
                  type="url"
                  id="website"
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="challenges" className="block text-sm font-medium text-gray-700 mb-1">
                  What are your primary challenges or goals?
                </label>
                <textarea
                  id="challenges"
                  rows={4}
                  className="w-full p-2 border border-gray-300 rounded-md"
                ></textarea>
              </div>
              
              <div className="flex justify-center">
                <Button size="lg" className="px-8">
                  Submit Request
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>
      
      <Footer />
    </>
  );
};

// Data for benefits section
const benefits = [
  "Identify gaps and opportunities in your current marketing technology stack",
  "Get expert insights on how to leverage AI for your specific business needs",
  "Receive actionable recommendations for improving conversion rates and ROI",
  "Learn how to better align your marketing and sales processes",
  "Understand competitive benchmarks for your industry"
];

// Data for process section
const process = [
  {
    title: "Book Your Session",
    description: "Schedule a convenient time for your 45-60 minute consultation with one of our strategy experts."
  },
  {
    title: "Discovery Call",
    description: "We'll discuss your business goals, challenges, and current marketing technology implementation."
  },
  {
    title: "Recommendations Report",
    description: "Receive a detailed report with actionable insights and a strategic roadmap tailored to your business."
  }
];

// Data for case studies
const caseStudies = [
  {
    title: "SaaS Platform Increases Lead Quality by 63%",
    description: "After implementing our strategic recommendations for their marketing tech stack and content operations.",
    industry: "SaaS",
    result: "+63% Lead Quality",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Manufacturing Company Boosts Conversion Rate",
    description: "By restructuring their data spine and implementing AI-powered personalization across their customer journey.",
    industry: "Manufacturing",
    result: "+42% Conversion Rate",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "E-commerce Brand Reduces CAC by 28%",
    description: "Through improved funnel intelligence and automation of key customer journey touchpoints.",
    industry: "E-commerce",
    result: "-28% Customer Acquisition Cost",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  }
];

export default BookAuditPage;
