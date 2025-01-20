import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import ApiService from '../../service/ApiService';

const RevenueTrendsChart = ({ startDate, endDate }) => {
    const [revenueData, setRevenueData] = useState([]);

    useEffect(() => {
        fetchRevenueTrends();
    }, [startDate, endDate]);

    const fetchRevenueTrends = async () => {
        try {
            const data = await ApiService.fetchRevenueTrends(startDate, endDate);
            const formattedData = data.map(item => ({
                date: new Date(item[0]).toLocaleString(),
                revenue: item[1]
            }));
            setRevenueData(formattedData);
        } catch (error) {
            console.error("Failed to fetch revenue trends:", error);
        }
    };

    return (
        <ResponsiveContainer width="100%" height={400}>
            <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="revenue" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default RevenueTrendsChart;