
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

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
            <img 
              src="/lovable-uploads/6bf1d2d6-a1a4-4a14-aa06-7ad2714adedd.png"
              alt="Enterprise-level strategies" 
              className="max-w-full h-auto rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
