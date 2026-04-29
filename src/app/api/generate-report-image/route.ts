import { NextRequest, NextResponse } from "next/server";

const APIMART_BASE_URL = "https://api.apimart.ai/v1";
const APIMART_API_KEY = process.env.APIMART_API_KEY || "";

// Poll task status with timeout
async function pollTaskStatus(taskId: string, maxAttempts = 30): Promise<string | null> {
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
    const { palmReading, faceReading, scores } = await req.json();

    if (!APIMART_API_KEY) {
      return NextResponse.json(
        { error: "API key not configured" },
        { status: 500 }
      );
    }

    // Build the prompt for the report image
    const prompt = buildReportPrompt({ palmReading, faceReading, scores });

    // Call APIMart Image API
    const response = await fetch(`${APIMART_BASE_URL}/images/generations`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${APIMART_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-image-2",
        prompt: prompt,
        n: 1,
        size: "1024x1024",
        quality: "standard",
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
        });
      } else {
        return NextResponse.json(
          { error: "No image URL in task result" },
          { status: 500 }
        );
      }
    }

    // Direct response (if API returns image URL directly)
    const imageUrl = data.data?.[0]?.url;
    if (imageUrl) {
      return NextResponse.json({
        success: true,
        imageUrl,
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

function buildReportPrompt({
  palmReading,
  faceReading,
  scores,
}: {
  palmReading?: string;
  faceReading?: string;
  scores?: Array<{ label: string; percentage: number; color: string }>;
}) {
  const scoresText = scores
    ?.map((s) => `${s.label}: ${s.percentage}%`)
    .join(", ") || "";

  return `Create a beautiful, elegant palm reading report card in a warm, organic ethereal style. 

Design requirements:
- Warm color palette: terracotta (#B85C38), ochre (#C9A227), sage green (#6B8E6B), cream background (#F3EDE4)
- Elegant serif typography for headings
- Soft, organic shapes and rounded corners
- Minimalist, premium wellness brand aesthetic (like Calm or Headspace)
- Include decorative elements like subtle palm line illustrations or celestial motifs

Content to include:
- Title: "Your AuraPalm Reading"
- Energy Profile scores: ${scoresText}
- Key insight: "${palmReading?.slice(0, 200) || "Your hands reveal a unique story..."}"
- Footer: "aurapalm.com"

Style: Modern, warm, spiritual but not overly mystical. Clean layout with generous whitespace. Professional wellness brand feel.`;
}
