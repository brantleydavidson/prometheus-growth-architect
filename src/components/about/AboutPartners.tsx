import React, { useState, useEffect } from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Skeleton } from "@/components/ui/skeleton";

// Partner logos with brand colors
const PARTNER_LOGOS = [
  { name: "hubspot", title: "HubSpot", color: "#FF5C35" },
  { name: "salesforce", title: "Salesforce", color: "#00A1E0" },
  { name: "microsoft", title: "Microsoft", color: "#0078D4" },
  { name: "google", title: "Google Cloud", color: "#4285F4" },
  { name: "aws", title: "AWS", color: "#FF9900" },
  { name: "adobe", title: "Adobe", color: "#FF0000" },
  { name: "oracle", title: "Oracle", color: "#F80000" },
  { name: "sap", title: "SAP", color: "#0CAFFE" },
  { name: "ibm", title: "IBM", color: "#054ADA" },
];

interface PartnerLogoProps {
  partner: { name: string; title: string; color: string };
  className?: string;
  visible: boolean;
}

const PartnerLogo = ({ partner, className = "", visible }: PartnerLogoProps) => {
  return (
    <div 
      className={`p-4 flex items-center justify-center ${className} transition-opacity duration-700 ${visible ? 'opacity-100' : 'opacity-0'}`} 
      aria-label={`Partner: ${partner.title}`}
    >
      <div className="w-full max-w-[160px]">
        <AspectRatio ratio={3/1} className="bg-white rounded-md shadow-sm">
          <div className="h-full w-full flex items-center justify-center p-3">
            <div 
              className="w-full h-full rounded flex items-center justify-center text-white font-semibold text-sm"
              style={{ backgroundColor: partner.color }}
            >
              {partner.title}
            </div>
          </div>
        </AspectRatio>
      </div>
    </div>
  );
};

const AboutPartners = () => {
  const [allLogos] = useState(PARTNER_LOGOS);
  const [displayedLogos, setDisplayedLogos] = useState(PARTNER_LOGOS.slice(0, 6));
  const [isLoading] = useState(false);
  const [visibleLogos, setVisibleLogos] = useState<boolean[]>(new Array(6).fill(true));
  
  // Number of logos to display at once
  const displayCount = 6;
  // How often to rotate logos (in milliseconds)
  const rotationInterval = 4000;

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
                partner={logo}
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
