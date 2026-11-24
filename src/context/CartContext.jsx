import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { calculateDiscountedPrice } from '../utils/formatCurrency';
import { isProductSummary, toProductSummary } from '../utils/product';
import { loadStored, saveStored } from '../utils/storage';
import { useToast } from './ToastContext';

const CartContext = createContext(null);

const STORAGE_KEY = 'shophub-cart';

const isCartItem = (item) => isProductSummary(item) && Number.isInteger(item.quantity) && item.quantity >= 1;
const isCartList = (value) => Array.isArray(value) && value.every(isCartItem);

const stockLimit = (item) => (Number.isFinite(item.stock) ? item.stock : Infinity);

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => loadStored(STORAGE_KEY, [], isCartList));
  const { showToast } = useToast();

  useEffect(() => {
    saveStored(STORAGE_KEY, cartItems);
  }, [cartItems]);

  const addToCart = (product, quantity = 1) => {
    const existingItem = cartItems.find((item) => item.id === product.id);
    const limit = stockLimit(product);
    const nextQuantity = Math.min((existingItem?.quantity ?? 0) + quantity, limit);

    if (nextQuantity === existingItem?.quantity) {
      showToast(`You already have all ${limit} available in your cart`, 'warning');
      return;
    }

    setCartItems((previous) =>
      existingItem
        ? previous.map((item) => (item.id === product.id ? { ...item, quantity: nextQuantity } : item))
        : [...previous, { ...toProductSummary(product), quantity: nextQuantity }],
    );
    showToast(`${product.title} added to cart`, 'success');
  };

  const removeFromCart = (productId) => {
    setCartItems((previous) => previous.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    setCartItems((previous) =>
      previous.map((item) =>
        item.id === productId ? { ...item, quantity: Math.min(Math.max(1, quantity), stockLimit(item)) } : item,
      ),
    );
  };

  const clearCart = () => setCartItems([]);

  const totalItems = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems],
  );

  const totalPrice = useMemo(() => {
    const total = cartItems.reduce(
      (sum, item) => sum + calculateDiscountedPrice(item.price, item.discountPercentage) * item.quantity,
      0,
    );
    return Math.round(total * 100) / 100;
  }, [cartItems]);

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
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
