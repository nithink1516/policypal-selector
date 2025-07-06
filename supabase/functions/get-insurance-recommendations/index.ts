
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    console.log('Edge function called with method:', req.method)
    const { insuranceType, answers } = await req.json()
    console.log('Request data:', { insuranceType, answers })
    
    // Generate personalized recommendations based on insurance type and user answers
    console.log('Creating personalized recommendations for:', insuranceType)
    console.log('User answers:', answers)
    
    const mockRecommendations = generatePersonalizedRecommendations(insuranceType, answers)

    return new Response(
      JSON.stringify({ recommendations: mockRecommendations }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )

  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      },
    )
  }
})

function createInsurancePrompt(insuranceType: string, answers: any): string {
  const userDetails = Object.entries(answers)
    .map(([key, value]) => `${key}: ${value}`)
    .join('\n')

  return `
Based on the following user details for ${insuranceType} insurance, provide 3-4 personalized insurance plan recommendations for the Indian market:

User Details:
${userDetails}

Please respond with a JSON array of insurance plans. Each plan should have this exact structure:
{
  "id": "unique_id",
  "name": "Plan Name",
  "provider": "Insurance Company Name",
  "coverage": "Coverage Amount",
  "premium": 12000,
  "highlights": ["Feature 1", "Feature 2", "Feature 3", "Feature 4"],
  "rating": 4.5,
  "link": "https://company-website.com/plan-link"
}

Focus on:
- Indian insurance companies (HDFC ERGO, ICICI Lombard, Bajaj Allianz, Max Bupa, Star Health, etc.)
- Realistic premium amounts in INR
- Coverage amounts suitable for the user's income and needs
- Specific features relevant to their situation
- Real insurance company websites
- Plans that match their specific requirements (age, family size, medical history, etc.)

Ensure the JSON is valid and contains 3-4 plans ranked by suitability.
`
}

function parseUnstructuredResponse(response: string, insuranceType: string): any[] {
  // Fallback parser if AI doesn't return valid JSON
  const plans = []
  const lines = response.split('\n')
  
  // This is a simple fallback - in practice, you might want more sophisticated parsing
  plans.push({
    id: `ai_${insuranceType}_1`,
    name: `AI Recommended ${insuranceType} Plan`,
    provider: "AI Suggested Provider",
    coverage: "As per your requirements",
    premium: 10000,
    highlights: ["Personalized recommendation", "AI analyzed", "Based on your profile", "Competitive rates"],
    rating: 4.3,
    link: "https://example.com"
  })
  
  return plans
}

