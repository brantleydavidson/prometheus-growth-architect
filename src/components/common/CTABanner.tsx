
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface CTABannerProps {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  color?: "orange" | "gold" | "navy";
}

const CTABanner = ({
  title,
  description,
  buttonText,
  buttonLink,
  color = "orange",
}: CTABannerProps) => {
  const backgroundColors = {
    orange: "bg-prometheus-orange",
    gold: "bg-prometheus-gold",
    navy: "bg-prometheus-navy",
  };

  const buttonColors = {
    orange: "bg-white text-prometheus-orange hover:bg-white/90",
    gold: "bg-white text-prometheus-gold hover:bg-white/90",
    navy: "bg-prometheus-orange text-white hover:bg-prometheus-orange/90",
  };

  return (
    <div className={`${backgroundColors[color]} py-16`}>
      <div className="container-custom">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="text-white max-w-2xl">
            <h2 className="text-3xl font-semibold mb-3">{title}</h2>
            <p className="text-white/90">{description}</p>
          </div>
          <Link to={buttonLink}>
            <Button
              className={`${buttonColors[color]} px-6 py-6 text-base font-medium flex items-center gap-2`}
              size="lg"
            >
              {buttonText}
              <ArrowRight size={16} />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CTABanner;
