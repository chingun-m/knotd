"use client";

import { cn } from "@/lib/utils";

interface SessionProgressBarProps {
  /** 0–1 */
  progress: number;
  isActive: boolean;
}

export function SessionProgressBar({
  progress,
  isActive,
}: SessionProgressBarProps) {
  return (
    <div
      className={cn(
        "fixed top-[52px] left-0 right-0 z-40 h-[2px] bg-transparent transition-opacity duration-300",
        isActive ? "opacity-100" : "opacity-0",
      )}
    >
      {/* Track */}
      <div className="h-full w-full bg-[var(--border-hex)]" />
      {/* Fill */}
      <div
        className="absolute top-0 left-0 h-full bg-[var(--accent-hex)] transition-[width] duration-1000 linear"
        style={{ width: `${Math.min(progress * 100, 100)}%` }}
      />
    </div>
  );
}
