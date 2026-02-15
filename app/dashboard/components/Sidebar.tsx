"use client";

import LogoutButton from "./LogoutButton";
import ThemeToggle from "@/components/ThemeToggle";

type SidebarProps = {
  userName: string;
  userEmail: string;
  onNavigate: (path: string) => void;
  onGenerate: () => void;
  hasConnectedChannel: boolean;
  isPro: boolean;
};

const navItems = [
  { label: "Panel general", href: "/dashboard" },
  { label: "Momentos virales", href: "/generate" },
  { label: "Clips", href: "/clips" },
  { label: "Biblioteca", href: "/library" },
  { label: "Automatizaciones", href: "/generate" }
];

export default function Sidebar({
  userName,
  userEmail,
  onNavigate,
  onGenerate,
  hasConnectedChannel,
  isPro
}: SidebarProps) {
  return (
    <aside className="flex w-full flex-col gap-6 rounded-3xl border border-slate-200/80 bg-white/90 p-6 shadow-2xl backdrop-blur dark:border-white/15 dark:bg-white/10 lg:w-72 lg:sticky lg:top-8 lg:h-[calc(100vh-6rem)]">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.5em] text-slate-900 dark:text-white dark:drop-shadow-[0_0_12px_rgba(56,189,248,0.45)]">
            Viralify
          </p>
          <div className="mt-2 flex items-center gap-2">
            <p className="text-lg font-semibold text-slate-900 dark:text-white">
              {userName}
            </p>
            {isPro && (
              <span className="rounded-full bg-indigo-500 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white">
                Pro
              </span>
            )}
          </div>
          <p className="text-xs text-slate-600 dark:text-white/60">
            {userEmail}
          </p>
        </div>
        <div className="h-11 w-11 rounded-2xl border border-slate-200/80 bg-slate-100 dark:border-white/20 dark:bg-gradient-to-br dark:from-cyan-400/30 dark:to-indigo-500/30" />
      </div>

      <ThemeToggle />

      <nav aria-label="Navegación principal" className="space-y-2">
        {navItems.map((item, index) => (
          <button
            key={item.label}
            aria-current={index === 0 ? "page" : undefined}
            onClick={() => onNavigate(item.href)}
            className={`w-full rounded-2xl px-4 py-3 text-left text-sm transition ${
              index === 0
                ? "bg-slate-900/5 text-slate-900 shadow-lg dark:bg-white/15 dark:text-white"
                : "text-slate-600 hover:bg-slate-900/5 hover:text-slate-900 dark:text-white/70 dark:hover:bg-white/10 dark:hover:text-white"
            }`}
          >
            {item.label}
          </button>
        ))}
      </nav>

      <div className="mt-auto space-y-3">
        <button
          onClick={onGenerate}
          disabled={!hasConnectedChannel}
          className="w-full rounded-2xl bg-gradient-to-r from-cyan-400 via-sky-500 to-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-lg transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
        >
          Subir vídeo para generar clips
        </button>
        {!hasConnectedChannel && (
          <p className="text-xs text-slate-600 dark:text-white/60">
            Conecta al menos un canal para generar y publicar clips
            automáticamente.
          </p>
        )}
        <LogoutButton />
      </div>
    </aside>
  );
}
