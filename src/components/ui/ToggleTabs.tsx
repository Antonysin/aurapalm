"use client";

import { cn } from "@/lib/utils";

interface Tab {
  id: string;
  label: string;
  badge?: string;
}

interface ToggleTabsProps {
  tabs: Tab[];
  activeTab: string;
  onChange: (id: string) => void;
}

export function ToggleTabs({ tabs, activeTab, onChange }: ToggleTabsProps) {
  return (
    <div className="inline-flex p-1 rounded-xl bg-bg-surface border border-border">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={cn(
            "relative px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200",
            activeTab === tab.id
              ? "bg-gold/10 text-gold shadow-sm"
              : "text-text-muted hover:text-text-secondary"
          )}
        >
          {tab.label}
          {tab.badge && (
            <span className="ml-1.5 px-1.5 py-0.5 text-[10px] uppercase tracking-wider font-bold bg-gold/20 text-gold rounded">
              {tab.badge}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}
