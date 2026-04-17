import React from 'react'

const Home = () => {
  return (
    <div className=' h-screen flex justify-center items-center w-screen'>
        <div className=''>

            <div className='robo text-[1vw] flex flex-row justify-center items-center gap-5'>
                <div className='txtgreen bg-[#D2FF9A]/10 inline py-1 px-4 rounded-3xl'>V1.0 // ARCHITECTURE</div>
                <div className='txtdgray'>---------</div>
                <div className='txtblue'>EST . 2026</div>
            </div>

            <div className='font-black fontone text-[13vw] leading-none tracking-tighter txtwhite'>DEVHOLIX</div>

           <div className='txtgray text-[1.2vw] text-center py-4'>
            We curate digital experiences at the intersection of mathematical <br /> precision and artistic rebellion. Elite engineering for the bold.
           </div>

           <div className='flex justify-center items-center gap-8 items-center py-4 robo'>
            <div className='text-[1vw] inline px-8 py-4 bg-[#D2FF9A]  rounded-full'>EXPLORE ARCHIVE</div>
            <div className='text-[1vw] txtwhite inline px-8 py-4 border border-[#605F5F] rounded-full'>THE PROTOCOL</div>
           </div>

        </div>
    </div>
  )
}

export default Home