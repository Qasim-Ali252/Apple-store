"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

type FilterSectionProps = {
  title: React.ReactNode;
  children?: React.ReactNode;
};

const FilterSection: React.FC<FilterSectionProps> = ({ title, children }) => {
  const [open, setOpen] = useState(true);

  return (
    <div className="border-b border-gray-200 pb-3">
      <button
        onClick={() => setOpen(!open)}
        className="flex justify-between items-center w-full text-sm sm:text-base font-medium text-gray-900 hover:text-black transition-colors py-1"
      >
        {title}
        <ChevronDown
          className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && <div className="mt-2 sm:mt-3">{children}</div>}
    </div>
  );
};

export default FilterSection;
