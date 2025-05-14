
import React from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface PartnerLogoProps {
  src: string;
  alt: string;
  className?: string;
}

const PartnerLogo = ({ src, alt, className = "" }: PartnerLogoProps) => {
  return (
    <div className={`p-4 flex items-center justify-center ${className}`} aria-label={`Partner: ${alt}`}>
      <div className="w-full max-w-[160px]">
        <AspectRatio ratio={3/1} className="bg-white rounded-md">
          <div className="h-full w-full flex items-center justify-center p-3">
            <img 
              src={src} 
              alt={`${alt} logo - Prometheus Agency partner`}
              className="max-h-full max-w-full object-contain grayscale hover:grayscale-0 transition-all opacity-80 hover:opacity-100"
            />
          </div>
        </AspectRatio>
      </div>
    </div>
  );
};

const AboutPartners = () => {
  // Placeholder for partner logos - replace with actual logos when available
  const partners = [
    { name: "American Commerce Bank", src: "https://via.placeholder.com/160x60?text=ACB" },
    { name: "Humana", src: "https://via.placeholder.com/160x60?text=Humana" },
    { name: "Service Master", src: "https://via.placeholder.com/160x60?text=ServiceMaster" },
    { name: "Monesty", src: "https://via.placeholder.com/160x60?text=Monesty" },
    { name: "Mutual of Omaha", src: "https://via.placeholder.com/160x60?text=MutualOfOmaha" },
    { name: "Copperweld", src: "https://via.placeholder.com/160x60?text=Copperweld" },
    { name: "JetBoil", src: "https://via.placeholder.com/160x60?text=JetBoil" },
    { name: "Old Town", src: "https://via.placeholder.com/160x60?text=OldTown" },
    { name: "Blue Cross Blue Shield", src: "https://via.placeholder.com/160x60?text=BCBS" },
    { name: "MSP", src: "https://via.placeholder.com/160x60?text=MSP" },
    { name: "Eureka", src: "https://via.placeholder.com/160x60?text=Eureka" },
    { name: "Hollywood Feed", src: "https://via.placeholder.com/160x60?text=HollywoodFeed" },
  ];

  return (
    <section className="py-12 bg-gray-50" aria-labelledby="partners-heading">
      <div className="container-custom">
        <h2 id="partners-heading" className="sr-only">Our Partners</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          {partners.map((partner, index) => (
            <PartnerLogo 
              key={index}
              src={partner.src}
              alt={partner.name}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutPartners;
