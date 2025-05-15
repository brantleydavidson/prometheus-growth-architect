
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Clock, Tag } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

interface BlogPostSummary {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category?: string;
  publishedAt: string;
  readTime?: string;
  coverImage?: string;
  featured: boolean;
}

const DynamicBlogList = () => {
  const [posts, setPosts] = useState<BlogPostSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        setIsLoading(true);
        
        const { data, error } = await supabase
          .from('cms_blog_posts')
          .select('*')
          .eq('status', 'published')
          .order('published_at', { ascending: false });
        
        if (error) {
          throw error;
        }
        
        if (data) {
          // Transform the data to match our BlogPostSummary interface
          const blogPosts: BlogPostSummary[] = data.map(post => ({
            id: post.id,
            title: post.title,
            slug: post.slug,
            excerpt: post.excerpt || '',
            category: post.seo?.category || 'CRM Implementation',
            publishedAt: new Date(post.published_at || post.created_at).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            }),
            readTime: '8 min read', // Default value since we don't store this
            coverImage: post.cover_image || 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            featured: false // We'll set the first one as featured below
          }));
          
          // Set the first post as featured if we have posts
          if (blogPosts.length > 0) {
            blogPosts[0].featured = true;
          }
          
          setPosts(blogPosts);
        }
      } catch (err) {
        console.error('Error fetching blog posts:', err);
        setError('Failed to load blog posts');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Card key={i} className="h-full">
            <div className="h-48">
              <Skeleton className="h-full w-full" />
            </div>
            <CardHeader>
              <Skeleton className="h-4 w-20 mb-2" />
              <Skeleton className="h-6 w-full" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-3/4" />
            </CardContent>
            <CardFooter>
              <Skeleton className="h-10 w-32" />
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <h3 className="text-xl font-semibold mb-4">Error Loading Blog Posts</h3>
        <p className="text-gray-600">{error}</p>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-8">
        <h3 className="text-xl font-semibold mb-4">No Blog Posts Found</h3>
        <p className="text-gray-600">Check back later for new content!</p>
      </div>
    );
  }

  // Find the featured post (if any)
  const featuredPost = posts.find(post => post.featured);
  // Get the non-featured posts
  const regularPosts = posts.filter(post => !post.featured);

  return (
    <>
      {featuredPost && (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center mb-12">
          <div className="lg:col-span-3">
            <img 
              src={featuredPost.coverImage} 
              alt={featuredPost.title}
              className="w-full h-80 object-cover rounded-lg"
            />
          </div>
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <Tag className="h-4 w-4 text-primary" />
              <span className="text-sm text-primary font-medium">{featuredPost.category}</span>
            </div>
            <h3 className="text-2xl font-bold mb-3">{featuredPost.title}</h3>
            <p className="text-gray-700 mb-4">{featuredPost.excerpt}</p>
            <div className="flex items-center gap-4 text-sm text-gray-500 mb-5">
              <span>{featuredPost.publishedAt}</span>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                <span>{featuredPost.readTime}</span>
              </div>
            </div>
            <Link to={`/insights/${featuredPost.slug}`}>
              <Button>
                Read More
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {regularPosts.map(post => (
          <Card key={post.id} className="h-full flex flex-col">
            <div className="h-48 overflow-hidden">
              <img 
                src={post.coverImage} 
                alt={post.title}
                className="w-full h-full object-cover transition-transform hover:scale-105"
              />
            </div>
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2 mb-2">
                <Tag className="h-4 w-4 text-primary" />
                <span className="text-sm text-primary font-medium">{post.category}</span>
              </div>
              <CardTitle className="text-xl">{post.title}</CardTitle>
            </CardHeader>
            <CardContent className="pb-2 flex-grow">
              <CardDescription className="text-gray-700">
                {post.excerpt}
              </CardDescription>
            </CardContent>
            <CardFooter className="pt-2 flex flex-col items-start">
              <div className="flex items-center gap-4 text-sm text-gray-500 mb-4 w-full">
                <span>{post.publishedAt}</span>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{post.readTime}</span>
                </div>
              </div>
              <Link to={`/insights/${post.slug}`}>
                <Button variant="outline" className="group">
                  Read More
                  <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
};

export default DynamicBlogList;
