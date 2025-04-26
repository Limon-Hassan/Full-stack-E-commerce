import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: JSON.parse(localStorage.getItem('cart')) || [],
  },
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const exists = state.cartItems.find(item => item._id === product._id);

      if (!exists) {
        state.cartItems.push({ ...product, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        item => item._id !== action.payload._id
      );
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
