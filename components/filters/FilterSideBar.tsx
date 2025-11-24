"use client";

import React from "react";
import FilterSection from "./FilterSection";

interface Product {
  brand: string;
  [key: string]: any;
}

interface CheckboxItemProps {
  label: string;
  checked: boolean;
  onChange: () => void;
}

const CheckboxItem: React.FC<CheckboxItemProps> = ({ label, checked, onChange }) => (
  <label className="flex items-center gap-2 text-xs sm:text-sm cursor-pointer px-2 sm:px-3 py-1.5 sm:py-2 rounded transition-all duration-200 hover:bg-gray-50">
    <input 
      type="checkbox" 
      checked={checked} 
      onChange={onChange} 
      className="accent-black w-4 h-4" 
    />
    <span>{label}</span>
  </label>
);

interface FilterSideBarProps {
  products: Product[];
  selectedBrands: string[];
  setSelectedBrands: React.Dispatch<React.SetStateAction<string[]>>;
}

const FilterSideBar: React.FC<FilterSideBarProps> = ({ products=[], selectedBrands, setSelectedBrands }) => {
  // Get unique brands from products passed from page.tsx
  const brands = Array.from(new Set(products.map((p) => p.brand)));

  const brandCounts = products.reduce((acc: Record<string, number>, product) => {
    acc[product.brand] = (acc[product.brand] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const handleBrandChange = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  return (
    <aside className="w-full lg:w-[16rem] bg-white rounded-lg lg:rounded-none p-3 sm:p-4 flex flex-col gap-3 sm:gap-4 shadow-sm lg:shadow-none">
      {/* Brand Filter */}
      <FilterSection title="Brands">
        <div className="flex flex-col gap-1 sm:gap-2">
          {brands.map((brand) => (
            <CheckboxItem
              key={brand}
              label={`${brand} (${brandCounts[brand] || 0})`}
              checked={selectedBrands.includes(brand)}
              onChange={() => handleBrandChange(brand)}
            />
          ))}
        </div>
      </FilterSection>

      {/* Static filters */}
      <FilterSection title="Battery capacity">
        <div className="flex flex-col gap-1 sm:gap-2">
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input type="checkbox" className="accent-black" />
            <span>3000–4000 mAh</span>
          </label>
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input type="checkbox" className="accent-black" />
            <span>4000–5000 mAh</span>
          </label>
        </div>
      </FilterSection>

      <FilterSection title="Screen type">
        <div className="flex flex-col gap-1 sm:gap-2">
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input type="checkbox" className="accent-black" />
            <span>AMOLED</span>
          </label>
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input type="checkbox" className="accent-black" />
            <span>IPS LCD</span>
          </label>
        </div>
      </FilterSection>

      <FilterSection title="Screen diagonal">
        <p className="text-gray-500 text-xs sm:text-sm">Coming soon...</p>
      </FilterSection>
    </aside>
  );
};

export default FilterSideBar;
