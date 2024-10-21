import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Components/Authen/Login/Login'; // Đường dẫn đến file Login.js
import Register from './Components/Authen/Register/Register'; // Đường dẫn đến file Register.js
import Dashboard from './Components/Dashboard';

const user = {
  name: 'Nguyễn Văn A',
  username: 'nguyenvana',
  birthDate: '01/01/1990',
  address: 'Hà Nội, Việt Nam',
};

function App() {
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
