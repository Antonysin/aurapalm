import { NextRequest, NextResponse } from "next/server";

const APIMART_BASE_URL = "https://api.apimart.ai/v1";
const APIMART_API_KEY = process.env.APIMART_API_KEY || "";

export async function POST(req: NextRequest) {
  try {
    const { imageBase64, readingType } = await req.json();

    if (!APIMART_API_KEY) {
      return NextResponse.json(
        { error: "API key not configured" },
        { status: 500 }
      );
    }

    if (!imageBase64) {
      return NextResponse.json(
        { error: "Image is required" },
        { status: 400 }
      );
    }

    const systemPrompt = readingType === "face" 
      ? `You are an expert face reader and AI analyst. Analyze the facial features in the provided image and generate a detailed, personalized reading report. 

Your response must be in JSON format with this structure:
{
  "scores": [
    { "label": "Expression", "percentage": 75-95, "color": "#d4a853" },
    { "label": "Intuition", "percentage": 60-90, "color": "#9b7fd4" },
    { "label": "Confidence", "percentage": 65-95, "color": "#c47b8a" },
    { "label": "Diplomacy", "percentage": 70-95, "color": "#4caf82" }
  ],
  "preview": "2-3 paragraphs of insightful face reading analysis...",
  "fullReport": {
    "personality": "Detailed personality analysis based on facial features...",
    "strengths": ["Strength 1", "Strength 2", "Strength 3"],
    "relationships": "Insights about relationship style...",
    "career": "Career path insights...",
    "growthAreas": ["Growth area 1", "Growth area 2"],
    "yearAhead": "Forecast for the coming year..."
  }
}

Guidelines:
- Be specific and personalized, not generic
- Use warm, encouraging language
- Base insights on actual facial features visible in the image
- Percentages should reflect realistic assessments
- Write in a professional yet approachable tone`
      : `You are an expert palmist and AI analyst. Analyze the palm lines and features in the provided image and generate a detailed, personalized reading report.

Your response must be in JSON format with this structure:
{
  "scores": [
    { "label": "Love", "percentage": 60-95, "color": "#c47b8a" },
    { "label": "Career", "percentage": 65-95, "color": "#d4a853" },
    { "label": "Vitality", "percentage": 55-90, "color": "#4caf82" },
    { "label": "Intuition", "percentage": 70-95, "color": "#9b7fd4" }
  ],
  "preview": "2-3 paragraphs of insightful palm reading analysis...",
  "fullReport": {
    "lifeLine": "Detailed life line analysis...",
    "heartLine": "Heart line and emotional style...",
    "headLine": "Thinking and decision-making style...",
    "fateLine": "Career and purpose insights...",
    "personality": "Overall personality profile...",
    "yearAhead": "What the coming year holds..."
  }
}

Guidelines:
- Be specific and personalized based on visible palm lines
- Reference actual line patterns, shapes, and features
- Use warm, insightful language
- Percentages should reflect realistic assessments
- Write in a professional yet approachable tone`;

    const response = await fetch(`${APIMART_BASE_URL}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${APIMART_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: systemPrompt,
          },
          {
            role: "user",
            content: [
              {
                type: "text",
                text: `Please analyze this ${readingType === "face" ? "face" : "palm"} photo and provide a detailed reading report.`,
              },
              {
                type: "image_url",
                image_url: {
                  url: `data:image/jpeg;base64,${imageBase64}`,
                },
              },
            ],
          },
        ],
        max_tokens: 4000,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      console.error("APIMart API error:", error);
      return NextResponse.json(
        { error: error.error?.message || "Failed to analyze image" },
        { status: response.status }
      );
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      return NextResponse.json(
        { error: "No response from AI" },
        { status: 500 }
      );
    }

    // Parse JSON from the response
    // The AI might wrap JSON in markdown code blocks
    const jsonMatch = content.match(/```json\n?([\s\S]*?)\n?```/) || 
                      content.match(/```\n?([\s\S]*?)\n?```/) ||
                      [null, content];
    
    const jsonStr = jsonMatch[1].trim();
    const reading = JSON.parse(jsonStr);

    return NextResponse.json({
      success: true,
      reading,
    });
  } catch (error) {
    console.error("Analyze palm error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
