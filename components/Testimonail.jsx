import React, { useEffect, useRef, useState, useCallback } from "react";

/* ── Testimonial data ─────────────────────────────────── */
const TESTIMONIALS = [
  {
    id: 1,
    quote:
      "Abdullah was extremely time efficient, concise and flexible. They had a plan and completed all the tasks with skill and creativity. Professionalism and effort was obvious from the beginning until the very end of the project. The final results went beyond my expectations and I will gladly request future projects from this very skillful programmer and designer.",
    name: "Peter Kebukai",
    role: "Founder",
    company: "abckid360",
    img: "/images/peter.webp",
  },
  {
    id: 2,
    quote:
      "Abdullah was friendly, responsive and easy to work with. Very communicative and knowledgeable with code regarding frontend and backend web design. He understood the requirements perfectly and delivered ahead of time. The code is clean and works exactly as described. He delivered a fantastic high quality product and service.",
    name: "Peter Kebukai",
    role: "Founder",
    company: "abckid360",
    img: "/images/peter.webp",
  },
];

/* ── Arrow button ─────────────────────────────────────── */
const ArrowBtn = ({ direction, onClick }) => (
  <button
    onClick={onClick}
    aria-label={direction === "left" ? "Previous testimonial" : "Next testimonial"}
    className="group hidden md:flex items-center justify-center w-9 h-9 rounded-full border border-[#3a3a3a] bg-[#252424] hover:border-[#7FFF6B]/40 hover:bg-[#2a2a2a] transition-all duration-200"
  >
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      className="text-[#605F5F] group-hover:text-[#7FFF6B] transition-colors duration-200"
    >
      {direction === "left" ? (
        <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      ) : (
        <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      )}
    </svg>
  </button>
);

/* ── Main component ───────────────────────────────────── */
const Testimonial = () => {
  const cardRef      = useRef(null);
  const touchStart   = useRef(null);
  const touchEnd     = useRef(null);

  const [visible, setVisible]   = useState(false);
  const [index, setIndex]       = useState(0);
  const [animKey, setAnimKey]   = useState(0); // re-triggers card animation on slide

  const total    = TESTIMONIALS.length;
  const current  = TESTIMONIALS[index];
  const hasLeft  = index > 0;
  const hasRight = index < total - 1;

  /* ── Intersection observer ── */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  /* ── Navigation ── */
  const goTo = useCallback((newIndex) => {
    if (newIndex < 0 || newIndex >= total) return;
    setIndex(newIndex);
    setAnimKey((k) => k + 1);
  }, [total]);

  const prev = () => goTo(index - 1);
  const next = () => goTo(index + 1);

  /* ── Touch / swipe ── */
  const onTouchStart = (e) => { touchStart.current = e.targetTouches[0].clientX; };
  const onTouchMove  = (e) => { touchEnd.current   = e.targetTouches[0].clientX; };
  const onTouchEnd   = () => {
    if (touchStart.current === null || touchEnd.current === null) return;
    const delta = touchStart.current - touchEnd.current;
    const THRESHOLD = 50;
    if (delta > THRESHOLD)  next(); // swipe left → next
    if (delta < -THRESHOLD) prev(); // swipe right → prev
    touchStart.current = null;
    touchEnd.current   = null;
  };

  return (
    <div className="w-full px-[clamp(1rem,7.5vw,6rem)] py-8">
      <div
        ref={cardRef}
        className={`
          relative overflow-hidden select-none
          flex flex-col justify-evenly items-center
          gap-8 my-16 rounded-3xl bg-[#201F1F] w-full
          px-[clamp(1.5rem,5vw,4rem)] py-[clamp(2rem,5vw,4rem)]
          transition-all duration-700 ease-out
          ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
        `}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* Ambient glow */}
        <div className="pointer-events-none absolute -top-16 -left-16 w-56 h-56 rounded-full bg-[#7FFF6B]/[0.06] blur-2xl animate-pulse" />

        {/* ── Desktop arrows (top-right) ── */}
        <div className="hidden sm:flex absolute top-6 right-6 gap-2 z-10">
          {hasLeft  && <ArrowBtn direction="left"  onClick={prev} />}
          {hasRight && <ArrowBtn direction="right" onClick={next} />}
        </div>

        {/* ── Dot indicators ── */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2 flex gap-1.5 sm:hidden">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`rounded-full transition-all duration-300 ${
                i === index
                  ? "w-4 h-1.5 bg-[#7FFF6B]"
                  : "w-1.5 h-1.5 bg-[#3a3a3a]"
              }`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>

        {/* ── Quote block ── */}
        <div
          key={`quote-${animKey}`}
          className="w-full animate-[fadeSlideUp_0.45s_ease-out_both]"
        >
          <div className="text-[#7FFF6B] text-left leading-none font-bold text-[clamp(3rem,8vw,6rem)]">
            "
          </div>
          <p className="text-white font-semibold text-left -mt-4 text-[clamp(1rem,2.2vw,1.45rem)] leading-relaxed">
            {current.quote}
          </p>
        </div>

        {/* ── Divider ── */}
        <div
          className={`
            w-[80%] h-px bg-[#605F5F] self-center origin-left
            transition-all duration-700 delay-700
            ${visible ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"}
          `}
        />

        {/* ── Bottom row ── */}
        <div
          key={`meta-${animKey}`}
          className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-0 sm:px-[2vw] animate-[fadeSlideUp_0.5s_ease-out_0.1s_both]"
        >
          {/* Avatar + Name + Role */}
          <div className="flex flex-row items-center gap-[clamp(0.6rem,1.5vw,1.2rem)]">
            <img
              className="w-[clamp(2.8rem,4.5vw,4rem)] h-[clamp(2.8rem,4.5vw,4rem)] rounded-full object-cover grayscale ring-2 ring-transparent transition-all duration-300"
              src={current.img}
              alt={current.name}
            />
            <div className="flex flex-col gap-1">
              <span className="text-white font-semibold leading-none text-[clamp(0.85rem,1.3vw,1.1rem)]">
                {current.name}
              </span>
              <span className="txtgray mt-2 md:mt-0 uppercase tracking-widest leading-none text-[clamp(0.55rem,0.85vw,0.72rem)]">
                {current.role} / {current.company}
              </span>
            </div>
          </div>

          {/* Signal pill */}
          <div className="flex items-center gap-2 text-[#605F5F] uppercase tracking-[0.2em] text-[clamp(0.55rem,0.85vw,0.72rem)]">
            <span className="w-[7px] h-[7px] rounded-full bg-[#7FFF6B] animate-ping inline-block" />
            Signal Verification: Successful
          </div>

          {/* Mobile arrows */}
          <div className="flex sm:hidden gap-2 mt-1">
            {hasLeft  && <ArrowBtn direction="left"  onClick={prev} />}
            {hasRight && <ArrowBtn direction="right" onClick={next} />}
          </div>
        </div>
      </div>

      {/* Keyframe for slide transitions */}
      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
      `}</style>
    </div>
  );
};

export default Testimonial;