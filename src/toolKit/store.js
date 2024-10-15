import { configureStore } from "@reduxjs/toolkit";
import wishlistSlices from "./wishlist/wishlistSlice";
import userSlice from "./user/userSlice";
import cartSlice from "./cart/cartSlice";

export const store = configureStore({
  reducer: {
    wishlist: wishlistSlices,
    user: userSlice,
    cart: cartSlice,
  },
});
