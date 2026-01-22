import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth-options";
import Link from "next/link";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

export default async function LibraryPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const supabase = getSupabaseAdmin();
  const { data } = await supabase
    .from("clips")
    .select("id, title, created_at")
    .eq("user_email", session.user.email)
    .order("created_at", { ascending: false })
    .limit(6);

  return (
    <section className="space-y-8">
      <header className="rounded-3xl border border-white/15 bg-white/10 p-6 shadow-xl backdrop-blur">
        <h1 className="text-3xl font-semibold">Biblioteca</h1>
        <p className="mt-2 text-sm text-white/70">
          Guarda templates, guiones y resultados anteriores.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        {(data ?? []).length === 0 ? (
          <div className="rounded-3xl border border-white/15 bg-white/10 p-5 text-sm text-white/70 shadow-xl backdrop-blur">
            Tu biblioteca está vacía. Genera clips para empezar.
          </div>
        ) : (
          data?.map((item) => (
            <div
              key={item.id}
              className="rounded-3xl border border-white/15 bg-white/10 p-5 shadow-xl backdrop-blur transition hover:-translate-y-1 hover:shadow-2xl"
            >
              <p className="text-sm font-semibold">
                {item.title ?? "Clip generado"}
              </p>
              <p className="mt-2 text-xs text-white/60">
                Guardado recientemente
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
