import { NextRequest, NextResponse } from "next/server";

const APIMART_BASE_URL = "https://api.apimart.ai/v1";
const APIMART_API_KEY = process.env.APIMART_API_KEY || "";

// Poll task status with timeout
async function pollTaskStatus(taskId: string, maxAttempts = 40): Promise<string | null> {
  for (let i = 0; i < maxAttempts; i++) {
    const response = await fetch(`${APIMART_BASE_URL}/tasks/${taskId}`, {
      headers: {
        Authorization: `Bearer ${APIMART_API_KEY}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.error(`Task poll failed: ${response.status}`);
      await new Promise((r) => setTimeout(r, 2000));
      continue;
    }

    const data = await response.json();
    const task = data.data;

    console.log(`Task ${taskId} status: ${task?.status}, progress: ${task?.progress}%`);

    if (task?.status === "completed") {
      const imageUrl = task.result?.images?.[0]?.url?.[0];
      if (imageUrl) return imageUrl;
      return null;
    }

    if (task?.status === "failed") {
      throw new Error(task.error || "Image generation failed");
    }

    // Wait before next poll
    await new Promise((r) => setTimeout(r, 3000));
  }

  throw new Error("Timeout waiting for image generation");
}

export async function POST(req: NextRequest) {
  try {
    const { userImageBase64, readingData, readingType } = await req.json();

    if (!APIMART_API_KEY) {
      return NextResponse.json(
        { error: "API key not configured" },
        { status: 500 }
      );
    }

    // Step 1: Use GPT-4o to analyze the image and generate a detailed prompt for the report
    console.log("Step 1: Analyzing image with GPT-4o...");
    
    const analysisPrompt = readingType === "face"
      ? `Analyze this face photo and create a detailed, poetic description for a face reading report. Focus on:
- Facial structure and proportions
- Eye shape and expression
- Overall impression and personality traits
- Key strengths and characteristics

Write in a warm, insightful, slightly mystical tone. Keep it to 3-4 sentences.`
      : `Analyze this palm photo and create a detailed, poetic description for a palm reading report. Focus on:
- The life line (vitality, resilience)
- The heart line (emotional style, relationships)
- The head line (thinking patterns, decisions)
- Overall hand shape and impression

Write in a warm, insightful, slightly mystical tone. Keep it to 3-4 sentences.`;

    const analysisResponse = await fetch(`${APIMART_BASE_URL}/chat/completions`, {
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
            content: "You are an expert palmist and face reader. You create beautiful, poetic descriptions for reading reports.",
          },
          {
            role: "user",
            content: [
              { type: "text", text: analysisPrompt },
              {
                type: "image_url",
                image_url: {
                  url: `data:image/jpeg;base64,${userImageBase64}`,
                },
              },
            ],
          },
        ],
        max_tokens: 500,
        temperature: 0.8,
      }),
    });

    if (!analysisResponse.ok) {
      const error = await analysisResponse.json().catch(() => ({}));
      console.error("Analysis failed:", error);
      // Continue with default prompt if analysis fails
    }

    const analysisData = await analysisResponse.json();
    const poeticDescription = analysisData.choices?.[0]?.message?.content || 
      "Your hands reveal a unique story of resilience and depth, with lines that speak of wisdom earned through experience.";

    console.log("Poetic description:", poeticDescription);

    // Step 2: Build the image generation prompt
    const scores = readingData?.scores || [];
    const scoresText = scores
      .map((s: { label: string; percentage: number }) => `${s.label}: ${s.percentage}%`)
      .join(" | ");

    const imagePrompt = `Create an exquisite, high-end ${readingType === "face" ? "face" : "palm"} reading report card with the following design:

LAYOUT & STYLE:
- Elegant vertical card format, 3:4 aspect ratio
- Premium wellness brand aesthetic (inspired by Aesop, Calm, Headspace)
- Warm, organic color palette: terracotta (#B85C38), ochre (#C9A227), sage (#6B8E6B), cream (#F3EDE4), warm brown text
- Soft, diffused lighting effect
- Subtle texture: watercolor paper or linen feel
- Generous whitespace, refined typography
- Decorative elements: thin gold foil lines, subtle celestial motifs, organic curves

CONTENT STRUCTURE (from top to bottom):
1. Header: Small elegant icon (${readingType === "face" ? "👤" : "✋"}) + "AuraPalm" in refined serif
2. Title: "Your ${readingType === "face" ? "Face" : "Palm"} Reading" in large, elegant script
3. Photo area: A soft, rounded frame showing the user's ${readingType === "face" ? "face" : "palm"} with a warm glow
4. Divider: Thin gold line with small decorative dots
5. Energy Profile section:
   ${scoresText}
   Display as elegant circular progress indicators with soft colors
6. Key Insight section:
   A beautiful quotation mark icon
   The reading: "${poeticDescription.slice(0, 300)}"
   In elegant italic serif font
7. Footer: "aurapalm.com" in small, refined text + "AI-Powered · Personal · Private"

TYPOGRAPHY:
- Headlines: Elegant serif (like Cormorant Garamond or Playfair Display), light weight
- Body text: Refined sans-serif, generous line height
- Accent text: Subtle italic, warm terracotta color

OVERALL MOOD:
Warm, intimate, slightly mystical but grounded. Like a handwritten letter from a wise friend. Premium spa or apothecary feel. No cheesy mystical elements - keep it sophisticated and modern.

QUALITY: Ultra-detailed, print-ready, 4K quality.`;

    // Step 3: Call GPT-Image-2 to generate the report image
    console.log("Step 2: Generating image with GPT-Image-2...");
    
    const response = await fetch(`${APIMART_BASE_URL}/images/generations`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${APIMART_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-image-2-official",
        prompt: imagePrompt,
        n: 1,
        size: "1024x1536", // 2:3 ratio for vertical card
        quality: "hd", // High quality
      }),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      console.error("APIMart API error:", error);
      return NextResponse.json(
        { error: error.error?.message || "Failed to generate image" },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log("APIMart response:", JSON.stringify(data, null, 2));

    // Check if it's an async task
    const taskId = data.data?.[0]?.task_id;
    
    if (taskId) {
      // Async task - poll for completion
      console.log(`Task submitted: ${taskId}, polling...`);
      const imageUrl = await pollTaskStatus(taskId);
      
      if (imageUrl) {
        return NextResponse.json({
          success: true,
          imageUrl,
          poeticDescription,
        });
      } else {
        return NextResponse.json(
          { error: "No image URL in task result" },
          { status: 500 }
        );
      }
    }

    // Direct response
    const imageUrl = data.data?.[0]?.url;
    if (imageUrl) {
      return NextResponse.json({
        success: true,
        imageUrl,
        poeticDescription,
      });
    }

    return NextResponse.json(
      { error: "No image URL in response" },
      { status: 500 }
    );
  } catch (error) {
    console.error("Generate report image error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal server error" },
      { status: 500 }
    );
  }
}
