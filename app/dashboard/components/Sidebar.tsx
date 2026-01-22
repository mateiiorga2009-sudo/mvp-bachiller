"use client";

import LogoutButton from "./LogoutButton";

type SidebarProps = {
  userName: string;
  userEmail: string;
  onNavigate: (path: string) => void;
  onGenerate: () => void;
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
  onGenerate
}: SidebarProps) {
  return (
    <aside className="flex w-full flex-col gap-6 rounded-3xl border border-white/15 bg-white/10 p-6 shadow-2xl backdrop-blur lg:w-72 lg:sticky lg:top-8 lg:h-[calc(100vh-6rem)]">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.5em] text-white drop-shadow-[0_0_12px_rgba(56,189,248,0.45)]">
            Viralify
          </p>
          <p className="mt-2 text-lg font-semibold">{userName}</p>
          <p className="text-xs text-white/60">{userEmail}</p>
        </div>
        <div className="h-11 w-11 rounded-2xl border border-white/20 bg-gradient-to-br from-cyan-400/30 to-indigo-500/30" />
      </div>

      <nav aria-label="Navegación principal" className="space-y-2">
        {navItems.map((item, index) => (
          <button
            key={item.label}
            aria-current={index === 0 ? "page" : undefined}
            onClick={() => onNavigate(item.href)}
            className={`w-full rounded-2xl px-4 py-3 text-left text-sm transition ${
              index === 0
                ? "bg-white/15 text-white shadow-lg"
                : "text-white/70 hover:bg-white/10 hover:text-white"
            }`}
          >
            {item.label}
          </button>
        ))}
      </nav>

      <div className="mt-auto space-y-3">
        <button
          onClick={onGenerate}
          className="w-full rounded-2xl bg-gradient-to-r from-cyan-400 via-sky-500 to-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-lg transition hover:scale-[1.02]"
        >
          Nuevo análisis
        </button>
        <LogoutButton />
      </div>
    </aside>
  );
}
