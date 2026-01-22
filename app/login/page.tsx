import Link from "next/link";
import { Suspense } from "react";
import LoginClient from "./LoginClient";

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
        <Suspense fallback={null}>
          <LoginClient />
        </Suspense>
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
