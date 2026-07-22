import { Link } from 'react-router-dom';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-body-tertiary border-top mt-auto pt-5 pb-4">
      <div className="container">
        <div className="row gy-4">
          <div className="col-md-4">
            <h5 className="fw-bold text-primary mb-3">ShopHub</h5>
            <p className="text-body-secondary small">
              Your one-stop destination for quality electronics, fashion, and lifestyle
              products at unbeatable prices.
            </p>
          </div>

          <div className="col-6 col-md-2">
            <h6 className="fw-semibold mb-3">Shop</h6>
            <ul className="list-unstyled small">
              <li className="mb-2"><Link className="text-body-secondary text-decoration-none" to="/products">All Products</Link></li>
              <li className="mb-2"><Link className="text-body-secondary text-decoration-none" to="/wishlist">Wishlist</Link></li>
              <li className="mb-2"><Link className="text-body-secondary text-decoration-none" to="/cart">Cart</Link></li>
            </ul>
          </div>

          <div className="col-6 col-md-3">
            <h6 className="fw-semibold mb-3">Customer Service</h6>
            <ul className="list-unstyled small">
              <li className="mb-2"><a className="text-body-secondary text-decoration-none" href="#!">Contact Us</a></li>
              <li className="mb-2"><a className="text-body-secondary text-decoration-none" href="#!">Shipping Policy</a></li>
              <li className="mb-2"><a className="text-body-secondary text-decoration-none" href="#!">Returns</a></li>
            </ul>
          </div>

          <div className="col-md-3">
            <h6 className="fw-semibold mb-3">Stay Updated</h6>
            <p className="text-body-secondary small mb-2">Subscribe for deals and new arrivals.</p>
            <div className="d-flex gap-2 fs-5">
              <a className="text-body-secondary" href="#!"><i className="bi bi-facebook" /></a>
              <a className="text-body-secondary" href="#!"><i className="bi bi-instagram" /></a>
              <a className="text-body-secondary" href="#!"><i className="bi bi-twitter-x" /></a>
            </div>
          </div>
        </div>

        <hr className="my-4" />

        <p className="text-center text-body-secondary small mb-0">
          &copy; {currentYear} ShopHub. All rights reserved. Built for learning purposes.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
