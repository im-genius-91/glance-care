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
import { fetchMovies } from "../../api/api";

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
      try {
        const movies = await fetchMovies();
        setData(movies);
      } catch (err) {
        setError("Failed to load data");
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
