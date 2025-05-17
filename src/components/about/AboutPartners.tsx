
import React, { useState, useEffect } from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { getMediaItemsByType } from "@/utils/cms-storage";
import { MediaItem } from "@/utils/cms-storage";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

interface PartnerLogoProps {
  src: string;
  alt: string;
  className?: string;
  visible: boolean;
}

const PartnerLogo = ({ src, alt, className = "", visible }: PartnerLogoProps) => {
  const [imgError, setImgError] = useState(false);
  
  return (
    <div 
      className={`p-4 flex items-center justify-center ${className} transition-opacity duration-700 ${visible ? 'opacity-100' : 'opacity-0'}`} 
      aria-label={`Partner: ${alt}`}
    >
      <div className="w-full max-w-[160px]">
        <AspectRatio ratio={3/1} className="bg-white rounded-md">
          <div className="h-full w-full flex items-center justify-center p-3">
            <img 
              src={imgError ? "/logo-placeholder.svg" : src}
              alt={`${alt} logo - Prometheus Agency partner`}
              width="160" height="60"
              loading="lazy" decoding="async"
              className="max-h-full max-w-full object-contain grayscale hover:grayscale-0 transition-all opacity-80 hover:opacity-100"
              onError={(e) => {
                console.log(`Image load error for ${alt}:`, src);
                setImgError(true);
              }}
            />
          </div>
        </AspectRatio>
      </div>
    </div>
  );
};

// Static placeholder logos to use when no real logos are available
const placeholderPartners = [
  { name: "American Commerce Bank", src: "/logo-placeholder.svg", id: "1" },
  { name: "Humana", src: "/logo-placeholder.svg", id: "2" },
  { name: "Service Master", src: "/logo-placeholder.svg", id: "3" },
  { name: "Monesty", src: "/logo-placeholder.svg", id: "4" },
  { name: "Mutual of Omaha", src: "/logo-placeholder.svg", id: "5" },
  { name: "Copperweld", src: "/logo-placeholder.svg", id: "6" },
];

const AboutPartners = () => {
  const [allPartners, setAllPartners] = useState<MediaItem[]>([]);
  const [displayedPartners, setDisplayedPartners] = useState<MediaItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  
  // Number of logos to display at once
  const displayCount = 6;
  
  useEffect(() => {
    const fetchLogos = async () => {
      setIsLoading(true);
      setLoadError(null);
      
      try {
        // First try to get all images
        const allImages = await getMediaItemsByType('image');
        console.log("All fetched images from CMS:", allImages);
        
        if (allImages.length > 0) {
          // Use all available images for logos
          setAllPartners(allImages);
          setDisplayedPartners(allImages.slice(0, Math.min(displayCount, allImages.length)));
          console.log("Using all images as logos:", allImages);
        } else {
          console.log("No images found in CMS, using placeholders");
          setLoadError("No images found in CMS");
        }
      } catch (error) {
        console.error("Error fetching images:", error);
        setLoadError("Failed to load partner logos");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchLogos();
  }, []);
  
  useEffect(() => {
    if (allPartners.length <= displayCount) {
      // If we have fewer than displayCount logos, just show them all
      return;
    }
    
    // Rotate logos every 5 seconds
    const interval = setInterval(() => {
      setDisplayedPartners(prevPartners => {
        // Find the index of the first currently displayed partner
        const currentFirstIndex = allPartners.findIndex(p => p.id === prevPartners[0]?.id);
        
        // Calculate the next set of partners to display
        const nextIndex = (currentFirstIndex + 1) % allPartners.length;
        
        // Create a new array starting from nextIndex and wrapping around if needed
        const nextPartners = [];
        for (let i = 0; i < displayCount; i++) {
          const index = (nextIndex + i) % allPartners.length;
          nextPartners.push(allPartners[index]);
        }
        
        return nextPartners;
      });
    }, 5000);
    
    return () => clearInterval(interval);
  }, [allPartners, displayCount]);
  
  // Use placeholder partners if no real ones are available
  const partners = allPartners.length === 0 ? placeholderPartners : displayedPartners;
  
  // Display a toast if there was an error but only once
  useEffect(() => {
    if (loadError) {
      toast.error(loadError, {
        description: "Using placeholder logos instead"
      });
    }
  }, [loadError]);

  return (
    <section className="py-12 bg-gray-50" aria-labelledby="partners-heading">
      <div className="container-custom">
        <h2 id="partners-heading" className="text-3xl font-semibold text-prometheus-navy text-center mb-8">
          Our Experience Is Proven
        </h2>
        
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {Array(6).fill(0).map((_, index) => (
              <div key={index} className="p-4">
                <Skeleton className="h-16 w-full rounded-md" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
            {partners.map((partner, index) => (
              <PartnerLogo 
                key={partner.id || index}
                src={partner.url || partner.src}
                alt={partner.title || partner.name || `Partner ${index + 1}`}
                visible={true}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default AboutPartners;
