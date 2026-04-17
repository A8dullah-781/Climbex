import React from 'react'

const Home = () => {
  return (
    <div className='lg:h-screen h-[80vh] flex justify-center items-center w-screen px-6'>
        <div className='w-full'>

            <div className='robo text-[3vw] sm:text-[2vw] lg:mb-0 mb-5  md:text-[1.2vw] lg:text-[1vw] flex flex-row justify-center items-center gap-2 sm:gap-5 flex-wrap'>
                <div className='txtgreen bg-[#D2FF9A]/10 inline py-1 px-4 rounded-3xl'>V1.0 // ARCHITECTURE</div>
                <div className='txtdgray hidden sm:block'>---------</div>
                <div className='txtblue'>EST . 2026</div>
            </div>

            <div className='font-black fontone text-[18vw] sm:text-[15vw] md:text-[13vw] leading-none tracking-tighter txtwhite text-center'>DEVHOLIX</div>

           <div className='txtgray text-[3.5vw] sm:text-[2vw] md:text-[1.4vw] lg:text-[1.2vw] text-center py-4 px-4'>
            We curate digital experiences at the intersection of mathematical <br className='hidden md:block' /> precision and artistic rebellion. Elite engineering for the bold.
           </div>

           <div className='flex justify-center items-center gap-4 sm:gap-8 py-4 robo flex-wrap'>
            <div className='text-[3vw] sm:text-[1.8vw] md:text-[1.2vw] lg:text-[1vw] inline px-6 sm:px-8 py-3 sm:py-4 bg-[#D2FF9A] rounded-full'>EXPLORE ARCHIVE</div>
            <div className='text-[3vw] sm:text-[1.8vw] md:text-[1.2vw] lg:text-[1vw] txtwhite inline px-6 sm:px-8 py-3 sm:py-4 border border-[#605F5F] rounded-full'>THE PROTOCOL</div>
           </div>

        </div>
    </div>
  )
}

export default Home