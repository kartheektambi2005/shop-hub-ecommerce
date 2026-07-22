export function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

export function calculateDiscountedPrice(price, discountPercentage) {
  const discounted = price - (price * discountPercentage) / 100;
  return Math.round(discounted * 100) / 100;
}
