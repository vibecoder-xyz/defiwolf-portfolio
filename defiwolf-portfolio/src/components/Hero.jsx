// Nav, glow background, giant heading, tagline and CTA. (The portrait now lives in the About section.)
import { content } from "../data/content.js";
import { FadeIn } from "./motion.jsx";
import { ContactButton, ImageSlot } from "./ui.jsx";

export default function Hero({ onNavigate }) {
  const { hero, nav } = content;

  // Heading: one line on tablet/desktop; on phones it wraps to two big lines ("Hi, I'm" / "Wolf")
  // so it fills the width instead of sitting small.
  const headingClass =
    "hero-heading font-black uppercase tracking-tight text-center w-full pointer-events-none " +
    "whitespace-normal leading-[0.85] text-[30vw] " +
    "sm:whitespace-nowrap sm:leading-none sm:text-[15vw] md:text-[16vw] lg:text-[17.5vw]";

  return (
    // h-svh (not h-screen) so the phone's address bar doesn't push content off-screen.
    // Phones: content stacks from the top. sm and up: spread top-to-bottom.
    <section className="relative h-svh w-full flex flex-col justify-start sm:justify-between overflow-x-clip bg-ink select-none">
      {/* Background: soft light glow over a black-to-surface fade. */}
      <div aria-hidden="true" className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(60% 55% at 50% 62%, color-mix(in srgb, var(--color-mist) 9%, transparent) 0%, transparent 75%), linear-gradient(180deg, var(--color-ink) 0%, var(--color-surface) 100%)",
        }} />

      <FadeIn delay={0} y={-20} duration={0.8}>
        <header className="w-full flex justify-between items-center px-6 md:px-10 pt-6 md:pt-8 z-30 relative">
          {nav.map((item) => (
            <button key={item} onClick={() => onNavigate(item.toLowerCase())}
              className="text-mist font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem] hover:opacity-70 transition-opacity duration-200 cursor-pointer">
              {item}
            </button>
          ))}
        </header>
      </FadeIn>

      <div className="relative w-full overflow-hidden z-10 mt-[12svh] sm:mt-4 md:-mt-5">
        <FadeIn delay={0.15} y={40} duration={0.8}>
          <h1 className={headingClass}>{hero.heading}</h1>
        </FadeIn>
      </div>

      {/* mt-auto pins this row to the bottom on phones. */}
      <div className="w-full px-6 md:px-10 pb-7 sm:pb-8 md:pb-10 flex justify-between items-end z-30 mt-auto sm:mt-0">
        <FadeIn delay={0.35} y={20} duration={0.8}>
          <p className="text-mist font-light uppercase tracking-wide leading-snug max-w-[160px] sm:max-w-[220px] md:max-w-[260px] text-[clamp(0.75rem,1.4vw,1.5rem)]">
            {hero.tagline}
          </p>
        </FadeIn>
        <FadeIn delay={0.5} y={20} duration={0.8}>
          <ContactButton label={hero.button} onClick={() => onNavigate("contact")} />
        </FadeIn>
      </div>
    </section>
  );
}