
import { useState, useCallback, useMemo } from "react";
import { 
  UserInfo, 
  Answer, 
  AssessmentResult, 
  PillarType 
} from "@/types/aiQuotient";
import { questions, getAllPillars } from "@/data/aiQuotientQuestions";
import { calculateAssessmentResults } from "@/utils/scoreCalculation";
import { prepareHubspotData } from "@/utils/hubspotSubmission";

// Define the steps in the assessment flow
export type AssessmentStep = 
  | "user-info" 
  | "questions" 
  | "results" 
  | "submit";

export interface UseAIQuotientAssessment {
  currentStep: AssessmentStep;
  userInfo: UserInfo;
  answers: Answer[];
  currentPillar: string;
  currentPillarQuestions: any[];
  allPillars: string[];
  completedPillars: string[];
  result: AssessmentResult | null;
  isTestMode: boolean;
  progress: number;
  updateUserInfo: (data: Partial<UserInfo>) => void;
  submitAnswer: (answer: Answer) => void;
  moveToNextStep: () => void;
  moveToPreviousStep: () => void;
  setCurrentPillar: (pillar: string) => void;
  submitToHubSpot: () => Promise<boolean>;
  toggleTestMode: () => void;
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
  const [currentPillar, setCurrentPillar] = useState<string>("");
  const [completedPillars, setCompletedPillars] = useState<string[]>([]);
  const [isTestMode, setIsTestMode] = useState<boolean>(initialTestMode);

  // Derived values
  const allPillars = useMemo(() => getAllPillars(), []);
  
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
      if (!completedPillars.includes(currentPillar)) {
        setCompletedPillars(prev => [...prev, currentPillar]);
      }
      
      // Move to next pillar or to results if all pillars completed
      const currentPillarIndex = allPillars.indexOf(currentPillar);
      if (currentPillarIndex < allPillars.length - 1) {
        setCurrentPillar(allPillars[currentPillarIndex + 1]);
      } else {
        setCurrentStep("results");
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
      const hubspotData = prepareHubspotData(userInfo, result, answers);
      console.log("Submitting to HubSpot:", hubspotData);
      
      // Replace with your actual HubSpot submission logic
      // This is a placeholder for the HubSpot API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return true;
    } catch (error) {
      console.error("Error submitting to HubSpot:", error);
      return false;
    }
  }, [userInfo, result, answers]);

  // Toggle test mode
  const toggleTestMode = useCallback(() => {
    setIsTestMode(prev => !prev);
    // Reset answers when toggling test mode
    setAnswers([]);
    setCompletedPillars([]);
    setCurrentPillar(allPillars[0]);
  }, [allPillars]);

  return {
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
    setCurrentPillar,
    submitToHubSpot,
    toggleTestMode
  };
};
