export default function DashboardHeader() {
  return (
    <header className="rounded-3xl border border-slate-200/80 bg-white/90 p-6 shadow-2xl backdrop-blur-xl dark:border-white/20 dark:bg-white/10">
      <p className="text-xs uppercase tracking-[0.35em] text-slate-500 dark:text-white/60">
        Dashboard
      </p>
      <h1 className="mt-3 text-3xl font-semibold text-slate-900 md:text-4xl dark:text-white">
        Control total de tu crecimiento
      </h1>
      <p className="mt-2 text-sm text-slate-600 dark:text-white/70">
        Todo lo que necesitas para convertir videos en clips virales listos para
        publicar.
      </p>
    </header>
  );
}
