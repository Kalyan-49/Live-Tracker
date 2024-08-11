import { configureStore } from "@reduxjs/toolkit";
import orderBookReducer from "./OrderBookSlice";

const store = configureStore({
  reducer: {
    orderBook: orderBookReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
