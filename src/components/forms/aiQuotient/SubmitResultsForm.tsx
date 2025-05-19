
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { UserInfo, AssessmentResult } from "@/types/aiQuotient";
import { Check, Loader2 } from "lucide-react";

interface SubmitResultsFormProps {
  userInfo: UserInfo;
  result: AssessmentResult;
  onSubmit: () => Promise<boolean>;
}

const SubmitResultsForm: React.FC<SubmitResultsFormProps> = ({
  userInfo,
  result,
  onSubmit
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError(null);
    
    try {
      const success = await onSubmit();
      if (success) {
        setIsSubmitted(true);
        // Note: We don't need to move to the next step here anymore
        // as this is now handled by the parent component
      } else {
        setError("There was an error submitting your assessment. Please try again.");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again later.");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto bg-white rounded-lg shadow-md p-8">
      <h2 className="text-2xl font-bold mb-6 text-center">
        {isSubmitted ? "Thank You!" : "Get Your Detailed Report"}
      </h2>
      
      {isSubmitted ? (
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-6">
            <Check className="h-8 w-8" />
          </div>
          
          <p className="text-lg mb-6">
            Your AI Quotient Assessment has been submitted successfully. We'll prepare a detailed report and action plan for your organization.
          </p>
          
          <div className="p-4 bg-gray-50 rounded-md mb-6">
            <h3 className="font-medium mb-2">What to expect next:</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>You'll receive an email with your detailed report</li>
              <li>A member of our team will reach out to schedule a strategy session</li>
              <li>We'll provide tailored recommendations for your AI implementation</li>
            </ul>
          </div>
        </div>
      ) : (
        <>
          <p className="mb-6 text-center">
            Submit your assessment to receive a detailed analysis of your organization's AI readiness and personalized recommendations.
          </p>
          
          <div className="bg-gray-50 p-4 rounded-md mb-8">
            <h3 className="font-medium mb-3">Assessment Summary:</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Overall Score:</span>
                <span className="font-medium">{result.percentage}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Readiness Level:</span>
                <span className="font-medium">{result.readinessLevel}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Name:</span>
                <span className="font-medium">{userInfo.firstName} {userInfo.lastName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Company:</span>
                <span className="font-medium">{userInfo.company}</span>
              </div>
            </div>
          </div>
          
          {error && (
            <div className="p-3 mb-6 bg-red-50 text-red-700 rounded-md text-sm">
              {error}
            </div>
          )}
          
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit & Get Report"
            )}
          </Button>
        </>
      )}
    </div>
  );
};

export default SubmitResultsForm;
