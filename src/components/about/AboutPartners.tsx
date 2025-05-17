
import React, { useState, useEffect } from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { getMediaItemsByType } from "@/utils/cms-storage";
import { MediaItem } from "@/utils/cms-storage";
import { Skeleton } from "@/components/ui/skeleton";

interface PartnerLogoProps {
  src: string;
  alt: string;
  className?: string;
  visible: boolean;
}

const PartnerLogo = ({ src, alt, className = "", visible }: PartnerLogoProps) => {
  return (
    <div 
      className={`p-4 flex items-center justify-center ${className} transition-opacity duration-700 ${visible ? 'opacity-100' : 'opacity-0'}`} 
      aria-label={`Partner: ${alt}`}
    >
      <div className="w-full max-w-[160px]">
        <AspectRatio ratio={3/1} className="bg-white rounded-md">
          <div className="h-full w-full flex items-center justify-center p-3">
            <img 
              src={src} 
              alt={`${alt} logo - Prometheus Agency partner`}
              width="160" height="60"
              loading="lazy" decoding="async"
              className="max-h-full max-w-full object-contain grayscale hover:grayscale-0 transition-all opacity-80 hover:opacity-100"
              onError={(e) => {
                // Fallback to placeholder if image fails to load
                e.currentTarget.src = "https://placehold.co/160x60/gray/white?text=PARTNER";
              }}
            />
          </div>
        </AspectRatio>
      </div>
    </div>
  );
};

const AboutPartners = () => {
  const [allPartners, setAllPartners] = useState<MediaItem[]>([]);
  const [displayedPartners, setDisplayedPartners] = useState<MediaItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Number of logos to display at once
  const displayCount = 6;
  
  useEffect(() => {
    const fetchLogos = async () => {
      try {
        // Fetch all image type media items
        const logos = await getMediaItemsByType('image');
        
        // Specifically look for 'active logo' in the title (case insensitive)
        const activeLogos = logos.filter(logo => 
          logo.title && 
          logo.title.toLowerCase().includes('active logo')
        );
        
        console.log("Found active logos:", activeLogos);
        
        if (activeLogos.length > 0) {
          setAllPartners(activeLogos);
          // Initialize with the first set of logos
          setDisplayedPartners(activeLogos.slice(0, Math.min(displayCount, activeLogos.length)));
        } else {
          console.log("No active logos found, using placeholders");
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching logos:", error);
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
  }, [allPartners]);
  
  // Fallback to placeholder logos if no logos are available or while loading
  const placeholderPartners = [
    { name: "American Commerce Bank", src: "https://placehold.co/160x60/gray/white?text=ACB", id: "1" },
    { name: "Humana", src: "https://placehold.co/160x60/gray/white?text=HUMANA", id: "2" },
    { name: "Service Master", src: "https://placehold.co/160x60/gray/white?text=SERVICEMASTER", id: "3" },
    { name: "Monesty", src: "https://placehold.co/160x60/gray/white?text=MONESTY", id: "4" },
    { name: "Mutual of Omaha", src: "https://placehold.co/160x60/gray/white?text=MUTUAL", id: "5" },
    { name: "Copperweld", src: "https://placehold.co/160x60/gray/white?text=COPPERWELD", id: "6" },
  ];
  
  const partners = allPartners.length === 0 ? placeholderPartners : displayedPartners;

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
                alt={partner.title || partner.name}
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
