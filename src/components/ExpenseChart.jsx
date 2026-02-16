import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const ExpenseChart = ({ transactions }) => {
  const amounts = transactions.map(t => t.amount);
  
  const income = amounts
    .filter(item => item > 0)
    .reduce((acc, item) => (acc += item), 0);

  const expense = Math.abs(
    amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0)
  );

  const data = {
    labels: ['ဝင်ငွေ', 'ထွက်ငွေ'],
    datasets: [
      {
        label: 'ပမာဏ',
        data: [income, expense],
        backgroundColor: ['#2ecc71', '#e74c3c'],
        borderColor: ['#27ae60', '#c0392b'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div style={{ width: '250px', margin: '20px auto' }}>
      <Pie data={data} />
    </div>
  );
};

export default ExpenseChart;