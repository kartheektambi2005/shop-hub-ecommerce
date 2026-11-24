import { calculateDiscountedPrice } from './formatCurrency';

export const MAX_PRICE = 2000;
export const PRODUCTS_PER_PAGE = 12;
export const DEFAULT_SORT = 'newest';

export const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating-desc', label: 'Highest Rated' },
  { value: 'name-asc', label: 'Name: A to Z' },
];

export const DEFAULT_FILTERS = {
  brands: [],
  maxPrice: MAX_PRICE,
  minRating: 0,
  inStockOnly: false,
};

const finalPrice = (product) => calculateDiscountedPrice(product.price, product.discountPercentage);

export function filterProducts(products, { searchQuery, category, filters }) {
  const query = searchQuery.trim().toLowerCase();

  return products.filter((product) => {
    const matchesSearch =
      !query ||
      product.title.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query) ||
      (product.brand ?? '').toLowerCase().includes(query);
    const matchesCategory = category === 'all' || product.category === category;
    const matchesBrand = filters.brands.length === 0 || filters.brands.includes(product.brand);
    const matchesPrice = finalPrice(product) <= filters.maxPrice;
    const matchesRating = product.rating >= filters.minRating;
    const matchesStock = !filters.inStockOnly || product.stock > 0;

    return matchesSearch && matchesCategory && matchesBrand && matchesPrice && matchesRating && matchesStock;
  });
}

export function sortProducts(products, sortBy) {
  const sorted = [...products];

  switch (sortBy) {
    case 'price-asc':
      return sorted.sort((a, b) => finalPrice(a) - finalPrice(b));
    case 'price-desc':
      return sorted.sort((a, b) => finalPrice(b) - finalPrice(a));
    case 'rating-desc':
      return sorted.sort((a, b) => b.rating - a.rating);
    case 'name-asc':
      return sorted.sort((a, b) => a.title.localeCompare(b.title));
    default:
      return sorted.sort((a, b) => b.id - a.id);
  }
}
