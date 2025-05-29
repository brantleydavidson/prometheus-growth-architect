import React, { useState, useEffect } from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Skeleton } from "@/components/ui/skeleton";

// Static partner data - no external dependencies
const STATIC_PARTNERS = [
  { name: "Partner 1", id: "partner1" },
  { name: "Partner 2", id: "partner2" },
  { name: "Partner 3", id: "partner3" },
  { name: "Partner 4", id: "partner4" },
  { name: "Partner 5", id: "partner5" },
  { name: "Partner 6", id: "partner6" },
  { name: "Partner 7", id: "partner7" },
  { name: "Partner 8", id: "partner8" },
  { name: "Partner 9", id: "partner9" },
  { name: "Partner 10", id: "partner10" },
  { name: "Partner 11", id: "partner11" },
  { name: "Partner 12", id: "partner12" },
];

interface PartnerLogoProps {
  name: string;
  visible: boolean;
}

const PartnerLogo = ({ name, visible }: PartnerLogoProps) => {
  return (
    <div 
      className={`p-4 flex items-center justify-center transition-opacity duration-700 ${visible ? 'opacity-100' : 'opacity-0'}`} 
      aria-label={`Partner: ${name}`}
    >
      <div className="w-full max-w-[160px]">
        <AspectRatio ratio={3/1} className="bg-gray-100 rounded-md">
          <div className="h-full w-full flex items-center justify-center p-3">
            <img
              src="/lovable-uploads/f90ef8a0-a3ab-4689-97d1-fad07e16b477.png"
              alt={`${name} logo`}
              className="max-h-full max-w-full object-contain grayscale hover:grayscale-0 transition-all opacity-80 hover:opacity-100"
            />
          </div>
        </AspectRatio>
      </div>
    </div>
  );
};

const AboutPartners = () => {
  const [displayedLogos, setDisplayedLogos] = useState(STATIC_PARTNERS.slice(0, 6));
  const [visibleLogos, setVisibleLogos] = useState<boolean[]>(new Array(6).fill(true));
  
  // Number of logos to display at once
  const displayCount = 6;
  // How often to rotate logos (in milliseconds)
  const rotationInterval = 4000;

  useEffect(() => {
    if (STATIC_PARTNERS.length <= displayCount) return;

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
      const currentIds = displayedLogos.map(logo => logo.id);
      const availableLogos = STATIC_PARTNERS.filter(logo => !currentIds.includes(logo.id));
      
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
  }, [displayedLogos]);

  return (
    <section className="py-12 bg-gray-50" aria-labelledby="partners-heading">
      <div className="container-custom">
        <h2 id="partners-heading" className="text-3xl font-semibold text-prometheus-navy text-center mb-8">
          Our Experience Is Proven
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          {displayedLogos.map((logo, index) => (
            <PartnerLogo 
              key={`${logo.id}-${index}`}
              name={logo.name}
              visible={visibleLogos[index]}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutPartners;
