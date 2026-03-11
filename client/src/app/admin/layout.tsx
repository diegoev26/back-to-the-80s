import React from "react";
import type { Metadata } from "next";
import "./globals.css";
import GlobalContextProvider from "./_context/global.context";
import { ModalProvider } from "./_context/modal.context";

export const metadata: Metadata = {
  title: "Template Admin APP",
  description: "Backoffice",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        <GlobalContextProvider>
          <ModalProvider>{children}</ModalProvider>
        </GlobalContextProvider>
      </body>
    </html>
  );
}
