import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import HeroBanner from '../components/layout/HeroBanner';
import CategoryGrid from '../components/product/CategoryGrid';
import ProductGrid from '../components/product/ProductGrid';
import ErrorMessage from '../components/common/ErrorMessage';
import { fetchAllProducts, fetchCategories } from '../services/productService';
import { useFetch } from '../hooks/useFetch';

function Home() {
  const { data: products, isLoading, error, refetch } = useFetch(() => fetchAllProducts(40), []);
  const { data: rawCategories } = useFetch(() => fetchCategories(), []);

  const categories = useMemo(() => {
    if (!rawCategories) return [];
    return rawCategories.map((category) =>
      typeof category === 'string' ? { slug: category, name: category.replace(/-/g, ' ') } : category,
    );
  }, [rawCategories]);

  const featuredProducts = useMemo(() => products?.slice(0, 8) || [], [products]);

  const trendingProducts = useMemo(
    () => (products ? [...products].sort((a, b) => b.rating - a.rating).slice(0, 4) : []),
    [products],
  );

  const bestSellers = useMemo(
    () =>
      products
        ? [...products].sort((a, b) => b.discountPercentage - a.discountPercentage).slice(0, 4)
        : [],
    [products],
  );

  if (error) {
    return (
      <div className="container">
        <ErrorMessage message={error} onRetry={refetch} />
      </div>
    );
  }

  return (
    <div>
      <HeroBanner />

      {categories.length > 0 && <CategoryGrid categories={categories} />}

      <section className="container py-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3 className="fw-bold mb-0">Featured Products</h3>
          <Link to="/products" className="text-decoration-none">View All &rarr;</Link>
        </div>
        <ProductGrid products={featuredProducts} isLoading={isLoading} />
      </section>

      {trendingProducts.length > 0 && (
        <section className="bg-body-tertiary py-5">
          <div className="container">
            <h3 className="fw-bold mb-4">Trending Now</h3>
            <ProductGrid products={trendingProducts} isLoading={false} />
          </div>
        </section>
      )}

      {bestSellers.length > 0 && (
        <section className="container py-5">
          <h3 className="fw-bold mb-4">Best Sellers</h3>
          <ProductGrid products={bestSellers} isLoading={false} />
        </section>
      )}
    </div>
  );
}

export default Home;
