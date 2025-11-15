import React from 'react'
import Link from "next/link";
const Footer = () => {
  return (
    <div className='w-[90rem] h-[31.5rem] bg-black gap-6 pt-[6.5rem] pr-[10rem] pb-[6.5rem] pl-[10rem]'>
        <div className='w-[70rem] h-[16rem] flex '>
           {/* cyber */}
           <div>
            <Link href="/">
           
            <div>  <img className=' mb-6 w-[65.4px] h-[22.87px]' src="/logofooter.png" alt="" /> </div>
              </Link>
            <div className='text-[14px] leading-[171%] text-medium tracking-[0%] font-medium text-[#CFCFCF] w-[26rem] h-[6rem] '>We are a residential interior design firm located in Portland. Our boutique-studio offers more than</div>
           </div>
           {/* lists */}
             <div className='ml-[113px] w-[38rem] h-[16rem] justify-between flex'>
               <div className='w-[18rem] h-[16rem] gap-2'>
                <span className='font-semibold text-[16px] leading-4 text-white'>Services</span>
                <ul className='text-[14px] font-normal leading-8  text-[#CFCFCF] '>
                    <li>Bonus program</li>
                    <li>Gift cards</li>
                    <li>Credit and payment</li>
                    <li>Service contracts</li>
                    <li>Non-cash account</li>
                    <li>Payment</li>
                </ul>
             </div>

             <div className='w-[18rem] h-[16rem] gap-2'>
                <span  className='font-semibold text-[16px] leading-4 text-white'>Assistance to the buyer</span>
                <ul className='text-[14px] font-normal leading-8  text-[#CFCFCF] '>
                    <li>Find an order</li>
                    <li>Terms of delivery</li>
                    <li>Exchange and return of goods</li>
                    <li>Guarantee</li>
                    <li>Frequently asked questions</li>
                    <li>Terms of use of the site</li>
                </ul>
             </div>
             </div>
            
        </div>
        {/* links */}

            <div className='w-[11rem] h-[1rem] flex justify-between mt-[24px] '>
                <Link href="/https://x.com/"><img src="Twitter.png" alt="" /></Link>
                <Link href="/"><img src="Facebook.png" alt="" /></Link>
                <Link href="/"><img src="Tiktok.png" alt="" /></Link>
                <Link href="/"><img src="Instagram.png" alt="" /></Link>
                
                
                 </div>
    </div>
  )
}

export default Footer
