import React, { useState, useEffect } from 'react';
import { fetchMovies } from "../services/api";
import { Chart } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';
import { Container, Row, Col, Card } from 'react-bootstrap';
ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

const MoviesGenre = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const movies = await fetchMovies();
        generateLineChartData(movies);
      } catch (err) {
        console.error("Failed to load movies", err);
      }
    };
    loadMovies();
  }, []);

  const generateLineChartData = (movies) => {
    const genreCounts = {};
    const years = [];

    movies.forEach(({ genre, year }) => {
      genre.forEach((g) => {
        genreCounts[g] = genreCounts[g] || {};
        genreCounts[g][year] = (genreCounts[g][year] || 0) + 1;
      });
      if (!years.includes(year)) years.push(year);
    });
    years.sort(); 
    const genres = Object.keys(genreCounts);

    const datasets = genres.map((genre) => ({
      label: genre,
      data: years.map((year) => genreCounts[genre][year] || 0),
      borderColor: getColorForGenre(genre),
      fill: false,
      tension: 0.4,
      borderWidth: 2,
    }));
    setChartData({
      labels: years,
      datasets,
    });
  };
  const getColorForGenre = (genre) => {
    const normalizedGenre = genre.trim().toLowerCase();
  
    const colors = {
      action: 'rgba(255, 99, 132, 1)',
      drama: 'rgba(54, 162, 235, 1)',
      adventure: 'rgba(75, 192, 192, 1)',
      crime: 'rgba(153, 102, 255, 1)',
      romance: 'rgba(255, 159, 64, 1)',
      'sci-fi': 'rgba(86, 208, 65, 0.81)',
    };
    return colors[normalizedGenre] || 'rgba(0, 0, 0, 1)';
  };
  return (
    <Container>
      <Row>
        <Col>
          <Card className="mb-4">
            <Card.Body>
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
                            text: 'Year',
                          },
                        },
                        y: {
                          title: {
                            display: true,
                            text: 'Movies Count',
                          },
                        },
                      },
                      plugins: {
                        tooltip: {
                          callbacks: {
                            label: (context) => `${context.dataset.label}: ${context.raw} movies in ${context.label}`,
                          },
                        },
                      },
                    }}
                  />
                ) : (
                  <div>Loading...</div>
                )}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
export default MoviesGenre;
