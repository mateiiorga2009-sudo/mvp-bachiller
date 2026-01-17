import "./globals.css";

export const metadata = {
  title: "MVP Bachiller · Resúmenes y Flashcards",
  description: "Convierte videos en resúmenes claros y flashcards listas para estudiar.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="bg-gradient-to-b from-purple-800 via-pink-800 to-blue-900 text-white min-h-screen">
        {children}
      </body>
    </html>
  );
}