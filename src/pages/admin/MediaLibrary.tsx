
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Skeleton } from "@/components/ui/skeleton";
import { Clipboard, Upload, Search, Trash2, Check } from "lucide-react";
import { getMediaItems, deleteMediaItem, uploadMediaFile, saveMediaItem, MediaItem } from "@/utils/cms-storage";
import { v4 as uuidv4 } from 'uuid';

const MediaLibrary = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [uploading, setUploading] = useState(false);
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchMedia = async () => {
      setLoading(true);
      try {
        const items = await getMediaItems();
        setMediaItems(items);
      } catch (error) {
        console.error('Error fetching media:', error);
        toast({
          title: "Error",
          description: "Failed to load media items",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchMedia();
  }, []);
  
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    setUploading(true);
    let uploadedCount = 0;
    const newMediaItems: MediaItem[] = [];
    
    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const fileUrl = await uploadMediaFile(file);
        
        if (fileUrl) {
          const fileType = file.type.split('/')[0]; // e.g., "image", "video"
          const fileSize = formatFileSize(file.size);
          
          let dimensions = '';
          if (fileType === 'image') {
            dimensions = await getImageDimensions(file);
          }
          
          const mediaItem: MediaItem = {
            id: uuidv4(),
            title: file.name,
            fileType: fileType,
            url: fileUrl,
            size: fileSize,
            dimensions: dimensions,
            alt: file.name.replace(/\.[^/.]+$/, ""), // Use filename without extension as default alt
            uploadedAt: new Date().toISOString(),
          };
          
          await saveMediaItem(mediaItem);
          newMediaItems.push(mediaItem);
          uploadedCount++;
        }
      }
      
      setMediaItems(prev => [...newMediaItems, ...prev]);
      
      toast({
        title: "Upload complete",
        description: `${uploadedCount} file(s) uploaded successfully.`,
      });
    } catch (error) {
      console.error('Error uploading files:', error);
      toast({
        title: "Upload failed",
        description: "There was an error uploading some files.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
      // Reset the input
      e.target.value = "";
    }
  };
  
  const handleDeleteMedia = async (id: string) => {
    try {
      await deleteMediaItem(id);
      setMediaItems(prev => prev.filter(item => item.id !== id));
      toast({
        title: "Media deleted",
        description: "Media item deleted successfully.",
      });
    } catch (error) {
      console.error('Error deleting media:', error);
      toast({
        title: "Delete failed",
        description: "There was an error deleting the media item.",
        variant: "destructive",
      });
    }
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
      (activeTab === "all" || item.fileType === activeTab) &&
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
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" aria-hidden="true" />
          <Input
            placeholder="Search media..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search media files"
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
            aria-label="Upload files"
          />
          <Button 
            variant="outline"
            disabled={uploading}
            onClick={() => document.getElementById("file-upload")?.click()}
            aria-busy={uploading}
          >
            {uploading ? (
              <>
                <Skeleton className="h-5 w-5 rounded-full animate-spin mr-2" aria-hidden="true" />
                <span>Uploading...</span>
              </>
            ) : (
              <>
                <Upload className="h-4 w-4 mr-2" aria-hidden="true" />
                <span>Upload Files</span>
              </>
            )}
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList aria-label="Filter media by type">
          <TabsTrigger value="all">All Media</TabsTrigger>
          <TabsTrigger value="image">Images</TabsTrigger>
          <TabsTrigger value="document">Documents</TabsTrigger>
        </TabsList>
        
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4" aria-live="polite" aria-busy="true">
            {Array(4).fill(0).map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <AspectRatio ratio={16/9}>
                  <Skeleton className="w-full h-full" />
                </AspectRatio>
                <CardContent className="p-3">
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-3 w-2/3" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <>
            <TabsContent value="all" className="mt-4">
              <MediaGrid 
                items={filteredMedia} 
                onCopyUrl={handleCopyUrl} 
                onDelete={handleDeleteMedia} 
              />
            </TabsContent>
            
            <TabsContent value="image" className="mt-4">
              <MediaGrid 
                items={filteredMedia.filter(item => item.fileType === "image")} 
                onCopyUrl={handleCopyUrl} 
                onDelete={handleDeleteMedia} 
              />
            </TabsContent>
            
            <TabsContent value="document" className="mt-4">
              <MediaGrid 
                items={filteredMedia.filter(item => item.fileType === "document" || item.fileType === "application")} 
                onCopyUrl={handleCopyUrl} 
                onDelete={handleDeleteMedia} 
              />
            </TabsContent>
          </>
        )}
      </Tabs>
    </div>
  );
};

interface MediaGridProps {
  items: MediaItem[];
  onCopyUrl: (url: string) => void;
  onDelete: (id: string) => void;
}

const MediaGrid = ({ items, onCopyUrl, onDelete }: MediaGridProps) => {
  if (items.length === 0) {
    return (
      <div className="text-center py-12" aria-live="polite">
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
              {item.fileType === "image" ? (
                <img 
                  src={item.url} 
                  alt={item.alt || item.title} 
                  className="object-cover w-full h-full" 
                />
              ) : (
                <div className="flex items-center justify-center w-full h-full bg-muted">
                  <FileIcon fileType={item.fileType} />
                </div>
              )}
            </AspectRatio>
            <div className="absolute top-2 right-2 flex gap-1">
              <Button 
                variant="secondary" 
                size="icon" 
                className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm"
                onClick={() => onCopyUrl(item.url)}
                title="Copy URL"
                aria-label={`Copy URL for ${item.title}`}
              >
                <Clipboard className="h-4 w-4" aria-hidden="true" />
              </Button>
              <Button 
                variant="destructive" 
                size="icon" 
                className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm"
                onClick={() => onDelete(item.id)}
                title="Delete"
                aria-label={`Delete ${item.title}`}
              >
                <Trash2 className="h-4 w-4" aria-hidden="true" />
              </Button>
            </div>
          </div>
          <CardContent className="p-3">
            <div className="text-sm font-medium truncate" title={item.title}>
              {item.title}
            </div>
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>{item.dimensions || '-'}</span>
              <span>{item.size}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

const FileIcon = ({ fileType }: { fileType: string }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="h-12 w-12 bg-primary/10 flex items-center justify-center rounded" role="img" aria-label={`${fileType} file`}>
        <span className="text-xs font-bold uppercase">{fileType.slice(0, 3)}</span>
      </div>
    </div>
  );
};

// Helper function to format file size
const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// Helper function to get image dimensions
const getImageDimensions = (file: File): Promise<string> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      resolve(`${img.width}x${img.height}`);
      URL.revokeObjectURL(img.src);
    };
    img.onerror = () => {
      resolve('');
      URL.revokeObjectURL(img.src);
    };
    img.src = URL.createObjectURL(file);
  });
};

export default MediaLibrary;
