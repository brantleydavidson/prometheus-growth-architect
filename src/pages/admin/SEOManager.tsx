
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { PlusCircle, Trash2, Save } from "lucide-react";

const SEOManager = () => {
  const [pageTitle, setPageTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [canonicalUrl, setCanonicalUrl] = useState("");
  const [ogType, setOgType] = useState("website");
  const [ogImage, setOgImage] = useState("");
  const [selectedPage, setSelectedPage] = useState("/");
  
  const [faqs, setFaqs] = useState([
    { question: "What are AI enablement services?", answer: "AI enablement services help businesses integrate artificial intelligence into their operations to improve efficiency and decision-making." }
  ]);
  
  const pages = [
    { title: "Home", path: "/" },
    { title: "B2B Services", path: "/b2b" },
    { title: "DTC Services", path: "/dtc" },
    { title: "Services Overview", path: "/services" },
    { title: "AI Enablement", path: "/services/ai-enablement" },
    { title: "Consulting & GTM", path: "/services/consulting-gtm" },
    { title: "AI Quotient", path: "/ai-quotient" },
    { title: "Insights", path: "/insights" },
    { title: "CRM Consulting (Conway, AR)", path: "/insights/crm-consulting-services-in-conway-ar" },
  ];
  
  const handlePageChange = (path: string) => {
    setSelectedPage(path);
    
    // In a real application, this would fetch data from an API
    if (path === "/") {
      setPageTitle("Prometheus Agency - AI Enablement and GTM Strategy");
      setMetaDescription("We help B2B and DTC businesses transform technology chaos into strategic growth engines with AI enablement and proven GTM strategies.");
      setCanonicalUrl("https://prometheusagency.co");
      setOgType("website");
      setOgImage("https://prometheusagency.co/opengraph-image.png");
      setFaqs([
        { question: "What services does Prometheus Agency offer?", answer: "Prometheus Agency offers AI enablement, GTM strategy, CRM consulting, and digital transformation services." },
        { question: "How can AI help my business grow?", answer: "AI can automate repetitive tasks, provide deeper customer insights, and optimize operations to drive growth and efficiency." }
      ]);
    } else if (path === "/services/ai-enablement") {
      setPageTitle("AI Enablement Services - Prometheus Agency");
      setMetaDescription("Transform your business operations with our AI implementation services. We help you select, integrate and optimize AI solutions for maximum ROI.");
      setCanonicalUrl("https://prometheusagency.co/services/ai-enablement");
      setOgType("website");
      setOgImage("https://prometheusagency.co/images/ai-enablement.png");
      setFaqs([
        { question: "What is AI enablement?", answer: "AI enablement is the process of integrating artificial intelligence technologies into your business operations to improve efficiency, automation, and decision-making." },
        { question: "How long does AI implementation take?", answer: "The timeline for AI implementation varies based on complexity but typically ranges from 2-6 months for initial deployment and optimization." }
      ]);
    }
  };
  
  const handleAddFaq = () => {
    setFaqs([...faqs, { question: "", answer: "" }]);
  };
  
  const handleRemoveFaq = (index: number) => {
    const newFaqs = [...faqs];
    newFaqs.splice(index, 1);
    setFaqs(newFaqs);
  };
  
  const handleFaqChange = (index: number, field: string, value: string) => {
    const newFaqs = [...faqs];
    newFaqs[index] = { ...newFaqs[index], [field]: value };
    setFaqs(newFaqs);
  };
  
  const handleSaveSeo = () => {
    // In a real application, this would save to a database or API
    toast({
      title: "SEO settings saved",
      description: `Updated SEO for ${selectedPage}`,
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">SEO Manager</h1>
        <p className="text-muted-foreground">
          Optimize your website content for search engines.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <Card className="col-span-1 md:col-span-4">
          <CardHeader>
            <CardTitle>Pages</CardTitle>
            <CardDescription>
              Select a page to edit its SEO settings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-1">
              {pages.map((page) => (
                <li key={page.path}>
                  <Button
                    variant={selectedPage === page.path ? "default" : "ghost"}
                    className="w-full justify-start text-left"
                    onClick={() => handlePageChange(page.path)}
                  >
                    {page.title}
                  </Button>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        
        <div className="col-span-1 md:col-span-8 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>
                SEO Settings for {pages.find(p => p.path === selectedPage)?.title || selectedPage}
              </CardTitle>
              <CardDescription>
                Edit metadata and structured data for this page
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="basic">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="basic">Basic SEO</TabsTrigger>
                  <TabsTrigger value="opengraph">Open Graph</TabsTrigger>
                  <TabsTrigger value="schema">Schema & FAQ</TabsTrigger>
                </TabsList>
                
                <TabsContent value="basic" className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <label htmlFor="pageTitle" className="text-sm font-medium">Page Title</label>
                    <Input 
                      id="pageTitle" 
                      value={pageTitle} 
                      onChange={(e) => setPageTitle(e.target.value)} 
                      placeholder="Page Title (55-60 characters ideal)"
                      maxLength={70}
                    />
                    <div className="text-xs text-muted-foreground text-right">
                      {pageTitle.length}/70 characters
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="metaDescription" className="text-sm font-medium">Meta Description</label>
                    <Textarea 
                      id="metaDescription" 
                      value={metaDescription} 
                      onChange={(e) => setMetaDescription(e.target.value)} 
                      placeholder="Meta description (150-160 characters ideal)"
                      maxLength={160}
                    />
                    <div className="text-xs text-muted-foreground text-right">
                      {metaDescription.length}/160 characters
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="canonical" className="text-sm font-medium">Canonical URL</label>
                    <Input 
                      id="canonical" 
                      value={canonicalUrl} 
                      onChange={(e) => setCanonicalUrl(e.target.value)} 
                      placeholder="https://prometheusagency.co/your-page"
                    />
                  </div>
                </TabsContent>
                
                <TabsContent value="opengraph" className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <label htmlFor="ogType" className="text-sm font-medium">OG Type</label>
                    <select
                      id="ogType"
                      value={ogType}
                      onChange={(e) => setOgType(e.target.value)}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                    >
                      <option value="website">Website</option>
                      <option value="article">Article</option>
                      <option value="profile">Profile</option>
                      <option value="service">Service</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="ogImage" className="text-sm font-medium">OG Image URL</label>
                    <Input 
                      id="ogImage" 
                      value={ogImage} 
                      onChange={(e) => setOgImage(e.target.value)} 
                      placeholder="https://prometheusagency.co/images/your-image.png"
                    />
                  </div>
                  
                  <div className="pt-2">
                    <p className="text-sm text-muted-foreground">
                      Open Graph tags help control how your content appears when shared on social media platforms like LinkedIn, Twitter, and Facebook.
                    </p>
                  </div>
                </TabsContent>
                
                <TabsContent value="schema" className="space-y-4 mt-4">
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-medium">FAQ Schema</h3>
                      <Button variant="outline" size="sm" onClick={handleAddFaq}>
                        <PlusCircle className="h-4 w-4 mr-1" />
                        Add Question
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Adding FAQ schema can help your page appear in search results with expandable questions and answers.
                    </p>
                  </div>
                  
                  {faqs.map((faq, index) => (
                    <div key={index} className="border rounded-lg p-4 space-y-3">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium">Question {index + 1}</h4>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleRemoveFaq(index)}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                      
                      <div className="space-y-2">
                        <Input 
                          value={faq.question} 
                          onChange={(e) => handleFaqChange(index, 'question', e.target.value)} 
                          placeholder="FAQ Question"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Textarea 
                          value={faq.answer} 
                          onChange={(e) => handleFaqChange(index, 'answer', e.target.value)} 
                          placeholder="FAQ Answer"
                          rows={3}
                        />
                      </div>
                    </div>
                  ))}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
          
          <div className="flex justify-end">
            <Button onClick={handleSaveSeo}>
              <Save className="h-4 w-4 mr-2" />
              Save SEO Settings
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SEOManager;
