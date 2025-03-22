
import { InsuranceType } from "@/components/InsuranceTypeCard";

// Questions for each insurance type
export interface Question {
  id: string;
  text: string;
  type: "text" | "number" | "select" | "date" | "radio";
  options?: string[];
  placeholder?: string;
  required?: boolean;
}

export const questions: Record<InsuranceType, Question[]> = {
  health: [
    {
      id: "age",
      text: "What is your age?",
      type: "number",
      placeholder: "Enter your age",
      required: true,
    },
    {
      id: "gender",
      text: "What is your gender?",
      type: "select",
      options: ["Male", "Female", "Other"],
      required: true,
    },
    {
      id: "preExistingConditions",
      text: "Do you have any pre-existing medical conditions?",
      type: "radio",
      options: ["Yes", "No"],
      required: true,
    },
    {
      id: "familySize",
      text: "How many family members do you want to include in your health insurance?",
      type: "number",
      placeholder: "Number of family members",
      required: true,
    },
    {
      id: "annualIncome",
      text: "What is your annual income (in lakhs)?",
      type: "number",
      placeholder: "Annual income in lakhs",
      required: true,
    },
  ],
  term: [
    {
      id: "age",
      text: "What is your age?",
      type: "number",
      placeholder: "Enter your age",
      required: true,
    },
    {
      id: "gender",
      text: "What is your gender?",
      type: "select",
      options: ["Male", "Female", "Other"],
      required: true,
    },
    {
      id: "smoker",
      text: "Are you a smoker?",
      type: "radio",
      options: ["Yes", "No"],
      required: true,
    },
    {
      id: "coverageAmount",
      text: "What amount of coverage are you looking for (in lakhs)?",
      type: "number",
      placeholder: "Coverage amount in lakhs",
      required: true,
    },
    {
      id: "termLength",
      text: "For how many years do you want the insurance?",
      type: "select",
      options: ["10 years", "15 years", "20 years", "25 years", "30 years"],
      required: true,
    },
  ],
  vehicle: [
    {
      id: "vehicleType",
      text: "What type of vehicle do you have?",
      type: "select",
      options: ["Two wheeler", "Four wheeler", "Commercial vehicle"],
      required: true,
    },
    {
      id: "vehicleAge",
      text: "How old is your vehicle (in years)?",
      type: "number",
      placeholder: "Vehicle age in years",
      required: true,
    },
    {
      id: "vehicleValue",
      text: "What is the current market value of your vehicle (in lakhs)?",
      type: "number",
      placeholder: "Value in lakhs",
      required: true,
    },
    {
      id: "previousClaims",
      text: "Have you made any insurance claims in the last 3 years?",
      type: "radio",
      options: ["Yes", "No"],
      required: true,
    },
    {
      id: "coverageType",
      text: "What type of coverage are you looking for?",
      type: "select",
      options: ["Third party only", "Comprehensive", "Zero depreciation"],
      required: true,
    },
  ],
};

// Mock insurance plans
export interface InsurancePlan {
  id: string;
  name: string;
  provider: string;
  coverage: string;
  premium: number;
  highlights: string[];
  rating: number;
}

export const getRecommendedPlans = (
  type: InsuranceType,
  answers: Record<string, any>
): InsurancePlan[] => {
  // This is a mock function that would typically involve complex business logic
  // based on the user's answers. For now, we'll return some fixed plans.
  
  const allPlans: Record<InsuranceType, InsurancePlan[]> = {
    health: [
      {
        id: "h1",
        name: "Comprehensive Health Shield",
        provider: "Max Bupa",
        coverage: "₹5 lakhs",
        premium: 12000,
        highlights: [
          "Cashless treatment at 5000+ hospitals",
          "No medical check-up up to 45 years",
          "100% claim settlement ratio",
          "Covers pre-existing diseases after 3 years"
        ],
        rating: 4.5,
      },
      {
        id: "h2",
        name: "Family Floater Health Plan",
        provider: "HDFC ERGO",
        coverage: "₹10 lakhs",
        premium: 18000,
        highlights: [
          "Coverage for entire family",
          "Restoration benefit",
          "Day care procedures covered",
          "Free annual health check-up"
        ],
        rating: 4.2,
      },
      {
        id: "h3",
        name: "Senior Citizen Health Insurance",
        provider: "Star Health",
        coverage: "₹3 lakhs",
        premium: 15000,
        highlights: [
          "No upper age limit",
          "Pre-existing diseases covered after 1 year",
          "Automatic renewal upto lifetime",
          "Special discounts for healthy lifestyle"
        ],
        rating: 4.0,
      },
    ],
    term: [
      {
        id: "t1",
        name: "iSecure Smart",
        provider: "ICICI Prudential",
        coverage: "₹1 crore",
        premium: 9000,
        highlights: [
          "Life cover up to 85 years of age",
          "Option to increase cover at key life stages",
          "Terminal illness benefit",
          "Tax benefits under Section 80C"
        ],
        rating: 4.7,
      },
      {
        id: "t2",
        name: "Click 2 Protect Life",
        provider: "HDFC Life",
        coverage: "₹75 lakhs",
        premium: 7500,
        highlights: [
          "Choice of death benefit payout options",
          "Special rates for women and non-smokers",
          "Optional critical illness cover",
          "Return of premium option"
        ],
        rating: 4.4,
      },
      {
        id: "t3",
        name: "Smart Term Plan",
        provider: "Max Life",
        coverage: "₹50 lakhs",
        premium: 6000,
        highlights: [
          "Special premium rates for non-smokers",
          "Optional critical illness cover",
          "Flexibility to increase cover",
          "98.74% claim settlement ratio"
        ],
        rating: 4.3,
      },
    ],
    vehicle: [
      {
        id: "v1",
        name: "Motor Secure Plus",
        provider: "Bajaj Allianz",
        coverage: "Comprehensive",
        premium: 5000,
        highlights: [
          "24/7 roadside assistance",
          "Zero depreciation cover",
          "Personal accident cover",
          "No claim bonus protection"
        ],
        rating: 4.6,
      },
      {
        id: "v2",
        name: "Drive Assured",
        provider: "ICICI Lombard",
        coverage: "Comprehensive",
        premium: 4500,
        highlights: [
          "Cashless repairs at network garages",
          "Engine protection cover",
          "Return to invoice cover",
          "No claim bonus upto 50%"
        ],
        rating: 4.3,
      },
      {
        id: "v3",
        name: "Two Wheeler Insurance",
        provider: "HDFC ERGO",
        coverage: "Third Party",
        premium: 2000,
        highlights: [
          "Mandatory third party cover",
          "Personal accident cover of ₹15 lakhs",
          "Easy claim settlement process",
          "Quick policy issuance"
        ],
        rating: 4.1,
      },
    ],
  };

  return allPlans[type];
};
