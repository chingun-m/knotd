"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { ActiveTimer } from "./ActiveTimer";
import type { TimerPreset } from "@/lib/timers";

interface TimerCardProps {
  preset: TimerPreset;
  onSessionUpdate?: (progress: number, isActive: boolean) => void;
}

const CATEGORY_LABELS: Record<TimerPreset["category"], string> = {
  classic: "Classic",
  "deep-work": "Deep work",
  sprint: "Sprint",
  recovery: "Recovery",
  custom: "Custom",
};

export function TimerCard({ preset, onSessionUpdate }: TimerCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className={cn(
        "group relative rounded-[10px] border border-[var(--border-hex)] bg-[var(--surface)]",
        "transition-colors duration-200",
        !isExpanded &&
          "hover:border-[#5B6AF066] hover:bg-[var(--surface-2)] cursor-pointer",
      )}
      onClick={() => {
        if (!isExpanded) setIsExpanded(true);
      }}
      role={!isExpanded ? "button" : undefined}
      tabIndex={!isExpanded ? 0 : undefined}
      onKeyDown={(e) => {
        if (!isExpanded && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          setIsExpanded(true);
        }
      }}
      aria-label={!isExpanded ? `Open ${preset.name} timer` : undefined}
    >
      {/* Collapsed state */}
      {!isExpanded && (
        <div className="p-5 flex flex-col gap-4">
          {/* Header */}
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[15px] font-medium text-[var(--text)] leading-snug">
                {preset.name}
              </p>
              <p className="text-[11px] text-[var(--text-muted)] mt-0.5">
                {CATEGORY_LABELS[preset.category]}
              </p>
            </div>

            {/* Work/break badge */}
            <div className="flex items-center gap-1 shrink-0">
              <span className="text-[13px] font-medium text-[var(--text)]">
                {preset.workMinutes}
              </span>
              <span className="text-[11px] text-[var(--text-muted)]">·</span>
              <span className="text-[13px] text-[var(--text-muted)]">
                {preset.breakMinutes}
              </span>
              <span className="text-[11px] text-[var(--text-muted)] ml-1">
                min
              </span>
            </div>
          </div>

          {/* Description */}
          <p className="text-[13px] text-[var(--text-muted)] leading-relaxed">
            {preset.description}
          </p>

          {/* Footer metadata */}
          <div className="flex items-center gap-3 pt-1 border-t border-[var(--border-hex)]">
            <span className="text-[11px] text-[var(--text-muted)]">
              {preset.rounds} rounds
            </span>
            <span className="text-[11px] text-[var(--text-muted)]">·</span>
            <span className="text-[11px] text-[var(--text-muted)]">
              ~
              {Math.round(
                (preset.workMinutes * preset.rounds +
                  preset.breakMinutes * (preset.rounds - 1)) /
                  60,
              )}
              h total
            </span>
          </div>
        </div>
      )}

      {/* Expanded / active state */}
      {isExpanded && (
        <div>
          {/* Sticky card header */}
          <div className="flex items-center justify-between px-5 pt-5 pb-3 border-b border-[var(--border-hex)]">
            <div>
              <p className="text-[15px] font-medium text-[var(--text)]">
                {preset.name}
              </p>
              <p className="text-[11px] text-[var(--text-muted)]">
                {preset.workMinutes} · {preset.breakMinutes} min
              </p>
            </div>
          </div>

          <ActiveTimer
            preset={preset}
            onSessionUpdate={onSessionUpdate}
            onClose={() => setIsExpanded(false)}
          />
        </div>
      )}
    </div>
  );
}
