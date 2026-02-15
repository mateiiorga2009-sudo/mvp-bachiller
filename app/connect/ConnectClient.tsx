"use client";

import { useEffect, useState } from "react";

export default function ConnectClient() {
  const [status, setStatus] = useState("");
  const [hasConnectedChannel, setHasConnectedChannel] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem("hasConnectedChannel");
    setHasConnectedChannel(stored === "true");
  }, []);

  const handleConnect = (platform: string) => {
    window.localStorage.setItem("hasConnectedChannel", "true");
    setHasConnectedChannel(true);
    setStatus(`${platform} conectado (simulado).`);
  };

  return (
    <div className="space-y-8">
      <div className="rounded-2xl border border-slate-200/80 bg-white/90 p-6 shadow-lg backdrop-blur-xl dark:border-white/20 dark:bg-white/10">
        <p className="text-xs uppercase tracking-[0.35em] text-slate-500 dark:text-white/60">
          Integraciones
        </p>
        <h2 className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">
          Conecta tus canales principales
        </h2>
        <p className="mt-2 text-sm text-slate-600 dark:text-white/70">
          Autoriza YouTube o TikTok para activar el flujo automático de clips.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {[
          { name: "YouTube", icon: "▶️" },
          { name: "TikTok", icon: "🎵" }
        ].map((channel) => (
          <div
            key={channel.name}
            className="group rounded-2xl border border-slate-200/80 bg-white/90 p-6 shadow-lg backdrop-blur-xl transition hover:-translate-y-1 hover:shadow-2xl dark:border-white/20 dark:bg-white/10"
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
                    {hasConnectedChannel ? "Conectado" : "No conectado"}
                  </p>
                </div>
              </div>
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  hasConnectedChannel
                    ? "bg-emerald-500/20 text-emerald-700 dark:text-emerald-200"
                    : "bg-slate-100 text-slate-500 dark:bg-white/10 dark:text-white/60"
                }`}
              >
                {hasConnectedChannel ? "Activo" : "Pendiente"}
              </span>
            </div>
            <p className="mt-4 text-sm text-slate-600 dark:text-white/70">
              {hasConnectedChannel
                ? "Gestiona permisos y sincronización cuando lo necesites."
                : "Conecta para habilitar análisis y publicación automática."}
            </p>
            <button
              onClick={() => handleConnect(channel.name)}
              className="mt-6 w-full rounded-2xl border border-slate-200/80 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 dark:border-white/20 dark:bg-white/10 dark:text-white dark:hover:border-white/40 dark:hover:bg-white/20"
            >
              {hasConnectedChannel ? "Gestionar" : "Conectar"}
            </button>
          </div>
        ))}
      </div>

      {status && (
        <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-700 dark:text-emerald-200">
          {status}
        </div>
      )}
    </div>
  );
}
