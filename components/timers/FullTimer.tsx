"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Play, Pause, SkipForward, RotateCcw } from "lucide-react";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { TimerRing } from "./TimerRing";
import { cn } from "@/lib/utils";
import type { TimerPreset } from "@/lib/timers";

interface FullTimerProps {
  preset: TimerPreset;
}

type Phase = "work" | "break";

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

const CATEGORY_LABELS: Record<TimerPreset["category"], string> = {
  classic: "Classic",
  "deep-work": "Deep work",
  sprint: "Sprint",
  recovery: "Recovery",
  custom: "Custom",
};

export function FullTimer({ preset }: FullTimerProps) {
  const [phase, setPhase] = useState<Phase>("work");
  const [round, setRound] = useState(1);
  const [isRunning, setIsRunning] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(preset.workMinutes * 60);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const totalSeconds =
    phase === "work" ? preset.workMinutes * 60 : preset.breakMinutes * 60;
  const progress = 1 - secondsLeft / totalSeconds;
  const isComplete = round > preset.rounds;

  const tick = useCallback(() => {
    setSecondsLeft((prev) => {
      if (prev <= 1) {
        setPhase((currentPhase) => {
          if (currentPhase === "work") {
            return "break";
          } else {
            setRound((r) => r + 1);
            return "work";
          }
        });
        return 0;
      }
      return prev - 1;
    });
  }, []);

  useEffect(() => {
    setSecondsLeft(
      phase === "work" ? preset.workMinutes * 60 : preset.breakMinutes * 60,
    );
  }, [phase, round, preset]);

  useEffect(() => {
    if (isRunning && !isComplete) {
      intervalRef.current = setInterval(tick, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, isComplete, tick]);

  const handlePlayPause = () => {
    if (isComplete) return;
    setIsRunning((v) => !v);
  };

  const handleSkip = () => {
    setIsRunning(false);
    if (phase === "work") {
      setPhase("break");
    } else {
      setRound((r) => r + 1);
      setPhase("work");
    }
  };

  const handleReset = () => {
    setIsRunning(false);
    setPhase("work");
    setRound(1);
    setSecondsLeft(preset.workMinutes * 60);
  };

  // Round pips
  const pips = Array.from({ length: preset.rounds }, (_, i) => i + 1);

  return (
    <TooltipProvider delay={400}>
      <div className="flex flex-col items-center justify-center min-h-full gap-12 py-16 px-6">
        {/* Timer name + meta */}
        <div className="text-center flex flex-col gap-2">
          <h1 className="text-[28px] font-semibold tracking-[-0.02em] text-[var(--text)]">
            {preset.name}
          </h1>
          <p className="text-[13px] text-[var(--text-muted)]">
            {CATEGORY_LABELS[preset.category]} · {preset.workMinutes} min work ·{" "}
            {preset.breakMinutes} min break
          </p>
          <p className="text-[13px] text-[var(--text-muted)] max-w-sm mx-auto leading-relaxed">
            {preset.description}
          </p>
        </div>

        {/* Ring + numeral */}
        <div className="relative flex items-center justify-center">
          <TimerRing
            progress={isComplete ? 1 : progress}
            size={300}
            strokeWidth={4}
            isBreak={phase === "break"}
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
            <span
              className={cn(
                "font-timer text-[72px] leading-none tracking-[-0.02em]",
                isComplete ? "text-[var(--text-muted)]" : "text-[var(--text)]",
              )}
            >
              {isComplete ? "Done" : formatTime(secondsLeft)}
            </span>
            <span className="text-[13px] text-[var(--text-muted)]">
              {isComplete
                ? "Session complete"
                : phase === "work"
                  ? "focus"
                  : "rest"}
            </span>
          </div>
        </div>

        {/* Round pips */}
        <div className="flex items-center gap-2">
          {pips.map((pip) => (
            <div
              key={pip}
              className={cn(
                "h-1.5 w-6 rounded-full transition-colors duration-300",
                pip < round
                  ? "bg-[var(--accent-hex)]"
                  : pip === round
                    ? phase === "work"
                      ? "bg-[var(--accent-hex)] opacity-60"
                      : "bg-[var(--text-muted)] opacity-60"
                    : "bg-[var(--border-hex)]",
              )}
            />
          ))}
          <span className="text-[11px] text-[var(--text-muted)] ml-2">
            {isComplete ? "All done" : `Round ${round} of ${preset.rounds}`}
          </span>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-4">
          <Tooltip>
            <TooltipTrigger
              onClick={handleReset}
              aria-label="Reset timer"
              className="inline-flex items-center justify-center h-10 w-10 rounded-md text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--surface-2)] transition-colors"
            >
              <RotateCcw className="h-4 w-4" />
            </TooltipTrigger>
            <TooltipContent side="bottom">Reset</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger
              onClick={handlePlayPause}
              disabled={isComplete}
              aria-label={isRunning ? "Pause timer" : "Start timer"}
              className="inline-flex items-center justify-center h-14 w-14 rounded-full border border-[var(--border-hex)] text-[var(--text)] hover:bg-[var(--surface-2)] hover:border-[var(--accent-hex)] transition-colors disabled:pointer-events-none disabled:opacity-40"
            >
              {isRunning ? (
                <Pause className="h-5 w-5" />
              ) : (
                <Play className="h-5 w-5 translate-x-px" />
              )}
            </TooltipTrigger>
            <TooltipContent side="bottom">
              {isRunning ? "Pause" : "Start"}
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger
              onClick={handleSkip}
              disabled={isComplete}
              aria-label="Skip phase"
              className="inline-flex items-center justify-center h-10 w-10 rounded-md text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--surface-2)] transition-colors disabled:pointer-events-none disabled:opacity-40"
            >
              <SkipForward className="h-4 w-4" />
            </TooltipTrigger>
            <TooltipContent side="bottom">Skip</TooltipContent>
          </Tooltip>
        </div>
      </div>
    </TooltipProvider>
  );
}
