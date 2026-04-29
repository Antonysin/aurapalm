"use client";

import { useState, useRef, useCallback } from "react";
import { toPng } from "html-to-image";
import { Button } from "@/components/ui/Button";
import { Loader2, Download, RefreshCw, ImageIcon } from "lucide-react";
import { ReportCard } from "@/components/report/ReportCard";

const DEMO_DATA = {
  palm: {
    scores: [
      { label: "Love", percentage: 78, color: "#c47b8a" },
      { label: "Career", percentage: 82, color: "#d4a853" },
      { label: "Vitality", percentage: 65, color: "#4caf82" },
      { label: "Intuition", percentage: 91, color: "#9b7fd4" },
    ],
    preview:
      "Your heart line curves with an unusual depth — suggesting someone who loves with intention, not impulse. The fork at its end reveals a person who needs intellectual connection as much as emotional warmth.",
    userImage: null as string | null,
  },
  face: {
    scores: [
      { label: "Expression", percentage: 84, color: "#d4a853" },
      { label: "Intuition", percentage: 73, color: "#9b7fd4" },
      { label: "Confidence", percentage: 69, color: "#c47b8a" },
      { label: "Diplomacy", percentage: 88, color: "#4caf82" },
    ],
    preview:
      "Your facial structure reveals a natural balance between logic and empathy. The proportions of your features suggest someone who processes the world through both analysis and feeling.",
    userImage: null as string | null,
  },
};

export default function TestReportPage() {
  const [readingType, setReadingType] = useState<"palm" | "face">("palm");
  const [userImage, setUserImage] = useState<string | null>(null);
  const [generating, setGenerating] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const reportRef = useRef<HTMLDivElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setUserImage(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleCapture = useCallback(async () => {
    if (!reportRef.current) return;

    setGenerating(true);
    try {
      const dataUrl = await toPng(reportRef.current, {
        quality: 1,
        pixelRatio: 2,
      });
      setDownloadUrl(dataUrl);
    } catch (err) {
      console.error("Capture failed:", err);
    } finally {
      setGenerating(false);
    }
  }, [reportRef]);

  const data = DEMO_DATA[readingType];

  return (
    <div className="pt-24 pb-16 sm:pt-32 sm:pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="font-display text-3xl sm:text-4xl font-semibold">
            Test Report Card
          </h1>
          <p className="mt-2 text-text-secondary">
            Generate a shareable report image from HTML/CSS
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

            {/* Upload Photo */}
            <div className="surface-card rounded-2xl p-6">
              <h3 className="font-display text-lg font-semibold mb-4">
                Upload Your Photo
              </h3>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
                id="report-photo"
              />
              <label
                htmlFor="report-photo"
                className="block w-full p-4 border-2 border-dashed border-border rounded-xl text-center cursor-pointer hover:border-terracotta/40 transition-colors"
              >
                {userImage ? (
                  <img
                    src={userImage}
                    alt="Preview"
                    className="w-32 h-32 mx-auto rounded-xl object-cover"
                  />
                ) : (
                  <div className="py-4">
                    <ImageIcon
                      size={32}
                      className="mx-auto mb-2 text-text-muted"
                    />
                    <p className="text-sm text-text-secondary">
                      Click to upload photo
                    </p>
                  </div>
                )}
              </label>
            </div>

            {/* Generate Button */}
            <Button
              onClick={handleCapture}
              disabled={generating}
              className="w-full text-base gap-2"
            >
              {generating ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Capturing...
                </>
              ) : (
                <>
                  <ImageIcon size={18} />
                  Generate Report Image
                </>
              )}
            </Button>

            {/* Download */}
            {downloadUrl && (
              <div className="flex gap-3">
                <a
                  href={downloadUrl}
                  download={`aurapalm-${readingType}-report.png`}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium bg-terracotta text-bg-surface rounded-full hover:bg-terracotta-soft transition-all"
                >
                  <Download size={14} /> Download PNG
                </a>
                <Button
                  variant="secondary"
                  className="flex-1 gap-2"
                  onClick={() => {
                    setDownloadUrl(null);
                    handleCapture();
                  }}
                >
                  <RefreshCw size={14} /> Regenerate
                </Button>
              </div>
            )}
          </div>

          {/* Right: Preview */}
          <div>
            <div className="surface-card rounded-2xl p-6">
              <h3 className="font-display text-lg font-semibold mb-4">
                Preview
              </h3>

              {/* Hidden off-screen for capture */}
              <div className="overflow-auto flex justify-center">
                <ReportCard
                  ref={reportRef}
                  userImage={userImage || undefined}
                  scores={data.scores}
                  preview={data.preview}
                  readingType={readingType}
                />
              </div>
            </div>

            {/* Captured Result */}
            {downloadUrl && (
              <div className="mt-6 surface-card rounded-2xl p-6">
                <h3 className="font-display text-lg font-semibold mb-4">
                  Captured Result
                </h3>
                <img
                  src={downloadUrl}
                  alt="Generated report"
                  className="w-full rounded-xl"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
