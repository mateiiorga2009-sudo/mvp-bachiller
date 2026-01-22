import "./globals.css";
import Providers from "./providers";
import CookieBanner from "@/components/CookieBanner";

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
      <body className="min-h-screen bg-slate-50 text-slate-900 dark:bg-neutral-950 dark:text-white">
        <Providers>
          {children}
          <CookieBanner />
        </Providers>
      </body>
    </html>
  );
}