// Nav, glow background, giant heading behind AND (ghosted) in front of the portrait, tagline and CTA.
// Layers (back to front): background z-0, heading z-10, portrait z-20, ghost heading z-[25], nav/tagline/CTA z-30.
import { content } from "../data/content.js";
import { FadeIn, Magnet } from "./motion.jsx";
import { ContactButton, ImageSlot } from "./ui.jsx";

export default function Hero({ onNavigate }) {
  const { hero, nav } = content;

  // Heading: one line on tablet/desktop; on phones it wraps to two big lines ("Hi, I'm" / "Wolf")
  // so it fills the width instead of sitting small in the middle.
  const headingClass =
    "hero-heading font-black uppercase tracking-tight text-center w-full pointer-events-none " +
    "whitespace-normal leading-[0.85] text-[30vw] " +
    "sm:whitespace-nowrap sm:leading-none sm:text-[15vw] md:text-[16vw] lg:text-[17.5vw]";

  // Blue tint that follows the portrait file's shape (a mask), so only the person is colored.
  const tintMask = hero.portrait
    ? {
        WebkitMaskImage: `url(${hero.portrait})`,
        maskImage: `url(${hero.portrait})`,
        maskSize: "contain",
        maskPosition: "center bottom",
        maskRepeat: "no-repeat",
      }
    : undefined;

  return (
    // h-svh (not h-screen) so the phone's address bar doesn't push content off-screen.
    // Phones: content stacks from the top. sm and up: spread top-to-bottom, as before.
    <section className="relative h-svh w-full flex flex-col justify-start sm:justify-between overflow-x-clip bg-ink select-none">
      {/* Background: blue glow behind the portrait over a black-to-navy fade. */}
      <div aria-hidden="true" className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(60% 55% at 50% 62%, rgb(37 99 235 / 0.45) 0%, rgb(30 58 138 / 0.25) 40%, transparent 75%), linear-gradient(180deg, var(--color-ink) 0%, var(--color-tile-2) 100%)",
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

      {/* Portrait: pinned to the bottom, in front of the solid heading (z-20).
          Phones: up to 78% of screen height, never wider than the screen. Tablet/desktop: 70% height.
          The mask fades the bottom edge into the glow. */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-0 z-20 pointer-events-auto">
        <FadeIn delay={0.6} y={30} duration={0.9}>
          <Magnet padding={150} strength={3}>
            <div className="relative aspect-[3/4] w-[min(calc(78svh*0.75),100vw)] sm:w-[calc(70svh*0.75)] drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
              style={{ WebkitMaskImage: "linear-gradient(to bottom, #000 82%, transparent 100%)", maskImage: "linear-gradient(to bottom, #000 82%, transparent 100%)" }}>
              {/* rounded-[2.5rem] suits a rectangular JPG. Remove it from both lines if you switch to a cutout PNG. */}
              <ImageSlot src={hero.portrait} alt={hero.portraitAlt} label={hero.portraitLabel}
                fit="contain" className="rounded-[2.5rem] object-bottom saturate-50 contrast-110" />
              {hero.portrait && (
                <div aria-hidden="true" style={tintMask}
                  className="absolute inset-0 rounded-[2.5rem] bg-wolf-deep mix-blend-color opacity-60 pointer-events-none" />
              )}
            </div>
          </Magnet>
        </FadeIn>
      </div>

      {/* Heading = two stacked copies. Back copy (z-10): solid, behind the portrait.
          Front copy (z-[25]): in front of the portrait at 40% opacity, so it shows through over the photo.
          z-index sits on FadeIn because its transform creates its own stacking layer.
          mt-[12svh] drops the phone heading so its second line sits behind the portrait's head. */}
      <div className="relative w-full overflow-hidden mt-[12svh] sm:mt-4 md:-mt-5">
        <FadeIn delay={0.15} y={40} duration={0.8} className="relative z-10">
          <h1 className={headingClass}>{hero.heading}</h1>
        </FadeIn>
        <FadeIn delay={0.15} y={40} duration={0.8} className="absolute inset-0 z-[25] pointer-events-none">
          <h1 aria-hidden="true" className={`${headingClass} opacity-70`}>{hero.heading}</h1>
        </FadeIn>
      </div>

      {/* mt-auto pins this row to the bottom on phones (the section no longer spreads its children there). */}
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