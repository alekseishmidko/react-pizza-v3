import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
const initialState: FilterSliceState = {
  activeIndexCategory: 0,
  activeSortIndex: { name: "популярности(DESC)", sortProperty: "rating" },
  currentPage: 1,
  searchValue: "",
};
type activeSortIndexType = { name: string; sortProperty: string };

interface FilterSliceState {
  activeIndexCategory: number;
  activeSortIndex: activeSortIndexType;
  currentPage: number;
  searchValue: string;
}
//
//
export const selectFilter = (state: RootState) => state.filterSlice;
export const selectFilterActiveIndexCategory = (state: RootState) =>
  state.filterSlice.activeIndexCategory;
export const selectFilterCurrentPage = (state: RootState) =>
  state.filterSlice.currentPage;
export const selectFilterSearchValue = (state: RootState) =>
  state.filterSlice.searchValue;
export const selectFilterActiveSortIndex = (state: RootState) =>
  state.filterSlice.activeSortIndex;
//
//
export const filterSlice = createSlice({
  name: "filters",
  initialState: initialState,
  reducers: {
    setActiveIndexCategory(state, action: PayloadAction<number>) {
      state.activeIndexCategory = action.payload;
    },
    setActiveSortIndex(state, action: PayloadAction<activeSortIndexType>) {
      state.activeSortIndex = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setSearchValue(state, action: PayloadAction<string>) {
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
