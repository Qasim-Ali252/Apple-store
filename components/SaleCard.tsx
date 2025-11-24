const SaleCard = () => {
  return (
    <div className="w-full mx-auto h-auto min-h-[400px] sm:min-h-[500px] lg:h-[28rem] bg-gradient-to-r from-[#2E2E2E] to-[#000000] relative overflow-hidden">

      {/* LEFT SMALL TABLET (mobile/tablet only) */}
      <img
        src="/half-tablet-r.svg"
        alt="Left Tablet"
        className="block md:hidden absolute top-0 left-0 w-[48px] z-0"
      />

      {/* SUMMER FLAP (mobile/tablet only) */}
      <img
        src="/orignal-flap-r.png"
       
        className="block md:hidden absolute -top-7
         left-[80px] w-[200px] h-[90px] z-10 [transform:rotate(12deg)]"
      />

      {/* CENTER TEXT BLOCK */}
      <div className="relative lg:absolute lg:top-1/2 lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 w-full lg:w-[35.6875rem] flex flex-col justify-center items-center px-4 py-16 sm:py-16 lg:py-0 text-center mt-8 sm:absolute top-3 gap-2 ">

        <h1 className="text-4xl sm:text-5xl lg:text-[72px] leading-tight lg:leading-[72px] font-extralight text-white mb-1">
          Big Summer <span className="font-light">Sale</span>
        </h1>

        <p className="font-normal text-sm sm:text-base leading-relaxed text-[#787878] mb-2 max-w-md">
          Commodo fames vitae vitae leo mauris in. Eu consequat.
        </p>

        <button className="flex items-center justify-center gap-2 px-10 sm:px-14 py-2 sm:py-4 border-2 border-white rounded-md text-white text-sm sm:text-base font-medium hover:bg-white hover:text-black transition-all active:scale-95">
          Shop Now
        </button>

      </div>

      {/* RIGHT-SIDE IMAGES */}
      <div className="top-2 right-2 sm:top-4 sm:right-4 lg:-right-14 lg:top-0 lg:w-[400px] lg:h-full">

        {/* RIGHT IPHONE (mobile) — must overlap flap */}
        <img
          src="/iphonesale-r.svg"
          alt="iPhone Mobile"
          className="block md:hidden absolute top-0 right-0 w-[115px] z-20"
        />

        {/* RIGHT IPHONE (desktop) */}
        <img
          src="/iphonepro.svg"
          alt="iPhone Pro Desktop"
          className="hidden md:block absolute top-0 md:-right-3 lg:right-0 w-[80px] sm:w-[200px] h-auto z-20"
        />

        {/* WATCH (mobile) */}
        <img
          src="/watchsale-r.svg"
          alt="Watch Mobile"
          className="block md:hidden absolute bottom-0 right-0 w-[165px]"
        />

        {/* WATCH (desktop) */}
        <img
          src="/image 7.png"
          alt="Apple Watch"
          className="hidden md:block absolute bottom-0 md:-right-6 lg:right-0 h-[201px] w-[397px]"
        />

      </div>

      {/* LEFT SIDE DESKTOP IMAGES — DO NOT TOUCH */}
      <div className="hidden md:block absolute md:-top-14 lg:top-4  -left-6 top-4">
        <img
          className="z-10 absolute md:w-32 md:ml-14 md:top-20 lg:-top-4  lg:left-[39px] lg:w-[237px]  lg:h-[192px]  lg:ml-[39px] lg:mt-[3px]"
          src="/vertical.svg"
          alt=""
        />
        <img
          className="relative top-[172px] md:-left-28  lg:left-6 lg:mt-[-20px] w-[345px] h-[262px] lg:mb-[14px]"
          src="/blue-tablet.png"
          alt=""
        />
      </div>

    </div>
  );
};

export default SaleCard;
