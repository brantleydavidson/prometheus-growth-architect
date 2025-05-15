
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import SEO from '@/components/SEO';
import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/layout/Footer';
import CTABanner from '@/components/common/CTABanner';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Clock, Tag, ChevronDown, ChevronUp } from 'lucide-react';
import { toast } from 'sonner';
import { Json } from '@/integrations/supabase/types';

// Define the blog post type with enhanced fields
interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  author: string;
  author_title?: string;
  author_image?: string;
  coverImage?: string;
  featured_image_alt?: string;
  publishedAt: string;
  read_time?: string;
  category_tags?: string[];
  key_takeaways?: string;
  faqs?: Array<{question: string, answer: string}>;
  related_posts?: Array<{
    title: string;
    slug: string;
    excerpt: string;
    cover_image?: string;
  }>;
  table_of_contents?: Array<{
    id: string;
    text: string;
    level: number;
  }>;
  seo: {
    title: string;
    description: string;
    canonical?: string;
    ogType: string;
    ogImage?: string;
  };
}

const DynamicBlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        if (!slug) {
          setError('No blog post specified');
          return;
        }
        
        console.log(`Fetching blog post with slug: ${slug}`);
        
        const { data, error: fetchError } = await supabase
          .from('cms_blog_posts')
          .select('*')
          .eq('slug', slug)
          .single();
        
        if (fetchError) {
          console.error('Error fetching blog post:', fetchError);
          
          if (fetchError.code === 'PGRST116') {
            // This is a "not found" error from PostgREST
            setError('Blog post not found');
            toast.error('Blog post not found');
          } else {
            setError(`Failed to load blog post: ${fetchError.message}`);
            toast.error('Failed to load blog post');
          }
          return;
        }
        
        if (!data) {
          setError('Blog post not found');
          toast.error('Blog post not found');
          return;
        }
        
        console.log('Blog post data retrieved:', data);
        
        // Parse the SEO data properly
        let seoData: Record<string, any> = {};
        
        try {
          seoData = typeof data.seo === 'string' 
            ? JSON.parse(data.seo) 
            : (data.seo as Record<string, any>) || {};
        } catch (err) {
          console.error('Error parsing SEO data:', err);
          seoData = {};
        }

        // Parse related posts if available
        let relatedPostsData: Array<any> = [];
        try {
          relatedPostsData = typeof data.related_posts === 'string'
            ? JSON.parse(data.related_posts)
            : (data.related_posts as Array<any>) || [];
        } catch (err) {
          console.error('Error parsing related posts:', err);
          relatedPostsData = [];
        }

        // Parse FAQs if available
        let faqsData: Array<{question: string, answer: string}> = [];
        try {
          faqsData = typeof data.faqs === 'string'
            ? JSON.parse(data.faqs)
            : (data.faqs as Array<any>) || [];
        } catch (err) {
          console.error('Error parsing FAQs:', err);
          faqsData = [];
        }

        // Parse table of contents if available
        let tocData: Array<{id: string, text: string, level: number}> = [];
        try {
          tocData = typeof data.table_of_contents === 'string'
            ? JSON.parse(data.table_of_contents)
            : (data.table_of_contents as Array<any>) || [];
        } catch (err) {
          console.error('Error parsing table of contents:', err);
          tocData = [];
        }
        
        // Transform the data to match our BlogPost interface
        const blogPost: BlogPost = {
          id: data.id,
          title: data.title || 'Untitled Post',
          slug: data.slug,
          content: data.content || '',
          excerpt: data.excerpt || '',
          author: data.author || 'Prometheus Agency',
          author_title: data.author_title || 'Consultant',
          author_image: data.author_image,
          coverImage: data.cover_image,
          featured_image_alt: data.featured_image_alt || data.title,
          publishedAt: data.published_at || data.created_at 
            ? new Date(data.published_at || data.created_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })
            : 'Publication date not available',
          read_time: data.read_time || '5 min read',
          category_tags: data.category_tags || [],
          key_takeaways: data.key_takeaways,
          faqs: faqsData,
          related_posts: relatedPostsData,
          table_of_contents: tocData,
          seo: {
            title: seoData?.title || data.title || 'Prometheus Agency Blog',
            description: seoData?.description || data.excerpt || '',
            canonical: seoData?.canonical,
            ogType: seoData?.ogType || 'article',
            ogImage: seoData?.ogImage || data.cover_image
          }
        };
        
        setPost(blogPost);
      } catch (err) {
        console.error('Unexpected error fetching blog post:', err);
        setError('An unexpected error occurred while loading the blog post');
        toast.error('Failed to load blog post');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogPost();
  }, [slug, navigate]);

  // Handle content rendering with basic HTML
  const renderContent = (content: string) => {
    return { __html: content };
  };

  const handleGoBack = () => {
    navigate('/insights');
  };

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  if (isLoading) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto px-4 py-16">
          <Skeleton className="h-12 w-3/4 mx-auto mb-8" />
          <div className="flex justify-center mb-8">
            <Skeleton className="h-[400px] w-full max-w-4xl rounded-lg" />
          </div>
          <div className="max-w-4xl mx-auto">
            {[1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} className="h-6 w-full mb-4" />
            ))}
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (error || !post) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold mb-8">Blog Post Not Found</h1>
          <p className="mb-8">
            {error || "The blog post you're looking for could not be found or has been removed."}
          </p>
          <Button onClick={handleGoBack} variant="outline" className="flex items-center gap-2">
            <ArrowLeft size={16} />
            Back to Insights
          </Button>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <SEO
        title={post.seo.title}
        description={post.seo.description}
        canonical={post.seo.canonical || `/insights/${post.slug}`}
        ogType={post.seo.ogType}
        ogImage={post.seo.ogImage}
        faqSchema={post.faqs}
        author={post.author}
        datePublished={post.publishedAt}
        articleType="Article"
      />
      
      <Navbar />
      
      <main className="bg-white" id="main-content">
        {/* Breadcrumbs */}
        <div className="bg-gray-50 py-4">
          <div className="container mx-auto px-4">
            <nav className="flex text-sm" aria-label="Breadcrumb">
              <ol className="inline-flex items-center space-x-1 md:space-x-3">
                <li className="inline-flex items-center">
                  <Link to="/" className="text-gray-600 hover:text-prometheus-orange">Home</Link>
                </li>
                <li>
                  <div className="flex items-center">
                    <span className="mx-2 text-gray-400">/</span>
                    <Link to="/insights" className="text-gray-600 hover:text-prometheus-orange">Insights</Link>
                  </div>
                </li>
                <li aria-current="page">
                  <div className="flex items-center">
                    <span className="mx-2 text-gray-400">/</span>
                    <span className="text-prometheus-orange">{post.title}</span>
                  </div>
                </li>
              </ol>
            </nav>
          </div>
        </div>
        
        {/* Hero Section */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                {post.title}
              </h1>
              
              <div className="flex flex-wrap items-center text-sm text-gray-600 mb-8">
                <span className="mr-4">{post.publishedAt}</span>
                <span className="mr-4">|</span>
                <span className="mr-4">By {post.author}</span>
                {post.author_title && (
                  <>
                    <span className="mr-4">|</span>
                    <span>{post.author_title}</span>
                  </>
                )}
              </div>
              
              {/* Category tags if available */}
              {post.category_tags && post.category_tags.length > 0 && (
                <div className="flex items-center gap-2 mb-6 flex-wrap">
                  {post.category_tags.map((tag, index) => (
                    <div key={index} className="flex items-center">
                      <Tag className="h-4 w-4 text-primary mr-1" />
                      <span className="text-sm text-primary font-medium">{tag}</span>
                      {index < post.category_tags!.length - 1 && <span className="mx-2">•</span>}
                    </div>
                  ))}
                </div>
              )}
              
              {/* Reading time */}
              {post.read_time && (
                <div className="flex items-center gap-2 mb-6">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-500">{post.read_time}</span>
                </div>
              )}
              
              {post.coverImage && (
                <div className="aspect-video bg-gray-200 mb-8 rounded-lg overflow-hidden">
                  <img 
                    src={post.coverImage} 
                    alt={post.featured_image_alt || post.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80";
                    }}
                  />
                </div>
              )}
              
              {/* Table of Contents */}
              {post.table_of_contents && post.table_of_contents.length > 0 && (
                <div className="my-8 p-6 bg-gray-50 rounded-lg">
                  <h2 className="text-xl font-bold mb-4">Table of Contents</h2>
                  <ul className="space-y-2">
                    {post.table_of_contents.map((item) => (
                      <li 
                        key={item.id} 
                        className={`${
                          item.level === 1 ? 'ml-0' : item.level === 2 ? 'ml-4' : 'ml-8'
                        } hover:text-prometheus-orange cursor-pointer transition-colors`}
                        style={{ marginLeft: `${(item.level - 1) * 1}rem` }}
                        onClick={() => scrollToSection(item.id)}
                      >
                        {item.text}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {/* Main content */}
              <div className="prose prose-lg max-w-none">
                {/* Render excerpt as lead paragraph if available */}
                {post.excerpt && (
                  <p className="lead font-medium text-lg md:text-xl text-gray-800 mb-8">
                    {post.excerpt}
                  </p>
                )}
                
                {/* Render main content */}
                <div dangerouslySetInnerHTML={renderContent(post.content)} />
              </div>
              
              {/* FAQ Section */}
              {post.faqs && post.faqs.length > 0 && (
                <div className="mt-12 border-t border-gray-200 pt-8">
                  <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
                  <div className="space-y-6">
                    {post.faqs.map((faq, index) => (
                      <div key={index} className="bg-gray-50 p-6 rounded-lg">
                        <h3 className="text-xl font-semibold mb-3">{faq.question}</h3>
                        <p className="text-gray-700">{faq.answer}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Key takeaways if available */}
              {post.key_takeaways && (
                <div className="mt-12 bg-blue-50 p-6 rounded-lg">
                  <h2 className="text-xl font-bold mb-4">Key Takeaways</h2>
                  <div className="prose prose-blue">
                    <div dangerouslySetInnerHTML={renderContent(post.key_takeaways)} />
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
        
        {/* Related Articles */}
        {post.related_posts && post.related_posts.length > 0 && (
          <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl font-bold mb-8 text-center">Related Insights</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {post.related_posts.map((relatedPost, index) => (
                  <div key={index} className="bg-white rounded-lg overflow-hidden shadow-sm border hover:shadow-md transition-shadow">
                    <Link to={`/insights/${relatedPost.slug}`}>
                      <img 
                        src={relatedPost.cover_image || "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"} 
                        alt={relatedPost.title} 
                        className="w-full h-48 object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
                        }}
                      />
                      <div className="p-6">
                        <h3 className="text-lg font-semibold mb-2">{relatedPost.title}</h3>
                        <p className="text-gray-600 mb-4">{relatedPost.excerpt}</p>
                        <span className="text-prometheus-orange font-medium">Read More →</span>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
        
        {/* CTA Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Ready to elevate your business?
              </h2>
              <p className="text-lg text-gray-700 mb-8">
                At Prometheus Agency, we're committed to crafting personalized strategies that align with your unique goals. Our AI-driven solutions and expert guidance are designed to streamline your operations and enhance efficiency.
              </p>
              <Link to="/book-audit">
                <Button size="lg">
                  Book a Strategy Session
                </Button>
              </Link>
            </div>
          </div>
        </section>
        
        {/* Global CTA Banner */}
        <CTABanner 
          title="Ready to Transform Your Business with AI?"
          description="Book a strategy session with our experts to discuss how we can help implement AI solutions tailored to your business needs."
          buttonText="Book a Strategy Session"
          buttonLink="/book-audit"
        />
      </main>
      
      <Footer />
    </>
  );
};

export default DynamicBlogPost;
