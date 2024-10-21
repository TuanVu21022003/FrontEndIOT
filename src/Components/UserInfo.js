import React, { useState} from 'react';
import { Box, Typography, Avatar, Menu, MenuItem, IconButton, List, ListItem, ListItemText } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications'; // Import biểu tượng thông báo
import defaultAvatar from '../Assets/Images/defaultAvatar.png'; // Đường dẫn ảnh đại diện mặc định
import { useNavigate } from 'react-router-dom';

function UserInfo({ user }) {
  const [anchorEl, setAnchorEl] = useState(null); // Trạng thái cho menu
  const [notificationAnchorEl, setNotificationAnchorEl] = useState(null); // Trạng thái cho menu thông báo
  const [notifications, setNotifications] = useState([]); // Trạng thái để lưu trữ thông báo
  const navigate = useNavigate();

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget); // Mở menu
  };

  const handleMenuClose = (action) => {
    setAnchorEl(null); // Đóng menu
    // Xử lý hành động dựa trên mục đã nhấn
    if (action === 'logout') {
      console.log('Đăng xuất'); // In ra 'Đăng xuất' trong console
      navigate('/login')
      // Thêm logic đăng xuất của bạn ở đây
    } else if (action === 'changePassword') {
      console.log('Đổi mật khẩu'); // In ra 'Đổi mật khẩu' trong console
      // Thêm logic đổi mật khẩu của bạn ở đây
    }
  };

  // Dữ liệu thông báo mẫu (bạn có thể thay thế bằng dữ liệu từ API)
  const allNotifications = [
    { id: 1, title: 'Thông báo 1', description: 'Đây là mô tả cho thông báo 1' },
    { id: 2, title: 'Thông báo 2', description: 'Đây là mô tả cho thông báo 2' },
    { id: 3, title: 'Thông báo 3', description: 'Đây là mô tả cho thông báo 3' },
  ];

  const handleNotificationClick = (event) => {
    setNotificationAnchorEl(event.currentTarget); // Mở menu thông báo
    setNotifications(allNotifications); // Tải thông báo vào trạng thái
  };

  const handleNotificationClose = () => {
    setNotificationAnchorEl(null); // Đóng menu thông báo
  };

  return (
    <Box
      sx={{
        backgroundColor: '#f5f5f5',
        padding: '10px',
        borderBottom: '2px solid #00CCFF',
        justifyContent: 'flex-end',
        display: 'flex',
        alignItems: 'center', // Căn giữa các item theo chiều dọc
      }}
    >
      {/* Biểu tượng thông báo */}
      <IconButton
        onClick={handleNotificationClick} // Mở menu thông báo và tải thông báo
        sx={{ marginRight: 2 }}
      >
        <NotificationsIcon />
      </IconButton>

      {/* Menu thông báo */}
      <Menu
        anchorEl={notificationAnchorEl}
        open={Boolean(notificationAnchorEl)} // Mở menu nếu anchor không null
        onClose={handleNotificationClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        sx={{ mt: 2 }} // Thêm margin top (điều chỉnh giá trị nếu cần)
      >
        <List>
          {notifications.map((notification) => (
            <ListItem
              key={notification.id}
              button
              onClick={() => console.log('Notification:', notification)} // In ra toàn bộ đối tượng thông báo
              sx={{
                cursor: 'pointer'
              }}
            >
              <ListItemText primary={notification.title} secondary={notification.description} />
            </ListItem>
          ))}
        </List>
      </Menu>

      <Box
        onClick={handleMenuClick}
        sx={{
          cursor: 'pointer',
          marginRight: 2,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Typography variant="h6" sx={{ marginRight: 1 }}>
          Xin chào, {user.name}
        </Typography>
        <Avatar
          alt={user.name}
          src={user.avatar || defaultAvatar} // Sử dụng ảnh đại diện của người dùng hoặc ảnh mặc định
          sx={{ width: 40, height: 40 }} // Kích thước của ảnh đại diện
        />
      </Box>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => handleMenuClose(null)} // Đóng menu mà không có hành động
        anchorOrigin={{
          vertical: 'bottom', // Đặt menu bên dưới ảnh đại diện
          horizontal: 'right', // Căn menu sang bên phải
        }}
        transformOrigin={{
          vertical: 'top', // Bắt đầu menu từ trên cùng
          horizontal: 'right', // Căn trên cùng của menu với bên phải
        }}
        sx={{ mt: 2 }} // Thêm margin top (điều chỉnh giá trị nếu cần)
      >
        <MenuItem onClick={() => handleMenuClose('changePassword')}>Đổi mật khẩu</MenuItem>
        <MenuItem onClick={() => handleMenuClose('logout')}>Đăng xuất</MenuItem>
      </Menu>
    </Box>
  );
}

export default UserInfo;
