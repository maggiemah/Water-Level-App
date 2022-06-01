import React from "react";
import { Bar } from "react-chartjs-2";
import Chart from 'chart.js/auto';

let options = {
  legend: {
    display: false
  },
  maintainAspectRatio: false,
  scales: {
    x: {
      categoryPercentage: 50,
      stacked: true,
      grid: {
        display: false,
        borderWidth: 2,
      },
      ticks: {
        autoSkip: false,
        maxRotation: 60,
        minRotation: 60
      },
    },
    y: {
      grid: {
        display: false,
        borderWidth: 2,
        // color: 'black',
      },
      ticks: {
        stepSize: 10,
      },
      min: 0,
      suggestedMax: 60,
    }
  },
};

function BarChart({ chartData }) {
  //console.log(chartData);
  return <Bar data={chartData} options={options} />;
}

export default BarChart;