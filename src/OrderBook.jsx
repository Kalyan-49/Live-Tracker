import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateOrderBook } from "./OrderBookSlice";
import { createWebSocket } from "./WebsocketService";
import OrderBookChart from "./OrderBookChart";
import "./OrderBook.css";

const OrderBook = () => {
  const dispatch = useDispatch();
  const { bids, asks } = useSelector((state) => state.orderBook);
  const handleWebSocketData = useCallback(
    ([channelId, payload]) => {
      console.log("Data received:", [channelId, payload]);

      if (Array.isArray(payload)) {
        const bidsArray = payload.filter((item) => item[2] > 0);
        const asksArray = payload.filter((item) => item[2] < 0);

        const formattedBids = bidsArray.map((item) => ({
          price: item[0],
          amount: -item[2],
        }));

        const formattedAsks = asksArray.map((item) => ({
          price: item[0],
          amount: -item[2],
        }));

        dispatch(updateOrderBook({ bids: formattedBids, asks: formattedAsks }));
      } else {
        console.warn("Unexpected data format in payload:", payload);
      }
    },
    [dispatch]
  );

  useEffect(() => {
    const ws = createWebSocket(handleWebSocketData);

    return () => {
      ws.close();
    };
  }, [handleWebSocketData]);

  return (
    <div className="order-book">
      <div className="order-book__bids">
        <h3>Bids</h3>
        <OrderBookChart bids={bids} asks={asks} />
      </div>
      <div className="order-book__asks">
        <h3>Asks</h3>
        <OrderBookChart bids={bids} asks={asks} />
      </div>
    </div>
  );
};

export default OrderBook;
