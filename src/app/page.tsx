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
    <main style={{ background: "#060a10", width: "100%" }}>
      <Navbar />
      <ScrollyCanvas />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <TechStack />
      <Contact />
      <footer style={{ borderTop: "1px solid rgba(249,115,22,0.12)", padding: "2rem 6vw", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem", background: "#060a10" }}>
        <span style={{ color: "rgba(250,250,250,0.25)", fontSize: "0.85rem" }}>© {new Date().getFullYear()} Narendran L</span>
      </footer>
    </main>
  );
}