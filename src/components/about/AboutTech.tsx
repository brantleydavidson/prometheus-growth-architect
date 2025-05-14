
import React from "react";

interface TechLogoProps {
  src: string;
  alt: string;
  className?: string;
}

const TechLogo = ({ src, alt, className = "" }: TechLogoProps) => {
  return (
    <div className={`p-4 flex items-center justify-center ${className}`} aria-label={`Technology: ${alt}`}>
      <div className="w-full max-w-[120px]">
        <img 
          src={src} 
          alt={`${alt} logo - Technology used by Prometheus Agency`}
          className="max-h-full max-w-full object-contain grayscale hover:grayscale-0 transition-all opacity-80 hover:opacity-100" 
        />
      </div>
    </div>
  );
};

const AboutTech = () => {
  // Placeholder for technology logos - replace with actual logos when available
  const technologies = [
    { name: "HubSpot", src: "https://via.placeholder.com/120x60?text=HubSpot" },
    { name: "Looker Studio", src: "https://via.placeholder.com/120x60?text=Looker" },
    { name: "Microsoft Dynamics", src: "https://via.placeholder.com/120x60?text=MSDynamics" },
    { name: "Salesforce", src: "https://via.placeholder.com/120x60?text=Salesforce" },
    { name: "Google Analytics", src: "https://via.placeholder.com/120x60?text=GA" },
    { name: "Webflow", src: "https://via.placeholder.com/120x60?text=Webflow" },
    { name: "Google Ads", src: "https://via.placeholder.com/120x60?text=GoogleAds" },
    { name: "Big Commerce", src: "https://via.placeholder.com/120x60?text=BigCommerce" },
    { name: "Klaviyo", src: "https://via.placeholder.com/120x60?text=Klaviyo" },
    { name: "Meta", src: "https://via.placeholder.com/120x60?text=Meta" },
    { name: "Google Tag Manager", src: "https://via.placeholder.com/120x60?text=GTM" },
    { name: "Shopify", src: "https://via.placeholder.com/120x60?text=Shopify" },
  ];

  return (
    <section className="py-12 bg-white" aria-labelledby="technologies-heading">
      <div className="container-custom">
        <div className="mb-8 text-center lg:text-left">
          <h3 id="technologies-heading" className="text-2xl font-medium text-prometheus-navy mb-2">Empowering businesses with cutting-edge technology solutions</h3>
        </div>
        
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {technologies.map((tech, index) => (
            <TechLogo 
              key={index}
              src={tech.src}
              alt={tech.name}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutTech;
