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
    jobtitle: userInfo.jobTitle?.trim() || '',
    
    // AI Quotient properties
    score__ai_quotient_: Math.round(result.percentage),
    aireadinesscategory: result.readinessLevel?.trim() || '',
    aitestscore: result.totalScore,
    aitestscorepercentage: Math.round(result.percentage),
    requesteddetailedreport: true,
    additional_comments: ''
  };

  // Add pillar scores from the result object
  result.pillarScores.forEach(pillar => {
    const baseName = `pillar${pillar.pillar.toLowerCase().replace(/[^a-z0-9]/g, '')}`;
    hubspotData[`${baseName}`] = pillar.score;
    hubspotData[`${baseName}percentage`] = Math.round(pillar.percentage);
  });

  // Log the prepared data for debugging
  console.log("Prepared HubSpot data:", hubspotData);

  return hubspotData;
};
