"use client";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Link from "next/link";

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  return (
    <section className="flex flex-1 flex-col gap-12">
      <nav className="flex items-center justify-between">
        <div className="text-sm font-semibold uppercase tracking-[0.35em] text-white/60">
          Viralify
        </div>
        <div className="text-lg font-semibold text-white/90">Viralify</div>
      </nav>

      <header className="space-y-6 text-center">
        <h1 className="text-4xl font-semibold leading-tight md:text-6xl">
          Detecta los mejores momentos de tus videos de YouTube y TikTok para
          maximizar su viralidad.
        </h1>
        <p className="mx-auto max-w-2xl text-base text-white/75 md:text-lg">
          Viralify analiza tu contenido y te sugiere títulos, hooks y
          descripciones que convierten más. Todo en un panel moderno pensado
          para creadores ambiciosos.
        </p>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/login"
            className="rounded-2xl bg-gradient-to-r from-sky-400 via-indigo-500 to-purple-500 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 transition hover:scale-[1.02]"
          >
            Iniciar sesión con Google
          </Link>
          {session ? (
            <Link
              href="/dashboard"
              className="rounded-2xl border border-white/30 bg-white/10 px-7 py-3 text-sm font-semibold text-white/90 transition hover:border-white/60 hover:bg-white/20"
            >
              Comenzar a crear clips virales
            </Link>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <button
                disabled
                className="cursor-not-allowed rounded-2xl border border-white/20 bg-white/5 px-7 py-3 text-sm font-semibold text-white/60"
              >
                Comenzar a crear clips virales
              </button>
              <span className="text-xs text-white/60">
                Inicia sesión para desbloquear el dashboard.
              </span>
            </div>
          )}
        </div>
      </header>

      <section className="grid gap-6 md:grid-cols-3">
        {[
          {
            title: "Highlights inteligentes",
            desc: "Detecta los clips que maximizan el watch time."
          },
          {
            title: "Estrategia viral",
            desc: "Hooks y títulos listos para publicar en segundos."
          },
          {
            title: "Rendimiento SaaS",
            desc: "KPIs claros y recomendaciones accionables."
          }
        ].map((card) => (
          <div
            key={card.title}
            className="rounded-3xl border border-white/15 bg-white/10 p-6 shadow-xl transition hover:-translate-y-1 hover:shadow-2xl backdrop-blur"
          >
            <h3 className="text-lg font-semibold">{card.title}</h3>
            <p className="mt-3 text-sm text-white/75">{card.desc}</p>
          </div>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-3xl border border-white/15 bg-white/10 p-6 shadow-xl transition hover:shadow-2xl backdrop-blur">
          <h2 className="text-xl font-semibold">Panel de control</h2>
          <p className="mt-3 text-white/80">
            Visualiza la salud de tu canal con métricas esenciales y recibe
            alertas sobre oportunidades virales.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {[
              { label: "Retención promedio", value: "63%" },
              { label: "Videos destacados", value: "12" },
              { label: "CTR orgánico", value: "7.4%" },
              { label: "Ideas generadas", value: "28" }
            ].map((metric) => (
              <div
                key={metric.label}
                className="rounded-2xl border border-white/10 bg-black/20 p-4 transition hover:-translate-y-0.5 hover:bg-black/30"
              >
                <p className="text-xs uppercase tracking-widest text-white/60">
                  {metric.label}
                </p>
                <p className="mt-2 text-2xl font-semibold">{metric.value}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-3xl border border-white/15 bg-white/10 p-6 shadow-xl transition hover:shadow-2xl backdrop-blur">
          <h2 className="text-xl font-semibold">Flujo creativo</h2>
          <p className="mt-3 text-white/80">
            Genera clips virales con un flujo guiado que prioriza velocidad,
            claridad y resultados.
          </p>
          <ul className="mt-6 space-y-4 text-sm text-white/75">
            {[
              "Recibe un score de viralidad por video.",
              "Ajusta el hook con sugerencias instantáneas.",
              "Planifica tu calendario semanal."
            ].map((item) => (
              <li
                key={item}
                className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 transition hover:bg-black/30"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </section>
  );
}