"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/", label: "Timers" },
  { href: "/todos", label: "To-do" },
  { href: "/settings", label: "Settings" },
];

interface TopRailProps {
  isSessionActive?: boolean;
}

export function TopRail({ isSessionActive = false }: TopRailProps) {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-[52px] border-b border-[var(--border-hex)] bg-[#0E0F11]">
      <div className="page-padding flex h-full max-w-[1280px] mx-auto items-center justify-between">
        {/* Wordmark */}
        <span className="text-[16px] font-semibold tracking-[-0.02em] text-[var(--text)] select-none">
          knotd
        </span>

        {/* Nav */}
        <nav className="flex items-center gap-6">
          {NAV_LINKS.map(({ href, label }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "relative text-[15px] transition-colors duration-150",
                  isActive
                    ? "text-[var(--text)]"
                    : "text-[var(--text-muted)] hover:text-[var(--text)]",
                )}
              >
                {label}
                {isActive && (
                  <span className="absolute -bottom-[17px] left-0 right-0 h-[2px] bg-[var(--accent-hex)]" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Session status dot */}
        <div className="flex items-center gap-2">
          <span
            className={cn(
              "h-2 w-2 rounded-full transition-colors duration-300",
              isSessionActive
                ? "bg-[var(--accent-hex)] shadow-[0_0_6px_var(--accent-hex)]"
                : "bg-[var(--border-hex)]",
            )}
          />
          <span className="text-[11px] text-[var(--text-muted)] hidden sm:block">
            {isSessionActive ? "Session active" : "Idle"}
          </span>
        </div>
      </div>
    </header>
  );
}
