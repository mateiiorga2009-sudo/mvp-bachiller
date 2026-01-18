"use client";

import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/login" })}
      className="w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-center text-sm text-white/70 transition hover:border-white/30 hover:text-white"
    >
      Cerrar sesión
    </button>
  );
}
