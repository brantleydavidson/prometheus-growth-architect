import React, { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Answer, Question, PillarType } from "@/types/aiQuotient";
import { ArrowLeft, ArrowRight, HelpCircle } from "lucide-react";

interface QuestionsFormProps {
  questions: Question[];
  currentPillar: PillarType;
  allPillars: PillarType[];
  completedPillars: PillarType[];
  answers: Answer[];
  progress: number;
  isTestMode: boolean;
  onToggleTestMode: () => void;
  onSubmitAnswer: (answer: Answer) => void;
  onBack: () => void;
}

const QuestionsForm: React.FC<QuestionsFormProps> = ({
  questions,
  currentPillar,
  allPillars,
  completedPillars,
  answers,
  progress,
  isTestMode,
  onToggleTestMode,
  onSubmitAnswer,
  onBack
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  // Get current question
  const currentQuestion = questions[currentQuestionIndex];
  
  // Check if this question already has an answer
  const existingAnswer = answers.find(a => a.questionId === currentQuestion?.id);

  // Set selected option from existing answer if present
  React.useEffect(() => {
    if (existingAnswer) {
      setSelectedOption(existingAnswer.optionId);
    } else {
      setSelectedOption(null);
    }
  }, [existingAnswer, currentQuestion]);

  // Handle answer submission
  const handleNext = () => {
    if (!currentQuestion || !selectedOption) return;
    
    const selectedOptionData = currentQuestion.options.find(opt => opt.id === selectedOption);
    if (!selectedOptionData) return;
    
    const answer: Answer = {
      questionId: currentQuestion.id,
      optionId: selectedOption,
      value: selectedOptionData.value,
      pillar: currentQuestion.pillar
    };
    
    // Submit the answer first
    onSubmitAnswer(answer);
    
    // Check if we're on the last question of the pillar
    const isLastQuestionInPillar = currentQuestionIndex === questions.length - 1;
    
    // If not the last question, move to next question
    if (!isLastQuestionInPillar) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
    }
    // Note: If it is the last question, the submitAnswer callback will handle pillar transition
  };

  // Handle going back to previous question
  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    } else {
      onBack();
    }
  };

  if (!currentQuestion) {
    return <div>No questions available.</div>;
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Progress header */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-500">Progress</span>
          <span className="text-sm font-medium">{progress}%</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>
      
      {/* Pillar navigation */}
      <div className="flex flex-wrap gap-2 mb-6">
        {allPillars.map((pillar) => (
          <div 
            key={pillar}
            className={`
              px-3 py-1 rounded-full text-xs font-medium
              ${currentPillar === pillar ? 'bg-primary text-primary-foreground' : ''}
              ${completedPillars.includes(pillar) ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}
            `}
          >
            {pillar}
          </div>
        ))}
      </div>
      
      {/* Test mode toggle */}
      <div className="flex items-center justify-end mb-4 space-x-2">
        <Label htmlFor="test-mode" className="text-sm">Test Mode</Label>
        <Switch
          id="test-mode"
          checked={isTestMode}
          onCheckedChange={onToggleTestMode}
        />
      </div>
      
      {/* Question card */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-6">
          <div className="flex items-center mb-2">
            <h3 className="text-lg font-medium mr-2">{currentPillar}</h3>
            <HelpCircle className="h-4 w-4 text-gray-400" />
          </div>
          <h4 className="text-xl font-bold">
            {currentQuestion.question}
          </h4>
        </div>
        
        {/* Answer options */}
        <RadioGroup 
          value={selectedOption || ""} 
          onValueChange={setSelectedOption}
          className="space-y-4"
        >
          {currentQuestion.options.map((option) => (
            <div 
              key={option.id}
              className="flex items-start space-x-3 bg-gray-50 p-4 rounded-md hover:bg-gray-100 transition-colors"
            >
              <RadioGroupItem value={option.id} id={option.id} />
              <Label 
                htmlFor={option.id} 
                className="text-base cursor-pointer font-normal leading-relaxed"
              >
                {option.text}
              </Label>
            </div>
          ))}
        </RadioGroup>
        
        {/* Navigation buttons */}
        <div className="mt-8 flex justify-between">
          <Button 
            type="button" 
            variant="outline" 
            onClick={handlePrevious}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>
          
          <Button 
            type="button" 
            onClick={handleNext} 
            disabled={!selectedOption}
          >
            Next
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuestionsForm;
