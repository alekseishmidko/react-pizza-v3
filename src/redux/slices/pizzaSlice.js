import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  items: [],
  status: "loading", // loading, success, error
};
export const fetchPizzas = createAsyncThunk(
  "pizza/fetchPizzasStatus",
  async (params) => {
    const { search, activeIndexCategory, activeSortIndex, currentPage } =
      params;
    const responce = await axios.get(
      `https://63e3ba61c919fe386c0d7fe5.mockapi.io/items?${search}${
        activeIndexCategory > 0 ? `&category=${activeIndexCategory}` : ""
      }&sortBy=${activeSortIndex.sortProperty}&page=${currentPage}&limit=4`
    );
    return responce.data;
  }
);

export const pizzaSlice = createSlice({
  name: "pizza",
  initialState: initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, (state) => {
        state.status = "loading";
        state.items = [];
      })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        state.items = action.payload;
        console.log(state);
        state.status = "success";
      })
      .addCase(fetchPizzas.rejected, (state) => {
        state.status = "error";
        state.items = [];
      });
  },
});

export const { setItems } = pizzaSlice.actions;
export default pizzaSlice.reducer;
