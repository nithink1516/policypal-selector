
import { useNavigate, useParams } from "react-router-dom";
import Layout from "@/components/Layout";
import QuestionnaireForm from "@/components/QuestionnaireForm";
import { InsuranceType } from "@/components/InsuranceTypeCard";

const QuestionnairePage = () => {
  const navigate = useNavigate();
  const { type } = useParams<{ type: string }>();
  
  // Validate insurance type from URL
  const insuranceType = type as InsuranceType;
  const validTypes: InsuranceType[] = ["health", "term", "vehicle"];
  
  if (!validTypes.includes(insuranceType)) {
    navigate("/");
    return null;
  }

  const handleSubmit = (answers: Record<string, any>) => {
    // Store answers in sessionStorage for the results page
    sessionStorage.setItem("insuranceAnswers", JSON.stringify(answers));
    navigate(`/results/${insuranceType}`);
  };

  const handleBack = () => {
    navigate("/");
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-semibold tracking-tight mb-4">
          {insuranceType === "health" && "Health Insurance Questionnaire"}
          {insuranceType === "term" && "Term Insurance Questionnaire"}
          {insuranceType === "vehicle" && "Vehicle Insurance Questionnaire"}
        </h1>
        <p className="text-xl text-muted-foreground">
          Answer a few questions to help us find the best options for you.
        </p>
      </div>
      
      <QuestionnaireForm
        insuranceType={insuranceType}
        onSubmit={handleSubmit}
        onBack={handleBack}
      />
    </Layout>
  );
};

export default QuestionnairePage;
