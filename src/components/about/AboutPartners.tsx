import React, { useState, useEffect } from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Skeleton } from "@/components/ui/skeleton";
import OptimizedImage from '@/components/common/OptimizedImage';
import { supabase } from "@/integrations/supabase/client";

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
            <OptimizedImage
              src={imgError ? "/lovable-uploads/f90ef8a0-a3ab-4689-97d1-fad07e16b477.png" : src}
              alt={`${alt} logo - Prometheus Agency partner`}
              width={200}
              height={67}
              aspectRatio={3}
              sizes="(max-width: 640px) 120px, 160px"
              className="max-h-full max-w-full object-contain grayscale hover:grayscale-0 transition-all opacity-80 hover:opacity-100"
              onError={() => setImgError(true)}
              objectFit="contain"
            />
          </div>
        </AspectRatio>
      </div>
    </div>
  );
};

const AboutPartners = () => {
  const [allLogos, setAllLogos] = useState<any[]>([]);
  const [displayedLogos, setDisplayedLogos] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [visibleLogos, setVisibleLogos] = useState<boolean[]>(new Array(6).fill(true));
  
  // Number of logos to display at once
  const displayCount = 6;
  // How often to rotate logos (in milliseconds)
  const rotationInterval = 4000;

  useEffect(() => {
    const fetchLogos = async () => {
      try {
        const { data, error } = await supabase.storage
          .from('cms_media')
          .list('Active Client Logos', { 
            limit: 100,
            offset: 0,
            sortBy: { column: 'name', order: 'asc' }
          });

        if (error) throw error;

        const logos = await Promise.all(
          (data || []).map(async (file) => {
            const { data: { publicUrl } } = supabase.storage
              .from('cms_media')
              .getPublicUrl(`Active Client Logos/${file.name}`);
            
            return {
              name: file.name,
              url: publicUrl,
              title: file.name.replace(/\.[^/.]+$/, "").replace(/-/g, " ")
            };
          })
        );

        setAllLogos(logos);
        setDisplayedLogos(logos.slice(0, displayCount));
        setVisibleLogos(new Array(displayCount).fill(true));
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching logos:', error);
        setIsLoading(false);
      }
    };

    fetchLogos();
  }, []);

  useEffect(() => {
    if (allLogos.length <= displayCount) return;

    const rotateLogo = async () => {
      // Randomly select which logo to replace
      const indexToReplace = Math.floor(Math.random() * displayCount);
      
      // Make the logo invisible
      setVisibleLogos(prev => {
        const newState = [...prev];
        newState[indexToReplace] = false;
        return newState;
      });

      // Wait for fade out
      await new Promise(resolve => setTimeout(resolve, 700));

      // Get a new logo that's not currently displayed
      const currentIds = displayedLogos.map(logo => logo.name);
      const availableLogos = allLogos.filter(logo => !currentIds.includes(logo.name));
      
      if (availableLogos.length > 0) {
        const newLogo = availableLogos[Math.floor(Math.random() * availableLogos.length)];

        // Replace the logo
        setDisplayedLogos(prev => {
          const newLogos = [...prev];
          newLogos[indexToReplace] = newLogo;
          return newLogos;
        });

        // Make the new logo visible
        setVisibleLogos(prev => {
          const newState = [...prev];
          newState[indexToReplace] = true;
          return newState;
        });
      }
    };

    const interval = setInterval(rotateLogo, rotationInterval);
    return () => clearInterval(interval);
  }, [allLogos, displayedLogos]);

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
            {displayedLogos.map((logo, index) => (
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
