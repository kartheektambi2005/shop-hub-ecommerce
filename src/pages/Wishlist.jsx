import { Link } from 'react-router-dom';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { useWishlist } from '../context/WishlistContext';
import ProductCard from '../components/product/ProductCard';

function Wishlist() {
  const { wishlistItems } = useWishlist();
  useDocumentTitle('Wishlist');

  if (wishlistItems.length === 0) {
    return (
      <div className="container py-5 text-center">
        <i className="bi bi-heart text-body-secondary" style={{ fontSize: '3.5rem' }} aria-hidden="true" />
        <h1 className="h3 mt-3">Your wishlist is empty</h1>
        <p className="text-body-secondary">Save products you love to find them here later.</p>
        <Link to="/products" className="btn btn-primary px-4">
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <h1 className="h2 fw-bold mb-4">My Wishlist ({wishlistItems.length})</h1>
      <div className="row g-4">
        {wishlistItems.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default Wishlist;
