import React, { useEffect, useState } from 'react';
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { findWithFiltersAnalytics } from '../api/transactions/transactionRequest.ts';
import { Filters } from '../components/Filters.tsx';
import { TransactionFiltersDTO } from '../api/transactions/dto/transactionFilters.dto.ts';



export const Analytics = () => {
  const [chartData, setChartData] = useState([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [filters, setFilters] = useState<TransactionFiltersDTO>({});

  useEffect(() => {
    refreshAnalytics({});
  }, []);

  const refreshAnalytics = async (filters) => {
    const response = await findWithFiltersAnalytics(filters);
    if (response) {
      setChartData(response);

      const first = response[0];
      if (first) {
        const keys = Object.keys(first).filter(k => k !== 'date');
        setCategories(keys);
      }
    }
  };

  return (
    <main className="main">
      <h2 style={{ textAlign: 'center' }}>Spending Over Time by Category</h2>

      <div className="filter-panel">
        < Filters filters={filters} setFilters={setFilters} />
        <button className="accent-button" onClick={()=>refreshAnalytics(filters)}>
          Apply Filters
        </button>
      </div>

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
                stroke={['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#9966ff', '#ff99cc', '#99ff66', '#ff9966'][index % 8]}
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