import React from "react";
import { Check, Download, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UserInfo, AssessmentResult } from "@/types/aiQuotient";

interface ThankYouPageProps {
  userInfo: UserInfo;
  result: AssessmentResult;
}

const ThankYouPage: React.FC<ThankYouPageProps> = ({ userInfo, result }) => {
  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-8 mb-8 text-center">
        <div className="mb-8">
          <div className="mx-auto flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-6">
            <Check className="h-8 w-8" />
          </div>
          
          <h2 className="text-3xl font-bold mb-4">Thank You!</h2>
          <p className="text-lg mb-4">
            Thank you {userInfo.firstName} for completing the AI Quotient Assessment. 
            Your submission has been received successfully.
          </p>
          <p className="text-gray-600">
            We've sent a confirmation email to <span className="font-medium">{userInfo.email}</span> with your results.
          </p>
        </div>
        
        <div className="my-8 border-t border-b border-gray-100 py-8">
          <h3 className="font-bold text-xl mb-4">Your AI Readiness: {result.readinessLevel}</h3>
          <div className="flex justify-center items-center gap-2 mb-6">
            <div className="w-full max-w-md bg-gray-200 rounded-full h-3 overflow-hidden">
              <div 
                className="h-full bg-primary" 
                style={{ width: `${result.percentage}%` }}
              ></div>
            </div>
            <span className="font-bold">{result.percentage}%</span>
          </div>
          
          <p className="text-gray-600 italic">
            {result.readinessLevel === "AI Innovator" && 
              "You're leading the way in AI readiness with robust systems and processes."}
            {result.readinessLevel === "AI Ready" && 
              "Your organization has a solid foundation for AI implementation."}
            {result.readinessLevel === "AI Emerging" && 
              "You're making progress toward AI readiness but have room to grow."}
            {result.readinessLevel === "AI Developing" && 
              "You're in the early stages of AI readiness with significant opportunities for improvement."}
          </p>
        </div>
        
        <div className="bg-gray-50 p-6 rounded-lg mb-8">
          <h3 className="font-bold text-lg mb-3">What happens next?</h3>
          <ul className="text-left space-y-4">
            <li className="flex items-start">
              <div className="mt-1 mr-3 flex-shrink-0">
                <Download className="h-5 w-5 text-primary" />
              </div>
              <p>
                <span className="font-medium">Detailed Report:</span> Within 24 hours, you'll receive your 
                comprehensive AI readiness report with custom recommendations.
              </p>
            </li>
            <li className="flex items-start">
              <div className="mt-1 mr-3 flex-shrink-0">
                <Calendar className="h-5 w-5 text-primary" />
              </div>
              <p>
                <span className="font-medium">Strategy Session:</span> A member of our team will reach out to 
                schedule a personalized strategy session to discuss your results.
              </p>
            </li>
          </ul>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <Button 
            variant="outline"
            className="flex-1"
            onClick={() => window.location.href = "/api/download-report"}
          >
            Download Detailed Report
          </Button>
          <Button 
            className="flex-1"
            onClick={() => window.location.href = "/book-audit"}
          >
            Book AI Strategy Session
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ThankYouPage;
