
import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import InsuranceTypeCard, { InsuranceType } from "@/components/InsuranceTypeCard";
import { Button } from "@/components/ui/button";
import AnimatedTransition from "@/components/AnimatedTransition";
import { ArrowRight } from "lucide-react";

const Index = () => {
  const [selectedType, setSelectedType] = useState<InsuranceType | null>(null);
  const navigate = useNavigate();

  const handleSelectType = (type: InsuranceType) => {
    setSelectedType(type);
  };

  const handleContinue = () => {
    if (selectedType) {
      navigate(`/questionnaire/${selectedType}`);
    }
  };

  return (
    <Layout>
      <AnimatedTransition>
        <div className="max-w-3xl mx-auto text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <h1 className="text-4xl font-semibold tracking-tight mb-4">
              Find the Perfect Insurance for Your Needs
            </h1>
            <p className="text-xl text-muted-foreground">
              Select the type of insurance you're looking for and we'll help you find the best options.
            </p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <AnimatedTransition delay={0.3}>
            <InsuranceTypeCard
              type="health"
              onClick={handleSelectType}
              isSelected={selectedType === "health"}
            />
          </AnimatedTransition>
          
          <AnimatedTransition delay={0.4}>
            <InsuranceTypeCard
              type="term"
              onClick={handleSelectType}
              isSelected={selectedType === "term"}
            />
          </AnimatedTransition>
          
          <AnimatedTransition delay={0.5}>
            <InsuranceTypeCard
              type="vehicle"
              onClick={handleSelectType}
              isSelected={selectedType === "vehicle"}
            />
          </AnimatedTransition>
        </div>

        <div className="flex justify-center">
          <AnimatedTransition delay={0.6}>
            <Button
              onClick={handleContinue}
              disabled={!selectedType}
              className="flex items-center gap-2 px-8"
              size="lg"
            >
              Continue <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </AnimatedTransition>
        </div>
      </AnimatedTransition>
    </Layout>
  );
};

export default Index;
