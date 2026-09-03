"use client";

import { useState, useCallback } from "react";
import { TopRail } from "@/components/layout/TopRail";
import { SessionProgressBar } from "@/components/layout/SessionProgressBar";
import { TimerGrid } from "@/components/timers/TimerGrid";
import { TIMER_PRESETS } from "@/lib/timers";

export default function HomePage() {
  const [sessionProgress, setSessionProgress] = useState(0);
  const [isSessionActive, setIsSessionActive] = useState(false);

  const handleSessionUpdate = useCallback(
    (progress: number, isActive: boolean) => {
      setSessionProgress(progress);
      setIsSessionActive(isActive);
    },
    [],
  );

  return (
    <>
      <TopRail isSessionActive={isSessionActive} />
      <SessionProgressBar
        progress={sessionProgress}
        isActive={isSessionActive}
      />

      <main className="pt-[52px] min-h-screen">
        <div className="page-padding max-w-[1280px] mx-auto py-12">
          {/* Section header */}
          <div className="flex items-end justify-between mb-8">
            <div>
              <h1 className="text-[22px] font-semibold text-[var(--text)] tracking-[-0.01em]">
                Pomodoro Library
              </h1>
              <p className="text-[13px] text-[var(--text-muted)] mt-1">
                {TIMER_PRESETS.length} timers — pick one to start a session
              </p>
            </div>
          </div>

          {/* Timer grid */}
          <TimerGrid
            presets={TIMER_PRESETS}
            onSessionUpdate={handleSessionUpdate}
          />
        </div>
      </main>
    </>
  );
}
