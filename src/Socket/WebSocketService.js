// websocketService.js
const SOCKET_SERVER_URL = "ws://localhost:4000";
let socket = null;
let topicListeners = {}; // Quản lý listener theo topic

// Kết nối WebSocket
const connectWebSocket = () => {
  if (!socket) {
    socket = new WebSocket(SOCKET_SERVER_URL);

    socket.onopen = () => {
      console.log("Kết nối WebSocket thành công");
      socket.send(JSON.stringify({ message: "Xin chào từ FE!" }));
    };

    socket.onmessage = (event) => {
      // console.log("Nhận dữ liệu từ server:", event.data);
      const topic = JSON.parse(event.data).topic; // Phân tách topic và payload
      if (topic && topicListeners[topic]) {
        // Gọi các listener đã đăng ký với topic
        topicListeners[topic].forEach((listener) => listener(JSON.parse(event.data)));
      }
    };

    socket.onerror = (error) => {
      console.error("Kết nối WebSocket thất bại:", error);
    };

    socket.onclose = () => {
      console.log("Kết nối WebSocket đã đóng");
      socket = null;
    };
  }
};

// Đăng ký listener cho một topic
const addTopicListener = (topic, listener) => {
  if (!topicListeners[topic]) {
    topicListeners[topic] = [];
  }
  topicListeners[topic].push(listener);
};

// Xóa listener khỏi một topic
const removeTopicListener = (topic, listener) => {
  if (topicListeners[topic]) {
    topicListeners[topic] = topicListeners[topic].filter((l) => l !== listener);
    if (topicListeners[topic].length === 0) {
      delete topicListeners[topic];
    }
  }
};

// Ngắt kết nối WebSocket
const disconnectWebSocket = () => {
  if (socket) {
    console.log("Đang ngắt kết nối WebSocket...");
    socket.close();
  }
};

// Gửi dữ liệu với topic
const sendMessage = (topic, payload) => {
  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify({ topic, payload }));
  } else {
    console.error("WebSocket chưa sẵn sàng để gửi dữ liệu");
  }
};

// Kiểm tra WebSocket đã kết nối chưa
const isWebSocketConnected = () => {
  return socket && socket.readyState === WebSocket.OPEN;
};

export {
  connectWebSocket,
  disconnectWebSocket,
  addTopicListener,
  removeTopicListener,
  sendMessage,
  isWebSocketConnected,
};
