// components/FilterSection.jsx
import FilterButton from "./FilterButton";

const FilterSection = ({ label, options, selectedValue, onFilterClick }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium mb-1">{label}</label>
    <div className="flex gap-2 flex-wrap">
      {options.map((option) => (
        <FilterButton
          key={option}
          value={option}
          selectedValue={selectedValue}
          onClick={onFilterClick}
        />
      ))}
    </div>
  </div>
);

export default FilterSection;
