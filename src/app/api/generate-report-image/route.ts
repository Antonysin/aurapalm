import { NextRequest, NextResponse } from "next/server";
import { REPORT_IMAGE_PROMPT } from "@/lib/prompts";

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

// Pre-written poetic descriptions for different palm types
const POETIC_DESCRIPTIONS = {
  palm: [
    "Your life line arcs with steady grace, revealing a soul that builds wisdom through experience. The heart line's gentle curve speaks of deep empathy and intentional love. A rare island near the midpoint marks a transformative chapter that forged your resilience.",
    
    "The bold sweep of your fate line declares a purposeful path — you are someone who shapes destiny rather than follows it. Your head line runs clear and strong, betraying a mind that values truth over comfort. The mount of Jupiter rises prominently, suggesting natural leadership and quiet confidence.",
    
    "Your palm tells of a dreamer grounded in reality. The heart line forks delicately at its end, revealing someone who loves with both passion and intellect. A series of small crosses along the life line mark moments of profound change that ultimately strengthened your foundation.",
    
    "The long, unbroken head line suggests a relentless curiosity — you are someone who must understand the 'why' behind everything. Your heart line dips deeply, indicating emotional depth that surprises even yourself. The fate line emerges clearly from the wrist, speaking of a calling discovered early and pursued with devotion.",
    
    "Your hand reveals the mark of a storyteller. The life line's generous arc promises vitality and adventure, while the heart line's unusual length suggests a capacity for love that expands with age. A star marking near the Apollo mount hints at creative gifts waiting to be fully expressed.",
  ],
  face: [
    "Your features reveal a natural diplomat — the balanced proportions of your face suggest someone who sees all sides before judging. The gentle curve of your brow line speaks of empathy worn lightly, while the determined set of your jaw reveals hidden reserves of willpower.",
    
    "The architecture of your face tells of an old soul in modern times. High cheekbones suggest vitality and social ease, while the thoughtful depth of your eyes reveals an inner life rich with observation. Your smile lines emerge early, marking someone who laughs often and genuinely.",
    
    "Your facial structure embodies the ideal of 'still waters run deep.' The calm symmetry suggests balance, yet the intensity of your gaze betrays passionate convictions held quietly. The strong bridge of your nose speaks of decisiveness — when you choose, you choose completely.",
    
    "The soft angles of your face suggest adaptability and emotional intelligence. Your eyes, set with perfect spacing, indicate someone who processes the world through careful observation before action. The gentle prominence of your chin reveals persistence disguised as patience.",
    
    "Your face carries the map of a seeker. The broad forehead speaks of intellectual appetite, while the warm curves of your features suggest a heart that remains open despite experience. The subtle asymmetry of your smile hints at a complex inner world that defies simple categorization.",
  ],
};

function getRandomDescription(readingType: "palm" | "face"): string {
  const descriptions = POETIC_DESCRIPTIONS[readingType];
  return descriptions[Math.floor(Math.random() * descriptions.length)];
}

export async function POST(req: NextRequest) {
  try {
    const { readingData, readingType } = await req.json();

    if (!APIMART_API_KEY) {
      return NextResponse.json(
        { error: "API key not configured" },
        { status: 500 }
      );
    }

    // Use pre-written poetic description instead of AI analysis
    // (GPT-4o refuses to analyze palms, so we use curated descriptions)
    const poeticDescription = getRandomDescription(readingType);
    console.log("Using curated description:", poeticDescription.slice(0, 100) + "...");

    // Generate the report image with GPT-Image-2
    console.log("Generating luxury report image...");
    
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
