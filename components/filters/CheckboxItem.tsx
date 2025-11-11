// components/filters/CheckboxItem.jsx
import React from "react";

interface CheckboxItemProps {
  label: React.ReactNode;
  count?: number;
  checked?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

const CheckboxItem = ({ label, count, checked, onChange }: CheckboxItemProps) => (
  <label className="flex items-center gap-2 text-sm">
    <input type="checkbox" checked={checked} onChange={onChange} />
    <span className="flex ">
      {label}
      {count && <span className="text-gray-400">{count}</span>}
    </span>
  </label>
);

export default CheckboxItem;
