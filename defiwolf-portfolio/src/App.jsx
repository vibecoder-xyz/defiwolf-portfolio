// Page assembly + smooth-scroll nav + project popup state.
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Hero from "./components/Hero.jsx";
import Marquee from "./components/Marquee.jsx";
import About from "./components/About.jsx";
import Services from "./components/Services.jsx";
import { ProjectsSection, ProjectModal } from "./components/Projects.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  const [selected, setSelected] = useState(null);
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <main className="bg-ink min-h-screen text-mist relative">
      <Hero onNavigate={scrollTo} />
      <Marquee />
      <About onContactClick={() => scrollTo("contact")} />
      <Services />
      <ProjectsSection onSelectProject={setSelected} />
      <Footer />
      <AnimatePresence>
        {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </main>
  );
}
