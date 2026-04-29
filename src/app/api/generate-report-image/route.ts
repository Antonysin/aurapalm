import { NextRequest, NextResponse } from "next/server";
import { PALM_ANALYSIS_PROMPT, FACE_ANALYSIS_PROMPT, REPORT_IMAGE_PROMPT } from "@/lib/prompts";

const APIMART_BASE_URL = "https://api.apimart.ai/v1";
const APIMART_API_KEY = process.env.APIMART_API_KEY || "";

async function pollTaskStatus(taskId: string, maxAttempts = 40): Promise<string | null> {
  for (let i = 0; i < maxAttempts; i++) {
    const response = await fetch(`${APIMART_BASE_URL}/tasks/${taskId}`, {
      headers: {
        Authorization: `Bearer ${APIMART_API_KEY}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      await new Promise((r) => setTimeout(r, 2000));
      continue;
    }

    const data = await response.json();
    const task = data.data;

    if (task?.status === "completed") {
      const imageUrl = task.result?.images?.[0]?.url?.[0];
      if (imageUrl) return imageUrl;
      return null;
    }

    if (task?.status === "failed") {
      throw new Error(task.error || "Image generation failed");
    }

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

    // Step 1: Analyze the palm/face with GPT-4o Vision
    console.log("Step 1: Analyzing image with GPT-4o...");
    
    const analysisPrompt = readingType === "face" 
      ? FACE_ANALYSIS_PROMPT 
      : PALM_ANALYSIS_PROMPT;

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
            content: "You are a master palmist and face reader. Create beautiful, poetic, deeply insightful analyses.",
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
        max_tokens: 800,
        temperature: 0.7,
      }),
    });

    let poeticDescription = "Your hands reveal a unique story of depth and wisdom.";
    
    if (analysisResponse.ok) {
      const analysisData = await analysisResponse.json();
      poeticDescription = analysisData.choices?.[0]?.message?.content || poeticDescription;
    }

    console.log("Analysis complete:", poeticDescription.slice(0, 100) + "...");

    // Step 2: Generate the report image with GPT-Image-2
    console.log("Step 2: Generating luxury report image...");
    
    const imagePrompt = REPORT_IMAGE_PROMPT({
      readingType,
      poeticDescription,
      scores: readingData?.scores || [],
    });

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
        size: "1024x1536",
        quality: "hd",
      }),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      return NextResponse.json(
        { error: error.error?.message || "Failed to generate image" },
        { status: response.status }
      );
    }

    const data = await response.json();
    const taskId = data.data?.[0]?.task_id;
    
    if (taskId) {
      const imageUrl = await pollTaskStatus(taskId);
      
      if (imageUrl) {
        return NextResponse.json({
          success: true,
          imageUrl,
          poeticDescription,
        });
      }
    }

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
