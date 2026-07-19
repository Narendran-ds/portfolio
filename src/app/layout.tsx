import type { Metadata } from "next";
import { Archivo, Fraunces, Space_Grotesk, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import SmoothScroll from "@/components/SmoothScroll";

const display = Archivo({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
  variable: "--font-display",
});

const serif = Fraunces({
  subsets: ["latin"],
  weight: "variable",
  variable: "--font-serif",
  axes: ["opsz"],
});

const grotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-grotesk",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Narendran L — AI Engineer & Full Stack Developer",
  description:
    "Portfolio of Narendran L — AI engineer and full-stack developer from Chennai. Builder of ZipForgeX, ChainSight and explainable ML systems.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${serif.variable} ${grotesk.variable} ${mono.variable}`}>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#F2EEE3" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Narendran L." />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
      </head>

      <body className="grain">
        <SmoothScroll />
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
