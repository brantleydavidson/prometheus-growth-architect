
import React from "react";
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/layout/Footer";
import CTABanner from "@/components/common/CTABanner";
import SEO from "@/components/SEO";
import { getServicePageSchema, getBreadcrumbSchema } from "@/utils/schema";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUp, BarChart2, Clock, Target, Users } from "lucide-react";
import TestimonialCard from "@/components/common/TestimonialCard";

const ConsultingPage = () => {
  // Generate structured data for SEO
  const serviceSchema = getServicePageSchema(
    "GTM Consulting Services",
    "Strategic go-to-market consulting to accelerate growth, shorten sales cycles and improve conversion rates.",
    "/services/consulting-gtm",
    "Go-to-Market Consulting" // Added the required serviceType parameter
  );
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Services", url: "/services" },
    { name: "GTM Consulting", url: "/services/consulting-gtm" },
  ]);

  // Combine schemas
  const combinedSchema = [serviceSchema, breadcrumbSchema];

  const consultingServices = [
    {
      icon: <Target className="text-prometheus-navy" size={32} />,
      title: "GTM Strategy Development",
      description: "Comprehensive go-to-market strategy to position your products effectively and reach ideal customers efficiently."
    },
    {
      icon: <Users className="text-prometheus-navy" size={32} />,
      title: "Buyer Journey Mapping",
      description: "Detailed mapping of customer touchpoints to optimize experiences and remove friction from the buying process."
    },
    {
      icon: <BarChart2 className="text-prometheus-navy" size={32} />,
      title: "Growth Analytics",
      description: "Data-driven insights and reporting frameworks to measure performance and guide strategic decisions."
    },
    {
      icon: <Clock className="text-prometheus-navy" size={32} />,
      title: "Sales Cycle Optimization",
      description: "Strategic process improvements that shorten sales cycles and increase conversion rates at each stage."
    },
    {
      icon: <ArrowUp className="text-prometheus-navy" size={32} />,
      title: "Revenue Acceleration",
      description: "Tactics and strategies to boost existing revenue streams and identify new growth opportunities."
    }
  ];

  const testimonials = [
    {
      quote: "The Prometheus team delivered a GTM strategy that helped us launch our new product line with tremendous success. Their insights were invaluable.",
      author: "Jennifer Martinez",
      company: "InnoTech Solutions",
      rating: 5,
      categories: ["B2B", "Product Launch"]
    },
    {
      quote: "Their consulting approach is refreshingly practical. No fluff, just actionable strategies that have directly contributed to our 45% YoY growth.",
      author: "Michael Chen",
      company: "GrowthForce Inc.",
      rating: 5,
      categories: ["DTC", "Growth Strategy"]
    },
    {
      quote: "Prometheus helped us completely rethink our customer journey, resulting in a 32% increase in conversion rates across the board.",
      author: "Sarah Williams",
      company: "NexGen Commerce",
      rating: 5,
      categories: ["B2B", "Customer Journey"]
    }
  ];

  return (
    <>
      <SEO 
        title="GTM Consulting Services | Prometheus Agency"
        description="Strategic go-to-market consulting to accelerate growth, shorten sales cycles and improve conversion rates."
        canonical="/services/consulting-gtm"
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
                  Strategic GTM <span className="text-prometheus-navy">Consulting</span>
                </h1>
                <p className="text-lg text-prometheus-gray mb-8 max-w-lg">
                  Expert guidance to refine your go-to-market strategy, optimize your customer journey,
                  and accelerate revenue growth through proven methodologies.
                </p>
                
                <div className="bg-prometheus-navy/10 border border-prometheus-navy/20 rounded-lg p-6 mb-8">
                  <h3 className="text-xl font-medium text-prometheus-navy mb-3">
                    Our Consulting Approach
                  </h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-prometheus-navy font-medium">✓</span>
                      <span>Data-driven analysis of your current GTM effectiveness</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-prometheus-navy font-medium">✓</span>
                      <span>Collaborative strategy development with measurable outcomes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-prometheus-navy font-medium">✓</span>
                      <span>Practical implementation roadmaps with clear ownership</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-prometheus-navy font-medium">✓</span>
                      <span>Ongoing optimization based on real-world performance</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="relative">
                <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden shadow-lg">
                  <img 
                    src="https://images.unsplash.com/photo-1531973576160-7125cd663d86" 
                    alt="Strategic consulting session with business professionals" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Services Section */}
        <section className="py-20">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-semibold text-prometheus-navy mb-4">
                Our Consulting Services
              </h2>
              <p className="text-lg text-prometheus-gray max-w-2xl mx-auto">
                Strategic guidance to help you navigate complex growth challenges and seize market opportunities.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {consultingServices.map((service, index) => (
                <Card key={index} className="border border-gray-100 hover:border-prometheus-navy transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="mb-4">
                      {service.icon}
                    </div>
                    <h3 className="text-xl font-medium text-prometheus-navy mb-2">
                      {service.title}
                    </h3>
                    <p className="text-prometheus-gray">
                      {service.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        {/* Process Section */}
        <section className="py-16 bg-gray-50">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-semibold text-prometheus-navy mb-4">
                Our Consulting Process
              </h2>
              <p className="text-lg text-prometheus-gray max-w-2xl mx-auto">
                A proven methodology to deliver impactful go-to-market strategies and measurable results.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center relative">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-prometheus-navy text-white w-8 h-8 rounded-full flex items-center justify-center font-semibold">1</div>
                <h3 className="text-xl font-medium text-prometheus-navy mt-4 mb-3">Discovery</h3>
                <p className="text-prometheus-gray">Comprehensive assessment of your current GTM strategy, market position, and growth challenges.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center relative">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-prometheus-navy text-white w-8 h-8 rounded-full flex items-center justify-center font-semibold">2</div>
                <h3 className="text-xl font-medium text-prometheus-navy mt-4 mb-3">Strategy</h3>
                <p className="text-prometheus-gray">Collaborative development of actionable GTM frameworks and growth initiatives.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center relative">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-prometheus-navy text-white w-8 h-8 rounded-full flex items-center justify-center font-semibold">3</div>
                <h3 className="text-xl font-medium text-prometheus-navy mt-4 mb-3">Implementation</h3>
                <p className="text-prometheus-gray">Structured rollout of strategic initiatives with clear ownership and accountability.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center relative">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-prometheus-navy text-white w-8 h-8 rounded-full flex items-center justify-center font-semibold">4</div>
                <h3 className="text-xl font-medium text-prometheus-navy mt-4 mb-3">Optimization</h3>
                <p className="text-prometheus-gray">Ongoing measurement, analysis, and refinement to maximize performance and ROI.</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Testimonials Section */}
        <section className="py-20">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-semibold text-prometheus-navy mb-4">
                Client Success Stories
              </h2>
              <p className="text-lg text-prometheus-gray max-w-2xl mx-auto">
                See how our consulting services have helped businesses like yours achieve meaningful growth.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => (
                <TestimonialCard 
                  key={index}
                  quote={testimonial.quote}
                  author={testimonial.author}
                  company={testimonial.company}
                  rating={testimonial.rating}
                  categories={testimonial.categories}
                />
              ))}
            </div>
          </div>
        </section>
        
        <CTABanner
          title="Ready to Transform Your GTM Strategy?"
          description="Book a complimentary Growth Audit to discuss how our consulting services can help you achieve your business objectives."
          buttonText="Book Your Growth Audit"
          buttonLink="/book-audit"
          color="navy"
        />
      </main>
      <Footer />
    </>
  );
};

export default ConsultingPage;
