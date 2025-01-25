import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import {
  countryChart,
  languageChart,
  chartOptions,
} from "../../helpers/insights";
import { MoviesData } from "../../api/api";
ChartJS.register(ArcElement, Tooltip, Legend);

const MoviesInsights = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadMovies = async () => {
      const response = await MoviesData();
      if (response.status === 200) {
        setData(response.data);
      } else {
        setError(response.message || "Failed to load data");
      }
    };

    loadMovies();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  const countryChartData = countryChart(data);
  const languageChartData = languageChart(data);

  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.label}: ${context.raw} movies`;
          },
        },
      },
      legend: {
        position: "top",
      },
    },
  };

  return (
    <div className="insights-container row">
      <div className="chart-container col-12 col-md-6 mb-3">
        <Pie data={countryChartData} options={chartOptions} />
      </div>
      <div className="chart-container col-12 col-md-6 mb-3 d-none d-md-block">
        <Pie data={languageChartData} options={chartOptions} />
      </div>
    </div>
  );
};
export default MoviesInsights;
