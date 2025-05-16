import { supabase } from "@/integrations/supabase/client";
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'sonner';

export interface BlogPostInput {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  author: string;
  status: 'draft' | 'published';
  author_title?: string;
  author_image?: string;
  coverImage?: string;
  featured_image_alt?: string;
  read_time?: string;
  category_tags?: string[];
  key_takeaways?: string;
  seo?: {
    title?: string;
    description?: string;
    canonical?: string;
    ogType?: string;
    ogImage?: string;
  };
  table_of_contents?: Array<{
    id: string;
    text: string;
    level: number;
  }>;
  faqs?: Array<{
    question: string;
    answer: string;
  }>;
  related_posts?: Array<{
    title: string;
    slug: string;
    excerpt: string;
    cover_image?: string;
  }>;
}

/**
 * Creates or updates a blog post in Supabase with all fields needed for proper rendering
 * in the dynamic blog template
 */
export async function saveBlogPostToSupabase(blogData: BlogPostInput): Promise<{ success: boolean; message: string; slug?: string }> {
  try {
    if (!blogData.title || !blogData.slug) {
      return { success: false, message: 'Title and slug are required' };
    }

    const { data: existingPost, error: fetchError } = await supabase
      .from('cms_blog_posts')
      .select('id, published_at')
      .eq('slug', blogData.slug)
      .single();

    if (fetchError && fetchError.code !== 'PGRST116') {
      console.error('Error checking for existing post:', fetchError);
      return { success: false, message: `Database error: ${fetchError.message}` };
    }

    const now = new Date().toISOString();
    const publishedAt = blogData.status === 'published' ? (existingPost?.published_at || now) : null;

    const seoData = {
      title: blogData.seo?.title || blogData.title,
      description: blogData.seo?.description || blogData.excerpt,
      canonical: blogData.seo?.canonical || `/insights/${blogData.slug}`,
      ogType: blogData.seo?.ogType || 'article',
      ogImage: blogData.seo?.ogImage || blogData.coverImage,
    };

    const fullBlogData = {
      title: blogData.title,
      slug: blogData.slug,
      content: blogData.content,
      excerpt: blogData.excerpt || '',
      author: blogData.author || 'Prometheus Agency',
      status: blogData.status,
      published_at: publishedAt,
      updated_at: now,
      cover_image: blogData.coverImage,
      featured_image_alt: blogData.featured_image_alt || blogData.title,
      read_time: blogData.read_time || '5 min read',
      category_tags: blogData.category_tags || [],
      key_takeaways: blogData.key_takeaways || '',
      author_title: blogData.author_title || '',
      author_image: blogData.author_image || '',
      seo: seoData,
      table_of_contents: blogData.table_of_contents || [],
      faqs: blogData.faqs || [],
      related_posts: blogData.related_posts || [],
    };

    let result;

    if (existingPost) {
      result = await supabase
        .from('cms_blog_posts')
        .update(fullBlogData)
        .eq('id', existingPost.id);
    } else {
      result = await supabase
        .from('cms_blog_posts')
        .insert({ ...fullBlogData, created_at: now });
    }

    if (result.error) {
      console.error('Error saving blog post:', result.error);
      return { success: false, message: `Failed to save blog post: ${result.error.message}` };
    }

    toast.success(`Blog post "${blogData.title}" ${existingPost ? 'updated' : 'created'} successfully`);
    return { success: true, message: `Blog post "${blogData.title}" ${existingPost ? 'updated' : 'created'} successfully`, slug: blogData.slug };
  } catch (err) {
    console.error('Unexpected error saving blog post:', err);
    return { success: false, message: `Unexpected error: ${err instanceof Error ? err.message : 'Unknown error'}` };
  }
}

// The remainder of the helper functions (getPublishedBlogPosts, extractTableOfContents, addHeadingIdsToContent)
// can be added here or imported from separate utility modules as your application grows. 