
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
      id: "fullName",
      text: "What is your full name?",
      type: "text",
      placeholder: "Enter your full name",
      required: true,
    },
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
      id: "contactNumber",
      text: "What is your contact number?",
      type: "text",
      placeholder: "Enter your mobile number",
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
      id: "preExistingDetails",
      text: "If yes, please specify your pre-existing conditions",
      type: "text",
      placeholder: "E.g., Diabetes, Hypertension, etc.",
      required: false,
    },
    {
      id: "familySize",
      text: "How many family members do you want to include in your health insurance?",
      type: "number",
      placeholder: "Number of family members",
      required: true,
    },
    {
      id: "familyAges",
      text: "What are the ages of your family members? (comma separated)",
      type: "text",
      placeholder: "E.g., 35, 32, 10, 7",
      required: false,
    },
    {
      id: "occupation",
      text: "What is your occupation?",
      type: "select",
      options: ["Salaried", "Self-employed", "Business owner", "Student", "Retired", "Homemaker", "Other"],
      required: true,
    },
    {
      id: "annualIncome",
      text: "What is your annual income (in lakhs)?",
      type: "number",
      placeholder: "Annual income in lakhs",
      required: true,
    },
    {
      id: "coverageAmount",
      text: "What coverage amount are you looking for (in lakhs)?",
      type: "select",
      options: ["2 lakhs", "3 lakhs", "5 lakhs", "10 lakhs", "15 lakhs", "25 lakhs", "50 lakhs", "1 crore+"],
      required: true,
    },
    {
      id: "maternity",
      text: "Do you require maternity coverage?",
      type: "radio",
      options: ["Yes", "No"],
      required: true,
    },
  ],
  term: [
    {
      id: "fullName",
      text: "What is your full name?",
      type: "text",
      placeholder: "Enter your full name",
      required: true,
    },
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
      id: "contactNumber",
      text: "What is your contact number?",
      type: "text",
      placeholder: "Enter your mobile number",
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
      id: "alcoholConsumption",
      text: "Do you consume alcohol regularly?",
      type: "radio",
      options: ["Yes", "No", "Occasionally"],
      required: true,
    },
    {
      id: "medicalHistory",
      text: "Do you have any significant medical history?",
      type: "radio",
      options: ["Yes", "No"],
      required: true,
    },
    {
      id: "medicalDetails",
      text: "If yes, please specify your medical conditions",
      type: "text",
      placeholder: "E.g., Heart disease, Cancer, etc.",
      required: false,
    },
    {
      id: "occupation",
      text: "What is your occupation?",
      type: "select",
      options: ["Salaried", "Self-employed", "Business owner", "Student", "Retired", "Homemaker", "Other"],
      required: true,
    },
    {
      id: "annualIncome",
      text: "What is your annual income (in lakhs)?",
      type: "number",
      placeholder: "Annual income in lakhs",
      required: true,
    },
    {
      id: "coverageAmount",
      text: "What amount of coverage are you looking for (in lakhs)?",
      type: "select",
      options: ["25 lakhs", "50 lakhs", "75 lakhs", "1 crore", "2 crore", "5 crore", "10 crore+"],
      required: true,
    },
    {
      id: "termLength",
      text: "For how many years do you want the insurance?",
      type: "select",
      options: ["10 years", "15 years", "20 years", "25 years", "30 years", "Till age 60", "Till age 70"],
      required: true,
    },
  ],
  vehicle: [
    {
      id: "fullName",
      text: "What is your full name?",
      type: "text",
      placeholder: "Enter your full name",
      required: true,
    },
    {
      id: "contactNumber",
      text: "What is your contact number?",
      type: "text",
      placeholder: "Enter your mobile number",
      required: true,
    },
    {
      id: "vehicleType",
      text: "What type of vehicle do you have?",
      type: "select",
      options: ["Two wheeler", "Four wheeler - Private Car", "Four wheeler - SUV", "Commercial vehicle"],
      required: true,
    },
    {
      id: "makeModel",
      text: "What is the make and model of your vehicle?",
      type: "text",
      placeholder: "E.g., Maruti Suzuki Swift, Honda Activa",
      required: true,
    },
    {
      id: "registrationNumber",
      text: "What is your vehicle registration number?",
      type: "text",
      placeholder: "E.g., MH01AB1234",
      required: true,
    },
    {
      id: "purchaseDate",
      text: "When did you purchase your vehicle?",
      type: "date",
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
      id: "previousInsurer",
      text: "Who was your previous insurer (if any)?",
      type: "select",
      options: ["None/First time", "ICICI Lombard", "HDFC ERGO", "Bajaj Allianz", "Tata AIG", "New India Assurance", "Other"],
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
      id: "claimDetails",
      text: "If yes, please specify the nature of claims",
      type: "text",
      placeholder: "E.g., Accident repair, Theft, etc.",
      required: false,
    },
    {
      id: "coverageType",
      text: "What type of coverage are you looking for?",
      type: "select",
      options: ["Third party only", "Comprehensive", "Zero depreciation", "Own damage"],
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
  link: string; // Added link field for redirection
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
        link: "https://www.maxbupa.com/health-insurance-plans"
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
        link: "https://www.hdfcergo.com/health-insurance"
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
        link: "https://www.starhealth.in/senior-citizen-health-insurance"
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
        link: "https://www.iciciprulife.com/term-insurance-plans/isecure-smart-term-plan.html"
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
        link: "https://www.hdfclife.com/term-insurance-plans"
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
        link: "https://www.maxlifeinsurance.com/term-insurance-plans"
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
        link: "https://www.bajajallianz.com/motor-insurance.html"
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
        link: "https://www.icicilombard.com/motor-insurance"
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
        link: "https://www.hdfcergo.com/two-wheeler-insurance"
      },
    ],
  };

  return allPlans[type];
};
