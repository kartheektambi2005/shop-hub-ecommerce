import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import ProductCard from '../components/product/ProductCard';

function Wishlist() {
  const { wishlistItems } = useWishlist();

  if (wishlistItems.length === 0) {
    return (
      <div className="container py-5 text-center">
        <i className="bi bi-heart text-body-secondary" style={{ fontSize: '3.5rem' }} />
        <h3 className="mt-3">Your wishlist is empty</h3>
        <p className="text-body-secondary">Save products you love to find them here later.</p>
        <Link to="/products" className="btn btn-primary px-4">
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <h2 className="fw-bold mb-4">My Wishlist ({wishlistItems.length})</h2>
      <div className="row g-4">
        {wishlistItems.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default Wishlist;
