import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeIndexCategory: 0,
  activeSortIndex: { name: "популярности(DESC)", sortProperty: "rating" },
  currentPage: 1,
  searchValue: "",
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
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    setSearchValue(state, action) {
      state.searchValue = action.payload;
    },
  },
});
export const {
  setActiveIndexCategory,
  setActiveSortIndex,
  setCurrentPage,
  setSearchValue,
} = filterSlice.actions;
export default filterSlice.reducer;
