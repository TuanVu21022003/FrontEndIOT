import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Components/Authen/Login/Login'; // Đường dẫn đến file Login.js
import Register from './Components/Authen/Register/Register'; // Đường dẫn đến file Register.js
import Dashboard from './Components/Dashboard';
import socket from './Socket/WebSocketService';
import AdminDashboard from './Components/AdminDashboard';

const user = {
  name: 'Nguyễn Văn A',
  username: 'nguyenvana',
  birthDate: '01/01/1990',
  address: 'Hà Nội, Việt Nam',
};



function App() {
  useEffect(() => {
    if (socket.connected) {
      console.log("Socket đã kết nối. Đang ngắt kết nối trước đó...");
      socket.disconnect();
      return;
    }

    const handleConnect = () => {
      console.log("Kết nối thành công đến server với socket ID:", socket.id);
      // Phát sự kiện "clientEvent" đến server khi kết nối
      socket.emit("clientEvent", { message: "Xin chào từ FE!" });
    };

    const handleMqttData = (data) => {
      console.log("Phản hồi từ server:", data);
    };

    const handleSwitchSystem = (data) => {
      console.log("Cảnh báo chỉ số vượt ngưỡng đã ngắt mạch:", data);
    };

    const handleError = (error) => {
      console.error("Kết nối thất bại:", error);
    };

    // Thêm các event listener
    socket.on("connect", handleConnect);
    socket.on("mqttData", handleMqttData);
    socket.on("switch system", handleSwitchSystem);
    socket.on("serverResponse", handleError);

    // Dọn dẹp khi component bị unmount
    return () => {
      console.log("Component unmounted. Gỡ bỏ các listener và ngắt kết nối...");
      socket.off("connect", handleConnect);
      socket.off("mqttData", handleMqttData);
      socket.off("switch system", handleSwitchSystem);
      socket.off("serverResponse", handleError);
    };
  }, []); // Chỉ chạy một lần khi component được mount
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard/*" element={<Dashboard user={user} />} />
        <Route path="/admindashboard" element={<AdminDashboard />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login />} /> {/* Mặc định là trang login */}
      </Routes>
    </Router>
  );
}

export default App;
