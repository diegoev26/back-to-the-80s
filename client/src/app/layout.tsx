import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Fiesta Back to the 80s",
  description: "La mejor fiesta 80s de Latinoamerica",
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <meta name="apple-mobile-web-app-title" content="BackToThe80s" />
      <body>
        {children}
        <Footer />
      </body>
    </html>
  );
}
