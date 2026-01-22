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
    <section className="space-y-8 animate-panel-in">
      <header className="rounded-3xl border border-white/15 bg-white/10 p-6 shadow-xl backdrop-blur">
        <h1 className="text-3xl font-semibold">Generar clips virales</h1>
        <p className="mt-2 text-sm text-white/70">
          Enlaza un video y prepara una nueva sesión de análisis.
        </p>
      </header>

      <GenerateClient />

      <Link
        href="/dashboard"
        className="inline-flex rounded-2xl border border-white/20 bg-white/5 px-4 py-2 text-sm text-white/80 transition hover:border-white/40"
      >
        Volver al dashboard
      </Link>
    </section>
  );
}
