
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { DialogWithForm } from "@/components/cms/DialogWithForm";
import { Plus, Clock, Calendar, Eye, ArrowUpDown, Edit, Trash2, Save } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { saveBlogPost, CMSBlogPost } from "@/utils/cms-storage";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  author: string;
  status: "published" | "draft";
  publishedAt?: string;
  updatedAt: string;
  content: string;
  seo: Record<string, any>;
}

const BlogEditor = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedBlog, setSelectedBlog] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [status, setStatus] = useState<"published" | "draft">("draft");
  const [isNewDialogOpen, setIsNewDialogOpen] = useState(false);
  const [newBlogData, setNewBlogData] = useState({
    title: "",
    excerpt: "",
  });

  // Fetch blogs from Supabase
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setIsLoading(true);
        
        const { data, error } = await supabase
          .from('cms_blog_posts')
          .select('*')
          .order('published_at', { ascending: false });
        
        if (error) {
          throw error;
        }
        
        if (data) {
          // Transform the data to match our BlogPost interface
          const formattedBlogs: BlogPost[] = data.map(blog => {
            // Parse SEO data properly
            const seoData = typeof blog.seo === 'string' 
              ? JSON.parse(blog.seo) 
              : blog.seo as Record<string, any>;
            
            return {
              id: blog.id,
              title: blog.title || 'Untitled',
              slug: blog.slug,
              excerpt: blog.excerpt || '',
              author: blog.author || 'Brantley Davidson',
              status: blog.status as "published" | "draft",
              publishedAt: blog.published_at,
              updatedAt: blog.updated_at,
              content: blog.content || '',
              seo: seoData || {}
            };
          });
          
          setBlogs(formattedBlogs);
        }
      } catch (error) {
        console.error('Error fetching blogs:', error);
        toast.error('Failed to load blog posts');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchBlogs();
  }, []);
  
  const handleSelectBlog = (id: string) => {
    setSelectedBlog(id);
    
    const blog = blogs.find(b => b.id === id);
    if (blog) {
      setTitle(blog.title);
      setSlug(blog.slug);
      setExcerpt(blog.excerpt || '');
      setContent(blog.content || '');
      setAuthor(blog.author || 'Brantley Davidson');
      setStatus(blog.status);
    }
  };
  
  const handleSaveBlog = async () => {
    if (!selectedBlog) return;
    
    try {
      const blog = blogs.find(b => b.id === selectedBlog);
      if (!blog) return;
      
      // Create updated blog object
      const updatedBlog: CMSBlogPost = {
        id: blog.id,
        title,
        slug,
        excerpt,
        content,
        author,
        status,
        coverImage: blog.seo?.ogImage,
        publishedAt: blog.publishedAt,
        updatedAt: new Date().toISOString(),
        seo: {
          title: blog.seo?.title || title,
          description: blog.seo?.description || excerpt,
          ogType: blog.seo?.ogType || "article",
          ogImage: blog.seo?.ogImage
        }
      };
      
      // Save to Supabase using the cms-storage utility
      await saveBlogPost(updatedBlog);
      
      // Update the blog in the local state
      setBlogs(blogs.map(b => b.id === selectedBlog ? {...b, 
        title, 
        slug, 
        excerpt, 
        content,
        author,
        status,
        updatedAt: new Date().toISOString()
      } : b));
      
      toast.success('Blog post saved successfully');
    } catch (error) {
      console.error('Error saving blog post:', error);
      toast.error('Failed to save blog post');
    }
  };
  
  const handleCreateBlog = async () => {
    if (!newBlogData.title) {
      toast.error('Please enter a blog title');
      return;
    }
    
    try {
      const newSlug = newBlogData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
      
      // Create new blog post object
      const newBlog: CMSBlogPost = {
        id: '', // will be generated by saveBlogPost
        title: newBlogData.title,
        slug: newSlug,
        excerpt: newBlogData.excerpt || '',
        content: '',
        author: 'Brantley Davidson',
        status: 'draft',
        updatedAt: new Date().toISOString(),
        seo: {
          title: newBlogData.title,
          description: newBlogData.excerpt || '',
          ogType: 'article'
        }
      };
      
      // Save to Supabase using the cms-storage utility
      await saveBlogPost(newBlog);
      
      // Refresh the blog list
      const { data } = await supabase
        .from('cms_blog_posts')
        .select('*')
        .order('updated_at', { ascending: false });
      
      if (data) {
        // Transform the data to match our BlogPost interface
        const formattedBlogs: BlogPost[] = data.map(blog => {
          // Parse SEO data properly
          const seoData = typeof blog.seo === 'string' 
            ? JSON.parse(blog.seo) 
            : blog.seo as Record<string, any>;
          
          return {
            id: blog.id,
            title: blog.title || 'Untitled',
            slug: blog.slug,
            excerpt: blog.excerpt || '',
            author: blog.author || 'Brantley Davidson',
            status: blog.status as "published" | "draft",
            publishedAt: blog.published_at,
            updatedAt: blog.updated_at,
            content: blog.content || '',
            seo: seoData || {}
          };
        });
        
        setBlogs(formattedBlogs);
      }
      
      setNewBlogData({ title: "", excerpt: "" });
      setIsNewDialogOpen(false);
      
      toast.success('New blog post created successfully');
    } catch (error) {
      console.error('Error creating blog post:', error);
      toast.error('Failed to create blog post');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Blog Editor</h1>
          <p className="text-muted-foreground">
            Manage and edit your blog posts.
          </p>
        </div>
        <Button onClick={() => setIsNewDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          New Blog Post
        </Button>
      </div>
      
      <div className="grid grid-cols-12 gap-6">
        <Card className="col-span-12 md:col-span-5 lg:col-span-4">
          <CardHeader>
            <CardTitle>Blog Posts</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-2">
                {[1, 2, 3, 4, 5].map((item) => (
                  <Skeleton key={item} className="h-12 w-full" />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex justify-between text-sm font-medium text-muted-foreground px-2">
                  <span className="flex items-center">
                    Title <ArrowUpDown className="ml-1 h-3 w-3" />
                  </span>
                  <span>Status</span>
                </div>
                
                <ul className="space-y-1">
                  {blogs.map((blog) => (
                    <li key={blog.id}>
                      <Button
                        variant={selectedBlog === blog.id ? "default" : "ghost"}
                        className="w-full justify-start text-left"
                        onClick={() => handleSelectBlog(blog.id)}
                      >
                        <div className="w-full flex justify-between items-center">
                          <span className="truncate max-w-[70%]">{blog.title}</span>
                          <span className={`text-xs px-2 py-1 rounded ${
                            blog.status === "published" 
                              ? "bg-green-100 text-green-800" 
                              : "bg-amber-100 text-amber-800"
                          }`}>
                            {blog.status === "published" ? "Published" : "Draft"}
                          </span>
                        </div>
                      </Button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>
        
        <div className="col-span-12 md:col-span-7 lg:col-span-8 space-y-6">
          {selectedBlog ? (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>
                  Edit Blog Post
                </CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" asChild>
                    <a href={`/insights/${blogs.find(b => b.id === selectedBlog)?.slug}`} target="_blank" rel="noopener noreferrer">
                      <Eye className="mr-2 h-4 w-4" />
                      Preview
                    </a>
                  </Button>
                  <Button onClick={handleSaveBlog}>
                    <Save className="mr-2 h-4 w-4" />
                    Save
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-4 text-sm text-muted-foreground">
                  {blogs.find(b => b.id === selectedBlog)?.publishedAt && (
                    <div className="flex items-center">
                      <Calendar className="mr-1 h-4 w-4" />
                      <span>{new Date(blogs.find(b => b.id === selectedBlog)?.publishedAt || '').toLocaleDateString()}</span>
                    </div>
                  )}
                  <div className="flex items-center">
                    <Clock className="mr-1 h-4 w-4" />
                    <span>Last edited: {new Date(blogs.find(b => b.id === selectedBlog)?.updatedAt || '').toLocaleString()}</span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="title" className="text-sm font-medium">Title</label>
                    <Input 
                      id="title" 
                      value={title} 
                      onChange={(e) => setTitle(e.target.value)} 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="slug" className="text-sm font-medium">Slug</label>
                    <Input 
                      id="slug" 
                      value={slug} 
                      onChange={(e) => setSlug(e.target.value)} 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="author" className="text-sm font-medium">Author</label>
                    <Input 
                      id="author" 
                      value={author} 
                      onChange={(e) => setAuthor(e.target.value)} 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="status" className="text-sm font-medium">Status</label>
                    <select
                      id="status"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                      value={status}
                      onChange={(e) => setStatus(e.target.value as "published" | "draft")}
                    >
                      <option value="draft">Draft</option>
                      <option value="published">Published</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="excerpt" className="text-sm font-medium">Excerpt</label>
                    <Textarea 
                      id="excerpt" 
                      value={excerpt} 
                      onChange={(e) => setExcerpt(e.target.value)} 
                      rows={3}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="content" className="text-sm font-medium">Content</label>
                    <Textarea 
                      id="content" 
                      value={content} 
                      onChange={(e) => setContent(e.target.value)} 
                      rows={15}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="flex flex-col items-center justify-center h-full py-12 text-center space-y-4 border rounded-lg bg-muted/20">
              <div className="rounded-full bg-primary/10 p-4">
                <Edit className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-medium">Select a Blog Post</h3>
              <p className="text-muted-foreground max-w-md">
                Choose a blog post from the list on the left to edit its content, or create a new one.
              </p>
              <Button onClick={() => setIsNewDialogOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                New Blog Post
              </Button>
            </div>
          )}
        </div>
      </div>
      
      <DialogWithForm
        open={isNewDialogOpen}
        onOpenChange={setIsNewDialogOpen}
        title="Create New Blog Post"
        description="Enter the details for your new blog post."
        onSubmit={handleCreateBlog}
        submitText="Create Blog Post"
      >
        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <label htmlFor="newTitle" className="text-sm font-medium">Title</label>
            <Input 
              id="newTitle" 
              value={newBlogData.title} 
              onChange={(e) => setNewBlogData({...newBlogData, title: e.target.value})} 
              placeholder="Enter blog title"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="newExcerpt" className="text-sm font-medium">Excerpt</label>
            <Textarea 
              id="newExcerpt" 
              value={newBlogData.excerpt} 
              onChange={(e) => setNewBlogData({...newBlogData, excerpt: e.target.value})} 
              placeholder="Brief description of the blog post"
              rows={3}
            />
          </div>
        </div>
      </DialogWithForm>
    </div>
  );
};

export default BlogEditor;
