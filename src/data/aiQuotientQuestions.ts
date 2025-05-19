import { Question, PillarType } from "@/types/aiQuotient";

// Complete set of questions for the AI Quotient Assessment
export const questions: Question[] = [
  // Data Spine Health
  {
    id: 1,
    question: "How are your primary RevOps data sources (CRM, marketing automation, ERP, CS) integrated?",
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
    question: "How clean and standardized is your customer data across systems?",
    pillar: "Data Spine Health",
    options: [
      { id: "2A", text: "Significant data quality issues and inconsistencies", value: 1 },
      { id: "2B", text: "Basic data cleaning but still some inconsistencies", value: 2 },
      { id: "2C", text: "Regular data cleansing and standardization processes", value: 3 },
      { id: "2D", text: "Automated data quality monitoring and enrichment", value: 4 }
    ]
  },
  {
    id: 3,
    question: "How do you handle data governance and security?",
    pillar: "Data Spine Health",
    options: [
      { id: "3A", text: "Ad-hoc approach with minimal controls", value: 1 },
      { id: "3B", text: "Basic policies but limited enforcement", value: 2 },
      { id: "3C", text: "Comprehensive governance framework with regular audits", value: 3 },
      { id: "3D", text: "Advanced governance with automated compliance monitoring", value: 4 }
    ]
  },
  {
    id: 4,
    question: "How do you manage data access and permissions?",
    pillar: "Data Spine Health",
    options: [
      { id: "4A", text: "Basic role-based access control", value: 1 },
      { id: "4B", text: "Department-level access management", value: 2 },
      { id: "4C", text: "Granular permissions with audit trails", value: 3 },
      { id: "4D", text: "Zero-trust architecture with dynamic access control", value: 4 }
    ]
  },
  {
    id: 5,
    question: "How do you handle historical data and analytics?",
    pillar: "Data Spine Health",
    options: [
      { id: "5A", text: "Limited historical data retention", value: 1 },
      { id: "5B", text: "Basic archival system with manual retrieval", value: 2 },
      { id: "5C", text: "Automated archival with easy access to historical data", value: 3 },
      { id: "5D", text: "Full data lifecycle management with predictive analytics", value: 4 }
    ]
  },

  // Funnel Intelligence & Attribution
  {
    id: 6,
    question: "How do you track attribution across marketing touchpoints?",
    pillar: "Funnel Intelligence & Attribution",
    options: [
      { id: "6A", text: "Basic last-click attribution only", value: 1 },
      { id: "6B", text: "Multi-touch attribution for some channels", value: 2 },
      { id: "6C", text: "Comprehensive multi-touch attribution across channels", value: 3 },
      { id: "6D", text: "AI-powered attribution with predictive modeling", value: 4 }
    ]
  },
  {
    id: 7,
    question: "How do you measure campaign effectiveness?",
    pillar: "Funnel Intelligence & Attribution",
    options: [
      { id: "7A", text: "Basic metrics tracking (clicks, opens)", value: 1 },
      { id: "7B", text: "Channel-specific performance metrics", value: 2 },
      { id: "7C", text: "Cross-channel performance analysis", value: 3 },
      { id: "7D", text: "AI-driven performance optimization", value: 4 }
    ]
  },
  {
    id: 8,
    question: "How do you segment your audience?",
    pillar: "Funnel Intelligence & Attribution",
    options: [
      { id: "8A", text: "Basic demographic segmentation", value: 1 },
      { id: "8B", text: "Behavioral segmentation", value: 2 },
      { id: "8C", text: "Dynamic segmentation based on multiple factors", value: 3 },
      { id: "8D", text: "AI-powered predictive segmentation", value: 4 }
    ]
  },
  {
    id: 9,
    question: "How do you analyze customer journey patterns?",
    pillar: "Funnel Intelligence & Attribution",
    options: [
      { id: "9A", text: "Basic funnel tracking", value: 1 },
      { id: "9B", text: "Multi-step journey mapping", value: 2 },
      { id: "9C", text: "Advanced journey analytics with path analysis", value: 3 },
      { id: "9D", text: "AI-powered journey optimization", value: 4 }
    ]
  },
  {
    id: 10,
    question: "How do you handle lead scoring and qualification?",
    pillar: "Funnel Intelligence & Attribution",
    options: [
      { id: "10A", text: "Manual lead qualification", value: 1 },
      { id: "10B", text: "Basic automated scoring rules", value: 2 },
      { id: "10C", text: "Multi-factor scoring with behavior tracking", value: 3 },
      { id: "10D", text: "AI-powered predictive lead scoring", value: 4 }
    ]
  },

  // Automation Maturity
  {
    id: 11,
    question: "What level of automation exists in your marketing workflows?",
    pillar: "Automation Maturity",
    options: [
      { id: "11A", text: "Minimal automation, mostly manual processes", value: 1 },
      { id: "11B", text: "Basic email automation and some triggered workflows", value: 2 },
      { id: "11C", text: "Cross-channel automation with conditional logic", value: 3 },
      { id: "11D", text: "Advanced predictive automation with self-optimizing workflows", value: 4 }
    ]
  },
  {
    id: 12,
    question: "How do you handle campaign execution?",
    pillar: "Automation Maturity",
    options: [
      { id: "12A", text: "Manual campaign setup and execution", value: 1 },
      { id: "12B", text: "Template-based campaigns with some automation", value: 2 },
      { id: "12C", text: "Automated campaign orchestration", value: 3 },
      { id: "12D", text: "AI-driven campaign optimization and execution", value: 4 }
    ]
  },
  {
    id: 13,
    question: "How do you manage content personalization?",
    pillar: "Automation Maturity",
    options: [
      { id: "13A", text: "Basic mail merge personalization", value: 1 },
      { id: "13B", text: "Segment-based content customization", value: 2 },
      { id: "13C", text: "Dynamic content based on user behavior", value: 3 },
      { id: "13D", text: "AI-powered real-time personalization", value: 4 }
    ]
  },
  {
    id: 14,
    question: "How do you handle A/B testing?",
    pillar: "Automation Maturity",
    options: [
      { id: "14A", text: "Manual A/B testing", value: 1 },
      { id: "14B", text: "Basic automated A/B testing", value: 2 },
      { id: "14C", text: "Multi-variate testing with automation", value: 3 },
      { id: "14D", text: "AI-powered continuous optimization", value: 4 }
    ]
  },
  {
    id: 15,
    question: "How do you manage workflow triggers and actions?",
    pillar: "Automation Maturity",
    options: [
      { id: "15A", text: "Basic time-based triggers", value: 1 },
      { id: "15B", text: "Event-based triggers with simple actions", value: 2 },
      { id: "15C", text: "Complex conditional triggers and actions", value: 3 },
      { id: "15D", text: "AI-powered trigger optimization", value: 4 }
    ]
  },

  // AI-Ready Content Operations
  {
    id: 16,
    question: "How structured is your content for AI utilization?",
    pillar: "AI-Ready Content Operations",
    options: [
      { id: "16A", text: "Unstructured content with minimal metadata", value: 1 },
      { id: "16B", text: "Partially structured with basic tagging", value: 2 },
      { id: "16C", text: "Well-structured content with comprehensive metadata", value: 3 },
      { id: "16D", text: "Fully structured content with semantic tagging and AI-ready APIs", value: 4 }
    ]
  },
  {
    id: 17,
    question: "How do you manage content creation and approval?",
    pillar: "AI-Ready Content Operations",
    options: [
      { id: "17A", text: "Ad-hoc content creation process", value: 1 },
      { id: "17B", text: "Basic workflow for content approval", value: 2 },
      { id: "17C", text: "Structured content creation pipeline", value: 3 },
      { id: "17D", text: "AI-assisted content creation and optimization", value: 4 }
    ]
  },
  {
    id: 18,
    question: "How do you handle content distribution?",
    pillar: "AI-Ready Content Operations",
    options: [
      { id: "18A", text: "Manual content distribution", value: 1 },
      { id: "18B", text: "Scheduled content distribution", value: 2 },
      { id: "18C", text: "Automated multi-channel distribution", value: 3 },
      { id: "18D", text: "AI-optimized content distribution", value: 4 }
    ]
  },
  {
    id: 19,
    question: "How do you measure content performance?",
    pillar: "AI-Ready Content Operations",
    options: [
      { id: "19A", text: "Basic engagement metrics", value: 1 },
      { id: "19B", text: "Content-specific performance tracking", value: 2 },
      { id: "19C", text: "Advanced analytics with attribution", value: 3 },
      { id: "19D", text: "AI-powered content performance optimization", value: 4 }
    ]
  },
  {
    id: 20,
    question: "How do you maintain content consistency?",
    pillar: "AI-Ready Content Operations",
    options: [
      { id: "20A", text: "Manual style guide enforcement", value: 1 },
      { id: "20B", text: "Template-based content creation", value: 2 },
      { id: "20C", text: "Automated style checking and enforcement", value: 3 },
      { id: "20D", text: "AI-powered content standardization", value: 4 }
    ]
  },

  // Governance & Change Management
  {
    id: 21,
    question: "How would you describe your organization's approach to AI governance?",
    pillar: "Governance & Change Management",
    options: [
      { id: "21A", text: "No formal governance structure for AI", value: 1 },
      { id: "21B", text: "Basic policies in place but limited enforcement", value: 2 },
      { id: "21C", text: "Comprehensive governance framework with regular reviews", value: 3 },
      { id: "21D", text: "Advanced governance with ethics committee and continuous monitoring", value: 4 }
    ]
  },
  {
    id: 22,
    question: "How do you manage AI implementation changes?",
    pillar: "Governance & Change Management",
    options: [
      { id: "22A", text: "Ad-hoc change management", value: 1 },
      { id: "22B", text: "Basic change management process", value: 2 },
      { id: "22C", text: "Structured change management framework", value: 3 },
      { id: "22D", text: "AI-aware change management with impact analysis", value: 4 }
    ]
  },
  {
    id: 23,
    question: "How do you handle AI risk assessment?",
    pillar: "Governance & Change Management",
    options: [
      { id: "23A", text: "Minimal risk assessment", value: 1 },
      { id: "23B", text: "Basic risk evaluation process", value: 2 },
      { id: "23C", text: "Comprehensive risk management framework", value: 3 },
      { id: "23D", text: "Advanced AI risk modeling and mitigation", value: 4 }
    ]
  },
  {
    id: 24,
    question: "How do you ensure AI compliance and ethics?",
    pillar: "Governance & Change Management",
    options: [
      { id: "24A", text: "Basic compliance checks", value: 1 },
      { id: "24B", text: "Regular compliance audits", value: 2 },
      { id: "24C", text: "Proactive compliance and ethics framework", value: 3 },
      { id: "24D", text: "Advanced AI ethics monitoring and enforcement", value: 4 }
    ]
  },
  {
    id: 25,
    question: "How do you manage AI-related training and education?",
    pillar: "Governance & Change Management",
    options: [
      { id: "25A", text: "Minimal AI training", value: 1 },
      { id: "25B", text: "Basic AI awareness training", value: 2 },
      { id: "25C", text: "Comprehensive AI education program", value: 3 },
      { id: "25D", text: "Advanced AI capability development program", value: 4 }
    ]
  }
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
