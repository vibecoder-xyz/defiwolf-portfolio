// Framer Motion helpers (kept from the source file; animation behavior unchanged).
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// Fade + slide in once when scrolled into view.
export const FadeIn = ({ children, delay = 0, duration = 0.7, x = 0, y = 30, className = "", as = "div" }) => {
  const Component = motion[as] || motion.div;
  return (
    <Component
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "50px", amount: 0 }}
      transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </Component>
  );
};

// Element drifts toward the cursor when it's within `padding` px of it.
// The listener is removed on unmount so it never leaks.
export const Magnet = ({ children, padding = 150, strength = 3, className = "" }) => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const onMove = (e) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const dx = e.clientX - (rect.left + rect.width / 2);
      const dy = e.clientY - (rect.top + rect.height / 2);
      const radius = Math.max(rect.width, rect.height) / 2 + padding;
      if (Math.hypot(dx, dy) < radius) {
        setIsHovered(true);
        setPosition({ x: dx / strength, y: dy / strength });
      } else {
        setIsHovered(false);
        setPosition({ x: 0, y: 0 });
      }
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [padding, strength]);

  return (
    <div
      ref={ref}
      className={`relative inline-block ${className}`}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0px)`,
        transition: isHovered ? "transform 0.3s ease-out" : "transform 0.6s ease-in-out",
        willChange: "transform",
      }}
    >
      {children}
    </div>
  );
};

// One character. Split into its own component because useTransform is a hook and
// hooks can't be called inside .map (the source did, which breaks React's rules of hooks).
const Char = ({ char, start, end, progress }) => {
  const opacity = useTransform(progress, [start, end], [0.2, 1]);
  return (
    <motion.span style={{ opacity }} className="inline-block">
      {char === " " ? "\u00A0" : char}
    </motion.span>
  );
};

// Text that lights up character by character as you scroll.
export const AnimatedText = ({ text, className = "" }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.35"] });
  const chars = text.split("");
  return (
    <p ref={ref} className={`${className} flex flex-wrap justify-center`}>
      {chars.map((c, i) => (
        <Char key={i} char={c} start={i / chars.length} end={(i + 1) / chars.length} progress={scrollYProgress} />
      ))}
    </p>
  );
};
