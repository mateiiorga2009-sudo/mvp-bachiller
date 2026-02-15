import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth-options";
import PricingClient from "./PricingClient";

export default async function PricingPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <section className="animate-panel-in">
      <div className="mx-auto w-full max-w-5xl space-y-10 px-6 py-10 sm:px-8 sm:py-12 lg:px-12 lg:py-14">
        <header className="rounded-3xl border border-slate-200/80 bg-white/90 p-8 shadow-2xl backdrop-blur-xl dark:border-white/20 dark:bg-white/10">
          <p className="text-xs uppercase tracking-[0.35em] text-slate-500 dark:text-white/60">
            Pricing
          </p>
          <h1 className="mt-3 text-3xl font-semibold text-slate-900 md:text-4xl dark:text-white">
            Elige el plan que mejor acompaña tu crecimiento
          </h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-white/70">
            Empieza gratis y desbloquea Pro cuando quieras automatizar tu flujo
            de clips.
          </p>
        </header>

        <PricingClient />
      </div>
    </section>
  );
}
