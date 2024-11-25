import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TableSortLabel, Typography } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'; // Normal state icon
import { BORDER_RADIUS_SMALL, MARGIN_HEADING, THEME_COLOR_BORDER, TIME_DELAY_TABLE, TRANSITION_TABLE } from '../../Assets/Constants/constants';
import { createTableAnimation, hexToRgba } from '../../Assets/Constants/utils';
import Heading from '../Heading/Heading';
const initialData = [
    { id: 1, ecValue: 0.5, timestamp: '2024-10-21 10:30', location: 'Hà Nội' },
    { id: 2, ecValue: 0.8, timestamp: '2024-10-21 10:35', location: 'Hồ Chí Minh' },
    { id: 3, ecValue: 0.3, timestamp: '2024-10-21 10:40', location: 'Đà Nẵng' },
    { id: 4, ecValue: 0.6, timestamp: '2024-10-21 10:45', location: 'Hà Nội' },
    { id: 5, ecValue: 0.7, timestamp: '2024-10-21 10:50', location: 'Hồ Chí Minh' },
    { id: 6, ecValue: 1.0, timestamp: '2024-10-21 10:55', location: 'Đà Nẵng' },
    { id: 7, ecValue: 0.4, timestamp: '2024-10-21 11:00', location: 'Hà Nội' },
    { id: 8, ecValue: 0.9, timestamp: '2024-10-21 11:05', location: 'Hồ Chí Minh' },
    { id: 9, ecValue: 0.2, timestamp: '2024-10-21 11:10', location: 'Đà Nẵng' },
    { id: 10, ecValue: 0.5, timestamp: '2024-10-21 11:15', location: 'Hà Nội' },
    { id: 11, ecValue: 0.6, timestamp: '2024-10-21 11:20', location: 'Hồ Chí Minh' },
    { id: 12, ecValue: 0.3, timestamp: '2024-10-21 11:25', location: 'Đà Nẵng' },
    { id: 13, ecValue: 0.7, timestamp: '2024-10-21 11:30', location: 'Hà Nội' },
    { id: 14, ecValue: 0.8, timestamp: '2024-10-21 11:35', location: 'Hồ Chí Minh' },
    { id: 15, ecValue: 1.1, timestamp: '2024-10-21 11:40', location: 'Đà Nẵng' },
];

function ECDataTable() {
    const slideDown = createTableAnimation(TRANSITION_TABLE)
    const [data, setData] = useState(initialData);
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('ecValue');

    const getRandomECValue = () => {
        return (Math.random() * 2).toFixed(2); // Random value between 0 and 2
    };

    const fetchDataFake = () => {
        const currentTime = new Date();
        const formattedTime = currentTime.toISOString().slice(0, 19).replace('T', ' ');

        const updatedData = data.map(item => ({
            ...item,
            ecValue: getRandomECValue(),
            timestamp: formattedTime,
        }));
        setData(updatedData);
    };

    useEffect(() => {
        fetchDataFake();
        const intervalId = setInterval(fetchDataFake, 2000);
        return () => clearInterval(intervalId);
    }, []);

    const getBackgroundColor = (value) => {
        if (value <= 0.5) return 'lightgreen';  // "Good"
        if (value > 0.5 && value <= 1.0) return 'lightyellow';  // "Average"
        return 'lightcoral';  // "Poor"
    };

    const handleSort = (property) => {
        if (orderBy === property) {
            // Cycle through states: normal -> asc -> desc
            if (order === 'asc') {
                setOrder('desc');
            } else if (order === 'desc') {
                setOrder(''); // Reset to normal
            } else {
                setOrder('asc');
            }
        } else {
            setOrder('asc');
            setOrderBy(property);
        }
    };

    const sortedData = (() => {
        if (order === '') return data; // No sorting
        return [...data].sort((a, b) => {
            if (a[orderBy] < b[orderBy]) return order === 'asc' ? -1 : 1;
            if (a[orderBy] > b[orderBy]) return order === 'asc' ? 1 : -1;
            return 0;
        });
    })();

    return (
        <div
            style={{
                textAlign: 'center',

            }}
        >
            <Heading
                text="Dữ liệu EC"
                margin={MARGIN_HEADING}
                themeColorBorder={THEME_COLOR_BORDER}
            ></Heading>
            <TableContainer component={Paper}
                sx={{
                    width: '80vh',
                    height: '70vh',
                    margin: 'auto', // Center the table container
                    borderRadius: BORDER_RADIUS_SMALL,
                    border: `3px solid ${THEME_COLOR_BORDER}`,
                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)', // Thêm shadow
                    // boxShadow: `rgba(240, 46, 170, 0.4) 0px 5px, rgba(240, 46, 170, 0.3) 0px 10px, rgba(240, 46, 170, 0.2) 0px 15px, rgba(240, 46, 170, 0.1) 0px 20px, rgba(240, 46, 170, 0.05) 0px 25px`,
                    // overflow: 'hidden',
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                    animation: `${slideDown} 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) ${TIME_DELAY_TABLE} both`
                }}
            >
                <Table>
                    <TableHead
                        style={{
                            position: 'sticky',
                            top: 0,
                            zIndex: 1, // Để đảm bảo TableHead luôn nằm trên các thành phần khác
                            backgroundColor: '#fff', // Màu nền để tránh bị chồng mờ
                        }}
                    >
                        <TableRow>
                            <TableCell align="center">STT</TableCell>
                            <TableCell align="center">
                                <TableSortLabel
                                    active={orderBy === 'ecValue'}
                                    direction={orderBy === 'ecValue' ? (order === '' ? 'asc' : order) : 'asc'}
                                    onClick={() => handleSort('ecValue')}
                                    IconComponent={() => {
                                        if (order === '') {
                                            return <ArrowForwardIcon />;
                                        }
                                        return order === 'asc' ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />;
                                    }}
                                >
                                    EC Value (mS/cm)
                                </TableSortLabel>
                            </TableCell>
                            <TableCell align="center">Measurement Timestamp</TableCell>
                            <TableCell align="center">Location</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sortedData.map((row, index) => (
                            <TableRow key={row.id} style={{ backgroundColor: getBackgroundColor(row.ecValue) }}>
                                <TableCell align="center">{index + 1}</TableCell>
                                <TableCell align="center">{row.ecValue}</TableCell>
                                <TableCell align="center">{row.timestamp}</TableCell>
                                <TableCell align="center">{row.location}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default ECDataTable;
