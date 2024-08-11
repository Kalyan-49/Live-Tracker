class WebSocketService {
  static socket = null;
  static connect(url, onMessage) {
    this.socket = new WebSocket(url);

    this.socket.onopen = () => {
      console.log("WebSocket connection established");
      const subscribeMessage = JSON.stringify({
        event: "subscribe",
        channel: "trades",
        symbol: "tBTCUSD",
      });

      this.socket.send(subscribeMessage);
    };

    this.socket.onmessage = (event) => {
      console.log("Raw WebSocket Data:", event.data);
      if (onMessage) {
        onMessage(event);
      }
    };

    this.socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    this.socket.onclose = () => {
      console.log("WebSocket connection closed");
    };
  }

  static disconnect() {
    if (this.socket) {
      this.socket.close();
    }
  }
}

export default WebSocketService;