function generatePersonalizedRecommendations(insuranceType: string, answers: any): any[] {
  const age = parseInt(answers.age) || 30
  const income = parseInt(answers.income) || 500000
  const familySize = parseInt(answers.familySize) || 1
  
  if (insuranceType === 'health') {
    const baseCoverage = Math.min(Math.max(income * 2, 300000), 1000000)
    const basePremium = Math.floor(baseCoverage * 0.02)
    
    return [
      {
        id: "hdfc_health_personalized",
        name: "HDFC ERGO Health Suraksha Gold",
        provider: "HDFC ERGO",
        coverage: `₹${(baseCoverage).toLocaleString('en-IN')}`,
        premium: basePremium,
        highlights: [
          "Cashless treatment at 10,000+ hospitals",
          familySize > 1 ? "Family floater coverage" : "Individual coverage",
          age > 40 ? "Pre-existing disease coverage" : "Day care procedures",
          "No room rent limit"
        ],
        rating: 4.5,
        link: "https://www.hdfcergo.com/health-insurance"
      },
      {
        id: "icici_health_personalized",
        name: "ICICI Lombard Complete Health Insurance",
        provider: "ICICI Lombard", 
        coverage: `₹${(baseCoverage * 0.8).toLocaleString('en-IN')}`,
        premium: Math.floor(basePremium * 0.85),
        highlights: [
          "Worldwide emergency coverage",
          age > 35 ? "Senior citizen friendly" : "Young professional benefits",
          familySize > 2 ? "Maternity benefits" : "Health check-ups included",
          "Online claim settlement"
        ],
        rating: 4.3,
        link: "https://www.icicilombard.com/health-insurance"
      },
      {
        id: "bajaj_health_personalized",
        name: "Bajaj Allianz Health Guard",
        provider: "Bajaj Allianz",
        coverage: `₹${(baseCoverage * 1.2).toLocaleString('en-IN')}`,
        premium: Math.floor(basePremium * 1.1),
        highlights: [
          familySize > 1 ? "Family floater option" : "Individual comprehensive cover",
          "No co-payment clause",
          "Cumulative bonus up to 100%",
          income > 800000 ? "Premium tax benefits" : "Affordable premium"
        ],
        rating: 4.2,
        link: "https://www.bajajallianz.com/health-insurance"
      }
    ]
  }
  
  if (insuranceType === 'term') {
    const coverageMultiplier = age < 35 ? 15 : age < 45 ? 12 : 10
    const termCoverage = Math.min(income * coverageMultiplier, 10000000)
    const termPremium = Math.floor(termCoverage * 0.001 * (age < 30 ? 0.8 : age < 40 ? 1.2 : 1.8))
    
    return [
      {
        id: "hdfc_term_personalized",
        name: "HDFC Life Click 2 Protect Plus",
        provider: "HDFC Life",
        coverage: `₹${termCoverage.toLocaleString('en-IN')}`,
        premium: termPremium,
        highlights: [
          "Pure term insurance",
          age < 35 ? "Young age benefits" : "Comprehensive coverage",
          "Accidental death benefit",
          familySize > 1 ? "Family income protection" : "Individual security"
        ],
        rating: 4.4,
        link: "https://www.hdfclife.com/term-insurance"
      },
      {
        id: "icici_term_personalized",
        name: "ICICI Pru iProtect Smart",
        provider: "ICICI Prudential",
        coverage: `₹${(termCoverage * 0.9).toLocaleString('en-IN')}`,
        premium: Math.floor(termPremium * 0.95),
        highlights: [
          "Increasing life cover option",
          "Premium return option",
          age > 40 ? "Maturity age up to 80" : "Long-term protection",
          "Terminal illness benefit"
        ],
        rating: 4.3,
        link: "https://www.iciciprulife.com/term-insurance"
      },
      {
        id: "bajaj_term_personalized",
        name: "Bajaj Allianz eTouch Online Term",
        provider: "Bajaj Allianz Life",
        coverage: `₹${(termCoverage * 1.1).toLocaleString('en-IN')}`,
        premium: Math.floor(termPremium * 1.05),
        highlights: [
          "100% online process",
          "Flexible premium payment",
          income > 1000000 ? "High sum assured available" : "Affordable premiums",
          "Critical illness rider"
        ],
        rating: 4.1,
        link: "https://www.bajajallianzlife.com/term-insurance"
      }
    ]
  }
  
  if (insuranceType === 'vehicle') {
    const vehicleValue = parseInt(answers.vehicleValue) || 800000
    const vehicleAge = parseInt(answers.vehicleAge) || 0
    const vehiclePremium = Math.floor(vehicleValue * (vehicleAge < 3 ? 0.03 : vehicleAge < 7 ? 0.04 : 0.05))
    
    return [
      {
        id: "hdfc_vehicle_personalized",
        name: "HDFC ERGO Motor Insurance",
        provider: "HDFC ERGO",
        coverage: `₹${vehicleValue.toLocaleString('en-IN')} IDV`,
        premium: vehiclePremium,
        highlights: [
          "Comprehensive coverage",
          vehicleAge < 5 ? "Zero depreciation cover" : "Standard depreciation",
          "24x7 roadside assistance",
          age < 25 ? "Young driver support" : "Experienced driver benefits"
        ],
        rating: 4.4,
        link: "https://www.hdfcergo.com/motor-insurance"
      },
      {
        id: "icici_vehicle_personalized",
        name: "ICICI Lombard Car Insurance",
        provider: "ICICI Lombard",
        coverage: `₹${(vehicleValue * 0.95).toLocaleString('en-IN')} IDV`,
        premium: Math.floor(vehiclePremium * 0.9),
        highlights: [
          "Quick claim settlement",
          "Engine protection cover",
          vehicleAge > 5 ? "Older vehicle specialist" : "New car protection",
          "Cashless garage network"
        ],
        rating: 4.2,
        link: "https://www.icicilombard.com/motor-insurance"
      },
      {
        id: "bajaj_vehicle_personalized",
        name: "Bajaj Allianz Motor Insurance",
        provider: "Bajaj Allianz",
        coverage: `₹${(vehicleValue * 1.05).toLocaleString('en-IN')} IDV`,
        premium: Math.floor(vehiclePremium * 1.1),
        highlights: [
          "Return to invoice cover",
          "Personal accident cover",
          vehicleValue > 1000000 ? "Luxury car specialist" : "Value for money",
          "Digital claim process"
        ],
        rating: 4.0,
        link: "https://www.bajajallianz.com/motor-insurance"
      }
    ]
  }
  
  // Fallback for unknown insurance types
  return [{
    id: "generic_plan_1",
    name: "Generic Insurance Plan",
    provider: "Insurance Provider",
    coverage: "Standard Coverage",
    premium: 10000,
    highlights: ["Basic coverage", "Standard benefits", "Reliable service", "Customer support"],
    rating: 4.0,
    link: "https://example.com"
  }]
}
