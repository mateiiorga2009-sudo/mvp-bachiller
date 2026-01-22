"use client";

import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/login" })}
      className="w-full rounded-2xl border border-slate-200/80 bg-white/70 px-4 py-3 text-center text-sm text-slate-600 transition hover:border-slate-300 hover:text-slate-900 dark:border-white/15 dark:bg-white/5 dark:text-white/70 dark:hover:border-white/30 dark:hover:text-white"
    >
      Cerrar sesión
    </button>
  );
}
