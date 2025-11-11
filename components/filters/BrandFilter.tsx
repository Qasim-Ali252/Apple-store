"use client";
import React, { useState } from "react";
import FilterSection from "./FilterSection";

const brands = [
  { name: "Apple", count: 110 },
  { name: "Samsung", count: 125 },
  { name: "Xiaomi", count: 68 },
  { name: "Poco", count: 44 },
  { name: "OPPO", count: 36 },
  { name: "Honor", count: 10 },
  { name: "Motorola", count: 34 },
  { name: "Nokia", count: 22 },
  { name: "Realme", count: 35 },
];

const BrandFilter: React.FC = () => {
  const [search, setSearch] = useState<string>("");
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

  const filtered = brands.filter((b) =>
    b.name.toLowerCase().includes(search.toLowerCase())
  );

  const toggleBrand = (name: string) => {
    setSelectedBrands((prev) =>
      prev.includes(name)
        ? prev.filter((b) => b !== name)
        : [...prev, name]
    );
  };

  return (
    <FilterSection title="Brands">
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search"
        className="w-full border rounded-md px-2 py-1 mb-3 text-sm"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Brand List */}
      <div className=" flex flex-col gap-2 max-h-60 overflow-y-auto">
        {filtered.map((b) => (
          <label key={b.name} className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={selectedBrands.includes(b.name)}
              onChange={() => toggleBrand(b.name)}
            />
            <span className="flex justify-between w-full text-sm">
              {b.name}
              <span className="text-gray-400">{b.count}</span>
            </span>
          </label>
        ))}
      </div>
    </FilterSection>
  );
};

export default BrandFilter;
