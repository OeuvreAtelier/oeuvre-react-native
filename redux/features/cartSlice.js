import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existingItem = state.cartItems.find((cartItem) => cartItem.id === item.id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cartItems.push({ ...item, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      const itemId = action.payload.id;
      const existingItem = state.cartItems.find((cartItem) => cartItem.id === itemId);

      if (existingItem) {
        if (existingItem.quantity === 1) {
          state.cartItems = state.cartItems.filter((cartItem) => cartItem.id !== itemId);
        } else {
          existingItem.quantity -= 1;
        }
      }
    },
    clearCart: (state) => {
      state.cartItems = [];
    },
    setCartItems: (state, action) => {
      state.cartItems = action.payload;
    },
    updateCartItemQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const existingItem = state.cartItems.find((cartItem) => cartItem.id === id);

      if (existingItem) {
        if (quantity === 0) {
          state.cartItems = state.cartItems.filter((cartItem) => cartItem.id !== id);
        } else {
          existingItem.quantity = quantity;
        }
      }
    },
  },
});

export const { addToCart, removeFromCart, clearCart, setCartItems, updateCartItemQuantity } = cartSlice.actions;

export const selectCartItems = (state) => state.cart.cartItems;
export const selectCartTotal = (state) =>
  state.cart.cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

export default cartSlice.reducer;
