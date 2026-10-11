// About: heading, profile picture, scroll-lit paragraph, CTA, optional corner graphics.
import { content } from "../data/content.js";
import { AnimatedText, FadeIn } from "./motion.jsx";
import { ContactButton, ImageSlot } from "./ui.jsx";

const Decor = ({ src, x, pos, size, pulse }) =>
  src ? (
    <FadeIn delay={0.15} x={x} y={0} duration={0.9} className={`absolute z-10 pointer-events-none ${pos}`}>
      <img src={src} alt="" className={`${size} h-auto object-contain drop-shadow-xl ${pulse ? "animate-pulse" : ""}`}
        style={pulse ? { animationDuration: pulse } : undefined} />
    </FadeIn>
  ) : null;

export default function About({ onContactClick }) {
  const { about } = content;
  const d = about.decor ?? {};
  return (
    <section id="about" className="relative min-h-screen w-full bg-ink flex flex-col items-center justify-center px-5 sm:px-8 md:px-10 py-20 overflow-hidden">
      <Decor src={d.moon} x={-80} pulse="6s" pos="top-[4%] left-[1%] sm:left-[2%] md:left-[4%]" size="w-[120px] sm:w-[160px] md:w-[210px]" />
      <Decor src={d.sphere} x={-80} pos="bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%]" size="w-[100px] sm:w-[140px] md:w-[180px]" />
      <Decor src={d.lego} x={80} pulse="8s" pos="top-[4%] right-[1%] sm:right-[2%] md:right-[4%]" size="w-[120px] sm:w-[160px] md:w-[210px]" />
      <Decor src={d.group} x={80} pos="bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%]" size="w-[130px] sm:w-[170px] md:w-[220px]" />

      <div className="max-w-4xl text-center z-20 flex flex-col items-center gap-10 sm:gap-14 md:gap-16">
        <FadeIn delay={0} y={40} duration={0.8}>
          <h2 className="hero-heading font-black uppercase leading-none tracking-tight text-[clamp(3rem,12vw,160px)]">{about.heading}</h2>
        </FadeIn>

        {/* Profile picture: square frame with a thick ash-grey border. */}
        <FadeIn delay={0.1} y={30} duration={0.8}>
          <div className="aspect-square w-[min(70vw,320px)] overflow-hidden rounded-3xl border-8 border-line bg-surface">
            <ImageSlot src={about.portrait} alt={about.portraitAlt} label={about.portraitLabel}
              className="object-top saturate-0 contrast-110" />
          </div>
        </FadeIn>

        <div className="px-2 sm:px-6">
          <AnimatedText text={about.body}
            className="text-mist font-medium leading-relaxed max-w-[560px] text-[clamp(1rem,2vw,1.35rem)] text-center mx-auto" />
        </div>
        <FadeIn delay={0.2} y={30} duration={0.8} className="mt-6 sm:mt-10">
          <ContactButton label={about.button} onClick={onContactClick} />
        </FadeIn>
      </div>
    </section>
  );
}