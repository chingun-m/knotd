"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Play, Pause, SkipForward, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { TimerRing } from "./TimerRing";
import { cn } from "@/lib/utils";
import type { TimerPreset } from "@/lib/timers";

interface ActiveTimerProps {
  preset: TimerPreset;
  onSessionUpdate?: (progress: number, isActive: boolean) => void;
  onClose?: () => void;
}

type Phase = "work" | "break";

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

interface ControlButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
}

function ControlButton({
  label,
  onClick,
  disabled,
  className,
  children,
}: ControlButtonProps) {
  return (
    <Tooltip>
      <TooltipTrigger
        onClick={onClick}
        disabled={disabled}
        aria-label={label}
        className={cn(
          "inline-flex items-center justify-center rounded-md transition-colors",
          "text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--surface-2)]",
          "disabled:pointer-events-none disabled:opacity-40",
          className,
        )}
      >
        {children}
      </TooltipTrigger>
      <TooltipContent side="bottom">{label}</TooltipContent>
    </Tooltip>
  );
}

export function ActiveTimer({
  preset,
  onSessionUpdate,
  onClose,
}: ActiveTimerProps) {
  const [phase, setPhase] = useState<Phase>("work");
  const [round, setRound] = useState(1);
  const [isRunning, setIsRunning] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(preset.workMinutes * 60);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const totalSeconds =
    phase === "work" ? preset.workMinutes * 60 : preset.breakMinutes * 60;
  const progress = 1 - secondsLeft / totalSeconds;
  const isComplete = round > preset.rounds;

  useEffect(() => {
    onSessionUpdate?.(progress, isRunning);
  }, [progress, isRunning, onSessionUpdate]);

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

  return (
    <TooltipProvider delay={400}>
      <div className="flex flex-col items-center gap-8 py-8 px-6">
        {/* Phase + round label */}
        <div className="text-center">
          <p className="text-[11px] text-[var(--text-muted)] tracking-wide">
            {isComplete
              ? "Session complete"
              : `${phase === "work" ? "Focus" : "Break"} · Round ${round} of ${preset.rounds}`}
          </p>
        </div>

        {/* Ring + numeral */}
        <div className="relative flex items-center justify-center">
          <TimerRing
            progress={isComplete ? 1 : progress}
            isBreak={phase === "break"}
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">
            <span
              className={cn(
                "font-timer text-[52px] leading-none tracking-[-0.02em] text-[var(--text)]",
                isComplete && "text-[var(--text-muted)]",
              )}
            >
              {isComplete ? "Done" : formatTime(secondsLeft)}
            </span>
            <span className="text-[11px] text-[var(--text-muted)]">
              {phase === "work" ? "focus" : "rest"}
            </span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-3">
          <ControlButton
            label="Reset"
            onClick={handleReset}
            className="h-9 w-9"
          >
            <RotateCcw className="h-4 w-4" />
          </ControlButton>

          {/* Play/Pause — uses Button since it has distinct styling */}
          <Tooltip>
            <TooltipTrigger
              onClick={handlePlayPause}
              disabled={isComplete}
              aria-label={isRunning ? "Pause timer" : "Start timer"}
              className={cn(
                "inline-flex items-center justify-center h-11 w-11 rounded-full",
                "border border-[var(--border-hex)] text-[var(--text)]",
                "hover:bg-[var(--surface-2)] hover:border-[var(--accent-hex)]",
                "transition-colors disabled:pointer-events-none disabled:opacity-40",
              )}
            >
              {isRunning ? (
                <Pause className="h-4 w-4" />
              ) : (
                <Play className="h-4 w-4 translate-x-px" />
              )}
            </TooltipTrigger>
            <TooltipContent side="bottom">
              {isRunning ? "Pause" : "Start"}
            </TooltipContent>
          </Tooltip>

          <ControlButton
            label="Skip phase"
            onClick={handleSkip}
            disabled={isComplete}
            className="h-9 w-9"
          >
            <SkipForward className="h-4 w-4" />
          </ControlButton>
        </div>

        {/* Close / collapse */}
        {onClose && (
          <button
            onClick={onClose}
            className="text-[12px] text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
          >
            Close timer
          </button>
        )}
      </div>
    </TooltipProvider>
  );
}
