"use client";

import { useEffect, useState } from "react";
import { X, CheckCircle, AlertCircle, Info } from "lucide-react";

interface Toast {
  id: string;
  type: "success" | "error" | "info";
  message: string;
}

let addToastFn: (toast: Omit<Toast, "id">) => void = () => {};

export function toast(type: Toast["type"], message: string) {
  addToastFn({ type, message });
}

export function ToastContainer() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    addToastFn = (t) => {
      const id = Math.random().toString(36).slice(2);
      setToasts((prev) => [...prev, { ...t, id }]);
    };
  }, []);

  const remove = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2">
      {toasts.map((t) => (
        <ToastItem key={t.id} toast={t} onDismiss={() => remove(t.id)} />
      ))}
    </div>
  );
}

function ToastItem({
  toast: t,
  onDismiss,
}: {
  toast: Toast;
  onDismiss: () => void;
}) {
  useEffect(() => {
    const timer = setTimeout(onDismiss, 5000);
    return () => clearTimeout(timer);
  }, [onDismiss]);

  const icons = {
    success: CheckCircle,
    error: AlertCircle,
    info: Info,
  };
  const Icon = icons[t.type];
  const colors = {
    success: "border-success/30 bg-success/5",
    error: "border-error/30 bg-error/5",
    info: "border-lavender/30 bg-lavender/5",
  };

  return (
    <div
      className={`flex items-start gap-3 glass-card rounded-xl p-4 min-w-[300px] max-w-sm animate-fade-in-up border ${colors[t.type]}`}
    >
      <Icon size={18} className="text-gold mt-0.5 flex-shrink-0" />
      <p className="text-sm text-text-primary flex-1">{t.message}</p>
      <button onClick={onDismiss} className="text-text-muted hover:text-text-primary">
        <X size={14} />
      </button>
    </div>
  );
}
