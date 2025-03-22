
import { motion } from "framer-motion";
import { Heart, CalendarClock, Car } from "lucide-react";

export type InsuranceType = "health" | "term" | "vehicle";

interface InsuranceTypeCardProps {
  type: InsuranceType;
  onClick: (type: InsuranceType) => void;
  isSelected: boolean;
}

const InsuranceTypeCard = ({ type, onClick, isSelected }: InsuranceTypeCardProps) => {
  const insuranceDetails = {
    health: {
      title: "Health Insurance",
      description: "Coverage for medical expenses and healthcare needs",
      icon: Heart,
      color: "insurance-health",
      bgColor: "insurance-light-blue",
    },
    term: {
      title: "Term Insurance",
      description: "Life coverage for a specified term or period",
      icon: CalendarClock,
      color: "insurance-term",
      bgColor: "insurance-light-purple",
    },
    vehicle: {
      title: "Vehicle Insurance",
      description: "Protection for your car, bike, or other vehicles",
      icon: Car,
      color: "insurance-vehicle",
      bgColor: "insurance-light-green",
    },
  };

  const { title, description, icon: Icon, color, bgColor } = insuranceDetails[type];

  return (
    <motion.div
      whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onClick(type)}
      className={`relative overflow-hidden rounded-xl p-6 cursor-pointer transition-all duration-300 ${
        isSelected 
          ? `ring-2 ring-${color} bg-${bgColor} shadow-lg` 
          : "bg-white shadow hover:shadow-md"
      }`}
    >
      <div className="flex flex-col h-full">
        <div className={`mb-4 p-3 rounded-full w-14 h-14 flex items-center justify-center bg-${bgColor}`}>
          <Icon className={`text-${color} w-7 h-7`} />
        </div>
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground text-sm">{description}</p>
        
        {isSelected && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`absolute top-4 right-4 w-4 h-4 rounded-full bg-${color}`}
          />
        )}
      </div>
    </motion.div>
  );
};

export default InsuranceTypeCard;
