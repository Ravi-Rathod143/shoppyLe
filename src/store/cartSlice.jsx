
import { createSlice } from '@reduxjs/toolkit';

// Load initial state from localStorage
const loadCartState = () => {
  try {
    const serializedCart = localStorage.getItem('cart');
    const parsedCart = serializedCart ? JSON.parse(serializedCart) : null;
    return parsedCart && Array.isArray(parsedCart.cartItems) ? parsedCart : { cartItems: [] };
  } catch {
    return { cartItems: [] };
  }
};



const cartSlice = createSlice({
  name: 'cart',
  initialState: loadCartState(),
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.cartItems.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cartItems.push({
          ...action.payload,
          quantity: 1,
          cartId: Date.now()
        });
      }
      localStorage.setItem('cart', JSON.stringify(state));
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(item => item.cartId !== action.payload);
      localStorage.setItem('cart', JSON.stringify(state));
    },
    updateQuantity: (state, action) => {
      const { cartId, quantity } = action.payload;
      const item = state.cartItems.find(item => item.cartId === cartId);
      if (item) {
        item.quantity = quantity;
      }
      localStorage.setItem('cart', JSON.stringify(state));
    },
    clearCart: (state) => {
      state.cartItems = [];
      localStorage.setItem('cart', JSON.stringify(state));
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
