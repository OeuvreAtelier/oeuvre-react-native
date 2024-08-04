import { configureStore } from "@reduxjs/toolkit"
import productReducer from "./features/productSlice.js"
import userReducer from "./features/userSlice.js"
import addressReducer from "./features/addressSlice.js";
import cartReducer from "./features/cartSlice.js"
import transactionReducer from "./features/transactionSlice.js"

export const store = configureStore({
  reducer: {
    products: productReducer,
    user: userReducer,
    address: addressReducer,
    cart: cartReducer,
    transaction: transactionReducer,
  },
});
