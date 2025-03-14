
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY');
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent";

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { niche } = await req.json();
    
    if (!niche) {
      return new Response(
        JSON.stringify({ error: "Niche is required" }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Generating content ideas for niche: ${niche}`);

    const prompt = `
      You are a TikTok content strategist. Generate 4 creative content ideas for TikTok videos related to: ${niche}.
      
      For each idea, provide:
      1. A catchy title (attention-grabbing and specific)
      2. A detailed outline with sections for how the video should flow (intro, main points, outro)
      3. 3-4 relevant hashtags (including the # symbol)
      
      Format the response as a JSON array with objects containing: 
      { title, outline, hashtags }
      
      Do NOT include any explanatory text outside the JSON.
    `;

    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              { text: prompt }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.8,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 2048,
        },
      }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      console.error("Gemini API error:", data);
      return new Response(
        JSON.stringify({ error: "Failed to generate content ideas", details: data }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    let ideas;
    try {
      const generatedText = data.candidates[0].content.parts[0].text;
      
      // Extract the JSON from the response
      const jsonMatch = generatedText.match(/\[\s*\{.*\}\s*\]/s);
      if (jsonMatch) {
        ideas = JSON.parse(jsonMatch[0]);
        
        // Add saved and copied properties to each idea
        ideas = ideas.map(idea => ({
          ...idea,
          saved: false,
          copied: false
        }));
      } else {
        throw new Error("Could not extract JSON from response");
      }
    } catch (error) {
      console.error("Error parsing Gemini response:", error);
      return new Response(
        JSON.stringify({ error: "Failed to parse content ideas data", details: error.message }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ ideas }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error("Error in generate-content-ideas function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
