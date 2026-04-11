import { useState, useEffect } from "react";
import { CheckCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ToastProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
  type?: "success" | "error" | "info";
}

export default function Toast({
  message,
  isVisible,
  onClose,
  type = "success",
}: ToastProps) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed top-4 right-4 z-[200] animate-in slide-in-from-top-2 duration-300">
      <div
        className={`
        flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg border backdrop-blur-sm
        ${
          type === "success"
            ? "bg-green-50 border-green-200 text-green-800"
            : type === "error"
              ? "bg-red-50 border-red-200 text-red-800"
              : "bg-blue-50 border-blue-200 text-blue-800"
        }
      `}
      >
        {type === "success" && (
          <CheckCircle className="h-5 w-5 text-green-600" />
        )}
        <span className="text-sm font-medium">{message}</span>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="h-6 w-6 hover:scale-110 transition-transform duration-300"
        >
          <X className="h-3 w-3" />
        </Button>
      </div>
    </div>
  );
}
