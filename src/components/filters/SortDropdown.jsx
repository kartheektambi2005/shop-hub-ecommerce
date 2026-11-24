import { SORT_OPTIONS } from '../../utils/productFilters';

function SortDropdown({ value, onChange }) {
  return (
    <select
      className="form-select"
      style={{ maxWidth: '220px' }}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      aria-label="Sort products"
    >
      {SORT_OPTIONS.map((option) => (
        <option key={option.value} value={option.value}>
          Sort by: {option.label}
        </option>
      ))}
    </select>
  );
}

export default SortDropdown;
