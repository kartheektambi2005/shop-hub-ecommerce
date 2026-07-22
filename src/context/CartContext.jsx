import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { calculateDiscountedPrice } from '../utils/formatCurrency';
import { useToast } from './ToastContext';

const CartContext = createContext(null);

function loadCartFromStorage() {
  try {
    const stored = localStorage.getItem('shophub-cart');
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(loadCartFromStorage);
  const { showToast } = useToast();

  useEffect(() => {
    localStorage.setItem('shophub-cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, quantity = 1) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item,
        );
      }
      return [...prevItems, { ...product, quantity }];
    });
    showToast(`${product.title} added to cart`, 'success');
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) return;
    setCartItems((prevItems) =>
      prevItems.map((item) => (item.id === productId ? { ...item, quantity } : item)),
    );
  };

  const clearCart = () => setCartItems([]);

  const isInCart = (productId) => cartItems.some((item) => item.id === productId);

  const totalItems = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems],
  );

  const totalPrice = useMemo(
    () =>
      cartItems.reduce((sum, item) => {
        const unitPrice = calculateDiscountedPrice(item.price, item.discountPercentage);
        return sum + unitPrice * item.quantity;
      }, 0),
    [cartItems],
  );

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    isInCart,
    totalItems,
    totalPrice,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
