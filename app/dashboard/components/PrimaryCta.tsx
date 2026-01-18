export default function PrimaryCta() {
  return (
    <section className="rounded-3xl border border-white/20 bg-gradient-to-r from-cyan-500/20 via-indigo-500/20 to-purple-500/20 p-6 shadow-2xl">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-2xl font-semibold">
            Activa tu flujo viral en minutos
          </h2>
          <p className="mt-2 text-sm text-white/70">
            Conecta tus canales y recibe clips listos para publicar.
          </p>
        </div>
        <button className="rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:scale-[1.02]">
          Conectar canales
        </button>
      </div>
    </section>
  );
}
