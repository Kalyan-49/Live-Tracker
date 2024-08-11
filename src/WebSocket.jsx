const WebSocketUrl = "wss://api-pub.bitfinex.com/ws/2";

export const createWebSocket = (onMessage) => {
  const ws = new WebSocket(WebSocketUrl);

  ws.onopen = () => {
    const message = JSON.stringify({
      event: "subscribe",
      channel: "book",
      symbol: "tBTCUSD",
    });
    ws.send(message);
  };

  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    console.log("WebSocket message received:", data);
    onMessage(data);
  };

  ws.onerror = (error) => {
    console.error("WebSocket error:", error);
  };

  return ws;
};
