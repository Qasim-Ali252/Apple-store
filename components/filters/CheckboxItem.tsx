// components/filters/CheckboxItem.jsx
import React from "react";

interface CheckboxItemProps {
  label: React.ReactNode;
  count?: number;
  checked?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

const CheckboxItem = ({ label, count, checked, onChange }: CheckboxItemProps) => (
  <label  className={`flex items-center gap-2 text-sm cursor-pointer px-3 py-2 rounded 
      ${checked ? "bg-black text-white" : "bg-white text-black"}`}>
    <input type="checkbox" checked={checked} onChange={onChange}   />
    <span className="flex ">
      {label}
      {count && <span className="text-gray-400 ">{count}</span>}
    </span>
  </label>
);

export default CheckboxItem;
