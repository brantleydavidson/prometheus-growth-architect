export interface UserInfo {
  firstName?: string;
  lastName?: string;
  email?: string;
  company: string;
  companySize?: string;
}

export interface QuestionOption {
  id: string;
  text: string;
  value: number;
}

export interface Question {
  id: number;
  question: string;
  pillar: PillarType;
  options: QuestionOption[];
}

export type PillarType = 
  | "Data Spine Health"
  | "Funnel Intelligence & Attribution"
  | "Automation Maturity"
  | "AI-Ready Content Operations"
  | "Governance & Change Management";

export interface Answer {
  questionId: number;
  optionId: string;
  value: number;
  pillar: PillarType;
}

export interface PillarScore {
  pillar: PillarType;
  score: number;
  maxScore: number;
  percentage: number;
}

export interface AssessmentResult {
  totalScore: number;
  maxPossibleScore: number;
  percentage: number;
  readinessLevel: ReadinessLevel;
  pillarScores: PillarScore[];
}

export type ReadinessLevel = 
  | "AI Innovator"
  | "AI Ready" 
  | "AI Emerging" 
  | "AI Developing";

export interface AssessmentFormProps {
  testMode?: boolean;
}
