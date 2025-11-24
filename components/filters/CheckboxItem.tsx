interface CheckboxItemProps {
  label: React.ReactNode;
  count?: number;
  checked?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

const CheckboxItem = ({ label, count, checked, onChange }: CheckboxItemProps) => (
  <label
    className={`flex items-center gap-2 text-xs sm:text-sm cursor-pointer px-2 sm:px-3 py-1.5 sm:py-2 rounded transition-all ${
      checked ? "bg-black text-white" : "bg-white text-black hover:bg-gray-50"
    }`}
  >
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      className="accent-black w-4 h-4"
    />
    <span className="flex gap-1">
      {label}
      {count && <span className={checked ? "text-gray-300" : "text-gray-400"}>({count})</span>}
    </span>
  </label>
);

export default CheckboxItem;
