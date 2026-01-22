"use client";

import { useEffect, useState } from "react";

const CONSENT_KEY = "cookie-consent";

const getCookie = (name: string) => {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
  return match ? decodeURIComponent(match[2]) : null;
};

const setCookie = (name: string, value: string, days = 365) => {
  if (typeof document === "undefined") return;
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(
    value
  )}; expires=${expires}; path=/; SameSite=Lax`;
};

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = getCookie(CONSENT_KEY);
    if (!consent) {
      setVisible(true);
    }
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-4 z-50 mx-auto w-[min(92vw,48rem)]">
      <div className="flex flex-col gap-4 rounded-2xl border border-slate-200/80 bg-white/95 p-4 shadow-xl backdrop-blur dark:border-white/15 dark:bg-white/10 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-slate-700 dark:text-white/80">
          Usamos cookies para mejorar tu experiencia. Aceptas?
        </p>
        <div className="flex flex-col gap-2 sm:flex-row">
          <button
            onClick={() => {
              setCookie(CONSENT_KEY, "rejected");
              setVisible(false);
            }}
            className="rounded-xl border border-slate-200/80 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300 dark:border-white/20 dark:bg-white/5 dark:text-white/80 dark:hover:border-white/40"
          >
            Rechazar
          </button>
          <button
            onClick={() => {
              setCookie(CONSENT_KEY, "accepted");
              setVisible(false);
            }}
            className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90 dark:bg-white dark:text-slate-900"
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
}
