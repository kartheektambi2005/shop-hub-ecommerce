const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating-desc', label: 'Highest Rated' },
  { value: 'name-asc', label: 'Name: A to Z' },
];

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
