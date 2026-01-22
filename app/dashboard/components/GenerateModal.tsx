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
      setError("No pudimos registrar tu acción. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-6">
      <div
        className={`absolute inset-0 bg-black/70 backdrop-blur-sm ${
          isClosing ? "animate-modal-out" : "animate-modal-in"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        className={`relative z-10 w-full max-w-xl rounded-3xl border border-white/20 bg-white/10 p-6 shadow-2xl backdrop-blur-xl ${
          isClosing ? "animate-modal-out" : "animate-modal-in"
        }`}
      >
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-white/60">
              Generación rápida
            </p>
            <h3 className="mt-3 text-2xl font-semibold">
              Genera clips virales en segundos
            </h3>
            <p className="mt-2 text-sm text-white/70">
              Pega un enlace y obtiene ideas listas para publicar.
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-full border border-white/20 px-3 py-1 text-xs text-white/70 transition hover:border-white/40 hover:text-white"
            aria-label="Cerrar modal"
          >
            Cerrar
          </button>
        </div>

        <div className="mt-6 space-y-4">
          <label className="text-sm text-white/80">
            Enlace de YouTube o TikTok
          </label>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <input
              type="text"
              value={url}
              onChange={(event) => setUrl(event.target.value)}
              placeholder="https://www.youtube.com/watch?v=..."
              className="w-full flex-1 rounded-2xl border border-white/20 bg-black/30 px-4 py-3 text-sm text-white placeholder:text-white/50 focus:border-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-300/40"
            />
            <label className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/5 px-4 py-3 text-sm text-white/80 transition hover:border-white/40 sm:w-auto">
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
            <p className="text-xs text-white/70">
              Video seleccionado: {videoFile.name}
            </p>
          )}
          {error && <p className="text-xs text-amber-200">{error}</p>}
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
              className="w-full rounded-2xl border border-white/20 bg-white/5 px-6 py-3 text-sm text-white/80 transition hover:border-white/40"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
