import { createSlice } from "@reduxjs/toolkit";
import { getRecipePrice } from "../../lib/cartUtils";

const CART_STORAGE_KEY = "cookpal-cart";

function loadCartItems() {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

const initialState = {
  items: loadCartItems(),
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      const r = action.payload;
      const existing = state.items.find((i) => i.id === r.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({
          id: r.id,
          title: r.title,
          image: r.image,
          badge: r.badge,
          minutes: r.minutes,
          rating: r.rating,
          price: r.price ?? getRecipePrice(r),
          quantity: 1,
        });
      }
    },
    removeItem(state, action) {
      state.items = state.items.filter((i) => i.id !== action.payload);
    },
    setItemQuantity(state, action) {
      const { id, quantity } = action.payload;
      const item = state.items.find((i) => i.id === id);
      if (!item) return;
      const next = Math.max(0, Math.floor(Number(quantity)) || 0);
      if (next === 0) {
        state.items = state.items.filter((i) => i.id !== id);
      } else {
        item.quantity = next;
      }
    },
    clearCart(state) {
      state.items = [];
    },
  },
});

export const { addItem, removeItem, setItemQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
