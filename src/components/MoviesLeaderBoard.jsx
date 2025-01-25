import React, { useState, useEffect } from "react";
import { fetchMovies } from "../services/api";
import { Card, ProgressBar, Table } from "react-bootstrap";
import { FaFilm } from "react-icons/fa";

const MoviesLeaderBoard = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const moviesData = await fetchMovies(); 
        setMovies(moviesData);
      } catch (err) {
        setError("Failed to load data");
      }
    };
    loadMovies();
  }, []);

  if (error) return <div>Error: {error}</div>;

  const calculateScore = (movie) => {
    const imdbWeight = 0.5;
    const nominationsWeight = 0.3;
    const winsWeight = 0.2;
    return (
      movie.imdb_rating * imdbWeight +
      movie.oscar_nominations * nominationsWeight +
      movie.oscar_winning * winsWeight
    );
  };

  const topMovies = [...movies]
    .map((movie) => ({
      ...movie,
      score: calculateScore(movie),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);

  return (
    <div className="m-3">
      <Card className="mb-4 shadow-sm">
        <Card.Body>
          <Table responsive className="table-borderless">
            <thead>
              <tr className="text-secondary">
                <th className="w-25">Top Movies</th>
                <th className="d-none d-md-table-cell w-12">Top Actors</th>
                <th className="w-50">Aggregate Score</th>
                <th className="d-none d-md-table-cell w-12">Ratings</th>
                <th className="d-none d-md-table-cell w-12">Oscars</th>
              </tr>
            </thead>
            <tbody>
              {topMovies.map((movie, index) => {
                const maxScore = 10;
                const progressPercentage = (movie.score / maxScore) * 100;
                const topActor = movie.cast?.[0] || "N/A"; 

                return (
                  <tr
                    key={index}
                    className="align-middle border-bottom border-light"
                    style={{ transition: "background-color 0.3s" }}
                  >
                    <td>
                        <FaFilm className="me-2 text-primary" size={16} />
                        {movie.title}
                    </td>
                    <td className="d-none d-md-table-cell">{topActor}</td>
                    <td>
                      <ProgressBar
                        now={progressPercentage}
                        label={`${progressPercentage.toFixed(0)}%`}
                        className="me-2"
                        variant="success"
                        style={{ height: "1rem" }}
                      />
                    </td>
                    <td className="d-none d-md-table-cell">
                      <span className="badge bg-info text-dark">
                        {movie.imdb_rating}
                      </span>
                    </td>
                    <td className="d-none d-md-table-cell">
                      <span className="badge bg-warning text-dark">
                        {movie.oscar_winning}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </div>
  );
};
export default MoviesLeaderBoard;
