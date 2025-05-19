
import React from "react";
import { useAIQuotientAssessment } from "@/hooks/useAIQuotientAssessment";
import UserInfoForm from "./aiQuotient/UserInfoForm";
import QuestionsForm from "./aiQuotient/QuestionsForm";
import ResultsPage from "./aiQuotient/ResultsPage";
import SubmitResultsForm from "./aiQuotient/SubmitResultsForm";
import ThankYouPage from "./aiQuotient/ThankYouPage";
import { UserInfo, PillarType } from "@/types/aiQuotient";
import { AssessmentFormProps } from "@/types/aiQuotient";

const QuotientForm: React.FC<AssessmentFormProps> = ({ testMode = false }) => {
  const {
    currentStep,
    userInfo,
    answers,
    currentPillar,
    currentPillarQuestions,
    allPillars,
    completedPillars,
    result,
    isTestMode,
    progress,
    updateUserInfo,
    submitAnswer,
    moveToNextStep,
    moveToPreviousStep,
    submitToHubSpot,
    toggleTestMode
  } = useAIQuotientAssessment(testMode);

  const handleUserInfoSubmit = (data: UserInfo) => {
    // Track form start in HubSpot
    if (window._hsq) {
      window._hsq.push(['identify', {
        email: data.email,
        firstname: data.firstName,
        lastname: data.lastName,
        company: data.company
      }]);
      window._hsq.push(['trackEvent', {
        id: 'ai_quotient_assessment_started'
      }]);
    }
    
    updateUserInfo(data);
    moveToNextStep();
  };

  const handleRequestReport = () => {
    // Track completion in HubSpot
    if (window._hsq && result) {
      window._hsq.push(['trackEvent', {
        id: 'ai_quotient_assessment_completed',
        value: result.percentage
      }]);
    }
    
    moveToNextStep();
  };

  const handleSubmitToHubSpot = async () => {
    const success = await submitToHubSpot();
    if (success) {
      moveToNextStep();
    }
    return success;
  };

  // Render the current step
  const renderStep = () => {
    switch (currentStep) {
      case "user-info":
        return (
          <UserInfoForm
            userInfo={userInfo}
            onSubmit={handleUserInfoSubmit}
          />
        );
      
      case "questions":
        return (
          <QuestionsForm
            questions={currentPillarQuestions}
            currentPillar={currentPillar}
            allPillars={allPillars}
            completedPillars={completedPillars}
            answers={answers}
            progress={progress}
            isTestMode={isTestMode}
            onToggleTestMode={toggleTestMode}
            onSubmitAnswer={submitAnswer}
            onBack={moveToPreviousStep}
          />
        );
      
      case "results":
        return result ? (
          <ResultsPage
            result={result}
            onRequestReport={handleRequestReport}
            onContinue={handleRequestReport}
          />
        ) : (
          <div>No results available.</div>
        );
      
      case "submit":
        return result ? (
          <SubmitResultsForm
            userInfo={userInfo}
            result={result}
            onSubmit={handleSubmitToHubSpot}
          />
        ) : (
          <div>No results available.</div>
        );
      
      case "thank-you":
        return result ? (
          <ThankYouPage
            userInfo={userInfo}
            result={result}
          />
        ) : (
          <div>No results available.</div>
        );
      
      default:
        return <div>Unknown step</div>;
    }
  };

  return (
    <div className="w-full py-8">
      {renderStep()}
    </div>
  );
};

export default QuotientForm;
