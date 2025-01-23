import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { fetchMovies } from "../services/api";
import { Modal, Button, Spinner, Alert } from "react-bootstrap";
import "./MoviesTable.css";

const MoviesTable = () => {
  const [movies, setMovies] = useState([]);
  const [activeMovie, setActiveMovie] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        setIsLoading(true);
        const data = await fetchMovies();
        setMovies(data);
        setError(null);
      } catch (err) {
        setError("Failed to load movies. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    loadMovies();
  }, []);

  const handleRowClick = (movie) => {
    setActiveMovie(movie);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setActiveMovie(null);
  };

  const columns = [
    {
      name: "Title",
      selector: (row) => row.title,
      sortable: true,
      width: "350px",
      cell: (row) => (
        <span onClick={() => handleRowClick(row)} className="clickable-title">
          {row.title}
        </span>
      ),
    },
    {
      name: "Year",
      selector: (row) => row.year,
      sortable: true,
    },
    {
      name: "Genre",
      selector: (row) => row.genre.join(", "),
      sortable: true,
    },
    {
      name: "Country",
      selector: (row) => row.country.join(", "),
      sortable: true,
    },
    {
      name: "IMDB Rating",
      selector: (row) => row.imdb_rating,
      sortable: true,
    },
    {
      name: "Oscar Nominations",
      selector: (row) => row.oscar_nominations,
      sortable: true,
    },
    {
      name: "Cast",
      selector: (row) => row.cast.join(", "),
      sortable: true,
    },
  ];

  return (
    <div className="container mt-5">
      {isLoading && (
        <div className="text-center my-5">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}

      {error && (
        <Alert variant="danger" className="text-center">
          {error}
        </Alert>
      )}

      {!isLoading && !error && (
        <div>
          <DataTable
            columns={columns}
            data={movies}
            pagination={false}
            highlightOnHover
          />
        </div>
      )}

      {activeMovie && (
        <Modal
          show={isModalVisible}
          onHide={handleCloseModal}
          centered
          size="lg"
          className="custom-modal-movies"
        >
          <Modal.Header closeButton className="bg-dark text-white">
            <Modal.Title className="w-100 text-center">
              🎬 {activeMovie.title}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div className="col-md-8 offset-md-2">
                <div className="movie-details">
                  <p className="movie-detail">
                    <strong className="detail-title">🎭 Genre:</strong>
                    <span className="detail-content">{activeMovie.genre.join(", ")}</span>
                  </p>
                  <p className="movie-detail">
                    <strong className="detail-title">🌍 Country:</strong>
                    <span className="detail-content">{activeMovie.country.join(", ")}</span>
                  </p>
                  <p className="movie-detail">
                    <strong className="detail-title">📅 Release Year:</strong>
                    <span className="detail-content">{activeMovie.year}</span>
                  </p>
                  <p className="movie-detail">
                    <strong className="detail-title">⭐ IMDB Rating:</strong>
                    <span className="detail-content">{activeMovie.imdb_rating}</span>
                  </p>
                  <p className="movie-detail">
                    <strong className="detail-title">🏆 Oscar Nominations:</strong>
                    <span className="detail-content">{activeMovie.oscar_nominations}</span>
                  </p>
                  <p className="movie-detail">
                    <strong className="detail-title">👥 Cast:</strong>
                    <span className="detail-content">{activeMovie.cast.join(", ")}</span>
                  </p>
                  <p className="movie-detail">
                    <strong className="detail-title">🏅 Oscar Winning List:</strong>
                    <span className="detail-content">{activeMovie.oscar_winning_list.join(", ")}</span>
                  </p>
                  <p className="movie-detail">
                    <strong className="detail-title">🎖️ Oscar Nominations List:</strong>
                    <span className="detail-content">{activeMovie.oscar_nominations_list.join(", ")}</span>
                  </p>
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleCloseModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default MoviesTable;
