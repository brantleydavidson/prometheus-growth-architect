import React, { useEffect } from 'react';
import UserInfoForm from './aiQuotient/UserInfoForm';
import QuestionsForm from './aiQuotient/QuestionsForm';
import SubmitResultsForm from './aiQuotient/SubmitResultsForm';
import useAiQuotientEngine from '@/features/aiQuotient/useAiQuotientEngine';
import { useHubSpot } from '@/integrations/hubspot/HubSpotProvider';
import { useToast } from '@/hooks/use-toast';

const QuotientForm = () => {
  const { toast } = useToast();
  const engine = useAiQuotientEngine();
  
  // Defensive guard – if hook or state hasn't initialized yet render fallback
  if (!engine || !engine.state || engine.state.currentStep === undefined) {
    return <p className="text-center py-8">Loading assessment…</p>;
  }

  const { state, actions, getPillarProgress } = engine;
  
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
  
  const { portalId, formId } = useHubSpot();
  
  // Log information every time the component renders
  useEffect(() => {
    console.log('QuotientForm rendering state:', { 
      currentStep, 
      userInfoComplete: !!userInfo.firstName,
      answersCount: answers.length,
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
    console.log('==========================================');
  }, [portalId, formId]);
  
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
  if (currentStep === "user-info") {
    return <UserInfoForm initialData={userInfo} onSubmit={handleUserInfoSubmit} />;
  }
  
  // Show results and submit to HubSpot
  if (showResults) {
    const pillarScoresMap = pillarScores.reduce((acc, score) => {
      acc[score.pillar] = score.score;
      return acc;
    }, {} as Record<string, number>);

    const maxPillarScoresMap = maxPillarScores.reduce((acc, score) => {
      acc[score.name] = score.maxScore;
      return acc;
    }, {} as Record<string, number>);

    return (
      <SubmitResultsForm 
        score={score} 
        totalPossible={totalSteps * 4} 
        userInfo={userInfo}
        pillarScores={pillarScoresMap}
        maxPillarScores={maxPillarScoresMap}
        onSubmit={handleSubmitResults}
        isSubmitting={isSubmitting}
        isSubmitted={isSubmitted}
      />
    );
  }
  
  // Get the current pillar progress information
  const { currentPillar, pillarQuestionCount, pillarProgress } = getPillarProgress();
  
  // Valid check before showing question form
  const isValidStep = currentStep === "questions" && totalSteps > 0;
  
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
        currentStep={answers.length} 
        answers={answers} 
        onNext={handleNext} 
        onPrevious={handlePrevious} 
      />
    </>
  );
};

export default QuotientForm;
