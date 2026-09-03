"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
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
  const router = useRouter();

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

          {/* Footer */}
          <div className="flex items-center justify-between pt-1 border-t border-[var(--border-hex)]">
            <div className="flex items-center gap-3">
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

            {/* Open full page button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                router.push(`/timer/${preset.id}`);
              }}
              className={cn(
                "flex items-center gap-1 text-[11px] text-[var(--text-muted)]",
                "hover:text-[var(--accent-hex)] transition-colors duration-150",
                "opacity-0 group-hover:opacity-100",
              )}
              aria-label={`Open ${preset.name} in full view`}
            >
              <span>Open</span>
              <ArrowUpRight className="h-3 w-3" />
            </button>
          </div>
        </div>
      )}

      {/* Expanded / active state */}
      {isExpanded && (
        <div>
          <div className="flex items-center justify-between px-5 pt-5 pb-3 border-b border-[var(--border-hex)]">
            <div>
              <p className="text-[15px] font-medium text-[var(--text)]">
                {preset.name}
              </p>
              <p className="text-[11px] text-[var(--text-muted)]">
                {preset.workMinutes} · {preset.breakMinutes} min
              </p>
            </div>

            {/* Open full page button — visible in expanded state too */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                router.push(`/timer/${preset.id}`);
              }}
              className="flex items-center gap-1 text-[11px] text-[var(--text-muted)] hover:text-[var(--accent-hex)] transition-colors duration-150"
              aria-label={`Open ${preset.name} in full view`}
            >
              <span>Open</span>
              <ArrowUpRight className="h-3 w-3" />
            </button>
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
