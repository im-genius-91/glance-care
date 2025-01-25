import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { fetchMovies } from "../services/api";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

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

  const years = data.map((movie) => movie.year);
  const nominations = data.map((movie) => movie.oscar_nominations);
  const wins = data.map((movie) => movie.oscar_winning);
  const titles = data.map((movie) => movie.title);

  const chartData = {
    labels: years,
    datasets: [
      {
        label: "Oscar Nominations",
        data: nominations,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
      {
        label: "Oscar Wins",
        data: wins,
        backgroundColor: "rgba(153, 102, 255, 0.6)",
        borderColor: "rgba(153, 102, 255, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            const datasetIndex = tooltipItem.datasetIndex;
            const dataIndex = tooltipItem.dataIndex;
            const datasetLabel = chartData.datasets[datasetIndex].label;
            const value = chartData.datasets[datasetIndex].data[dataIndex];
            const movieTitle = titles[dataIndex];
            return `${datasetLabel}: ${value} (Movie: ${movieTitle})`;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Year",
        },
        ticks: {
          display: true,
        },
      },
      y: {
        title: {
          display: true,
          text: "Count",
        },
        ticks: {
          display: true,
        },
      },
    },
  };

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
