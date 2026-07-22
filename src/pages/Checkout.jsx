import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../utils/formatCurrency';

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

function Checkout() {
  const { cartItems, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};
    Object.entries(formData).forEach(([key, value]) => {
      if (!value.trim()) newErrors[key] = 'This field is required';
    });
    return newErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      clearCart();
      navigate('/order-success');
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="container py-5 text-center">
        <p className="text-body-secondary">Your cart is empty. Add products before checking out.</p>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <h2 className="fw-bold mb-4">Checkout</h2>
      <form onSubmit={handleSubmit}>
        <div className="row g-4">
          <div className="col-lg-8">
            <div className="card border-0 shadow-sm p-4 mb-4">
              <h5 className="fw-bold mb-3">Shipping Address</h5>
              <div className="row g-3">
                <div className="col-12">
                  <label className="form-label">Full Name</label>
                  <input
                    className={`form-control ${errors.fullName ? 'is-invalid' : ''}`}
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                  />
                  {errors.fullName && <div className="invalid-feedback">{errors.fullName}</div>}
                </div>
                <div className="col-12">
                  <label className="form-label">Street Address</label>
                  <input
                    className={`form-control ${errors.address ? 'is-invalid' : ''}`}
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                  />
                  {errors.address && <div className="invalid-feedback">{errors.address}</div>}
                </div>
                <div className="col-md-4">
                  <label className="form-label">City</label>
                  <input
                    className={`form-control ${errors.city ? 'is-invalid' : ''}`}
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                  />
                  {errors.city && <div className="invalid-feedback">{errors.city}</div>}
                </div>
                <div className="col-md-4">
                  <label className="form-label">Postal Code</label>
                  <input
                    className={`form-control ${errors.postalCode ? 'is-invalid' : ''}`}
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                  />
                  {errors.postalCode && <div className="invalid-feedback">{errors.postalCode}</div>}
                </div>
                <div className="col-md-4">
                  <label className="form-label">Country</label>
                  <input
                    className={`form-control ${errors.country ? 'is-invalid' : ''}`}
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                  />
                  {errors.country && <div className="invalid-feedback">{errors.country}</div>}
                </div>
              </div>
            </div>

            <div className="card border-0 shadow-sm p-4">
              <h5 className="fw-bold mb-3">Payment Details</h5>
              <div className="row g-3">
                <div className="col-12">
                  <label className="form-label">Card Number</label>
                  <input
                    className={`form-control ${errors.cardNumber ? 'is-invalid' : ''}`}
                    name="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    value={formData.cardNumber}
                    onChange={handleChange}
                  />
                  {errors.cardNumber && <div className="invalid-feedback">{errors.cardNumber}</div>}
                </div>
                <div className="col-md-6">
                  <label className="form-label">Expiry Date</label>
                  <input
                    className={`form-control ${errors.expiry ? 'is-invalid' : ''}`}
                    name="expiry"
                    placeholder="MM/YY"
                    value={formData.expiry}
                    onChange={handleChange}
                  />
                  {errors.expiry && <div className="invalid-feedback">{errors.expiry}</div>}
                </div>
                <div className="col-md-6">
                  <label className="form-label">CVV</label>
                  <input
                    className={`form-control ${errors.cvv ? 'is-invalid' : ''}`}
                    name="cvv"
                    value={formData.cvv}
                    onChange={handleChange}
                  />
                  {errors.cvv && <div className="invalid-feedback">{errors.cvv}</div>}
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="card border-0 shadow-sm p-4">
              <h5 className="fw-bold mb-3">Order Summary</h5>
              {cartItems.map((item) => (
                <div className="d-flex justify-content-between small mb-2" key={item.id}>
                  <span>{item.title} &times; {item.quantity}</span>
                  <span>{formatCurrency(item.price * item.quantity)}</span>
                </div>
              ))}
              <hr />
              <div className="d-flex justify-content-between fw-bold fs-5 mb-3">
                <span>Total</span>
                <span>{formatCurrency(totalPrice)}</span>
              </div>
              <button type="submit" className="btn btn-primary btn-lg">
                Place Order
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Checkout;
