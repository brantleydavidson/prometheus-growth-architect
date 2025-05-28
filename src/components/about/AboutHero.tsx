import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import OptimizedImage from "@/components/common/OptimizedImage";

const AboutHero = () => {
  return (
    <section className="pt-24 pb-16 bg-gradient-to-br from-white to-gray-50">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-left">
            <h1 className="text-4xl md:text-5xl font-semibold text-prometheus-navy mb-6 leading-tight">
              Bringing Enterprise-Level <span className="text-prometheus-orange">Strategies</span> to Your Business
            </h1>
            <p className="text-xl text-prometheus-gray mb-8">
              Harness sophisticated, scalable solutions tailored to drive your growth.
            </p>
            <Link to="/book-audit">
              <Button className="bg-prometheus-orange hover:bg-prometheus-orange/90 text-white">
                BOOK A CALL
              </Button>
            </Link>
          </div>
          <div className="flex justify-center lg:justify-end">
            <OptimizedImage
              src="https://xkarbwfzxfxgtnefcout.supabase.co/storage/v1/object/public/cms_media/Prometheus%20Assets/titan(navy).png"
              alt="Prometheus Titan Logo"
              priority={true}
              width={512}
              height={512}
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 512px"
              className="max-w-xs md:max-w-sm lg:max-w-md h-auto rounded-lg shadow-[0_10px_20px_rgba(0,46,93,0.25)]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
