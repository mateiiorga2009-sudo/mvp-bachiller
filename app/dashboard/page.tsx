import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth-options";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const navItems = [
    "Panel general",
    "Momentos virales",
    "Clips y títulos",
    "Biblioteca",
    "Automatizaciones"
  ];

  const stats = [
    { label: "Retención promedio", value: "62%", trend: "+6%" },
    { label: "CTR estimado", value: "7.4%", trend: "+1.2%" },
    { label: "Clips sugeridos", value: "18", trend: "+4" },
    { label: "Tiempo ahorrado", value: "6.3h", trend: "+2.1h" }
  ];

  const actions = [
    { title: "Analizar nuevo video", desc: "Pega un link y detecta clips." },
    { title: "Generar hooks", desc: "Ideas listas para publicar." },
    { title: "Optimizar título", desc: "Mejora CTR en segundos." }
  ];

  return (
    <div className="flex min-h-[80vh] flex-col gap-8 lg:flex-row">
      <aside className="flex w-full flex-col gap-6 rounded-3xl border border-white/15 bg-white/10 p-6 shadow-2xl backdrop-blur lg:w-72 lg:sticky lg:top-8 lg:h-[calc(100vh-6rem)]">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-white/60">
              Viralify
            </p>
            <p className="mt-2 text-lg font-semibold">
              {session.user?.name ?? "Creador"}
            </p>
            <p className="text-xs text-white/60">
              {session.user?.email ?? "creador@viralify.com"}
            </p>
          </div>
          <div className="h-11 w-11 rounded-2xl border border-white/20 bg-gradient-to-br from-cyan-400/30 to-indigo-500/30" />
        </div>

        <nav aria-label="Navegación principal" className="space-y-2">
          {navItems.map((item, index) => (
            <button
              key={item}
              className={`w-full rounded-2xl px-4 py-3 text-left text-sm transition ${
                index === 0
                  ? "bg-white/15 text-white shadow-lg"
                  : "text-white/70 hover:bg-white/10 hover:text-white"
              }`}
            >
              {item}
            </button>
          ))}
        </nav>

        <div className="mt-auto space-y-3">
          <button className="w-full rounded-2xl bg-gradient-to-r from-cyan-400 via-sky-500 to-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-lg transition hover:scale-[1.02]">
            Nuevo análisis
          </button>
          <Link
            href="/api/auth/signout"
            className="block w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-center text-sm text-white/70 transition hover:border-white/30 hover:text-white"
          >
            Cerrar sesión
          </Link>
        </div>
      </aside>

      <main className="flex-1 space-y-8">
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

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-3xl border border-white/20 bg-white/10 p-5 shadow-xl backdrop-blur-xl transition hover:-translate-y-1 hover:shadow-2xl"
            >
              <p className="text-xs uppercase tracking-widest text-white/60">
                {stat.label}
              </p>
              <p className="mt-3 text-3xl font-semibold">{stat.value}</p>
              <p className="mt-2 text-xs text-emerald-300">
                {stat.trend} esta semana
              </p>
            </div>
          ))}
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
          <div className="rounded-3xl border border-white/20 bg-white/10 p-6 shadow-2xl backdrop-blur-xl">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Tendencia de rendimiento</h2>
              <span className="text-xs text-white/60">Últimos 7 días</span>
            </div>
            <div className="mt-6 grid grid-cols-7 gap-3">
              {[32, 45, 38, 52, 60, 48, 70].map((value, index) => (
                <div
                  key={`${value}-${index}`}
                  className="flex flex-col items-center gap-2"
                >
                  <div
                    className="w-full rounded-full bg-gradient-to-t from-cyan-500/30 to-indigo-500/60"
                    style={{ height: `${value}%` }}
                  />
                  <span className="text-[10px] text-white/50">D{index + 1}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-white/20 bg-white/10 p-6 shadow-2xl backdrop-blur-xl">
            <h2 className="text-lg font-semibold">Acciones rápidas</h2>
            <div className="mt-4 space-y-4">
              {actions.map((action) => (
                <button
                  key={action.title}
                  className="w-full rounded-2xl border border-white/15 bg-black/20 px-4 py-4 text-left transition hover:border-white/30 hover:bg-black/30"
                >
                  <p className="text-sm font-semibold">{action.title}</p>
                  <p className="mt-1 text-xs text-white/60">{action.desc}</p>
                </button>
              ))}
            </div>
          </div>
        </section>

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
      </main>
    </div>
  );
}
