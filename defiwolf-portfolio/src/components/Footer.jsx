// Contact footer (id="contact"). The button and the email link both open a mailto.
import { content } from "../data/content.js";
import { ContactButton } from "./ui.jsx";

export default function Footer() {
  const { footer, email } = content;
  return (
    <footer id="contact" className="bg-ink text-mist py-16 px-6 md:px-10 border-t border-white/10 relative z-30">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div>
          <h4 className="text-2xl sm:text-4xl font-black uppercase hero-heading mb-2">{footer.heading}</h4>
          <p className="text-sm sm:text-base font-light text-mist/60">{footer.subtext}</p>
          <a href={`mailto:${email}`} className="inline-block mt-3 text-sm sm:text-base text-wolf-light hover:text-white transition-colors">{email}</a>
        </div>
        <ContactButton label={footer.button} onClick={() => { window.location.href = `mailto:${email}`; }} />
      </div>
      <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center text-xs text-mist/40 gap-4">
        <p>© {new Date().getFullYear()} {footer.copyright}</p>
        <div className="flex gap-6">
          {footer.links.map((l) => <a key={l} href={`#${l.toLowerCase()}`} className="hover:text-white">{l}</a>)}
        </div>
      </div>
    </footer>
  );
}
