

"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Heart, ShoppingCart, User, Menu, X, Search } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className=" w-[90rem] h-[5.5rem] flex items-center  px-8 py-4 bg-white shadow-md justify-between pt-[1rem] pr-[10rem] pb-[1rem] pl-[10rem] ">

      
        {/* Logo */}
        <div >
        <div className="gap-[0.625rem] w-[4.09rem] h-[1.43rem]"><img src="/Logo Vector.svg" alt="" /></div>
       </div>


        {/* Search Bar */}
      
       <div className="hidden md:flex items-center ">
    <div className="relative ">
    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5 mr-1" />
    <input
      type="text"
      placeholder="Search..."
      className=" gap-[0.5rem] flex items-center bg-gray-200 p-[2rem] rounded-[8px] w-[23.25rem] h-[3.5rem] focus:outline-none "
    />
  </div>
</div>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center  w-[22.94rem] h-[1.19rem] gap-[3.25rem] ">
          <Link href="/" className="text-#000000 hover:text-black font-medium text-base">
            Home
          </Link>
          <Link href="/about" className="text-#000000 hover:text-black font-medium opacity-30 text-base">
            About
          </Link>
          <Link href="/contact" className="text-#000000 hover:text-black font-medium  opacity-30 text-sm">
            Contact Us
          </Link>
          <Link href="/blog" className="text-#000000 hover:text-black font-medium opacity-30 text-base">
            Blog
          </Link>
        </div>

        {/* Icons */}
        <div className="flex items-center w-[9rem] h-[2rem] gap-[1.5rem]">
          <Heart className="w-[2rem] h-[2rem] text-gray-700 cursor-pointer hover:text-black" />
          <ShoppingCart className="w-[2rem] h-[2rem] text-gray-700 cursor-pointer hover:text-black" />
          <User className="w-[2rem] h-[2rem] text-gray-700 cursor-pointer hover:text-black" />

          {/* Mobile Menu Button */}
          <button
            className="md:hidden focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md px-6 py-4 space-y-4">
          <input
            type="text"
            placeholder="Search..."
            className="w-full border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
          />
          <Link href="/" className="block text-gray-700 hover:text-black">
            Home
          </Link>
          <Link href="/about" className="block text-gray-700 hover:text-black">
            About
          </Link>
          <Link href="/contact" className="block text-gray-700 hover:text-black">
            Contact Us
          </Link>
          <Link href="/blog" className="block text-gray-700 hover:text-black">
            Blog
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
