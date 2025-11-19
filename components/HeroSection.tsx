const HeroSection = () => {
  return (
    <div className='w-full min-h-screen lg:h-[39.5rem] bg-custom-gradient flex flex-col lg:flex-row lg:items-center lg:justify-between px-4 md:px-10 lg:px-20 py-8 lg:py-0'>
      {/* Text Content */}
      <div className='w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left'>
        {/* Tagline */}
        <div className='font-semibold opacity-40 text-white text-xl md:text-2xl lg:text-[1.5625rem] mb-4 lg:mb-6'>
          Pro.Beyond.
        </div>
        
        {/* Main Heading */}
        <div className='mb-6 lg:mb-8'>
          <h1 className='font-extralight text-5xl md:text-6xl lg:text-7xl xl:text-[6rem] text-white leading-tight'>
            IPhone 14{' '}
            <span className='font-semibold block lg:inline'>Pro</span>
          </h1>
        </div>
        
        {/* Description */}
        <p className='font-medium text-base md:text-lg lg:text-[1.125rem] text-gray-400 max-w-md mb-6 lg:mb-8'>
          Created to change everything for the better. For everyone
        </p>
        
        {/* CTA Button */}
        <button className='w-[11.5rem] h-[3.5rem] rounded-md border border-white text-white hover:bg-white hover:text-black transition-colors duration-300 font-medium text-base'>
          Shop Now
        </button>
      </div>
      
      {/* Phone Image */}
      <div className='w-full lg:w-1/2 flex items-center justify-center -mb-8  mt-8 lg:mt-0'>
        <img 
          src="/Iphone Image.svg" 
          alt="iPhone 14 Pro" 
          className='w-full max-w-[300px] md:max-w-[400px] lg:max-w-[500px] xl:max-w-[600px] h-auto object-contain'
        />
      </div>
    </div>
  )
}

export default HeroSection
