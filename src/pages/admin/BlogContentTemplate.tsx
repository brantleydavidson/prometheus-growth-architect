
import React, { useState } from 'react';
import { toast } from 'sonner';
import { supabase } from "@/integrations/supabase/client";

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

/**
 * Prepopulated blog content for Conway AR CRM Consulting
 */
export async function populateConwayCRMBlogPost() {
  // Comprehensive blog post content for Conway CRM
  const blogContent = `
<h2 id="importance" class="scroll-mt-24">Understanding the Importance of CRM Consulting Services</h2>

<p>In today's competitive business landscape, effectively managing customer relationships is crucial for sustainable growth. Conway businesses are increasingly recognizing that Customer Relationship Management (CRM) systems are not just software solutions but strategic business tools that can transform operations.</p>

<p>Local businesses in Conway, Arkansas are finding that proper CRM implementation can lead to improved customer retention, increased sales efficiency, and data-driven decision making that drives growth. However, selecting and implementing the right CRM solution requires expertise that many small to medium businesses don't have in-house.</p>

<h3 id="role-in-growth" class="scroll-mt-24">The Role of CRM in Business Growth</h3>

<p>A well-implemented CRM strategy serves as the backbone for business growth by:</p>

<ul>
  <li>Centralizing customer data for easy access across departments</li>
  <li>Automating repetitive tasks to free up valuable time for relationship building</li>
  <li>Providing analytics to identify trends and opportunities in customer behavior</li>
  <li>Streamlining communication between sales, marketing, and customer service teams</li>
  <li>Creating consistent customer experiences across all touchpoints</li>
</ul>

<p>Conway businesses that leverage CRM consulting services report up to 29% increase in sales and 42% improvement in forecast accuracy, demonstrating the tangible benefits of strategic CRM implementation.</p>

<h3 id="key-features" class="scroll-mt-24">Key Features of Effective CRM Systems</h3>

<p>Not all CRM systems are created equal, and Conway businesses need solutions tailored to their specific needs. Effective CRM systems typically include:</p>

<ul>
  <li><strong>Contact Management:</strong> Comprehensive storage and organization of customer information</li>
  <li><strong>Pipeline Management:</strong> Visual representation and tracking of sales opportunities</li>
  <li><strong>Reporting and Analytics:</strong> Data-driven insights to inform business decisions</li>
  <li><strong>Marketing Automation:</strong> Streamlined marketing processes and campaign tracking</li>
  <li><strong>Customer Service Tools:</strong> Case management and support ticket systems</li>
  <li><strong>Integration Capabilities:</strong> Seamless connection with other business systems</li>
</ul>

<img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71" alt="CRM Dashboard Example showing sales pipeline and customer data analytics" class="my-6 rounded-lg shadow-md"/>

<h2 id="selecting" class="scroll-mt-24">Selecting the Right CRM Consulting Service in Conway AR</h2>

<p>Choosing the right CRM consultant is as important as selecting the CRM platform itself. Conway businesses should approach this decision strategically to ensure they partner with consultants who understand both the technical aspects of CRM and the unique business environment of central Arkansas.</p>

<h3 id="factors" class="scroll-mt-24">Factors to Consider When Choosing a CRM Consultant</h3>

<p>When evaluating CRM consulting services in Conway, consider these critical factors:</p>

<ul>
  <li><strong>Industry Experience:</strong> Consultants with experience in your specific industry will understand your unique challenges</li>
  <li><strong>Technical Expertise:</strong> Certification and demonstrated expertise with major CRM platforms</li>
  <li><strong>Local Knowledge:</strong> Understanding of Conway's business ecosystem and regional market dynamics</li>
  <li><strong>Implementation Methodology:</strong> A structured approach to CRM implementation that includes training and change management</li>
  <li><strong>Support Capabilities:</strong> Ongoing support options after the initial implementation</li>
  <li><strong>Client References:</strong> Success stories and testimonials from other Conway businesses</li>
</ul>

<blockquote class="border-l-4 border-purple-500 pl-4 italic my-6">
  "Working with a local CRM consultant completely transformed our sales process. They understood our Conway market and helped us implement solutions that increased our customer retention by 27% in the first year." 
  <cite>— Sarah Johnson, Owner of Conway Professional Services</cite>
</blockquote>

<h3 id="mistakes" class="scroll-mt-24">Common Mistakes to Avoid in the Selection Process</h3>

<p>Many Conway businesses make these common mistakes when selecting CRM consulting services:</p>

<ul>
  <li>Choosing based on price alone without considering ROI</li>
  <li>Selecting consultants who push specific platforms without assessing business needs</li>
  <li>Underestimating the importance of cultural fit and communication style</li>
  <li>Neglecting to consider post-implementation support needs</li>
  <li>Failing to involve end-users in the selection process</li>
</ul>

<h2 id="benefits" class="scroll-mt-24">Benefits of Hiring a Local CRM Consultant in Conway AR</h2>

<p>While there are many national and remote CRM consulting options available, Conway businesses often find significant advantages in working with local consultants who understand the unique aspects of doing business in central Arkansas.</p>

<img src="https://images.unsplash.com/photo-1631130428034-4d6cea9af959" alt="Conway Business District showing local storefronts and business environment" class="my-6 rounded-lg shadow-md"/>

<h3 id="local-knowledge" class="scroll-mt-24">The Advantage of Local Market Knowledge</h3>

<p>Local Conway CRM consultants offer distinct advantages including:</p>

<ul>
  <li>Understanding of the competitive landscape in central Arkansas</li>
  <li>Familiarity with local business networks and connections</li>
  <li>Knowledge of regional compliance requirements and business practices</li>
  <li>Ability to provide in-person support and training</li>
  <li>Commitment to the local business community's success</li>
</ul>

<h3 id="relationships" class="scroll-mt-24">Building Stronger Business Relationships</h3>

<p>The relationship with your CRM consultant shouldn't end after implementation. Local consultants can provide:</p>

<ul>
  <li>Face-to-face strategy sessions and reviews</li>
  <li>Quicker response times for urgent support needs</li>
  <li>Custom training sessions for new employees</li>
  <li>Regular check-ins to optimize CRM performance</li>
  <li>Strategic advice that evolves with your business</li>
</ul>

<p>This ongoing relationship ensures your CRM system continues to meet your needs as your Conway business grows and changes.</p>

<h2 id="implementing" class="scroll-mt-24">Implementing CRM Strategies with a Consultant</h2>

<p>Successful CRM implementation requires more than just installing software. It requires a strategic approach that aligns technology with business processes and encourages adoption across the organization.</p>

<h3 id="steps" class="scroll-mt-24">Steps in CRM Implementation</h3>

<p>A professional CRM implementation process typically includes:</p>

<ol>
  <li><strong>Discovery and Assessment:</strong> Understanding business goals and current processes</li>
  <li><strong>CRM Selection:</strong> Choosing the right platform based on specific requirements</li>
  <li><strong>Data Migration Strategy:</strong> Planning for clean data transfer from existing systems</li>
  <li><strong>Customization:</strong> Configuring the CRM to match business workflows</li>
  <li><strong>Integration:</strong> Connecting the CRM with other business applications</li>
  <li><strong>Training:</strong> Educating staff on effective CRM use</li>
  <li><strong>Launch:</strong> Going live with the new system</li>
  <li><strong>Optimization:</strong> Refining the system based on initial feedback</li>
</ol>

<img src="https://images.unsplash.com/photo-1556745757-8d76bdb6984b" alt="Customer Service Team collaborating on CRM implementation" class="my-6 rounded-lg shadow-md"/>

<h3 id="challenges" class="scroll-mt-24">Overcoming Challenges in CRM Integration</h3>

<p>Conway businesses often face these common challenges during CRM implementation:</p>

<ul>
  <li><strong>Resistance to Change:</strong> Employees may be hesitant to adopt new systems</li>
  <li><strong>Data Quality Issues:</strong> Existing data may be incomplete or inaccurate</li>
  <li><strong>Process Alignment:</strong> Current workflows may need revision to match CRM capabilities</li>
  <li><strong>Integration Complexity:</strong> Connecting with legacy systems can be challenging</li>
  <li><strong>Resource Constraints:</strong> Limited time and staff for implementation tasks</li>
</ul>

<p>Professional CRM consultants bring expertise in change management and technical implementation to help overcome these challenges and ensure successful adoption.</p>

<h2 id="measuring" class="scroll-mt-24">Measuring the Success of Your CRM Strategy</h2>

<p>Implementing a CRM is an investment, and like any investment, Conway businesses should measure its return. Establishing clear metrics for success helps ensure the CRM delivers expected value.</p>

<h3 id="kpis" class="scroll-mt-24">Key Performance Indicators for CRM Success</h3>

<p>Effective KPIs for measuring CRM success include:</p>

<ul>
  <li><strong>Customer Retention Rate:</strong> Percentage of customers who continue doing business with you</li>
  <li><strong>Sales Cycle Length:</strong> Time from initial contact to closed deal</li>
  <li><strong>Lead Conversion Rate:</strong> Percentage of leads that become customers</li>
  <li><strong>Customer Satisfaction Score:</strong> Direct feedback from customers on their experience</li>
  <li><strong>Sales Team Productivity:</strong> Number of contacts, meetings, and closed deals per rep</li>
  <li><strong>ROI:</strong> Financial return compared to CRM investment</li>
</ul>

<h3 id="continuous-improvement" class="scroll-mt-24">Continuous Improvement of CRM Strategies</h3>

<p>CRM implementation is not a one-time project but an ongoing process of refinement. Conway businesses should:</p>

<ul>
  <li>Regularly review CRM usage and adoption metrics</li>
  <li>Solicit feedback from users across departments</li>
  <li>Stay informed about new CRM features and capabilities</li>
  <li>Periodically revisit business processes to identify new automation opportunities</li>
  <li>Consider regular check-ins with CRM consultants to optimize system performance</li>
</ul>

<p>By treating CRM as an evolving business strategy rather than a static tool, Conway businesses can ensure they continue to derive maximum value from their investment.</p>

<h2 class="scroll-mt-24">Conclusion</h2>

<p>For Conway businesses looking to enhance customer relationships, streamline operations, and drive growth, CRM consulting services offer a strategic pathway to success. By carefully selecting the right consultant, implementing a system tailored to specific business needs, and committing to ongoing optimization, local businesses can transform their customer relationship management from a challenging task to a competitive advantage.</p>

<p>The right CRM strategy does more than organize contact information—it creates a foundation for data-driven decision making, efficient operations, and exceptional customer experiences that set Conway businesses apart in today's competitive marketplace.</p>
`;

  const conwayCRMBlog: BlogPostInput = {
    title: "CRM Consulting Services in Conway AR",
    slug: "crm-consulting-services-in-conway-ar",
    content: blogContent,
    excerpt: "Discover how effective CRM consulting services can transform businesses in Conway, Arkansas by enhancing customer relationships, streamlining processes, and driving sustainable growth.",
    author: "Michael Reynolds",
    status: 'published',
    author_title: "CRM Strategy Lead",
    author_image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5",
    coverImage: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0",
    featured_image_alt: "CRM dashboard showing Conway business metrics with sales pipeline visualization",
    read_time: "10 min read",
    category_tags: [
      "CRM Implementation",
      "Conway AR",
      "Business Growth",
      "Customer Relationship",
      "Sales Automation",
      "Local Business"
    ],
    key_takeaways: "Learn how to select the right CRM consultant, implement effective strategies, and measure success to transform your Conway business's approach to customer relationship management.",
    table_of_contents: [
      { id: "importance", text: "Understanding the Importance of CRM Consulting Services", level: 2 },
      { id: "role-in-growth", text: "The Role of CRM in Business Growth", level: 3 },
      { id: "key-features", text: "Key Features of Effective CRM Systems", level: 3 },
      { id: "selecting", text: "Selecting the Right CRM Consulting Service in Conway AR", level: 2 },
      { id: "factors", text: "Factors to Consider When Choosing a CRM Consultant", level: 3 },
      { id: "mistakes", text: "Common Mistakes to Avoid in the Selection Process", level: 3 },
      { id: "benefits", text: "Benefits of Hiring a Local CRM Consultant in Conway AR", level: 2 },
      { id: "local-knowledge", text: "The Advantage of Local Market Knowledge", level: 3 },
      { id: "relationships", text: "Building Stronger Business Relationships", level: 3 },
      { id: "implementing", text: "Implementing CRM Strategies with a Consultant", level: 2 },
      { id: "steps", text: "Steps in CRM Implementation", level: 3 },
      { id: "challenges", text: "Overcoming Challenges in CRM Integration", level: 3 },
      { id: "measuring", text: "Measuring the Success of Your CRM Strategy", level: 2 },
      { id: "kpis", text: "Key Performance Indicators for CRM Success", level: 3 },
      { id: "continuous-improvement", text: "Continuous Improvement of CRM Strategies", level: 3 }
    ],
    faqs: [
      {
        question: "How long does CRM implementation take?",
        answer: "Implementation timelines vary based on your business complexity, but typically range from 2-12 weeks. Our phased approach ensures you see value at each stage."
      },
      {
        question: "What makes local CRM consultants better for Conway businesses?",
        answer: "Local consultants understand the unique Conway business ecosystem, provide more personalized support, and can meet face-to-face more frequently, leading to stronger partnerships and better outcomes."
      },
      {
        question: "How do you ensure successful CRM adoption?",
        answer: "We focus on comprehensive training, change management best practices, and ongoing support. Our approach ensures team members understand the benefits and are comfortable with the new system."
      }
    ],
    related_posts: [
      {
        title: "The AI Quotient: Measuring Your Organization's AI Readiness",
        slug: "/ai-quotient",
        excerpt: "Discover how to assess and improve your organization's ability to implement AI solutions effectively.",
        cover_image: "https://images.unsplash.com/photo-1518770660439-4636190af475"
      },
      {
        title: "Building a Resilient Data Spine for Your Organization",
        slug: "/data-spine",
        excerpt: "Learn how a well-structured data foundation can support your business operations and drive better decision making.",
        cover_image: "https://images.unsplash.com/photo-1516110833967-0b5716ca1387"
      },
      {
        title: "5 Steps to Transform Your B2B Marketing with AI",
        slug: "/b2b-marketing-ai",
        excerpt: "Practical approaches to leveraging artificial intelligence to enhance your B2B marketing strategies and outcomes.",
        cover_image: "https://images.unsplash.com/photo-1535378620166-273708d44e4c"
      }
    ],
    seo: {
      title: "CRM Consulting Services in Conway, AR – Boost Sales Efficiency | Prometheus Agency",
      description: "Expert CRM consulting in Conway, AR. Optimize your sales processes and customer relationships with our certified consultants.",
      canonical: "/insights/crm-consulting-services-in-conway-ar",
      ogType: "article",
      ogImage: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0"
    }
  };

  return await saveBlogPostToSupabase(conwayCRMBlog);
}

