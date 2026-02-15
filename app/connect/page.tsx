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
    <section className="space-y-8 animate-panel-in">
      <header className="rounded-3xl border border-slate-200/80 bg-white/90 p-6 shadow-xl backdrop-blur dark:border-white/15 dark:bg-white/10">
        <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">
          Conectar canales
        </h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-white/70">
          Vincula tus cuentas para activar el flujo automático.
        </p>
      </header>

      <ConnectClient />

      <Link
        href="/dashboard"
        className="inline-flex rounded-2xl border border-slate-200/80 bg-white px-4 py-2 text-sm text-slate-700 transition hover:border-slate-300 dark:border-white/20 dark:bg-white/5 dark:text-white/80 dark:hover:border-white/40"
      >
        Volver al dashboard
      </Link>
    </section>
  );
}
