import ProductCard from './ProductCard';
import SkeletonCard from '../common/SkeletonCard';

function ProductGrid({ products, isLoading }) {
  if (isLoading) {
    return (
      <div className="row g-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-5">
        <i className="bi bi-search text-body-secondary" style={{ fontSize: '2.5rem' }} />
        <p className="text-body-secondary mt-3 mb-0">No products match your filters.</p>
      </div>
    );
  }

  return (
    <div className="row g-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ProductGrid;
