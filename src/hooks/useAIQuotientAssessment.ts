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
  | "submit"
  | "thank-you";

export interface UseAIQuotientAssessment {
  currentStep: AssessmentStep;
  userInfo: UserInfo;
  answers: Answer[];
  currentPillar: PillarType;
  currentPillarQuestions: any[];
  allPillars: PillarType[];
  completedPillars: PillarType[];
  result: AssessmentResult | null;
  isTestMode: boolean;
  progress: number;
  updateUserInfo: (data: Partial<UserInfo>) => void;
  submitAnswer: (answer: Answer) => void;
  moveToNextStep: () => void;
  moveToPreviousStep: () => void;
  setCurrentPillar: (pillar: PillarType) => void;
  submitToHubSpot: (userInfo: UserInfo, result: AssessmentResult) => Promise<boolean>;
  toggleTestMode: () => void;
}

const initialUserInfo: UserInfo = {
  firstName: "",
  lastName: "",
  email: "",
  company: "",
  companySize: "",
  jobTitle: "",
};

export const useAIQuotientAssessment = (initialTestMode = false): UseAIQuotientAssessment => {
  // State
  const [currentStep, setCurrentStep] = useState<AssessmentStep>("user-info");
  const [userInfo, setUserInfo] = useState<UserInfo>(initialUserInfo);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [currentPillar, setCurrentPillar] = useState<PillarType | null>(null);
  const [completedPillars, setCompletedPillars] = useState<PillarType[]>([]);
  const [isTestMode, setIsTestMode] = useState<boolean>(initialTestMode);

  // Derived values
  const allPillars = useMemo(() => getAllPillars() as PillarType[], []);
  
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
      const newAnswers = [...filtered, answer];
      
      // Check if all questions for current pillar are answered
      const answeredQuestionsInPillar = newAnswers.filter(a => a.pillar === currentPillar).length;
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
            setCurrentStep("results");
          }
        }
      }
      
      return newAnswers;
    });
  }, [currentPillar, completedPillars, isTestMode, allPillars]);

  // Navigation functions
  const moveToNextStep = useCallback(() => {
    setCurrentStep(prev => {
      switch (prev) {
        case "user-info": return "questions";
        case "questions": return "results";
        case "results": return "submit";
        case "submit": return "thank-you";
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
        case "thank-you": return "submit";
        default: return prev;
      }
    });
  }, []);

  // HubSpot submission
  const submitToHubSpot = useCallback(async (userInfo: UserInfo, result: AssessmentResult): Promise<boolean> => {
    if (!result) {
      console.error("No assessment result available");
      return false;
    }
    
    try {
      // Ensure all required fields are present
      const formattedUserInfo: UserInfo = {
        firstName: userInfo.firstName || '',
        lastName: userInfo.lastName || '',
        email: userInfo.email || '',
        company: userInfo.company || '',
        companySize: userInfo.companySize || '',
        jobTitle: userInfo.jobTitle || '',
      };

      const hubspotData = prepareHubspotData(formattedUserInfo, result, answers);
      console.log("Prepared HubSpot data:", hubspotData);
      
      // Submit to HubSpot forms API
      const response = await fetch(`https://api.hsforms.com/submissions/v3/integration/submit/40043781/8309ec82-bc28-4185-bade-8e73f33d2b08`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          fields: Object.entries(hubspotData).map(([name, value]) => ({
            name,
            value: value?.toString() || ''
          })),
          context: {
            pageUri: window.location.href,
            pageName: document.title
          }
        })
      });

      const responseData = await response.json();
      console.log("HubSpot API response:", responseData);

      if (!response.ok) {
        console.error("HubSpot API error:", responseData);
        throw new Error(`Failed to submit to HubSpot: ${responseData.message || 'Unknown error'}`);
      }

      if (!responseData.inlineMessage) {
        console.error("No inline message in response:", responseData);
        throw new Error('Invalid response from HubSpot API');
      }

      return true;
    } catch (error) {
      console.error("Error submitting to HubSpot:", error);
      if (error instanceof Error) {
        console.error("Error details:", error.message);
      }
      return false;
    }
  }, [answers]);

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

  const handleUserInfoSubmit = (data: Partial<UserInfo>) => {
    setUserInfo(prev => ({ ...prev, ...data }));
    setCurrentStep("questions");
  };

  const handleSubmitResults = async () => {
    if (!userInfo || !result) return false;

    try {
      const success = await submitToHubSpot(userInfo, result);
      if (success) {
        setCurrentStep("complete");
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error submitting results:", error);
      return false;
    }
  };

  return {
    currentStep,
    userInfo,
    answers,
    currentPillar: safeCurrentPillar,
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
