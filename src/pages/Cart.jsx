import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CartItem from '../components/cart/CartItem';
import OrderSummary from '../components/cart/OrderSummary';

function Cart() {
  const { cartItems, totalItems, totalPrice, clearCart } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="container py-5 text-center">
        <i className="bi bi-cart-x text-body-secondary" style={{ fontSize: '3.5rem' }} aria-hidden="true" />
        <h1 className="h3 mt-3">Your cart is empty</h1>
        <p className="text-body-secondary">Looks like you haven't added anything yet.</p>
        <Link to="/products" className="btn btn-primary px-4">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <h1 className="h2 fw-bold mb-4">
        Shopping Cart ({totalItems} {totalItems === 1 ? 'item' : 'items'})
      </h1>

      <div className="row g-4">
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm p-3">
            {cartItems.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>
          <div className="d-flex justify-content-between mt-3">
            <Link to="/products" className="btn btn-link text-decoration-none ps-0">
              &larr; Continue Shopping
            </Link>
            <button type="button" className="btn btn-outline-danger btn-sm" onClick={clearCart}>
              Clear Cart
            </button>
          </div>
        </div>

        <div className="col-lg-4">
          <OrderSummary items={cartItems} subtotal={totalPrice}>
            <Link to="/checkout" className="btn btn-primary btn-lg w-100">
              Proceed to Checkout
            </Link>
          </OrderSummary>
        </div>
      </div>
    </div>
  );
}

export default Cart;
