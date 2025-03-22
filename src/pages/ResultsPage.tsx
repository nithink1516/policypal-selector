
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "@/components/Layout";
import ResultCard from "@/components/ResultCard";
import { InsuranceType } from "@/components/InsuranceTypeCard";
import { InsurancePlan, getRecommendedPlans } from "@/lib/insuranceData";
import AnimatedTransition from "@/components/AnimatedTransition";
import { Button } from "@/components/ui/button";
import { Home, RefreshCw } from "lucide-react";

const ResultsPage = () => {
  const navigate = useNavigate();
  const { type } = useParams<{ type: string }>();
  const [plans, setPlans] = useState<InsurancePlan[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Validate insurance type from URL
  const insuranceType = type as InsuranceType;
  const validTypes: InsuranceType[] = ["health", "term", "vehicle"];
  
  if (!validTypes.includes(insuranceType)) {
    navigate("/");
    return null;
  }

  useEffect(() => {
    // Simulate loading time to enhance user experience
    const timer = setTimeout(() => {
      const answers = JSON.parse(sessionStorage.getItem("insuranceAnswers") || "{}");
      const recommendedPlans = getRecommendedPlans(insuranceType, answers);
      setPlans(recommendedPlans);
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [insuranceType]);

  const handleStartOver = () => {
    // Clear stored answers
    sessionStorage.removeItem("insuranceAnswers");
    navigate("/");
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-semibold tracking-tight mb-4">
            Your Recommended Insurance Plans
          </h1>
          <p className="text-xl text-muted-foreground">
            Based on your answers, we've found these options that best match your needs.
          </p>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className={`w-16 h-16 rounded-full border-4 border-insurance-${insuranceType} border-t-transparent animate-spin mb-6`} />
            <p className="text-lg font-medium">Finding the best plans for you...</p>
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
