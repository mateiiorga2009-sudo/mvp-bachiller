"use client";

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
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-6">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="relative z-10 w-full max-w-xl rounded-3xl border border-white/20 bg-white/10 p-6 shadow-2xl backdrop-blur-xl">
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
          <input
            type="text"
            placeholder="https://www.youtube.com/watch?v=..."
            className="w-full rounded-2xl border border-white/20 bg-black/30 px-4 py-3 text-sm text-white placeholder:text-white/50 focus:border-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-300/40"
          />
          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              onClick={onGoToGenerate}
              className="w-full rounded-2xl bg-gradient-to-r from-cyan-400 via-sky-500 to-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-xl transition hover:scale-[1.02]"
            >
              Generar clips virales
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
