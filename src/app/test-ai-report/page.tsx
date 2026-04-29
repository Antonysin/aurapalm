"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Loader2, Download, RefreshCw, Sparkles, Hand } from "lucide-react";

const DEMO_SCORES = {
  palm: [
    { label: "Life", percentage: 82, color: "#4caf82" },
    { label: "Heart", percentage: 78, color: "#c47b8a" },
    { label: "Mind", percentage: 88, color: "#d4a853" },
    { label: "Fate", percentage: 71, color: "#9b7fd4" },
  ],
  face: [
    { label: "Expression", percentage: 84, color: "#d4a853" },
    { label: "Intuition", percentage: 73, color: "#9b7fd4" },
    { label: "Confidence", percentage: 69, color: "#c47b8a" },
    { label: "Diplomacy", percentage: 88, color: "#4caf82" },
  ],
};

export default function TestAIReportPage() {
  const [readingType, setReadingType] = useState<"palm" | "face">("palm");
  const [generating, setGenerating] = useState(false);
  const [result, setResult] = useState<{
    imageUrl?: string;
    poeticDescription?: string;
    error?: string;
  } | null>(null);
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (msg: string) => {
    setLogs((prev) => [...prev, `[${new Date().toLocaleTimeString()}] ${msg}`]);
  };

  const handleGenerate = async () => {
    setGenerating(true);
    setResult(null);
    setLogs([]);
    addLog("🚀 Starting your personal reading...");
    addLog("🎨 Crafting your luxury report...");

    const startTime = Date.now();

    try {
      const response = await fetch("/api/generate-report-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          readingData: {
            scores: DEMO_SCORES[readingType],
          },
          readingType,
        }),
      });

      const duration = ((Date.now() - startTime) / 1000).toFixed(1);
      addLog(`✨ Report crafted in ${duration}s`);

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `HTTP ${response.status}`);
      }

      if (data.success && data.imageUrl) {
        setResult({
          imageUrl: data.imageUrl,
          poeticDescription: data.poeticDescription,
        });
        addLog("🎨 Your luxury report is ready!");
      } else {
        throw new Error("No image URL in response");
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "Unknown error";
      setResult({ error: errorMsg });
      addLog(`❌ Error: ${errorMsg}`);
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="pt-24 pb-16 sm:pt-32 sm:pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-terracotta/8 border border-terracotta/15 mb-4">
            <Hand size={14} className="text-terracotta" />
            <span className="text-xs font-medium text-terracotta uppercase tracking-wider font-accent">
              Luxury Palm Reading
            </span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-semibold">
            Your Personal Reading
          </h1>
          <p className="mt-2 text-text-secondary">
            Generate a beautiful, luxury-style palm reading report card
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left: Controls */}
          <div className="space-y-6">
            {/* Type Selection */}
            <div className="surface-card rounded-2xl p-6">
              <h3 className="font-display text-lg font-semibold mb-4">
                Reading Type
              </h3>
              <div className="flex gap-3">
                <button
                  onClick={() => setReadingType("palm")}
                  className={`flex-1 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    readingType === "palm"
                      ? "bg-terracotta text-white"
                      : "bg-bg-surface border border-border"
                  }`}
                >
                  ✋ Palm Reading
                </button>
                <button
                  onClick={() => setReadingType("face")}
                  className={`flex-1 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    readingType === "face"
                      ? "bg-terracotta text-white"
                      : "bg-bg-surface border border-border"
                  }`}
                >
                  👤 Face Reading
                </button>
              </div>
            </div>

            {/* Info */}
            <div className="surface-card rounded-2xl p-6">
              <h3 className="font-display text-lg font-semibold mb-3">
                What You Get
              </h3>
              <ul className="space-y-2 text-sm text-text-secondary">
                <li className="flex items-start gap-2">
                  <span className="text-terracotta mt-0.5">•</span>
                  <span>Luxury minimalist report card design</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-terracotta mt-0.5">•</span>
                  <span>Elegant line art of palm/face features</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-terracotta mt-0.5">•</span>
                  <span>Personalized energy profile scores</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-terracotta mt-0.5">•</span>
                  <span>Poetic, insightful reading text</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-terracotta mt-0.5">•</span>
                  <span>Print-ready, shareable PNG</span>
                </li>
              </ul>
            </div>

            {/* Generate Button */}
            <Button
              onClick={handleGenerate}
              disabled={generating}
              className="w-full text-base gap-2"
            >
              {generating ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Crafting Your Reading...
                </>
              ) : (
                <>
                  <Sparkles size={18} />
                  Reveal My Reading
                </>
              )}
            </Button>

            {/* Logs */}
            <div className="surface-card rounded-2xl p-4">
              <h3 className="font-display text-sm font-semibold mb-2 text-text-secondary">
                Process
              </h3>
              <div className="h-32 overflow-y-auto text-xs font-mono space-y-1">
                {logs.length === 0 ? (
                  <p className="text-text-muted">Click to generate your report...</p>
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
                Your Report
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
                    <RefreshCw size={14} /> Try Again
                  </Button>
                </div>
              ) : result?.imageUrl ? (
                <div className="space-y-4">
                  <img
                    src={result.imageUrl}
                    alt="Your personal reading report"
                    className="w-full rounded-xl"
                  />
                  {result.poeticDescription && (
                    <div className="p-4 bg-bg-surface rounded-xl">
                      <p className="text-xs font-semibold text-text-secondary mb-1">
                        Your Reading:
                      </p>
                      <p className="text-sm text-text-primary italic leading-relaxed">
                        {result.poeticDescription}
                      </p>
                    </div>
                  )}
                  <div className="flex gap-3">
                    <a
                      href={result.imageUrl}
                      download="aurapalm-reading.png"
                      className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium bg-terracotta text-bg-surface rounded-full hover:bg-terracotta-soft transition-all"
                    >
                      <Download size={14} /> Save Report
                    </a>
                    <Button
                      variant="secondary"
                      className="flex-1 gap-2"
                      onClick={handleGenerate}
                    >
                      <RefreshCw size={14} /> New Reading
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-64 text-text-muted">
                  <Hand size={48} className="mb-4 opacity-30" />
                  <p>Your personalized reading will appear here</p>
                  <p className="text-xs mt-2">Luxury report with line art and analysis</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
