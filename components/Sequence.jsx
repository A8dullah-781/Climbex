import { useEffect, useRef } from "react";

const steps = [
  {
    num: "01",
    name: "Ingestion",
    desc: "Deep-dive technical discovery. We extract requirements through rigorous interrogation of business goals and user constraints.",
    tags: [
      { label: "Analysis", color: "acc" },
      { label: "Mapping" },
      { label: "Extraction" },
    ],
  },
  {
    num: "02",
    name: "Synthesis",
    desc: "Architectural blueprinting. Design and technical logic are fused into a singular coherent structural vision.",
    tags: [
      { label: "Wireframes" },
      { label: "UI Filing", color: "bl" },
      { label: "System" },
    ],
  },
  {
    num: "03",
    name: "Construction",
    desc: "Precision engineering. The system is built with modular components, performance-first logic, and extreme hardening.",
    tags: [
      { label: "Coding", color: "acc" },
      { label: "Testing" },
      { label: "Refinement" },
    ],
  },
  {
    num: "04",
    name: "Broadcast",
    desc: "Deployment and scaling. We release the protocol into the wild, monitoring performance with surgical precision.",
    tags: [
      { label: "Launch" },
      { label: "Scale", color: "bl" },
      { label: "Optimization", color: "acc" },
    ],
  },
];

const tagColor = {
  acc: "#D2FF9A",
  bl: "#7EB3FF",
  default: "#2a2a2a",
};

const tagHoverColor = {
  acc: "#D2FF9A",
  bl: "#7EB3FF",
  default: "#4a4a4a",
};

export default function Sequence() {
  const headRef = useRef(null);
  const stepRefs = useRef([]);

  useEffect(() => {
    const headEl = headRef.current;
    const stepEls = stepRefs.current;

    const headObs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          headEl.style.opacity = "1";
          headEl.style.transform = "translateY(0)";
          headObs.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (headEl) headObs.observe(headEl);

    const stepObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const delay = parseInt(entry.target.dataset.delay) || 0;
            setTimeout(() => {
              entry.target.style.opacity = "1";
              entry.target.style.transform = "translateY(0)";
              const sweep = entry.target.querySelector(".sweep");
              if (sweep) sweep.style.width = "100%";
            }, delay);
            stepObs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    stepEls.forEach((el) => el && stepObs.observe(el));

    return () => {
      headObs.disconnect();
      stepObs.disconnect();
    };
  }, []);

  const handleStepHover = (el, entering) => {
    if (!el) return;
    const num = el.querySelector(".step-num");
    const tags = el.querySelectorAll(".step-tag");
    if (num) num.style.color = entering ? "#D2FF9A" : "#1e1e1e";
    tags.forEach((tag) => {
      const c = tag.dataset.color;
      tag.style.color = entering ? tagHoverColor[c || "default"] : tagColor[c || "default"];
    });
  };

  return (
    <section
      style={{
        
        minHeight: "100vh",
        padding: "clamp(32px, 6vw, 80px) clamp(20px, 7.5vw, 100px)",
        fontFamily: "'Roboto Mono', monospace",
        boxSizing: "border-box",
      }}
    >
      {/* Header */}
      <div
        ref={headRef}
        style={{
          marginBottom: "clamp(32px, 5vw, 64px)",
          opacity: 0,
          transform: "translateY(20px)",
          transition: "opacity 0.5s ease, transform 0.5s ease",
        }}
      >
        <p className="text-xs"
          style={{
            color: "#9592FF",
            textTransform: "uppercase",
            marginBottom: "0.5rem",
          }}
        >
          Execution Protocol
        </p>
        <h1 className="fontone"
          style={{
            fontWeight: 900,
            fontSize: "clamp(32px, 7vw, 80px)",
            color: "#fff",
            letterSpacing: "-0.02em",
            lineHeight: 1,
            margin: 0,
          }}
        >
          THE SEQUENCE
        </h1>
      </div>

      {/* Steps */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        {steps.map((step, i) => (
          <div
            key={step.num}
            ref={(el) => (stepRefs.current[i] = el)}
            data-delay={i * 120}
            onMouseEnter={(e) => handleStepHover(e.currentTarget, true)}
            onMouseLeave={(e) => handleStepHover(e.currentTarget, false)}
            style={{
              display: "grid",
              gridTemplateColumns: "clamp(48px, 6vw, 90px) 1fr auto",
              alignItems: "center",
              gap: "clamp(12px, 2vw, 28px)",
              padding: "clamp(20px, 3vw, 40px) 0",
              borderTop: "0.5px solid #1c1c1c",
              opacity: 0,
              transform: "translateY(28px)",
              transition: "opacity 0.55s ease, transform 0.55s ease",
              position: "relative",
              overflow: "hidden",
              cursor: "default",
            }}
          >
            {/* Sweep line */}
            <div
              className="sweep"
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                width: 0,
                height: "0.5px",
                background: "linear-gradient(90deg, transparent, #D2FF9A44, transparent)",
                transition: "width 0.9s 0.25s ease",
              }}
            />

            {/* Number */}
            <div className="robo txtgreen"
              className="step-num"
              style={{
                fontWeight: 800,
                fontSize: "clamp(24px, 4.5vw, 56px)",
                letterSpacing: "-0.03em",
                lineHeight: 1,
                transition: "color 0.25s",
                flexShrink: 0,
              }}
            >
              {step.num}
            </div>

            {/* Info */}
            <div>
              <div className="robo txtwhite uppercase"
                style={{
                  fontWeight: 700,
                  fontSize: "clamp(14px, 1.8vw, 22px)",
                  marginBottom: "0.4rem",
                  letterSpacing: "-0.01em",
                }}
              >
                {step.name}
              </div>
              <div className="robo text-md txtgray "
                style={{
                  lineHeight: 1.65,
                  maxWidth: 360,
                }}
              >
                {step.desc}
              </div>
            </div>

            {/* Tags */}
            <div className="hidden md:flex"
              style={{
                alignItems: "center",
                flexShrink: 0,
              }}
            >
              {step.tags.map((tag, ti) => (
                <span key={tag.label} style={{ display: "flex", alignItems: "center" }}>
                  <span
                    className="step-tag"
                    data-color={tag.color || ""}
                    style={{
                      fontSize: "clamp(7px, 0.75vw, 10px)",
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: tag.color ? tagColor[tag.color] + "55" : tagColor.default,
                      transition: "color 0.25s",
                    }}
                  >
                    {tag.label}
                  </span>
                  {ti < step.tags.length - 1 && (
                    <span style={{ color: "#868585", margin: "0 0.5rem", fontSize: 9 }}>/</span>
                  )}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}