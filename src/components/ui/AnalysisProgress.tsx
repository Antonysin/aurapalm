"use client";

import { useState, useEffect } from "react";
import { Scan, Sparkles, FileText, CheckCircle } from "lucide-react";

const steps = [
  { icon: Scan, label: "Scanning your photo..." },
  { icon: Sparkles, label: "Identifying key features..." },
  { icon: FileText, label: "Generating your reading..." },
];

export function AnalysisProgress() {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const timers = steps.map((_, i) =>
      setTimeout(() => setCurrentStep(i + 1), (i + 1) * 6000)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="max-w-md mx-auto space-y-6">
      {steps.map((step, index) => {
        const isActive = currentStep >= index;
        const isDone = currentStep > index;
        const Icon = step.icon;

        return (
          <div
            key={step.label}
            className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-500 ${
              isActive ? "opacity-100" : "opacity-30"
            }`}
          >
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-500 ${
                isDone
                  ? "bg-success/10 text-success"
                  : isActive
                    ? "bg-ochre/10 text-ochre"
                    : "bg-bg-elevated text-text-muted"
              }`}
            >
              {isDone ? (
                <CheckCircle size={20} />
              ) : (
                <Icon size={20} className={isActive ? "animate-pulse" : ""} />
              )}
            </div>
            <div className="flex-1">
              <p
                className={`text-sm font-medium ${
                  isDone
                    ? "text-success"
                    : isActive
                      ? "text-text-primary"
                      : "text-text-muted"
                }`}
              >
                {step.label}
              </p>
            </div>
            {isActive && !isDone && (
              <div className="w-4 h-4 border-2 border-ochre border-t-transparent rounded-full animate-spin" />
            )}
          </div>
        );
      })}
    </div>
  );
}
