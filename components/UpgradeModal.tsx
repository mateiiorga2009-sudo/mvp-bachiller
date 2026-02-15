"use client";

type UpgradeModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onUpgrade: () => void;
};

export default function UpgradeModal({
  isOpen,
  onClose,
  onUpgrade
}: UpgradeModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-6">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="relative z-10 w-full max-w-lg rounded-3xl border border-white/20 bg-white/10 p-6 shadow-2xl backdrop-blur-xl">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-white/60">
              Viralify Pro
            </p>
            <h3 className="mt-3 text-2xl font-semibold text-white">
              Esta función es Pro
            </h3>
            <p className="mt-2 text-sm text-white/70">
              Desbloquea publicación automática, clips ilimitados y badge Pro
              visible en tu panel.
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

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <button
            onClick={onUpgrade}
            className="w-full rounded-2xl bg-gradient-to-r from-cyan-400 via-sky-500 to-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-xl transition hover:scale-[1.02]"
          >
            Sube a Pro ahora
          </button>
          <button
            onClick={onClose}
            className="w-full rounded-2xl border border-white/20 bg-white/10 px-6 py-3 text-sm text-white/80 transition hover:border-white/40"
          >
            Seguir como Free
          </button>
        </div>
      </div>
    </div>
  );
}
