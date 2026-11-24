import { useState } from 'react';
import QuantityStepper from '../common/QuantityStepper';
import StarRating from '../common/StarRating';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { calculateDiscountedPrice, formatCurrency } from '../../utils/formatCurrency';

const SPECIFICATIONS = (product) => [
  ['Brand', product.brand || 'N/A'],
  ['Category', product.category.replace(/-/g, ' ')],
  ['SKU', product.sku || product.id],
  ['Warranty', product.warrantyInformation || 'Standard warranty applies'],
  ['Shipping', product.shippingInformation || 'Ships in 3-5 business days'],
];

function ProductInfo({ product }) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const discountedPrice = calculateDiscountedPrice(product.price, product.discountPercentage);
  const isOutOfStock = product.stock === 0;
  const wishlisted = isInWishlist(product.id);

  return (
    <>
      <span className="badge bg-body-secondary text-body-secondary text-capitalize mb-2">
        {product.brand || product.category}
      </span>
      <h1 className="h2 fw-bold">{product.title}</h1>
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
          <span className="badge bg-danger-subtle text-danger-emphasis">Out of Stock</span>
        ) : (
          <span className="badge bg-success-subtle text-success-emphasis">
            In Stock &middot; {product.stock} available
          </span>
        )}
      </p>

      {!isOutOfStock && (
        <div className="d-flex align-items-center gap-3 mb-3">
          <span className="fw-semibold">Quantity</span>
          <QuantityStepper
            value={quantity}
            onChange={setQuantity}
            max={product.stock}
            label={product.title}
          />
        </div>
      )}

      <div className="d-flex gap-2">
        <button
          type="button"
          className="btn btn-primary btn-lg flex-grow-1"
          disabled={isOutOfStock}
          onClick={() => addToCart(product, quantity)}
        >
          <i className="bi bi-cart-plus me-2" aria-hidden="true" />
          Add to Cart
        </button>
        <button
          type="button"
          className={`btn btn-lg ${wishlisted ? 'btn-danger' : 'btn-outline-secondary'}`}
          onClick={() => toggleWishlist(product)}
          aria-pressed={wishlisted}
          aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <i className={`bi ${wishlisted ? 'bi-heart-fill' : 'bi-heart'}`} aria-hidden="true" />
        </button>
      </div>

      <hr className="my-4" />

      <h2 className="h6 fw-semibold mb-2">Specifications</h2>
      <table className="table table-sm">
        <tbody>
          {SPECIFICATIONS(product).map(([label, value]) => (
            <tr key={label}>
              <th scope="row" className="fw-normal text-body-secondary">{label}</th>
              <td className="text-capitalize">{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default ProductInfo;
