import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Narendran L. | Full Stack & AI Developer",
  description: "Portfolio of Narendran L — Full Stack & AI Developer building intelligent web experiences.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
