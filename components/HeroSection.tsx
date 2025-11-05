import React from 'react'

const HeroSection = () => {
  return (
    <div className='w-[90rem] h-[39.5rem] pr-[10rem] pl-[10rem] bg-custom-gradient flex  items-center'>
      <div className='w-[44.625rem] min-w-[16rem] flex flex-col p-4'>
        <div className='h-[8rem] gap-[24px]'>
          <div className='font-semibold opacity-40 text-white text-[1.5625rem]'>Pro.Beyond.</div>
          <div className='font-extralight text-[6rem] tracking-[-1%] h-[4.5rem] text-white'>
            IPhone 14 <span className='font-semibold text-[6rem] leading-[-1.5rem] text-white'>Pro</span>
          </div>
        </div>

        <div className='font-medium tracking-[0%] text-[1.125rem] text-gray-medium h-[1.5rem] mt-8'>
          Created to change everything for the better. For everyone
        </div>

        <button className='w-[11.5rem] h-[3.5rem] rounded-[6px] border border-white  text-white   flex items-center  justify-center font-medium text-[1rem]  mt-6'>Shop Now</button>
      </div>
      <img src="/Iphone Image.svg" alt="" />
    </div>
  )
}

export default HeroSection
