"use client";

import { TimerCard } from "./TimerCard";
import type { TimerPreset } from "@/lib/timers";

interface TimerGridProps {
  presets: TimerPreset[];
  onSessionUpdate?: (progress: number, isActive: boolean) => void;
}

export function TimerGrid({ presets, onSessionUpdate }: TimerGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-auto">
      {presets.map((preset) => (
        <div
          key={preset.id}
          className={
            preset.weight === 2
              ? "sm:col-span-2 lg:col-span-1 xl:col-span-2"
              : ""
          }
        >
          <TimerCard preset={preset} onSessionUpdate={onSessionUpdate} />
        </div>
      ))}
    </div>
  );
}
