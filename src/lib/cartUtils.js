/** Mock unit price from recipe cook time (USD) */
export function getRecipePrice(recipe) {
  return 8 + Math.round((recipe.minutes ?? 30) / 5);
}

export function getItemUnitPrice(item) {
  return item.price ?? 12.99;
}

export function formatMoney(amount) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);
}

export function lineTotal(item) {
  return getItemUnitPrice(item) * item.quantity;
}

export function cartSubtotal(items) {
  return items.reduce((sum, item) => sum + lineTotal(item), 0);
}

export function cartItemCount(items) {
  return items.reduce((n, item) => n + item.quantity, 0);
}
