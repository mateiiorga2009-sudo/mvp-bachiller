import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth-options";
import Link from "next/link";
import ConnectClient from "./ConnectClient";

export default async function ConnectPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <section className="animate-panel-in">
      <div className="mx-auto w-full max-w-6xl space-y-10 px-6 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-12">
        <header className="rounded-3xl border border-slate-200/80 bg-white/90 p-8 shadow-2xl backdrop-blur-xl dark:border-white/20 dark:bg-white/10">
        <p className="text-xs uppercase tracking-[0.35em] text-slate-500 dark:text-white/60">
          Conectar canales
        </p>
        <h1 className="mt-3 text-3xl font-semibold text-slate-900 md:text-4xl dark:text-white">
          Activa tu flujo automático de publicación
        </h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-white/70">
          Vincula tus cuentas para sincronizar métricas, clips y publicación en
          un solo lugar.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-3">
        {[
          "Conecta YouTube o TikTok",
          "Analiza tus videos",
          "Publica clips automáticamente"
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

      <ConnectClient />

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
