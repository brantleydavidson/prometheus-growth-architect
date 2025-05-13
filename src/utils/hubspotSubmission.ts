
import { UserInfo, Answer, AssessmentResult } from "@/types/aiQuotient";

// Format pillar name for HubSpot property mapping
export const formatPillarNameForHubSpot = (pillar: string): string => {
  return pillar
    .toLowerCase()
    .replace(/\s+&\s+/g, '_and_')  // Replace & with _and_
    .replace(/[^a-z0-9]+/g, '_')   // Replace spaces and special chars with underscore
    .replace(/^_|_$/g, '');        // Remove leading/trailing underscores
};

// Prepare data for HubSpot submission
export const prepareHubspotData = (
  userInfo: UserInfo,
  result: AssessmentResult,
  answers: Answer[]
): Record<string, any> => {
  // Base properties from user info
  const hubspotData: Record<string, any> = {
    firstname: userInfo.firstName,
    lastname: userInfo.lastName,
    email: userInfo.email,
    company: userInfo.company,
    ai_quotient_score: result.percentage,
    ai_readiness_level: result.readinessLevel,
  };
  
  // Add pillar scores
  result.pillarScores.forEach(pillarScore => {
    const formattedName = formatPillarNameForHubSpot(pillarScore.pillar);
    hubspotData[`ai_pillar_${formattedName}_score`] = pillarScore.percentage;
  });
  
  // Add individual question answers if needed
  answers.forEach(answer => {
    const questionId = `q${answer.questionId}`;
    hubspotData[`ai_quotient_${questionId}`] = answer.value;
  });
  
  return hubspotData;
};
