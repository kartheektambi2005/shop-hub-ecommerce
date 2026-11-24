import { FREE_SHIPPING_THRESHOLD, getOrderTotals } from '../../utils/orderTotals';
import { calculateDiscountedPrice, formatCurrency } from '../../utils/formatCurrency';

function OrderSummary({ items, subtotal, showItems = false, children }) {
  const { shipping, total } = getOrderTotals(subtotal);
  const amountToFreeShipping = FREE_SHIPPING_THRESHOLD - subtotal;

  return (
    <div className="card border-0 shadow-sm p-4">
      <h2 className="h5 fw-bold mb-3">Order Summary</h2>

      {showItems && (
        <>
          <ul className="list-unstyled small mb-0">
            {items.map((item) => (
              <li className="d-flex justify-content-between gap-3 mb-2" key={item.id}>
                <span>
                  {item.title} &times; {item.quantity}
                </span>
                <span className="text-nowrap">
                  {formatCurrency(calculateDiscountedPrice(item.price, item.discountPercentage) * item.quantity)}
                </span>
              </li>
            ))}
          </ul>
          <hr />
        </>
      )}

      <div className="d-flex justify-content-between mb-2">
        <span className="text-body-secondary">Subtotal</span>
        <span>{formatCurrency(subtotal)}</span>
      </div>
      <div className="d-flex justify-content-between mb-2">
        <span className="text-body-secondary">Shipping</span>
        <span>{shipping === 0 ? 'Free' : formatCurrency(shipping)}</span>
      </div>
      {shipping > 0 && (
        <p className="small text-body-secondary mb-0">
          Add {formatCurrency(amountToFreeShipping)} more for free shipping.
        </p>
      )}
      <hr />
      <div className="d-flex justify-content-between fw-bold fs-5 mb-3">
        <span>Total</span>
        <span>{formatCurrency(total)}</span>
      </div>

      {children}
    </div>
  );
}

export default OrderSummary;
