
import React from "react";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Calendar, Clock, Share2, Tag, User } from "lucide-react";
import CTABanner from "@/components/common/CTABanner";
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/layout/Footer";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

// Sample blog data - in a real implementation, this would come from a CMS or API
const blogData = {
  title: "CRM Consulting Services: Enhancing Business Growth in Conway, AR",
  excerpt: "Discover how our CRM consulting services are helping Conway businesses streamline customer relationships, increase sales efficiency, and drive sustainable growth.",
  category: "CRM Implementation",
  date: "May 13, 2025",
  readTime: "8 min read",
  author: "Michael Reynolds",
  authorTitle: "CRM Strategy Lead",
  authorImage: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
  image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
  tags: ["CRM Implementation", "Customer Relationship", "Sales Automation", "Conway AR", "Business Growth"],
  relatedPosts: [
    {
      id: 1,
      title: "5 Steps to Transform Your B2B Marketing with AI",
      slug: "#"
    },
    {
      id: 2,
      title: "The Future of Content Operations: AI-Driven Content Creation",
      slug: "#"
    },
    {
      id: 3,
      title: "Building a Resilient Data Spine for Your Organization",
      slug: "#"
    }
  ]
};

const CRMConsultingPage = () => {
  return (
    <>
      <SEO 
        title="CRM Consulting Services: Enhancing Business Growth in Conway, AR"
        description="Discover how our CRM consulting services are helping Conway businesses streamline customer relationships, increase sales efficiency, and drive sustainable growth."
        canonical="/insights/crm-consulting-services-conway-ar"
        ogType="article"
        ogImage="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
        schemaMarkup={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "headline": "CRM Consulting Services: Enhancing Business Growth in Conway, AR",
          "description": "Discover how our CRM consulting services are helping Conway businesses streamline customer relationships, increase sales efficiency, and drive sustainable growth.",
          "image": "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
          "datePublished": "2025-05-13",
          "author": {
            "@type": "Person",
            "name": "Michael Reynolds"
          },
          "publisher": {
            "@type": "Organization",
            "name": "Prometheus Agency",
            "logo": {
              "@type": "ImageObject",
              "url": "https://prometheusagency.co/logo.png"
            }
          },
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": "https://prometheusagency.co/insights/crm-consulting-services-conway-ar"
          }
        }}
      />
      
      <Navbar />
      
      {/* Breadcrumb + Back link */}
      <section className="bg-white py-4 border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center">
            <Link to="/insights" className="flex items-center text-prometheus-navy hover:text-prometheus-orange transition-colors">
              <ArrowLeft className="h-4 w-4 mr-1" />
              <span>Back to Insights</span>
            </Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-600">{blogData.category}</span>
          </div>
        </div>
      </section>
      
      {/* Blog Header */}
      <header className="bg-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center mb-4 gap-2">
              <Tag className="h-4 w-4 text-primary" />
              <Link to={`/insights?category=${encodeURIComponent(blogData.category)}`}>
                <Badge variant="secondary" className="hover:bg-secondary/80 cursor-pointer">
                  {blogData.category}
                </Badge>
              </Link>
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-prometheus-navy">
              {blogData.title}
            </h1>
            
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8 text-gray-600">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{blogData.date}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{blogData.readTime}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>{blogData.author}</span>
              </div>
            </div>
          </div>
        </div>
      </header>
      
      {/* Featured Image */}
      <div className="bg-white pb-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <AspectRatio ratio={16/9} className="overflow-hidden rounded-lg shadow-md">
              <img
                src={blogData.image}
                alt="CRM Consulting Services"
                className="object-cover w-full h-full"
              />
            </AspectRatio>
          </div>
        </div>
      </div>
      
      {/* Blog Content */}
      <section className="bg-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Main Content */}
            <div className="lg:w-2/3">
              <article className="prose prose-lg max-w-3xl mx-auto">
                <p className="lead">
                  In today's competitive business landscape, Conway businesses are seeking new ways to streamline operations, 
                  enhance customer relationships, and drive sustainable growth. CRM (Customer Relationship Management) 
                  systems have emerged as a powerful solution for businesses looking to achieve these goals.
                </p>
                
                <h2>The Power of Effective CRM Implementation</h2>
                <p>
                  A well-implemented CRM system goes beyond simple contact management. It transforms how businesses 
                  interact with customers, manage sales processes, and make strategic decisions. Our Conway-based 
                  clients have experienced significant improvements in customer retention, sales efficiency, and 
                  team collaboration after implementing tailored CRM solutions.
                </p>
                
                <h3>Key Benefits for Conway Businesses</h3>
                <ul>
                  <li><strong>Centralized Customer Data:</strong> Maintain a complete view of customer interactions and history</li>
                  <li><strong>Streamlined Sales Processes:</strong> Automate repetitive tasks and focus on high-value activities</li>
                  <li><strong>Enhanced Customer Service:</strong> Provide personalized and timely support</li>
                  <li><strong>Data-Driven Decision Making:</strong> Gain actionable insights from comprehensive reporting</li>
                  <li><strong>Improved Team Collaboration:</strong> Ensure seamless communication across departments</li>
                </ul>
                
                <h2>Our CRM Consulting Approach</h2>
                <p>
                  At Prometheus Agency, we understand that every business has unique needs and challenges. Our 
                  consulting approach is designed to deliver tailored CRM solutions that align with your specific 
                  business goals and processes. We follow a proven methodology:
                </p>
                
                <ol>
                  <li><strong>Discovery and Assessment:</strong> We analyze your current processes, pain points, and goals</li>
                  <li><strong>Strategy Development:</strong> We create a customized CRM implementation plan</li>
                  <li><strong>System Configuration:</strong> We set up and customize your CRM to match your requirements</li>
                  <li><strong>Data Migration:</strong> We ensure a smooth transition of your existing data</li>
                  <li><strong>Training and Support:</strong> We empower your team with the knowledge to maximize CRM benefits</li>
                  <li><strong>Continuous Optimization:</strong> We provide ongoing support to adapt as your business evolves</li>
                </ol>
                
                <h2>Case Study: Conway Manufacturing Success Story</h2>
                <p>
                  A mid-sized manufacturing company in Conway was struggling with disjointed customer 
                  communication, inefficient sales processes, and limited visibility into their sales pipeline. 
                  After implementing our custom CRM solution:
                </p>
                
                <ul>
                  <li>Sales cycle time decreased by 27%</li>
                  <li>Customer retention improved by 18%</li>
                  <li>Team productivity increased by 32%</li>
                  <li>Lead conversion rate grew by 41%</li>
                </ul>
                
                <blockquote>
                  "Prometheus Agency's CRM consulting services transformed how we manage customer relationships. 
                  The tailored solution they implemented has streamlined our processes and given us valuable 
                  insights that drive our business forward."
                  <cite>— Sarah Johnson, Operations Director</cite>
                </blockquote>
                
                <h2>Common CRM Implementation Challenges</h2>
                <p>
                  While CRM systems offer tremendous benefits, implementation can present challenges. Our expertise helps 
                  Conway businesses navigate common pitfalls:
                </p>
                
                <ul>
                  <li><strong>User Adoption:</strong> We employ change management strategies to ensure team buy-in</li>
                  <li><strong>Data Quality:</strong> We establish protocols for maintaining clean, accurate data</li>
                  <li><strong>System Integration:</strong> We ensure seamless connection with your existing tools</li>
                  <li><strong>Process Alignment:</strong> We adapt the CRM to support your unique business processes</li>
                </ul>
                
                <h2>Getting Started with CRM Consulting</h2>
                <p>
                  Ready to transform your customer relationship management? The journey to a more efficient, 
                  customer-centric business starts with a comprehensive assessment of your current processes 
                  and goals. Our team of experts is ready to guide you through every step of the process.
                </p>
              </article>
              
              {/* Tags Section */}
              <div className="max-w-3xl mx-auto mt-12 pb-8 border-b">
                <div className="flex flex-wrap gap-2">
                  {blogData.tags.map((tag, index) => (
                    <Link key={index} to={`/insights?tag=${encodeURIComponent(tag)}`}>
                      <Badge variant="outline" className="hover:bg-secondary/20 cursor-pointer">
                        {tag}
                      </Badge>
                    </Link>
                  ))}
                </div>
              </div>
              
              {/* Author Section */}
              <div className="max-w-3xl mx-auto py-8 border-b">
                <div className="flex items-center gap-4">
                  <img 
                    src={blogData.authorImage} 
                    alt={blogData.author}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-bold text-lg">{blogData.author}</h3>
                    <p className="text-gray-600">{blogData.authorTitle}</p>
                  </div>
                </div>
              </div>
              
              {/* Share Section */}
              <div className="max-w-3xl mx-auto py-8">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">Share this article</h3>
                  <div className="flex gap-4">
                    <Button size="icon" variant="outline">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 320 512" className="h-4 w-4">
                        <path d="M80 299.3V512H196V299.3h86.5l18-97.8H196V166.9c0-51.7 20.3-71.5 72.7-71.5c16.3 0 29.4 .4 37 1.2V7.9C291.4 4 256.4 0 236.2 0C129.3 0 80 50.5 80 159.4v42.1H14v97.8H80z"/>
                      </svg>
                    </Button>
                    <Button size="icon" variant="outline">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 512 512" className="h-4 w-4">
                        <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"/>
                      </svg>
                    </Button>
                    <Button size="icon" variant="outline">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 448 512" className="h-4 w-4">
                        <path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"/>
                      </svg>
                    </Button>
                    <Button size="icon" variant="outline">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Sidebar */}
            <aside className="lg:w-1/3 space-y-8">
              {/* Related Articles */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-bold text-xl mb-4">Related Articles</h3>
                <div className="space-y-4">
                  {blogData.relatedPosts.map((post) => (
                    <div key={post.id} className="border-b border-gray-200 pb-4 last:border-0 last:pb-0">
                      <Link to={post.slug} className="font-medium hover:text-prometheus-orange transition-colors">
                        {post.title}
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Table of Contents */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-bold text-xl mb-4">Table of Contents</h3>
                <nav className="space-y-2 text-prometheus-navy">
                  <a href="#" className="block hover:text-prometheus-orange transition-colors">The Power of Effective CRM Implementation</a>
                  <a href="#" className="block hover:text-prometheus-orange transition-colors">Key Benefits for Conway Businesses</a>
                  <a href="#" className="block hover:text-prometheus-orange transition-colors">Our CRM Consulting Approach</a>
                  <a href="#" className="block hover:text-prometheus-orange transition-colors">Case Study: Conway Manufacturing Success Story</a>
                  <a href="#" className="block hover:text-prometheus-orange transition-colors">Common CRM Implementation Challenges</a>
                  <a href="#" className="block hover:text-prometheus-orange transition-colors">Getting Started with CRM Consulting</a>
                </nav>
              </div>
              
              {/* CTA Box */}
              <div className="bg-prometheus-navy rounded-lg p-6 text-white">
                <h3 className="font-bold text-xl mb-3">Ready to optimize your CRM?</h3>
                <p className="mb-4">Book a free strategy call with our CRM experts to discover how we can help transform your customer relationships.</p>
                <Link to="/book-audit">
                  <Button className="w-full bg-prometheus-orange hover:bg-prometheus-orange/90">
                    Book a Strategy Call
                  </Button>
                </Link>
              </div>
              
              {/* FAQ Section */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-bold text-xl mb-4">Frequently Asked Questions</h3>
                <div className="space-y-4">
                  <Collapsible className="border-b border-gray-200 pb-2">
                    <CollapsibleTrigger className="flex items-center justify-between w-full font-medium text-left">
                      <span>How long does CRM implementation take?</span>
                      <span>+</span>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="pt-2 text-gray-600">
                      Implementation timelines vary based on your business complexity, but typically range from 2-12 weeks. Our phased approach ensures you see value at each stage.
                    </CollapsibleContent>
                  </Collapsible>
                  
                  <Collapsible className="border-b border-gray-200 pb-2">
                    <CollapsibleTrigger className="flex items-center justify-between w-full font-medium text-left">
                      <span>Which CRM platforms do you work with?</span>
                      <span>+</span>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="pt-2 text-gray-600">
                      We have expertise across major platforms including Salesforce, HubSpot, Microsoft Dynamics, and Zoho CRM. We help you select the best fit for your needs.
                    </CollapsibleContent>
                  </Collapsible>
                  
                  <Collapsible className="border-b border-gray-200 pb-2">
                    <CollapsibleTrigger className="flex items-center justify-between w-full font-medium text-left">
                      <span>How do you ensure successful adoption?</span>
                      <span>+</span>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="pt-2 text-gray-600">
                      Our adoption strategy includes customized training, change management support, and ongoing guidance to ensure your team embraces and maximizes the CRM.
                    </CollapsibleContent>
                  </Collapsible>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <CTABanner 
        title="Transform Your Business with Expert CRM Consulting"
        description="Book a strategy session with our experts to discuss how we can help implement CRM solutions tailored to your business needs."
        buttonText="Book a Strategy Session"
        buttonLink="/book-audit"
      />
      
      <Footer />
    </>
  );
};

export default CRMConsultingPage;
