import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { statisticsChart, statisticsOptions } from "../../helpers/statistics";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { MoviesData } from "../../api/api";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const MoviesStatistics = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadMovies = async () => {
      const response = await MoviesData();
      if (response.status === 200) {
        setData(response.data);
      } else {
        setError(response.message || "An error occurred");
      }
    };
    loadMovies();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }
  const { chartData, titles } = statisticsChart(data);
  const options = statisticsOptions(chartData, titles);

  return (
    <div className="chart-container">
      <Bar
        key={JSON.stringify(chartData)}
        data={chartData}
        options={options}
        className="responsive-chart"
      />
    </div>
  );
};
export default MoviesStatistics;
