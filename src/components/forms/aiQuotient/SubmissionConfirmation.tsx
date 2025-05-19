import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { UserInfo } from '@/types/aiQuotient';

interface SubmissionConfirmationProps {
  userInfo: UserInfo;
}

const SubmissionConfirmation = ({ userInfo }: SubmissionConfirmationProps) => {
  return (
    <div className="text-center py-8">
      <div className="flex justify-center mb-6">
        <CheckCircle2 className="h-16 w-16 text-green-500" />
      </div>
      
      <h3 className="text-2xl font-semibold mb-4">Thank You for Your Submission!</h3>
      
      <div className="max-w-md mx-auto text-gray-600 space-y-4">
        <p>
          Hi {userInfo.firstName},
        </p>
        
        <p>
          We've received your AI Quotient assessment results and additional information. Our team will review your submission and prepare a detailed report tailored to your organization's needs.
        </p>
        
        <p>
          You'll receive your personalized report at {userInfo.email} within 2-3 business days. The report will include:
        </p>
        
        <ul className="text-left list-disc list-inside space-y-2">
          <li>Detailed analysis of your AI readiness across all pillars</li>
          <li>Specific recommendations for improvement</li>
          <li>Actionable next steps for AI implementation</li>
          <li>Resources and best practices relevant to your industry</li>
        </ul>
        
        <p className="mt-6">
          If you have any questions in the meantime, please don't hesitate to contact us at{' '}
          <a href="mailto:support@prometheusgrowth.com" className="text-prometheus-orange hover:underline">
            support@prometheusgrowth.com
          </a>
        </p>
      </div>
    </div>
  );
};

export default SubmissionConfirmation; 