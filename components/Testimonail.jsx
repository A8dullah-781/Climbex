import React from "react";

const Testimonial = () => {
  return (
    <div className="h-full px-[7.5vw] w-screen">
      <div className="h-[80vh] py-8 px-[5vw] flex flex-col justify-evenly items-center my-16 rounded-3xl bg-[#201F1F] w-full">

        <div>
          <div className="txtgreen text-left leading-none font-bold text-[5vw]">"</div>
          <div className="txtwhite fontone text-left -mt-6 font-semibold text-[2.2vw]">
            "Devholix was extremely time efficient, concise and flexible. They had
            a plan and completed all the tasks with skill and creativity.
            Professionalism and effort was obvious from the beginning until the
            very end of the project. The final results went beyond my expectations
            and I will gladly request future projects from this very skillful
            programmer and designer."
          </div>
        </div>

        <div className="w-[80%] h-[1px] bg-[#605F5F]"></div>

        {/* Bottom Row */}
        <div className="w-full flex flex-row items-center justify-between px-[2vw]">

          {/* Left: Avatar + Name + Role */}
          <div className="flex flex-row items-center gap-[1.2vw]">
            <img
              className="w-[4vw] h-[4vw] rounded-full object-cover grayscale"
              src="/images/peter.webp"
              alt="Peter"
            />
            <div className="flex flex-col gap-[0.3vw]">
              <span className="txtwhite fontone mb-2 font-semibold text-[1.2vw] leading-none">
                Peter Kebukai
              </span>
              <span className="text-[#605F5F] robo uppercase tracking-widest text-[0.7vw] leading-none">
                CEO / NovaTech Solutions
              </span>
            </div>
          </div>

          {/* Right: Signal Verification */}
          <div className="txtdgray robo text-[0.8vw] tracking-[0.2em] uppercase">
            SIGNAL VERIFICATION: SUCCESSFUL
          </div>

        </div>

      </div>
    </div>
  );
};

export default Testimonial;