import React, { useEffect, useRef, useState } from "react";

const Testimonial = () => {
  const cardRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="w-full px-[clamp(1rem,7.5vw,6rem)] py-8">
      <div
        ref={cardRef}
        className={`
          relative overflow-hidden
          flex flex-col justify-evenly items-center
          gap-8 my-16 rounded-3xl bg-[#201F1F] w-full
          px-[clamp(1.5rem,5vw,4rem)] py-[clamp(2rem,5vw,4rem)]
          transition-all duration-700 ease-out
          ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
        `}
        style={{ "--delay": "0ms" }}
      >
        {/* Ambient glow */}
        <div className="pointer-events-none absolute -top-16 -left-16 w-56 h-56 rounded-full bg-[#7FFF6B]/[0.06] blur-2xl animate-pulse" />

        {/* Quote block */}
        <div className="w-full">
          <div
            className={`
              text-[#7FFF6B] text-left leading-none font-bold
              text-[clamp(3rem,8vw,6rem)]
              transition-all duration-500 delay-300
              ${visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-6"}
            `}
          >
            "
          </div>
          <p
            className={`
              text-white font-semibold text-left -mt-4
              text-[clamp(1rem,2.2vw,1.45rem)] leading-relaxed
              transition-all duration-700 delay-500
              ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
            `}
          >
            "Devholix was extremely time efficient, concise and flexible. They
            had a plan and completed all the tasks with skill and creativity.
            Professionalism and effort was obvious from the beginning until the
            very end of the project. The final results went beyond my
            expectations and I will gladly request future projects from this
            very skillful programmer and designer."
          </p>
        </div>

        {/* Divider */}
        <div
          className={`
            w-[80%] h-px bg-[#605F5F] self-center origin-left
            transition-all duration-700 delay-700
            ${visible ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"}
          `}
        />

        {/* Bottom row */}
        <div
          className={`
            w-full flex flex-col sm:flex-row items-start sm:items-center
            justify-between gap-4 px-0 sm:px-[2vw]
            transition-all duration-700 delay-[900ms]
            ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
          `}
        >
          {/* Avatar + Name + Role */}
          <div className="flex flex-row items-center gap-[clamp(0.6rem,1.5vw,1.2rem)]">
            <img
              className="
                w-[clamp(2.8rem,4.5vw,4rem)] h-[clamp(2.8rem,4.5vw,4rem)]
                rounded-full object-cover grayscale
                ring-2 ring-transparent
                transition-all duration-300
                group-hover:ring-[#7FFF6B] group-hover:grayscale-0
              "
              src="/images/peter.webp"
              alt="Peter"
            />
            <div className="flex flex-col gap-1">
              <span className="text-white font-semibold leading-none text-[clamp(0.85rem,1.3vw,1.1rem)]">
                Peter Kebukai
              </span>
              <span className="text-[#605F5F] uppercase tracking-widest leading-none text-[clamp(0.55rem,0.85vw,0.72rem)]">
                CEO / NovaTech Solutions
              </span>
            </div>
          </div>

          {/* Signal pill */}
          <div className="flex items-center gap-2 text-[#605F5F] uppercase tracking-[0.2em] text-[clamp(0.55rem,0.85vw,0.72rem)]">
            <span className="w-[7px] h-[7px] rounded-full bg-[#7FFF6B] animate-ping inline-block" />
            Signal Verification: Successful
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;