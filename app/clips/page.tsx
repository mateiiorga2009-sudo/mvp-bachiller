import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth-options";
import Link from "next/link";
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase-admin";
import PrimaryCallout from "@/components/PrimaryCallout";

export default async function ClipsPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    redirect("/login");
  }

  const userEmail = session.user.email;
  const data = isSupabaseConfigured()
    ? (
        await getSupabaseAdmin()
          .from("clips")
          .select("id, title, duration_seconds, created_at")
          .eq("user_email", userEmail)
          .order("created_at", { ascending: false })
          .limit(8)
      ).data
    : [];

  const clips = (data ?? []).map((clip, index) => ({
    id: clip.id,
    title: clip.title ?? `Clip viral ${index + 1}`,
    duration: `${clip.duration_seconds ?? 24}s`,
    status: index % 2 === 0 ? "Listo" : "En revisión"
  }));

  return (
    <section className="animate-panel-in">
      <div className="mx-auto w-full max-w-6xl space-y-10 px-6 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-12">
        <header className="rounded-3xl border border-slate-200/80 bg-white/90 p-8 shadow-2xl backdrop-blur-xl dark:border-white/20 dark:bg-white/10">
        <p className="text-xs uppercase tracking-[0.35em] text-slate-500 dark:text-white/60">
          Clips sugeridos
        </p>
        <h1 className="mt-3 text-3xl font-semibold text-slate-900 md:text-4xl dark:text-white">
          Biblioteca de clips listos para publicar
        </h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-white/70">
          Revisa, edita y publica los recortes con mayor potencial viral.
        </p>
      </header>

        <PrimaryCallout
          title="Revisa y publica tus mejores clips"
          description="Selecciona los clips listos, optimiza el título y publica con un solo paso."
          ctaLabel="Generar clips"
          ctaHref="/generate"
          icon="🚀"
        />

      {(clips ?? []).length === 0 ? (
        <section className="rounded-3xl border border-slate-200/80 bg-white/90 p-10 text-center shadow-2xl backdrop-blur-xl dark:border-white/20 dark:bg-white/10">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-slate-200/80 bg-slate-50 text-2xl dark:border-white/20 dark:bg-white/10">
            📹
          </div>
          <h2 className="mt-6 text-2xl font-semibold text-slate-900 dark:text-white">
            Sin clips disponibles
          </h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-white/70">
            Genera tu primer clip para desbloquear recomendaciones personalizadas.
          </p>
          <Link
            href="/generate"
            className="mt-6 inline-flex rounded-2xl bg-gradient-to-r from-cyan-400 via-sky-500 to-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-xl transition hover:scale-[1.02]"
          >
            Generar clips
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
                <span className="rounded-full border border-slate-200/80 bg-white px-3 py-1 text-xs text-slate-600 dark:border-white/20 dark:bg-white/10 dark:text-white/70">
                  {clip.status}
                </span>
                <span className="text-xs text-slate-500 dark:text-white/60">
                  {clip.duration}
                </span>
              </div>
              <div className="mt-4 h-32 rounded-2xl border border-slate-200/80 bg-gradient-to-br from-slate-100 to-transparent dark:border-white/20 dark:from-white/10" />
              <h3 className="mt-4 text-lg font-semibold text-slate-900 dark:text-white">
                {clip.title}
              </h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-white/70">
                Hook recomendado · Alta retención · Publicación sugerida
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <button className="w-full rounded-2xl border border-slate-200/80 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300 dark:border-white/20 dark:bg-white/10 dark:text-white dark:hover:border-white/40 dark:hover:bg-white/20">
                  Ver
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
      </div>
    </section>
  );
}
