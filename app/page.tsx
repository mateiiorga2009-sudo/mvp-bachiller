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
      return setError("El enlace no parece válido. Usa un enlace de YouTube.");

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
    !loading &&
    data !== null &&
    (!data.summary || data.flashcards?.length === 0);

  return (
    <section className="flex flex-col gap-10 p-6 md:p-12">
      <header className="text-center space-y-4">
        <h1 className="text-4xl font-bold md:text-5xl">Convierte videos en resúmenes claros</h1>
        <p className="text-white/80 md:text-lg max-w-2xl mx-auto">
          Pega el enlace de YouTube y obtén un resumen breve junto con flashcards para repasar.
        </p>
      </header>

      <div className="mx-auto max-w-3xl space-y-5 rounded-3xl border border-white/20 bg-white/10 p-6 shadow-xl backdrop-blur">
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://www.youtube.com/watch?v=..."
          className="w-full rounded-2xl border border-white/20 bg-black/30 px-4 py-3 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-pink-300/40"
        />
        <button
          onClick={handleGenerate}
          disabled={loading}
          className="mt-2 w-full rounded-2xl bg-gradient-to-r from-pink-400 via-purple-500 to-blue-500 px-6 py-3 font-semibold text-white shadow-lg transition hover:scale-[1.02] disabled:opacity-70"
        >
          {loading ? "Generando..." : "Generar resumen y flashcards"}
        </button>
        {error && <p className="text-amber-200 mt-2">{error}</p>}
      </div>

      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <article className="rounded-3xl border border-white/15 bg-white/10 p-6 shadow-xl backdrop-blur">
          <h2 className="text-xl font-semibold">Resumen generado</h2>
          <p className="mt-3 text-white/80">
            {loading
              ? "Generando resumen con IA simulada..."
              : data?.summary ??
                "Aquí aparecerá un resumen breve con los puntos clave del video."}
          </p>
        </article>

        <aside className="rounded-3xl border border-white/15 bg-white/10 p-6 shadow-xl backdrop-blur">
          <h2 className="text-xl font-semibold">Flashcards</h2>
          <div className="mt-4 space-y-4">
            {(data?.flashcards ?? Array.from({ length: 3 })).map((card, i) => (
              <div
                key={card ? card.question : i}
                className="rounded-2xl border border-white/15 bg-black/30 p-4"
              >
                <p className="font-semibold text-white/90">{card?.question ?? `Pregunta ${i + 1}`}</p>
                <p className="text-white/70 mt-1">{card?.answer ?? "Respuesta breve."}</p>
              </div>
            ))}
          </div>
        </aside>
      </section>

      {missingResult && (
        <div className="rounded-3xl border border-amber-200/40 bg-amber-200/10 p-5 text-center text-amber-100">
          No pudimos generar resultados. Intenta nuevamente.
        </div>
      )}
    </section>
  );
}
