// store
// reducer
// action/dispatching action
// subscription

import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./features/counterSlice.js"
import productReducer from "./features/productSlice.js"

export const store = configureStore({
  reducer: {
   
    counter: counterReducer,
    products: productReducer,
  },
});
