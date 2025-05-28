import React from "react";
import { Database, Settings, ActivitySquare, CheckCircle, BarChart3 } from "lucide-react";

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
          onError={(e) => { e.currentTarget.src = '/fallback-tech-logo.png'; }}
        />
      </div>
    </div>
  );
};

const AboutTech = () => {
  const technologies = [
    { name: "HubSpot", src: "https://xkarbwfzxfxgtnefcout.supabase.co/storage/v1/object/public/cms_media/Technology%20Logos/hubspot.png" },
    { name: "Looker Studio", src: "https://xkarbwfzxfxgtnefcout.supabase.co/storage/v1/object/public/cms_media/Technology%20Logos/looker.png" },
    { name: "Microsoft Dynamics", src: "https://xkarbwfzxfxgtnefcout.supabase.co/storage/v1/object/public/cms_media/Technology%20Logos/microsoft-dynamics.png" },
    { name: "Salesforce", src: "https://xkarbwfzxfxgtnefcout.supabase.co/storage/v1/object/public/cms_media/Technology%20Logos/salesforce.png" },
    { name: "Google Analytics", src: "https://xkarbwfzxfxgtnefcout.supabase.co/storage/v1/object/public/cms_media/Technology%20Logos/google-analytics.png" },
    { name: "Webflow", src: "https://xkarbwfzxfxgtnefcout.supabase.co/storage/v1/object/public/cms_media/Technology%20Logos/webflow.png" },
    { name: "Google Ads", src: "https://xkarbwfzxfxgtnefcout.supabase.co/storage/v1/object/public/cms_media/Technology%20Logos/google-ads.png" },
    { name: "Big Commerce", src: "https://xkarbwfzxfxgtnefcout.supabase.co/storage/v1/object/public/cms_media/Technology%20Logos/bigcommerce.png" },
    { name: "Klaviyo", src: "https://xkarbwfzxfxgtnefcout.supabase.co/storage/v1/object/public/cms_media/Technology%20Logos/klaviyo.png" },
    { name: "Meta", src: "https://xkarbwfzxfxgtnefcout.supabase.co/storage/v1/object/public/cms_media/Technology%20Logos/meta.png" },
    { name: "Google Tag Manager", src: "https://xkarbwfzxfxgtnefcout.supabase.co/storage/v1/object/public/cms_media/Technology%20Logos/google-tag-manager.png" },
    { name: "Shopify", src: "https://xkarbwfzxfxgtnefcout.supabase.co/storage/v1/object/public/cms_media/Technology%20Logos/shopify.png" },
  ];

  return (
    <section className="py-12 bg-white" aria-labelledby="technologies-heading">
      <div className="container-custom">
        <div className="mb-8 text-center">
          <h3 id="technologies-heading" className="text-2xl font-medium text-prometheus-navy mb-2">Technology Solutions</h3>
          <p className="text-lg text-prometheus-gray max-w-2xl mx-auto">
            We partner with industry-leading platforms to deliver comprehensive solutions for your business.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {technologies.map((tech, index) => (
            <TechLogo 
              key={index}
              src={tech.src}
              alt={tech.name}
              className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutTech;
