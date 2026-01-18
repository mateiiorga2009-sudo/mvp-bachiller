import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth-options";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const titles = [
    "7 ideas virales para duplicar tu retención esta semana",
    "El truco de edición que hace que tu Short se vea PRO",
    "De 0 a 10k: el formato que te pone en tendencias",
    "3 hooks que detienen el scroll en menos de 2 segundos",
    "El guion perfecto para que tu video sea compartible"
  ];

  const hooks = [
    "¿Quieres que tu video explote en 72 horas? Haz esto primero.",
    "Si tu audiencia no se queda, este detalle lo cambia todo.",
    "El secreto para retener 60% en tus primeros 3 segundos."
  ];

  const hashtags = [
    "#viralify",
    "#creadores",
    "#tiktokgrowth",
    "#youtubetips",
    "#contentstrategy"
  ];

  return (
    <section className="flex flex-1 flex-col gap-10">
      <header className="space-y-3">
        <p className="text-xs uppercase tracking-[0.35em] text-white/70">
          Dashboard Viralify
        </p>
        <h1 className="text-3xl font-semibold md:text-4xl">
          Hola, {session.user?.name ?? "creador"} 👋
        </h1>
        <p className="text-white/75">
          Genera ideas virales en segundos para tu próximo video.
        </p>
      </header>

      <section className="rounded-3xl border border-white/20 bg-white/10 p-6 shadow-2xl backdrop-blur">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
          <div className="flex-1">
            <label className="text-sm font-medium text-white/80">
              Enlace de YouTube o TikTok
            </label>
            <input
              type="text"
              placeholder="https://www.youtube.com/watch?v=... o https://www.tiktok.com/@..."
              className="mt-2 w-full rounded-2xl border border-white/20 bg-black/30 px-4 py-3 text-sm text-white placeholder:text-white/50 focus:border-white/60 focus:outline-none focus:ring-2 focus:ring-pink-300/40"
            />
            <p className="mt-2 text-xs text-white/60">
              Analizamos el link y generamos ideas simuladas (mock) por ahora.
            </p>
          </div>
          <button className="w-full rounded-2xl bg-gradient-to-r from-pink-400 via-purple-500 to-blue-500 px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-purple-500/40 transition hover:scale-[1.01] lg:w-auto">
            Generar ideas virales
          </button>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-3xl border border-white/15 bg-white/10 p-6 shadow-xl backdrop-blur">
          <h2 className="text-xl font-semibold">Títulos virales</h2>
          <ol className="mt-4 space-y-3 text-sm text-white/80">
            {titles.map((title) => (
              <li
                key={title}
                className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3"
              >
                {title}
              </li>
            ))}
          </ol>
        </div>
        <div className="rounded-3xl border border-white/15 bg-white/10 p-6 shadow-xl backdrop-blur">
          <h2 className="text-xl font-semibold">Hooks (3 segundos)</h2>
          <ul className="mt-4 space-y-3 text-sm text-white/80">
            {hooks.map((hook) => (
              <li
                key={hook}
                className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3"
              >
                {hook}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-3xl border border-white/15 bg-white/10 p-6 shadow-xl backdrop-blur">
          <h2 className="text-xl font-semibold">Descripción optimizada</h2>
          <p className="mt-4 text-sm text-white/80">
            Descubre cómo mejorar tu retención con estos 3 ajustes rápidos de
            guion y edición. Guarda este video para aplicarlo en tu próximo
            contenido y etiqueta a alguien que quiera crecer en YouTube o
            TikTok.
          </p>
        </div>
        <div className="rounded-3xl border border-white/15 bg-white/10 p-6 shadow-xl backdrop-blur">
          <h2 className="text-xl font-semibold">Hashtags sugeridos</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {hashtags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/20 bg-black/30 px-3 py-1 text-xs text-white/80"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>
    </section>
  );
}
