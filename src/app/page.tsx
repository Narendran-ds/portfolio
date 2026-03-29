import Navbar from "@/components/Navbar";
import ScrollyCanvas from "@/components/ScrollyCanvas";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import TechStack from "@/components/TechStack";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main style={{ background: "#0a0f1e", width: "100%" }}>
      <Navbar />
      <ScrollyCanvas />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <TechStack />
      <Contact />
      <footer style={{ borderTop: "1px solid rgba(29,184,160,0.15)", padding: "2rem 6vw", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
        <span style={{ color: "rgba(232,234,240,0.3)", fontSize: "0.85rem" }}>© {new Date().getFullYear()} Narendran L.</span>
        <span style={{ color: "rgba(232,234,240,0.2)", fontSize: "0.8rem", letterSpacing: "0.1em" }}>BUILT WITH NEXT.JS + FRAMER MOTION</span>
      </footer>
    </main>
  );
}
