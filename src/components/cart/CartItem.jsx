import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { calculateDiscountedPrice, formatCurrency } from '../../utils/formatCurrency';

function CartItem({ item }) {
  const { updateQuantity, removeFromCart } = useCart();
  const unitPrice = calculateDiscountedPrice(item.price, item.discountPercentage);

  return (
    <div className="d-flex align-items-center gap-3 py-3 border-bottom">
      <img
        src={item.thumbnail}
        alt={item.title}
        style={{ width: '80px', height: '80px', objectFit: 'contain' }}
      />

      <div className="flex-grow-1">
        <Link to={`/products/${item.id}`} className="text-decoration-none text-body fw-semibold">
          {item.title}
        </Link>
        <p className="text-body-secondary small mb-0 text-capitalize">{item.brand || item.category}</p>
        <p className="fw-bold mb-0">{formatCurrency(unitPrice)}</p>
      </div>

      <div className="input-group" style={{ width: '120px' }}>
        <button
          className="btn btn-outline-secondary btn-sm"
          onClick={() => updateQuantity(item.id, item.quantity - 1)}
        >
          -
        </button>
        <span className="form-control form-control-sm text-center">{item.quantity}</span>
        <button
          className="btn btn-outline-secondary btn-sm"
          onClick={() => updateQuantity(item.id, item.quantity + 1)}
        >
          +
        </button>
      </div>

      <p className="fw-bold mb-0" style={{ width: '90px' }}>
        {formatCurrency(unitPrice * item.quantity)}
      </p>

      <button className="btn btn-sm btn-link text-danger" onClick={() => removeFromCart(item.id)}>
        <i className="bi bi-trash" />
      </button>
    </div>
  );
}

export default CartItem;
