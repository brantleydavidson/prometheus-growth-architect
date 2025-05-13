
import React from "react";
import HubSpotForm from "@/components/hubspot/HubSpotForm";

interface ContactFormProps {
  formType?: "contact" | "audit" | "consultation";
  className?: string;
}

const ContactForm: React.FC<ContactFormProps> = ({ 
  formType = "contact",
  className = "" 
}) => {
  // Map form types to actual HubSpot form IDs (replace with your actual form IDs)
  const formIds = {
    contact: "contact-form-id",
    audit: "audit-request-form-id",
    consultation: "consultation-request-form-id"
  };
  
  const formTitles = {
    contact: "Get in Touch",
    audit: "Request Your Free Growth Audit",
    consultation: "Schedule a Consultation"
  };
  
  const formDescriptions = {
    contact: "Have questions? Fill out this form and we'll get back to you as soon as possible.",
    audit: "Let our experts analyze your current systems and identify growth opportunities.",
    consultation: "Book a consultation with our team to discuss your specific needs."
  };

  return (
    <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
      <HubSpotForm
        formId={formIds[formType]}
        title={formTitles[formType]}
        description={formDescriptions[formType]}
      />
    </div>
  );
};

export default ContactForm;
