import { Link, useNavigate } from 'react-router-dom';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { useCart } from '../context/CartContext';
import { useForm } from '../hooks/useForm';
import FormField from '../components/common/FormField';
import OrderSummary from '../components/cart/OrderSummary';
import { calculateDiscountedPrice } from '../utils/formatCurrency';
import { getOrderTotals } from '../utils/orderTotals';
import { validateCheckout } from '../utils/validators';

const INITIAL_FORM = {
  fullName: '',
  address: '',
  city: '',
  postalCode: '',
  country: '',
  cardNumber: '',
  expiry: '',
  cvv: '',
};

function createOrderNumber() {
  return `SH-${Math.floor(100000 + Math.random() * 900000)}`;
}

function Checkout() {
  const { cartItems, totalPrice, clearCart } = useCart();
  useDocumentTitle('Checkout');
  const navigate = useNavigate();

  const placeOrder = (values) => {
    // Card details are validated but deliberately never stored or passed on.
    const order = {
      number: createOrderNumber(),
      shipTo: { name: values.fullName.trim(), city: values.city.trim(), country: values.country.trim() },
      items: cartItems.map((item) => ({
        id: item.id,
        title: item.title,
        quantity: item.quantity,
        unitPrice: calculateDiscountedPrice(item.price, item.discountPercentage),
      })),
      totals: getOrderTotals(totalPrice),
    };
    clearCart();
    navigate('/order-success', { state: { order }, replace: true });
  };

  const { values, errors, handleChange, handleSubmit } = useForm(INITIAL_FORM, validateCheckout, placeOrder);

  if (cartItems.length === 0) {
    return (
      <div className="container py-5 text-center">
        <h1 className="h3">Nothing to check out</h1>
        <p className="text-body-secondary">Your cart is empty. Add some products first.</p>
        <Link to="/products" className="btn btn-primary px-4">
          Browse Products
        </Link>
      </div>
    );
  }

  const field = (name, label, props = {}) => (
    <FormField
      label={label}
      name={name}
      value={values[name]}
      onChange={handleChange}
      error={errors[name]}
      {...props}
    />
  );

  return (
    <div className="container py-4">
      <h1 className="h2 fw-bold mb-3">Checkout</h1>
      <div className="alert alert-info" role="note">
        <i className="bi bi-info-circle me-2" aria-hidden="true" />
        This is a demo store. No payment is taken, so please don&apos;t enter a real card. Try the test
        number <strong>4242 4242 4242 4242</strong> with any future expiry date.
      </div>

      <form onSubmit={handleSubmit} noValidate>
        <div className="row g-4">
          <div className="col-lg-8">
            <fieldset className="card border-0 shadow-sm p-4 mb-4">
              <legend className="h5 fw-bold mb-3">Shipping Address</legend>
              <div className="row g-3">
                {field('fullName', 'Full Name', { className: 'col-12', autoComplete: 'name', maxLength: 60 })}
                {field('address', 'Street Address', {
                  className: 'col-12',
                  autoComplete: 'street-address',
                  maxLength: 100,
                })}
                {field('city', 'City', { className: 'col-md-4', autoComplete: 'address-level2', maxLength: 50 })}
                {field('postalCode', 'Postal Code', {
                  className: 'col-md-4',
                  autoComplete: 'postal-code',
                  maxLength: 10,
                })}
                {field('country', 'Country', { className: 'col-md-4', autoComplete: 'country-name', maxLength: 56 })}
              </div>
            </fieldset>

            <fieldset className="card border-0 shadow-sm p-4">
              <legend className="h5 fw-bold mb-3">Payment Details</legend>
              <div className="row g-3">
                {field('cardNumber', 'Card Number', {
                  className: 'col-12',
                  placeholder: '4242 4242 4242 4242',
                  inputMode: 'numeric',
                  autoComplete: 'cc-number',
                  maxLength: 23,
                })}
                {field('expiry', 'Expiry Date', {
                  className: 'col-md-6',
                  placeholder: 'MM/YY',
                  autoComplete: 'cc-exp',
                  maxLength: 5,
                })}
                {field('cvv', 'CVV', {
                  className: 'col-md-6',
                  inputMode: 'numeric',
                  autoComplete: 'cc-csc',
                  maxLength: 4,
                })}
              </div>
            </fieldset>
          </div>

          <div className="col-lg-4">
            <OrderSummary items={cartItems} subtotal={totalPrice} showItems>
              <button type="submit" className="btn btn-primary btn-lg w-100">
                Place Order
              </button>
            </OrderSummary>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Checkout;
