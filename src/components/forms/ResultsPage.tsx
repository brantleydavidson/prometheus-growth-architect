import React from 'react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

interface PillarScore {
  name: string;
  score: number;
  maxScore: number;
  description: string;
}

interface ResultsPageProps {
  score: number;
  totalPossible: number;
  pillarScores: PillarScore[];
  maxPillarScores: number;
  onRequestReport: () => void;
}

const ResultsPage = ({
  score,
  totalPossible,
  pillarScores,
  maxPillarScores,
  onRequestReport,
}: ResultsPageProps) => {
  const percentage = Math.round((score / totalPossible) * 100);
  
  const getScoreColor = (score: number, maxScore: number) => {
    const percentage = (score / maxScore) * 100;
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">Your AI Quotient Score</h2>
        <p className="text-gray-600">Here's how your organization scores across different AI readiness pillars</p>
      </div>

      <Card className="p-6">
        <div className="text-center mb-8">
          <div className="text-5xl font-bold mb-2">{percentage}%</div>
          <div className="text-gray-600">Overall AI Readiness Score</div>
          <Progress value={percentage} className="mt-4" />
        </div>

        <div className="space-y-6">
          {pillarScores.map((pillar, index) => (
            <div key={index} className="border-b last:border-0 pb-6 last:pb-0">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold">{pillar.name}</h3>
                <div className={`font-medium ${getScoreColor(pillar.score, pillar.maxScore)}`}>
                  {pillar.score}/{pillar.maxScore}
                </div>
              </div>
              <p className="text-sm text-gray-600">{pillar.description}</p>
              <Progress 
                value={(pillar.score / pillar.maxScore) * 100} 
                className="mt-2"
              />
            </div>
          ))}
        </div>
      </Card>

      <div className="text-center">
        <Button
          onClick={onRequestReport}
          className="bg-prometheus-orange hover:bg-prometheus-orange/90 text-white flex items-center gap-2 mx-auto"
        >
          Request Detailed Report <Download className="h-4 w-4" />
        </Button>
        <p className="text-sm text-gray-600 mt-2">
          Get a comprehensive analysis and personalized recommendations
        </p>
      </div>
    </div>
  );
};

export default ResultsPage; 