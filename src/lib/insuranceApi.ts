
import { createClient } from '@supabase/supabase-js'
import { InsuranceType } from "@/components/InsuranceTypeCard";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)

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
    const { data, error } = await supabase.functions.invoke('get-insurance-recommendations', {
      body: {
        insuranceType,
        answers
      }
    })

    if (error) {
      console.error('Supabase function error:', error)
      throw new Error('Failed to get AI recommendations')
    }

    return data.recommendations || []
  } catch (error) {
    console.error('Error getting AI recommendations:', error)
    throw error
  }
}
