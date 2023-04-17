import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
const initialState: CartSliceState = {
  totalPrice: 0,
  items: JSON.parse(localStorage.getItem("cart")) || [],
};
interface CartSliceState {
  totalPrice: number;
  items: CartItem[];
}
//
export type CartItem = {
  id: number;
  imageUrl: string;
  title: string;
  price: number;
  type: string;
  size: string;
  count: number;
};
//
export const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
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

    removeItem(state, action: PayloadAction<number>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    plusItem(state, action: PayloadAction<number>) {
      const findItem = state.items.find((obj) => obj.id === action.payload);
      if (findItem) {
        findItem.count++;
      }
    },
    minusItem(state, action: PayloadAction<number>) {
      const findItem = state.items.find((obj) => obj.id === action.payload);
      if (findItem) {
        findItem.count--;
      }
    },

    clearItem(state, action) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});
export const selectCart = (state: RootState) => state.cartSlice;
export const { addItem, removeItem, clearItem, plusItem, minusItem } =
  cartSlice.actions;
export default cartSlice.reducer;
