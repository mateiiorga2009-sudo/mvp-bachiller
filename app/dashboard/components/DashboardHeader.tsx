export default function DashboardHeader() {
  return (
    <header className="rounded-3xl border border-white/15 bg-gradient-to-br from-white/10 via-white/5 to-transparent p-6 shadow-2xl">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-white/60">
            Dashboard
          </p>
          <h1 className="mt-3 text-3xl font-semibold md:text-4xl">
            Control total de tu crecimiento
          </h1>
          <p className="mt-2 text-sm text-white/70">
            Revisa tus métricas clave y genera ideas virales con un click.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <button className="rounded-2xl border border-white/20 bg-white/5 px-6 py-3 text-sm text-white/80 transition hover:border-white/40">
            Ver informe semanal
          </button>
          <button className="rounded-2xl bg-gradient-to-r from-cyan-400 via-sky-500 to-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-xl transition hover:scale-[1.02]">
            Generar clips virales
          </button>
        </div>
      </div>
    </header>
  );
}
