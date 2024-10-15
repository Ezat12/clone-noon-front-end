import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const cartSlice = createSlice({
  name: "CartSlice",
  initialState,
  reducers: {
    addCart: (state, action) => {
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
    addQuantity: (state, action) => {
      let indexItem;
      if (action.payload.itemId) {
        indexItem = state.findIndex(
          (item) => item._id === action.payload.itemId
        );
      } else {
        indexItem = state.findIndex(
          (item) => item.product._id === action.payload.productId
        );
      }

      return state.map((item, index) => {
        if (index === indexItem) {
          let quantityItem = Number(item.quantity);
          if (!action.payload.quantity) {
            action.payload.quantity = quantityItem++;
          }

          return {
            ...item,
            quantity: action.payload.quantity,
          };
        }
        return item;
      });
    },
    deleteCartWithItems: (state, action) => {
      const productId = action.payload._id;
      state = state.filter((product) => product.product._id !== productId);
      return state;
    },
    removeCart: (state) => {
      return [];
    },
  },
});

export const { addCart, addQuantity, deleteCartWithItems, removeCart } =
  cartSlice.actions;
export default cartSlice.reducer;
