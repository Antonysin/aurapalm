"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Loader2, ImageIcon, Download, RefreshCw } from "lucide-react";

const PRESET_PROMPTS = [
  {
    name: "Palm Reading Report",
    prompt: `Create a beautiful, elegant palm reading report card in a warm, organic ethereal style. 

Design requirements:
- Warm color palette: terracotta (#B85C38), ochre (#C9A227), sage green (#6B8E6B), cream background (#F3EDE4)
- Elegant serif typography for headings
- Soft, organic shapes and rounded corners
- Minimalist, premium wellness brand aesthetic (like Calm or Headspace)
- Include decorative elements like subtle palm line illustrations or celestial motifs

Content to include:
- Title: "Your AuraPalm Reading"
- Energy Profile: Love 78%, Career 82%, Vitality 65%, Intuition 91%
- Key insight: "Your heart line curves with unusual depth — suggesting someone who loves with intention, not impulse."
- Footer: "aurapalm.com"

Style: Modern, warm, spiritual but not overly mystical. Clean layout with generous whitespace. Professional wellness brand feel.`,
  },
  {
    name: "Face Reading Report",
    prompt: `Create an elegant face reading analysis report card with a warm, organic design.

Design:
- Warm earth tones: terracotta, ochre, sage, cream
- Soft rounded corners and organic shapes
- Premium wellness aesthetic
- Subtle facial feature line illustrations

Content:
- Title: "Your Face Reading"
- Scores: Expression 84%, Intuition 73%, Confidence 69%, Diplomacy 88%
- Insight: "Your facial structure reveals a natural balance between logic and empathy."
- Footer: "aurapalm.com"

Style: Clean, modern, warm invitation feel.`,
  },
  {
    name: "Minimalist Card",
    prompt: `A minimalist wellness report card design on cream background.
- Simple geometric shapes
- Warm terracotta and ochre accents
- Clean typography
- Small decorative palm icon
- Text: "AuraPalm - Discover Yourself"
- Modern, Apple-like aesthetic`,
  },
  {
    name: "Custom",
    prompt: "",
  },
];

