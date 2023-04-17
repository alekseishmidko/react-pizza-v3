import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";
import { CartItem } from "./cartSlice";
const initialState: PizzaSliceState = {
  items: [],
  status: "loading", // loading, success, error
};
//
type fetchPizzasArgs = {
  search: string;
  activeIndexCategory: number;
  activeSortIndex: any;
  currentPage: string;
};
//
export const fetchPizzas = createAsyncThunk(
  "pizza/fetchPizzasStatus",
  async (params: fetchPizzasArgs) => {
    const { search, activeIndexCategory, activeSortIndex, currentPage } =
      params;
    const responce = await axios.get(
      `https://63e3ba61c919fe386c0d7fe5.mockapi.io/items?${search}${
        activeIndexCategory > 0 ? `&category=${activeIndexCategory}` : ""
      }&sortBy=${activeSortIndex.sortProperty}&page=${currentPage}&limit=4`
    );
    return responce.data as CartItem;
  }
);
//
type Pizza = {
  id: number;
  imageUrl: string;
  title: string;
  price: number;
  type: string;
  size: string;
  count: number;
};
//
interface PizzaSliceState {
  items: Pizza[];
  status: "loading" | "success" | "error";
}

//
//
export const pizzaSlice = createSlice({
  name: "pizza",
  initialState: initialState,
  reducers: {
    setItems(state, action: PayloadAction<Pizza[]>) {
      state.items = action.payload;
    },
  },
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(fetchPizzas.pending, (state) => {
  //       state.status = "loading";
  //       state.items = [];
  //     })
  //     .addCase(fetchPizzas.fulfilled, (state, action) => {
  //       state.items = action.payload;
  //       console.log(state);
  //       state.status = "success";
  //     })
  //     .addCase(fetchPizzas.rejected, (state) => {
  //       state.status = "error";
  //       state.items = [];
  //     });
  // },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state, action) => {
      state.status = "loading";
      state.items = [];
    });
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = "success";
    });
    builder.addCase(fetchPizzas.rejected, (state, action) => {
      state.status = "error";
      state.items = [];
    });
  },
});

export const selectPizzaSlice = (state: RootState) => state.pizzaSlice;
export const { setItems } = pizzaSlice.actions;
export default pizzaSlice.reducer;
