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

export default function HomePage() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<AiResponse | null>(null);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    if (!url.trim()) {
      setError("Pega un enlace válido de YouTube para continuar.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url })
      });

      const payload = (await response.json()) as AiResponse;
      setData(payload);
    } catch (err) {
      setError("Hubo un problema simulando la IA. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex flex-1 flex-col gap-10">
      <header className="space-y-4 text-center">
        <p className="mx-auto inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm uppercase tracking-[0.2em] text-white/80">
          IA simulada · Resúmenes + Flashcards
        </p>
        <h1 className="text-4xl font-semibold leading-tight md:text-5xl">
          Convierte videos en resúmenes claros para estudiar más rápido
        </h1>
        <p className="mx-auto max-w-2xl text-base text-white/80 md:text-lg">
          Pega el enlace de YouTube y obtén un resumen breve junto con
          flashcards listas para repasar.
        </p>
      </header>

      <div className="mx-auto w-full max-w-3xl space-y-5 rounded-3xl border border-white/20 bg-white/10 p-6 shadow-2xl backdrop-blur">
        <label className="text-sm font-medium text-white/80">
          Enlace del video
        </label>
        <div className="flex flex-col gap-4 md:flex-row">
          <input
            value={url}
            onChange={(event) => setUrl(event.target.value)}
            placeholder="https://www.youtube.com/watch?v=..."
            className="w-full flex-1 rounded-2xl border border-white/20 bg-black/30 px-4 py-3 text-white placeholder:text-white/50 focus:border-white/60 focus:outline-none focus:ring-2 focus:ring-pink-300/40"
          />
          <button
            onClick={handleGenerate}
            disabled={loading}
            className="rounded-2xl bg-gradient-to-r from-pink-400 via-purple-500 to-blue-500 px-6 py-3 font-semibold text-white shadow-lg shadow-purple-500/40 transition hover:scale-[1.02] hover:shadow-purple-500/60 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? "Generando..." : "Generar resumen y flashcards"}
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

      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <article className="rounded-3xl border border-white/15 bg-white/10 p-6 shadow-xl backdrop-blur">
          <h2 className="text-xl font-semibold">Resumen generado</h2>
          <p className="mt-3 text-white/80">
            {data?.summary ??
              "Aquí aparecerá un resumen breve con los puntos clave del video."}
          </p>
        </article>

        <aside className="rounded-3xl border border-white/15 bg-white/10 p-6 shadow-xl backdrop-blur">
          <h2 className="text-xl font-semibold">Flashcards</h2>
          <div className="mt-4 space-y-4">
            {(data?.flashcards ?? Array.from({ length: 3 })).map(
              (card, index) => (
                <div
                  key={card ? card.question : index}
                  className="rounded-2xl border border-white/15 bg-black/30 p-4"
                >
                  <p className="text-sm font-semibold text-white/90">
                    {card?.question ??
                      `Pregunta ${index + 1}: concepto principal`}
                  </p>
                  <p className="mt-2 text-sm text-white/70">
                    {card?.answer ??
                      "Respuesta breve que resume el punto clave del resumen."}
                  </p>
                </div>
              )
            )}
          </div>
        </aside>
      </section>
    </section>
  );
}
