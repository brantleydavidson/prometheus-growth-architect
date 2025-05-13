
import { Answer, PillarScore, PillarType, ReadinessLevel, AssessmentResult } from "@/types/aiQuotient";
import { questions } from "@/data/aiQuotientQuestions";

// Calculate scores for each pillar
export const calculatePillarScores = (answers: Answer[]): PillarScore[] => {
  const pillarMap = new Map<PillarType, { score: number, count: number }>();
  
  // Initialize pillar map with all possible pillars
  questions.forEach(question => {
    if (!pillarMap.has(question.pillar)) {
      pillarMap.set(question.pillar, { score: 0, count: 0 });
    }
  });
  
  // Calculate scores for each pillar
  answers.forEach(answer => {
    const pillarData = pillarMap.get(answer.pillar);
    if (pillarData) {
      pillarData.score += answer.value;
      pillarData.count += 1;
    }
  });
  
  // Convert to array of PillarScore objects
  return Array.from(pillarMap.entries()).map(([pillar, data]) => {
    const maxScore = data.count * 4; // Each question has a max score of 4
    return {
      pillar,
      score: data.score,
      maxScore,
      percentage: maxScore > 0 ? Math.round((data.score / maxScore) * 100) : 0
    };
  });
};

// Determine readiness level based on percentage
export const determineReadinessLevel = (percentage: number): ReadinessLevel => {
  if (percentage >= 80) return "AI Innovator";
  if (percentage >= 60) return "AI Ready";
  if (percentage >= 40) return "AI Emerging";
  return "AI Developing";
};

// Calculate overall assessment results
export const calculateAssessmentResults = (answers: Answer[]): AssessmentResult => {
  const pillarScores = calculatePillarScores(answers);
  
  const totalScore = pillarScores.reduce((sum, pillar) => sum + pillar.score, 0);
  const maxPossibleScore = pillarScores.reduce((sum, pillar) => sum + pillar.maxScore, 0);
  const percentage = maxPossibleScore > 0 ? Math.round((totalScore / maxPossibleScore) * 100) : 0;
  
  return {
    totalScore,
    maxPossibleScore,
    percentage,
    readinessLevel: determineReadinessLevel(percentage),
    pillarScores
  };
};

// Get color based on readiness level
export const getReadinessLevelColor = (readinessLevel: ReadinessLevel): string => {
  switch (readinessLevel) {
    case "AI Innovator": return "bg-green-500";
    case "AI Ready": return "bg-blue-500";
    case "AI Emerging": return "bg-amber-500";
    case "AI Developing": return "bg-red-500";
    default: return "bg-gray-500";
  }
};

// Get text color based on readiness level
export const getReadinessLevelTextColor = (readinessLevel: ReadinessLevel): string => {
  switch (readinessLevel) {
    case "AI Innovator": return "text-green-500";
    case "AI Ready": return "text-blue-500";
    case "AI Emerging": return "text-amber-500";
    case "AI Developing": return "text-red-500";
    default: return "text-gray-500";
  }
};
