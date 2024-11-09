import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Components/Authen/Login/Login'; // Đường dẫn đến file Login.js
import Register from './Components/Authen/Register/Register'; // Đường dẫn đến file Register.js
import Dashboard from './Components/Dashboard';
import { getSocket } from './Socket/WebSocketService';
import io from "socket.io-client";

const user = {
  name: 'Nguyễn Văn A',
  username: 'nguyenvana',
  birthDate: '01/01/1990',
  address: 'Hà Nội, Việt Nam',
};

const SOCKET_SERVER_URL = "https://iot-backend-project.onrender.com"; // Thay đổi nếu cần thiết

const socket = io(SOCKET_SERVER_URL);

function App() {
  // useEffect(() => {
  //   const socket = getSocket();

  //   // Example of subscribing to a specific event
  //   socket.on("sensorData", (data) => {
  //     console.log("Data received:", data);
  //   });

  //   // Clean up on unmount
  //   return () => {
  //     socket.off("sensorData");
  //   };
  // }, []);
  // const [sensorData, setSensorData] = useState(null);
  useEffect(() => {
    // Kết nối đến Socket.IO server

    console.log("CHUAN BI NHAN")
    // Lắng nghe sự kiện 'sensorData' từ server
    socket.on("sensorData", (data) => {
      console.log("Dữ liệu nhận từ server:", data);
      // setSensorData(data);
    });

    // Hủy kết nối khi component bị unmount
    return () => {
      socket.disconnect();
    };
  }, []);
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard/*" element={<Dashboard user={user} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login />} /> {/* Mặc định là trang login */}
      </Routes>
    </Router>
  );
}

export default App;
