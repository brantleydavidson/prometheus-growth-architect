import React from "react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { AssessmentResult } from "@/types/aiQuotient";
import { getReadinessLevelColor, getReadinessLevelTextColor } from "@/utils/scoreCalculation";
import { ChevronRight } from "lucide-react";

interface ResultsPageProps {
  result: AssessmentResult;
  onRequestReport: () => void;
  onContinue: () => void;
}

const ResultsPage: React.FC<ResultsPageProps> = ({
  result,
  onRequestReport,
  onContinue,
}) => {
  const readinessColor = getReadinessLevelTextColor(result.readinessLevel);
  
  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Overall score card */}
      <div className="bg-white rounded-lg shadow-md p-8 mb-8">
        <div className="flex flex-col md:flex-row items-center justify-between mb-6">
          <div className="mb-4 md:mb-0 text-center md:text-left">
            <h2 className="text-3xl font-bold mb-2">
              Your AI Quotient Score
            </h2>
            <p className="text-gray-600 max-w-md">
              Based on your answers, we've calculated your organization's AI readiness.
            </p>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="relative w-32 h-32 flex items-center justify-center">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle 
                  cx="50" cy="50" r="45" 
                  fill="none" 
                  stroke="#e5e7eb" 
                  strokeWidth="10" 
                />
                <circle 
                  cx="50" cy="50" r="45" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="10" 
                  strokeDasharray="283" 
                  strokeDashoffset={283 - (283 * result.percentage / 100)} 
                  strokeLinecap="round" 
                  className={readinessColor}
                  transform="rotate(-90 50 50)" 
                />
              </svg>
              <div className="absolute flex flex-col items-center justify-center">
                <span className="text-3xl font-bold">{result.percentage}%</span>
              </div>
            </div>
            <span className={`text-lg font-bold mt-2 ${readinessColor}`}>
              {result.readinessLevel}
            </span>
          </div>
        </div>
        
        {/* Description of readiness level */}
        <div className="bg-gray-50 p-4 rounded-md mb-6">
          <h3 className="font-medium mb-2">What this means:</h3>
          <p className="text-gray-700">
            {result.readinessLevel === "AI Innovator" && 
              "Your organization is leading the way in AI readiness with robust data infrastructure, advanced automation, and mature governance practices."}
            {result.readinessLevel === "AI Ready" && 
              "Your organization has a solid foundation for AI implementation with good data practices and automation capabilities."}
            {result.readinessLevel === "AI Emerging" && 
              "Your organization is making progress toward AI readiness but has several areas that need improvement."}
            {result.readinessLevel === "AI Developing" && 
              "Your organization is in the early stages of AI readiness and requires significant improvements across multiple areas."}
          </p>
        </div>
      </div>
      
      {/* Pillar breakdown */}
      <div className="bg-white rounded-lg shadow-md p-8 mb-8">
        <h2 className="text-2xl font-bold mb-6">Pillar Breakdown</h2>
        
        <div className="space-y-6">
          {result.pillarScores.map((pillar) => (
            <div key={pillar.pillar} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium">{pillar.pillar}</span>
                <span className="text-sm font-bold">
                  {pillar.percentage}%
                </span>
              </div>
              <Progress 
                value={pillar.percentage} 
                className="h-3"
              />
            </div>
          ))}
        </div>
      </div>
      
      {/* Actions */}
      <div className="flex flex-col md:flex-row gap-4 justify-between">
        <Button 
          onClick={onRequestReport}
          className="flex-1 bg-orange-500 hover:bg-orange-600 text-white"
        >
          Get Your Full Report
        </Button>
        
        <Button asChild className="flex-1" variant="outline">
          <a href="/growth-audit" className="flex items-center justify-center">
            Book AI Strategy Session
            <ChevronRight className="ml-2 h-4 w-4" />
          </a>
        </Button>
      </div>
    </div>
  );
};

export default ResultsPage;
