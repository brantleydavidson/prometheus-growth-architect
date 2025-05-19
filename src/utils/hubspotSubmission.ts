import { UserInfo } from '@/hooks/useAIQuotientAssessment';
import { PillarScore } from '@/data/aiQuotientQuestions';

interface HubSpotSubmissionData {
  userInfo: UserInfo;
  score: number;
  totalPossible: number;
  pillarScores: PillarScore[];
  additionalInfo?: {
    jobTitle: string;
    phoneNumber: string;
    comments: string;
  };
}

// Format pillar name for HubSpot property mapping
export const formatPillarNameForHubSpot = (pillar: string): string => {
  return pillar
    .toLowerCase()
    .replace(/\s+&\s+/g, '_and_')  // Replace & with _and_
    .replace(/[^a-z0-9]+/g, '_')   // Replace spaces and special chars with underscore
    .replace(/^_|_$/g, '');        // Remove leading/trailing underscores
};

export const prepareHubspotData = (data: HubSpotSubmissionData) => {
  const {
    userInfo,
    score,
    totalPossible,
    pillarScores,
    additionalInfo
  } = data;

  // Calculate percentage score
  const percentageScore = Math.round((score / totalPossible) * 100);

  // Prepare pillar scores as a formatted string
  const pillarScoresString = pillarScores
    .map(pillar => `${pillar.name}: ${pillar.score}/${pillar.maxScore}`)
    .join('\n');

  // Prepare the submission data
  const submissionData = {
    properties: {
      firstname: userInfo.firstname,
      lastname: userInfo.lastname,
      email: userInfo.email,
      company: userInfo.company,
      ai_quotient_score: percentageScore.toString(),
      ai_quotient_pillar_scores: pillarScoresString,
      ai_quotient_submission_date: new Date().toISOString(),
      ...(additionalInfo && {
        jobtitle: additionalInfo.jobTitle,
        phone: additionalInfo.phoneNumber,
        ai_quotient_comments: additionalInfo.comments
      })
    }
  };

  return submissionData;
};

export const submitToHubspot = async (data: HubSpotSubmissionData) => {
  try {
    const submissionData = prepareHubspotData(data);
    
    // Here you would make the actual API call to HubSpot
    // For now, we'll just log the data
    console.log('Submitting to HubSpot:', submissionData);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return { success: true };
  } catch (error) {
    console.error('Error submitting to HubSpot:', error);
    throw error;
  }
};
