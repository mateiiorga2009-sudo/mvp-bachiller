import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resúmenes IA • Bachiller",
  description: "Genera resúmenes y flashcards desde videos de YouTube."
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-gradient-to-br from-purple-700 via-pink-600 to-blue-500 font-sans text-white">
        <div className="min-h-screen bg-black/25">
          <main className="mx-auto flex min-h-screen max-w-5xl flex-col px-6 py-14">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
