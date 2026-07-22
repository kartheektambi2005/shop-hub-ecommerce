import { createContext, useContext, useEffect, useState } from 'react';
import { useToast } from './ToastContext';

const WishlistContext = createContext(null);

function loadWishlistFromStorage() {
  try {
    const stored = localStorage.getItem('shophub-wishlist');
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function WishlistProvider({ children }) {
  const [wishlistItems, setWishlistItems] = useState(loadWishlistFromStorage);
  const { showToast } = useToast();

  useEffect(() => {
    localStorage.setItem('shophub-wishlist', JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  const isInWishlist = (productId) => wishlistItems.some((item) => item.id === productId);

  const toggleWishlist = (product) => {
    setWishlistItems((prevItems) => {
      const alreadySaved = prevItems.find((item) => item.id === product.id);
      if (alreadySaved) {
        showToast(`${product.title} removed from wishlist`, 'secondary');
        return prevItems.filter((item) => item.id !== product.id);
      }
      showToast(`${product.title} added to wishlist`, 'success');
      return [...prevItems, product];
    });
  };

  const removeFromWishlist = (productId) => {
    setWishlistItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  };

  const value = { wishlistItems, isInWishlist, toggleWishlist, removeFromWishlist };

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}
