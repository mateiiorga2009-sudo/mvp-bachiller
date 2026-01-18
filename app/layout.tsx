import "./globals.css";

export const metadata = {
  title: "Viralify · Crecimiento para creadores",
  description:
    "Impulsa tu canal de YouTube y TikTok con análisis y estrategias virales."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-blue-950 text-white">
        <main className="mx-auto flex min-h-screen max-w-6xl flex-col px-6 py-12">
          {children}
        </main>
      </body>
    </html>
  );
}