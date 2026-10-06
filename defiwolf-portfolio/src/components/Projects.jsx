// Sticky stacking project cards + the details popup.
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { content } from "../data/content.js";
import { FadeIn } from "./motion.jsx";
import { ImageSlot, LiveProjectButton } from "./ui.jsx";

const STACK_OFFSET = 28; // px each card sits lower than the previous one. 0 = fully overlapped like the source.
const frame = "rounded-[30px] sm:rounded-[40px] md:rounded-[50px] overflow-hidden border border-white/10";

const ProjectCard = ({ project, index, total, progress, onSelect }) => {
  const { cardButton, imageLabels } = content.projects;
  const targetScale = 1 - (total - 1 - index) * 0.03;
  const scale = useTransform(progress, [index / total, 1], [1, targetScale]);
  const slot = (n) => (
    <ImageSlot src={project.images[n]} alt={project.alts[n]} label={imageLabels[n]}
      className="hover:scale-105 transition-transform duration-700" />
  );
  // The offset lives on the sticky wrapper (on a non-positioned element it did nothing in the source).
  // Height = viewport minus top offsets, so the last card lands exactly when scroll progress reaches 1.
  return (
    <div
      className="sticky flex items-center justify-center [--stack-top:6rem] md:[--stack-top:8rem]"
      style={{
        top: `calc(var(--stack-top) + ${index * STACK_OFFSET}px)`,
        height: `calc(100svh - var(--stack-top) - ${(total - 1) * STACK_OFFSET}px)`,
      }}
    >
      <motion.article
        style={{ scale, transformOrigin: "top center" }}
        className="w-full h-full rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 border-mist bg-ink p-4 sm:p-6 md:p-8 flex flex-col justify-between shadow-2xl overflow-hidden relative"
      >
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 sm:pb-6 border-b border-mist/20">
          <div className="flex items-center gap-4 sm:gap-8">
            <span className="font-black text-3xl sm:text-5xl md:text-6xl text-mist">{project.num}</span>
            <div>
              <span className="text-xs sm:text-sm uppercase tracking-widest text-mist/60 block font-light">{project.status}</span>
              <h3 className="font-medium uppercase text-xl sm:text-2xl md:text-3xl text-mist">{project.title}</h3>
            </div>
          </div>
          <LiveProjectButton label={cardButton} onClick={() => onSelect(project)} />
        </div>
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 pt-4 sm:pt-6 h-full overflow-hidden">
          <div className="lg:col-span-5 flex flex-col gap-4 sm:gap-6 h-full">
            <div className={`${frame} h-[clamp(130px,16vw,230px)]`}>{slot(0)}</div>
            <div className={`${frame} flex-1 h-[clamp(160px,22vw,340px)]`}>{slot(1)}</div>
          </div>
          <div className="lg:col-span-7 h-full min-h-[220px]">
            <div className={`${frame} h-full w-full`}>{slot(2)}</div>
          </div>
        </div>
      </motion.article>
    </div>
  );
};

export function ProjectsSection({ onSelectProject }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const { heading, items } = content.projects;
  return (
    <section id="projects" className="bg-ink rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 pt-16 sm:pt-20 pb-32 px-4 sm:px-8 md:px-10 relative z-30">
      <div className="max-w-6xl mx-auto mb-16 text-center">
        <FadeIn delay={0} y={30}>
          {/* 9vw (not 12vw) so "Now Building" stays on one line */}
          <h2 className="hero-heading font-black uppercase leading-none tracking-tight text-[clamp(2.5rem,9vw,130px)]">{heading}</h2>
        </FadeIn>
      </div>
      <div ref={ref} className="max-w-6xl mx-auto relative flex flex-col gap-12 sm:gap-20">
        {items.map((p, i) => (
          <ProjectCard key={p.num} project={p} index={i} total={items.length} progress={scrollYProgress} onSelect={onSelectProject} />
        ))}
      </div>
    </section>
  );
}

export function ProjectModal({ project, onClose }) {
  const { imageLabels, closeButton } = content.projects;
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md" onClick={onClose}>
      <motion.div initial={{ scale: 0.9, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 30 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-ink border-2 border-mist/30 rounded-[30px] sm:rounded-[40px] p-6 sm:p-10 max-w-4xl w-full max-h-[90vh] overflow-y-auto text-mist relative shadow-2xl">
        <button onClick={onClose} aria-label={closeButton}
          className="absolute top-6 right-6 text-2xl font-bold hover:text-white transition-colors bg-white/10 w-10 h-10 rounded-full flex items-center justify-center">✕</button>
        <span className="text-sm uppercase tracking-widest text-mist/60 font-light block mb-2">{project.status}</span>
        <h3 className="text-3xl sm:text-5xl font-black uppercase mb-4 hero-heading">{project.title}</h3>
        <p className="text-base sm:text-xl font-light text-mist/80 mb-8 max-w-2xl">{project.desc}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {[0, 2].map((n) => (
            <div key={n} className="rounded-2xl overflow-hidden h-60">
              <ImageSlot src={project.images[n]} alt={project.alts[n]} label={imageLabels[n]} />
            </div>
          ))}
        </div>
        <div className="flex justify-end gap-4">
          <button onClick={onClose} className="px-6 py-3 rounded-full border border-white/20 hover:bg-white/10 text-sm uppercase tracking-wider">{closeButton}</button>
        </div>
      </motion.div>
    </motion.div>
  );
}
