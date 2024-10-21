import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TableSortLabel, Typography } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'; // Normal state icon

const initialData = [
    { id: 1, turbidityValue: 3.5, timestamp: '2024-10-21 10:30', location: 'Hà Nội' },
    { id: 2, turbidityValue: 2.8, timestamp: '2024-10-21 10:35', location: 'Hồ Chí Minh' },
    { id: 3, turbidityValue: 4.1, timestamp: '2024-10-21 10:40', location: 'Đà Nẵng' },
    { id: 4, turbidityValue: 3.0, timestamp: '2024-10-21 10:45', location: 'Hà Nội' },
    { id: 5, turbidityValue: 2.5, timestamp: '2024-10-21 10:50', location: 'Hồ Chí Minh' },
    { id: 6, turbidityValue: 5.0, timestamp: '2024-10-21 10:55', location: 'Đà Nẵng' },
    { id: 7, turbidityValue: 3.7, timestamp: '2024-10-21 11:00', location: 'Hà Nội' },
    { id: 8, turbidityValue: 2.1, timestamp: '2024-10-21 11:05', location: 'Hồ Chí Minh' },
    { id: 9, turbidityValue: 4.8, timestamp: '2024-10-21 11:10', location: 'Đà Nẵng' },
    { id: 10, turbidityValue: 3.4, timestamp: '2024-10-21 11:15', location: 'Hà Nội' },
    { id: 11, turbidityValue: 2.9, timestamp: '2024-10-21 11:20', location: 'Hồ Chí Minh' },
    { id: 12, turbidityValue: 4.2, timestamp: '2024-10-21 11:25', location: 'Đà Nẵng' },
    { id: 13, turbidityValue: 3.1, timestamp: '2024-10-21 11:30', location: 'Hà Nội' },
    { id: 14, turbidityValue: 2.6, timestamp: '2024-10-21 11:35', location: 'Hồ Chí Minh' },
    { id: 15, turbidityValue: 4.5, timestamp: '2024-10-21 11:40', location: 'Đà Nẵng' },
];

function TurbidityTable() {
    const [data, setData] = useState(initialData);
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('turbidityValue');

    const getRandomTurbidityValue = () => {
        return (Math.random() * 10).toFixed(2); // Random value between 0 and 10
    };

    const fetchDataFake = () => {
        const currentTime = new Date();
        const formattedTime = currentTime.toISOString().slice(0, 19).replace('T', ' ');

        const updatedData = data.map(item => ({
            ...item,
            turbidityValue: getRandomTurbidityValue(),
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
        if (value <= 3) return 'lightgreen';  // "Tốt"
        if (value > 3 && value <= 5) return 'lightyellow';  // "Trung bình"
        return 'lightcoral';  // "Hại"
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
        <div style={{ textAlign: 'center' }}>
            <Typography variant="h4" align="left" style={{ marginLeft: '20px' }}>Dữ liệu độ đục</Typography>
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
                                    active={orderBy === 'turbidityValue'}
                                    direction={orderBy === 'turbidityValue' ? (order === '' ? 'asc' : order) : 'asc'}
                                    onClick={() => handleSort('turbidityValue')}
                                    IconComponent={() => {
                                        if (order === '') {
                                            return <ArrowForwardIcon />;
                                        }
                                        return order === 'asc' ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />;
                                    }}
                                >
                                    Turbidity Value (NTU)
                                </TableSortLabel>
                            </TableCell>
                            <TableCell align="center">Measurement Timestamp</TableCell>
                            <TableCell align="center">Location</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sortedData.map((row, index) => (
                            <TableRow key={row.id} style={{ backgroundColor: getBackgroundColor(row.turbidityValue) }}>
                                <TableCell align="center">{index + 1}</TableCell>
                                <TableCell align="center">{row.turbidityValue}</TableCell>
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

export default TurbidityTable;
