import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "../features/users/user";

export const store = configureStore({
  reducer: {
    user: UserReducer,
  },
});
