"use client";

interface TimerRingProps {
  /** 0–1 */
  progress: number;
  size?: number;
  strokeWidth?: number;
  isBreak?: boolean;
}

export function TimerRing({
  progress,
  size = 220,
  strokeWidth = 3,
  isBreak = false,
}: TimerRingProps) {
  const radius = (size - strokeWidth * 2) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - progress);

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className="-rotate-90"
      aria-hidden="true"
    >
      {/* Track */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="var(--border-hex)"
        strokeWidth={strokeWidth}
      />
      {/* Progress */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={isBreak ? "var(--text-muted)" : "var(--accent-hex)"}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        className="transition-[stroke-dashoffset] duration-1000 linear"
      />
    </svg>
  );
}
