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
  cta_block?: {
    title: string;
    body: string;
    buttonText: string;
    buttonLink: string;
  };
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
  const [tocOpen, setTocOpen] = useState(true);
  const navigate = useNavigate();
  const [mediaItems, setMediaItems] = useState<Record<string, string>>({});

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
        
        // Fetch all media items to use in the blog post
        const { data: mediaData } = await supabase
          .from('cms_media_items')
          .select('*');
          
        const mediaMap: Record<string, string> = {};
        if (mediaData) {
          mediaData.forEach(item => {
            mediaMap[item.title] = item.url;
          });
        }
        setMediaItems(mediaMap);
        
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
          cta_block: typeof (data as any).cta_block === 'string' ? JSON.parse((data as any).cta_block) : (data as any).cta_block,
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

    // Set up intersection observer for section headings
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observerOptions = {
      rootMargin: '-80px 0px -80% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    // Observer setup will be completed after content is loaded
    // (see the effect below)

    return () => {
      observer.disconnect();
    };
  }, [slug, navigate]);

  // Set up observers for headings after content is loaded
  useEffect(() => {
    if (post) {
      const headings = document.querySelectorAll('h2[id], h3[id]');
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              setActiveSection(entry.target.id);
            }
          });
        },
        {
          rootMargin: '-80px 0px -80% 0px',
          threshold: 0
        }
      );

      headings.forEach(heading => {
        observer.observe(heading);
      });

      return () => {
        observer.disconnect();
      };
    }
  }, [post]);

  // Enhance the content rendering to include media references
  const renderContent = (content: string) => {
    // Process emojis: Replace emoji shortcodes with actual emojis
    let processedContent = content;
    
    // Support for emoji shortcodes like :smile: -> 😊
    const emojiMap: Record<string, string> = {
      ':smile:': '😊',
      ':thumbsup:': '👍',
      ':rocket:': '🚀',
      ':warning:': '⚠️',
      ':bulb:': '💡',
      ':chart_with_upwards_trend:': '📈',
      ':memo:': '📝',
      ':star:': '⭐',
      ':heart:': '❤️',
      ':check:': '✅',
      ':x:': '❌',
      // Add more emoji mappings as needed
    };
    
    Object.entries(emojiMap).forEach(([code, emoji]) => {
      processedContent = processedContent.replace(new RegExp(code, 'g'), emoji);
    });
    
    // Replace media references like [media:Title of Media Item] with actual <img> tags
    const mediaRegex = /\[media:(.*?)\]/g;
    processedContent = processedContent.replace(mediaRegex, (match, mediaTitle) => {
      const mediaUrl = mediaItems[mediaTitle];
      if (mediaUrl) {
        return `<img src="${mediaUrl}" alt="${mediaTitle}" class="my-4 rounded-lg max-w-full h-auto" />`;
      }
      return match; // Keep the original if not found
    });
    
    // Fix duplicated double-quotes created during SQL escaping, e.g.
    // id=""some-id""  -> id="some-id"
    processedContent = processedContent.replace(/\b(id|class)=\"\"([^\"]+)\"\"/g, '$1="$2"');
    
    return { __html: processedContent };
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

  const toggleTOC = () => {
    setTocOpen(!tocOpen);
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
              
              {/* KEY TAKEAWAYS at top */}
              {post.key_takeaways && (
                <div className="mb-12 bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg">
                  <h2 className="text-xl font-bold mb-4">Key Takeaways</h2>
                  <div className="prose" dangerouslySetInnerHTML={renderContent(post.key_takeaways)} />
                </div>
              )}
              
              {/* Content layout with sidebar TOC on larger screens */}
              <div className="lg:grid lg:grid-cols-4 lg:gap-8">
                {/* Main content (left) */}
                <div className={`${post.table_of_contents && post.table_of_contents.length > 0 ? 'lg:col-span-3' : 'lg:col-span-4'} lg:order-1`}>
                  {/* Mobile TOC toggle */}
                  {post.table_of_contents && post.table_of_contents.length > 0 && (
                    <div className="lg:hidden mb-8">
                      <div 
                        className="bg-gray-50 rounded-lg p-4 cursor-pointer"
                        onClick={toggleTOC}
                      >
                        <div className="flex justify-between items-center">
                          <h2 className="text-lg font-bold">Table of Contents</h2>
                          {tocOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                        </div>
                        
                        {tocOpen && (
                          <nav className="mt-4">
                            <ul className="space-y-2">
                              {post.table_of_contents.map((item) => (
                                <li 
                                  key={item.id} 
                                  className={`${
                                    item.level === 1 ? 'ml-0' : item.level === 2 ? 'ml-3' : 'ml-6'
                                  } ${
                                    activeSection === item.id 
                                      ? 'text-prometheus-orange font-medium' 
                                      : 'text-gray-700'
                                  } cursor-pointer transition-colors text-sm`}
                                  onClick={() => scrollToSection(item.id)}
                                >
                                  {item.text}
                                </li>
                              ))}
                            </ul>
                          </nav>
                        )}
                      </div>
                    </div>
                  )}
                  
                  <div className="prose prose-lg max-w-none">
                    {/* Render excerpt as lead paragraph if available */}
                    {post.excerpt && (
                      <p className="lead font-medium text-lg md:text-xl text-gray-800 mb-8">
                        {post.excerpt}
                      </p>
                    )}
                    
                    {/* Render main content with emoji and media support */}
                    <div
                      className="blog-content"
                      dangerouslySetInnerHTML={renderContent(post.content)}
                    />
                  </div>
                  
                  {/* Author info card */}
                  <div className="mt-12 border-t border-gray-200 pt-8">
                    <div className="flex items-start space-x-4">
                      {post.author_image ? (
                        <img 
                          src={post.author_image} 
                          alt={post.author} 
                          className="w-16 h-16 rounded-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80";
                          }}
                        />
                      ) : (
                        <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                          {post.author.charAt(0)}
                        </div>
                      )}
                      <div>
                        <h3 className="font-semibold text-lg">{post.author}</h3>
                        {post.author_title && (
                          <p className="text-gray-600">{post.author_title}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sidebar right */}
                {post.table_of_contents && post.table_of_contents.length > 0 && (
                  <div className="hidden lg:block lg:col-span-1 lg:order-2 relative">
                    <div className="sticky top-24 space-y-8">
                      {/* TOC card */}
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h2 className="text-lg font-bold mb-4">Table of Contents</h2>
                        <nav className="toc-nav">
                          <ul className="space-y-2">
                            {post.table_of_contents.map((item) => (
                              <li
                                key={item.id}
                                className={`${item.level === 1 ? 'ml-0' : item.level === 2 ? 'ml-3' : 'ml-6'} ${activeSection === item.id ? 'text-prometheus-orange font-medium' : 'text-gray-700 hover:text-prometheus-orange'} cursor-pointer transition-colors text-sm`}
                                onClick={() => scrollToSection(item.id)}
                              >
                                {item.text}
                              </li>
                            ))}
                          </ul>
                        </nav>
                      </div>

                      {/* CTA Block */}
                      {post.cta_block && (
                        <div className="p-6 rounded-lg bg-primary/10 border-l-4 border-primary">
                          <h3 className="text-lg font-bold mb-2">{post.cta_block.title}</h3>
                          <p className="text-sm mb-4">{post.cta_block.body}</p>
                          <Link to={post.cta_block.buttonLink}>
                            <Button size="sm">{post.cta_block.buttonText}</Button>
                          </Link>
                        </div>
                      )}

                      {/* FAQ accordion */}
                      {post.faqs && post.faqs.length > 0 && (
                        <div className="bg-gray-50 rounded-lg p-4">
                          <h3 className="text-lg font-bold mb-4">FAQs</h3>
                          {post.faqs.map((faq, i) => (
                            <details key={i} className="mb-2 group">
                              <summary className="cursor-pointer font-medium text-sm group-open:text-primary">
                                {faq.question}
                              </summary>
                              <div className="mt-2 text-sm" dangerouslySetInnerHTML={renderContent(faq.answer)} />
                            </details>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
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
        
        {/* Global CTA Banner retained below if still desired elsewhere */}
      </main>
      
      <Footer />
      
      {/* Add custom CSS for the blog content */}
      <style>{`
        /* Enhanced styling for blog content */
        .blog-content h2 {
          margin-top: 2rem;
          margin-bottom: 1rem;
          font-size: 1.75rem;
          font-weight: 700;
          color: #1A1F2C;
          scroll-margin-top: 6rem;
        }
        
        .blog-content h3 {
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
          font-size: 1.5rem;
          font-weight: 600;
          color: #1A1F2C;
          scroll-margin-top: 6rem;
        }
        
        .blog-content p {
          margin-bottom: 1.25rem;
          line-height: 1.7;
        }
        
        .blog-content ul {
          margin-bottom: 1.5rem;
          padding-left: 1.5rem;
          list-style-type: disc;
        }
        
        .blog-content ol {
          margin-bottom: 1.5rem;
          padding-left: 1.5rem;
          list-style-type: decimal;
        }
        
        .blog-content li {
          margin-bottom: 0.5rem;
        }
        
        .blog-content a {
          color: #9b87f5;
          text-decoration: underline;
          transition: color 0.2s;
        }
        
        .blog-content a:hover {
          color: #7E69AB;
        }
        
        .blog-content blockquote {
          margin: 1.5rem 0;
          padding: 1rem 1.5rem;
          border-left: 4px solid #9b87f5;
          background-color: #F1F0FB;
          font-style: italic;
          color: #403E43;
        }
        
        .blog-content img {
          max-width: 100%;
          height: auto;
          border-radius: 0.375rem;
          margin: 1.5rem 0;
        }
        
        .blog-content code {
          background-color: #F1F0FB;
          padding: 0.2rem 0.4rem;
          border-radius: 0.25rem;
          font-family: monospace;
          font-size: 0.9em;
        }
        
        .blog-content pre {
          background-color: #1A1F2C;
          color: #F6F6F7;
          padding: 1rem;
          border-radius: 0.375rem;
          overflow-x: auto;
          margin: 1.5rem 0;
        }
        
        .blog-content pre code {
          background-color: transparent;
          padding: 0;
          color: inherit;
        }
        
        /* Special formatting classes */
        .blog-content .callout {
          margin: 1.5rem 0;
          padding: 1.25rem;
          border-radius: 0.375rem;
          border-left: 4px solid #9b87f5;
          background-color: #F1F0FB;
        }
        
        .blog-content .callout-warning {
          border-left-color: #F97316;
          background-color: #FDE1D3;
        }
        
        .blog-content .callout-info {
          border-left-color: #0EA5E9;
          background-color: #D3E4FD;
        }
        
        .blog-content .callout-success {
          border-left-color: #10B981;
          background-color: #F2FCE2;
        }
        
        .blog-content .grid-cols-2 {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
          margin: 1.5rem 0;
        }
        
        @media (min-width: 768px) {
          .blog-content .grid-cols-2 {
            grid-template-columns: 1fr 1fr;
          }
        }
        
        .blog-content .feature-box {
          padding: 1.25rem;
          border-radius: 0.375rem;
          border: 1px solid #C8C8C9;
          background-color: #FFFFFF;
          box-shadow: 0 2px 4px rgba(0,0,0,0.05);
        }
        
        /* Table styles */
        .blog-content table {
          width: 100%;
          border-collapse: collapse;
          margin: 1.5rem 0;
        }
        
        .blog-content th {
          background-color: #F1F0FB;
          padding: 0.75rem 1rem;
          text-align: left;
          font-weight: 600;
        }
        
        .blog-content td {
          padding: 0.75rem 1rem;
          border-top: 1px solid #C8C8C9;
        }
        
        .blog-content tr:nth-child(even) {
          background-color: #F6F6F7;
        }
        
        /* Lead paragraph */
        .blog-content .lead {
          font-size: 1.125rem;
          font-weight: 500;
          color: #403E43;
          margin-bottom: 2rem;
        }
        
        /* Step process */
        .blog-content .step-process {
          counter-reset: step-counter;
        }
        
        .blog-content .step-process .step {
          position: relative;
          padding-left: 3rem;
          margin-bottom: 1.5rem;
          min-height: 2.5rem;
        }
        
        .blog-content .step-process .step::before {
          content: counter(step-counter);
          counter-increment: step-counter;
          position: absolute;
          left: 0;
          top: 0;
          width: 2.5rem;
          height: 2.5rem;
          background-color: #9b87f5;
          color: white;
          border-radius: 9999px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
        }
      `}</style>
    </>
  );
};

export default DynamicBlogPost;
