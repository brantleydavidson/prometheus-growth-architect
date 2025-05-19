import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { ArrowRight, ArrowLeft, Flag, Brain } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { questions, Question } from '@/data/aiQuotientQuestions';
import { useToast } from '@/hooks/use-toast';
import { Answer } from '@/types/aiQuotient';

interface QuestionFormProps {
  currentStep: number;
  answers: Answer[];
  onNext: (data: { answer: string }) => void;
  onPrevious: () => void;
}

// TESTING MODE: Set to false to show all questions for normal operation
const TESTING_MODE = false;
// Define how many questions to show in testing mode
const TESTING_QUESTION_COUNT = 1;

const QuestionsForm = ({ currentStep, answers, onNext, onPrevious }: QuestionFormProps) => {
  const { toast } = useToast();
  // Use all questions in normal mode, but only the specified count in testing mode
  const activeQuestions = TESTING_MODE ? questions.slice(0, TESTING_QUESTION_COUNT) : questions;
  const totalSteps = activeQuestions.length;
  
  // Log current state for debugging
  console.log('QuestionsForm rendering with:', { 
    currentStep, 
    totalSteps, 
    activeQuestionsLength: activeQuestions.length,
    hasAnswers: answers.length > 0 
  });
  
  // Ensure currentStep is within valid bounds to prevent "no questions available" issue
  const safeCurrentStep = Math.min(Math.max(0, currentStep), activeQuestions.length - 1);
  
  // Log the computed safe step
  console.log('Using safeCurrentStep:', safeCurrentStep);
  
  // Ensure we have a valid question
  const currentQuestion = activeQuestions[safeCurrentStep];
  
  const quizForm = useForm({
    defaultValues: {
      answer: answers.find(a => a.questionId === currentStep)?.optionId || ''
    }
  });
  
  // Update form when currentStep changes
  useEffect(() => {
    console.log('Effect running for step change to:', currentStep);
    console.log('Current answers:', answers);
    
    const currentAnswer = answers.find(a => a.questionId === currentStep);
    if (currentAnswer) {
      quizForm.setValue('answer', currentAnswer.optionId);
    } else {
      quizForm.setValue('answer', '');
    }
  }, [currentStep, quizForm, answers]);

  // Display an error message and recovery UI if no question is available
  if (!currentQuestion) {
    console.error('No question available for step:', currentStep);
    
    // Show toast notification to alert user
    useEffect(() => {
      toast({
        variant: "destructive",
        title: "Error loading question",
        description: "We encountered an issue with the assessment. Please try going back or refresh the page."
      });
    }, []);
    
    return (
      <Card className="p-6 shadow-md">
        <div className="text-center py-8">
          <p className="text-xl text-gray-600">There was an issue loading your questions.</p>
          <p className="text-gray-500 mt-2">Current step: {currentStep}, Total questions: {totalSteps}</p>
          <Button 
            type="button" 
            onClick={onPrevious}
            className="mt-4"
            variant="outline"
          >
            <ArrowLeft className="h-4 w-4 mr-2" /> Go Back
          </Button>
        </div>
      </Card>
    );
  }
  
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between mb-2">
        <div className="text-sm text-gray-500">
          Question {safeCurrentStep + 1} of {totalSteps} 
          {TESTING_MODE && <span className="ml-2 text-prometheus-orange font-medium">(TESTING MODE)</span>}
        </div>
        <div className="text-sm font-medium">{Math.round(((safeCurrentStep + 1) / totalSteps) * 100)}% Complete</div>
      </div>
      
      <Progress value={((safeCurrentStep + 1) / totalSteps) * 100} className="h-2" />
      
      <Card className="p-6 shadow-md">
        <div className="flex items-start gap-3 mb-6">
          <Brain className="h-6 w-6 text-prometheus-orange mt-1" />
          <h2 className="text-xl font-semibold">{currentQuestion.text}</h2>
        </div>
        
        <Form {...quizForm}>
          <form onSubmit={quizForm.handleSubmit(onNext)} className="space-y-6">
            <FormField
              control={quizForm.control}
              name="answer"
              render={({ field }) => (
                <FormItem className="space-y-4">
                  <RadioGroup
                    onValueChange={field.onChange}
                    value={field.value}
                    className="space-y-3"
                  >
                    {currentQuestion.options.map((option) => (
                      <div key={option.value} className="flex items-center space-x-2 rounded-md border border-gray-200 p-3 hover:bg-gray-50 transition-colors">
                        <RadioGroupItem value={option.value} id={option.value} />
                        <FormLabel htmlFor={option.value} className="flex-grow cursor-pointer font-normal">
                          {option.label}
                        </FormLabel>
                      </div>
                    ))}
                  </RadioGroup>
                </FormItem>
              )}
            />
            
            <div className="flex justify-between pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={onPrevious}
                className="flex gap-2"
              >
                <ArrowLeft className="h-4 w-4" /> Previous
              </Button>
              
              <Button 
                type="submit" 
                className="bg-prometheus-orange hover:bg-prometheus-orange/90 text-white flex gap-2"
                disabled={!quizForm.watch('answer')}
              >
                {safeCurrentStep === totalSteps - 1 ? (
                  <>Finish <Flag className="h-4 w-4" /></>
                ) : (
                  <>Next <ArrowRight className="h-4 w-4" /></>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default QuestionsForm;
