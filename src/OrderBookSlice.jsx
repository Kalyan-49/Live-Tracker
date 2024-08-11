import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bids: JSON.parse(localStorage.getItem("bids")) || [],
  asks: JSON.parse(localStorage.getItem("asks")) || [],
};

const orderBookSlice = createSlice({
  name: "orderBook",
  initialState,
  reducers: {
    updateOrderBook: (state, action) => {
      state.bids = action.payload.bids;
      state.asks = action.payload.asks;
      localStorage.setItem("bids", JSON.stringify(state.bids));
      localStorage.setItem("asks", JSON.stringify(state.asks));
    },
  },
});

export const { updateOrderBook } = orderBookSlice.actions;
export default orderBookSlice.reducer;
