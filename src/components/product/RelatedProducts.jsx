import ProductCard from './ProductCard';

function RelatedProducts({ products, currentProductId }) {
  const related = products.filter((product) => product.id !== currentProductId).slice(0, 4);

  if (related.length === 0) return null;

  return (
    <section className="mt-5">
      <h4 className="fw-bold mb-3">You Might Also Like</h4>
      <div className="row g-4">
        {related.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

export default RelatedProducts;
