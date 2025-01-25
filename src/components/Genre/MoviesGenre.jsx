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
import { MoviesData } from "../../api/api";
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
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadMovies = async () => {
      const response = await MoviesData();
      if (response.status === 200) {
        const data = genreChart(response.data);
        setChartData(data);
      } else {
        setError(response.message || "An error occurred while loading data");
      }
    };
    loadMovies();
  }, []);

  {
    error && <p className="text-danger">{error}</p>;
  }

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
