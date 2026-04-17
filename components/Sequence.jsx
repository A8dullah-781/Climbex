import React from "react";

const Sequence = () => {
  return (
    <div className="h-full w-screen px-[7.5vw]">
      <div className="flex flex-row justify-between items-center">
        <div className="fontone font-bold text-[4vw] pb-16 txtwhite ">
          THE SEQUENCE
        </div>
        <div className="robo text-[1vw] txtgray">TRANSMISSION_PROTOCOL_V4</div>
      </div>

      <div className="flex flex-row py-8 mb-8 justify-between items-center">
        <div className="robo flex flex-col w-[20vw] gap-3 justify-center items-start text-[1vw]">
          <div className="text-[#D2FF9A]">SIGNAL ANALYSIS</div>
          <div className="txtgray">
            We intercept your project goals and deconstruct the core
            requirements through a technical lens.
          </div>
        </div>{" "}
        <div className="robo flex flex-col w-[20vw] gap-3 justify-center items-start text-[1vw]">
          <div className="txtblue">STRUCTURAL MAP</div>
          <div className="txtgray">
            A blueprinting phase where we
define user flows and system
architecture without the
noise.
          </div>
        </div>{" "}
        <div className="robo flex flex-col w-[20vw] gap-3 justify-center items-start text-[1vw]">
          <div className="txtwhite">CRAFT & CODE</div>
          <div className="txtgray">
            The heavy lifting. We build with
atomic precision, layering
aesthetics over high-
performance code.
          </div>
        </div>{" "}
        <div className="robo flex flex-col w-[20vw] gap-3 justify-center items-start text-[1vw]">
          <div className="text-[#D2FF9A]">THE LAUNCH</div>
          <div className="txtgray">
          Final integration. Your system
goes live on the edge,
globalized and ready for heavy
traffic.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sequence;
