import React from "react";

const About = () => {
  return (
    <div className="lg:h-screen px-[7.5vw] my-16 lg:my-0 flex flex-row justify-center items-center w-screen">
      <div className="h-full lg:block hidden w-1/2 flex justify-center items-center ">
        <img
          className="w-[40vw] rounded-4xl"
          src="/images/aboutpic.png"
          alt=""
        />
      </div>

      <div className="h-full  flex flex-col gap-4 justify-start items-start lg:w-1/2">
        <div className="robo txtblue mt-0 lg:mt-8 text-[3vw] lg:text-[0.8vw] tracking-wide">
          THE MANIFESTO
        </div>

        <div className="uppercase txtwhite fontone font-bold leading-none text-[8vw] lg:text-[4vw]">
          WE DO NOT BUILD <br className="hidden lg:block" />
          WEBSITES. WE <br className="hidden lg:block" />
          ARCHITECT <br className="hidden lg:block" /> DIGITAL <br className="hidden lg:block" /> DOMINANCE.
        </div>

        <div className="flex flex-row mt-6 justify-center txtgray items-start gap-3">
          <div className="robo txtgreen">01/</div>
          <div className="text-[4vw] lg:text-[1vw] robo">
            We reject generic templates and assembly-line design. Every pixel is
            a strategic placement.
          </div>
        </div>
        <div className="flex flex-row justify-center txtgray items-start gap-3">
          <div className="robo txtgreen">02/</div>
          <div className="text-[4vw] lg:text-[1vw] robo">
            Complexity is our playground. We simplify the impossible into
            seamless user journeys.
          </div>
        </div>
        <div className="flex flex-row justify-center txtgray items-start gap-3">
          <div className="robo txtgreen">03/</div>
          <div className="text-[4vw] lg:text-[1vw] robo">
            Code is poetry. Architecture is vision. Devholix is the curator of
            your future.
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
