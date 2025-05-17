
import React, { useState, useEffect } from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { getMediaItemsByType } from "@/utils/cms-storage";
import { MediaItem } from "@/utils/cms-storage";

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
        // Fetch logos from CMS media with file type containing "active logos"
        const logos = await getMediaItemsByType('image');
        const activeLogs = logos.filter(logo => logo.title.toLowerCase().includes('active logo'));
        setAllPartners(activeLogs);
        // Initialize with the first set of logos
        setDisplayedPartners(activeLogs.slice(0, displayCount));
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
  const partners = isLoading || allPartners.length === 0 ? [
    { name: "American Commerce Bank", src: "https://via.placeholder.com/160x60?text=ACB", id: "1" },
    { name: "Humana", src: "https://via.placeholder.com/160x60?text=Humana", id: "2" },
    { name: "Service Master", src: "https://via.placeholder.com/160x60?text=ServiceMaster", id: "3" },
    { name: "Monesty", src: "https://via.placeholder.com/160x60?text=Monesty", id: "4" },
    { name: "Mutual of Omaha", src: "https://via.placeholder.com/160x60?text=MutualOfOmaha", id: "5" },
    { name: "Copperweld", src: "https://via.placeholder.com/160x60?text=Copperweld", id: "6" },
  ] : displayedPartners;

  return (
    <section className="py-12 bg-gray-50" aria-labelledby="partners-heading">
      <div className="container-custom">
        <h2 id="partners-heading" className="text-3xl font-semibold text-prometheus-navy text-center mb-8">
          Our Experience Is Proven
        </h2>
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
      </div>
    </section>
  );
};

export default AboutPartners;
