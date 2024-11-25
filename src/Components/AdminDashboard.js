import React, { useEffect, useState } from 'react';
import { Box, Typography, ToggleButtonGroup, ToggleButton } from '@mui/material';
import Footer from './Footer';
import { BORDER_RADIUS_BIG, BORDER_RADIUS_MEDIUM, COLOR_CONTENT_ADMIN, HEIGHT_FOOTER, HEIGHT_USERINFO, MARGIN_HEADING, THEME_COLOR_BACKGROUND, THEME_COLOR_BORDER } from '../Assets/Constants/constants';
import AdminInfo from './AdminInfo';
import { createItemInvoiceAnimation, hexToRgba } from '../Assets/Constants/utils';
import logoImage from '../Assets/Images/logo.png'; // Đường dẫn ảnh logo
import CircleToggleButton from './Buttons/CircleToggleButton';
import ToggleSwitch from './Buttons/Toggles/ToggleSwitch';
import ToggleGroupThree from './Buttons/ToggleGroupThree';
function AdminDashboard() {
    const slideLeft = createItemInvoiceAnimation('-100px')
    const slideRight = createItemInvoiceAnimation('100px')
    // State để quản lý toggle đang bật (1, 2, 3)
    const [activeToggle, setActiveToggle] = useState(1);

    // Hàm xử lý sự kiện thay đổi toggle
    const handleToggle = (event, newToggle) => {
        // Nếu chọn một giá trị hợp lệ thì cập nhật state
        if (newToggle !== null) {
            setActiveToggle(newToggle);
        }
    };
    return (
        <Box display="flex" sx={{ position: "relative", margin: '0px' }}>
            <Box
                flex={1}
                sx={{
                    height: '100vh',
                    position: 'relative',
                }}
            >
                {/* Header thông tin người dùng */}
                <AdminInfo></AdminInfo>

                {/* Main content area for routing */}
                <Box
                    sx={{
                        height: `calc(100vh - (${HEIGHT_USERINFO}px + ${HEIGHT_FOOTER}px + ${MARGIN_HEADING}px))`,
                        position: 'relative',
                        paddingTop: MARGIN_HEADING / 8,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        // backgroundColor: '#f0f0f0'
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            maxWidth: '1200px',
                            minWidth: '900px',
                            width: '80%',
                            height: '90%'
                        }}
                    >
                        <Box
                            sx={{
                                flex: 2, // Box thứ nhất chiếm 2 phần
                                backgroundColor: COLOR_CONTENT_ADMIN, // Màu để dễ phân biệt (tuỳ chọn)
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderTopLeftRadius: BORDER_RADIUS_BIG * 2,
                                borderBottomLeftRadius: BORDER_RADIUS_BIG * 2,
                                animation: `${slideLeft} 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.3s both`,
                            }}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: '80%',
                                    height: '80%', // Chiều cao Box (tuỳ chỉnh theo ý bạn)
                                    backgroundColor: '#fff', // Màu nền (tuỳ chỉnh)
                                    border: `3px solid ${THEME_COLOR_BORDER}`, // Viền Box (tuỳ chỉnh)
                                    borderRadius: BORDER_RADIUS_MEDIUM, // Bo góc (tuỳ chỉnh)
                                    padding: '16px', // Khoảng cách bên trong
                                    boxShadow: `rgba(0, 0, 0, 0.25) 0px 25px 50px -12px`,
                                    
                                }}
                            >
                                {/* Logo */}
                                <Box
                                    component="img"
                                    src={logoImage}
                                    alt="Logo"
                                    sx={{
                                        width: '75%',

                                    }}
                                />
                                <Typography variant="h2"
                                    sx={{
                                        fontWeight: 'bold', color: '#333',
                                        textShadow: `2px 2px 2px ${hexToRgba(THEME_COLOR_BORDER)}`
                                    }}
                                >
                                    Welcome Admin
                                </Typography>
                            </Box>
                        </Box>
                        <Box
                            sx={{
                                flex: 1, // Box thứ hai chiếm 1 phần
                                backgroundColor: '#fff', // Màu để dễ phân biệt (tuỳ chọn)
                                borderTopRightRadius: BORDER_RADIUS_BIG,
                                borderBottomRightRadius: BORDER_RADIUS_BIG,
                                boxShadow: `${hexToRgba(COLOR_CONTENT_ADMIN, 0.4)} 5px 5px, ${hexToRgba(COLOR_CONTENT_ADMIN, 0.3)} 10px 10px, ${hexToRgba(COLOR_CONTENT_ADMIN, 0.2)} 15px 15px, ${hexToRgba(COLOR_CONTENT_ADMIN, 0.1)} 20px 20px, ${hexToRgba(COLOR_CONTENT_ADMIN, 0.05)} 25px 25px`,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                animation: `${slideRight} 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.3s both`,
                            }}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    flex: 1,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <ToggleSwitch></ToggleSwitch>
                            </Box>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flex: 3,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <ToggleGroupThree></ToggleGroupThree>

                            </Box>
                        </Box>
                    </Box>
                </Box>
                <Footer />
            </Box>
        </Box>
    );
}

export default AdminDashboard;
