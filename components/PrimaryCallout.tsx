"use client";

import Link from "next/link";

type PrimaryCalloutProps = {
  title: string;
  description: string;
  ctaLabel?: string;
  ctaHref?: string;
  icon?: string;
};

export default function PrimaryCallout({
  title,
  description,
  ctaLabel,
  ctaHref,
  icon = "✨"
}: PrimaryCalloutProps) {
  return (
    <div className="rounded-3xl border border-indigo-400/40 bg-gradient-to-r from-indigo-500/15 via-purple-500/15 to-sky-500/15 p-6 shadow-lg ring-1 ring-indigo-400/30 backdrop-blur-xl">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-indigo-400/40 bg-white/10 text-2xl text-white">
            {icon}
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-white/70">
              Empieza aquí
            </p>
            <h3 className="mt-2 text-xl font-semibold text-white">{title}</h3>
            <p className="mt-2 text-sm text-white/70">{description}</p>
          </div>
        </div>
        {ctaLabel && ctaHref && (
          <Link
            href={ctaHref}
            className="w-full rounded-2xl bg-white px-5 py-3 text-center text-sm font-semibold text-slate-900 transition hover:opacity-90 sm:w-auto"
          >
            {ctaLabel}
          </Link>
        )}
      </div>
    </div>
  );
}
