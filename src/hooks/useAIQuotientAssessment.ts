import * as React from "react";
import { useState, useCallback, useMemo } from "react";
import { 
  UserInfo, 
  Answer, 
  AssessmentResult,
  PillarType,
  PillarScore
} from "@/types/aiQuotient";
import { questions, getAllPillars } from "@/data/aiQuotientQuestions";
import { calculateAssessmentResults } from "@/utils/scoreCalculation";
import { prepareHubspotData } from "@/utils/hubspotSubmission";
import { pillars, getQuestionsByPillar, getMaxPillarScore, getTotalPossibleScore } from '@/data/aiQuotientQuestions';

// Define the steps in the assessment flow
export type AssessmentStep = 
  | "user-info" 
  | "questions" 
  | "results" 
  | "submit";

export interface AssessmentState {
  currentStep: AssessmentStep;
  userInfo: UserInfo;
  answers: Answer[];
  score: number;
  pillarScores: PillarScore[];
  showResults: boolean;
  isSubmitting: boolean;
  isSubmitted: boolean;
  totalSteps: number;
  maxPillarScores: { name: string; maxScore: number; }[];
}

export interface AssessmentActions {
  handleUserInfoSubmit: (data: Partial<UserInfo>) => void;
  handleNext: () => void;
  handlePrevious: () => void;
  handleSubmitResults: () => Promise<boolean>;
}

export interface UseAIQuotientAssessment {
  state: AssessmentState;
  actions: AssessmentActions;
  getPillarProgress: () => {
    currentPillar: string;
    pillarQuestionCount: number;
    pillarProgress: number;
  };
}

const initialUserInfo: UserInfo = {
  firstName: "",
  lastName: "",
  email: "",
  company: "",
};

