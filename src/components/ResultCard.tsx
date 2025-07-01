
import { motion } from "framer-motion";
import { Award, Check, ExternalLink, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { InsurancePlan } from "@/lib/insuranceApi";
import { InsuranceType } from "@/components/InsuranceTypeCard";

interface ResultCardProps {
  plan: InsurancePlan;
  index: number;
  insuranceType: InsuranceType;
  isTopPick?: boolean;
}

const ResultCard = ({ plan, index, insuranceType, isTopPick = false }: ResultCardProps) => {
  const handleGetQuote = () => {
    // Open the provider's website in a new tab
    window.open(plan.link, "_blank");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: 1, 
        y: 0,
        transition: { delay: index * 0.1 + 0.2 }
      }}
      whileHover={{ y: -5 }}
      className={`relative overflow-hidden rounded-xl bg-white border shadow-sm transition-all ${
        isTopPick ? `border-insurance-${insuranceType} shadow-md` : ""
      }`}
    >
      {isTopPick && (
        <div className={`absolute top-0 right-0 bg-insurance-${insuranceType} text-white px-4 py-1 text-xs font-medium flex items-center`}>
          <Award className="w-3 h-3 mr-1" />
          Top Pick
        </div>
      )}
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-semibold">{plan.name}</h3>
            <p className="text-sm text-muted-foreground">{plan.provider}</p>
          </div>
          <div className={`flex items-center px-2 py-1 rounded-full bg-insurance-light-${
            insuranceType === "health" ? "blue" : insuranceType === "term" ? "purple" : "green"
          }`}>
            <Sparkles className={`w-3 h-3 mr-1 text-insurance-${insuranceType}`} />
            <span className={`text-xs font-medium text-insurance-${insuranceType}`}>
              {plan.rating}/5
            </span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-sm text-muted-foreground">Coverage</p>
            <p className="font-medium">{plan.coverage}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Annual Premium</p>
            <p className="font-medium">₹{plan.premium}</p>
          </div>
        </div>
        
        <div className="mb-6">
          <p className="text-sm font-medium mb-2">Key Highlights</p>
          <ul className="space-y-1">
            {plan.highlights.map((highlight, idx) => (
              <li key={idx} className="flex items-start text-sm">
                <Check className={`w-4 h-4 mr-2 mt-0.5 text-insurance-${insuranceType}`} />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="flex gap-3">
          <Button 
            variant="outline" 
            className="flex-1"
            onClick={() => window.open(plan.link, "_blank")}
          >
            <span>View Details</span>
            <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
          </Button>
          <Button 
            className={`flex-1 bg-insurance-${insuranceType} hover:bg-insurance-${insuranceType}/90`}
            onClick={handleGetQuote}
          >
            Get Quote
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default ResultCard;
