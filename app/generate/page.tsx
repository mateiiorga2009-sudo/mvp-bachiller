import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth-options";
import Link from "next/link";
import GenerateClient from "./GenerateClient";

export default async function GeneratePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <section className="animate-panel-in">
      <div className="mx-auto w-full max-w-6xl space-y-10 px-6 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-12">
        <header className="rounded-3xl border border-slate-200/80 bg-white/90 p-8 shadow-2xl backdrop-blur-xl dark:border-white/20 dark:bg-white/10">
        <p className="text-xs uppercase tracking-[0.35em] text-slate-500 dark:text-white/60">
          Generar clips
        </p>
        <h1 className="mt-3 text-3xl font-semibold text-slate-900 md:text-4xl dark:text-white">
          Genera clips optimizados para viralidad
        </h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-white/70">
          Sube un video o pega un enlace para detectar los momentos con mayor
          retención.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-3">
        {[
          "Sube tu video o enlace",
          "Selecciona los clips sugeridos",
          "Publica con un click"
        ].map((item, index) => (
          <div
            key={item}
            className="rounded-2xl border border-slate-200/80 bg-white/90 px-4 py-3 text-sm text-slate-600 shadow-lg backdrop-blur-xl dark:border-white/20 dark:bg-white/10 dark:text-white/70"
          >
            <span className="mr-2 text-slate-500 dark:text-white/60">
              0{index + 1}
            </span>
            {item}
          </div>
        ))}
      </div>

      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <GenerateClient />
        <div className="rounded-2xl border border-slate-200/80 bg-white/90 p-6 shadow-lg backdrop-blur-xl dark:border-white/20 dark:bg-white/10">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
            Checklist de publicación
          </h2>
          <ul className="mt-4 space-y-3 text-sm text-slate-600 dark:text-white/70">
            {[
              "Gancho claro en los 3 primeros segundos",
              "Título optimizado para CTR",
              "CTA directo para comentarios"
            ].map((item) => (
              <li
                key={item}
                className="rounded-2xl border border-slate-200/80 bg-white px-4 py-3 dark:border-white/20 dark:bg-white/10"
              >
                {item}
              </li>
            ))}
          </ul>
          <button className="mt-6 w-full rounded-2xl bg-white text-slate-900 px-4 py-3 text-sm font-semibold transition hover:opacity-90">
            Descargar guía de viralidad
          </button>
        </div>
      </section>

        <Link
          href="/dashboard"
          className="inline-flex rounded-2xl border border-slate-200/80 bg-white px-4 py-2 text-sm text-slate-700 transition hover:border-slate-300 dark:border-white/20 dark:bg-white/10 dark:text-white/80 dark:hover:border-white/40"
        >
          Volver al dashboard
        </Link>
      </div>
    </section>
  );
}
