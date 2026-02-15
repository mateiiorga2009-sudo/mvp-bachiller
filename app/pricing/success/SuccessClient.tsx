"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function SuccessClient() {
  useEffect(() => {
    window.localStorage.setItem("isPro", "true");
    window.localStorage.setItem("stripeCustomerId", "mock_customer_id");
  }, []);

  return (
    <div className="rounded-3xl border border-emerald-400/40 bg-emerald-400/10 p-8 text-center shadow-2xl backdrop-blur-xl">
      <h1 className="text-3xl font-semibold text-white">
        ¡Bienvenido a Viralify Pro!
      </h1>
      <p className="mt-3 text-sm text-white/80">
        Tu suscripción se activó correctamente. Ya tienes acceso a las
        funciones Pro.
      </p>
      <Link
        href="/dashboard"
        className="mt-6 inline-flex rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:opacity-90"
      >
        Ir al dashboard
      </Link>
    </div>
  );
}
