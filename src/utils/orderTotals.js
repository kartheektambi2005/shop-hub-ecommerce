export const FREE_SHIPPING_THRESHOLD = 50;
export const SHIPPING_FEE = 5.99;

export function getOrderTotals(subtotal) {
  const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
  return {
    subtotal,
    shipping,
    total: Math.round((subtotal + shipping) * 100) / 100,
  };
}
