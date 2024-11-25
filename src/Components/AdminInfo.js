import React, { useState } from 'react';
import { Box, Typography, Avatar, Menu, MenuItem, IconButton, List, ListItem, ListItemText } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications'; // Import biểu tượng thông báo
import adminAvatar from '../Assets/Images/logo.png'; // Đường dẫn ảnh đại diện mặc định
import { useNavigate } from 'react-router-dom';
import { BORDER_RADIUS_MEDIUM, THEME_COLOR_BACKGROUND, THEME_COLOR_BORDER, THEME_COLOR_FONT, TIME_DELAY, TRANSITION_USER_INFO} from '../Assets/Constants/constants';
import { createSlideDownAnimation } from '../Assets/Constants/utils';



function AdminInfo() {
  const [anchorEl, setAnchorEl] = useState(null); // Trạng thái cho menu
  const [notificationAnchorEl, setNotificationAnchorEl] = useState(null); // Trạng thái cho menu thông báo
  const [notifications, setNotifications] = useState([]); // Trạng thái để lưu trữ thông báo
  const navigate = useNavigate();
  const slideDown = createSlideDownAnimation(TRANSITION_USER_INFO)

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
        backgroundColor: THEME_COLOR_BACKGROUND,
        color: THEME_COLOR_FONT,
        borderBottom: `3px solid ${THEME_COLOR_BORDER}`,
        justifyContent: 'flex-end',
        display: 'flex',
        alignItems: 'center', // Căn giữa các item theo chiều dọc
        position: "sticky",
        top: 0, // Nằm ở dưới cùng của trang
        left: 0, // Căn sát bên trái
        width: "100%", // Chiếm toàn bộ chiều ngang
        zIndex: '1',
        borderBottomLeftRadius: BORDER_RADIUS_MEDIUM,
        borderBottomRightRadius: BORDER_RADIUS_MEDIUM,
        animation: `${slideDown} 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) ${TIME_DELAY} both`
      }}
    >
      <Box
        sx={{
          backgroundColor: THEME_COLOR_BACKGROUND,
          padding: '10px',
          justifyContent: 'flex-end',
          display: 'flex',
          alignItems: 'center', // Căn giữa các item theo chiều dọc,
          borderBottomLeftRadius: BORDER_RADIUS_MEDIUM,
          borderBottomRightRadius: BORDER_RADIUS_MEDIUM,
        }}
      >
        {/* Biểu tượng thông báo */}
        <IconButton
          onClick={handleNotificationClick} // Mở menu thông báo và tải thông báo
          sx={{ marginRight: 2, color: THEME_COLOR_FONT }}
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
            Xin chào, Admin
          </Typography>
          <Avatar
            src={adminAvatar} // Sử dụng ảnh đại diện của người dùng hoặc ảnh mặc định
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
    </Box>
  );
}

export default AdminInfo;
