import React, { useEffect, useRef, useState } from "react";

const lines = [
  {
    label: "WHO",
    text: "We operate where precision meets intent. Led by Abdullah, the agency isn't built on roles, it's built on standards. A controlled mindset shaping every decision, where nothing is random and nothing is left to chance.",
  },
  {
    label: "WHAT",
    text: "We construct digital presence that feels inevitable. Interfaces engineered to hold attention, systems designed to perform, visuals that don't decorate, they dominate.",
  },
  {
    label: "HOW",
    text: "Through calculated design and disciplined execution. Every pixel measured, every interaction deliberate. No noise, no excess, just refined output driven by clarity and control.",
  },
  {
    label: "WHY",
    text: "Because most of the digital world is built to fill space, not to hold attention. Predictable layouts, safe decisions, zero intent. This exists to challenge that to create work that carries weight, commands focus, and stays long after everything else is forgotten.",
  },
];

const HEADING = ["BUILT TO", "OUTLAST", "THE NOISE."];

/* Helpers — delay is baked into the transition string so it always fires */
const fadeUp = (visible, delay = 0) => ({
  transition: `opacity 0.7s ease ${delay}ms, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
  opacity: visible ? 1 : 0,
  transform: visible ? "translateY(0px)" : "translateY(22px)",
});

const fadeRight = (visible, delay = 0) => ({
  transition: `opacity 0.75s ease ${delay}ms, transform 0.75s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
  opacity: visible ? 1 : 0,
  transform: visible ? "translateX(0px)" : "translateX(22px)",
});

