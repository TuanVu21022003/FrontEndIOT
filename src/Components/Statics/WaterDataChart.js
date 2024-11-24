import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Box, Typography, TextField } from '@mui/material';
import { MARGIN_HEADING } from '../../Assets/Constants/constants';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const WaterDataChart = () => {
    const [waterQualityData, setWaterQualityData] = useState([]);
    const [selectedDate, setSelectedDate] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDataFake();
    }, [selectedDate]);

    const fetchDataFake = () => {
        const data = [];
        const selected = selectedDate ? new Date(selectedDate) : new Date();

        for (let i = 0; i < 24; i++) {
            const hour = new Date(selected.setHours(i, 0, 0, 0)); // Set each hour of the day
            const timeString = hour.toISOString().slice(11, 13); // Extract HH format for labels
            const turbidity = Math.random() * 100; // Random turbidity value
            const temperature = Math.random() * 35; // Random temperature
            const ec = Math.random() * 2000; // Random EC value
            data.push({ time: timeString, turbidity, temperature, ec });
        }

        setWaterQualityData(data);
        setLoading(false);
    };

    const chartData = {
        labels: waterQualityData.map(data => `${data.time}:00`), // Display time in HH:00 format
        datasets: [
            {
                label: 'Turbidity (NTU)',
                data: waterQualityData.map(data => data.turbidity),
                borderColor: 'rgba(75, 192, 192, 1)',
                fill: false,
                tension: 0.1,
            },
            {
                label: 'Temperature (°C)',
                data: waterQualityData.map(data => data.temperature),
                borderColor: 'rgba(255, 99, 132, 1)',
                fill: false,
                tension: 0.1,
            },
            {
                label: 'EC (µS/cm)',
                data: waterQualityData.map(data => data.ec),
                borderColor: 'rgba(54, 162, 235, 1)',
                fill: false,
                tension: 0.1,
            },
        ],
    };

    const handleDateChange = (e) => {
        setSelectedDate(e.target.value);
    };

    if (loading) return <div>Loading...</div>;

    return (
        <Box sx={{ width: '100%', height: '80vh'}}>
            <Typography variant="h4" align="left" style={{ marginLeft: '20px', marginTop : MARGIN_HEADING }}>
                Biểu đồ dữ liệu nước
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 3 }}>
                <TextField
                    label="Select Date"
                    type="date"
                    value={selectedDate}
                    onChange={handleDateChange}
                    InputLabelProps={{ shrink: true }}
                    sx={{ mr: 2 }}
                />
            </Box>
            <Box sx={{ width: '90%', height: '80%', mx: 'auto' }}>
                <Line data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
            </Box>
        </Box>
    );
};

export default WaterDataChart;