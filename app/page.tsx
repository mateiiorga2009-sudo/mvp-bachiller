"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";

export default function HomePage() {
  const { data: session } = useSession();

  return (
    <section className="flex flex-1 flex-col gap-16">
      {/* NAV */}
      <nav className="flex items-center justify-between">
        <div className="text-lg font-semibold tracking-wide text-white">
          Viralify
        </div>
        {session && (
          <Link
            href="/dashboard"
            className="text-sm font-medium text-white/80 hover:text-white"
          >
            Dashboard
          </Link>
        )}
      </nav>

      {/* HERO */}
      <header className="relative overflow-hidden rounded-3xl bg-[url('/hero-bg.png')] bg-cover bg-center px-6 py-16 text-center shadow-2xl md:px-10">
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative z-10 space-y-7">
          <p className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.35em] text-white/70">
            Viralify para creadores
          </p>
          <h1 className="text-4xl font-semibold leading-tight md:text-6xl">
            Crece más rápido, publica mejor y ahorra horas con{" "}
            <span className="bg-gradient-to-r from-sky-400 to-indigo-500 bg-clip-text text-transparent">
              clips virales
            </span>
            .
          </h1>

          <p className="mx-auto max-w-3xl text-base text-white/75 md:text-lg">
            Viralify detecta los momentos con mayor potencial viral, te entrega
            hooks ganadores y convierte tu idea en títulos listos para crecer en
            YouTube Shorts y TikTok.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            {!session ? (
              <>
                <Link
                  href="/login"
                  className="rounded-2xl bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-600 px-10 py-4 text-sm font-semibold text-white shadow-xl shadow-indigo-500/30 transition hover:scale-[1.04]"
                >
                  Empieza a crear clips virales
                </Link>
                <div className="text-xs text-white/65">
                  Gratis para empezar · Login con Google
                </div>
              </>
            ) : (
              <Link
                href="/dashboard"
                className="rounded-2xl bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-600 px-10 py-4 text-sm font-semibold text-white shadow-xl shadow-indigo-500/30 transition hover:scale-[1.04]"
              >
                Ir al dashboard
              </Link>
            )}
          </div>
        </div>
      </header>

      <section className="grid gap-4 rounded-3xl border border-white/10 bg-white/5 px-6 py-6 text-center shadow-lg backdrop-blur md:grid-cols-3">
        {[
          "Creadores usan Viralify para crecer más rápido",
          "Optimizado para YouTube Shorts y TikTok",
          "Resultados claros sin perder tiempo editando"
        ].map((item) => (
          <div
            key={item}
            className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white/75 transition hover:bg-black/40"
          >
            {item}
          </div>
        ))}
      </section>

      {/* FEATURES */}
      <section className="grid gap-6 md:grid-cols-3">
        {[
          {
            title: "+Views con clips precisos",
            desc: "Aísla los momentos con mayor retención y repite el patrón."
          },
          {
            title: "Hooks que detienen el scroll",
            desc: "Guiones cortos que capturan atención en 3 segundos."
          },
          {
            title: "Menos edición, más impacto",
            desc: "Reduce horas de postproducción con decisiones claras."
          }
        ].map((card) => (
          <div
            key={card.title}
            className="group rounded-3xl border border-white/15 bg-white/10 p-6 backdrop-blur transition hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/20 bg-black/30 text-sm font-semibold text-white/80 transition group-hover:scale-105">
                ✦
              </span>
              <h3 className="text-lg font-semibold">{card.title}</h3>
            </div>
            <p className="mt-3 text-sm text-white/70">{card.desc}</p>
          </div>
        ))}
      </section>
    </section>
  );
}