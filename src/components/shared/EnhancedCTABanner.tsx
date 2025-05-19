import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface EnhancedCTABannerProps {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
}

const EnhancedCTABanner: React.FC<EnhancedCTABannerProps> = ({
  title,
  description,
  buttonText,
  buttonLink,
}) => {
  return (
    <div className="bg-prometheus-navy text-white py-16">
      <div className="container max-w-4xl mx-auto px-4">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">{description}</p>
          <Button
            asChild
            className="bg-prometheus-orange hover:bg-prometheus-orange/90 text-white px-8 py-6 text-lg"
          >
            <a href={buttonLink} className="flex items-center gap-2">
              {buttonText}
              <ArrowRight className="w-5 h-5" />
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EnhancedCTABanner; 