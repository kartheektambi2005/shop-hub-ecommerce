import { Link, Navigate, useLocation } from 'react-router-dom';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { formatCurrency } from '../utils/formatCurrency';

function OrderSuccess() {
  const order = useLocation().state?.order;
  useDocumentTitle('Order confirmed');

  // Opening this URL directly (no order was just placed) has nothing to show.
  if (!order) return <Navigate to="/" replace />;

  return (
    <div className="container py-5">
      <div className="text-center mb-4">
        <i className="bi bi-check-circle-fill text-success" style={{ fontSize: '4rem' }} aria-hidden="true" />
        <h1 className="h2 fw-bold mt-3">Order Placed Successfully!</h1>
        <p className="text-body-secondary mb-0">
          Thank you, {order.shipTo.name}. Order <strong>#{order.number}</strong> will ship to{' '}
          {order.shipTo.city}, {order.shipTo.country}.
        </p>
        <p className="small text-body-secondary">(Demo order &mdash; nothing was charged.)</p>
      </div>

      <div className="card border-0 shadow-sm p-4 mx-auto mb-4" style={{ maxWidth: '520px' }}>
        <ul className="list-unstyled small mb-0">
          {order.items.map((item) => (
            <li className="d-flex justify-content-between gap-3 mb-2" key={item.id}>
              <span>
                {item.title} &times; {item.quantity}
              </span>
              <span className="text-nowrap">{formatCurrency(item.unitPrice * item.quantity)}</span>
            </li>
          ))}
        </ul>
        <hr />
        <div className="d-flex justify-content-between small mb-1">
          <span className="text-body-secondary">Shipping</span>
          <span>{order.totals.shipping === 0 ? 'Free' : formatCurrency(order.totals.shipping)}</span>
        </div>
        <div className="d-flex justify-content-between fw-bold">
          <span>Total</span>
          <span>{formatCurrency(order.totals.total)}</span>
        </div>
      </div>

      <div className="text-center">
        <Link to="/products" className="btn btn-primary px-4">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}

export default OrderSuccess;
