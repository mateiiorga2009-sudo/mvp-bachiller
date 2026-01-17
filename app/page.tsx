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

  return (
    <main className="flex flex-col items-center justify-start min-h-screen bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 text-white font-inter">
      {/* Hero Section */}
      <section className="text-center py-20 px-6 max-w-4xl">
        <h1 className="text-5xl font-bold mb-4 drop-shadow-lg">
          Convierte videos de YouTube en resúmenes y flashcards
        </h1>
        <p className="text-lg text-white/80 mb-8">
          Pega el enlace de un video educativo y obtén un resumen claro y tarjetas de estudio listas para repasar.
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://www.youtube.com/watch?v=..."
            className="w-full md:w-96 px-5 py-3 rounded-full border-2 border-white/50 bg-white/20 placeholder-white/70 focus:outline-none focus:ring-4 focus:ring-pink-400 focus:border-transparent transition"
          />
          <button
            onClick={handleGenerate}
            disabled={loading}
            className="rounded-full bg-gradient-to-r from-pink-500 via-purple-600 to-blue-500 px-8 py-3 font-semibold shadow-lg shadow-purple-500/50 hover:scale-105 transition transform disabled:opacity-70"
          >
            {loading ? "Generando..." : "Generar"}
          </button>
        </div>
        {error && <p className="mt-3 text-amber-300">{error}</p>}
      </section>

      {/* Result Section */}
      <section className="grid lg:grid-cols-2 gap-8 px-6 w-full max-w-6xl pb-20">
        {/* Summary */}
        <article className="bg-white/10 border border-white/20 rounded-3xl p-6 shadow-lg backdrop-blur-lg">
          <h2 className="text-2xl font-semibold mb-4">Resumen</h2>
          {loading ? (
            <div className="space-y-3 animate-pulse">
              <div className="h-4 w-4/5 bg-white/30 rounded-full" />
              <div className="h-4 w-full bg-white/20 rounded-full" />
              <div className="h-4 w-3/4 bg-white/20 rounded-full" />
            </div>
          ) : (
            <p className="text-white/80">
              {data?.summary ?? "Aquí aparecerá un resumen breve con los puntos clave del video."}
            </p>
          )}
        </article>

        {/* Flashcards */}
        <aside className="bg-white/10 border border-white/20 rounded-3xl p-6 shadow-lg backdrop-blur-lg">
          <h2 className="text-2xl font-semibold mb-4">Flashcards</h2>
          {loading ? (
            <div className="space-y-4 animate-pulse">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-20 bg-white/20 rounded-2xl" />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {(data?.flashcards ?? Array.from({ length: 3 })).map((card, i) => (
                <div
                  key={card ? card.question : i}
                  className="bg-white/20 rounded-2xl p-4 shadow-md transform hover:scale-105 transition"
                >
                  <p className="font-semibold">{card?.question ?? `Pregunta ${i + 1}`}</p>
                  <p className="text-white/80 mt-1">{card?.answer ?? "Respuesta breve."}</p>
                </div>
              ))}
            </div>
          )}
        </aside>
      </section>
    </main>
  );
}