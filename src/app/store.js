import { configureStore } from "@reduxjs/toolkit";
import appReducer from "../features/app/appSlice";
import cartReducer from "../features/cart/cartSlice";

const CART_STORAGE_KEY = "cookpal-cart";

export const store = configureStore({
  reducer: {
    app: appReducer,
    cart: cartReducer,
  },
});

store.subscribe(() => {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(store.getState().cart.items));
  } catch {
    /* ignore quota / private mode */
  }
});