const slideLeft = (visible, delay = 0) => ({
  transition: `opacity 0.65s ease ${delay}ms, transform 0.65s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
  opacity: visible ? 1 : 0,
  transform: visible ? "translateX(0px)" : "translateX(-28px)",
});

const About = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="px-[7.5vw] py-20 lg:py-28 overflow-hidden relative"
    >
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(180,255,60,0.04) 0%, transparent 70%)" }}
      />

      {/* ── TOP ROW ── */}
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 lg:gap-10 mb-16 lg:mb-20">
        <div>
          {/* Label */}
          <p
            className="robo text-[#9592FF] text-[0.65rem] lg:text-[0.7rem] tracking-[0.25em] uppercase mb-4 lg:mb-5"
            style={fadeUp(visible, 0)}
          >
            About — Devholix
          </p>

          {/* Heading — each line clips up from behind overflow:hidden mask */}
          <h2
            className="fontone"
            style={{
              fontWeight: 900,
              fontSize: "clamp(32px, 7vw, 80px)",
              color: "#fff",
              letterSpacing: "-0.02em",
              lineHeight: 1,
              margin: 0,
            }}
          >
            {HEADING.map((word, wi) => (
              <span key={wi} style={{ display: "block", overflow: "hidden", lineHeight: 1.08 }}>
                <span
                  style={{
                    display: "block",
                    transition: `opacity 0.75s cubic-bezier(0.16,1,0.3,1) ${80 + wi * 90}ms, transform 0.75s cubic-bezier(0.16,1,0.3,1) ${80 + wi * 90}ms`,
                    opacity: visible ? 1 : 0,
                    transform: visible ? "translateY(0%)" : "translateY(108%)",
                  }}
                >
                  {word}
                </span>
              </span>
            ))}
          </h2>
        </div>

        {/* Sub-tagline — drifts in from right */}
        <p
          className="robo font-light italic text-white/35 lg:max-w-[260px] leading-[1.7] lg:text-right text-[clamp(0.85rem,1.1vw,1rem)]"
          style={fadeRight(visible, 360)}
        >
          We don't chase attention.<br />
          We engineer it.<br />
          Every detail built to dominate.
        </p>
      </div>

      {/* ── TOP BORDER — draws in from left ── */}
      <div style={{ position: "relative", height: "1px" }}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(255,255,255,0.07)",
            transformOrigin: "left center",
            transition: `transform 0.9s cubic-bezier(0.16,1,0.3,1) 220ms`,
            transform: visible ? "scaleX(1)" : "scaleX(0)",
          }}
        />
      </div>

      {/* ── ACCORDION ── */}
      <div>
        {lines.map((item, i) => {
          const isActive = activeIndex === i;
          const isHovered = hoveredIndex === i;
          const labelGreen = isActive || isHovered;
          const rowDelay = 320 + i * 110;

          return (
            <div
              key={i}
              onClick={() => setActiveIndex(isActive ? null : i)}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="cursor-pointer"
              style={{ position: "relative", ...slideLeft(visible, rowDelay) }}
            >
              {/* Bottom border */}
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "1px", overflow: "hidden" }}>
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: isActive
                      ? "rgba(180,255,60,0.25)"
                      : isHovered
                      ? "rgba(180,255,60,0.12)"
                      : "rgba(255,255,255,0.07)",
                    transformOrigin: "left center",
                    transition: visible
                      ? `background 0.35s ease, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${rowDelay}ms`
                      : `transform 0.9s cubic-bezier(0.16,1,0.3,1) ${rowDelay}ms`,
                    transform: visible ? "scaleX(1)" : "scaleX(0)",
                  }}
                />
              </div>

              <div className="flex items-start gap-4 lg:gap-[clamp(20px,3vw,60px)] py-6 lg:py-7">

                {/* Number */}
                <span className="robo text-[#D2FF9A] text-[0.6rem] tracking-[0.2em] min-w-[20px] lg:min-w-[24px] pt-2 lg:pt-3">
                  0{i + 1}/
                </span>

                {/* Label + paragraph */}
                <div className="flex flex-col flex-1 min-w-0">
                  <span
                    className="fontone font-bold leading-none text-[clamp(2.2rem,5vw,3.8rem)]"
                    style={{
                      color: labelGreen ? "#b4ff3c" : "rgba(255,255,255,0.12)",
                      transition: "color 0.3s ease, letter-spacing 0.4s cubic-bezier(0.16,1,0.3,1)",
                      letterSpacing: isHovered && !isActive ? "0.04em" : "-0.01em",
                    }}
                  >
                    {item.label}
                  </span>

                  {/* Smooth height reveal */}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateRows: isActive ? "1fr" : "0fr",
                      opacity: isActive ? 1 : 0,
                      marginTop: isActive ? "12px" : "0px",
                      transition:
                        "grid-template-rows 0.52s cubic-bezier(0.16,1,0.3,1), opacity 0.38s ease, margin-top 0.38s ease",
                    }}
                  >
                    <div style={{ overflow: "hidden" }}>
                      <p className="robo font-light text-white/50 text-md leading-[1.8] pr-4 lg:pr-16 pb-5">
                        {item.text}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Arrow */}
                <div
                  className="w-6 h-6 lg:w-7 lg:h-7 rounded-full border flex items-center justify-center flex-shrink-0 mt-1 lg:mt-2"
                  style={{
                    borderColor: labelGreen ? "#b4ff3c" : "rgba(255,255,255,0.1)",
                    background: isActive ? "rgba(180,255,60,0.08)" : "transparent",
                    transform: isActive ? "rotate(45deg)" : "rotate(0deg)",
                    transition: "border-color 0.3s ease, background 0.3s ease, transform 0.42s cubic-bezier(0.16,1,0.3,1)",
                  }}
                >
                  <svg viewBox="0 0 10 10" fill="none" stroke="#b4ff3c" strokeWidth="1.5" className="w-[9px] h-[9px]">
                    <line x1="2" y1="5" x2="8" y2="5" />
                    <line x1="5" y1="2" x2="8" y2="5" />
                    <line x1="5" y1="8" x2="8" y2="5" />
                  </svg>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── BOTTOM STRIP ── */}
      <div
        className="mt-14 lg:mt-16 flex items-center justify-between flex-wrap gap-4"
        style={fadeUp(visible, 740)}
      >
        <span className="robo text-[0.65rem] tracking-[0.2em] text-white/20 uppercase">
          Est. 2026 — Global
        </span>
        <span className="robo flex items-center gap-2 text-[0.65rem] tracking-[0.12em] text-white/20 uppercase">
          <span
            className="w-[6px] h-[6px] rounded-full bg-[#b4ff3c]"
            style={{ animation: "abpulse 2s ease-in-out infinite" }}
          />
          Accepting new clients
        </span>
      </div>

      <style>{`
        @keyframes abpulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.35; transform: scale(0.65); }
        }
      `}</style>
    </section>
  );
};

export default About;