import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title);

function GraphView({ data }) {
  if (!data.length) return <p>Loading graph...</p>;

  const labels = data.map((item, i) => item["Name"] || `Item ${i + 1}`);
  const values = data.map(item => item["Value"] || 0); // Change keys as per your Excel

  const chartData = {
    labels,
    datasets: [{
      label: 'Sample Values',
      data: values,
      backgroundColor: 'rgba(54, 162, 235, 0.6)'
    }]
  };

  return (
    <div>
      <h4>Bar Graph</h4>
      <Bar data={chartData} />
    </div>
  );
}

export default GraphView;
