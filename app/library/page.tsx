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

  return (
    <section className="space-y-8 animate-panel-in">
      <header className="rounded-3xl border border-slate-200/80 bg-white/90 p-6 shadow-xl backdrop-blur dark:border-white/15 dark:bg-white/10">
        <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">
          Biblioteca
        </h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-white/70">
          Guarda templates, guiones y resultados anteriores.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        {(data ?? []).length === 0 ? (
          <div className="rounded-3xl border border-slate-200/80 bg-white/90 p-5 text-sm text-slate-600 shadow-xl backdrop-blur dark:border-white/15 dark:bg-white/10 dark:text-white/70">
            Tu biblioteca está vacía. Genera clips para empezar.
          </div>
        ) : (
          data?.map((item) => (
            <div
              key={item.id}
              className="rounded-3xl border border-slate-200/80 bg-white/90 p-5 shadow-xl backdrop-blur transition hover:-translate-y-1 hover:shadow-2xl dark:border-white/15 dark:bg-white/10"
            >
              <p className="text-sm font-semibold text-slate-900 dark:text-white">
                {item.title ?? "Clip generado"}
              </p>
              <p className="mt-2 text-xs text-slate-500 dark:text-white/60">
                Guardado recientemente
              </p>
            </div>
          ))
        )}
      </div>

      <Link
        href="/dashboard"
        className="inline-flex rounded-2xl border border-slate-200/80 bg-white px-4 py-2 text-sm text-slate-700 transition hover:border-slate-300 dark:border-white/20 dark:bg-white/5 dark:text-white/80 dark:hover:border-white/40"
      >
        Volver al dashboard
      </Link>
    </section>
  );
}
