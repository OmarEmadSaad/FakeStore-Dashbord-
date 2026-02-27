import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../types";
import { fetchProductsAPI, fetchCategoriesAPI } from "./productsAPI";

interface State {
  products: Product[];
  categories: string[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  sortOption: string;
  itemsPerPage: number;
}

const initialState: State = {
  products: [],
  categories: [],
  loading: false,
  error: null,
  currentPage: 1,
  sortOption: "default",
  itemsPerPage: 8,
};

export const fetchProducts = createAsyncThunk(
  "products/fetch",
  fetchProductsAPI,
);
export const fetchCategories = createAsyncThunk(
  "products/fetchCats",
  fetchCategoriesAPI,
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setSort: (state, action: PayloadAction<string>) => {
      state.sortOption = action.payload;
      state.currentPage = 1;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (s) => {
        s.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (s, a) => {
        s.loading = false;
        s.products = a.payload;
      })
      .addCase(fetchProducts.rejected, (s, a) => {
        s.loading = false;
        s.error = a.error.message || "خطأ";
      })
      .addCase(fetchCategories.fulfilled, (s, a) => {
        s.categories = a.payload;
      });
  },
});

export const { setSort, setPage } = productsSlice.actions;
export default productsSlice.reducer;
