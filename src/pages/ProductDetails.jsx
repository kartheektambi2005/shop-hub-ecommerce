import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProductById, fetchProductsByCategory } from '../services/productService';
import { useFetch } from '../hooks/useFetch';
import Loader from '../components/common/Loader';
import ErrorMessage from '../components/common/ErrorMessage';
import Breadcrumbs from '../components/layout/Breadcrumbs';
import ImageGallery from '../components/product/ImageGallery';
import StarRating from '../components/common/StarRating';
import RelatedProducts from '../components/product/RelatedProducts';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { calculateDiscountedPrice, formatCurrency } from '../utils/formatCurrency';

function ProductDetails() {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const {
    data: product,
    isLoading,
    error,
    refetch,
  } = useFetch(() => fetchProductById(id), [id]);

  const { data: relatedProducts } = useFetch(
    () => (product ? fetchProductsByCategory(product.category) : Promise.resolve([])),
    [product?.category],
  );

  if (isLoading) return <Loader label="Loading product details..." />;
  if (error) return <ErrorMessage message={error} onRetry={refetch} />;
  if (!product) return null;

  const discountedPrice = calculateDiscountedPrice(product.price, product.discountPercentage);
  const isOutOfStock = product.stock === 0;
  const wishlisted = isInWishlist(product.id);

  const handleQuantityChange = (delta) => {
    setQuantity((prevQuantity) => Math.min(product.stock, Math.max(1, prevQuantity + delta)));
  };

  return (
    <div>
      <Breadcrumbs
        trail={[
          { label: product.category, to: `/products?category=${product.category}` },
          { label: product.title },
        ]}
      />

      <div className="container py-4">
        <div className="row g-5">
          <div className="col-lg-6">
            <ImageGallery images={product.images?.length ? product.images : [product.thumbnail]} title={product.title} />
          </div>

          <div className="col-lg-6">
            <span className="badge bg-body-secondary text-body-secondary text-capitalize mb-2">
              {product.brand || product.category}
            </span>
            <h2 className="fw-bold">{product.title}</h2>
            <StarRating rating={product.rating} />
            <p className="text-body-secondary mt-3">{product.description}</p>

            <div className="d-flex align-items-baseline gap-3 my-3">
              <span className="fs-2 fw-bold">{formatCurrency(discountedPrice)}</span>
              {product.discountPercentage > 0 && (
                <>
                  <span className="fs-5 text-body-secondary text-decoration-line-through">
                    {formatCurrency(product.price)}
                  </span>
                  <span className="badge bg-danger">-{Math.round(product.discountPercentage)}%</span>
                </>
              )}
            </div>

            <p className="mb-3">
              {isOutOfStock ? (
                <span className="badge bg-danger-subtle text-danger">Out of Stock</span>
              ) : (
                <span className="badge bg-success-subtle text-success">
                  In Stock &middot; {product.stock} available
                </span>
              )}
            </p>

            {!isOutOfStock && (
              <div className="d-flex align-items-center gap-3 mb-3">
                <span className="fw-semibold">Quantity</span>
                <div className="input-group" style={{ width: '130px' }}>
                  <button className="btn btn-outline-secondary" onClick={() => handleQuantityChange(-1)}>
                    -
                  </button>
                  <span className="form-control text-center">{quantity}</span>
                  <button className="btn btn-outline-secondary" onClick={() => handleQuantityChange(1)}>
                    +
                  </button>
                </div>
              </div>
            )}

            <div className="d-flex gap-2">
              <button
                className="btn btn-primary btn-lg flex-grow-1"
                disabled={isOutOfStock}
                onClick={() => addToCart(product, quantity)}
              >
                <i className="bi bi-cart-plus me-2" />
                Add to Cart
              </button>
              <button
                className={`btn btn-lg ${wishlisted ? 'btn-danger' : 'btn-outline-secondary'}`}
                onClick={() => toggleWishlist(product)}
              >
                <i className={`bi ${wishlisted ? 'bi-heart-fill' : 'bi-heart'}`} />
              </button>
            </div>

            <hr className="my-4" />

            <h6 className="fw-semibold mb-2">Specifications</h6>
            <table className="table table-sm">
              <tbody>
                <tr>
                  <td className="text-body-secondary">Brand</td>
                  <td>{product.brand || 'N/A'}</td>
                </tr>
                <tr>
                  <td className="text-body-secondary">Category</td>
                  <td className="text-capitalize">{product.category}</td>
                </tr>
                <tr>
                  <td className="text-body-secondary">SKU</td>
                  <td>{product.sku || product.id}</td>
                </tr>
                <tr>
                  <td className="text-body-secondary">Warranty</td>
                  <td>{product.warrantyInformation || 'Standard warranty applies'}</td>
                </tr>
                <tr>
                  <td className="text-body-secondary">Shipping</td>
                  <td>{product.shippingInformation || 'Ships in 3-5 business days'}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {relatedProducts && (
          <RelatedProducts products={relatedProducts} currentProductId={product.id} />
        )}
      </div>
    </div>
  );
}

export default ProductDetails;
