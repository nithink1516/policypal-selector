
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { InsuranceType } from "@/components/InsuranceTypeCard";
import { Question, questions } from "@/lib/insuranceData";
import AnimatedTransition from "./AnimatedTransition";
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";

interface QuestionnaireFormProps {
  insuranceType: InsuranceType;
  onSubmit: (answers: Record<string, any>) => void;
  onBack: () => void;
}

const QuestionnaireForm = ({ insuranceType, onSubmit, onBack }: QuestionnaireFormProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const { toast } = useToast();
  
  const questionsList = questions[insuranceType];
  const currentQuestion = questionsList[currentStep];
  const totalSteps = questionsList.length;
  const isLastStep = currentStep === totalSteps - 1;
  
  const handleAnswer = (questionId: string, answer: any) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const shouldShowQuestion = (questionId: string): boolean => {
    // Logic to determine if a question should be shown based on previous answers
    if (questionId === "preExistingDetails") {
      return answers["preExistingConditions"] === "Yes";
    }
    if (questionId === "medicalDetails") {
      return answers["medicalHistory"] === "Yes";
    }
    if (questionId === "claimDetails") {
      return answers["previousClaims"] === "Yes";
    }
    if (questionId === "familyAges") {
      return answers["familySize"] && parseInt(answers["familySize"]) > 1;
    }
    return true;
  };

  const nextStep = () => {
    if (currentQuestion.required && !answers[currentQuestion.id]) {
      toast({
        title: "Required field",
        description: "Please answer this question before proceeding.",
        variant: "destructive",
      });
      return;
    }
    
    if (isLastStep) {
      onSubmit(answers);
    } else {
      // Find the next valid question to show
      let nextStepIndex = currentStep + 1;
      while (
        nextStepIndex < totalSteps && 
        !shouldShowQuestion(questionsList[nextStepIndex].id)
      ) {
        nextStepIndex++;
      }
      
      if (nextStepIndex < totalSteps) {
        setCurrentStep(nextStepIndex);
      } else {
        // If no more valid questions, submit
        onSubmit(answers);
      }
    }
  };

  const prevStep = () => {
    if (currentStep === 0) {
      onBack();
    } else {
      // Find the previous valid question
      let prevStepIndex = currentStep - 1;
      while (
        prevStepIndex >= 0 && 
        !shouldShowQuestion(questionsList[prevStepIndex].id)
      ) {
        prevStepIndex--;
      }
      
      if (prevStepIndex >= 0) {
        setCurrentStep(prevStepIndex);
      } else {
        onBack();
      }
    }
  };

  // Skip questions that shouldn't be shown
  if (currentStep < totalSteps && !shouldShowQuestion(currentQuestion.id)) {
    nextStep();
    return null;
  }

  const renderQuestion = (question: Question) => {
    switch (question.type) {
      case "text":
        return (
          <Input
            id={question.id}
            value={answers[question.id] || ""}
            onChange={(e) => handleAnswer(question.id, e.target.value)}
            placeholder={question.placeholder}
            className="max-w-md"
          />
        );
      
      case "number":
        return (
          <Input
            id={question.id}
            type="number"
            value={answers[question.id] || ""}
            onChange={(e) => handleAnswer(question.id, e.target.value)}
            placeholder={question.placeholder}
            className="max-w-md"
          />
        );
      
      case "select":
        return (
          <Select
            value={answers[question.id] || ""}
            onValueChange={(value) => handleAnswer(question.id, value)}
          >
            <SelectTrigger className="max-w-md">
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              {question.options?.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      
      case "radio":
        return (
          <RadioGroup
            value={answers[question.id] || ""}
            onValueChange={(value) => handleAnswer(question.id, value)}
            className="space-y-2"
          >
            {question.options?.map((option) => (
              <div key={option} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={`${question.id}-${option}`} />
                <Label htmlFor={`${question.id}-${option}`}>{option}</Label>
              </div>
            ))}
          </RadioGroup>
        );
      
      case "date":
        return (
          <Input
            id={question.id}
            type="date"
            value={answers[question.id] || ""}
            onChange={(e) => handleAnswer(question.id, e.target.value)}
            className="max-w-md"
          />
        );
      
      default:
        return null;
    }
  };

  const progressPercentage = ((currentStep + 1) / totalSteps) * 100;

  return (
    <AnimatedTransition className="max-w-3xl mx-auto">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-muted-foreground">
            Step {currentStep + 1} of {totalSteps}
          </span>
          <span className="text-sm font-medium">
            {Math.round(progressPercentage)}% Complete
          </span>
        </div>
        <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
          <motion.div
            className={`h-full bg-insurance-${insuranceType}`}
            initial={{ width: `${((currentStep) / totalSteps) * 100}%` }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      <div className="bg-white rounded-xl p-8 shadow-sm border mb-6">
        <AnimatedTransition key={currentQuestion.id} className="space-y-6">
          <h2 className="text-2xl font-medium tracking-tight">{currentQuestion.text}</h2>
          <div className="mt-4">
            {renderQuestion(currentQuestion)}
          </div>
        </AnimatedTransition>
      </div>

      <div className="flex justify-between mt-6">
        <Button
          variant="outline"
          onClick={prevStep}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          {currentStep === 0 ? "Back to selection" : "Previous"}
        </Button>
        
        <Button
          onClick={nextStep}
          className="flex items-center gap-2"
        >
          {isLastStep ? (
            <>
              Submit <CheckCircle className="w-4 h-4 ml-1" />
            </>
          ) : (
            <>
              Next <ArrowRight className="w-4 h-4 ml-1" />
            </>
          )}
        </Button>
      </div>
    </AnimatedTransition>
  );
};

export default QuestionnaireForm;
