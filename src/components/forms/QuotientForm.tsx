import React, { useEffect } from 'react';
import { questionsByPillar } from '@/data/aiQuotientQuestions';
import UserInfoForm from './aiQuotient/UserInfoForm';
import QuestionsForm from './aiQuotient/QuestionsForm';
import SubmitResultsForm from './aiQuotient/SubmitResultsForm';
import { useAIQuotientAssessment } from '@/hooks/useAIQuotientAssessment';
import { useHubSpot } from '@/integrations/hubspot/HubSpotProvider';
import { useToast } from '@/hooks/use-toast';

const QuotientForm = () => {
  const { toast } = useToast();
  const { 
    state, 
    actions, 
    getPillarProgress 
  } = useAIQuotientAssessment();
  
  const { 
    currentStep, 
    userInfo, 
    answers, 
    score, 
    pillarScores, 
    showResults, 
    isSubmitting,
    isSubmitted,
    totalSteps,
    maxPillarScores
  } = state;
  
  const { 
    handleUserInfoSubmit, 
    handleNext, 
    handlePrevious, 
    handleSubmitResults 
  } = actions;
  
  const { portalId, formId, submitToHubSpot } = useHubSpot();
  
  // Log information every time the component renders
  useEffect(() => {
    console.log('QuotientForm rendering state:', { 
      currentStep, 
      userInfoComplete: !!userInfo.firstname,
      answersCount: Object.keys(answers).length,
      showResults,
      totalSteps
    });
  });
  
  // Log HubSpot configuration when component mounts
  useEffect(() => {
    console.log('==========================================');
    console.log('QuotientForm initialized with HubSpot config:');
    console.log('Portal ID:', portalId);
    console.log('Form ID:', formId);
    console.log('submitToHubSpot function available:', !!submitToHubSpot);
    console.log('==========================================');
  }, [portalId, formId, submitToHubSpot]);
  
  // Recovery function if we encounter an issue
  const handleError = () => {
    toast({
      variant: "destructive",
      title: "Assessment Error",
      description: "We encountered an issue with the assessment. Restarting to user info page."
    });
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };
  
  // Show user information collection form
  if (currentStep === -1) {
    return <UserInfoForm initialData={userInfo} onSubmit={handleUserInfoSubmit} />;
  }
  
  // Show results and submit to HubSpot
  if (showResults) {
    return (
      <SubmitResultsForm 
        score={score} 
        totalPossible={totalSteps * 4} 
        userInfo={userInfo}
        pillarScores={pillarScores}
        maxPillarScores={maxPillarScores}
        onSubmit={handleSubmitResults}
        isSubmitting={isSubmitting}
        isSubmitted={isSubmitted}
      />
    );
  }
  
  // Get the current pillar progress information
  const { currentPillar, pillarQuestionCount, pillarProgress } = getPillarProgress();
  
  // Valid check before showing question form
  const isValidStep = currentStep >= 0 && totalSteps > 0;
  
  if (!isValidStep) {
    console.error('Invalid step detected:', currentStep, 'Total steps:', totalSteps);
    return (
      <div className="text-center py-8">
        <p className="text-xl text-gray-600">There was an issue with the assessment.</p>
        <button 
          onClick={handleError}
          className="mt-4 px-4 py-2 bg-prometheus-orange text-white rounded hover:bg-prometheus-orange/90"
        >
          Restart Assessment
        </button>
      </div>
    );
  }
  
  // Show questions form
  return (
    <>
      {currentPillar && (
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-prometheus-navy mb-2">{currentPillar}</h3>
          <p className="text-sm text-gray-500">
            Section {pillarProgress} of {pillarQuestionCount}
          </p>
        </div>
      )}
      <QuestionsForm 
        currentStep={currentStep} 
        answers={answers} 
        onNext={handleNext} 
        onPrevious={handlePrevious} 
      />
    </>
  );
};

export default QuotientForm;
