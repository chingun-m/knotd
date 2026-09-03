import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { TIMER_PRESETS } from "@/lib/timers";
import { FullTimer } from "@/components/timers/FullTimer";
import { SessionProgressBar } from "@/components/layout/SessionProgressBar";

interface TimerPageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return TIMER_PRESETS.map((t) => ({ id: t.id }));
}

export default async function TimerPage({ params }: TimerPageProps) {
  const { id } = await params;
  const preset = TIMER_PRESETS.find((t) => t.id === id);

  if (!preset) notFound();

  return (
    <div className="min-h-screen bg-[#0E0F11] flex flex-col">
      {/* Minimal top bar — just back link and wordmark */}
      <header className="fixed top-0 left-0 right-0 z-50 h-[52px] border-b border-[var(--border-hex)] bg-[#0E0F11]">
        <div className="page-padding flex h-full max-w-[1280px] mx-auto items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-[13px] text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Library</span>
          </Link>

          <span className="text-[16px] font-semibold tracking-[-0.02em] text-[var(--text)] select-none">
            knotd
          </span>

          {/* Spacer to keep wordmark centered */}
          <div className="w-[60px]" />
        </div>
      </header>

      {/* Full timer — vertically centered in remaining space */}
      <main className="flex-1 flex flex-col pt-[52px]">
        <FullTimer preset={preset} />
      </main>
    </div>
  );
}
