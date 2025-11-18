"use client";

import React, { useState } from "react";
import CategoryCard from "./CategoryCard";
import { LiaLaptopSolid } from "react-icons/lia";
import { GoTools } from "react-icons/go";

const CategoryList: React.FC = () => {
  const categories = [
    { imageSrc: "/Phones.png", label: "Smart Phones" },
    { imageSrc: "/Smart Watches.png", label: "Stopwatch" },
    { imageSrc: "/Cameras.png", label: "Camera" },
    { imageSrc: "/Headphones.png", label: "Headphones" },
    { imageSrc: "/Computers.png", label: "Computers" },
    { imageSrc: "/Gaming.png", label: "Gaming" },
    { icon : <LiaLaptopSolid size={32} />, label: "Laptops" },
    { icon : <GoTools size={32} />, label: "Tools" },
  ];

  const [startIndex, setStartIndex] = useState(0);
  const visibleCount = 6; // ✅ Show 6 at a time

  // Get visible categories for current window
  const visibleCategories = categories.slice(startIndex, startIndex + visibleCount);

  // ✅ Handle navigation
  const handleNext = () => {
    if (startIndex + visibleCount < categories.length) {
      setStartIndex(startIndex + 1);
    }
  };

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  return (
    <div className="w-[90rem] h-[22rem] gap-[32px] bg-white flex flex-col justify-center items-center">
      {/* Heading */}
      <div className="flex justify-between w-[70rem] mb-6">
        <div className="font-medium text-[24px] leading-8 tracking-[1%] text-black">
          Browse By Category
        </div>
             
        {/* ✅ Navigation buttons */}
        <div className="w-[80px] h-[32px] gap-[16px] flex items-center">
          <button
            onClick={handlePrev}
            disabled={startIndex === 0}
            className={`w-[32px] h-[32px] flex items-center justify-center rounded-full ${
              startIndex === 0 ? "opacity-40 cursor-not-allowed" : "hover:bg-gray-100"
            }`}
          >
            <img src="/leftArrow.png" alt="left" />
          </button>

          <button
            onClick={handleNext}
            disabled={startIndex + visibleCount >= categories.length}
            className={`w-[32px] h-[32px] flex items-center justify-center rounded-full ${
              startIndex + visibleCount >= categories.length
                ? "opacity-40 cursor-not-allowed"
                : "hover:bg-gray-100"
            }`}
          >
            <img src="/Arrow.svg" alt="right" />
          </button>
        </div>
      </div>

      {/* ✅ Category Cards Carousel */}
      <div className="w-[70rem] h-[8rem] gap-8 flex transition-all duration-300 ease-in-out">
        {visibleCategories.map((category, index) => (
          <CategoryCard
            key={index}
            imageSrc={category.imageSrc}
            icon={category.icon}
            label={category.label}
          
            
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
