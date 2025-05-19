export interface Question {
  id: string;
  text: string;
  options: {
    value: string;
    label: string;
    score: number;
  }[];
  pillar: string;
}

export interface Pillar {
  name: string;
  description: string;
  questions: Question[];
}

export interface PillarScore {
  name: string;
  score: number;
  maxScore: number;
  description: string;
}

export const pillars: Pillar[] = [
  {
    name: "Data Infrastructure",
    description: "Your organization's ability to collect, store, and manage data effectively",
    questions: [
      {
        id: "data-1",
        text: "How would you describe your organization's current data collection capabilities?",
        options: [
          { value: "none", label: "No formal data collection process", score: 0 },
          { value: "basic", label: "Basic data collection in some areas", score: 1 },
          { value: "moderate", label: "Structured data collection across most departments", score: 2 },
          { value: "advanced", label: "Comprehensive data collection with automated systems", score: 3 }
        ],
        pillar: "Data Infrastructure"
      },
      {
        id: "data-2",
        text: "What is the state of your data storage infrastructure?",
        options: [
          { value: "none", label: "No centralized data storage", score: 0 },
          { value: "basic", label: "Basic file storage systems", score: 1 },
          { value: "moderate", label: "Structured databases with some cloud storage", score: 2 },
          { value: "advanced", label: "Advanced cloud-based data warehouse with redundancy", score: 3 }
        ],
        pillar: "Data Infrastructure"
      }
    ]
  },
  {
    name: "AI Strategy",
    description: "Your organization's vision and planning for AI implementation",
    questions: [
      {
        id: "strategy-1",
        text: "Does your organization have a defined AI strategy?",
        options: [
          { value: "none", label: "No AI strategy in place", score: 0 },
          { value: "basic", label: "Basic understanding of AI potential", score: 1 },
          { value: "moderate", label: "Defined AI strategy with some implementation", score: 2 },
          { value: "advanced", label: "Comprehensive AI strategy with clear roadmap", score: 3 }
        ],
        pillar: "AI Strategy"
      },
      {
        id: "strategy-2",
        text: "How is AI integrated into your business goals?",
        options: [
          { value: "none", label: "AI not considered in business goals", score: 0 },
          { value: "basic", label: "AI mentioned in some goals", score: 1 },
          { value: "moderate", label: "AI integrated into key business objectives", score: 2 },
          { value: "advanced", label: "AI is a core driver of business strategy", score: 3 }
        ],
        pillar: "AI Strategy"
      }
    ]
  },
  {
    name: "Technical Capabilities",
    description: "Your organization's technical expertise and infrastructure for AI",
    questions: [
      {
        id: "tech-1",
        text: "What is your organization's level of AI technical expertise?",
        options: [
          { value: "none", label: "No AI technical expertise", score: 0 },
          { value: "basic", label: "Basic understanding of AI concepts", score: 1 },
          { value: "moderate", label: "Some AI implementation experience", score: 2 },
          { value: "advanced", label: "Advanced AI development capabilities", score: 3 }
        ],
        pillar: "Technical Capabilities"
      },
      {
        id: "tech-2",
        text: "How would you describe your AI infrastructure?",
        options: [
          { value: "none", label: "No AI infrastructure", score: 0 },
          { value: "basic", label: "Basic cloud computing resources", score: 1 },
          { value: "moderate", label: "Dedicated AI development environment", score: 2 },
          { value: "advanced", label: "Advanced AI infrastructure with GPU support", score: 3 }
        ],
        pillar: "Technical Capabilities"
      }
    ]
  },
  {
    name: "Organizational Readiness",
    description: "Your organization's culture and processes for AI adoption",
    questions: [
      {
        id: "org-1",
        text: "How would you describe your organization's AI culture?",
        options: [
          { value: "none", label: "Resistant to AI adoption", score: 0 },
          { value: "basic", label: "Open to learning about AI", score: 1 },
          { value: "moderate", label: "Actively exploring AI opportunities", score: 2 },
          { value: "advanced", label: "AI-first mindset across organization", score: 3 }
        ],
        pillar: "Organizational Readiness"
      },
      {
        id: "org-2",
        text: "What is your organization's approach to AI training?",
        options: [
          { value: "none", label: "No AI training programs", score: 0 },
          { value: "basic", label: "Basic AI awareness training", score: 1 },
          { value: "moderate", label: "Regular AI training for key teams", score: 2 },
          { value: "advanced", label: "Comprehensive AI training program", score: 3 }
        ],
        pillar: "Organizational Readiness"
      }
    ]
  }
];

export const getQuestionsByPillar = (pillarName: string): Question[] => {
  const pillar = pillars.find(p => p.name === pillarName);
  return pillar ? pillar.questions : [];
};

export const getPillarDescription = (pillarName: string): string => {
  const pillar = pillars.find(p => p.name === pillarName);
  return pillar ? pillar.description : '';
};

export const getTotalPossibleScore = (): number => {
  return pillars.reduce((total, pillar) => {
    return total + pillar.questions.reduce((pillarTotal, question) => {
      return pillarTotal + Math.max(...question.options.map(opt => opt.score));
    }, 0);
  }, 0);
};

export const getMaxPillarScore = (pillarName: string): number => {
  const pillar = pillars.find(p => p.name === pillarName);
  if (!pillar) return 0;
  
  return pillar.questions.reduce((total, question) => {
    return total + Math.max(...question.options.map(opt => opt.score));
  }, 0);
};
