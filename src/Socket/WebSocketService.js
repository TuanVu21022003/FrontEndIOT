// socketService.js
import { io } from "socket.io-client";

const URL = "https://0e24-113-160-14-39.ngrok-free.app/";  // Replace with your actual server URL
let socket;

const connectSocket = () => {
    console.log("Chuan bi ket noi");
    if (!socket) {
        socket = io(URL, {
            transports: ["websocket"],
            reconnection: true,
            reconnectionAttempts: 5,
            reconnectionDelay: 1000,
        });

        socket.on("connect", () => {
            console.log("Connected to Socket.IO server");
        });

        socket.on("disconnect", () => {
            console.log("Disconnected from Socket.IO server");
        });
    }
    return socket;
};

export const getSocket = () => {
    if (!socket) connectSocket();
    return socket;
};
