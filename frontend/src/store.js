import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./slices/apiSlice";
import cartSliceReducer from "./slices/cartSlice";
import authSliceReducer from "./slices/authSlice";
import wishlistSliceReducer from "./slices/wishlistSlice";

const store = configureStore({
   reducer: {
      [apiSlice.reducerPath]: apiSlice.reducer,
      cart: cartSliceReducer,
      auth: authSliceReducer,
      wishlist: wishlistSliceReducer
   },
   middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
   devTools: true
});

export default store;