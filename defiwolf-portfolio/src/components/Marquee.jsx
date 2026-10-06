// Two rows of text tiles that slide in opposite directions as you scroll.
import { useEffect, useMemo, useRef, useState } from "react";
import { content } from "../data/content.js";

const Tile = ({ label, decorative }) => (
  <div aria-hidden={decorative || undefined}
    className="slot group w-[300px] h-[190px] sm:w-[380px] sm:h-[240px] md:w-[420px] md:h-[270px] flex-shrink-0 rounded-2xl overflow-hidden border border-white/5 flex items-center justify-center">
    <span className="hero-heading font-black uppercase tracking-tight text-3xl sm:text-4xl md:text-5xl text-center px-4 transition-transform duration-500 group-hover:scale-105">
      {label}
    </span>
  </div>
);

export default function Marquee() {
  const ref = useRef(null);
  const [offset, setOffset] = useState(0);
  // Each half is tripled so the row is always wider than the screen.
  const row1 = useMemo(() => { const s = content.marquee.slice(0, 5); return [...s, ...s, ...s]; }, []);
  const row2 = useMemo(() => { const s = content.marquee.slice(5, 10); return [...s, ...s, ...s]; }, []);

  useEffect(() => {
    const onScroll = () => {
      if (!ref.current) return;
      const top = window.scrollY + ref.current.getBoundingClientRect().top;
      setOffset((window.scrollY - top + window.innerHeight) * 0.3);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section ref={ref} className="bg-ink pt-24 sm:pt-32 md:pt-40 pb-10 overflow-hidden relative z-10">
      <div className="flex flex-col gap-3">
        <div className="flex gap-3 w-max" style={{ transform: `translateX(${offset - 200}px)`, willChange: "transform" }}>
          {row1.map((l, i) => <Tile key={`r1-${i}`} label={l} decorative={i >= 5} />)}
        </div>
        <div className="flex gap-3 w-max" style={{ transform: `translateX(${-(offset - 200)}px)`, willChange: "transform" }}>
          {row2.map((l, i) => <Tile key={`r2-${i}`} label={l} decorative={i >= 5} />)}
        </div>
      </div>
    </section>
  );
}
