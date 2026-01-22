"use client";

import { useState } from "react";

type GenerateClientProps = {
  onSuccess?: () => void;
};

export default function GenerateClient({ onSuccess }: GenerateClientProps) {
  const [url, setUrl] = useState("");
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!url.trim() && !videoFile) {
      setError("Pega un enlace o sube un video para continuar.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/events/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url })
      });

      if (!response.ok) {
        throw new Error("No se pudo registrar la acción.");
      }

      setUrl("");
      setVideoFile(null);
      onSuccess?.();
    } catch (err) {
      setError("No pudimos registrar tu acción. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-3xl border border-slate-200/80 bg-white/90 p-6 shadow-2xl backdrop-blur dark:border-white/20 dark:bg-white/10">
      <label className="text-sm text-slate-700 dark:text-white/80">
        Enlace de YouTube o TikTok
      </label>
      <div className="mt-2 flex flex-col gap-3 lg:flex-row lg:items-center">
        <input
          value={url}
          onChange={(event) => setUrl(event.target.value)}
          type="text"
          placeholder="https://www.youtube.com/watch?v=..."
          className="w-full flex-1 rounded-2xl border border-slate-200/80 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-300 focus:outline-none focus:ring-2 focus:ring-cyan-300/40 dark:border-white/20 dark:bg-black/30 dark:text-white dark:placeholder:text-white/50 dark:focus:border-white/50"
        />
        <label className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl border border-slate-200/80 bg-white px-4 py-3 text-sm text-slate-700 transition hover:border-slate-300 dark:border-white/20 dark:bg-white/5 dark:text-white/80 dark:hover:border-white/40 lg:w-auto">
          <input
            type="file"
            accept="video/*"
            className="hidden"
            onChange={(event) => {
              const file = event.target.files?.[0] ?? null;
              setVideoFile(file);
            }}
          />
          Subir video
        </label>
      </div>
      {videoFile && (
        <p className="mt-2 text-xs text-slate-600 dark:text-white/70">
          Video seleccionado: {videoFile.name}
        </p>
      )}
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="mt-4 w-full rounded-2xl bg-gradient-to-r from-cyan-400 via-sky-500 to-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-xl transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-70"
      >
        {loading ? "Registrando..." : "Generar clips virales"}
      </button>
      {error && <p className="mt-3 text-xs text-amber-600 dark:text-amber-200">{error}</p>}
    </div>
  );
}
