
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { Save, Eye, Image, FileText } from "lucide-react";

const PageEditor = () => {
  const [pages, setPages] = useState([
    { id: 1, title: "Home", slug: "/" },
    { id: 2, title: "B2B Services", slug: "/b2b" },
    { id: 3, title: "DTC Services", slug: "/dtc" },
    { id: 4, title: "Services", slug: "/services" },
    { id: 5, title: "AI Enablement", slug: "/services/ai-enablement" },
    { id: 6, title: "Consulting & GTM", slug: "/services/consulting-gtm" },
    // Add more pages as needed
  ]);
  
  const [selectedPage, setSelectedPage] = useState(1);
  const [heroTitle, setHeroTitle] = useState("Transform Technology Chaos into Strategic Growth");
  const [heroSubtitle, setHeroSubtitle] = useState("We help B2B and DTC businesses leverage AI and proven GTM strategies to drive growth.");
  const [mainContent, setMainContent] = useState("Welcome to Prometheus Agency...");
  
  const handleSavePage = () => {
    toast({
      title: "Page updated",
      description: `${pages.find(p => p.id === selectedPage)?.title} has been updated.`,
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Page Editor</h1>
        <p className="text-muted-foreground">
          Edit website pages and content.
        </p>
      </div>
      
      <div className="grid grid-cols-12 gap-6">
        <Card className="col-span-12 md:col-span-4 lg:col-span-3">
          <CardHeader>
            <CardTitle>Pages</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-1">
              {pages.map((page) => (
                <li key={page.id}>
                  <Button
                    variant={selectedPage === page.id ? "default" : "ghost"}
                    className="w-full justify-start text-left"
                    onClick={() => setSelectedPage(page.id)}
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    {page.title}
                  </Button>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        
        <div className="col-span-12 md:col-span-8 lg:col-span-9 space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>
                Editing: {pages.find(p => p.id === selectedPage)?.title}
              </CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" asChild>
                  <a href={pages.find(p => p.id === selectedPage)?.slug} target="_blank" rel="noopener noreferrer">
                    <Eye className="mr-2 h-4 w-4" />
                    Preview
                  </a>
                </Button>
                <Button onClick={handleSavePage}>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="content">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="content">Content</TabsTrigger>
                  <TabsTrigger value="media">Media & Components</TabsTrigger>
                </TabsList>
                
                <TabsContent value="content" className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <label htmlFor="heroTitle" className="text-sm font-medium">Hero Title</label>
                    <Input 
                      id="heroTitle" 
                      value={heroTitle} 
                      onChange={(e) => setHeroTitle(e.target.value)} 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="heroSubtitle" className="text-sm font-medium">Hero Subtitle</label>
                    <Input 
                      id="heroSubtitle" 
                      value={heroSubtitle} 
                      onChange={(e) => setHeroSubtitle(e.target.value)} 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="mainContent" className="text-sm font-medium">Main Content</label>
                    <Textarea 
                      id="mainContent" 
                      value={mainContent} 
                      onChange={(e) => setMainContent(e.target.value)} 
                      rows={10}
                    />
                  </div>
                </TabsContent>
                
                <TabsContent value="media" className="space-y-4 mt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex flex-col items-center text-center gap-2">
                          <Image className="h-12 w-12 text-muted-foreground" />
                          <h3 className="font-medium">Hero Background</h3>
                          <p className="text-sm text-muted-foreground">1920x1080px recommended</p>
                          <Button variant="outline" size="sm">Change Image</Button>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex flex-col items-center text-center gap-2">
                          <Image className="h-12 w-12 text-muted-foreground" />
                          <h3 className="font-medium">Featured Image</h3>
                          <p className="text-sm text-muted-foreground">800x600px recommended</p>
                          <Button variant="outline" size="sm">Change Image</Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Page Components</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        Drag and drop components to rearrange them on the page.
                      </p>
                      <ul className="space-y-2">
                        <li className="border rounded p-3 cursor-move flex justify-between">
                          <span className="font-medium">Hero Section</span>
                          <span className="text-sm text-muted-foreground">Required</span>
                        </li>
                        <li className="border rounded p-3 cursor-move">
                          <span className="font-medium">Services Grid</span>
                        </li>
                        <li className="border rounded p-3 cursor-move">
                          <span className="font-medium">Testimonials</span>
                        </li>
                        <li className="border rounded p-3 cursor-move">
                          <span className="font-medium">CTA Banner</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PageEditor;
