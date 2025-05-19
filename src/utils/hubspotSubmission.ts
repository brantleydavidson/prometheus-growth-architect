import { UserInfo, Answer, AssessmentResult } from "@/types/aiQuotient";

export const prepareHubspotData = (
  userInfo: UserInfo,
  result: AssessmentResult,
  answers: Answer[]
): Record<string, any> => {
  const hubspotData: Record<string, any> = {
    // Contact properties
    firstname: userInfo.firstName || '',
    lastname: userInfo.lastName || '',
    email: userInfo.email || '',
    company: userInfo.company || '',
    company_size: userInfo.companySize || '',
    job_title: userInfo.jobTitle || '',
    
    // AI Quotient properties
    score: result.percentage,
    ai_readiness_category: result.readinessLevel,
    
    // Pillar scores
    pillar_ai_ready_content_operations_percentage: result.pillarScores.find(p => p.pillar === "AI-Ready Content Operations")?.percentage || 0,
    pillar_automation_maturity_percentage: result.pillarScores.find(p => p.pillar === "Automation Maturity")?.percentage || 0,
    pillar_data_spine_health_percentage: result.pillarScores.find(p => p.pillar === "Data Spine Health")?.percentage || 0,
    pillar_funnel_intelligence_attribution_percentage: result.pillarScores.find(p => p.pillar === "Funnel Intelligence & Attribution")?.percentage || 0,
    pillar_governance_change_management_percentage: result.pillarScores.find(p => p.pillar === "Governance & Change Management")?.percentage || 0,
  };

  return hubspotData;
};
