import { Link } from 'react-router-dom';
import StarRating from '../common/StarRating';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { calculateDiscountedPrice, formatCurrency } from '../../utils/formatCurrency';

function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const discountedPrice = calculateDiscountedPrice(product.price, product.discountPercentage);
  const isOutOfStock = product.stock === 0;
  const wishlisted = isInWishlist(product.id);

  return (
    <div className="col-6 col-md-4 col-lg-3">
      <div className="card h-100 border-0 shadow-sm product-card position-relative">
        <button
          className={`btn btn-sm rounded-circle position-absolute top-0 end-0 m-2 ${
            wishlisted ? 'btn-danger' : 'btn-light'
          }`}
          style={{ width: '34px', height: '34px', zIndex: 2 }}
          onClick={() => toggleWishlist(product)}
          aria-pressed={wishlisted}
          aria-label={wishlisted ? `Remove ${product.title} from wishlist` : `Add ${product.title} to wishlist`}
        >
          <i className={`bi ${wishlisted ? 'bi-heart-fill' : 'bi-heart'}`} aria-hidden="true" />
        </button>

        <Link to={`/products/${product.id}`}>
          <img
            src={product.thumbnail}
            alt={product.title}
            loading="lazy"
            width="200"
            height="200"
            className="card-img-top p-3"
            style={{ height: '200px', objectFit: 'contain' }}
          />
        </Link>

        <div className="card-body d-flex flex-column">
          <span className="badge bg-body-secondary text-body-secondary text-capitalize mb-2 align-self-start">
            {product.brand || product.category}
          </span>

          <Link
            to={`/products/${product.id}`}
            className="text-decoration-none text-body fw-semibold line-clamp-2 mb-1"
            title={product.title}
          >
            {product.title}
          </Link>

          <StarRating rating={product.rating} />

          <div className="d-flex align-items-baseline gap-2 mt-2">
            <span className="fs-5 fw-bold">{formatCurrency(discountedPrice)}</span>
            {product.discountPercentage > 0 && (
              <span className="text-body-secondary text-decoration-line-through small">
                {formatCurrency(product.price)}
              </span>
            )}
          </div>

          {isOutOfStock ? (
            <span className="badge bg-danger-subtle text-danger-emphasis mt-1 align-self-start">Out of Stock</span>
          ) : (
            <span className="badge bg-success-subtle text-success-emphasis mt-1 align-self-start">In Stock</span>
          )}

          <button
            className="btn btn-primary mt-auto"
            disabled={isOutOfStock}
            onClick={() => addToCart(product)}
          >
            <i className="bi bi-cart-plus me-1" aria-hidden="true" />
            {isOutOfStock ? 'Unavailable' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
