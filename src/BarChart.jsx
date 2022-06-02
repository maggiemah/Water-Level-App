import React from "react";
import { Bar } from "react-chartjs-2";
import Chart from 'chart.js/auto';

let options = {
  plugins: {
    legend: {
        display: false
    },
  },
  maintainAspectRatio: false,
  scales: {          
    x: {
      categoryPercentage: 50,
      stacked: true,
      grid: {
        display: false,
        borderWidth: 0.5,
        borderColor: 'black',
      },
      ticks: {
        autoSkip: false,
        maxRotation: 60,
        minRotation: 60,
        color: 'black',
      },
    },
    y: {
      grid: {
        display: false,
        borderWidth: 0.5,
        borderColor: 'black',
      },
      ticks: {
        stepSize: 10,
        color: 'black',
        align: 'start',
        callback: (value, index, values) => (index == 0) ? undefined : value
      },
      min: 3,
      suggestedMax: 60,
    },
  },
};

function BarChart({ chartData }) {
  return <Bar data={chartData} options={options} />;
}

export default BarChart;