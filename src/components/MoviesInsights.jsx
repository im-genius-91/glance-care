import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import { fetchMovies } from "../services/api";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);

const MoviesInsights = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const movies = await fetchMovies(); 
        setData(movies);
      } catch (err) {
        setError("Failed to load data");
      } finally {
      }
    };

    loadMovies();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  const countryCounts = data.reduce((acc, movie) => {
    movie.country.forEach((country) => {
      acc[country] = (acc[country] || 0) + 1;
    });
    return acc;
}, {});

  const languageCounts = data.reduce((acc, movie) => {
    movie.language.forEach((language) => {
      acc[language] = (acc[language] || 0) + 1;
    });
    return acc;
  }, {});

  const countryChartData = {
    labels: Object.keys(countryCounts),
    datasets: [
      {
        label: "Movies by Country",
        data: Object.values(countryCounts),
        backgroundColor: [
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 159, 64, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 99, 132, 0.6)",
          "rgba(255, 205, 86, 0.6)"
        ], 
        borderColor: "rgba(255, 255, 255, 1)",
        borderWidth: 1
      }
    ]
  };
  const languageChartData = {
    labels: Object.keys(languageCounts),
    datasets: [
      {
        label: "Movies by Language",
        data: Object.values(languageCounts),
        backgroundColor: [
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 159, 64, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 99, 132, 0.6)",
          "rgba(255, 205, 86, 0.6)"
        ], 
        borderColor: "rgba(255, 255, 255, 1)",
        borderWidth: 1
      }
    ]
  };
  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.label}: ${context.raw} movies`;
          }
        }
      },
      legend: {
        position: "top"
      }
    }
  };
  return (
    <div className="insights-container">
      <div className="chart-container">
        <Pie data={countryChartData} options={options} />
      </div>
      <div className="chart-container">
        <Pie data={languageChartData} options={options} />
      </div>
    </div>
  );
};

export default MoviesInsights;
