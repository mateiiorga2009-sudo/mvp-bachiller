import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { url } = await request.json().catch(() => ({ url: "" }));

  const summary =
    "El video explica los conceptos clave con ejemplos sencillos, destacando " +
    "las ideas más importantes y cómo se conectan entre sí para facilitar el estudio.";

  const flashcards = [
    {
      question: "¿Cuál es la idea principal del video?",
      answer:
        "Presenta el tema central y lo divide en pasos claros para comprenderlo."
    },
    {
      question: "¿Qué ejemplo ayuda a entender el concepto?",
      answer:
        "Se usa un caso cotidiano para mostrar cómo aplicar la teoría."
    },
    {
      question: "¿Qué recomendación final da el video?",
      answer:
        "Repasar con frecuencia y practicar con ejercicios cortos."
    }
  ];

  return NextResponse.json({
    url,
    summary,
    flashcards
  });
}
