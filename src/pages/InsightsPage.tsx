import React from "react";
import SEO from "@/components/SEO";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, Tag } from "lucide-react";
import CTABanner from "@/components/common/CTABanner";
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/layout/Footer";

// Sample blog/insights data - in a real implementation, this would come from a CMS or API
const insightsData = [
  {
    id: 1,
    title: "The AI Quotient: Measuring Your Organization's AI Readiness",
    excerpt: "Learn how to assess and improve your organization's readiness for AI implementation with our comprehensive AI Quotient framework.",
    category: "AI Implementation",
    date: "May 10, 2025",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    featured: true,
    slug: "/ai-quotient"
  },
  {
    id: 2,
    title: "5 Steps to Transform Your B2B Marketing with AI",
    excerpt: "Discover practical ways to integrate AI into your B2B marketing strategy to increase efficiency and drive better results.",
    category: "B2B Strategy",
    date: "May 8, 2025",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    featured: false,
    slug: "#"
  },
  {
    id: 3,
    title: "Building a Resilient Data Spine for Your Organization",
    excerpt: "A strong data foundation is critical for AI success. Learn how to build a resilient data spine that powers meaningful insights.",
    category: "Data Strategy",
    date: "May 5, 2025",
    readTime: "10 min read",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    featured: false,
    slug: "#"
  },
  {
    id: 4,
    title: "Automating Customer Journey Touchpoints: A Practical Guide",
    excerpt: "Step-by-step guidance on identifying and automating key customer touchpoints to improve experience and conversion rates.",
    category: "Automation",
    date: "May 2, 2025",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    featured: false,
    slug: "#"
  },
  {
    id: 5,
    title: "The Future of Content Operations: AI-Driven Content Creation",
    excerpt: "Explore how AI is transforming content operations and how businesses can leverage these tools for more effective content strategies.",
    category: "Content Strategy",
    date: "April 28, 2025",
    readTime: "9 min read",
    image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    featured: false,
    slug: "#"
  }
];

// Categories for filter
const categories = [
  "All Content",
  "AI Implementation",
  "B2B Strategy",
  "Data Strategy",
  "Automation",
  "Content Strategy",
  "DTC Marketing"
];

const InsightsPage = () => {
  const [selectedCategory, setSelectedCategory] = React.useState("All Content");
  
  // Filter insights based on selected category
  const filteredInsights = selectedCategory === "All Content" 
    ? insightsData 
    : insightsData.filter(insight => insight.category === selectedCategory);
  
  // Get featured insight
  const featuredInsight = insightsData.find(insight => insight.featured);
  
  return (
    <>
      <SEO 
        title="Insights & Playbooks - AI Strategy and Implementation Resources"
        description="Explore our collection of insights, guides, and case studies on AI implementation, B2B growth strategies, and marketing automation."
        canonical="/insights"
        ogType="website"
        schemaMarkup={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "Insights & Playbooks - Prometheus Agency",
          "description": "Expert insights and practical resources on AI implementation, B2B growth strategies, and marketing automation.",
          "url": "https://prometheusagency.co/insights",
          "publisher": {
            "@type": "Organization",
            "name": "Prometheus Agency",
            "logo": {
              "@type": "ImageObject",
              "url": "https://prometheusagency.co/logo.png"
            }
          }
        }}
      />
      
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-purple-50 to-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Insights & Playbooks
            </h1>
            <p className="text-lg text-gray-700 mb-8">
              Practical resources, guides, and expert perspectives to help you navigate 
              the complexities of AI implementation and growth marketing.
            </p>
            <Link to="/ai-quotient">
              <Button size="lg" className="group">
                Take the AI Quotient Assessment
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Featured Article */}
      {featuredInsight && (
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8">Featured Insight</h2>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
              <div className="lg:col-span-3">
                <img 
                  src={featuredInsight.image} 
                  alt={featuredInsight.title}
                  className="w-full h-80 object-cover rounded-lg"
                />
              </div>
              <div className="lg:col-span-2">
                <div className="flex items-center gap-2 mb-3">
                  <Tag className="h-4 w-4 text-primary" />
                  <span className="text-sm text-primary font-medium">{featuredInsight.category}</span>
                </div>
                <h3 className="text-2xl font-bold mb-3">{featuredInsight.title}</h3>
                <p className="text-gray-700 mb-4">{featuredInsight.excerpt}</p>
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-5">
                  <span>{featuredInsight.date}</span>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{featuredInsight.readTime}</span>
                  </div>
                </div>
                <Link to={featuredInsight.slug}>
                  <Button>
                    Read More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}
      
      {/* Category Filter */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category, index) => (
              <Button
                key={index}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className="mb-2"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>
      
      {/* All Insights */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8">All Insights</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredInsights.map(insight => (
              <Card key={insight.id} className="h-full flex flex-col">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={insight.image} 
                    alt={insight.title}
                    className="w-full h-full object-cover transition-transform hover:scale-105"
                  />
                </div>
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2 mb-2">
                    <Tag className="h-4 w-4 text-primary" />
                    <span className="text-sm text-primary font-medium">{insight.category}</span>
                  </div>
                  <CardTitle className="text-xl">{insight.title}</CardTitle>
                </CardHeader>
                <CardContent className="pb-2 flex-grow">
                  <CardDescription className="text-gray-700">
                    {insight.excerpt}
                  </CardDescription>
                </CardContent>
                <CardFooter className="pt-2 flex flex-col items-start">
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-4 w-full">
                    <span>{insight.date}</span>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{insight.readTime}</span>
                    </div>
                  </div>
                  <Link to={insight.slug}>
                    <Button variant="outline" className="group">
                      Read More
                      <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* Newsletter Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
            <p className="text-gray-700 mb-8">
              Get the latest insights, guides, and expert perspectives delivered directly to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 sm:flex-1"
              />
              <Button>Subscribe</Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <CTABanner 
        title="Ready to Transform Your Business with AI?"
        description="Book a strategy session with our experts to discuss how we can help implement AI solutions tailored to your business needs."
        buttonText="Book a Strategy Session"
        buttonLink="/book-audit"
      />
      
      <Footer />
    </>
  );
};

export default InsightsPage;
