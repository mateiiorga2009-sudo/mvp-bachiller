"use client";

type UpgradeModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onUpgrade: () => void;
  isLoading?: boolean;
  error?: string;
};

export default function UpgradeModal({
  isOpen,
  onClose,
  onUpgrade,
  isLoading = false,
  error
}: UpgradeModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-6">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="relative z-10 w-full max-w-3xl rounded-3xl border border-indigo-400/40 bg-gradient-to-br from-white/10 via-white/5 to-transparent p-8 shadow-2xl ring-1 ring-indigo-400/30 backdrop-blur-xl">
        <div className="flex items-start justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-white/60">
              Comparativa Free vs Pro
            </p>
            <h3 className="mt-3 text-3xl font-semibold text-white">
              Esta función es Pro
            </h3>
            <p className="mt-2 text-sm text-white/70">
              Desbloquea automatización completa, clips ilimitados y el badge
              Pro visible en tu panel.
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

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-white/20 bg-white/10 p-6 shadow-lg backdrop-blur-xl">
            <h4 className="text-lg font-semibold text-white">Free</h4>
            <ol className="mt-4 space-y-3 text-sm text-white/75">
              <li className="flex items-start gap-3">
                <span>1.</span>
                <span>Subir hasta 3 vídeos al mes</span>
              </li>
              <li className="flex items-start gap-3">
                <span>2.</span>
                <span>Watermark activado</span>
              </li>
              <li className="flex items-start gap-3">
                <span>3.</span>
                <span>Publicación manual</span>
              </li>
            </ol>
          </div>

          <div className="rounded-2xl border border-indigo-400/40 bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-sky-500/20 p-6 shadow-lg ring-1 ring-indigo-400/30 backdrop-blur-xl">
            <div className="flex items-center justify-between">
              <h4 className="text-lg font-semibold text-white">Pro</h4>
              <span className="rounded-full bg-indigo-500 px-2 py-1 text-xs font-semibold text-white">
                Recomendado
              </span>
            </div>
            <ol className="mt-4 space-y-3 text-sm text-white/85">
              <li className="flex items-start gap-3">
                <span>1.</span>
                <span>Clips ilimitados</span>
              </li>
              <li className="flex items-start gap-3">
                <span>2.</span>
                <span>Sin watermark</span>
              </li>
              <li className="flex items-start gap-3">
                <span>3.</span>
                <span>Publicación automática</span>
              </li>
              <li className="flex items-start gap-3">
                <span>4.</span>
                <span>Badge Pro visible</span>
              </li>
            </ol>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <button
            onClick={onUpgrade}
            disabled={isLoading}
            className="w-full rounded-2xl bg-gradient-to-r from-cyan-400 via-sky-500 to-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-xl transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isLoading ? "Redirigiendo..." : "Confirmar upgrade"}
          </button>
          <button
            onClick={onClose}
            className="w-full rounded-2xl border border-white/20 bg-white/10 px-6 py-3 text-sm text-white/80 transition hover:border-white/40"
          >
            Seguir como Free
          </button>
        </div>
        {error && (
          <p className="mt-4 text-xs text-amber-200">{error}</p>
        )}
      </div>
    </div>
  );
}
