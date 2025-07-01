
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "@/components/Layout";
import ResultCard from "@/components/ResultCard";
import { InsuranceType } from "@/components/InsuranceTypeCard";
import { InsurancePlan, getAIRecommendedPlans } from "@/lib/insuranceApi";
import AnimatedTransition from "@/components/AnimatedTransition";
import { Button } from "@/components/ui/button";
import { Home, RefreshCw, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ResultsPage = () => {
  const navigate = useNavigate();
  const { type } = useParams<{ type: string }>();
  const [plans, setPlans] = useState<InsurancePlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  
  // Validate insurance type from URL
  const insuranceType = type as InsuranceType;
  const validTypes: InsuranceType[] = ["health", "term", "vehicle"];
  
  if (!validTypes.includes(insuranceType)) {
    navigate("/");
    return null;
  }

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const answers = JSON.parse(sessionStorage.getItem("insuranceAnswers") || "{}");
        
        if (Object.keys(answers).length === 0) {
          navigate(`/questionnaire/${insuranceType}`);
          return;
        }

        const aiPlans = await getAIRecommendedPlans(insuranceType, answers);
        setPlans(aiPlans);
      } catch (err) {
        console.error('Error fetching AI recommendations:', err);
        setError('Failed to get personalized recommendations. Please try again.');
        toast({
          title: "Error",
          description: "Failed to get personalized recommendations. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [insuranceType, navigate, toast]);

  const handleStartOver = () => {
    // Clear stored answers
    sessionStorage.removeItem("insuranceAnswers");
    navigate("/");
  };

  const handleRetry = () => {
    const answers = JSON.parse(sessionStorage.getItem("insuranceAnswers") || "{}");
    if (Object.keys(answers).length === 0) {
      navigate(`/questionnaire/${insuranceType}`);
    } else {
      window.location.reload();
    }
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-semibold tracking-tight mb-4">
            Your AI-Powered Insurance Recommendations
          </h1>
          <p className="text-xl text-muted-foreground">
            Based on your answers, our AI has analyzed and found these personalized options for you.
          </p>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className={`w-16 h-16 rounded-full border-4 border-insurance-${insuranceType} border-t-transparent animate-spin mb-6`} />
            <p className="text-lg font-medium">AI is analyzing your profile and finding the best plans...</p>
            <p className="text-sm text-muted-foreground mt-2">This may take a few moments</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-16">
            <AlertCircle className="w-16 h-16 text-red-500 mb-6" />
            <p className="text-lg font-medium text-red-600 mb-4">{error}</p>
            <Button onClick={handleRetry} className="mb-4">
              Try Again
            </Button>
          </div>
        ) : (
          <AnimatedTransition>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {plans.map((plan, index) => (
                <ResultCard
                  key={plan.id}
                  plan={plan}
                  index={index}
                  insuranceType={insuranceType}
                  isTopPick={index === 0}
                />
              ))}
            </div>
            
            <div className="flex flex-col md:flex-row gap-4 justify-center mt-8">
              <Button
                variant="outline"
                onClick={handleStartOver}
                className="flex items-center gap-2"
                size="lg"
              >
                <Home className="w-4 h-4 mr-1" />
                Start Over
              </Button>
              <Button
                onClick={() => navigate(`/questionnaire/${insuranceType}`)}
                className={`flex items-center gap-2 bg-insurance-${insuranceType}`}
                size="lg"
              >
                <RefreshCw className="w-4 h-4 mr-1" />
                Adjust Answers
              </Button>
            </div>
          </AnimatedTransition>
        )}
      </div>
    </Layout>
  );
};

export default ResultsPage;
