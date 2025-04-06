
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
  status: 'idle',
  error: null,
  searchTerm: '',
  categories: {}
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
      state.status = 'succeeded';
    },
    setLoading: (state) => {
      state.status = 'loading';
    },
    setError: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setCategories: (state, action) => {
      state.categories = action.payload;
    }
  }
});

export const { setProducts, setLoading, setError, setSearchTerm, setCategories } = productSlice.actions;

export const fetchProducts = () => async (dispatch) => {
  dispatch(setLoading());
  try {
    const response = await fetch('https://dummyjson.com/products');
    if (!response.ok) throw new Error('Failed to fetch products');
    const data = await response.json();
    dispatch(setProducts(data.products));
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export default productSlice.reducer;
