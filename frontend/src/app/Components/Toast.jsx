"use client";

import { useEffect } from "react";
import { CheckCircle, XCircle, AlertCircle, X } from "lucide-react";

export default function Toast({
  message,
  type = "success",
  onClose,
  duration = 4000,
}) {
  useEffect(() => {
    if (!message) return;

    const timer = setTimeout(() => {
      onClose?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [message, duration, onClose]);

  if (!message) return null;

  const config = {
    success: {
      icon: CheckCircle,
      title: "Success",
    },

    error: {
      icon: XCircle,
      title: "Error",
    },

    warning: {
      icon: AlertCircle,
      title: "Attention",
    },
  };

  const current = config[type] || config.success;
  const Icon = current.icon;

  return (
    <div className="toast flex items-center gap-4 min-w-[300px] max-w-[420px]">
      {/* Icon */}
      <div className="shrink-0">
        <Icon size={22} strokeWidth={1.8} />
      </div>

      {/* Content */}
      <div className="flex-1">
        <p className="font-semibold text-sm">
          {current.title}
        </p>

        <p className="mt-1 text-xs leading-5 opacity-85">
          {message}
        </p>
      </div>

      {/* Close */}
      <button
        type="button"
        onClick={onClose}
        className="shrink-0 opacity-60 transition-opacity hover:opacity-100"
        aria-label="Close notification"
      >
        <X size={17} />
      </button>
    </div>
  );
}