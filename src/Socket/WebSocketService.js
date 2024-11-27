// socketService.js
import { io } from "socket.io-client";

const SOCKET_SERVER_URL = "http://localhost:4000/" // Thay đổi nếu cần thiết

const socket = io(SOCKET_SERVER_URL,{
  transports:["websocket"]
});

export default socket;
