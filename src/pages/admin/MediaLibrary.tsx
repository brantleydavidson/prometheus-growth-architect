
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Skeleton } from "@/components/ui/skeleton";
import { Clipboard, Upload, Search, Trash2, Check } from "lucide-react";

const MediaLibrary = () => {
  const [activeTab, setActiveTab] = useState("images");
  const [searchQuery, setSearchQuery] = useState("");
  const [uploading, setUploading] = useState(false);
  
  // Mock media items
  const mediaItems = [
    {
      id: 1,
      type: "image",
      title: "Hero Background",
      url: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
      dimensions: "1920x1080",
      size: "284 KB",
      uploadedAt: "2023-10-15",
    },
    {
      id: 2,
      type: "image",
      title: "Team Photo",
      url: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
      dimensions: "1200x800",
      size: "156 KB",
      uploadedAt: "2023-09-22",
    },
    {
      id: 3,
      type: "image",
      title: "Service Illustration",
      url: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
      dimensions: "800x600",
      size: "98 KB",
      uploadedAt: "2023-11-03",
    },
    // Add more mock items as needed
  ];
  
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    setUploading(true);
    
    // Simulate upload process
    setTimeout(() => {
      setUploading(false);
      toast({
        title: "Upload complete",
        description: `${files.length} file(s) uploaded successfully.`,
      });
      
      // Reset the input
      e.target.value = "";
    }, 2000);
  };
  
  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    toast({
      title: "URL copied",
      description: "Image URL copied to clipboard.",
    });
  };
  
  const filteredMedia = mediaItems.filter(
    item => 
      (activeTab === "all" || item.type === activeTab) &&
      (searchQuery === "" || item.title.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Media Library</h1>
        <p className="text-muted-foreground">
          Manage and upload images and files for your website.
        </p>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search media..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2">
          <Input
            type="file"
            id="file-upload"
            className="hidden"
            accept="image/*"
            multiple
            onChange={handleFileUpload}
          />
          <Button 
            variant="outline"
            disabled={uploading}
            onClick={() => document.getElementById("file-upload")?.click()}
          >
            {uploading ? (
              <>
                <Skeleton className="h-5 w-5 rounded-full animate-spin mr-2" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="h-4 w-4 mr-2" />
                Upload Files
              </>
            )}
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All Media</TabsTrigger>
          <TabsTrigger value="image">Images</TabsTrigger>
          <TabsTrigger value="document">Documents</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-4">
          <MediaGrid items={filteredMedia} onCopyUrl={handleCopyUrl} />
        </TabsContent>
        
        <TabsContent value="image" className="mt-4">
          <MediaGrid 
            items={filteredMedia.filter(item => item.type === "image")} 
            onCopyUrl={handleCopyUrl} 
          />
        </TabsContent>
        
        <TabsContent value="document" className="mt-4">
          <MediaGrid 
            items={filteredMedia.filter(item => item.type === "document")} 
            onCopyUrl={handleCopyUrl} 
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

interface MediaGridProps {
  items: any[];
  onCopyUrl: (url: string) => void;
}

const MediaGrid = ({ items, onCopyUrl }: MediaGridProps) => {
  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No media items found.</p>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {items.map((item) => (
        <Card key={item.id} className="overflow-hidden">
          <div className="relative">
            <AspectRatio ratio={16/9}>
              <img 
                src={item.url} 
                alt={item.title} 
                className="object-cover w-full h-full" 
              />
            </AspectRatio>
            <div className="absolute top-2 right-2 flex gap-1">
              <Button 
                variant="secondary" 
                size="icon" 
                className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm"
                onClick={() => onCopyUrl(item.url)}
              >
                <Clipboard className="h-4 w-4" />
              </Button>
              <Button 
                variant="destructive" 
                size="icon" 
                className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <CardContent className="p-3">
            <div className="text-sm font-medium truncate" title={item.title}>
              {item.title}
            </div>
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>{item.dimensions}</span>
              <span>{item.size}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default MediaLibrary;
