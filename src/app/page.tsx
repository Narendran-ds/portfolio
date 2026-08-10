import Navbar from "@/components/Navbar";
import ScrollyCanvas from "@/components/ScrollyCanvas";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Certifications from "@/components/Certifications";
import TechStack from "@/components/TechStack";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main style={{ background: "var(--paper)", width: "100%" }}>
      <Navbar />
      <ScrollyCanvas />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Certifications />
      <TechStack />
      <Contact />
    </main>
  );
}
