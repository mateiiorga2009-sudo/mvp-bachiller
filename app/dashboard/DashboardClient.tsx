"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import DashboardHeader from "./components/DashboardHeader";
import GenerateModal from "./components/GenerateModal";
import PerformanceChart from "./components/PerformanceChart";
import PrimaryCta from "./components/PrimaryCta";
import QuickActions from "./components/QuickActions";
import Sidebar from "./components/Sidebar";
import StatsGrid from "./components/StatsGrid";

type DashboardClientProps = {
  userName: string;
  userEmail: string;
  stats: { label: string; value: string; trend: string }[];
  performance: number[];
};

export default function DashboardClient({
  userName,
  userEmail,
  stats,
  performance
}: DashboardClientProps) {
  const router = useRouter();
  const [isGenerateOpen, setIsGenerateOpen] = useState(false);
  const [hasConnectedChannel, setHasConnectedChannel] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem("hasConnectedChannel");
    setHasConnectedChannel(stored === "true");
  }, []);

  const actions = [
    { title: "Analizar nuevo video", desc: "Pega un link y detecta clips." },
    { title: "Generar hooks", desc: "Ideas listas para publicar." },
    { title: "Optimizar título", desc: "Mejora CTR en segundos." }
  ];

  const navigate = (path: string) => {
    router.push(path);
  };

  return (
    <div className="flex min-h-[80vh] flex-col gap-6 px-6 py-8 sm:gap-10 sm:px-8 lg:flex-row lg:px-12 lg:py-10">
      <Sidebar
        userName={userName}
        userEmail={userEmail}
        onNavigate={navigate}
        onGenerate={() => hasConnectedChannel && setIsGenerateOpen(true)}
        hasConnectedChannel={hasConnectedChannel}
      />

      <main className="flex-1 space-y-8 lg:pt-2 animate-panel-in">
        <section className="rounded-3xl border border-slate-200/80 bg-white/90 p-6 shadow-2xl backdrop-blur dark:border-white/15 dark:bg-white/10">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-slate-500 dark:text-white/60">
                Canales conectados
              </p>
              <h2 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">
                Conecta tus canales para activar el flujo viral
              </h2>
              <p className="mt-2 text-sm text-slate-600 dark:text-white/70">
                {hasConnectedChannel
                  ? "Tienes al menos un canal conectado (simulado)."
                  : "Conecta al menos un canal para generar y publicar clips automáticamente."}
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                onClick={() => navigate("/connect")}
                className="rounded-2xl border border-slate-200/80 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 dark:border-white/20 dark:bg-white/5 dark:text-white/80 dark:hover:border-white/40"
              >
                Conectar YouTube
              </button>
              <button
                onClick={() => navigate("/connect")}
                className="rounded-2xl border border-slate-200/80 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 dark:border-white/20 dark:bg-white/5 dark:text-white/80 dark:hover:border-white/40"
              >
                Conectar TikTok
              </button>
            </div>
          </div>
        </section>

        <DashboardHeader
          onGenerate={() => hasConnectedChannel && setIsGenerateOpen(true)}
          onViewReport={() => navigate("/library")}
          hasConnectedChannel={hasConnectedChannel}
        />
        <StatsGrid stats={stats} />

        <section className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
          <PerformanceChart values={performance} />
          <QuickActions
            actions={actions}
            onActionSelect={() => navigate("/generate")}
          />
        </section>

        <PrimaryCta onConnect={() => navigate("/connect")} />
      </main>

      <GenerateModal
        isOpen={isGenerateOpen}
        onClose={() => setIsGenerateOpen(false)}
        onGoToGenerate={() => navigate("/generate")}
      />
    </div>
  );
}
