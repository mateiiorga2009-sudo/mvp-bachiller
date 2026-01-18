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
      <header className="space-y-6 text-center">
        <h1 className="text-4xl font-semibold leading-tight md:text-6xl">
          Convierte tus videos en{" "}
          <span className="bg-gradient-to-r from-sky-400 to-indigo-500 bg-clip-text text-transparent">
            clips virales
          </span>
        </h1>

        <p className="mx-auto max-w-2xl text-base text-white/70 md:text-lg">
          Viralify analiza tus videos de YouTube y TikTok y detecta los momentos
          con mayor potencial viral. Hooks, títulos y recomendaciones listas
          para publicar.
        </p>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          {!session ? (
            <>
              <Link
                href="/login"
                className="rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-600 px-8 py-3 text-sm font-semibold text-white shadow-lg transition hover:scale-[1.03]"
              >
                Iniciar sesión con Google
              </Link>
              <span className="text-xs text-white/60">
                Accede al panel para comenzar
              </span>
            </>
          ) : (
            <Link
              href="/dashboard"
              className="rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-600 px-8 py-3 text-sm font-semibold text-white shadow-lg transition hover:scale-[1.03]"
            >
              Ir al dashboard
            </Link>
          )}
        </div>
      </header>

      {/* FEATURES */}
      <section className="grid gap-6 md:grid-cols-3">
        {[
          {
            title: "Detección inteligente",
            desc: "Identifica los segundos exactos con mayor retención y potencial viral."
          },
          {
            title: "Hooks optimizados",
            desc: "Recibe títulos y hooks diseñados para maximizar clics y watch time."
          },
          {
            title: "Pensado para creadores",
            desc: "Un flujo rápido y claro enfocado en crecer en YouTube y TikTok."
          }
        ].map((card) => (
          <div
            key={card.title}
            className="rounded-3xl border border-white/15 bg-white/10 p-6 backdrop-blur transition hover:-translate-y-1 hover:shadow-xl"
          >
            <h3 className="text-lg font-semibold">{card.title}</h3>
            <p className="mt-3 text-sm text-white/70">{card.desc}</p>
          </div>
        ))}
      </section>
    </section>
  );
}