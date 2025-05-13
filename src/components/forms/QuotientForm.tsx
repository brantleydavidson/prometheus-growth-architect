
import React from "react";
import { useAIQuotientAssessment } from "@/hooks/useAIQuotientAssessment";
import UserInfoForm from "./aiQuotient/UserInfoForm";
import QuestionsForm from "./aiQuotient/QuestionsForm";
import ResultsPage from "./aiQuotient/ResultsPage";
import SubmitResultsForm from "./aiQuotient/SubmitResultsForm";
import { UserInfo } from "@/types/aiQuotient";

interface QuotientFormProps {
  testMode?: boolean;
}

const QuotientForm: React.FC<QuotientFormProps> = ({ testMode = false }) => {
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
    updateUserInfo(data);
    moveToNextStep();
  };

  const handleRequestReport = () => {
    moveToNextStep();
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
            onSubmit={submitToHubSpot}
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