export default function TestImage2Page() {
  const [selectedPrompt, setSelectedPrompt] = useState(0);
  const [customPrompt, setCustomPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    imageUrl?: string;
    revisedPrompt?: string;
    error?: string;
  } | null>(null);
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (msg: string) => {
    setLogs((prev) => [...prev, `[${new Date().toLocaleTimeString()}] ${msg}`]);
  };

  const handleGenerate = async () => {
    const prompt =
      selectedPrompt === 3
        ? customPrompt
        : PRESET_PROMPTS[selectedPrompt].prompt;

    if (!prompt.trim()) {
      addLog("Error: Prompt is empty");
      return;
    }

    setLoading(true);
    setResult(null);
    addLog("Starting image generation...");
    addLog(`Model: gpt-image-2`);
    addLog(`Prompt length: ${prompt.length} chars`);

    const startTime = Date.now();

    try {
      const response = await fetch("/api/generate-report-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          palmReading: prompt,
          scores: [],
        }),
      });

      const duration = ((Date.now() - startTime) / 1000).toFixed(1);
      addLog(`Response received in ${duration}s`);
      addLog(`Status: ${response.status}`);

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `HTTP ${response.status}`);
      }

      if (data.success && data.imageUrl) {
        setResult({
          imageUrl: data.imageUrl,
          revisedPrompt: data.revisedPrompt,
        });
        addLog("✅ Image generated successfully!");
        addLog(`Image URL: ${data.imageUrl.substring(0, 60)}...`);
      } else {
        throw new Error("No image URL in response");
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "Unknown error";
      setResult({ error: errorMsg });
      addLog(`❌ Error: ${errorMsg}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-24 pb-16 sm:pt-32 sm:pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="font-display text-3xl sm:text-4xl font-semibold">
            Test Image2 API
          </h1>
          <p className="mt-2 text-text-secondary">
            Generate beautiful report images with APIMart gpt-image-2
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left: Controls */}
          <div className="space-y-6">
            {/* Prompt Selection */}
            <div className="surface-card rounded-2xl p-6">
              <h3 className="font-display text-lg font-semibold mb-4">
                Select Prompt
              </h3>
              <div className="space-y-2">
                {PRESET_PROMPTS.map((p, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedPrompt(i)}
                    className={`w-full text-left px-4 py-3 rounded-xl text-sm transition-all ${
                      selectedPrompt === i
                        ? "bg-terracotta/10 border border-terracotta/30 text-terracotta font-medium"
                        : "bg-bg-surface border border-border hover:border-terracotta/20"
                    }`}
                  >
                    {p.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Prompt Editor */}
            <div className="surface-card rounded-2xl p-6">
              <h3 className="font-display text-lg font-semibold mb-4">
                Prompt
              </h3>
              <textarea
                value={
                  selectedPrompt === 3
                    ? customPrompt
                    : PRESET_PROMPTS[selectedPrompt].prompt
                }
                onChange={(e) => {
                  if (selectedPrompt === 3) {
                    setCustomPrompt(e.target.value);
                  }
                }}
                readOnly={selectedPrompt !== 3}
                className="w-full h-64 p-4 rounded-xl bg-bg-surface border border-border text-sm leading-relaxed resize-none focus:outline-none focus:border-terracotta/40"
                placeholder={
                  selectedPrompt === 3
                    ? "Enter your custom prompt here..."
                    : undefined
                }
              />
              <p className="text-xs text-text-muted mt-2">
                {selectedPrompt !== 3 && "Preset prompt — select 'Custom' to edit"}
              </p>
            </div>

            {/* Generate Button */}
            <Button
              onClick={handleGenerate}
              disabled={loading}
              className="w-full text-base gap-2"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <ImageIcon size={18} />
                  Generate Image
                </>
              )}
            </Button>

            {/* Logs */}
            <div className="surface-card rounded-2xl p-4">
              <h3 className="font-display text-sm font-semibold mb-2 text-text-secondary">
                Logs
              </h3>
              <div className="h-32 overflow-y-auto text-xs font-mono space-y-1">
                {logs.length === 0 ? (
                  <p className="text-text-muted">Click generate to see logs...</p>
                ) : (
                  logs.map((log, i) => (
                    <p key={i} className="text-text-secondary">
                      {log}
                    </p>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Right: Result */}
          <div>
            <div className="surface-card rounded-2xl p-6 h-full min-h-[400px]">
              <h3 className="font-display text-lg font-semibold mb-4">
                Result
              </h3>

              {result?.error ? (
                <div className="text-center py-12">
                  <p className="text-error mb-2">❌ Generation Failed</p>
                  <p className="text-sm text-text-secondary">{result.error}</p>
                  <Button
                    variant="secondary"
                    className="mt-4 gap-2"
                    onClick={handleGenerate}
                  >
                    <RefreshCw size={14} /> Retry
                  </Button>
                </div>
              ) : result?.imageUrl ? (
                <div className="space-y-4">
                  <img
                    src={result.imageUrl}
                    alt="Generated report"
                    className="w-full rounded-xl"
                  />
                  <div className="flex gap-3">
                    <a
                      href={result.imageUrl}
                      download="aurapalm-report.png"
                      className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium bg-terracotta text-bg-surface rounded-full hover:bg-terracotta-soft transition-all"
                    >
                      <Download size={14} /> Download
                    </a>
                    <Button
                      variant="secondary"
                      className="flex-1 gap-2"
                      onClick={handleGenerate}
                    >
                      <RefreshCw size={14} /> Regenerate
                    </Button>
                  </div>
                  {result.revisedPrompt && (
                    <div className="mt-4 p-3 bg-bg-surface rounded-xl">
                      <p className="text-xs font-semibold text-text-secondary mb-1">
                        Revised Prompt:
                      </p>
                      <p className="text-xs text-text-muted leading-relaxed">
                        {result.revisedPrompt}
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-64 text-text-muted">
                  <ImageIcon size={48} className="mb-4 opacity-30" />
                  <p>Generated image will appear here</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
