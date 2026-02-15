"use client";

import { useState } from "react";

export default function ConnectClient() {
  const [status, setStatus] = useState("");

  const handleConnect = (platform: string) => {
    window.localStorage.setItem("hasConnectedChannel", "true");
    setStatus(`${platform} conectado (simulado).`);
  };

  return (
    <div className="rounded-3xl border border-slate-200/80 bg-white/90 p-6 shadow-2xl backdrop-blur dark:border-white/15 dark:bg-white/10">
      <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
        Conecta tus canales
      </h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-white/70">
        OAuth se configurará más adelante. Por ahora es una simulación UI.
      </p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <button
          onClick={() => handleConnect("YouTube")}
          className="rounded-2xl border border-slate-200/80 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 dark:border-white/20 dark:bg-white/5 dark:text-white/80 dark:hover:border-white/40"
        >
          Conectar YouTube
        </button>
        <button
          onClick={() => handleConnect("TikTok")}
          className="rounded-2xl border border-slate-200/80 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 dark:border-white/20 dark:bg-white/5 dark:text-white/80 dark:hover:border-white/40"
        >
          Conectar TikTok
        </button>
      </div>
      {status && (
        <p className="mt-4 text-sm text-emerald-600 dark:text-emerald-300">
          {status}
        </p>
      )}
    </div>
  );
}
