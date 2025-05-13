
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const ServicesHero = () => {
  return (
    <section className="pt-16 pb-24 bg-prometheus-navy text-white">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-semibold mb-6">
            Services That Drive Measurable Growth
          </h1>
          <p className="text-white/80 text-lg mb-6 max-w-2xl mx-auto">
            We don't just implement technology – we create <strong>integrated growth systems</strong> 
            that deliver tangible business outcomes. Every service we offer is 
            designed to produce measurable ROI.
          </p>
          <p className="text-white/80 text-lg mb-12 max-w-2xl mx-auto">
            Our team of experts combines technical expertise with strategic thinking to help you
            navigate complex business challenges and capitalize on emerging opportunities.
          </p>
          <Link to="/book-audit">
            <Button className="bg-prometheus-orange hover:bg-prometheus-orange/90 px-8 py-6 text-base">
              Book a Growth Audit
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesHero;
