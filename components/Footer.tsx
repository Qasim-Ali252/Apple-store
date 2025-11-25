import Link from "next/link";

const Footer = () => {
  return (
    <footer className='w-full bg-[#181313] lg:bg-black gap-8 py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-40'>
      <div className='max-w-7xl mx-auto'>
        {/* Main Content */}
        <div className='flex flex-col items-center text-center md:text-left md:items-start lg:flex-row gap-8 lg:gap-12 xl:gap-16 mb-8 lg:mb-12'>
          
          {/* Brand Section */}
          <div className='flex-1 max-w-md flex flex-col items-center md:items-start'>
            <Link href="/" className="inline-block mb-4 lg:mb-6">
              <img 
                className='w-16 h-auto sm:w-[65.4px]' 
                src="/logofooter.png" 
                alt="Cyber Logo" 
              />
            </Link>
            <p className='text-sm sm:text-base leading-relaxed font-medium text-[#CFCFCF]'>
              We are a residential interior design firm located in Portland. Our boutique-studio offers more than
            </p>
          </div>
          
          {/* Links Section */}
          <div className='flex-1 grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-12 w-full md:w-auto'>
            
            {/* Services */}
            <div className='flex flex-col items-center md:items-start'>
              <h3 className='font-semibold text-base sm:text-lg mb-3 sm:mb-4 text-white'>
                Services
              </h3>
              <ul className='text-sm sm:text-base space-y-2 text-[#CFCFCF]'>
                <li className="hover:text-white transition-colors cursor-pointer">Bonus program</li>
                <li className="hover:text-white transition-colors cursor-pointer">Gift cards</li>
                <li className="hover:text-white transition-colors cursor-pointer">Credit and payment</li>
                <li className="hover:text-white transition-colors cursor-pointer">Service contracts</li>
                <li className="hover:text-white transition-colors cursor-pointer">Non-cash account</li>
                <li className="hover:text-white transition-colors cursor-pointer">Payment</li>
              </ul>
            </div>

            {/* Assistance */}
            <div className='flex flex-col items-center md:items-start'>
              <h3 className='font-semibold text-base sm:text-lg mb-3 sm:mb-4 text-white'>
                Assistance to the buyer
              </h3>
              <ul className='text-sm sm:text-base space-y-2 text-[#CFCFCF]'>
                <li className="hover:text-white transition-colors cursor-pointer">Find an order</li>
                <li className="hover:text-white transition-colors cursor-pointer">Terms of delivery</li>
                <li className="hover:text-white transition-colors cursor-pointer">Exchange and return of goods</li>
                <li className="hover:text-white transition-colors cursor-pointer">Guarantee</li>
                <li className="hover:text-white transition-colors cursor-pointer">Frequently asked questions</li>
                <li className="hover:text-white transition-colors cursor-pointer">Terms of use of the site</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className='flex justify-center md:justify-start gap-4 sm:gap-6 pt-6 '>
          <Link 
            href="https://x.com/" 
            target="_blank"
            className="hover:opacity-80 transition-opacity"
          >
            <img src="/Twitter.png" alt="Twitter" className="w-6 h-6 sm:w-8 sm:h-8" />
          </Link>
          <Link 
            href="https://facebook.com/" 
            target="_blank"
            className="hover:opacity-80 transition-opacity"
          >
            <img src="/Facebook.png" alt="Facebook" className="w-6 h-6 sm:w-8 sm:h-8" />
          </Link>
          <Link 
            href="https://tiktok.com/" 
            target="_blank"
            className="hover:opacity-80 transition-opacity"
          >
            <img src="/Tiktok.png" alt="TikTok" className="w-6 h-6 sm:w-8 sm:h-8" />
          </Link>
          <Link 
            href="https://instagram.com/" 
            target="_blank"
            className="hover:opacity-80 transition-opacity"
          >
            <img src="/Instagram.png" alt="Instagram" className="w-6 h-6 sm:w-8 sm:h-8" />
          </Link>
        </div>

        {/* Copyright */}
        {/* <div className='mt-8 pt-6 text-center'>
          <p className='text-sm text-[#CFCFCF]'>
            © {new Date().getFullYear()} Cyber. All rights reserved.
          </p>
        </div> */}
      </div>
    </footer>
  )
}

export default Footer
