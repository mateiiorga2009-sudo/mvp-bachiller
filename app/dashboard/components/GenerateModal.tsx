"use client";

import { useEffect, useState } from "react";

type GenerateModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onGoToGenerate: () => void;
};

export default function GenerateModal({
  isOpen,
  onClose,
  onGoToGenerate
}: GenerateModalProps) {
  const [url, setUrl] = useState("");
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [shouldRender, setShouldRender] = useState(isOpen);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      setIsClosing(false);
      return;
    }

    if (shouldRender) {
      setIsClosing(true);
      const timer = setTimeout(() => {
        setShouldRender(false);
        setIsClosing(false);
      }, 220);
      return () => clearTimeout(timer);
    }
  }, [isOpen, shouldRender]);

  if (!shouldRender) return null;

  const handleGenerate = async () => {
    if (!url.trim() && !videoFile) {
      setError("Pega un enlace o sube un video para continuar.");
      return;
    }
    if (url.trim() && !url.includes("http")) {
      setError("No se pudo generar el clip: enlace inválido.");
      return;
    }
    if (videoFile && !videoFile.type.startsWith("video/")) {
      setError("Error al subir el video: formato no soportado.");
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

      setVideoFile(null);
      onGoToGenerate();
    } catch (err) {
      setError("Error de conexión, inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 sm:px-6">
      <div
        className={`absolute inset-0 bg-black/70 backdrop-blur-sm ${
          isClosing ? "animate-modal-out" : "animate-modal-in"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        className={`relative z-10 w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl border border-slate-200/80 bg-white/90 p-6 shadow-2xl backdrop-blur-xl dark:border-white/20 dark:bg-white/10 ${
          isClosing ? "animate-modal-out" : "animate-modal-in"
        }`}
      >
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-slate-500 dark:text-white/60">
              Generación rápida
            </p>
            <h3 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">
              Genera clips virales en segundos
            </h3>
            <p className="mt-2 text-sm text-slate-600 dark:text-white/70">
              Pega un enlace y obtiene ideas listas para publicar.
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-full border border-slate-200/80 px-3 py-1 text-xs text-slate-600 transition hover:border-slate-300 hover:text-slate-900 dark:border-white/20 dark:text-white/70 dark:hover:border-white/40 dark:hover:text-white"
            aria-label="Cerrar modal"
          >
            Cerrar
          </button>
        </div>

        <div className="mt-6 space-y-4">
          <label className="text-sm text-slate-700 dark:text-white/80">
            Enlace de YouTube o TikTok
          </label>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <input
              type="text"
              value={url}
              onChange={(event) => setUrl(event.target.value)}
              placeholder="https://www.youtube.com/watch?v=..."
              className="w-full flex-1 rounded-2xl border border-slate-200/80 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-300 focus:outline-none focus:ring-2 focus:ring-cyan-300/40 dark:border-white/20 dark:bg-black/30 dark:text-white dark:placeholder:text-white/50 dark:focus:border-white/50"
            />
            <label className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl border border-slate-200/80 bg-white px-4 py-3 text-sm text-slate-700 transition hover:border-slate-300 dark:border-white/20 dark:bg-white/5 dark:text-white/80 dark:hover:border-white/40 sm:w-auto">
              <input
                type="file"
                accept="video/*"
                className="hidden"
                onChange={(event) => {
                  const file = event.target.files?.[0] ?? null;
                  setVideoFile(file);
                  if (file && !file.type.startsWith("video/")) {
                    setError("Error al subir el video: formato no soportado.");
                  } else {
                    setError("");
                  }
                }}
              />
              Subir video
            </label>
          </div>
          {videoFile && (
            <p className="text-xs text-slate-600 dark:text-white/70">
              Video seleccionado: {videoFile.name}
            </p>
          )}
          {error && <p className="text-xs text-amber-600 dark:text-amber-200">{error}</p>}
          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              onClick={handleGenerate}
              disabled={loading}
              className="w-full rounded-2xl bg-gradient-to-r from-cyan-400 via-sky-500 to-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-xl transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? "Registrando..." : "Generar clips virales"}
            </button>
            <button
              onClick={onClose}
              className="w-full rounded-2xl border border-slate-200/80 bg-white px-6 py-3 text-sm text-slate-700 transition hover:border-slate-300 dark:border-white/20 dark:bg-white/5 dark:text-white/80 dark:hover:border-white/40"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
