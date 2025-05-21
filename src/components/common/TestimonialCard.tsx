import React from "react";
import { Star } from "lucide-react";

interface TestimonialCardProps {
  quote: string;
  author: string;
  position?: string;
  company: string;
  image?: string;
  rating?: number;
  categories?: string[];
}

const TestimonialCard = ({
  quote,
  author,
  position,
  company,
  image,
  rating = 5,
  categories = [],
}: TestimonialCardProps) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 flex flex-col h-full">
      <div className="flex items-center gap-2 mb-3">
        {Array.from({ length: rating }).map((_, i) => (
          <Star
            key={i}
            size={16}
            className="fill-prometheus-gold text-prometheus-gold"
          />
        ))}
      </div>
      
      <blockquote className="mb-4 flex-grow">
        <p className="text-gray-700 italic">"{quote}"</p>
      </blockquote>
      
      <div className="flex items-center mt-4">
        {image && (
          <img
            src={image}
            alt={author}
            className="w-12 h-12 rounded-full object-cover mr-4"
          />
        )}
        <div>
          <p className="font-medium text-prometheus-navy">{author}</p>
          {position && <p className="text-prometheus-gray text-sm">{position}</p>}
          <p className="text-prometheus-gray text-sm">{company}</p>
        </div>
      </div>
      
      {categories.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {categories.map((category) => (
            <span
              key={category}
              className="text-xs text-prometheus-navy bg-gray-100 px-2 py-1 rounded-full"
            >
              {category}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default TestimonialCard;
