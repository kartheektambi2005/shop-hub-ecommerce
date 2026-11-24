import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchAllProducts } from '../services/productService';
import { useFetch } from '../hooks/useFetch';
import ProductGrid from '../components/product/ProductGrid';
import FilterSidebar from '../components/filters/FilterSidebar';
import SortDropdown from '../components/filters/SortDropdown';
import SearchInput from '../components/filters/SearchInput';
import Pagination from '../components/common/Pagination';
import ErrorMessage from '../components/common/ErrorMessage';
import Breadcrumbs from '../components/layout/Breadcrumbs';
import {
  DEFAULT_FILTERS,
  DEFAULT_SORT,
  PRODUCTS_PER_PAGE,
  SORT_OPTIONS,
  filterProducts,
  sortProducts,
} from '../utils/productFilters';

function ProductList() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Search, category, sort and page live in the URL so views can be shared and bookmarked.
  const searchQuery = searchParams.get('q') ?? '';
  const category = searchParams.get('category') ?? 'all';
  const sortParam = searchParams.get('sort');
  const sortBy = SORT_OPTIONS.some((option) => option.value === sortParam) ? sortParam : DEFAULT_SORT;
  const requestedPage = Number.parseInt(searchParams.get('page'), 10) || 1;

  const { data: products, isLoading, error, refetch } = useFetch(() => fetchAllProducts(), []);
  const [filters, setFilters] = useState(DEFAULT_FILTERS);

  const updateParams = (changes, { resetPage = true, replace = false } = {}) => {
    const next = new URLSearchParams(searchParams);
    Object.entries(changes).forEach(([key, value]) => {
      const isDefault = value === '' || value === 'all' || value === DEFAULT_SORT || value === 1;
      if (isDefault) next.delete(key);
      else next.set(key, value);
    });
    if (resetPage) next.delete('page');
    if (next.toString() !== searchParams.toString()) setSearchParams(next, { replace });
  };

  const categories = useMemo(() => {
    if (!products) return ['all'];
    return ['all', ...new Set(products.map((product) => product.category))];
  }, [products]);

  const brands = useMemo(() => {
    if (!products) return [];
    return [...new Set(products.map((product) => product.brand).filter(Boolean))].sort();
  }, [products]);

  const handleFilterChange = (key, value) => {
    if (key === 'category') {
      updateParams({ category: value });
      return;
    }
    updateParams({}); // reset to page 1
    setFilters((previous) => {
      if (key !== 'brands') return { ...previous, [key]: value };
      const brandList = previous.brands.includes(value)
        ? previous.brands.filter((brand) => brand !== value)
        : [...previous.brands, value];
      return { ...previous, brands: brandList };
    });
  };

  const handleClearFilters = () => {
    setFilters(DEFAULT_FILTERS);
    updateParams({ category: 'all' });
  };

  const visibleProducts = useMemo(() => {
    if (!products) return [];
    return sortProducts(filterProducts(products, { searchQuery, category, filters }), sortBy);
  }, [products, searchQuery, category, filters, sortBy]);

  const totalPages = Math.ceil(visibleProducts.length / PRODUCTS_PER_PAGE);
  const currentPage = Math.min(requestedPage, Math.max(totalPages, 1));
  const pageProducts = visibleProducts.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE,
  );

  const handlePageChange = (page) => {
    updateParams({ page }, { resetPage: false });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (error) {
    return (
      <div className="container">
        <ErrorMessage message={error} onRetry={refetch} />
      </div>
    );
  }

  return (
    <div>
      <Breadcrumbs trail={[{ label: 'Products' }]} />

      <div className="container py-4">
        <div className="row g-4">
          <div className="col-lg-3">
            <FilterSidebar
              categories={categories}
              brands={brands}
              filters={{ ...filters, category }}
              onFilterChange={handleFilterChange}
              onClearFilters={handleClearFilters}
            />
          </div>

          <div className="col-lg-9">
            <div className="row g-2 align-items-center mb-3">
              <div className="col-md">
                <SearchInput
                  value={searchQuery}
                  onSearch={(term) => updateParams({ q: term.trim() }, { replace: true })}
                />
              </div>
              <div className="col-md-auto">
                <SortDropdown value={sortBy} onChange={(sort) => updateParams({ sort })} />
              </div>
            </div>

            <p className="text-body-secondary" role="status">
              {isLoading ? 'Loading products...' : `${visibleProducts.length} products found`}
            </p>

            <ProductGrid products={pageProducts} isLoading={isLoading} />

            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductList;
