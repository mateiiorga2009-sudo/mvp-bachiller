import "./globals.css";
import Providers from "./providers";

export const metadata = {
  title: "Viralify",
  description: "Convierte videos en clips virales para YouTube y TikTok"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-neutral-950 text-white">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}