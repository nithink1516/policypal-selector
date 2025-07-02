
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { insuranceType, answers } = await req.json()
    
    // Get OpenAI API key from Supabase secrets
    const openaiApiKey = Deno.env.get('OPENAI_API_KEY')
    if (!openaiApiKey) {
      throw new Error('OpenAI API key not found in environment variables')
    }

    // Create a detailed prompt based on user answers
    const prompt = createInsurancePrompt(insuranceType, answers)

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4.1-2025-04-14',
        messages: [
          {
            role: 'system',
            content: 'You are an expert insurance advisor in India. Provide personalized insurance recommendations based on user details. Always respond with valid JSON format containing an array of insurance plans.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.3,
        max_tokens: 2000,
      }),
    })

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.statusText}`)
    }

    const data = await response.json()
    const aiResponse = data.choices[0].message.content

    // Parse the AI response and structure it
    let recommendations
    try {
      recommendations = JSON.parse(aiResponse)
    } catch (e) {
      // If AI doesn't return valid JSON, create a structured response
      recommendations = parseUnstructuredResponse(aiResponse, insuranceType)
    }

    return new Response(
      JSON.stringify({ recommendations }),
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
