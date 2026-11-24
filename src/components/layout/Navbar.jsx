import { Link, NavLink, useNavigate, useSearchParams } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useAuth } from '../../context/AuthContext';

function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { totalItems } = useCart();
  const { wishlistItems } = useWishlist();
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const currentQuery = searchParams.get('q') ?? '';

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    const term = new FormData(event.currentTarget).get('q').trim();
    if (term) {
      navigate(`/products?q=${encodeURIComponent(term)}`);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg sticky-top shadow-sm bg-body">
      <div className="container">
        <Link className="navbar-brand fw-bold fs-4 text-primary" to="/">
          Shop<span className="text-body">Hub</span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNavbar"
          aria-controls="mainNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="mainNavbar">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
            <li className="nav-item">
              <NavLink className="nav-link" to="/" end>Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/products">Products</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/wishlist">Wishlist</NavLink>
            </li>
          </ul>

          <form className="d-flex flex-grow-1 mx-lg-4 mb-3 mb-lg-0" onSubmit={handleSearchSubmit}>
            <div className="input-group">
              <span className="input-group-text bg-body-secondary border-end-0">
                <i className="bi bi-search" />
              </span>
              <input
                type="search"
                className="form-control border-start-0"
                placeholder="Search for products, brands..."
                key={currentQuery}
                name="q"
                maxLength={80}
                defaultValue={currentQuery}
                aria-label="Search products"
              />
            </div>
          </form>

          <div className="d-flex align-items-center gap-3">
            <button
              className="btn btn-sm btn-outline-secondary rounded-circle"
              onClick={toggleTheme}
              title="Toggle dark / light mode"
              style={{ width: '38px', height: '38px' }}
            >
              <i className={`bi ${theme === 'light' ? 'bi-moon-stars' : 'bi-sun'}`} />
            </button>

            <Link to="/wishlist" className="position-relative text-body" title="Wishlist">
              <i className="bi bi-heart fs-5" />
              {wishlistItems.length > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {wishlistItems.length}
                </span>
              )}
            </Link>

            <Link to="/cart" className="position-relative text-body" title="Shopping cart">
              <i className="bi bi-cart3 fs-5" />
              {totalItems > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary">
                  {totalItems}
                </span>
              )}
            </Link>

            {isAuthenticated ? (
              <div className="dropdown">
                <button
                  className="btn btn-sm btn-outline-secondary dropdown-toggle d-flex align-items-center gap-1"
                  data-bs-toggle="dropdown"
                >
                  <i className="bi bi-person-circle" />
                  <span className="d-none d-md-inline">{user.name}</span>
                </button>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <button className="dropdown-item" onClick={handleLogout}>
                      Log Out
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <Link to="/login" className="btn btn-sm btn-primary">
                Log In
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
