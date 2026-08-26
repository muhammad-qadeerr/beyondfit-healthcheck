import type { Metadata } from "next";
import "@fontsource-variable/manrope";
import "@fontsource/cormorant-garamond/600.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Gratis Health Check | BeyondFit",
  description:
    "Ontdek in 15 minuten waar je staat met een InBody-meting en persoonlijk advies van BeyondFit.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="nl">
      <body>{children}</body>
    </html>
  );
}