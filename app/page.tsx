"use client";

import { useState } from "react";

type Flashcard = {
  question: string;
  answer: string;
};

type AiResponse = {
  summary: string;
  flashcards: Flashcard[];
};

const isValidYouTubeUrl = (value: string) => {
  try {
    const parsed = new URL(value);
    const host = parsed.hostname.replace("www.", "").toLowerCase();

    if (host === "youtu.be") return parsed.pathname.length > 1;
    if (host !== "youtube.com" && host !== "m.youtube.com") return false;

    return parsed.pathname.startsWith("/watch") && parsed.searchParams.has("v");
  } catch {
    return false;
  }
};

export default function HomePage() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<AiResponse | null>(null);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    if (!url.trim()) return setError("Pega un enlace de YouTube para continuar.");
    if (!isValidYouTubeUrl(url.trim()))
      return setError("El enlace no parece válido. Usa un enlace de YouTube correcto.");

    setError("");
    setLoading(true);
    setData(null);

    try {
      const response = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) throw new Error("Respuesta inválida");

      const payload = (await response.json()) as AiResponse;
      setData(payload);
    } catch {
      setError("Hubo un problema simulando la IA. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  const missingResult =
    !loading && data !== null && (!data.summary || data.flashcards?.length === 0);

  return (
    <section className="flex flex-1 flex-col gap-10 font-inter">
      {/* Header */}
      <header className="space-y-4 text-center">
        <p className="mx-auto inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm uppercase tracking-[0.2em] text-white/80">
          IA simulada · Resúmenes + Flashcards
        </p>
        <h1 className="text-4xl font-semibold leading-tight md:text-5xl">
          Convierte videos en resúmenes claros para estudiar más rápido
        </h1>
        <p className="mx-auto max-w-2xl text-base text-white/80 md:text-lg">
          Pega el enlace de YouTube y obtén un resumen breve junto con flashcards listas para repasar.
        </p>
      </header>

      {/* Input y botón */}
      <div className="mx-auto w-full max-w-3xl space-y-5 rounded-3xl border border-white/20 bg-white/10 p-6 md:p-8 shadow-2xl backdrop-blur">
        <label className="text-sm font-medium text-white/80">Enlace del video</label>
        <div className="flex flex-col gap-4 md:flex-row">
          <input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://www.youtube.com/watch?v=..."
            className="w-full flex-1 rounded-2xl border border-white/20 bg-black/30 px-4 py-3 text-white placeholder:text-white/50 focus:border-white/60 focus:outline-none focus:ring-2 focus:ring-pink-300/40"
          />
          <button
            onClick={handleGenerate}
            disabled={loading}
            className="rounded-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 px-6 py-3 font-semibold text-white shadow-lg shadow-purple-500/40 transition hover:scale-[1.02] hover:shadow-purple-500/60 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? (
              <div className="flex items-center gap-3">
                <div className="h-5 w-5 animate-spin rounded-full border-4 border-t-white border-white/30" />
                <span>Generando...</span>
              </div>
            ) : (
              "Generar resumen y flashcards"
            )}
          </button>
        </div>
        {error ? (
          <p className="text-sm text-amber-200">{error}</p>
        ) : (
          <p className="text-sm text-white/70">
            Sugerencia: prueba con un video educativo de 5 a 15 minutos.
          </p>
        )}
      </div>

      {/* Resumen y Flashcards */}
      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <article className="relative overflow-hidden rounded-3xl border border-white/15 bg-white/10 p-6 shadow-xl backdrop-blur">
          <h2 className="text-xl font-semibold">Resumen generado</h2>
          {loading ? (
            <div className="mt-4 space-y-3">
              <div className="h-3 w-4/5 animate-pulse rounded-full bg-white/30" />
              <div className="h-3 w-full animate-pulse rounded-full bg-white/20" />
              <div className="h-3 w-3/4 animate-pulse rounded-full bg-white/20" />
              <div className="mt-4 inline-flex items-center gap-3 rounded-2xl bg-white/10 px-4 py-2 text-sm text-white/80">
                <span className="relative flex h-3 w-3">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-pink-300 opacity-70" />
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-pink-200" />
                </span>
                Generando resumen con IA simulada...
              </div>
            </div>
          ) : (
            <p className="mt-3 text-white/80">
              {data?.summary ?? "Aquí aparecerá un resumen breve con los puntos clave del video."}
            </p>
          )}
        </article>

        {/* Flashcards flip */}
        <aside className="grid gap-4">
          <h2 className="text-xl font-semibold">Flashcards</h2>
          {loading ? (
            <div className="mt-4 space-y-4">
              {Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className="rounded-2xl border border-white/10 bg-black/20 p-4 h-24 animate-pulse"
                />
              ))}
            </div>
          ) : (
            <div className="mt-4 grid gap-4">
              {(data?.flashcards ?? Array.from({ length: 3 })).map((card, index) => (
                <div key={index} className="group perspective-1000 h-32">
                  <div className="relative h-full w-full transition-transform duration-500 transform-style-preserve-3d group-hover:rotate-y-180">
                    {/* Pregunta */}
                    <div className="absolute backface-hidden h-full w-full rounded-2xl border border-white/15 bg-black/30 p-4">
                      <p className="text-sm font-semibold text-white/90">
                        {card?.question ?? `Pregunta ${index + 1}`}
                      </p>
                    </div>
                    {/* Respuesta */}
                    <div className="absolute rotate-y-180 backface-hidden h-full w-full rounded-2xl border border-white/15 bg-blue-700/40 p-4">
                      <p className="text-sm text-white/80">{card?.answer ?? "Respuesta"}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </aside>
      </section>

      {missingResult && (
        <div className="rounded-3xl border border-amber-200/40 bg-amber-200/10 p-5 text-center text-sm text-amber-100">
          No pudimos generar resultados esta vez. Intenta nuevamente con otro enlace o revisa tu conexión.
        </div>
      )}
    </section>
  );
}