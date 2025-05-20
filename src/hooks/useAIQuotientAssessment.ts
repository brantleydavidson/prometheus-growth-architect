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
  progress: number;
  updateUserInfo: (data: Partial<UserInfo>) => void;
  submitAnswer: (answer: Answer) => void;
  moveToNextStep: () => void;
  moveToPreviousStep: (pillar?: PillarType, questionIndex?: number) => void;
  setCurrentPillar: (pillar: PillarType) => void;
  submitToHubSpot: (userInfo: UserInfo, result: AssessmentResult) => Promise<boolean>;
  globalQuestionIndex: number;
}

const initialUserInfo: UserInfo = {
  firstName: "",
  lastName: "",
  email: "",
  company: "",
  companySize: "",
  jobTitle: "",
};

export const useAIQuotientAssessment = (): UseAIQuotientAssessment => {
  // State
  const [currentStep, setCurrentStep] = useState<AssessmentStep>("user-info");
  const [userInfo, setUserInfo] = useState<UserInfo>(initialUserInfo);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [currentPillar, setCurrentPillar] = useState<PillarType | null>(null);
  const [completedPillars, setCompletedPillars] = useState<PillarType[]>([]);
  const [globalQuestionIndex, setGlobalQuestionIndex] = useState(0);

  // Derived values
  const allPillars = useMemo(() => getAllPillars() as PillarType[], []);
  const allQuestions = useMemo(() => questions, []);
  
  // Set initial pillar if not set
  if (!currentPillar && allPillars.length > 0) {
    setCurrentPillar(allPillars[0]);
  }

  // Filter questions for current pillar
  const currentPillarQuestions = useMemo(() => {
    if (!currentPillar) return [];
    return questions.filter(q => q.pillar === currentPillar);
  }, [currentPillar]);

  // Calculate assessment result
  const result = useMemo(() => {
    return answers.length > 0 ? calculateAssessmentResults(answers) : null;
  }, [answers]);

  // Calculate progress percentage
  const progress = useMemo(() => {
    return Math.round((answers.length / questions.length) * 100);
  }, [answers.length]);

  // Update user information
  const updateUserInfo = useCallback((data: Partial<UserInfo>) => {
    // Immediately update the state with the new data
    const updatedUserInfo = { ...userInfo, ...data };
    setUserInfo(updatedUserInfo);
    
    // Log the update for debugging
    console.log("User info updated:", {
      previous: userInfo,
      new: data,
      updated: updatedUserInfo
    });
  }, [userInfo]);

  // Submit an answer
  const submitAnswer = useCallback((answer: Answer) => {
    setAnswers(prev => {
      // Replace answer if already exists for this question
      const filtered = prev.filter(a => a.questionId !== answer.questionId);
      const newAnswers = [...filtered, answer];
      
      // Move to next question
      setGlobalQuestionIndex(prev => prev + 1);
      
      // Check if we've completed all questions
      if (globalQuestionIndex + 1 >= questions.length) {
        setCurrentStep("results");
      } else {
        // Find the next question's pillar
        const nextQuestion = questions[globalQuestionIndex + 1];
        if (nextQuestion && nextQuestion.pillar !== currentPillar) {
          setCurrentPillar(nextQuestion.pillar);
        }
      }
      
      return newAnswers;
    });
  }, [currentPillar, globalQuestionIndex, questions.length]);

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

  const moveToPreviousStep = useCallback((pillar?: PillarType, questionIndex?: number) => {
    if (pillar && typeof questionIndex === 'number') {
      // If we're navigating between questions in different pillars
      setCurrentPillar(pillar);
      setGlobalQuestionIndex(questionIndex);
    } else if (globalQuestionIndex > 0) {
      // If we're navigating between questions in the same pillar
      setGlobalQuestionIndex(prev => prev - 1);
      // Find the previous question's pillar
      const prevQuestion = allQuestions[globalQuestionIndex - 1];
      if (prevQuestion && prevQuestion.pillar !== currentPillar) {
        setCurrentPillar(prevQuestion.pillar);
      }
    } else {
      // If we're at the first question, go back to user info
      setCurrentStep(prev => {
        switch (prev) {
          case "questions": return "user-info";
          case "results": return "questions";
          case "submit": return "results";
          case "thank-you": return "submit";
          default: return prev;
        }
      });
    }
  }, [globalQuestionIndex, currentPillar, allQuestions]);

  // HubSpot submission
  const submitToHubSpot = useCallback(async (userInfo: UserInfo, result: AssessmentResult): Promise<boolean> => {
    if (!result) {
      console.error("No assessment result available");
      return false;
    }
    
    try {
      // Use the provided userInfo directly - don't rely on state
      const formattedUserInfo: UserInfo = {
        firstName: userInfo.firstName?.trim() || '',
        lastName: userInfo.lastName?.trim() || '',
        email: userInfo.email?.trim() || '',
        company: userInfo.company?.trim() || '',
        companySize: userInfo.companySize?.trim() || '',
        jobTitle: userInfo.jobTitle?.trim() || '',
      };

      // Log the exact data being sent
      console.log("Submitting to HubSpot with exact data:", {
        userInfo: formattedUserInfo,
        result
      });

      const hubspotData = prepareHubspotData(formattedUserInfo, result, answers);
      console.log("Prepared HubSpot data:", hubspotData);
      
      // Submit to HubSpot forms API
      const formData = {
        fields: Object.entries(hubspotData).map(([name, value]) => ({
          name,
          value: value?.toString() || ''
        })),
        context: {
          pageUri: window.location.href,
          pageName: document.title
        }
      };

      console.log("Final form data being sent:", formData);

      // Submit to HubSpot forms API
      const response = await fetch(`https://api.hsforms.com/submissions/v3/integration/submit/40043781/8309ec82-bc28-4185-bade-8e73f33d2b08`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const responseData = await response.json();
      console.log("HubSpot API response:", responseData);

      if (!response.ok) {
        console.error("HubSpot API error:", responseData);
        throw new Error(`Failed to submit to HubSpot: ${responseData.message || 'Unknown error'}`);
      }

      // Only update state after successful submission
      setUserInfo(formattedUserInfo);
      return true;
    } catch (error) {
      console.error("Error submitting to HubSpot:", error);
      return false;
    }
  }, [answers]);

  // For TypeScript safety, ensure currentPillar is always a PillarType
  const safeCurrentPillar = currentPillar || (allPillars.length > 0 ? allPillars[0] : "Data Spine Health");

  return {
    currentStep,
    userInfo,
    answers,
    currentPillar: safeCurrentPillar,
    currentPillarQuestions,
    allPillars,
    completedPillars,
    result,
    progress,
    updateUserInfo,
    submitAnswer,
    moveToNextStep,
    moveToPreviousStep,
    setCurrentPillar,
    submitToHubSpot,
    globalQuestionIndex
  };
};
