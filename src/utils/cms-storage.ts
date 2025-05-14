
/**
 * Utility functions for managing CMS data storage with Supabase
 */
import { supabase } from "@/integrations/supabase/client";
import { v4 as uuidv4 } from 'uuid';

// Define types for CMS content
export interface CMSPage {
  id: string;
  title: string;
  slug: string;
  content: Record<string, any>;
  seo: SEOData;
  updatedAt: string;
}

export interface CMSBlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  coverImage?: string;
  status: 'draft' | 'published';
  publishedAt?: string;
  updatedAt: string;
  seo: SEOData;
}

export interface SEOData {
  title: string;
  description: string;
  canonical?: string;
  ogType: string;
  ogImage?: string;
  faqs?: Array<{question: string, answer: string}>;
  schemaMarkup?: object;
}

export interface MediaItem {
  id: string;
  title: string;
  fileType: string;
  url: string;
  size: string;
  dimensions?: string;
  alt?: string;
  uploadedAt: string;
}

// Helper function to convert DB timestamps to ISO strings
const formatTimestamp = (timestamp: string | null): string => {
  return timestamp ? new Date(timestamp).toISOString() : new Date().toISOString();
};

// Pages
export async function getPages(): Promise<CMSPage[]> {
  const { data, error } = await supabase
    .from('cms_pages')
    .select('*');
  
  if (error) {
    console.error('Error fetching pages:', error);
    return [];
  }
  
  return data.map(page => ({
    id: page.id,
    title: page.title,
    slug: page.slug,
    content: page.content,
    seo: page.seo,
    updatedAt: formatTimestamp(page.updated_at)
  }));
}

export async function getPageBySlug(slug: string): Promise<CMSPage | undefined> {
  const { data, error } = await supabase
    .from('cms_pages')
    .select('*')
    .eq('slug', slug)
    .single();
  
  if (error || !data) {
    console.error('Error fetching page by slug:', error);
    return undefined;
  }
  
  return {
    id: data.id,
    title: data.title,
    slug: data.slug,
    content: data.content,
    seo: data.seo,
    updatedAt: formatTimestamp(data.updated_at)
  };
}

export async function savePage(page: CMSPage): Promise<void> {
  const now = new Date().toISOString();
  
  if (page.id) {
    // Update existing page
    const { error } = await supabase
      .from('cms_pages')
      .update({
        title: page.title,
        slug: page.slug,
        content: page.content,
        seo: page.seo,
        updated_at: now
      })
      .eq('id', page.id);
    
    if (error) console.error('Error updating page:', error);
  } else {
    // Create new page
    const { error } = await supabase
      .from('cms_pages')
      .insert({
        id: uuidv4(),
        title: page.title,
        slug: page.slug,
        content: page.content,
        seo: page.seo,
        created_at: now,
        updated_at: now
      });
    
    if (error) console.error('Error creating page:', error);
  }
}

// Blog posts
export async function getBlogPosts(): Promise<CMSBlogPost[]> {
  const { data, error } = await supabase
    .from('cms_blog_posts')
    .select('*');
  
  if (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
  
  return data.map(post => ({
    id: post.id,
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt || '',
    content: post.content || '',
    author: post.author || '',
    coverImage: post.cover_image,
    status: post.status as 'draft' | 'published',
    publishedAt: post.published_at ? formatTimestamp(post.published_at) : undefined,
    updatedAt: formatTimestamp(post.updated_at),
    seo: post.seo
  }));
}

export async function getBlogPostBySlug(slug: string): Promise<CMSBlogPost | undefined> {
  const { data, error } = await supabase
    .from('cms_blog_posts')
    .select('*')
    .eq('slug', slug)
    .single();
  
  if (error || !data) {
    console.error('Error fetching blog post by slug:', error);
    return undefined;
  }
  
  return {
    id: data.id,
    title: data.title,
    slug: data.slug,
    excerpt: data.excerpt || '',
    content: data.content || '',
    author: data.author || '',
    coverImage: data.cover_image,
    status: data.status as 'draft' | 'published',
    publishedAt: data.published_at ? formatTimestamp(data.published_at) : undefined,
    updatedAt: formatTimestamp(data.updated_at),
    seo: data.seo
  };
}

export async function saveBlogPost(post: CMSBlogPost): Promise<void> {
  const now = new Date().toISOString();
  
  if (post.id) {
    // Update existing blog post
    const { error } = await supabase
      .from('cms_blog_posts')
      .update({
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        content: post.content,
        author: post.author,
        cover_image: post.coverImage,
        status: post.status,
        published_at: post.status === 'published' ? (post.publishedAt || now) : post.publishedAt,
        updated_at: now,
        seo: post.seo
      })
      .eq('id', post.id);
    
    if (error) console.error('Error updating blog post:', error);
  } else {
    // Create new blog post
    const { error } = await supabase
      .from('cms_blog_posts')
      .insert({
        id: uuidv4(),
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        content: post.content,
        author: post.author,
        cover_image: post.coverImage,
        status: post.status,
        published_at: post.status === 'published' ? (post.publishedAt || now) : null,
        created_at: now,
        updated_at: now,
        seo: post.seo
      });
    
    if (error) console.error('Error creating blog post:', error);
  }
}

// Media
export async function getMediaItems(): Promise<MediaItem[]> {
  const { data, error } = await supabase
    .from('cms_media_items')
    .select('*');
  
  if (error) {
    console.error('Error fetching media items:', error);
    return [];
  }
  
  return data.map(item => ({
    id: item.id,
    title: item.title,
    fileType: item.file_type,
    url: item.url,
    size: item.size || '',
    dimensions: item.dimensions,
    alt: item.alt,
    uploadedAt: formatTimestamp(item.uploaded_at)
  }));
}

export async function getMediaById(id: string): Promise<MediaItem | undefined> {
  const { data, error } = await supabase
    .from('cms_media_items')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error || !data) {
    console.error('Error fetching media by id:', error);
    return undefined;
  }
  
  return {
    id: data.id,
    title: data.title,
    fileType: data.file_type,
    url: data.url,
    size: data.size || '',
    dimensions: data.dimensions,
    alt: data.alt,
    uploadedAt: formatTimestamp(data.uploaded_at)
  };
}

