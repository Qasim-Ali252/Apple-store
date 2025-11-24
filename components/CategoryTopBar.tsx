"use client";
import { SlidersHorizontal, ChevronDown } from "lucide-react";

interface CategoryTopBarProps {
  totalProducts: number;
  sortOption: string;
  setSortOption: (option: string) => void;
  onFilterClick?: () => void;
}

const CategoryTopBar = ({ totalProducts, sortOption, setSortOption, onFilterClick }: CategoryTopBarProps) => {
  return (
    <div className="w-full mb-6">
      {/* Mobile/Tablet View - Below 1280px */}
      <div className="xl:hidden flex flex-col gap-4">
        {/* Filter and Sort Buttons */}
        <div className="grid grid-cols-2 gap-3">
          {/* Filters Button */}
          <button
            onClick={onFilterClick}
            className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 bg-white border-2 border-gray-200 rounded-xl hover:border-gray-300 hover:shadow-sm active:scale-[0.98] transition-all"
          >
            <span className="text-base sm:text-lg font-medium text-black">Filters</span>
            <SlidersHorizontal className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
          </button>

          {/* Sort Dropdown Button - Beautiful styling */}
          <div className="relative">
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              style={{
                backgroundImage: 'none',
              }}
              className="w-full appearance-none px-4 sm:px-6 py-3 sm:py-4 bg-white border-2 border-gray-200 rounded-xl hover:border-gray-300 hover:shadow-sm transition-all text-base sm:text-lg font-medium text-black cursor-pointer focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
            >
              <option value="rating">By rating</option>
              <option value="priceLow">Price: Low to High</option>
              <option value="priceHigh">Price: High to Low</option>
              <option value="newest">Newest</option>
            </select>
            <ChevronDown className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 w-5 h-5 sm:w-6 sm:h-6 text-gray-600 pointer-events-none" />
          </div>
        </div>

        {/* Products Result */}
        <div className="text-gray-500 text-sm sm:text-base">
          Products Result: <span className="text-black font-semibold text-xl sm:text-2xl">{totalProducts}</span>
        </div>
      </div>

      {/* Desktop View - Above 1280px */}
      <div className="hidden xl:flex justify-between items-center">
        <h2 className="text-gray-700 font-medium text-lg">
          Selected Products: <span className="font-semibold">{totalProducts}</span>
        </h2>

        <div className="flex items-center gap-2">
          <label htmlFor="sort" className="text-gray-600 text-sm whitespace-nowrap">
            Sort by
          </label>
          <select
            id="sort"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
          >
            <option value="rating">Rating</option>
            <option value="priceLow">Price: Low to High</option>
            <option value="priceHigh">Price: High to Low</option>
            <option value="newest">Newest</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default CategoryTopBar;
