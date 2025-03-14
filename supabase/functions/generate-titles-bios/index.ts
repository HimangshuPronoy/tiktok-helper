
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get the request payload
    const { contentType, niche, keywords = '', tone, description = '' } = await req.json();
    const apiKey = Deno.env.get('GEMINI_API_KEY');

    if (!apiKey) {
      throw new Error('Missing Gemini API key');
    }

    // Construct the prompt based on the form inputs
    let prompt = `Generate creative and engaging TikTok `;
    
    if (contentType === 'title' || contentType === 'both') {
      prompt += `titles `;
    }
    
    if (contentType === 'both') {
      prompt += `and `;
    }
    
    if (contentType === 'bio' || contentType === 'both') {
      prompt += `bios `;
    }
    
    prompt += `for a ${tone} ${niche} content creator. `;
    
    if (keywords) {
      prompt += `Include these keywords if possible: ${keywords}. `;
    }
    
    if (description) {
      prompt += `Additional context: ${description}. `;
    }
    
    if (contentType === 'title' || contentType === 'both') {
      prompt += `For titles, create attention-grabbing, short phrases that will make users stop scrolling. `;
    }
    
    if (contentType === 'bio' || contentType === 'both') {
      prompt += `For bios, create concise text (max 80 characters) that describes the creator's content focus and encourages follows. `;
    }
    
    prompt += `Output format should be a JSON with two arrays: "titles" and "bios" (empty array if not requested). Generate at least 6 titles and 5 bios if requested.`;

    console.log("Sending prompt to Gemini:", prompt);

    // Make request to Gemini API
    const response = await fetch("https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": apiKey,
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.9,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 2048,
        },
      }),
    });

    const data = await response.json();
    console.log("Gemini API response:", JSON.stringify(data));

    // Parse the response for titles and bios
    let result;
    
    try {
      // Try to extract JSON from the text response
      if (data.candidates && data.candidates[0]?.content?.parts?.length > 0) {
        const text = data.candidates[0].content.parts[0].text;
        
        // Look for JSON format in the response
        const jsonMatch = text.match(/```json\n([\s\S]*?)\n```/) || 
                          text.match(/```\n([\s\S]*?)\n```/) || 
                          text.match(/{[\s\S]*?}/);
        
        if (jsonMatch) {
          const jsonStr = jsonMatch[0].startsWith('{') ? jsonMatch[0] : jsonMatch[1];
          result = JSON.parse(jsonStr);
        } else {
          // If no JSON format, try to parse the whole text
          result = JSON.parse(text);
        }
      }
    } catch (e) {
      console.error("Error parsing Gemini response:", e);
      
      // Fallback: extract titles and bios using regex if JSON parsing fails
      if (data.candidates && data.candidates[0]?.content?.parts?.length > 0) {
        const text = data.candidates[0].content.parts[0].text;
        
        // Manually extract titles and bios
        const titles = [];
        const bios = [];
        
        const titleMatches = text.match(/Title \d+:.*?(?=\n|$)|".*?"(?=:|,|\n|$)/g);
        const bioMatches = text.match(/Bio \d+:.*?(?=\n|$)|'.*?'(?=:|,|\n|$)/g);
        
        if (titleMatches) {
          titleMatches.forEach(match => {
            const title = match.replace(/^Title \d+:\s*|"|"/g, '').trim();
            if (title && !title.includes('Bio') && title.length > 5) {
              titles.push(title);
            }
          });
        }
        
        if (bioMatches) {
          bioMatches.forEach(match => {
            const bio = match.replace(/^Bio \d+:\s*|'|'/g, '').trim();
            if (bio && !bio.includes('Title') && bio.length > 5) {
              bios.push(bio);
            }
          });
        }
        
        result = { titles, bios };
      }
    }
    
    // Format the final response
    const formattedTitles = (result?.titles || []).map(text => ({ 
      text: typeof text === 'string' ? text : text.text || String(text), 
      saved: false, 
      copied: false 
    }));
    
    const formattedBios = (result?.bios || []).map(text => ({ 
      text: typeof text === 'string' ? text : text.text || String(text), 
      saved: false, 
      copied: false 
    }));
    
    // Filter out any empty or very short results
    const filteredTitles = formattedTitles.filter(item => item.text && item.text.length > 3);
    const filteredBios = formattedBios.filter(item => item.text && item.text.length > 3);
    
    // Ensure we have a reasonable number of results
    const finalResult = {
      titles: contentType === 'title' || contentType === 'both' ? filteredTitles.slice(0, 6) : [],
      bios: contentType === 'bio' || contentType === 'both' ? filteredBios.slice(0, 5) : []
    };

    console.log("Final processed result:", JSON.stringify(finalResult));

    return new Response(
      JSON.stringify(finalResult),
      { 
        headers: { 
          ...corsHeaders,
          "Content-Type": "application/json" 
        } 
      }
    );
  } catch (error) {
    console.error("Error generating content:", error);
    
    return new Response(
      JSON.stringify({ 
        error: error.message || "Failed to generate content" 
      }),
      { 
        status: 500,
        headers: { 
          ...corsHeaders,
          "Content-Type": "application/json" 
        } 
      }
    );
  }
});