export async function saveMediaItem(item: MediaItem): Promise<void> {
  const now = new Date().toISOString();
  
  if (item.id) {
    // Update existing media item
    const { error } = await supabase
      .from('cms_media_items')
      .update({
        title: item.title,
        file_type: item.fileType,
        url: item.url,
        size: item.size,
        dimensions: item.dimensions,
        alt: item.alt,
      })
      .eq('id', item.id);
    
    if (error) console.error('Error updating media item:', error);
  } else {
    // Create new media item
    const { error } = await supabase
      .from('cms_media_items')
      .insert({
        id: uuidv4(),
        title: item.title,
        file_type: item.fileType,
        url: item.url,
        size: item.size,
        dimensions: item.dimensions,
        alt: item.alt,
        uploaded_at: now
      });
    
    if (error) console.error('Error creating media item:', error);
  }
}

export async function deleteMediaItem(id: string): Promise<void> {
  const { error } = await supabase
    .from('cms_media_items')
    .delete()
    .eq('id', id);
  
  if (error) console.error('Error deleting media item:', error);
}

// SEO data
export async function getSEODataBySlug(slug: string): Promise<SEOData | undefined> {
  // First check pages
  const page = await getPageBySlug(slug);
  if (page) return page.seo;
  
  // Then check blog posts
  const post = await getBlogPostBySlug(slug);
  if (post) return post.seo;
  
  return undefined;
}

export async function saveSEOData(slug: string, seoData: SEOData): Promise<void> {
  // Check if this is for a page
  const page = await getPageBySlug(slug);
  
  if (page) {
    page.seo = seoData;
    page.updatedAt = new Date().toISOString();
    await savePage(page);
    return;
  }
  
  // Check if this is for a blog post
  const post = await getBlogPostBySlug(slug);
  
  if (post) {
    post.seo = seoData;
    post.updatedAt = new Date().toISOString();
    await saveBlogPost(post);
  }
}

// Helper function to upload files to Supabase Storage
export async function uploadMediaFile(file: File): Promise<string | null> {
  const fileExt = file.name.split('.').pop();
  const fileName = `${uuidv4()}.${fileExt}`;
  const filePath = `${fileName}`;

  const { error: uploadError, data } = await supabase.storage
    .from('cms_media')
    .upload(filePath, file);

  if (uploadError) {
    console.error('Error uploading file:', uploadError);
    return null;
  }

  const { data: { publicUrl } } = supabase.storage
    .from('cms_media')
    .getPublicUrl(filePath);

  return publicUrl;
}

// Initialize with some default data if empty
export async function initializeCMSData(): Promise<void> {
  const pages = await getPages();
  if (pages.length === 0) {
    // Add sample page data
    const samplePage: CMSPage = {
      id: uuidv4(),
      title: 'Home',
      slug: '/',
      content: {
        heroTitle: 'Transform Technology Chaos into Strategic Growth',
        heroSubtitle: 'We help B2B and DTC businesses leverage AI and proven GTM strategies to drive growth.'
      },
      seo: {
        title: 'Prometheus Agency - AI Enablement and GTM Strategy',
        description: 'We help B2B and DTC businesses transform technology chaos into strategic growth engines with AI enablement and proven GTM strategies.',
        ogType: 'website',
        ogImage: 'https://prometheusagency.co/opengraph-image.png'
      },
      updatedAt: new Date().toISOString()
    };
    
    await savePage(samplePage);
  }
  
  const blogs = await getBlogPosts();
  if (blogs.length === 0) {
    // Add sample blog data
    const sampleBlog: CMSBlogPost = {
      id: uuidv4(),
      title: 'CRM Consulting Services in Conway, AR',
      slug: 'crm-consulting-services-in-conway-ar',
      excerpt: 'Expert CRM consulting services for Conway businesses looking to improve sales efficiency and customer relationships.',
      content: 'This is a sample blog post about CRM consulting services in Conway, Arkansas.',
      author: 'Brantley Davidson',
      status: 'published',
      publishedAt: '2023-05-13T12:00:00Z',
      updatedAt: new Date().toISOString(),
      seo: {
        title: 'CRM Consulting Services in Conway, AR – Boost Sales Efficiency | Prometheus Agency',
        description: 'Expert CRM consulting services in Conway, AR. Optimize your sales processes and customer relationships with our certified consultants.',
        ogType: 'article',
        ogImage: 'https://prometheusagency.co/images/crm-consulting.png',
        faqs: [
          {
            question: 'Why work with a local CRM consultant?',
            answer: 'A local CRM consultant understands the unique business environment in Conway and can provide personalized service with face-to-face meetings and faster response times.'
          },
          {
            question: 'How much does CRM consulting cost in Conway?',
            answer: 'CRM consulting services in Conway typically range from $1,500-$5,000 depending on the scope of work and complexity of your business needs.'
          }
        ]
      }
    };
    
    await saveBlogPost(sampleBlog);
  }
}
