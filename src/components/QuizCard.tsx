"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { QuizQuestion } from "@/types/election";
import { useAppContext } from "@/context/AppContext";
import confetti from "canvas-confetti";
import { CheckCircle2, XCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  phaseId: string;
  questions: QuizQuestion[];
  phaseTitle: string;
}

export function QuizCard({ phaseId, questions, phaseTitle }: Props) {
  const { country, markQuizCompleted, unmarkQuizCompleted, completedQuizzes } = useAppContext();
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const isCompleted = completedQuizzes[`${country}-${phaseId}`];
  
  if (!questions || questions.length === 0) return null;
  
  const currentQuestion = questions[currentQuestionIdx];
  const isCorrect = selectedOption === currentQuestion.correctAnswer;

  const handleSubmit = () => {
    setIsSubmitted(true);
    if (isCorrect && currentQuestionIdx === questions.length - 1) {
      markQuizCompleted(country, phaseId);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  const handleNext = () => {
    setSelectedOption(null);
    setIsSubmitted(false);
    if (currentQuestionIdx < questions.length - 1) {
      setCurrentQuestionIdx(prev => prev + 1);
    }
  };

  const handleReset = () => {
    // Resetting the state locally
    setCurrentQuestionIdx(0);
    setSelectedOption(null);
    setIsSubmitted(false);
    
    // Using Context to remove completion status
    unmarkQuizCompleted(country, phaseId);
  };

  if (isCompleted) {
    return (
      <Card className="bg-green-50 border-green-200 mt-6 shadow-sm">
        <CardContent className="flex items-center justify-between py-6">
          <div className="flex items-center gap-4">
            <CheckCircle2 className="w-8 h-8 text-green-500" />
            <div>
              <h3 className="font-semibold text-green-800">Quiz Completed!</h3>
              <p className="text-sm text-green-700">You have successfully completed the {phaseTitle} quiz.</p>
            </div>
          </div>
          <Button variant="outline" onClick={handleReset} className="text-green-700 border-green-300 hover:bg-green-100">Reset Quiz</Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mt-6 border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden">
      {/* Progress bar line */}
      <div className="absolute top-0 left-0 h-1 bg-slate-100 dark:bg-slate-800 w-full">
        <div 
          className="h-full bg-blue-500 transition-all duration-300" 
          style={{ width: `${((currentQuestionIdx) / questions.length) * 100}%` }}
        />
      </div>
      
      <CardHeader>
        <CardTitle className="text-lg text-slate-800 dark:text-slate-100">Quick Check: {phaseTitle}</CardTitle>
        <CardDescription>Question {currentQuestionIdx + 1} of {questions.length}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4 font-medium text-slate-900 dark:text-slate-50">{currentQuestion.question}</div>
        <RadioGroup 
          value={selectedOption?.toString() ?? ""} 
          onValueChange={(val) => !isSubmitted && setSelectedOption(parseInt(val))}
          className="space-y-3"
        >
          {currentQuestion.options.map((option, idx) => (
            <div 
              key={idx} 
              className={`flex items-center space-x-2 border p-3 rounded-md transition-colors ${
                isSubmitted && idx === currentQuestion.correctAnswer ? 'border-green-500 bg-green-50' :
                isSubmitted && selectedOption === idx && !isCorrect ? 'border-red-500 bg-red-50' :
                selectedOption === idx ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30' : 'border-slate-200 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-700 hover:bg-slate-50 dark:hover:bg-slate-800'
              } ${isSubmitted ? 'cursor-default' : 'cursor-pointer'}`}
              onClick={() => !isSubmitted && setSelectedOption(idx)}
            >
              <RadioGroupItem value={idx.toString()} id={`option-${idx}`} disabled={isSubmitted} className="sr-only" />
              <Label htmlFor={`option-${idx}`} className={`flex-1 cursor-pointer font-normal ${isSubmitted ? 'cursor-default' : 'cursor-pointer'}`}>
                {option}
              </Label>
              {isSubmitted && idx === currentQuestion.correctAnswer && <CheckCircle2 className="w-5 h-5 text-green-500" />}
              {isSubmitted && selectedOption === idx && !isCorrect && <XCircle className="w-5 h-5 text-red-500" />}
            </div>
          ))}
        </RadioGroup>

        <AnimatePresence>
          {isSubmitted && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }} 
              animate={{ opacity: 1, y: 0 }}
              className={`mt-4 p-4 rounded-md text-sm ${isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
            >
              <p className="font-semibold mb-1">{isCorrect ? 'Correct!' : 'Not quite.'}</p>
              <p>{currentQuestion.explanation}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
      <CardFooter className="flex justify-end">
        {!isSubmitted ? (
          <Button onClick={handleSubmit} disabled={selectedOption === null} className="bg-blue-600 hover:bg-blue-700">
            Submit Answer
          </Button>
        ) : (
          <Button onClick={handleNext} className="bg-slate-800 hover:bg-slate-900 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200">
            {currentQuestionIdx < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
