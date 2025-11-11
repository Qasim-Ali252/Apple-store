import React from 'react'

const SaleCard = () => {
  return (
    
    <div className='w-[90rem] h-[28rem] bg-[linear-gradient(to_right,_#2E2E2E,_#000000)] relative overflow-hidden'>

      {/* Left part */}
      <div className='absolute -left-6 top-4'>
        
        <div><img className=' z-10 absolute -top-4 left-[39px] w-[237px] h-[192px] ml-[39px] mt-[3px]' src="/vertical.svg" alt="" /></div>
        <div><img className=' relative top-[172px] left-6 mt-[-20px] w-[345px] h-[262px] mb-[14px] ' src="/blue-tablet.png" alt="" /></div>
      </div>

      {/*  Center part */}

      
      <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[35.6875rem] flex flex-col justify-center items-center'>
        <div className='text-[72px] leading-[72px] font-extralight tracking-[-1%] text-white '>
          Big Summer <span className='font-light'>Sale</span>
        </div>
        <div className='font-normal text-[16px] leading-8 text-[#787878]'>Commodo fames vitae vitae leo mauris in. Eu consequat.</div>
        <div>
          <button className="flex items-center mt-4 justify-center gap-2 px-14 py-4 border border-white rounded-md text-white text-base font-medium">
            Shop Now
          </button>
        </div>
      </div>

      {/* Right part */}
     
      <div className='absolute -right-14 top-0 w-[400px] h-full'>
        <img
          src="/iphonepro.svg"
          alt=""
          className="absolute top-[1rem] right-[3rem] h-[365px] w-[180px] "
        />
        <img
          src="/image 7.png"
          alt=""
          className="absolute bottom-[-1rem] right-[3rem] h-[201px] w-[397px]"
        />
      </div>

    </div>
  )
}

export default SaleCard