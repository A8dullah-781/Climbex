import React from "react";

const About = () => {
  return (
    <div className="h-screen px-[7.5vw] flex flex-row justify-center items-center w-screen">
      <div className="h-full w-1/2 flex justify-start items-center ">
        <img
          className="w-[40vw] rounded-4xl"
          src="/images/aboutpic.png"
          alt=""
        />
      </div>

      <div className="h-full flex flex-col gap-4 justify-center items-start w-1/2">
        <div className="robo txtblue text-[0.8vw] tracking-wide">
          THE MANIFESTO
        </div>

        <div className="uppercase txtwhite fontone font-bold leading-none text-[4vw]">
          WE DO NOT BUILD <br />
          WEBSITES. WE <br />
          ARCHITECT <br /> DIGITAL <br /> DOMINANCE.
        </div>

        <div className="flex flex-row mt-6 justify-center txtgray items-start gap-3">
          <div className="robo txtgreen">01/</div>
          <div className="text-[1vw] robo">
            We reject generic templates and assembly-line design. Every pixel is
            a strategic placement.
          </div>
        </div>
        <div className="flex flex-row justify-center txtgray items-start gap-3">
          <div className="robo txtgreen">02/</div>
          <div className="text-[1vw] robo">
            Complexity is our playground. We simplify the impossible into
            seamless user journeys.
          </div>
        </div>
        <div className="flex flex-row justify-center txtgray items-start gap-3">
          <div className="robo txtgreen">03/</div>
          <div className="text-[1vw] robo">
            Code is poetry. Architecture is vision. Devholix is the curator of
            your future.
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
