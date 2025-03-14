
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
    const { searchTerm } = await req.json();
    
    if (!searchTerm) {
      return new Response(
        JSON.stringify({ error: "Search term is required" }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Analyzing trend for search term: ${searchTerm}`);

    const prompt = `
      You are a TikTok trend analysis expert. Analyze the current trend status for: ${searchTerm}.
      
      Provide:
      1. A comprehensive overview of the trend (2-3 sentences)
      2. 5 related hashtags (including the # symbol)
      3. 4 suggested content styles that perform well with this trend
      4. Trend momentum (rising, stable, or declining)
      5. Simulated trend data for the last 6 months (generate realistic numbers)
      
      Format the response as a JSON object with: 
      { 
        "overview": string,
        "relatedHashtags": string[],
        "suggestedStyles": string[],
        "momentum": "rising"|"stable"|"declining",
        "data": [{ "date": string, "value": number }]
      }
      
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
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1536,
        },
      }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      console.error("Gemini API error:", data);
      return new Response(
        JSON.stringify({ error: "Failed to analyze trend", details: data }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    let trendResults;
    try {
      const generatedText = data.candidates[0].content.parts[0].text;
      
      // Extract the JSON from the response
      const jsonMatch = generatedText.match(/\{\s*".*"\s*:.*/s);
      if (jsonMatch) {
        trendResults = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error("Could not extract JSON from response");
      }
    } catch (error) {
      console.error("Error parsing Gemini response:", error);
      return new Response(
        JSON.stringify({ error: "Failed to parse trend analysis data", details: error.message }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ trendResults }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error("Error in analyze-trend function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
