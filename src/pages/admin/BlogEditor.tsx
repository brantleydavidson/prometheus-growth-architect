import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { DialogWithForm } from "@/components/cms/DialogWithForm";
import { Save, Plus, Clock, Calendar, Eye, ArrowUpDown, Edit, Trash2 } from "lucide-react";

const BlogEditor = () => {
  const [blogs, setBlogs] = useState([
    { 
      id: 1, 
      title: "CRM Consulting Services in Conway, AR", 
      slug: "crm-consulting-services-in-conway-ar",
      excerpt: "Expert CRM consulting services for Conway businesses looking to improve sales efficiency and customer relationships.", 
      author: "Brantley Davidson",
      status: "published",
      date: "2025-05-13"
    },
    { 
      id: 2, 
      title: "Implementing AI for Small Businesses: A Guide", 
      slug: "implementing-ai-for-small-businesses-guide",
      excerpt: "Learn how small businesses can leverage AI technology without breaking the bank.", 
      author: "Alex Johnson",
      status: "draft",
      date: "2023-11-15"
    },
    { 
      id: 3, 
      title: "Salesforce CRM Integration In Jackson MS", 
      slug: "salesforce-crm-integration-in-jackson-ms",
      excerpt: "Understand how Salesforce CRM integration can transform businesses in Jackson, Mississippi by improving customer relationships and streamlining operations.", 
      author: "Brantley Davidson",
      status: "published",
      date: "2025-05-15"
    },
    {
      id: 4,
      title: "CRM Audit Services In Jackson MS",
      slug: "crm-audit-services-in-jackson-ms",
      excerpt: "Understand the importance of regular CRM audits for businesses in Jackson, MS and how they can enhance operational efficiency and customer relationships.",
      author: "Brantley Davidson",
      status: "published",
      date: "2025-05-16"
    },
    {
      id: 5,
      title: "HubSpot Agency Partner In Conway AR",
      slug: "hubspot-agency-partner-in-conway-ar",
      excerpt: "Discover how partnering with a local HubSpot agency in Conway, AR can transform your digital marketing strategy and drive business growth.",
      author: "Brantley Davidson",
      status: "published",
      date: "2025-05-17"
    },
    {
      id: 6,
      title: "CRM For Real Estate Agents In Little Rock AR",
      slug: "crm-for-real-estate-agents-in-little-rock-ar",
      excerpt: "Learn how real estate agents in Little Rock can leverage CRM technology to manage client relationships, streamline operations, and boost sales efficiency.",
      author: "Brantley Davidson",
      status: "published",
      date: "2025-05-18"
    }
    // Add more blogs as needed
  ]);
  
  const [selectedBlog, setSelectedBlog] = useState<number | null>(null);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [isNewDialogOpen, setIsNewDialogOpen] = useState(false);
  const [newBlogData, setNewBlogData] = useState({
    title: "",
    excerpt: "",
  });
  
  const handleSelectBlog = (id: number) => {
    setSelectedBlog(id);
    
    // In a real app, fetch the blog details from an API
    const blog = blogs.find(b => b.id === id);
    if (blog) {
      setTitle(blog.title);
      setSlug(blog.slug);
      setExcerpt(blog.excerpt);
      setContent("This is the detailed content of the blog post. In a real CMS, this would be loaded from the database or API when selecting a blog post to edit.");
    }
  };
  
  const handleSaveBlog = () => {
    if (!selectedBlog) return;
    
    // In a real app, save to a database or API
    toast({
      title: "Blog post saved",
      description: "Your changes have been saved successfully.",
    });
  };
  
  const handleCreateBlog = () => {
    if (!newBlogData.title) {
      toast({
        title: "Error",
        description: "Please enter a blog title.",
        variant: "destructive",
      });
      return;
    }
    
    const newSlug = newBlogData.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
    
    const newBlog = {
      id: blogs.length + 1,
      title: newBlogData.title,
      slug: newSlug,
      excerpt: newBlogData.excerpt,
      author: "Current User",
      status: "draft",
      date: new Date().toISOString().split("T")[0],
    };
    
    setBlogs([...blogs, newBlog]);
    setNewBlogData({ title: "", excerpt: "" });
    setIsNewDialogOpen(false);
    
    toast({
      title: "Blog created",
      description: "New blog post has been created as a draft.",
    });
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
                  <div className="flex items-center">
                    <Calendar className="mr-1 h-4 w-4" />
                    <span>{blogs.find(b => b.id === selectedBlog)?.date}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="mr-1 h-4 w-4" />
                    <span>Last edited: 2 hours ago</span>
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
