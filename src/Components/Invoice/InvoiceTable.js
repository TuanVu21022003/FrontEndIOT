import React, { useState, useEffect } from 'react';
import { Box, Pagination } from '@mui/material';
import { MARGIN_HEADING, THEME_COLOR_BACKGROUND, THEME_COLOR_FONT, THEME_COLOR_BORDER } from '../../Assets/Constants/constants';
import ItemInvoice from './ItemInvoice';
import Heading from '../Heading/Heading';

const initialData = [
    { id: 1, date: "2024-10-01", waterBill: 150000, status: "Hoàn Thành" },
    { id: 2, date: "2024-10-01", waterBill: 200000, status: "Chưa Hoàn Thành" },
    { id: 3, date: "2024-10-01", waterBill: 120000, status: "Hoàn Thành" },
    { id: 4, date: "2024-10-01", waterBill: 180000, status: "Chưa Hoàn Thành" },
    { id: 5, date: "2024-10-01", waterBill: 160000, status: "Hoàn Thành" },
    { id: 6, date: "2024-10-01", waterBill: 210000, status: "Chưa Hoàn Thành" },
    { id: 7, date: "2024-10-01", waterBill: 175000, status: "Hoàn Thành" },
    { id: 8, date: "2024-10-01", waterBill: 195000, status: "Chưa Hoàn Thành" },
    { id: 9, date: "2024-10-01", waterBill: 185000, status: "Hoàn Thành" },
    { id: 10, date: "2024-10-01", waterBill: 200000, status: "Chưa Hoàn Thành" },
];

function InvoiceTable() {
    const [data, setData] = useState(initialData);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;

    // Tính toán hóa đơn hiển thị
    const totalPages = Math.ceil(data.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentData = data.slice(startIndex, endIndex);

    // Xử lý khi đổi trang
    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    // Xử lý thanh toán
    const handlePay = (id) => {
        setData((prevData) =>
            prevData.map((item) =>
                item.id === id ? { ...item, status: "Hoàn Thành" } : item
            )
        );
        alert(`Thanh toán thành công hóa đơn #${id}`);
    };

    return (
        <Box
            sx={{
                height: '100%',

            }}
        >
            <Heading
                text="Danh sách hóa đơn tiền nước"
                margin={MARGIN_HEADING}
                themeColorBorder={THEME_COLOR_BORDER}
            ></Heading>
            <Box
                sx={{
                    height: '80%',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column', /* Các phần tử xếp theo hàng dọc */
                    alignItems: 'center'    /* Căn giữa theo chiều ngang */
                }}
            >
                {currentData.map((item) => (
                    <ItemInvoice key={item.id} item={item} onPay={handlePay} delay={(item.id - 1) % itemsPerPage * 0.1} />
                ))}
            </Box>

            <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={handlePageChange}
                    color="primary"
                    // backgroundColor = {THEME_COLOR_BACKGROUND}
                    shape="rounded"
                    size="large"
                    sx={{

                        '& .MuiPaginationItem-root.Mui-selected': {
                            color: THEME_COLOR_FONT, // Màu chữ
                            backgroundColor: THEME_COLOR_BACKGROUND, // Màu nền
                        },
                    }}
                />
            </Box>
        </Box>
    );
}

export default InvoiceTable;
