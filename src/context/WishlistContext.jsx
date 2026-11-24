import { createContext, useContext, useEffect, useState } from 'react';
import { isProductSummary, toProductSummary } from '../utils/product';
import { loadStored, saveStored } from '../utils/storage';
import { useToast } from './ToastContext';

const WishlistContext = createContext(null);

const STORAGE_KEY = 'shophub-wishlist';

const isWishlist = (value) => Array.isArray(value) && value.every(isProductSummary);

export function WishlistProvider({ children }) {
  const [wishlistItems, setWishlistItems] = useState(() => loadStored(STORAGE_KEY, [], isWishlist));
  const { showToast } = useToast();

  useEffect(() => {
    saveStored(STORAGE_KEY, wishlistItems);
  }, [wishlistItems]);

  const isInWishlist = (productId) => wishlistItems.some((item) => item.id === productId);

  const toggleWishlist = (product) => {
    if (isInWishlist(product.id)) {
      setWishlistItems((previous) => previous.filter((item) => item.id !== product.id));
      showToast(`${product.title} removed from wishlist`, 'secondary');
    } else {
      setWishlistItems((previous) => [...previous, toProductSummary(product)]);
      showToast(`${product.title} added to wishlist`, 'success');
    }
  };

  const value = { wishlistItems, isInWishlist, toggleWishlist };

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}
