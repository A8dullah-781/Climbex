import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Service = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
      });

      /* ── 1. Label ── */
      tl.fromTo(".s-label",
        { autoAlpha: 0, y: 8 },
        { autoAlpha: 1, y: 0, duration: 0.3, ease: "power2.out" }
      );

      /* ── 2. Heading ── */
      tl.fromTo(".s-head",
        { autoAlpha: 0, y: 16 },
        { autoAlpha: 1, y: 0, duration: 0.35, ease: "power3.out" },
        "-=0.15"
      );

      /* ── 3. Sub text ── */
      tl.fromTo(".s-sub",
        { autoAlpha: 0, y: 10 },
        { autoAlpha: 1, y: 0, duration: 0.3, ease: "power2.out" },
        "-=0.2"
      );

      /* ── 4. Thin divider line wipe ── */
      tl.fromTo(".s-line",
        { scaleX: 0, transformOrigin: "left center" },
        { scaleX: 1, duration: 0.5, ease: "expo.inOut" },
        "-=0.25"
      );

      /* ── 5. Cards: fire almost immediately ── */
      tl.fromTo(".s-card",
        { autoAlpha: 0, y: 16 },
        {
          autoAlpha: 1, y: 0,
          duration: 0.45, stagger: 0.07, ease: "power2.out",
        },
        "-=0.4"   // overlaps heavily with the line wipe
      );

      /* ── 6. Images: fade in with cards ── */
      tl.fromTo(".s-img",
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.35, stagger: 0.05, ease: "power1.out" },
        "<"   // starts at same time as cards
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div id="service" ref={sectionRef} className="min-h-screen px-[7.5vw] w-full">

      {/* ── Header ── */}
      <div className="py-6 sm:py-8">
        <div className="s-label robo text-[clamp(10px,1vw,13px)] txtblue tracking-widest uppercase">
          Our Expertise
        </div>

        {/* thin line under label */}
        <div
          className="s-line mt-3 mb-4 h-px"
          style={{ background: "linear-gradient(90deg, rgba(255,255,255,0.12), transparent)" }}
        />

        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
          <div className="s-head fontone txtwhite text-[clamp(1.8rem,4vw,3.5rem)] font-bold leading-tight">
            CORE SERVICES
          </div>
          <div className="s-sub robo txtgray text-[clamp(0.7rem,1.2vw,1rem)] sm:w-[40vw] sm:text-right leading-relaxed">
            We don't just build sites. We engineer digital assets that command
            attention and drive conversion through technical excellence.
          </div>
        </div>
      </div>

      {/* ── Row 1 ── */}
      <div className="flex flex-col sm:flex-row mb-4 gap-4 items-stretch">

        {/* UI/UX */}
        <div
          className="s-card group w-full sm:w-[39%] flex flex-col justify-between p-6 sm:p-8 rounded-2xl bg-[#201F1F] cursor-default"
          style={{
            minHeight: "clamp(200px,30vh,320px)",
            border: "1px solid transparent",
            transition: "border-color 0.4s ease, background 0.4s ease",
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
            e.currentTarget.style.background = "#252424";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = "transparent";
            e.currentTarget.style.background = "#201F1F";
          }}
        >
          <div className="flex flex-col gap-6 sm:gap-10">
            <div className="flex flex-row justify-between items-center">
              <div className="s-img">
                <img src="/images/uiux.webp" alt="UI/UX" className="w-[clamp(28px,2.8vw,42px)]" />
              </div>
              <div className="txtgray robo text-[clamp(10px,1vw,12px)] tracking-widest">
                01/ DESIGN
              </div>
            </div>
            <div className="fontone text-[clamp(1.1rem,2vw,1.7rem)] txtwhite font-semibold">
              UI/UX Design
            </div>
          </div>
          <div className="robo txtgray text-[clamp(0.68rem,1vw,0.85rem)] leading-relaxed mt-4">
            Editorial-grade aesthetics meeting friction-less user journeys. We
            design for the elite.
          </div>
        </div>

        {/* Development */}
        <div
          className="s-card group w-full sm:w-[59%] flex flex-col justify-between p-6 sm:p-8 rounded-2xl bg-[#201F1F] cursor-default"
          style={{
            minHeight: "clamp(200px,30vh,320px)",
            border: "1px solid transparent",
            transition: "border-color 0.4s ease, background 0.4s ease",
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
            e.currentTarget.style.background = "#252424";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = "transparent";
            e.currentTarget.style.background = "#201F1F";
          }}
        >
          <div className="flex flex-col gap-6 sm:gap-10">
            <div className="flex flex-row justify-between items-center">
              <div className="s-img">
                <img src="/images/dev.webp" alt="Dev" className="w-[clamp(28px,2.8vw,42px)]" />
              </div>
              <div className="txtgray robo text-[clamp(10px,1vw,12px)] tracking-widest">
                02/ CODE
              </div>
            </div>
            <div className="fontone text-[clamp(1.1rem,2vw,1.7rem)] txtwhite font-semibold">
              Development
            </div>
          </div>
          <div className="robo txtgray text-[clamp(0.68rem,1vw,0.85rem)] leading-relaxed mt-4">
            Cutting-edge digital solutions built for speed, scale, and
            precision. Engineered to deliver complete control and seamless
            performance.
          </div>
        </div>
      </div>

      {/* ── Row 2 ── */}
      <div className="flex flex-col sm:flex-row gap-4 items-stretch">

        {/* Performance */}
        <div
          className="s-card group w-full sm:w-[59%] flex flex-col justify-between p-6 sm:p-8 rounded-2xl bg-[#201F1F] cursor-default"
          style={{
            minHeight: "clamp(200px,30vh,320px)",
            border: "1px solid transparent",
            transition: "border-color 0.4s ease, background 0.4s ease",
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
            e.currentTarget.style.background = "#252424";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = "transparent";
            e.currentTarget.style.background = "#201F1F";
          }}
        >
          <div className="s-img">
            <img src="/images/performance.webp" alt="Performance" className="w-[clamp(28px,2.8vw,42px)]" />
          </div>
          <div className="fontone text-[clamp(1.1rem,2vw,1.7rem)] mt-3 sm:mt-4 txtwhite font-semibold">
            Performance
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-3 mt-2">
            <div className="robo txtgray text-[clamp(0.68rem,1vw,0.85rem)] leading-relaxed sm:max-w-[45%]">
              Lighthouse scores are our obsession. We optimize every
              millisecond of the critical rendering path.
            </div>
            <div className="s-img">
              <img
                src="/images/bars.webp"
                alt="Bars"
                className="w-full sm:w-[clamp(120px,18vw,260px)] sm:-mt-4"
              />
            </div>
          </div>
        </div>

        {/* Deployment */}
        <div
          className="s-card group w-full sm:w-[39%] flex flex-col justify-between p-6 sm:p-8 rounded-2xl bg-[#201F1F] cursor-default"
          style={{
            minHeight: "clamp(200px,30vh,320px)",
            border: "1px solid transparent",
            transition: "border-color 0.4s ease, background 0.4s ease",
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
            e.currentTarget.style.background = "#252424";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = "transparent";
            e.currentTarget.style.background = "#201F1F";
          }}
        >
          <div className="s-img">
            <img src="/images/deploy.webp" alt="Deploy" className="w-[clamp(28px,2.8vw,42px)]" />
          </div>
          <div className="fontone text-[clamp(1.1rem,2vw,1.7rem)] txtwhite font-semibold">
            Deployment
          </div>
          <div className="robo txtgray text-[clamp(0.68rem,1vw,0.85rem)] leading-relaxed mt-2">
            High-performance deployment setup for smooth, stable, and globally
            accessible websites.
          </div>
        </div>
      </div>

    </div>
  );
};

export default Service;