// Small reusable pieces: buttons, image placeholder slot.
export const ContactButton = ({ onClick, label, className = "" }) => (
  <button
    onClick={onClick}
    className={`contact-btn-bg rounded-full text-white font-medium uppercase tracking-widest px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4 text-xs sm:text-sm md:text-base transition-transform hover:scale-105 active:scale-95 duration-200 cursor-pointer flex items-center justify-center gap-2 ${className}`}
  >
    <span>{label}</span>
  </button>
);

export const LiveProjectButton = ({ onClick, label, className = "" }) => (
  <button
    onClick={onClick}
    className={`rounded-full border-2 border-mist text-mist font-medium uppercase tracking-widest px-8 py-3 sm:px-10 sm:py-3.5 text-xs sm:text-sm md:text-base hover:bg-mist/10 transition-colors duration-200 cursor-pointer ${className}`}
  >
    {label}
  </button>
);

// Shows the image when `src` is set, otherwise a styled placeholder (the .slot class from index.css).
export const ImageSlot = ({ src, alt, label, fit = "cover", className = "" }) =>
  src ? (
    <img src={src} alt={alt} loading="lazy"
      className={`w-full h-full ${fit === "contain" ? "object-contain" : "object-cover"} ${className}`} />
  ) : (
    <div role="img" aria-label={alt}
      className={`slot flex items-center justify-center w-full h-full text-center px-4 text-xs sm:text-sm uppercase tracking-widest font-light ${className}`}>
      {label}
    </div>
  );
