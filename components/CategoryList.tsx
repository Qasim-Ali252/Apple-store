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
    { icon: <LiaLaptopSolid size={32} />, label: "Laptops" },
    { icon: <GoTools size={32} />, label: "Tools" },
  ];

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 6;

  const totalPages = Math.ceil(categories.length / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, categories.length);
  const visibleCategories = categories.slice(startIndex, endIndex);

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="w-full max-w-[75rem] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12 bg-white">
      {/* Heading and Navigation */}
      <div className="flex justify-between items-center mb-6 sm:mb-8">
        <h2 className="font-medium text-lg sm:text-xl lg:text-2xl text-black">
          Browse By Category
        </h2>

        {/* Navigation buttons - Hidden on mobile, shown on larger screens */}
        <div className="hidden sm:flex items-center gap-3 lg:gap-4">
          <button
            onClick={handlePrev}
            disabled={currentPage === 0}
            className={`w-8 h-8 lg:w-10 lg:h-10 flex items-center justify-center rounded-full transition-all ${
              currentPage === 0
                ? "opacity-40 cursor-not-allowed"
                : "hover:bg-gray-100 active:scale-95"
            }`}
            aria-label="Previous categories"
          >
            <img
              src="/leftArrow.png"
              alt="Previous"
              className="w-4 h-4 lg:w-5 lg:h-5"
            />
          </button>

          <button
            onClick={handleNext}
            disabled={currentPage >= totalPages - 1}
            className={`w-8 h-8 lg:w-10 lg:h-10 flex items-center justify-center rounded-full transition-all ${
              currentPage >= totalPages - 1
                ? "opacity-40 cursor-not-allowed"
                : "hover:bg-gray-100 active:scale-95"
            }`}
            aria-label="Next categories"
          >
            <img
              src="/Arrow.svg"
              alt="Next"
              className="w-4 h-4 lg:w-5 lg:h-5"
            />
          </button>
        </div>
      </div>

      {/* Category Cards - Mobile: Grid, Desktop: Single Row Flex */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 sm:hidden">
        {/* Mobile: Show all categories in grid */}
        {categories.map((category, index) => (
          <CategoryCard
            key={`mobile-${category.label}-${index}`}
            imageSrc={category.imageSrc ?? ""}
            icon={category.icon}
            label={category.label}
          />
        ))}
      </div>

      {/* Desktop: Single row with carousel */}
      <div className="hidden sm:flex gap-4 lg:gap-6 xl:gap-8 overflow-hidden relative">
        <div className="flex gap-4 lg:gap-6 xl:gap-8 transition-all duration-500 ease-in-out">
          {visibleCategories.map((category, index) => (
            <div
              key={`desktop-${category.label}-${startIndex + index}`}
              className="animate-fadeIn"
              style={{
                animation: `fadeInSlide 0.5s ease-out ${index * 0.1}s both`
              }}
            >
              <CategoryCard
                imageSrc={category.imageSrc ?? ""}
                icon={category.icon}
                label={category.label}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Navigation Dots */}
      <div className="flex sm:hidden justify-center gap-2 mt-6">
        {Array.from({ length: totalPages }).map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentPage(idx)}
            className={`w-2 h-2 rounded-full transition-all ${
              currentPage === idx ? "bg-black w-6" : "bg-gray-300"
            }`}
            aria-label={`Go to page ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
