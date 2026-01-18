import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth-options";
import Link from "next/link";

export default async function GeneratePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <section className="space-y-8">
      <header className="rounded-3xl border border-white/15 bg-white/10 p-6 shadow-xl backdrop-blur">
        <h1 className="text-3xl font-semibold">Generar clips virales</h1>
        <p className="mt-2 text-sm text-white/70">
          Enlaza un video y prepara una nueva sesión de análisis.
        </p>
      </header>

      <div className="rounded-3xl border border-white/20 bg-white/10 p-6 shadow-2xl backdrop-blur">
        <label className="text-sm text-white/80">
          Enlace de YouTube o TikTok
        </label>
        <input
          type="text"
          placeholder="https://www.youtube.com/watch?v=..."
          className="mt-2 w-full rounded-2xl border border-white/20 bg-black/30 px-4 py-3 text-sm text-white placeholder:text-white/50 focus:border-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-300/40"
        />
        <button className="mt-4 w-full rounded-2xl bg-gradient-to-r from-cyan-400 via-sky-500 to-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-xl transition hover:scale-[1.02]">
          Generar clips virales
        </button>
      </div>

      <Link
        href="/dashboard"
        className="inline-flex rounded-2xl border border-white/20 bg-white/5 px-4 py-2 text-sm text-white/80 transition hover:border-white/40"
      >
        Volver al dashboard
      </Link>
    </section>
  );
}
