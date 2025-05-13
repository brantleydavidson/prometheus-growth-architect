
import { Question, PillarType } from "@/types/aiQuotient";

// Sample questions for the AI Quotient Assessment
// In a real implementation, you might want to expand this with all 25 questions
export const questions: Question[] = [
  {
    id: 1,
    question: "How are your primary RevOps data sources integrated?",
    pillar: "Data Spine Health",
    options: [
      { id: "1A", text: "Manual exports/imports", value: 1 },
      { id: "1B", text: "Some point-to-point sync", value: 2 },
      { id: "1C", text: "Near-real-time native/middleware sync", value: 3 },
      { id: "1D", text: "Central lakehouse gives real-time, bidirectional access", value: 4 }
    ]
  },
  {
    id: 2,
    question: "How do you track attribution across marketing touchpoints?",
    pillar: "Funnel Intelligence & Attribution",
    options: [
      { id: "2A", text: "Basic last-click attribution only", value: 1 },
      { id: "2B", text: "Multi-touch attribution for some channels", value: 2 },
      { id: "2C", text: "Comprehensive multi-touch attribution across channels", value: 3 },
      { id: "2D", text: "AI-powered attribution with predictive modeling", value: 4 }
    ]
  },
  {
    id: 3,
    question: "What level of automation exists in your marketing workflows?",
    pillar: "Automation Maturity",
    options: [
      { id: "3A", text: "Minimal automation, mostly manual processes", value: 1 },
      { id: "3B", text: "Basic email automation and some triggered workflows", value: 2 },
      { id: "3C", text: "Cross-channel automation with conditional logic", value: 3 },
      { id: "3D", text: "Advanced predictive automation with self-optimizing workflows", value: 4 }
    ]
  },
  {
    id: 4,
    question: "How structured is your content for AI utilization?",
    pillar: "AI-Ready Content Operations",
    options: [
      { id: "4A", text: "Unstructured content with minimal metadata", value: 1 },
      { id: "4B", text: "Partially structured with basic tagging", value: 2 },
      { id: "4C", text: "Well-structured content with comprehensive metadata", value: 3 },
      { id: "4D", text: "Fully structured content with semantic tagging and AI-ready APIs", value: 4 }
    ]
  },
  {
    id: 5,
    question: "How would you describe your organization's approach to AI governance?",
    pillar: "Governance & Change Management",
    options: [
      { id: "5A", text: "No formal governance structure for AI", value: 1 },
      { id: "5B", text: "Basic policies in place but limited enforcement", value: 2 },
      { id: "5C", text: "Comprehensive governance framework with regular reviews", value: 3 },
      { id: "5D", text: "Advanced governance with ethics committee and continuous monitoring", value: 4 }
    ]
  },
  // Add more questions to reach 25 total (5 per pillar)
  {
    id: 6,
    question: "How would you describe the quality of your customer data?",
    pillar: "Data Spine Health",
    options: [
      { id: "6A", text: "Fragmented with significant quality issues", value: 1 },
      { id: "6B", text: "Partially consolidated with some data cleaning", value: 2 },
      { id: "6C", text: "Well-maintained with regular quality checks", value: 3 },
      { id: "6D", text: "Comprehensive data quality framework with automated enrichment", value: 4 }
    ]
  }
  // Additional questions would be added here to complete the set of 25
];

// Helper function to get questions by pillar
export const getQuestionsByPillar = (pillar: PillarType) => {
  return questions.filter(q => q.pillar === pillar);
};

// Get all unique pillars
export const getAllPillars = (): PillarType[] => {
  const pillars = new Set(questions.map(q => q.pillar));
  return Array.from(pillars) as PillarType[];
};
