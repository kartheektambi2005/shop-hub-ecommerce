import { Link } from 'react-router-dom';

const REPOSITORY_URL = 'https://github.com/kartheektambi2005/shop-hub-ecommerce';

const SHOP_LINKS = [
  { to: '/products', label: 'All Products' },
  { to: '/wishlist', label: 'Wishlist' },
  { to: '/cart', label: 'Cart' },
];

const ACCOUNT_LINKS = [
  { to: '/login', label: 'Log In' },
  { to: '/register', label: 'Create Account' },
];

function FooterLinks({ title, links }) {
  return (
    <>
      <h2 className="h6 fw-semibold mb-3">{title}</h2>
      <ul className="list-unstyled small">
        {links.map(({ to, label }) => (
          <li className="mb-2" key={to}>
            <Link className="text-body-secondary text-decoration-none" to={to}>
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-body-tertiary border-top mt-auto pt-5 pb-4">
      <div className="container">
        <div className="row gy-4">
          <div className="col-md-4">
            <h2 className="h5 fw-bold text-primary-emphasis mb-3">ShopHub</h2>
            <p className="text-body-secondary small">
              A demo storefront for quality electronics, fashion, and lifestyle products. No real
              orders or payments are processed.
            </p>
          </div>

          <div className="col-6 col-md-2">
            <FooterLinks title="Shop" links={SHOP_LINKS} />
          </div>

          <div className="col-6 col-md-3">
            <FooterLinks title="Account" links={ACCOUNT_LINKS} />
          </div>

          <div className="col-md-3">
            <h2 className="h6 fw-semibold mb-3">About this project</h2>
            <p className="text-body-secondary small mb-2">
              Built with React, Vite and Bootstrap. Product data comes from DummyJSON.
            </p>
            <a
              className="text-body-secondary small"
              href={REPOSITORY_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="bi bi-github me-1" aria-hidden="true" />
              View source on GitHub
              <span className="visually-hidden"> (opens in a new tab)</span>
            </a>
          </div>
        </div>

        <hr className="my-4" />

        <p className="text-center text-body-secondary small mb-0">
          &copy; {currentYear} ShopHub. All rights reserved by Kartheek Tambi.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
