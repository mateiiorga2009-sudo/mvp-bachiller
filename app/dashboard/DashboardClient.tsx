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
};

export default function DashboardClient({
  userName,
  userEmail
}: DashboardClientProps) {
  const router = useRouter();
  const [isGenerateOpen, setIsGenerateOpen] = useState(false);

  const stats = [
    { label: "Retención promedio", value: "62%", trend: "+6%" },
    { label: "CTR estimado", value: "7.4%", trend: "+1.2%" },
    { label: "Clips sugeridos", value: "18", trend: "+4" },
    { label: "Tiempo ahorrado", value: "6.3h", trend: "+2.1h" }
  ];

  const actions = [
    { title: "Analizar nuevo video", desc: "Pega un link y detecta clips." },
    { title: "Generar hooks", desc: "Ideas listas para publicar." },
    { title: "Optimizar título", desc: "Mejora CTR en segundos." }
  ];

  const performance = [32, 45, 38, 52, 60, 48, 70];

  const navigate = (path: string) => {
    router.push(path);
  };

  return (
    <div className="flex min-h-[80vh] flex-col gap-8 lg:flex-row">
      <Sidebar
        userName={userName}
        userEmail={userEmail}
        onNavigate={navigate}
        onGenerate={() => setIsGenerateOpen(true)}
      />

      <main className="flex-1 space-y-8">
        <DashboardHeader
          onGenerate={() => setIsGenerateOpen(true)}
          onViewReport={() => navigate("/library")}
        />
        <StatsGrid stats={stats} />

        <section className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
          <PerformanceChart values={performance} />
          <QuickActions actions={actions} onActionSelect={() => navigate("/generate")} />
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
