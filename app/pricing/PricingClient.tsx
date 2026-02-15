"use client";

import { useState } from "react";

export default function PricingClient() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCheckout = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/stripe/checkout", { method: "POST" });
      const data = (await response.json()) as { url?: string; error?: string };
      if (!response.ok || !data.url) {
        throw new Error(data.error ?? "No se pudo iniciar el pago.");
      }
      window.location.href = data.url;
    } catch (err) {
      setError("No se pudo iniciar Stripe Checkout. Inténtalo nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="rounded-3xl border border-slate-200/80 bg-white/90 p-8 shadow-xl backdrop-blur-xl dark:border-white/20 dark:bg-white/10">
        <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
          Free
        </h3>
        <p className="mt-2 text-sm text-slate-600 dark:text-white/70">
          Sube hasta 3 vídeos al mes. Watermark activado. Publicación manual.
        </p>
        <button className="mt-6 w-full rounded-2xl border border-slate-200/80 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 dark:border-white/20 dark:bg-white/10 dark:text-white dark:hover:border-white/40">
          Plan actual
        </button>
      </div>

      <div className="relative rounded-3xl border border-indigo-400/40 bg-gradient-to-r from-indigo-500/15 via-purple-500/15 to-sky-500/15 p-8 shadow-2xl ring-1 ring-indigo-400/30 backdrop-blur-xl">
        <div className="absolute -top-4 right-6 rounded-full bg-indigo-500 px-3 py-1 text-xs font-semibold text-white">
          Recomendado
        </div>
        <h3 className="text-xl font-semibold text-white">Pro</h3>
        <p className="mt-2 text-sm text-white/80">
          Clips ilimitados. Sin watermark. Publicación automática. Badge Pro
          visible.
        </p>
        <button
          onClick={handleCheckout}
          disabled={loading}
          className="mt-6 w-full rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-slate-900 transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? "Redirigiendo..." : "Pasar a Pro"}
        </button>
        {error && <p className="mt-3 text-xs text-amber-200">{error}</p>}
      </div>
    </div>
  );
}
