import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth-options";
import Link from "next/link";
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase-admin";

export default async function LibraryPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    redirect("/login");
  }

  const userEmail = session.user.email;
  const data = isSupabaseConfigured()
    ? (
        await getSupabaseAdmin()
          .from("clips")
          .select("id, title, created_at")
          .eq("user_email", userEmail)
          .order("created_at", { ascending: false })
          .limit(6)
      ).data
    : [];

  const clips = (data ?? []).map((item, index) => ({
    id: item.id,
    title: item.title ?? `Clip viral ${index + 1}`,
    duration: `${18 + index * 4}s`,
    status: index % 2 === 0 ? "Listo" : "Borrador"
  }));

  return (
    <section className="space-y-10 animate-panel-in">
      <header className="rounded-3xl border border-slate-200/80 bg-white/90 p-8 shadow-2xl backdrop-blur-xl dark:border-white/20 dark:bg-white/10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-slate-500 dark:text-white/60">
              Biblioteca de clips
            </p>
            <h1 className="mt-3 text-3xl font-semibold text-slate-900 md:text-4xl dark:text-white">
              Biblioteca de clips
            </h1>
            <p className="mt-2 text-sm text-slate-600 dark:text-white/70">
              Guarda, organiza y reutiliza tus mejores clips listos para
              publicar.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="flex items-center gap-2 rounded-2xl border border-slate-200/80 bg-white px-4 py-2 text-sm text-slate-600 dark:border-white/20 dark:bg-white/10 dark:text-white/70">
              🔍
              <input
                placeholder="Buscar clips..."
                className="w-full bg-transparent text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none dark:text-white dark:placeholder:text-white/50"
              />
            </div>
            <select className="rounded-2xl border border-slate-200/80 bg-white px-4 py-2 text-sm text-slate-700 dark:border-white/20 dark:bg-white/10 dark:text-white/80">
              <option>Filtrar: Todos</option>
              <option>Listos</option>
              <option>Borradores</option>
            </select>
            <select className="rounded-2xl border border-slate-200/80 bg-white px-4 py-2 text-sm text-slate-700 dark:border-white/20 dark:bg-white/10 dark:text-white/80">
              <option>Ordenar: Recientes</option>
              <option>Más vistos</option>
              <option>Más guardados</option>
            </select>
          </div>
        </div>
      </header>

      {(clips ?? []).length === 0 ? (
        <section className="rounded-3xl border border-slate-200/80 bg-white/90 p-10 text-center shadow-2xl backdrop-blur-xl dark:border-white/20 dark:bg-white/10">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-slate-200/80 bg-slate-50 text-2xl dark:border-white/20 dark:bg-white/10">
            🎬
          </div>
          <h2 className="mt-6 text-2xl font-semibold text-slate-900 dark:text-white">
            Tu biblioteca está vacía
          </h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-white/70">
            Genera tu primer clip y empieza a construir tu repositorio de
            contenido viral.
          </p>
          <Link
            href="/generate"
            className="mt-6 inline-flex rounded-2xl bg-gradient-to-r from-cyan-400 via-sky-500 to-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-xl transition hover:scale-[1.02]"
          >
            Generar tu primer clip
          </Link>
        </section>
      ) : (
        <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {clips.map((clip) => (
            <article
              key={clip.id}
              className="group rounded-2xl border border-slate-200/80 bg-white/90 p-6 shadow-lg backdrop-blur-xl transition hover:-translate-y-1 hover:shadow-2xl dark:border-white/20 dark:bg-white/10"
            >
              <div className="flex items-center justify-between">
                <div className="rounded-full border border-slate-200/80 bg-white px-3 py-1 text-xs text-slate-600 dark:border-white/20 dark:bg-white/10 dark:text-white/70">
                  {clip.status}
                </div>
                <span className="text-xs text-slate-500 dark:text-white/60">
                  {clip.duration}
                </span>
              </div>
              <div className="mt-4 h-32 rounded-2xl border border-slate-200/80 bg-gradient-to-br from-slate-100 to-transparent dark:border-white/20 dark:from-white/10" />
              <h3 className="mt-4 text-lg font-semibold text-slate-900 dark:text-white">
                {clip.title}
              </h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-white/70">
                Hook optimizado · Retención alta · Listo para publicar
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <button className="w-full rounded-2xl border border-slate-200/80 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300 dark:border-white/20 dark:bg-white/10 dark:text-white dark:hover:border-white/40 dark:hover:bg-white/20">
                  Ver clip
                </button>
                <button className="w-full rounded-2xl bg-white text-slate-900 px-4 py-2 text-sm font-semibold transition hover:opacity-90">
                  Publicar
                </button>
                <button className="w-full rounded-2xl border border-slate-200/80 bg-white px-4 py-2 text-sm text-slate-600 transition hover:border-slate-300 dark:border-white/20 dark:bg-white/5 dark:text-white/70 dark:hover:border-white/40">
                  Eliminar
                </button>
              </div>
            </article>
          ))}
        </section>
      )}

      <Link
        href="/dashboard"
        className="inline-flex rounded-2xl border border-slate-200/80 bg-white px-4 py-2 text-sm text-slate-700 transition hover:border-slate-300 dark:border-white/20 dark:bg-white/10 dark:text-white/80 dark:hover:border-white/40"
      >
        Volver al dashboard
      </Link>
    </section>
  );
}
