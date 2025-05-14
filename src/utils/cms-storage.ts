
/**
 * Utility functions for managing CMS data storage
 * In a production environment, these would interact with a real database
 * This simple implementation uses localStorage for demonstration purposes only
 */

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

// Storage keys
const PAGES_KEY = 'cms_pages';
const BLOGS_KEY = 'cms_blogs';
const MEDIA_KEY = 'cms_media';

// Helper to get data from localStorage with proper type
function getStoredData<T>(key: string, defaultValue: T): T {
  const stored = localStorage.getItem(key);
  return stored ? JSON.parse(stored) as T : defaultValue;
}

// Pages
export function getPages(): CMSPage[] {
  return getStoredData<CMSPage[]>(PAGES_KEY, []);
}

export function getPageBySlug(slug: string): CMSPage | undefined {
  return getPages().find(page => page.slug === slug);
}

export function savePage(page: CMSPage): void {
  const pages = getPages();
  const existingIndex = pages.findIndex(p => p.id === page.id);
  
  if (existingIndex >= 0) {
    pages[existingIndex] = { ...page, updatedAt: new Date().toISOString() };
  } else {
    pages.push({ ...page, updatedAt: new Date().toISOString() });
  }
  
  localStorage.setItem(PAGES_KEY, JSON.stringify(pages));
}

// Blog posts
export function getBlogPosts(): CMSBlogPost[] {
  return getStoredData<CMSBlogPost[]>(BLOGS_KEY, []);
}

export function getBlogPostBySlug(slug: string): CMSBlogPost | undefined {
  return getBlogPosts().find(post => post.slug === slug);
}

export function saveBlogPost(post: CMSBlogPost): void {
  const posts = getBlogPosts();
  const existingIndex = posts.findIndex(p => p.id === post.id);
  
  if (existingIndex >= 0) {
    posts[existingIndex] = { ...post, updatedAt: new Date().toISOString() };
  } else {
    posts.push({ ...post, updatedAt: new Date().toISOString() });
  }
  
  localStorage.setItem(BLOGS_KEY, JSON.stringify(posts));
}

// Media
export function getMediaItems(): MediaItem[] {
  return getStoredData<MediaItem[]>(MEDIA_KEY, []);
}

export function getMediaById(id: string): MediaItem | undefined {
  return getMediaItems().find(item => item.id === id);
}

export function saveMediaItem(item: MediaItem): void {
  const mediaItems = getMediaItems();
  const existingIndex = mediaItems.findIndex(m => m.id === item.id);
  
  if (existingIndex >= 0) {
    mediaItems[existingIndex] = item;
  } else {
    mediaItems.push(item);
  }
  
  localStorage.setItem(MEDIA_KEY, JSON.stringify(mediaItems));
}

export function deleteMediaItem(id: string): void {
  const mediaItems = getMediaItems().filter(item => item.id !== id);
  localStorage.setItem(MEDIA_KEY, JSON.stringify(mediaItems));
}

// SEO data
export function getSEODataBySlug(slug: string): SEOData | undefined {
  // First check pages
  const page = getPageBySlug(slug);
  if (page) return page.seo;
  
  // Then check blog posts
  const post = getBlogPostBySlug(slug);
  if (post) return post.seo;
  
  return undefined;
}

export function saveSEOData(slug: string, seoData: SEOData): void {
  // Check if this is for a page
  const pages = getPages();
  const pageIndex = pages.findIndex(p => p.slug === slug);
  
  if (pageIndex >= 0) {
    pages[pageIndex].seo = seoData;
    pages[pageIndex].updatedAt = new Date().toISOString();
    localStorage.setItem(PAGES_KEY, JSON.stringify(pages));
    return;
  }
  
  // Check if this is for a blog post
  const posts = getBlogPosts();
  const postIndex = posts.findIndex(p => p.slug === slug);
  
  if (postIndex >= 0) {
    posts[postIndex].seo = seoData;
    posts[postIndex].updatedAt = new Date().toISOString();
    localStorage.setItem(BLOGS_KEY, JSON.stringify(posts));
  }
}

// Initialize with some default data if empty
export function initializeCMSData(): void {
  if (getPages().length === 0) {
    // Add sample page data
    const samplePages: CMSPage[] = [
      {
        id: '1',
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
      }
    ];
    
    localStorage.setItem(PAGES_KEY, JSON.stringify(samplePages));
  }
  
  if (getBlogPosts().length === 0) {
    // Add sample blog data
    const sampleBlogs: CMSBlogPost[] = [
      {
        id: '1',
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
      }
    ];
    
    localStorage.setItem(BLOGS_KEY, JSON.stringify(sampleBlogs));
  }
}
