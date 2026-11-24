// Only the fields the cart and wishlist need, so localStorage stays small.
export function toProductSummary(product) {
  const { id, title, price, discountPercentage, thumbnail, brand, category, stock, rating } = product;
  return { id, title, price, discountPercentage, thumbnail, brand, category, stock, rating };
}

export function isProductSummary(value) {
  return (
    value !== null &&
    typeof value === 'object' &&
    Number.isFinite(value.id) &&
    typeof value.title === 'string' &&
    Number.isFinite(value.price) &&
    Number.isFinite(value.discountPercentage ?? 0)
  );
}
