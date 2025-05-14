
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

const JobCard = ({ title, type, location, className = "" }) => {
  return (
    <Card className={`border-none shadow-md hover:shadow-lg transition-shadow ${className}`}>
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold mb-2 text-prometheus-navy">{title}</h3>
        <p className="text-prometheus-gray mb-4">{type} | {location}</p>
        <Link to="/contact">
          <Button variant="outline" className="w-full">Learn More</Button>
        </Link>
      </CardContent>
    </Card>
  );
};

const AboutTeam = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-prometheus-navy mb-3">Come Join Our Team!</h2>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-semibold text-prometheus-navy mb-6 text-left">Open Positions</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <JobCard 
              title="Senior Analyst"
              type="Full Time"
              location="Memphis, TN"
            />
            
            <JobCard 
              title="CRM Associate"
              type="Full Time"
              location="Memphis, TN"
            />
            
            <JobCard 
              title="Senior Growth Strategist"
              type="Full Time"
              location="Memphis, TN"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutTeam;
