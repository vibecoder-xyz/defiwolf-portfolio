// All editable copy and image paths live here. Components read from it and never hardcode text.
// Image fields: null = show a placeholder. To use an image, put the file in public/images/ and set "/images/name.png".
export const content = {
  meta: { title: "DeFiWolf -- Web Developer & Prompt Engineer" },
  email: "thedefiwolfe@gmail.com",
  nav: ["About", "Services", "Projects", "Contact"], // lowercased = section id

  hero: {
    heading: "Hi, I'm Wolf",
    tagline: "web developer by trade, prompt engineer by obsession. bold websites at the speed of thought",
    button: "Contact Me",
    portrait: "/images/potrait.jpg",
    portraitLabel: "Your portrait here",
    portraitAlt: "DeFiWolf portrait",
  },

  marquee: ["React", "Tailwind", "Prompt Design", "Claude", "Vibe Coding", "Web3", "Base", "Animation", "UI/UX", "Deploy Fast"],

  about: {
    heading: "About me",
    body: "I'm a web developer who fell for prompt engineering and never looked back. I use AI to move at the speed of thought, and I use real development skills to make sure what I ship is clean, fast, and built to last. Let's make something bold.",
    button: "Contact Me",
    // Corner 3D graphics carried over from the source file (remote URLs, not yours). Replace, or set to null to remove.
    decor: {
      moon: "https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png",
      sphere: "https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png",
      lego: "https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png",
      group: "https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png",
    },
  },

  services: {
    heading: "Services",
    items: [
      { num: "01", title: "Web Development", desc: "Fast, responsive websites built from scratch with clean code, from landing pages to full multi-page sites, ready to launch and easy to grow." },
      { num: "02", title: "Prompt Engineering", desc: "Custom prompts and AI workflows that get reliable, high-quality output from tools like Claude and ChatGPT, tailored to your product or team." },
      { num: "03", title: "AI-Assisted Prototyping", desc: "Turn a rough idea into a working prototype in days, not weeks, so you can test it, show it, and refine it before committing to a full build." },
      { num: "04", title: "Landing Pages", desc: "Sharp, conversion-focused pages with bold layouts and smooth animations, designed to make a strong first impression and get people to act." },
      { num: "05", title: "Website Redesign", desc: "Give an outdated site a modern look, better performance, and a smoother user experience without starting your business over." },
    ],
  },

  projects: {
    heading: "Now Building",
    cardButton: "View Details",
    closeButton: "Close",
    imageLabels: ["Screenshot 1", "Screenshot 2", "Main screenshot"],
    items: [
      {
        num: "01", title: "SiteForge", status: "In Progress",
        desc: "An AI website builder that works like a team of specialists. One model interviews you about your goals, audience, and product, then asks the technical questions on design, stack, and UX. Your answers become prompts for a code model that writes the site, shows you a live preview, and iterates until you're happy to deploy.",
        images: [null, null, null], // [screenshot 1, screenshot 2, main]
        alts: ["SiteForge preview 1", "SiteForge preview 2", "SiteForge main preview"],
      },
      {
        num: "02", title: "BaseArb", status: "In Ideation",
        desc: "An arbitrage bot concept for the Base ecosystem, designed to spot price gaps across decentralized exchanges and act on them automatically. Still in the research and planning phase.",
        images: [null, null, null],
        alts: ["BaseArb preview 1", "BaseArb preview 2", "BaseArb main preview"],
      },
    ],
  },

  footer: {
    heading: "Let's build together",
    subtext: "Available for freelance web development, prompt engineering & AI-powered builds, worldwide.",
    button: "Contact Me", // opens mailto:email
    copyright: "DEFIWOLF WEB DEVELOPER & PROMPT ENGINEER. ALL RIGHTS RESERVED.", // "© {year} " is prepended in Footer.jsx
    links: ["ABOUT", "SERVICES", "PROJECTS"], // lowercased = section id
  },
};
