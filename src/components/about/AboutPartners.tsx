import React, { useState, useEffect } from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";

// Real partner logos from reliable sources
const PARTNER_LOGOS = [
  { 
    name: "Microsoft", 
    id: "microsoft",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoft/microsoft-original.svg"
  },
  { 
    name: "Google", 
    id: "google",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg"
  },
  { 
    name: "Amazon", 
    id: "amazon",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg"
  },
  { 
    name: "Slack", 
    id: "slack",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/slack/slack-original.svg"
  },
  { 
    name: "Docker", 
    id: "docker",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg"
  },
  { 
    name: "LinkedIn", 
    id: "linkedin",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg"
  },
  { 
    name: "GitHub", 
    id: "github",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"
  },
  { 
    name: "Salesforce", 
    id: "salesforce",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/salesforce/salesforce-original.svg"
  },
  { 
    name: "Apple", 
    id: "apple",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apple/apple-original.svg"
  },
  { 
    name: "Facebook", 
    id: "facebook",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/facebook/facebook-original.svg"
  },
  { 
    name: "Twitter", 
    id: "twitter",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/twitter/twitter-original.svg"
  },
  { 
    name: "Oracle", 
    id: "oracle",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/oracle/oracle-original.svg"
  }
];

interface PartnerLogoProps {
  logo: { name: string; url: string; id: string };
  visible: boolean;
}

const PartnerLogo = ({ logo, visible }: PartnerLogoProps) => {
  return (
    <div 
      className={`p-4 flex items-center justify-center transition-opacity duration-700 ${visible ? 'opacity-100' : 'opacity-0'}`} 
      aria-label={`Partner: ${logo.name}`}
    >
      <div className="w-full max-w-[160px]">
        <AspectRatio ratio={3/1} className="bg-gray-100 rounded-md">
          <div className="h-full w-full flex items-center justify-center p-3">
            <img
              src={logo.url}
              alt={`${logo.name} logo`}
              className="max-h-full max-w-full object-contain grayscale hover:grayscale-0 transition-all opacity-80 hover:opacity-100"
            />
          </div>
        </AspectRatio>
      </div>
    </div>
  );
};

const AboutPartners = () => {
  const [displayedLogos, setDisplayedLogos] = useState(PARTNER_LOGOS.slice(0, 6));
  const [visibleLogos, setVisibleLogos] = useState<boolean[]>(new Array(6).fill(true));
  
  // Number of logos to display at once
  const displayCount = 6;
  // How often to rotate logos (in milliseconds)
  const rotationInterval = 4000;

  useEffect(() => {
    if (PARTNER_LOGOS.length <= displayCount) return;

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
      const availableLogos = PARTNER_LOGOS.filter(logo => !currentIds.includes(logo.id));
      
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
              logo={logo}
              visible={visibleLogos[index]}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutPartners;
