import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "../features/users/user";
import CartReducer from "../features/cart/cartSlice";

export const store = configureStore({
  reducer: {
    user: UserReducer,
    cart: CartReducer,
  },
});
