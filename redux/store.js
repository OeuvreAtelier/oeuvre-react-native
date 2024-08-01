import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./features/counterSlice.js"
import productReducer from "./features/productSlice.js"
import userReducer from "./features/userSlice.js"

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    products: productReducer,
    user: userReducer,
  },
});
