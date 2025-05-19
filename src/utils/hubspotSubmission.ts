import { UserInfo, Answer, AssessmentResult } from "@/types/aiQuotient";

export const prepareHubspotData = (
  userInfo: UserInfo,
  result: AssessmentResult,
  answers: Answer[]
): Record<string, any> => {
  // Ensure all required fields are present and properly formatted
  const hubspotData: Record<string, any> = {
    // Contact properties - ensure we're using the latest user info
    firstname: userInfo.firstName?.trim() || '',
    lastname: userInfo.lastName?.trim() || '',
    email: userInfo.email?.trim() || '',
    company: userInfo.company?.trim() || '',
    company_size: userInfo.companySize?.trim() || '',
    job_title: userInfo.jobTitle?.trim() || '',
    
    // AI Quotient properties
    score__ai_quotient_: Math.round(result.percentage),
    aireadinesscategory: result.readinessLevel?.trim() || '',
    
    // Pillar scores - ensure they are rounded numbers
    pillar_ai_ready_content_operations_percentage: Math.round(result.pillarScores.find(p => p.pillar === "AI-Ready Content Operations")?.percentage || 0),
    pillarautomationmaturitypercentage: Math.round(result.pillarScores.find(p => p.pillar === "Automation Maturity")?.percentage || 0),
    pillardataspinehealthpercentage: Math.round(result.pillarScores.find(p => p.pillar === "Data Spine Health")?.percentage || 0),
    pillarfunnelintelligenceattributionpercentage: Math.round(result.pillarScores.find(p => p.pillar === "Funnel Intelligence & Attribution")?.percentage || 0),
    pillargovernancechangemanagementpercentage: Math.round(result.pillarScores.find(p => p.pillar === "Governance & Change Management")?.percentage || 0),
  };

  // Log the prepared data for debugging
  console.log("Prepared HubSpot data:", hubspotData);

  return hubspotData;
};
