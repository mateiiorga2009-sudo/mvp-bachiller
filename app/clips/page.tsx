import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth-options";
import Link from "next/link";
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase-admin";

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

  return (
    <section className="space-y-8 animate-panel-in">
      <header className="rounded-3xl border border-white/15 bg-white/10 p-6 shadow-xl backdrop-blur">
        <h1 className="text-3xl font-semibold">Clips sugeridos</h1>
        <p className="mt-2 text-sm text-white/70">
          Aquí verás los recortes con mayor potencial viral.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        {(data ?? []).length === 0 ? (
          <div className="rounded-3xl border border-white/15 bg-white/10 p-5 text-sm text-white/70 shadow-xl backdrop-blur">
            Aún no tienes clips generados. Empieza creando uno desde el
            dashboard.
          </div>
        ) : (
          data?.map((clip) => (
            <div
              key={clip.id}
              className="rounded-3xl border border-white/15 bg-white/10 p-5 shadow-xl backdrop-blur transition hover:-translate-y-1 hover:shadow-2xl"
            >
              <p className="text-sm font-semibold">
                {clip.title ?? "Clip generado"}
              </p>
              <p className="mt-2 text-xs text-white/60">
                Duración estimada · {clip.duration_seconds ?? 0}s
              </p>
            </div>
          ))
        )}
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
