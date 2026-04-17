import React from "react";

const Service = () => {
  return (
    <div className="h-screen px-[7.5vw] w-screen">
      <div className="py-8">
        <div className="robo text-[1vw] txtblue">OUR EXPERTISE</div>
        <div className="flex flex-row justify-between items-center">
          <div className="fontone txtwhite text-[4vw] font-bold ">
            CORE SERVICES
          </div>
          <div className="robo txtgray text-[1.2vw] w-[40vw] text-right">
            We don't just build sites. We engineer digital assets that command
            attention and drive conversion through technical excellence.
          </div>
        </div>
      </div>

      <div className="flex mb-4 flex-row justify-center gap-4 items-center">
        <div className="w-[39%] flex flex-col justify-between p-8 h-[30vh] rounded-2xl bg-[#201F1F]">
          <div className="flex flex-col gap-10">
            <div className="flex flex-row justify-between items-center">
              <div>
                <img className="" src="/images/uiux.png" alt="" />
              </div>
              <div className="txtgray robo">01/ DESIGN</div>
            </div>

            <div className="fontone text-[2vw] txtwhite font-semibold">
              UI/UX Design
            </div>
          </div>

          <div className="robo txtgray text-[1vw]">
            Editorial-grade aesthetics meeting friction-less user journeys. We
            design for the elite.
          </div>
        </div>
        <div className="w-[59%] flex flex-col justify-between p-8 h-[30vh] rounded-2xl bg-[#201F1F]">
          <div className="flex flex-col gap-10">
            <div className="flex flex-row justify-between items-center">
              <div>
                <img className="" src="/images/dev.png" alt="" />
              </div>
              <div className="txtgray robo">02/ CODE</div>
            </div>

            <div className="fontone text-[2vw] txtwhite font-semibold">
              Development
            </div>
          </div>

          <div className="robo txtgray text-[1vw]">
            Cutting-edge digital solutions built for speed, scale, and
            precision. Engineered to deliver complete control and seamless
            performance.
          </div>
        </div>
      </div>

      <div className="flex flex-row justify-center gap-4 items-center">




        <div className="w-[59%] flex flex-col justify-between p-8 h-[30vh] rounded-2xl bg-[#201F1F]">
          
              <div>
                <img className="" src="/images/performance.png" alt="" />
              </div>

            <div className="fontone text-[2vw] mt-4 txtwhite font-semibold">
              Performance
            </div>
       

         <div className="flex flex-row justify-between items-center">
             <div className="robo txtgray text-[1vw]">
            Lighthouse scores are our obsession. We optimize every
millisecond of the critical rendering path.
          </div>
          <div>
<img className="w-[30vw] -mt-4" src="/images/bars.png" alt="" />
          </div>
         </div>
        </div>





        <div className="w-[39%] flex flex-col justify-between p-8 h-[30vh] rounded-2xl bg-[#201F1F]">
          <div>
            <img className="" src="/images/deploy.png" alt="" />
          </div>

          <div className="fontone text-[2vw] txtwhite font-semibold">
            Deployment
          </div>

          <div className="robo txtgray text-[1vw]">
            High-performance deployment setup for smooth, stable, and globally
            accessible websites.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Service;
