import React from 'react';


const  ProductCard = ()=> {
  return (
    <div className=" bg-white">
     
      <div className="grid grid-cols-1 md:grid-cols-2 md:grid-rows-2 w-[90rem] h-[37.5rem] ">
        
        {/* Playstation 5 */}
        <div className=" bg-white text-black h-[22.5rem] w-[45rem] flex">
          <div className="w-[22.5rem] h-[21.4375rem]    ">
            <img src="/PlayStation.png" alt="" />
          </div>
          <div className="w-[21.125rem] h-[6.5rem] gap-[1rem] max-w-[25.25rem] flex flex-col mt-28 ">

            <span className="text-[49px] font-medium leading-[2.5rem] ">Playstation 5</span>
            <span className="font-medium text-[14px] leading-[24px] text-gray-medium">
              Incredibly powerful CPUs, GPUs, and an SSD with integrated I/O will redefine your PlayStation experience.
            </span>
          </div>
        </div>

        {/* Macbook Air */}
        <div className="bg-gray-light  text-black   flex  justify-between md:row-span-2 w-[45rem] h-[35.8rem] ">
          <div className="w-[24.5rem] h-[12rem] gap-4   ml-14 mt-[12.75rem]">
             <div className='flex '>
                <h2 className="font-extralight text-[64px]">Macbook <span className='font-medium'>Air</span></h2>
             </div>
           

            <p className="text-base text-gray-medium mt-1">
             The new 15‑inch MacBook Air makes room for more of what you love with a spacious Liquid Retina display.
            </p>
           <button className="flex items-center  mt-4 justify-center gap-2 px-14 py-4 border border-black rounded-md text-black text-base font-medium">
             Shop Now
           </button>
          </div>
         
            <img className='self-center w-[17.25rem] h-[31.375rem]' src="MacBook Pro 14.svg" alt="" />
         
        </div>

       
        <div className="grid grid-cols-2  w-[45rem] h-[17rem]">
          
          {/*  AirPods Max */}
          <div className="bg-gray-light text-black   flex  w-[22.5rem] h-[17rem]  ">
           
            <img className='w-[104px] h-[272px]' src="airpods.png" alt="" />
            <div className='w-[10rem] h-[8.9375rem] max-w-[27rem] gap-[8px] flex flex-col  mt-[64.5px] ml-[48px] '>
              
                     <span className="text-[29px]  leading-[40px] font-light ">Apple <div className='flex gap-1'>
                        <span>AirPods</span> <span className='font-medium'>
              Max </span> 
                        </div></span>
               
               
            <p className="text-sm text-gray-700">Computational audio. Listen, it's powerful.</p>
            </div>
            
          </div>

          {/*  Vision Pro */}
          <div className="bg-gray-dark text-white  flex  w-[22.5rem] h-[17rem] ">
            <img className='h-[11.875rem] w-[8.5rem] self-center' src="visionpro.png" alt="" />
            <div className='w-[10rem] h-[9rem] max-w-[11rem] gap-[8px] ml-4 mt-16 text-[29px]'>
                <div className=" font-light ">Apple Vision <span className='font-medium'>Pro</span></div>
            <div className=" text-gray-medium text-[14px] w-[12rem] ">An immersive way to experience entertainment.</div>
            </div>
            
          </div>
        </div>
        
      </div>
    </div>
  );
}

export default ProductCard;