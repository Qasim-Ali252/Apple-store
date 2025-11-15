"use client";
import React from "react";

interface CategoryTopBarProps {
  totalProducts: number;
  sortOption: string;
  setSortOption: (option: string) => void;
}

const CategoryTopBar = ({ totalProducts, sortOption, setSortOption }: CategoryTopBarProps) => {
  return (
    <div className="flex justify-between items-center pb-4 mb-6   w-[51.9rem] h-[2.5rem]">
      {/* Left side: product count */}
      <h2 className="text-gray-700 font-medium text-lg">
        Selected Products: <span className="font-semibold">{totalProducts}</span>
      </h2>

      {/* Right side: sort dropdown */}
      <div className="flex items-center gap-2">
        <label htmlFor="sort" className="text-gray-600 text-sm">Sort by</label>
        <select
          id="sort"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none"
        >
          <option value="rating">Rating</option>
          <option value="priceLow">Price: Low to High</option>
          <option value="priceHigh">Price: High to Low</option>
          <option value="newest">Newest</option>
        </select>
      </div>
    </div>
  );
};

export default CategoryTopBar;
