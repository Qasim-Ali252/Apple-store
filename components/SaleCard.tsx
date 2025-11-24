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
        src="/summer-flap.svg"
        alt="Summer Flap"
        className="block md:hidden absolute top-[-3] left-[80px] w-[200px] h-[90px] -rotate-2 z-10"
      />

      {/* CENTER TEXT BLOCK */}
      <div className="relative lg:absolute lg:top-1/2 lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 w-full lg:w-[35.6875rem] flex flex-col justify-center items-center px-4 py-14 sm:py-16 lg:py-0 text-center">

        <h1 className="text-4xl sm:text-5xl lg:text-[72px] leading-tight lg:leading-[72px] font-extralight text-white mb-4">
          Big Summer <span className="font-light">Sale</span>
        </h1>

        <p className="font-normal text-sm sm:text-base leading-relaxed text-[#787878] mb-6 max-w-md">
          Commodo fames vitae vitae leo mauris in. Eu consequat.
        </p>

        <button className="flex items-center justify-center gap-2 px-10 sm:px-14 py-3 sm:py-4 border-2 border-white rounded-md text-white text-sm sm:text-base font-medium hover:bg-white hover:text-black transition-all active:scale-95">
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
          className="hidden md:block absolute top-0 right-0 w-[80px] sm:w-[200px] h-auto z-20"
        />

        {/* WATCH (mobile) */}
        <img
          src="/watchsale-r.svg"
          alt="Watch Mobile"
          className="block md:hidden absolute bottom-0 right-0 w-[165px] z-10"
        />

        {/* WATCH (desktop) */}
        <img
          src="/image 7.png"
          alt="Apple Watch"
          className="hidden md:block absolute bottom-0 right-0 h-[201px] w-[397px]"
        />

      </div>

      {/* LEFT SIDE DESKTOP IMAGES — DO NOT TOUCH */}
      <div className="hidden md:block absolute -left-6 top-4">
        <img
          className="z-10 absolute -top-4 left-[39px] w-[237px] h-[192px] ml-[39px] mt-[3px]"
          src="/vertical.svg"
          alt=""
        />
        <img
          className="relative top-[172px] left-6 mt-[-20px] w-[345px] h-[262px] mb-[14px]"
          src="/blue-tablet.png"
          alt=""
        />
      </div>

    </div>
  );
};

export default SaleCard;
