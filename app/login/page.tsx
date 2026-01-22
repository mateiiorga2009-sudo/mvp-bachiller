"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";

export default function LoginPage() {
  return (
    <section className="flex h-screen items-center justify-center px-6">
      <div className="w-full max-w-xl rounded-3xl border border-slate-200/80 bg-white/90 p-8 text-center shadow-2xl backdrop-blur dark:border-white/20 dark:bg-white/10">
        <p className="text-xs uppercase tracking-[0.35em] text-slate-500 dark:text-white/70">
          Viralify
        </p>
        <h1 className="mt-4 text-3xl font-semibold text-slate-900 dark:text-white">
          Inicia sesión para acceder a tu dashboard
        </h1>
        <p className="mt-3 text-sm text-slate-600 dark:text-white/75">
          Conecta tu cuenta de Google y sincroniza tu rendimiento en YouTube y
          TikTok.
        </p>
        <button
          onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
          className="mt-8 w-full rounded-2xl bg-gradient-to-r from-pink-400 via-purple-500 to-blue-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-500/40 transition hover:scale-[1.01]"
        >
          Continuar con Google
        </button>
        <Link
          href="/"
          className="mt-6 inline-flex text-sm text-slate-600 hover:text-slate-900 dark:text-white/70 dark:hover:text-white"
        >
          Volver al inicio
        </Link>
      </div>
    </section>
  );
}
