import React, { useState, useEffect } from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Skeleton } from "@/components/ui/skeleton";
import OptimizedImage from '@/components/common/OptimizedImage';

// Hardcoded partner logos - using placeholder for now
const PARTNER_LOGOS = [
  { 
    name: "hubspot", 
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/HubSpot_Logo.svg/320px-HubSpot_Logo.svg.png", 
    title: "HubSpot" 
  },
  { 
    name: "salesforce", 
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Salesforce.com_logo.svg/320px-Salesforce.com_logo.svg.png", 
    title: "Salesforce" 
  },
  { 
    name: "microsoft", 
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Microsoft_logo_%282012%29.svg/320px-Microsoft_logo_%282012%29.svg.png", 
    title: "Microsoft" 
  },
  { 
    name: "google", 
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/120px-Google_%22G%22_logo.svg.png", 
    title: "Google Cloud" 
  },
  { 
    name: "aws", 
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Amazon_Web_Services_Logo.svg/320px-Amazon_Web_Services_Logo.svg.png", 
    title: "Amazon Web Services" 
  },
  { 
    name: "adobe", 
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Adobe_Corporate_Logo.svg/200px-Adobe_Corporate_Logo.svg.png", 
    title: "Adobe" 
  },
];

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
        <AspectRatio ratio={3/1} className="bg-gray-100 rounded-md">
          <div className="h-full w-full flex items-center justify-center p-3">
            <img
              src={imgError ? "/lovable-uploads/f90ef8a0-a3ab-4689-97d1-fad07e16b477.png" : src}
              alt={`${alt} logo - Prometheus Agency partner`}
              className="max-h-full max-w-full object-contain transition-all opacity-90 hover:opacity-100"
              onError={() => setImgError(true)}
            />
          </div>
        </AspectRatio>
      </div>
    </div>
  );
};

const AboutPartners = () => {
  const [displayedLogos, setDisplayedLogos] = useState<any[]>(PARTNER_LOGOS);
  const [isLoading, setIsLoading] = useState(false);
  const [visibleLogos, setVisibleLogos] = useState<boolean[]>(new Array(6).fill(true));
  
  // Number of logos to display at once
  const displayCount = 6;
  // How often to rotate logos (in milliseconds)
  const rotationInterval = 4000;

  useEffect(() => {
    // Simple rotation effect - cycle through logos
    const interval = setInterval(() => {
      setDisplayedLogos(prev => {
        const first = prev[0];
        const rest = prev.slice(1);
        return [...rest, first];
      });
    }, rotationInterval);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-12 bg-gray-50" aria-labelledby="partners-heading">
      <div className="container-custom">
        <h2 id="partners-heading" className="text-3xl font-semibold text-prometheus-navy text-center mb-8">
          Our Experience Is Proven
        </h2>
        
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {Array(displayCount).fill(0).map((_, index) => (
              <div key={index} className="p-4">
                <Skeleton className="h-16 w-full rounded-md" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
            {displayedLogos.slice(0, displayCount).map((logo, index) => (
              <PartnerLogo 
                key={`${logo.name}-${index}`}
                src={logo.url}
                alt={logo.title}
                visible={visibleLogos[index]}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default AboutPartners;
