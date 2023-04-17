import { configureStore } from "@reduxjs/toolkit";
import filterSlice from "./slices/filterSlice.ts";
import cartSlice from "./slices/cartSlice.ts";
import pizzaSlice from "./slices/pizzaSlice.ts";
export const store = configureStore({
  reducer: {
    filterSlice,
    cartSlice,
    pizzaSlice,
  },
});
type FuncType = typeof store.getState;
export type RootState = ReturnType<FuncType>;