const BlogContentTemplate: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<{success: boolean; message: string} | null>(null);
  
  const handlePopulateConwayPost = async () => {
    setIsLoading(true);
    try {
      const result = await populateConwayCRMBlogPost();
      setResult(result);
      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error('Error creating Conway blog post');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="p-8 max-w-3xl mx-auto text-left">
      <h1 className="text-3xl font-bold mb-4">Blog Content Template</h1>
      <p className="text-gray-600 mb-6">
        This admin page provides tools for blog post management and templates. You can use
        the <code>saveBlogPostToSupabase</code> function from this file to create or update blog posts programmatically.
      </p>
      
      <div className="p-4 border rounded-lg bg-gray-50 mb-6">
        <h2 className="text-xl font-semibold mb-3">Example Templates</h2>
        <p className="mb-4">Click the button below to populate the Conway CRM Consulting blog post in Supabase.</p>
        <button 
          onClick={handlePopulateConwayPost}
          disabled={isLoading}
          className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 disabled:bg-purple-300 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Creating...' : 'Create Conway CRM Blog Post'}
        </button>
        
        {result && (
          <div className={`mt-4 p-3 rounded ${result.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {result.message}
          </div>
        )}
      </div>
      
      <div className="border-t pt-6">
        <h2 className="text-xl font-semibold mb-3">CSV Export Format</h2>
        <p className="mb-4">
          If you need to prepare blog content offline, you can use this CSV format that mirrors the Supabase fields:
        </p>
        <pre className="bg-gray-100 p-3 rounded overflow-x-auto text-xs">
          title,slug,content,excerpt,author,status,author_title,author_image,cover_image,featured_image_alt,read_time,category_tags,key_takeaways,seo.title,seo.description,seo.canonical,seo.ogType,seo.ogImage
        </pre>
      </div>
    </div>
  );
};

export default BlogContentTemplate;
