// Services list on the light "paper" panel. id="services" is the nav/footer anchor.
import { content } from "../data/content.js";
import { FadeIn } from "./motion.jsx";

export default function Services() {
  const { heading, items } = content.services;
  return (
    <section id="services" className="bg-paper text-ink rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 relative z-20">
      <div className="max-w-6xl mx-auto">
        <FadeIn delay={0} y={30}>
          <h2 className="font-black uppercase text-center text-ink text-[clamp(3rem,12vw,160px)] leading-none mb-16 sm:mb-20 md:mb-28">{heading}</h2>
        </FadeIn>
        <div className="max-w-5xl mx-auto flex flex-col">
          {items.map((item, i) => (
            <FadeIn key={item.num} delay={i * 0.1} y={30}>
              <div className="py-8 sm:py-10 md:py-12 border-t border-ink/15 flex flex-col md:flex-row md:items-start justify-between gap-4 md:gap-12 hover:bg-white/50 transition-colors px-2 sm:px-4 rounded-xl">
                <div className="font-black text-[clamp(3rem,10vw,140px)] leading-none text-ink select-none min-w-[140px]">{item.num}</div>
                <div className="flex flex-col gap-2 md:gap-4 flex-1 pt-2 md:pt-4">
                  <h3 className="font-medium uppercase text-[clamp(1rem,2.2vw,2.1rem)] tracking-tight text-ink">{item.title}</h3>
                  <p className="font-light leading-relaxed max-w-2xl text-[clamp(0.85rem,1.6vw,1.25rem)] text-ink/60">{item.desc}</p>
                </div>
              </div>
            </FadeIn>
          ))}
          <div className="border-t border-ink/15 w-full"></div>
        </div>
      </div>
    </section>
  );
}
