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
import UpgradeModal from "@/components/UpgradeModal";

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
  const [isUpgradeOpen, setIsUpgradeOpen] = useState(false);
  const [hasConnectedChannel, setHasConnectedChannel] = useState(false);
  const [isPro, setIsPro] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem("hasConnectedChannel");
    setHasConnectedChannel(stored === "true");
    const proStored = window.localStorage.getItem("isPro");
    setIsPro(proStored === "true");
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
        isPro={isPro}
      />

      <main className="flex-1 space-y-8 lg:pt-2 animate-panel-in">
        <DashboardHeader />

        <section className="space-y-6">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-slate-500 dark:text-white/60">
              Canales conectados
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">
              Conecta tu canal para publicar clips automáticamente
            </h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {[
              { name: "YouTube", icon: "▶️" },
              { name: "TikTok", icon: "🎵" }
            ].map((channel) => {
              const isConnected = hasConnectedChannel;
              return (
                <div
                  key={channel.name}
                  className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white/90 p-6 shadow-lg backdrop-blur-xl transition hover:-translate-y-1 hover:shadow-2xl dark:border-white/20 dark:bg-white/10"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-slate-200/80 bg-slate-50 text-2xl dark:border-white/20 dark:bg-white/10">
                        {channel.icon}
                      </div>
                      <div>
                        <p className="text-sm uppercase tracking-[0.3em] text-slate-500 dark:text-white/60">
                          {channel.name}
                        </p>
                        <p className="mt-1 text-lg font-semibold text-slate-900 dark:text-white">
                          {isConnected ? "Conectado" : "No conectado"}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        isConnected
                          ? "bg-emerald-500/20 text-emerald-700 dark:text-emerald-200"
                          : "bg-slate-100 text-slate-500 dark:bg-white/10 dark:text-white/60"
                      }`}
                    >
                      {isConnected ? "Activo" : "Pendiente"}
                    </span>
                  </div>
                  <p className="mt-4 text-sm text-slate-600 dark:text-white/70">
                    {isConnected
                      ? "Gestiona la sincronización y publicación automática."
                      : "Conecta para habilitar análisis y publicación directa."}
                  </p>
                  <button
                    onClick={() => navigate("/connect")}
                    className="mt-6 w-full rounded-2xl border border-slate-200/80 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 dark:border-white/20 dark:bg-white/10 dark:text-white dark:hover:border-white/40 dark:hover:bg-white/20"
                  >
                    {isConnected ? "Gestionar" : "Conectar"}
                  </button>
                </div>
              );
            })}
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white/90 p-8 shadow-2xl backdrop-blur-xl transition hover:-translate-y-1 hover:shadow-2xl dark:border-white/20 dark:bg-white/10">
            {!hasConnectedChannel && (
              <div className="absolute inset-0 z-10 flex items-center justify-center bg-slate-900/70 text-center text-sm text-white/90">
                Conecta un canal para activar esta función
              </div>
            )}
            <div className={hasConnectedChannel ? "" : "opacity-40"}>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-slate-500 dark:text-white/60">
                    Generación de clips
                  </p>
                  <h3 className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">
                    Genera clips optimizados para viralidad
                  </h3>
                  <p className="mt-2 text-sm text-slate-600 dark:text-white/70">
                    Sube un video y obtén recortes listos para publicar con
                    hooks y títulos recomendados.
                  </p>
                </div>
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-slate-200/80 bg-slate-50 text-2xl dark:border-white/20 dark:bg-white/10">
                  ✨
                </div>
              </div>
            <button
              onClick={() => hasConnectedChannel && setIsGenerateOpen(true)}
                disabled={!hasConnectedChannel}
                className="mt-6 w-full rounded-2xl bg-gradient-to-r from-cyan-400 via-sky-500 to-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-xl transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
              >
                Subir vídeo para generar clips
              </button>
              {!hasConnectedChannel && (
                <p className="mt-3 text-xs text-slate-600 dark:text-white/60">
                  Conecta al menos un canal para generar y publicar clips
                  automáticamente.
                </p>
              )}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200/80 bg-white/90 p-8 shadow-2xl backdrop-blur-xl transition hover:-translate-y-1 hover:shadow-2xl dark:border-white/20 dark:bg-white/10">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-slate-500 dark:text-white/60">
                  Publicación
                </p>
                <h3 className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">
                  Automatiza tus próximos lanzamientos
                </h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-white/70">
                  Define horarios, etiquetas y CTA para que cada clip salga en
                  el momento perfecto.
                </p>
              </div>
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-slate-200/80 bg-slate-50 text-2xl dark:border-white/20 dark:bg-white/10">
                🚀
              </div>
            </div>
            <button
              onClick={() => (isPro ? navigate("/library") : setIsUpgradeOpen(true))}
              className="mt-6 w-full rounded-2xl border border-slate-200/80 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 dark:border-white/20 dark:bg-white/10 dark:text-white dark:hover:border-white/40 dark:hover:bg-white/20"
            >
              Ver plan de publicación
            </button>
          </div>
        </section>
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
      <UpgradeModal
        isOpen={isUpgradeOpen}
        onClose={() => setIsUpgradeOpen(false)}
        onUpgrade={() => navigate("/pricing")}
      />
    </div>
  );
}
