"use client";

import { useState } from "react";

export default function PricingClient() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCheckout = async () => {
    setLoading(true);
    setError("");
    try {
      const priceId =
        process.env.NEXT_PUBLIC_STRIPE_PRICE_ID ??
        "price_1T17Ul0m3UmkDm1nWCDnl7NY";
      if (!priceId) {
        throw new Error("Price ID no configurado.");
      }

      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId })
      });
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
      <div className="rounded-3xl border border-slate-200/60 bg-white/85 p-8 shadow-lg backdrop-blur-xl dark:border-white/15 dark:bg-white/10">
        <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
          Free
        </h3>
        <p className="mt-2 text-sm text-slate-600 dark:text-white/70">
          Prueba gratis con limitaciones, Pro desbloquea todo.
        </p>
        <ol className="mt-4 space-y-3 text-sm text-slate-600 dark:text-white/70">
          <li className="flex items-start gap-3">
            <span>1.</span>
            <span>Subida manual de vídeos</span>
          </li>
          <li className="flex items-start gap-3">
            <span>2.</span>
            <span>Hasta 3 vídeos/mes</span>
          </li>
          <li className="flex items-start gap-3">
            <span>3.</span>
            <span>Watermark activado</span>
          </li>
          <li className="flex items-start gap-3">
            <span>4.</span>
            <span>Acceso a análisis básico</span>
          </li>
        </ol>
        <button className="mt-6 w-full rounded-2xl border border-slate-200/80 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 dark:border-white/20 dark:bg-white/10 dark:text-white dark:hover:border-white/40">
          Plan actual
        </button>
      </div>

      <div className="relative rounded-3xl border border-indigo-400/50 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-sky-500/20 p-8 shadow-2xl ring-2 ring-indigo-400/30 backdrop-blur-xl">
        <div className="absolute -top-4 right-6 rounded-full bg-indigo-500 px-3 py-1 text-xs font-semibold text-white">
          Recomendado
        </div>
        <h3 className="text-xl font-semibold text-white">Pro</h3>
        <p className="mt-2 text-sm text-white/80">
          Desbloquea todos los vídeos, sin watermark y publicación automática.
        </p>
        <ol className="mt-4 space-y-3 text-sm text-white/85">
          <li className="flex items-start gap-3">
            <span>1.</span>
            <span>Clips ilimitados</span>
          </li>
          <li className="flex items-start gap-3">
            <span>2.</span>
            <span>Publicación automática a YouTube / TikTok</span>
          </li>
          <li className="flex items-start gap-3">
            <span>3.</span>
            <span>Sin watermark</span>
          </li>
          <li className="flex items-start gap-3">
            <span>4.</span>
            <span>Badge Pro visible</span>
          </li>
          <li className="flex items-start gap-3">
            <span>5.</span>
            <span>Análisis avanzado de viralidad</span>
          </li>
          <li className="flex items-start gap-3">
            <span>6.</span>
            <span>Prioridad en generación de clips</span>
          </li>
        </ol>
        <button
          onClick={handleCheckout}
          disabled={loading}
          className="mt-6 w-full rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-slate-900 transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? "Redirigiendo..." : "Sube a Pro ahora"}
        </button>
        {error && <p className="mt-3 text-xs text-amber-200">{error}</p>}
      </div>
    </div>
  );
}
