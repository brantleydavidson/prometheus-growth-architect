import { UserInfo, Answer, AssessmentResult } from "@/types/aiQuotient";

export const prepareHubspotData = (
  userInfo: UserInfo,
  result: AssessmentResult,
  answers: Answer[]
): Record<string, any> => {
  const hubspotData: Record<string, any> = {
    firstname: userInfo.firstName,
    lastname: userInfo.lastName,
    email: userInfo.email,
    company: userInfo.company,
    company_size: userInfo.companySize,
    job_title: userInfo.jobTitle,
    ai_quotient_score: result.percentage,
    ai_readiness_level: result.readinessLevel,
  };

  // Add pillar scores
  result.pillarScores.forEach(pillarScore => {
    const pillarName = pillarScore.pillar.toLowerCase().replace(/\s+/g, '_');
    hubspotData[`ai_pillar_${pillarName}_score`] = pillarScore.percentage;
  });

  return hubspotData;
};
