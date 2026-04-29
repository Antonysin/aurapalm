import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { html, width = 600, height = 800 } = await req.json();

    if (!html) {
      return NextResponse.json(
        { error: "HTML content is required" },
        { status: 400 }
      );
    }

    // For now, return the HTML for client-side rendering
    // In production, you would use puppeteer or similar
    return NextResponse.json({
      success: true,
      html,
      message: "Use html-to-image library on client side for best results",
    });
  } catch (error) {
    console.error("Capture report error:", error);
    return NextResponse.json(
      { error: "Failed to capture report" },
      { status: 500 }
    );
  }
}
