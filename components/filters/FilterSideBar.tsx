// components/filters/FilterSidebar.jsx
import React from "react";
import BrandFilter from "./BrandFilter";
import FilterSection from "./FilterSection";

const FilterSidebar = () => {
  return (
    <aside className="w-[16rem]   mt-6 bg-white border  p-4 flex flex-col gap-4">
      <BrandFilter />

      <FilterSection title="Battery capacity">
        <div className="flex flex-col gap-2">
          <label className="flex items-center gap-2">
            <input type="checkbox" /> <span>3000–4000 mAh</span>
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" /> <span>4000–5000 mAh</span>
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" /> <span>4000–5000 mAh</span>
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" /> <span>4000–5000 mAh</span>
          </label>
        </div>
      </FilterSection>

      <FilterSection title="Screen type">
        <div className="flex flex-col gap-2">
          <label className="flex items-center gap-2">
            <input type="checkbox" /> <span>AMOLED</span>
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" /> <span>IPS LCD</span>
          </label>
        </div>
      </FilterSection>

      <FilterSection title="Screen diagonal">
        <p className="text-gray-500 text-sm">Coming soon...</p>
      </FilterSection>
    </aside>
  );
};

export default FilterSidebar;
