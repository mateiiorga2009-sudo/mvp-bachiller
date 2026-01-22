"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";

export default function HomePage() {
  const { data: session } = useSession();

  return (
    <section className="flex flex-1 flex-col gap-20 px-6 py-8 sm:px-8 lg:px-12 lg:py-10">
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
      <header className="relative flex min-h-screen items-center justify-center overflow-hidden rounded-[2.5rem] bg-[url('/hero-bg.png')] bg-cover bg-center px-6 py-16 text-center shadow-2xl sm:px-10 lg:px-16">
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/65 to-indigo-950/90" />
        <div className="absolute -top-20 right-10 h-72 w-72 rounded-full bg-indigo-500/30 blur-3xl" />
        <div className="absolute bottom-10 left-10 h-80 w-80 rounded-full bg-cyan-400/20 blur-3xl" />
        <div className="relative z-10 w-full max-w-4xl space-y-8 animate-[fadeIn_0.8s_ease-out]">
          <p className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.35em] text-white/70 backdrop-blur">
            Viralify para creadores
          </p>
          <h1 className="text-4xl font-semibold leading-tight md:text-6xl">
            Haz que cada vídeo tenga{" "}
            <span className="bg-gradient-to-r from-cyan-300 via-sky-400 to-indigo-500 bg-clip-text text-transparent">
              potencial viral
            </span>
            .
          </h1>

          <p className="mx-auto max-w-3xl text-base text-white/80 md:text-lg">
            Viralify analiza tus vídeos y detecta los momentos exactos que
            generan retención, clics y crecimiento real en YouTube y TikTok.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            {!session ? (
              <>
                <Link
                  href="/login"
                  className="rounded-2xl bg-gradient-to-r from-cyan-400 via-sky-500 to-indigo-600 px-10 py-4 text-sm font-semibold text-white shadow-2xl shadow-sky-500/30 transition hover:scale-[1.05]"
                >
                  Empieza gratis con Google
                </Link>
                <Link
                  href="#como-funciona"
                  className="rounded-2xl border border-white/20 bg-white/5 px-8 py-4 text-sm font-semibold text-white/80 backdrop-blur transition hover:border-white/40 hover:bg-white/10"
                >
                  Ver cómo funciona
                </Link>
                <div className="text-xs text-white/60">
                  Gratis para empezar · Login con Google
                </div>
              </>
            ) : (
              <Link
                href="/dashboard"
                className="rounded-2xl bg-gradient-to-r from-cyan-400 via-sky-500 to-indigo-600 px-10 py-4 text-sm font-semibold text-white shadow-2xl shadow-sky-500/30 transition hover:scale-[1.05]"
              >
                Ir al dashboard
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* SOCIAL PROOF */}
      <section className="grid gap-4 rounded-3xl border border-white/10 bg-white/5 px-6 py-8 text-center shadow-lg backdrop-blur md:grid-cols-3">
        {[
          "Creadores que ya usan Viralify",
          "Optimizado para YouTube Shorts y TikTok",
          "Usado por canales de +100K seguidores"
        ].map((item) => (
          <div
            key={item}
            className="rounded-2xl border border-white/20 bg-white/10 px-4 py-4 text-sm text-white/75 backdrop-blur-xl transition hover:bg-white/15"
          >
            {item}
          </div>
        ))}
      </section>

      {/* BENEFITS */}
      <section id="como-funciona" className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[
          {
            title: "🔥 Momentos virales",
            desc: "Detecta automáticamente los segundos que más convierten."
          },
          {
            title: "🎯 Hooks optimizados",
            desc: "Títulos y ganchos diseñados para maximizar clics."
          },
          {
            title: "📈 Más retención",
            desc: "Mejora watch time sin rehacer todo tu contenido."
          },
          {
            title: "⚡ Flujo rápido",
            desc: "Recorta, publica y crece en minutos."
          }
        ].map((card) => (
          <div
            key={card.title}
            className="group rounded-3xl border border-white/20 bg-white/10 p-6 backdrop-blur-xl transition hover:-translate-y-1 hover:shadow-2xl"
          >
            <h3 className="text-lg font-semibold">{card.title}</h3>
            <p className="mt-3 text-sm text-white/70">{card.desc}</p>
          </div>
        ))}
      </section>

      {/* FINAL CTA */}
      <section className="rounded-[2.5rem] border border-white/10 bg-gradient-to-r from-cyan-500/20 via-indigo-500/20 to-purple-600/20 px-8 py-12 text-center shadow-2xl">
        <h2 className="text-3xl font-semibold md:text-4xl">
          Deja de subir vídeos al azar. Empieza a subir vídeos virales.
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm text-white/75">
          Viralify te da claridad sobre qué recortar, cómo presentar y cuándo
          publicar para crecer más rápido.
        </p>
        <div className="mt-6 flex justify-center">
          <Link
            href={session ? "/dashboard" : "/login"}
            className="rounded-2xl bg-gradient-to-r from-cyan-400 via-sky-500 to-indigo-600 px-10 py-4 text-sm font-semibold text-white shadow-2xl shadow-sky-500/30 transition hover:scale-[1.05]"
          >
            Entrar al dashboard
          </Link>
        </div>
      </section>
    </section>
  );
}