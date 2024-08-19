const FilterButton = ({ value, selectedValue, onClick }) => (
  <button
    onClick={() => onClick(value)}
    className={`cursor-pointer bg-slate-100 relative inline-flex items-center justify-center text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 hover:bg-slate-300 h-9 px-3 rounded-md ${
      selectedValue === value ? "bg-slate-300 text-white" : ""
    }`}
  >
    {value}
  </button>
);

export default FilterButton;
