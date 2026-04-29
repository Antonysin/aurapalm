"use client";

import { forwardRef } from "react";

interface ReportCardProps {
  userImage?: string;
  scores: Array<{ label: string; percentage: number; color: string }>;
  preview: string;
  readingType: "palm" | "face";
}

export const ReportCard = forwardRef<HTMLDivElement, ReportCardProps>(
  ({ userImage, scores, preview, readingType }, ref) => {
    const title = readingType === "palm" ? "Palm Reading" : "Face Reading";
    const icon = readingType === "palm" ? "✋" : "👤";

    return (
      <div
        ref={ref}
        className="w-[600px] bg-[#F3EDE4] p-8 relative overflow-hidden"
        style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
      >
        {/* Background decoration */}
        <div
          className="absolute top-[-100px] right-[-100px] w-[300px] h-[300px] rounded-full opacity-10"
          style={{ backgroundColor: "#B85C38" }}
        />
        <div
          className="absolute bottom-[-80px] left-[-80px] w-[250px] h-[250px] rounded-full opacity-8"
          style={{ backgroundColor: "#C9A227" }}
        />

        {/* Content */}
        <div className="relative z-10">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="text-3xl mb-2">{icon}</div>
            <h1
              className="text-3xl font-light tracking-wide"
              style={{ color: "#B85C38" }}
            >
              Your {title}
            </h1>
            <p className="text-sm mt-1" style={{ color: "#8A7D6F" }}>
              Powered by AuraPalm AI
            </p>
          </div>

          {/* User Image */}
          {userImage && (
            <div className="flex justify-center mb-6">
              <div className="w-48 h-48 rounded-2xl overflow-hidden border-4 border-white shadow-lg">
                <img
                  src={userImage}
                  alt="Your photo"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}

          {/* Scores */}
          <div className="bg-white/60 rounded-2xl p-6 mb-6 backdrop-blur-sm">
            <h2
              className="text-lg font-semibold text-center mb-4"
              style={{ color: "#4A3F35" }}
            >
              Energy Profile
            </h2>
            <div className="grid grid-cols-4 gap-4">
              {scores.map((s) => (
                <div key={s.label} className="text-center">
                  <div
                    className="w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-2 border-4"
                    style={{
                      borderColor: s.color,
                      backgroundColor: `${s.color}15`,
                    }}
                  >
                    <span
                      className="text-lg font-semibold"
                      style={{ color: s.color }}
                    >
                      {s.percentage}
                    </span>
                  </div>
                  <p className="text-xs font-medium" style={{ color: "#4A3F35" }}>
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Key Insight */}
          <div className="bg-white/40 rounded-2xl p-6 backdrop-blur-sm">
            <h2
              className="text-lg font-semibold mb-3"
              style={{ color: "#4A3F35" }}
            >
              Key Insight
            </h2>
            <p
              className="text-sm leading-relaxed italic"
              style={{ color: "#6B5B4F" }}
            >
              &ldquo;{preview.slice(0, 200)}...&rdquo;
            </p>
          </div>

          {/* Footer */}
          <div className="mt-6 pt-4 border-t border-[#B85C38]/20 text-center">
            <p className="text-xs" style={{ color: "#A89B8C" }}>
              Discover more at <span style={{ color: "#B85C38" }}>aurapalm.com</span>
            </p>
            <p className="text-[10px] mt-1" style={{ color: "#B5A99A" }}>
              AI-powered palm & face readings · Personal & Private
            </p>
          </div>
        </div>
      </div>
    );
  }
);

ReportCard.displayName = "ReportCard";
