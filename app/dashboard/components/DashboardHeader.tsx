type DashboardHeaderProps = {
  onGenerate: () => void;
  onViewReport: () => void;
  hasConnectedChannel: boolean;
};

export default function DashboardHeader({
  onGenerate,
  onViewReport,
  hasConnectedChannel
}: DashboardHeaderProps) {
  return (
    <header className="rounded-3xl border border-slate-200/80 bg-gradient-to-br from-white via-white/80 to-white/60 p-6 shadow-2xl dark:border-white/15 dark:from-white/10 dark:via-white/5 dark:to-transparent">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-slate-500 dark:text-white/60">
            Dashboard
          </p>
          <h1 className="mt-3 text-3xl font-semibold text-slate-900 md:text-4xl dark:text-white">
            Control total de tu crecimiento
          </h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-white/70">
            Revisa tus métricas clave y genera ideas virales con un click.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            onClick={onViewReport}
            className="rounded-2xl border border-slate-200/80 bg-white px-6 py-3 text-sm text-slate-700 transition hover:border-slate-300 dark:border-white/20 dark:bg-white/5 dark:text-white/80 dark:hover:border-white/40"
          >
            Ver informe semanal
          </button>
          <button
            onClick={onGenerate}
            disabled={!hasConnectedChannel}
            className="rounded-2xl bg-gradient-to-r from-cyan-400 via-sky-500 to-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-xl transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
          >
            Subir vídeo para generar clips
          </button>
        </div>
      </div>
      {!hasConnectedChannel && (
        <p className="mt-4 text-xs text-slate-600 dark:text-white/60">
          Conecta al menos un canal para generar y publicar clips
          automáticamente.
        </p>
      )}
    </header>
  );
}
