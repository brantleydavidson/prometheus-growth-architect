
import { supabase } from "@/integrations/supabase/client";
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'sonner';

export interface BlogPostInput {
  // Basic content
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  author: string;
  status: 'draft' | 'published';
  
  // Enhanced metadata
  author_title?: string;
  author_image?: string;
  coverImage?: string;
  featured_image_alt?: string;
  read_time?: string;
  category_tags?: string[];
  key_takeaways?: string;
  
  // SEO fields
  seo?: {
    title?: string;
    description?: string;
    canonical?: string;
    ogType?: string;
    ogImage?: string;
  };
  
  // Structured content
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
    
    // Check if post with this slug already exists
    const { data: existingPost, error: fetchError } = await supabase
      .from('cms_blog_posts')
      .select('id, published_at')
      .eq('slug', blogData.slug)
      .single();
      
    if (fetchError && fetchError.code !== 'PGRST116') {
      // Real error, not just "not found"
      console.error('Error checking for existing post:', fetchError);
      return { success: false, message: `Database error: ${fetchError.message}` };
    }
    
    const now = new Date().toISOString();
    const publishedAt = blogData.status === 'published' ? (existingPost?.published_at || now) : null;
    
    // Prepare complete SEO data
    const seoData = {
      title: blogData.seo?.title || blogData.title,
      description: blogData.seo?.description || blogData.excerpt,
      canonical: blogData.seo?.canonical || `/insights/${blogData.slug}`,
      ogType: blogData.seo?.ogType || 'article',
      ogImage: blogData.seo?.ogImage || blogData.coverImage
    };
    
    // Prepare complete blog post data for insertion/update
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
      related_posts: blogData.related_posts || []
    };
    
    let result;
    
    if (existingPost) {
      // Update existing post
      result = await supabase
        .from('cms_blog_posts')
        .update(fullBlogData)
        .eq('id', existingPost.id);
    } else {
      // Create new post
      result = await supabase
        .from('cms_blog_posts')
        .insert({ ...fullBlogData, created_at: now });
    }
    
    if (result.error) {
      console.error('Error saving blog post:', result.error);
      return { 
        success: false, 
        message: `Failed to save blog post: ${result.error.message}`
      };
    }
    
    return { 
      success: true, 
      message: `Blog post "${blogData.title}" ${existingPost ? 'updated' : 'created'} successfully`,
      slug: blogData.slug
    };
  } catch (err) {
    console.error('Unexpected error saving blog post:', err);
    return { 
      success: false, 
      message: `Unexpected error: ${err instanceof Error ? err.message : 'Unknown error'}`
    };
  }
}

/**
 * Retrieve all published blog posts
 */
export async function getPublishedBlogPosts() {
  const { data, error } = await supabase
    .from('cms_blog_posts')
    .select('*')
    .eq('status', 'published')
    .order('published_at', { ascending: false });
    
  if (error) {
    console.error('Error fetching published blog posts:', error);
    return [];
  }
  
  return data || [];
}

/**
 * Helper to extract and format TOC from HTML content
 * @param content HTML content with headings to extract TOC from
 * @returns Formatted TOC array
 */
export function extractTableOfContents(content: string): Array<{id: string, text: string, level: number}> {
  const toc: Array<{id: string, text: string, level: number}> = [];
  
  // Regular expression to find h2 and h3 tags with optional id attribute
  const headingRegex = /<h([2-3])(?: id="([^"]*)")?[^>]*>(.*?)<\/h\1>/g;
  let match;
  
  while ((match = headingRegex.exec(content)) !== null) {
    const level = parseInt(match[1]);
    let id = match[2];
    const text = match[3].replace(/<[^>]*>/g, ''); // Strip any HTML tags from heading text
    
    // If no id was found in the heading, generate one from the text
    if (!id) {
      id = text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
    }
    
    toc.push({ id, text, level });
  }
  
  return toc;
}

/**
 * Helper to update blog content with proper IDs for headings for TOC linking
 * @param content Original HTML content
 * @returns Updated HTML with heading IDs
 */
export function addHeadingIdsToContent(content: string): string {
  // First pass to extract headings and generate TOC structure
  const toc = extractTableOfContents(content);
  
  // Second pass to actually update the content with IDs
  let updatedContent = content;
  
  // Replace headings without IDs with headings that have IDs
  toc.forEach(item => {
    const headingText = item.text;
    const headingLevel = item.level;
    const headingId = item.id;
    
    // Replace the first occurrence of the heading without an ID
    const headingRegex = new RegExp(`<h${headingLevel}[^>]*>(${headingText})<\\/h${headingLevel}>`, 'i');
    updatedContent = updatedContent.replace(headingRegex, `<h${headingLevel} id="${headingId}" class="scroll-mt-24">${headingText}</h${headingLevel}>`);
  });
  
  return updatedContent;
}
