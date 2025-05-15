
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import SEO from '@/components/SEO';
import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/layout/Footer';
import CTABanner from '@/components/common/CTABanner';
import { Skeleton } from '@/components/ui/skeleton';
import { Json } from '@/integrations/supabase/types';

// Define the blog post type
interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  author: string;
  coverImage?: string;
  publishedAt: string;
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

  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        setIsLoading(true);
        
        const { data, error } = await supabase
          .from('cms_blog_posts')
          .select('*')
          .eq('slug', slug)
          .single();
        
        if (error) {
          throw error;
        }
        
        if (data) {
          // Parse the SEO data properly
          const seoData = typeof data.seo === 'string' 
            ? JSON.parse(data.seo) 
            : data.seo as Record<string, any>;
          
          // Transform the data to match our BlogPost interface
          const blogPost: BlogPost = {
            id: data.id,
            title: data.title,
            slug: data.slug,
            content: data.content || '',
            excerpt: data.excerpt || '',
            author: data.author || 'Prometheus Agency',
            coverImage: data.cover_image,
            publishedAt: new Date(data.published_at || data.created_at).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            }),
            seo: {
              title: seoData?.title || data.title,
              description: seoData?.description || data.excerpt || '',
              canonical: seoData?.canonical,
              ogType: seoData?.ogType || 'article',
              ogImage: seoData?.ogImage
            }
          };
          
          setPost(blogPost);
        } else {
          setError('Blog post not found');
        }
      } catch (err) {
        console.error('Error fetching blog post:', err);
        setError('Failed to load blog post');
      } finally {
        setIsLoading(false);
      }
    };

    if (slug) {
      fetchBlogPost();
    }
  }, [slug]);

  // Handle content rendering with basic HTML
  const renderContent = (content: string) => {
    return { __html: content };
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
          <p className="mb-8">The blog post you're looking for could not be found or has been removed.</p>
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
      />
      
      <Navbar />
      
      <main className="bg-white py-16">
        <div className="container mx-auto px-4">
          <article className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{post.title}</h1>
            
            <div className="flex items-center text-gray-600 mb-8">
              <span className="text-sm">{post.publishedAt}</span>
              <span className="mx-2">•</span>
              <span className="text-sm">{post.author}</span>
            </div>
            
            {post.coverImage && (
              <div className="mb-10">
                <img 
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-auto rounded-lg"
                />
              </div>
            )}
            
            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={renderContent(post.content)}
            />
          </article>
        </div>
      </main>
      
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

export default DynamicBlogPost;
