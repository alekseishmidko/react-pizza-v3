import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeIndexCategory: 0,
  activeSortIndex: { name: "популярности(DESC)", sortProperty: "rating" },
};

export const filterSlice = createSlice({
  name: "filters",
  initialState: initialState,
  reducers: {
    setActiveIndexCategory(state, action) {
      state.activeIndexCategory = action.payload;
    },
    setActiveSortIndex(state, action) {
      state.activeSortIndex = action.payload;
    },
  },
});
export const { setActiveIndexCategory, setActiveSortIndex } =
  filterSlice.actions;
export default filterSlice.reducer;
