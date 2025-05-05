import React, { useEffect, useState } from 'react';
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import axios from 'axios';
import { findWithFiltersAnalytics } from '../api/transactions/transactionRequest.ts';



export const Analytics = () => {
  const [chartData, setChartData] = useState([]);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const refreshAnalytics = async () => {
      const response = await findWithFiltersAnalytics({});
      if (response) {
        setChartData(response);

        // Автоматически получим список категорий из ключей первого объекта
        const first = response[0];
        if (first) {
          const keys = Object.keys(first).filter(k => k !== 'date');
          setCategories(keys);
        }
      }
    };

    refreshAnalytics();
  }, []);

  return (
    <main className="main">
      <h2 style={{ textAlign: 'center' }}>Spending Over Time by Category</h2>

      <div className="graph">
        <ResponsiveContainer aspect={2}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis label={{ value: 'Amount ($)', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Legend />
            {categories.map((cat, index) => (
              <Line
                key={cat}
                type="monotone"
                dataKey={cat}
                stroke={['#8884d8', '#82ca9d', '#ffc658', '#ff7300'][index % 4]}
                strokeWidth={3}
                dot={{ r: 5 }}
                activeDot={{ r: 7 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </main>
  );
};