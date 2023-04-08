import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalPrice: 0,
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addItem(state, action) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);

      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({ ...action.payload, count: 1 });
      }
      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
    },
    //
    // addItem(state, { payload }) {
    //   const findItem = state.items.find((obj) => {
    //     return (
    //       obj.id === payload.id &&
    //       obj.size === payload.size &&
    //       obj.type === payload.type
    //     );
    //   });
    //   findItem
    //     ? findItem.count++
    //     : state.items.push({
    //         ...payload,
    //         count: 1,
    //       });
    //   state.totalPrice = state.items.reduce((sum, obj) => {
    //     return obj.price * obj.count + sum;
    //   }, 0);
    // },
    removeItem(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    plusItem(state, action) {
      const findItem = state.items.find((obj) => obj.id === action.payload);
      if (findItem) {
        findItem.count++;
      }
    },
    minusItem(state, action) {
      const findItem = state.items.find((obj) => obj.id === action.payload);
      if (findItem) {
        findItem.count--;
      }
    },
    // minusItem(state, { payload }) {
    //   const findItem = state.items.find((obj) => {
    //     return (
    //       obj.id === payload.id &&
    //       obj.size === payload.size &&
    //       obj.type === payload.type
    //     );
    //   });
    //   findItem && findItem.count--;
    //   state.totalPrice -= findItem.price;
    // },
    //
    clearItem(state, action) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});
export const { addItem, removeItem, clearItem, plusItem, minusItem } =
  cartSlice.actions;
export default cartSlice.reducer;

// addItem(state, action) {
//   state.items.push(action.payload);
//   state.totalPrice = state.items.reduce((sum, obj) => {
//     return obj.price + sum;
//   }, 0);
// },
