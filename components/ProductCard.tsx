const ProductCard = () => {
  return (
    <div className="w-full bg-white">
      {/* Main Container - Mobile: Stack, Desktop: Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2">
        {/* Left Column */}
        <div className="flex flex-col  ">
          {/* PlayStation 5 Card */}
          <div className="bg-white  pt-2 pr-4  text-black flex flex-col sm:flex-row  items-center">
            <div className=" sm:w-1/2  lg:mr-0">
            {/* mobile version  */}
              <img
                className=" block sm:hidden "
                src="/playstationhead-r.svg "
                alt=""
              />
              {/* desktop version  */}
              <img
                src="/PlayStation.png"
                alt="PlayStation 5"
                className=" h-48 hidden sm:block sm:h-60 lg:h-72 object-contain"
              />
            </div>
            <div className="flex  pl-2 sm:pl-0 flex-col text-center sm:text-start justify-center items-center sm:items-start  gap-2 sm:gap-4  w-80 sm:w-1/2">
              <h2 className="text-3xl sm:text-4xl lg:text-[49px] font-medium leading-tight">
                Playstation 5
              </h2>
              <p className=" font-medium text-sm leading-6 text-gray-medium">
                Incredibly powerful CPUs, GPUs, and an SSD with integrated I/O
                will redefine your PlayStation experience.
              </p>
            </div>
          </div>

          {/* AirPods & Vision Pro Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 ">


            {/* AirPods Max Card */}
            <div className="bg-[#EDEDED] text-black flex flex-col sm:flex-row items-center gap-4  min-h-[17rem]">
              {/* mobile version  */}
              <div className="w-full h-[13rem] flex flex-col justify-center items-center sm:hidden">
                <img
                  className="h-40 object-contain"
                  src="/airpods-r.svg"
                  alt=""
                />
               
              </div>
                


                {/* desktop version  */}
              <img
                className="hidden sm:block w-20 h-48 sm:w-[104px] sm:h-[272px] object-contain"
                src="airpods.png"
                alt="AirPods Max"
              />
              <div className="flex  flex-col   text-center sm:text-left  pb-4">
                <h3 className="flex sm:flex-col justify-center gap-2 text-2xl sm:text-[29px] leading-tight font-light">
                  Apple
                  <div className="flex gap-1 justify-center sm:justify-start">
                    <span>AirPods</span>
                    <span className="font-medium">Max</span>
                  </div>
                </h3>
                <p className="text-sm text-gray-700">
                  Computational audio. Listen, it's powerful.
                </p>
              </div>
            </div>

            {/* Vision Pro Card */}
            <div className="bg-gray-dark text-white flex flex-col sm:flex-row justify-center items-center sm:gap-4  min-h-[17rem]  ">
                 
                 {/* mobile version */}
                 <div className=" sm:hidden w-[15rem] ">
                    <img src="applevisionhead-r.svg" alt="" />
                 </div>
                 

              <img
                className="hidden sm:block h-40 w-32 sm:h-[11.875rem] sm:w-[8.5rem] object-contain"
                src="visionpro.png"
                alt="Apple Vision Pro"
              />
              <div className="flex flex-col gap-2 text-center sm:text-left">
                <h3 className="text-2xl sm:text-[29px] font-light">
                  Apple Vision <span className="font-medium">Pro</span>
                </h3>
                <p className="text-sm text-gray-medium">
                  An immersive way to experience entertainment.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - MacBook Air Card */}
        <div className="bg-gray-light text-black flex flex-col sm:flex-row justify-center gap-6 sm:justify-between items-center    md:pl-28  min-h-[30rem] lg:min-h-[35.8rem]">

           {/* mobile version */}
          <div className="block sm:hidden ">
            <img src="/macbookhead-r.svg" alt="" />
          </div>

          {/* desktop version  */}
          <div className="flex flex-col  gap-4 max-w-md text-center lg:text-left">
            <h2 className="font-extralight text-4xl sm:text-5xl lg:text-[64px] leading-tight">
              Macbook <span className="font-medium">Air</span>
            </h2>
            <p className="text-base text-gray-medium">
              The new 15‑inch MacBook Air makes room for more of what you love
              with a spacious Liquid Retina display.
            </p>
            <button className="flex items-center justify-center gap-2 px-8 sm:px-14 py-3 sm:py-4 border border-black rounded-md text-black text-base font-medium hover:bg-black hover:text-white transition-colors mx-auto lg:mx-0">
              Shop Now
            </button>
          </div>
         
          <img
            className=" hidden  sm:block w-48 sm:w-64 lg:w-[14.25rem]  h-auto  object-contain"
            src="MacBook Pro 14.svg"
            alt="MacBook Air"
          />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