export const useAIQuotientAssessment = (initialTestMode = false): UseAIQuotientAssessment => {
  // State
  const [currentStep, setCurrentStep] = useState<AssessmentStep>("user-info");
  const [userInfo, setUserInfo] = useState<UserInfo>(initialUserInfo);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [currentPillar, setCurrentPillar] = useState<PillarType | null>(null);
  const [completedPillars, setCompletedPillars] = useState<PillarType[]>([]);
  const [isTestMode, setIsTestMode] = useState<boolean>(initialTestMode);
  const [showResults, setShowResults] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Derived values
  const allPillars = useMemo(() => {
    const pillars = getAllPillars();
    return pillars.map(p => p.name as PillarType);
  }, []);
  
  // Set initial pillar if not set
  if (!currentPillar && allPillars.length > 0) {
    setCurrentPillar(allPillars[0]);
  }

  // Filter questions for current pillar
  const currentPillarQuestions = useMemo(() => {
    if (!currentPillar) return [];
    
    // In test mode, only show one question per pillar
    if (isTestMode) {
      return questions.filter(q => q.pillar === currentPillar).slice(0, 1);
    }
    
    return questions.filter(q => q.pillar === currentPillar);
  }, [currentPillar, isTestMode]);

  // Calculate assessment result
  const result = useMemo(() => {
    return answers.length > 0 ? calculateAssessmentResults(answers) : null;
  }, [answers]);

  // Calculate progress percentage
  const progress = useMemo(() => {
    const totalQuestions = isTestMode ? allPillars.length : questions.length;
    return Math.round((answers.length / totalQuestions) * 100);
  }, [answers.length, allPillars.length, isTestMode]);

  // Update user information
  const updateUserInfo = useCallback((data: Partial<UserInfo>) => {
    setUserInfo(prev => ({ ...prev, ...data }));
  }, []);

  // Submit an answer
  const submitAnswer = useCallback((answer: Answer) => {
    setAnswers(prev => {
      // Replace answer if already exists for this question
      const filtered = prev.filter(a => a.questionId !== answer.questionId);
      return [...filtered, answer];
    });
    
    // Check if all questions for current pillar are answered
    const answeredQuestionsInPillar = answers.filter(a => a.pillar === currentPillar).length + 1;
    const totalQuestionsInPillar = isTestMode ? 1 : questions.filter(q => q.pillar === currentPillar).length;
    
    if (answeredQuestionsInPillar >= totalQuestionsInPillar) {
      // Mark this pillar as completed
      if (currentPillar && !completedPillars.includes(currentPillar)) {
        setCompletedPillars(prev => [...prev, currentPillar]);
      }
      
      // Move to next pillar or to results if all pillars completed
      if (currentPillar) {
        const currentPillarIndex = allPillars.indexOf(currentPillar);
        if (currentPillarIndex < allPillars.length - 1) {
          setCurrentPillar(allPillars[currentPillarIndex + 1]);
        } else {
          setShowResults(true);
        }
      }
    }
  }, [answers, currentPillar, completedPillars, isTestMode, allPillars]);

  // Navigation functions
  const moveToNextStep = useCallback(() => {
    setCurrentStep(prev => {
      switch (prev) {
        case "user-info": return "questions";
        case "questions": return "results";
        case "results": return "submit";
        default: return prev;
      }
    });
  }, []);

  const moveToPreviousStep = useCallback(() => {
    setCurrentStep(prev => {
      switch (prev) {
        case "questions": return "user-info";
        case "results": return "questions";
        case "submit": return "results";
        default: return prev;
      }
    });
  }, []);

  // HubSpot submission
  const submitToHubSpot = useCallback(async (): Promise<boolean> => {
    if (!result) return false;
    
    try {
      setIsSubmitting(true);
      const hubspotData = prepareHubspotData({
        userInfo,
        score: result.totalScore,
        totalPossible: getTotalPossibleScore(),
        pillarScores: result.pillarScores,
        additionalInfo: {
          jobTitle: userInfo.jobTitle,
          phoneNumber: userInfo.phoneNumber,
          comments: userInfo.comments
        }
      });
      console.log("Submitting to HubSpot:", hubspotData);
      
      // Replace with your actual HubSpot submission logic
      // This is a placeholder for the HubSpot API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setIsSubmitted(true);
      return true;
    } catch (error) {
      console.error("Error submitting to HubSpot:", error);
      return false;
    } finally {
      setIsSubmitting(false);
    }
  }, [userInfo, result]);

  // Toggle test mode
  const toggleTestMode = useCallback(() => {
    setIsTestMode(prev => !prev);
    // Reset answers when toggling test mode
    setAnswers([]);
    setCompletedPillars([]);
    if (allPillars.length > 0) {
      setCurrentPillar(allPillars[0]);
    }
  }, [allPillars]);

  // For TypeScript safety, ensure currentPillar is always a PillarType
  // If it's null (which shouldn't happen due to our initialization),
  // use the first pillar from allPillars or a default PillarType
  const safeCurrentPillar = currentPillar || (allPillars.length > 0 ? allPillars[0] : "Data Spine Health");

  // Calculate pillar progress
  const getPillarProgress = useCallback(() => {
    const pillarIndex = allPillars.indexOf(safeCurrentPillar);
    const pillarQuestionCount = currentPillarQuestions.length;
    const pillarProgress = answers.filter(a => a.pillar === safeCurrentPillar).length + 1;
    
    return {
      currentPillar: safeCurrentPillar,
      pillarQuestionCount,
      pillarProgress
    };
  }, [safeCurrentPillar, currentPillarQuestions, answers, allPillars]);

  // Prepare state and actions for the component
  const state: AssessmentState = {
    currentStep,
    userInfo,
    answers,
    score: result?.totalScore || 0,
    pillarScores: result?.pillarScores || [],
    showResults,
    isSubmitting,
    isSubmitted,
    totalSteps: questions.length,
    maxPillarScores: allPillars.map(pillar => ({
      name: pillar,
      maxScore: getMaxPillarScore(pillar)
    }))
  };

  const actions: AssessmentActions = {
    handleUserInfoSubmit: updateUserInfo,
    handleNext: moveToNextStep,
    handlePrevious: moveToPreviousStep,
    handleSubmitResults: submitToHubSpot
  };

  return {
    state,
    actions,
    getPillarProgress
  };
};
