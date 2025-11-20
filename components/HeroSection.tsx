const HeroSection = () => {
  return (
    <section className="w-full min-h-[600px] sm:min-h-[700px] md:min-h-[800px] lg:h-[39.5rem] bg-custom-gradient">
      <div className="max-w-[1800px]  xl:w-[90%] mx-auto h-full flex flex-col lg:flex-row xl:px-0 px-8 lg:pt-0 pt-20 lg:items-center lg:justify-between ">
        
        {/* Text Content */}
        <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left mb-8 lg:mb-0">
          <div className="max-w-2xl">
            {/* Tagline */}
            <div className="font-semibold opacity-40 text-white text-lg sm:text-xl md:text-2xl lg:text-[1.5625rem] mb-3 sm:mb-4 lg:mb-6">
              Pro.Beyond.
            </div>

            {/* Main Heading */}
            <h1 className="font-extralight text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[6rem] text-white leading-tight mb-4 sm:mb-6 lg:mb-8">
              IPhone 14{" "}
              <span className="font-semibold block sm:inline lg:block xl:inline">Pro</span>
            </h1>

            {/* Description */}
            <p className="font-medium text-sm sm:text-base md:text-lg lg:text-[1.125rem] text-gray-400 mb-6 sm:mb-8 lg:mb-10 px-4 sm:px-0">
              Created to change everything for the better. For everyone
            </p>

            {/* CTA Button */}
            <button className="w-full max-w-[11.5rem] h-12 sm:h-14 lg:h-[3.5rem] rounded-md border-2 border-white text-white hover:bg-white hover:text-black transition-all duration-300 font-medium text-sm sm:text-base shadow-lg hover:shadow-xl">
              Shop Now
            </button>
          </div>
        </div>

        {/* Image Section */}
        <div className="w-full lg:w-1/2 flex items-end justify-center h-full">
          <div className="relative w-full flex items-end  justify-center ">
            <img
              src="/Iphone Image.svg"
              alt="iPhone 14 Pro"
              className=" object-contain xl:min-h-[800px] drop-shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
