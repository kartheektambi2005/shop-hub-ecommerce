import { Link } from 'react-router-dom';

function OrderSuccess() {
  const orderNumber = `SH-${Math.floor(100000 + Math.random() * 900000)}`;

  return (
    <div className="container py-5 text-center">
      <i className="bi bi-check-circle-fill text-success" style={{ fontSize: '4rem' }} />
      <h2 className="fw-bold mt-3">Order Placed Successfully!</h2>
      <p className="text-body-secondary">
        Thank you for your purchase. Your order <strong>#{orderNumber}</strong> has been confirmed
        and will ship soon.
      </p>
      <Link to="/products" className="btn btn-primary px-4 mt-2">
        Continue Shopping
      </Link>
    </div>
  );
}

export default OrderSuccess;
