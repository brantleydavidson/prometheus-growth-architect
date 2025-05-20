import React, { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Answer, Question, PillarType } from "@/types/aiQuotient";
import { ArrowLeft, ArrowRight, HelpCircle } from "lucide-react";

interface QuestionsFormProps {
  questions: Question[];
  currentPillar: PillarType;
  allPillars: PillarType[];
  completedPillars: PillarType[];
  answers: Answer[];
  progress: number;
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

  // Reset index and selection when questions change (e.g., new pillar)
  React.useEffect(() => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
  }, [questions]);

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
      
      {/* Question card */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {currentQuestion.text}
            </h3>
            {currentQuestion.description && (
              <p className="text-sm text-gray-500">{currentQuestion.description}</p>
            )}
          </div>
          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gray-500">
            <HelpCircle className="h-5 w-5" />
          </Button>
        </div>
        
        <RadioGroup
          value={selectedOption || ""}
          onValueChange={setSelectedOption}
          className="space-y-4"
        >
          {currentQuestion.options.map((option) => (
            <div key={option.id} className="flex items-start space-x-3">
              <RadioGroupItem
                value={option.id}
                id={option.id}
                className="mt-1"
              />
              <Label
                htmlFor={option.id}
                className="flex-1 cursor-pointer text-sm text-gray-700"
              >
                {option.text}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>
      
      {/* Navigation buttons */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={handlePrevious}
          className="flex items-center"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Previous
        </Button>
        <Button
          onClick={handleNext}
          disabled={!selectedOption}
          className="flex items-center"
        >
          Next
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default QuestionsForm;
