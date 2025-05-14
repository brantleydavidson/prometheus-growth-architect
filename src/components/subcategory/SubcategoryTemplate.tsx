
import React from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/layout/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface SubcategoryProps {
  title: string;
  subtitle: string;
  description: string;
  benefits: string[];
  challenges: string[];
  solution: string;
  ctaText?: string;
  ctaLink?: string;
  industry: 'b2b' | 'dtc';
  seoTitle: string;
  seoDescription: string;
  imagePath?: string;
  testimonial?: {
    quote: string;
    author: string;
    position: string;
    company: string;
  };
}

const SubcategoryTemplate: React.FC<SubcategoryProps> = ({
  title,
  subtitle,
  description,
  benefits,
  challenges,
  solution,
  ctaText = "Book a Free Consultation",
  ctaLink = "/book-audit",
  industry,
  seoTitle,
  seoDescription,
  imagePath,
  testimonial,
}) => {
  return (
    <>
      <SEO
        title={seoTitle}
        description={seoDescription}
        openGraph={{
          title: seoTitle,
          description: seoDescription,
          type: "website",
        }}
      />
      
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-purple-50 to-white py-16 md:py-24">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="text-left">
              <div className="mb-4">
                <Link 
                  to={industry === 'b2b' ? "/b2b" : "/dtc"} 
                  className="text-sm font-medium text-prometheus-navy/70 hover:text-prometheus-orange flex items-center"
                >
                  <ArrowRight className="mr-2 h-4 w-4 rotate-180" />
                  {industry === 'b2b' ? "Back to B2B Solutions" : "Back to DTC Solutions"}
                </Link>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-prometheus-navy mb-4 text-left">
                {title}
              </h1>
              <p className="text-xl md:text-2xl text-prometheus-gray mb-8 text-left">
                {subtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg">
                  <Link to={ctaLink}>{ctaText}</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/services">Explore Services</Link>
                </Button>
              </div>
            </div>
            
            <div className="rounded-lg overflow-hidden shadow-lg">
              {imagePath ? (
                <AspectRatio ratio={16/9} className="bg-muted">
                  <img 
                    src={imagePath} 
                    alt={title} 
                    className="object-cover w-full h-full" 
                  />
                </AspectRatio>
              ) : (
                <AspectRatio ratio={16/9} className="bg-prometheus-navy/10 flex items-center justify-center">
                  <div className="text-center p-4">
                    <p className="text-prometheus-navy text-lg">{title}</p>
                  </div>
                </AspectRatio>
              )}
            </div>
          </div>
        </div>
      </section>
      
      {/* Main Content Section */}
      <section className="py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8">
              <h2 className="text-3xl font-bold text-prometheus-navy mb-6 text-left">
                The Challenge
              </h2>
              <p className="text-lg text-prometheus-gray mb-8 text-left">
                {description}
              </p>
              
              <div className="mb-12">
                <h3 className="text-xl font-semibold mb-4 text-left">Common Challenges:</h3>
                <ul className="space-y-4">
                  {challenges.map((challenge, index) => (
                    <li key={index} className="flex items-start">
                      <div className="mr-4 mt-1 text-prometheus-orange">
                        <CheckCircle size={20} />
                      </div>
                      <span className="text-prometheus-gray">{challenge}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <h2 className="text-3xl font-bold text-prometheus-navy mb-6 text-left">
                Our Solution
              </h2>
              <p className="text-lg text-prometheus-gray mb-8 text-left">
                {solution}
              </p>
              
              <div className="mb-12">
                <h3 className="text-xl font-semibold mb-4 text-left">Key Benefits:</h3>
                <ul className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <div className="mr-4 mt-1 text-prometheus-orange">
                        <CheckCircle size={20} />
                      </div>
                      <span className="text-prometheus-gray">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="lg:col-span-4">
              <div className="bg-prometheus-navy/5 p-8 rounded-lg sticky top-24">
                <h3 className="text-xl font-bold text-prometheus-navy mb-4 text-left">
                  Ready to Transform Your Business?
                </h3>
                <p className="text-prometheus-gray mb-6 text-left">
                  Book a free consultation with our experts to discuss your specific needs and learn how we can help you achieve your goals.
                </p>
                <Button asChild className="w-full">
                  <Link to={ctaLink}>{ctaText}</Link>
                </Button>
                
                {testimonial && (
                  <div className="mt-8 p-6 bg-white rounded-lg shadow">
                    <p className="italic text-prometheus-gray mb-4">"{testimonial.quote}"</p>
                    <div>
                      <p className="font-semibold text-prometheus-navy">{testimonial.author}</p>
                      <p className="text-sm text-prometheus-gray">{testimonial.position}, {testimonial.company}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Banner */}
      <section className="bg-prometheus-navy py-16">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Elevate Your {title} Strategy?
          </h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Let's work together to overcome your challenges and drive sustainable growth for your business.
          </p>
          <Button asChild size="lg" variant="default" className="bg-prometheus-orange hover:bg-prometheus-orange/90">
            <Link to={ctaLink}>{ctaText}</Link>
          </Button>
        </div>
      </section>
      
      <Footer />
    </>
  );
};

export default SubcategoryTemplate;
