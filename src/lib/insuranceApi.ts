
import { InsuranceType } from "@/components/InsuranceTypeCard";

const SUPABASE_URL = "https://quzpssxbqwycpctlmsyv.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF1enBzc3hicXd5Y3BjdGxtc3l2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEzNzY4MTYsImV4cCI6MjA2Njk1MjgxNn0.7Fvx67KjmpJgZlHEqI--BQKA3ETpLCXFRlOMUINgFu0";

export interface InsurancePlan {
  id: string;
  name: string;
  provider: string;
  coverage: string;
  premium: number;
  highlights: string[];
  rating: number;
  link: string;
}

export const getAIRecommendedPlans = async (
  insuranceType: InsuranceType,
  answers: Record<string, any>
): Promise<InsurancePlan[]> => {
  try {
    const response = await fetch(`${SUPABASE_URL}/functions/v1/get-insurance-recommendations`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        insuranceType,
        answers
      })
    });

    if (!response.ok) {
      throw new Error('Failed to get AI recommendations');
    }

    const data = await response.json();
    return data.recommendations || [];
  } catch (error) {
    console.error('Error getting AI recommendations:', error);
    throw error;
  }
};
