import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CartItem from '../components/cart/CartItem';
import { formatCurrency } from '../utils/formatCurrency';

const FREE_SHIPPING_THRESHOLD = 50;
const SHIPPING_FEE = 5.99;

function Cart() {
  const { cartItems, totalItems, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <div className="container py-5 text-center">
        <i className="bi bi-cart-x text-body-secondary" style={{ fontSize: '3.5rem' }} />
        <h3 className="mt-3">Your cart is empty</h3>
        <p className="text-body-secondary">Looks like you haven't added anything yet.</p>
        <Link to="/products" className="btn btn-primary px-4">
          Continue Shopping
        </Link>
      </div>
    );
  }

  const shippingFee = totalPrice >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
  const orderTotal = totalPrice + shippingFee;

  return (
    <div className="container py-4">
      <h2 className="fw-bold mb-4">Shopping Cart ({totalItems} items)</h2>

      <div className="row g-4">
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm p-3">
            {cartItems.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>
          <button className="btn btn-outline-danger btn-sm mt-3" onClick={clearCart}>
            Clear Cart
          </button>
        </div>

        <div className="col-lg-4">
          <div className="card border-0 shadow-sm p-4">
            <h5 className="fw-bold mb-3">Order Summary</h5>
            <div className="d-flex justify-content-between mb-2">
              <span className="text-body-secondary">Subtotal</span>
              <span>{formatCurrency(totalPrice)}</span>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <span className="text-body-secondary">Shipping</span>
              <span>{shippingFee === 0 ? 'Free' : formatCurrency(shippingFee)}</span>
            </div>
            <hr />
            <div className="d-flex justify-content-between fw-bold fs-5 mb-3">
              <span>Total</span>
              <span>{formatCurrency(orderTotal)}</span>
            </div>
            <button className="btn btn-primary btn-lg" onClick={() => navigate('/checkout')}>
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
