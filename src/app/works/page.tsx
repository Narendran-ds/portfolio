import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import WorksGrid from "@/components/WorksGrid";

export const metadata: Metadata = {
  title: "Works — Narendran L",
  description: "Every project by Narendran L — full-stack products, ML systems, GenAI pipelines, and the practice logs in between.",
};

export default function WorksPage() {
  return (
    <main style={{ background: "var(--paper)", minHeight: "100vh" }}>
      <Navbar solid />
      <WorksGrid />
    </main>
  );
}
