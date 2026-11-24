import { MAX_PRICE } from '../../utils/productFilters';

function FilterSidebar({
  categories,
  brands,
  filters,
  onFilterChange,
  onClearFilters,
}) {
  const ratingOptions = [4, 3, 2, 1];

  return (
    <aside className="d-flex flex-column gap-4">
      <div className="d-flex justify-content-between align-items-center">
        <h5 className="fw-bold mb-0">Filters</h5>
        <button className="btn btn-sm btn-link text-decoration-none" onClick={onClearFilters}>
          Clear all
        </button>
      </div>

      <div>
        <h6 className="fw-semibold mb-2">Category</h6>
        <div className="d-flex flex-column gap-1">
          {categories.map((category) => (
            <div className="form-check" key={category}>
              <input
                type="radio"
                className="form-check-input"
                id={`category-${category}`}
                name="category"
                checked={filters.category === category}
                onChange={() => onFilterChange('category', category)}
              />
              <label className="form-check-label text-capitalize small" htmlFor={`category-${category}`}>
                {category.replace(/-/g, ' ')}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h6 className="fw-semibold mb-2">Brand</h6>
        <div className="d-flex flex-column gap-1" style={{ maxHeight: '180px', overflowY: 'auto' }}>
          {brands.map((brand) => (
            <div className="form-check" key={brand}>
              <input
                type="checkbox"
                className="form-check-input"
                id={`brand-${brand}`}
                checked={filters.brands.includes(brand)}
                onChange={() => onFilterChange('brands', brand)}
              />
              <label className="form-check-label small" htmlFor={`brand-${brand}`}>
                {brand}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h6 className="fw-semibold mb-2">Max Price: ${filters.maxPrice}</h6>
        <input
          type="range"
          className="form-range"
          min="0"
          max={MAX_PRICE}
          step="10"
          value={filters.maxPrice}
          onChange={(event) => onFilterChange('maxPrice', Number(event.target.value))}
        />
      </div>

      <div>
        <h6 className="fw-semibold mb-2">Minimum Rating</h6>
        <div className="d-flex flex-column gap-1">
          {ratingOptions.map((rating) => (
            <div className="form-check" key={rating}>
              <input
                type="radio"
                className="form-check-input"
                id={`rating-${rating}`}
                name="rating"
                checked={filters.minRating === rating}
                onChange={() => onFilterChange('minRating', rating)}
              />
              <label className="form-check-label small" htmlFor={`rating-${rating}`}>
                {rating}★ &amp; up
              </label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h6 className="fw-semibold mb-2">Availability</h6>
        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="in-stock-only"
            checked={filters.inStockOnly}
            onChange={() => onFilterChange('inStockOnly', !filters.inStockOnly)}
          />
          <label className="form-check-label small" htmlFor="in-stock-only">
            In stock only
          </label>
        </div>
      </div>
    </aside>
  );
}

export default FilterSidebar;
