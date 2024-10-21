import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TableSortLabel, Typography } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'; // Icon trạng thái bình thường

const initialData = [
    { id: 1, date: '2024-10-01', waterBill: 150000, status: 'Hoàn Thành' },
    { id: 2, date: '2024-10-01', waterBill: 200000, status: 'Chưa Hoàn Thành' },
    { id: 3, date: '2024-10-01', waterBill: 120000, status: 'Hoàn Thành' },
    { id: 4, date: '2024-10-01', waterBill: 180000, status: 'Chưa Hoàn Thành' },
    { id: 5, date: '2024-10-01', waterBill: 160000, status: 'Hoàn Thành' },
];

function InvoiceTable() {
    const [data, setData] = useState(initialData);
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('waterBill');

    const getRandomWaterBill = () => {
        return Math.floor(Math.random() * 300000) + 100000; // Random value between 100,000 and 400,000
    };

    const fetchDataFake = () => {
        const currentTime = new Date();
        const formattedDate = currentTime.toISOString().split('T')[0]; // Format date to YYYY-MM-DD

        const updatedData = data.map(item => ({
            ...item,
            waterBill: getRandomWaterBill(),
            date: formattedDate,
        }));
        setData(updatedData);
    };

    useEffect(() => {
        fetchDataFake(); // Initial fetch
    }, []);

    const handleSort = (property) => {
        if (orderBy === property) {
            setOrder(order === 'asc' ? 'desc' : 'asc');
        } else {
            setOrder('asc');
            setOrderBy(property);
        }
    };

    const sortedData = (() => {
        return [...data].sort((a, b) => {
            if (a[orderBy] < b[orderBy]) return order === 'asc' ? -1 : 1;
            if (a[orderBy] > b[orderBy]) return order === 'asc' ? 1 : -1;
            return 0;
        });
    })();

    const getStatusStyle = (status) => {
        return {
            backgroundColor: status === 'Chưa Hoàn Thành' ? 'lightcoral' : 'lightgreen', // Đỏ cho 'Chưa Hoàn Thành' và Xanh lá cho 'Hoàn Thành'
            color: 'black', // Màu chữ trắng để dễ đọc
            borderRadius: '4px',
            padding: '5px',
            textAlign: 'center',
        };
    };

    return (
        <div style={{ textAlign: 'center' }}>
            <Typography variant="h4" align="left" style={{ marginLeft: '20px' }}>Bảng Hóa Đơn</Typography>
            <TableContainer component={Paper}
                sx={{
                    width: '80vh',
                    height: '80vh',
                    margin: 'auto' // Center the table container
                }}
            >
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">STT</TableCell>
                            <TableCell align="center">
                                <TableSortLabel
                                    active={orderBy === 'waterBill'}
                                    direction={orderBy === 'waterBill' ? order : 'asc'}
                                    onClick={() => handleSort('waterBill')}
                                    IconComponent={() => {
                                        if (order === '') {
                                            return <ArrowForwardIcon />;
                                        }
                                        return order === 'asc' ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />;
                                    }}
                                >
                                    Tiền Nước
                                </TableSortLabel>
                            </TableCell>
                            <TableCell align="center">Ngày Tạo</TableCell>
                            <TableCell align="center">Trạng Thái</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sortedData.map((row, index) => (
                            <TableRow key={row.id}>
                                <TableCell align="center">{index + 1}</TableCell>
                                <TableCell align="center">{row.waterBill.toLocaleString()} VNĐ</TableCell>
                                <TableCell align="center">{row.date}</TableCell>
                                <TableCell align="center" style={getStatusStyle(row.status)}>
                                    {row.status}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default InvoiceTable;
