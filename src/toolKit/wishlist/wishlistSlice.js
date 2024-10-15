import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const wishListSlice = createSlice({
  name: "WishlistSlice",
  initialState,
  reducers: {
    addWishlist: (state, action) => {
      // if(state.in)
      let check = true;
      state.map((product) => {
        if (product._id === action.payload._id) {
          check = false;
        }
      });
      if (check) {
        state.push(action.payload);
      }
    },
    deleteWishlist: (state, action) => {
      const productId = action.payload._id;
      state = state.filter((product) => product._id !== productId);
      return state;
    },
    removeAll: (state) => {
      return [];
    },
  },
});

export const { addWishlist, deleteWishlist, removeAll } = wishListSlice.actions;

export default wishListSlice.reducer;
