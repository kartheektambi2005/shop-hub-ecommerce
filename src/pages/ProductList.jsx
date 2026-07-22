import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchAllProducts } from '../services/productService';
import { useFetch } from '../hooks/useFetch';
import ProductGrid from '../components/product/ProductGrid';
import FilterSidebar from '../components/filters/FilterSidebar';
import SortDropdown from '../components/filters/SortDropdown';
import Pagination from '../components/common/Pagination';
import ErrorMessage from '../components/common/ErrorMessage';
import Breadcrumbs from '../components/layout/Breadcrumbs';

const PRODUCTS_PER_PAGE = 12;

const DEFAULT_FILTERS = {
  category: 'all',
  brands: [],
  maxPrice: 2000,
  minRating: 0,
  inStockOnly: false,
};

function ProductList() {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('q')?.toLowerCase() || '';

  const { data: products, isLoading, error, refetch } = useFetch(() => fetchAllProducts(100), []);

  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [sortBy, setSortBy] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);

  const categories = useMemo(() => {
    if (!products) return ['all'];
    const uniqueCategories = [...new Set(products.map((product) => product.category))];
    return ['all', ...uniqueCategories];
  }, [products]);

  const brands = useMemo(() => {
    if (!products) return [];
    return [...new Set(products.map((product) => product.brand).filter(Boolean))];
  }, [products]);

  const handleFilterChange = (key, value) => {
    setCurrentPage(1);
    setFilters((prevFilters) => {
      if (key === 'brands') {
        const alreadySelected = prevFilters.brands.includes(value);
        const updatedBrands = alreadySelected
          ? prevFilters.brands.filter((brand) => brand !== value)
          : [...prevFilters.brands, value];
        return { ...prevFilters, brands: updatedBrands };
      }
      return { ...prevFilters, [key]: value };
    });
  };

  const handleClearFilters = () => {
    setFilters(DEFAULT_FILTERS);
    setCurrentPage(1);
  };

  const filteredProducts = useMemo(() => {
    if (!products) return [];

    const filtered = products.filter((product) => {
      const matchesSearch = searchQuery
        ? product.title.toLowerCase().includes(searchQuery) ||
          product.description.toLowerCase().includes(searchQuery)
        : true;
      const matchesCategory = filters.category === 'all' || product.category === filters.category;
      const matchesBrand = filters.brands.length === 0 || filters.brands.includes(product.brand);
      const discountedPrice = product.price - (product.price * product.discountPercentage) / 100;
      const matchesPrice = discountedPrice <= filters.maxPrice;
      const matchesRating = product.rating >= filters.minRating;
      const matchesStock = !filters.inStockOnly || product.stock > 0;

      return matchesSearch && matchesCategory && matchesBrand && matchesPrice && matchesRating && matchesStock;
    });

    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'rating-desc':
          return b.rating - a.rating;
        case 'name-asc':
          return a.title.localeCompare(b.title);
        default:
          return b.id - a.id;
      }
    });

    return sorted;
  }, [products, filters, sortBy, searchQuery]);

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE,
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
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
      <Breadcrumbs trail={[{ label: searchQuery ? `Search: "${searchQuery}"` : 'Products' }]} />

      <div className="container py-4">
        <div className="row g-4">
          <div className="col-lg-3">
            <FilterSidebar
              categories={categories}
              brands={brands}
              filters={filters}
              onFilterChange={handleFilterChange}
              onClearFilters={handleClearFilters}
            />
          </div>

          <div className="col-lg-9">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <p className="text-body-secondary mb-0">
                {isLoading ? 'Loading...' : `${filteredProducts.length} products found`}
              </p>
              <SortDropdown value={sortBy} onChange={setSortBy} />
            </div>

            <ProductGrid products={paginatedProducts} isLoading={isLoading} />

            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductList;
