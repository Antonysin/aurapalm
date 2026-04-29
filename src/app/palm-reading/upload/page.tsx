"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ToggleTabs } from "@/components/ui/ToggleTabs";
import { Upload, Camera, Info, ImageIcon } from "lucide-react";

const readingTypes = [
  { id: "palm", label: "Palm Reading" },
  { id: "face", label: "Face Reading" },
  { id: "both", label: "Both", badge: "Best Value" },
];

export default function PalmReadingUploadPage() {
  const [image, setImage] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [readingType, setReadingType] = useState("palm");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    setError(null);

    // Validate type
    const validTypes = ["image/jpeg", "image/png", "image/webp", "image/heic"];
    if (!validTypes.includes(file.type)) {
      setError("Please upload a JPG, PNG, WEBP, or HEIC image.");
      return;
    }

    // Validate size (10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError("File is too large. Maximum size is 10MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => setImage(e.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  return (
    <div className="pt-24 pb-16 sm:pt-32 sm:pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold">
            Let&apos;s Read Your Palm
          </h1>
          <p className="mt-4 text-text-secondary text-lg leading-relaxed">
            Upload a photo of your dominant hand, palm facing up, in natural light.
          </p>
        </div>

        {/* Reading Type Selector */}
        <div className="flex justify-center mb-8">
          <ToggleTabs
            tabs={readingTypes}
            activeTab={readingType}
            onChange={(id) => {
              setReadingType(id);
              if (id === "face") window.location.href = "/face-reading/upload";
              if (id === "both") window.location.href = "/combo-reading";
            }}
          />
        </div>

        {/* Upload Zone */}
        <div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={`
            relative border-2 border-dashed rounded-2xl p-12 sm:p-16 text-center cursor-pointer
            transition-all duration-200
            ${dragOver
              ? "border-terracotta bg-terracotta/5"
              : image
                ? "border-terracotta/40 bg-bg-card"
                : "border-border hover:border-terracotta/40 hover:bg-bg-card"
            }
          `}
        >
          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/heic"
            onChange={handleChange}
            className="hidden"
          />

          {image ? (
            <div className="space-y-4">
              <img
                src={image}
                alt="Uploaded palm photo preview"
                className="max-h-[400px] mx-auto rounded-xl object-contain"
              />
              <div className="flex items-center justify-center gap-3">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    setImage(null);
                  }}
                >
                  Remove & Re-upload
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-terracotta/10 flex items-center justify-center">
                <Upload size={28} className="text-terracotta" />
              </div>
              <div>
                <p className="text-base font-medium text-text-primary">
                  Drop your photo here, or click to browse
                </p>
                <p className="text-sm text-text-muted mt-1">
                  JPG, PNG, WEBP, or HEIC &middot; Max 10MB
                </p>
              </div>
              <div className="flex items-center justify-center gap-4 pt-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    inputRef.current?.click();
                  }}
                  className="gap-2"
                >
                  <ImageIcon size={16} />
                  Browse Files
                </Button>
              </div>
            </div>
          )}

          {error && (
            <p className="mt-4 text-sm text-error flex items-center justify-center gap-1">
              <Info size={14} /> {error}
            </p>
          )}
        </div>

        {/* CTA Button */}
        {image && (
          <div className="mt-8 text-center animate-fade-in">
            <Link href="/palm-reading/results">
              <Button size="lg" className="text-base w-full sm:w-auto">
                Looks Good — Analyze My Palm
              </Button>
            </Link>
          </div>
        )}

        {/* Photo Tips */}
        <div className="mt-10 surface-card rounded-2xl p-6 sm:p-8">
          <h3 className="font-display text-xl font-semibold mb-4 flex items-center gap-2">
            <Camera size={18} className="text-terracotta" />
            For the Best Reading
          </h3>
          <div className="grid sm:grid-cols-2 gap-3 text-sm">
            <div className="flex items-start gap-2 text-success">
              <span className="mt-0.5">&#10003;</span>
              <span>Use natural daylight or bright indoor light</span>
            </div>
            <div className="flex items-start gap-2 text-success">
              <span className="mt-0.5">&#10003;</span>
              <span>Hold your hand flat, palm facing the camera</span>
            </div>
            <div className="flex items-start gap-2 text-success">
              <span className="mt-0.5">&#10003;</span>
              <span>Keep your fingers slightly spread</span>
            </div>
            <div className="flex items-start gap-2 text-success">
              <span className="mt-0.5">&#10003;</span>
              <span>Avoid heavy shadows across the palm</span>
            </div>
            <div className="flex items-start gap-2 text-error">
              <span className="mt-0.5">&times;</span>
              <span>Don&apos;t use flash &mdash; it washes out the lines</span>
            </div>
          </div>
        </div>

        {/* Privacy Notice */}
        <div className="mt-6 text-center">
          <p className="text-xs text-text-muted flex items-center justify-center gap-1.5">
            <span className="text-terracotta">&#x1f512;</span>
            Your image is sent securely for analysis and deleted immediately
            afterward. We do not store, share, or use your photo for any other purpose.
          </p>
        </div>
      </div>
    </div>
  );
}
