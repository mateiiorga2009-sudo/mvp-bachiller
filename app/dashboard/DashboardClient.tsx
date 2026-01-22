"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
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
        onGenerate={() => setIsGenerateOpen(true)}
      />

      <main className="flex-1 space-y-8 lg:pt-2 animate-panel-in">
        <DashboardHeader
          onGenerate={() => setIsGenerateOpen(true)}
          onViewReport={() => navigate("/library")}
        />
        <StatsGrid stats={stats} />

        <section className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
          <PerformanceChart values={performance} />
          <QuickActions
            actions={actions}
            onActionSelect={() => navigate("/generate")}
          />
        </section>

        <PrimaryCta onConnect={() => navigate("/generate")} />
      </main>

      <GenerateModal
        isOpen={isGenerateOpen}
        onClose={() => setIsGenerateOpen(false)}
        onGoToGenerate={() => navigate("/generate")}
      />
    </div>
  );
}
