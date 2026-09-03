export type TimerCategory =
  | "classic"
  | "deep-work"
  | "sprint"
  | "recovery"
  | "custom";

export interface TimerPreset {
  id: string;
  name: string;
  description: string;
  workMinutes: number;
  breakMinutes: number;
  rounds: number;
  category: TimerCategory;
  /** Relative visual weight in the grid: 1 = normal, 2 = wide */
  weight: 1 | 2;
}

export const TIMER_PRESETS: TimerPreset[] = [
  {
    id: "classic",
    name: "Classic",
    description: "The original Pomodoro. Reliable, battle-tested.",
    workMinutes: 25,
    breakMinutes: 5,
    rounds: 4,
    category: "classic",
    weight: 1,
  },
  {
    id: "deep-work",
    name: "Deep Work",
    description: "Extended focus blocks for complex, demanding tasks.",
    workMinutes: 52,
    breakMinutes: 17,
    rounds: 3,
    category: "deep-work",
    weight: 2,
  },
  {
    id: "sprint",
    name: "Sprint",
    description: "Short bursts. Good for admin, email, and quick tasks.",
    workMinutes: 15,
    breakMinutes: 3,
    rounds: 6,
    category: "sprint",
    weight: 1,
  },
  {
    id: "flow-state",
    name: "Flow State",
    description: "Longer uninterrupted work with a generous recovery window.",
    workMinutes: 90,
    breakMinutes: 20,
    rounds: 2,
    category: "deep-work",
    weight: 2,
  },
  {
    id: "ultradian",
    name: "Ultradian",
    description: "Follows your brain's natural 90-minute rhythm cycle.",
    workMinutes: 90,
    breakMinutes: 30,
    rounds: 2,
    category: "recovery",
    weight: 1,
  },
  {
    id: "micro",
    name: "Micro",
    description: "Tiny sessions to build momentum when motivation is low.",
    workMinutes: 10,
    breakMinutes: 2,
    rounds: 8,
    category: "sprint",
    weight: 1,
  },
  {
    id: "author",
    name: "Author",
    description: "Structured for writing. Long focus, moderate breaks.",
    workMinutes: 45,
    breakMinutes: 10,
    rounds: 3,
    category: "classic",
    weight: 1,
  },
  {
    id: "study",
    name: "Study Block",
    description: "Spaced repetition friendly. Optimized for retention.",
    workMinutes: 30,
    breakMinutes: 10,
    rounds: 4,
    category: "classic",
    weight: 2,
  },
];
