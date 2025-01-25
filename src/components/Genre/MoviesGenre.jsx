import React, { useState, useEffect } from "react";
import { Chart } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Container } from "react-bootstrap";
import { genreChart } from "../../helpers/genre";
import { fetchMovies } from "../../api/api";
ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const MoviesGenre = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const movies = await fetchMovies();
        const data = genreChart(movies);
        setChartData(data);
      } catch (err) {
        console.error("Failed to load movies", err);
      }
    };
    loadMovies();
  }, []);

  return (
    <Container className="p-1">
      <div className="d-flex justify-content-center">
        {chartData ? (
          <Chart
            type="line"
            data={chartData}
            options={{
              responsive: true,
              scales: {
                x: {
                  title: {
                    display: true,
                    text: "Year",
                  },
                },
                y: {
                  title: {
                    display: true,
                    text: "Movies Count",
                  },
                },
              },
              plugins: {
                tooltip: {
                  callbacks: {
                    label: (context) =>
                      `${context.dataset.label}: ${context.raw} movies in ${context.label}`,
                  },
                },
              },
            }}
          />
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </Container>
  );
};
export default MoviesGenre;
