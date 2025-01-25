import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { Modal, Button, Spinner, Alert, Form } from "react-bootstrap";
import {
  FaFilm,
  FaTheaterMasks,
  FaGlobe,
  FaCalendarAlt,
  FaAward,
  FaMedal,
  FaStar,
  FaTrophy,
  FaUsers,
} from "react-icons/fa";
import { DatePicker, Space } from "antd";
import {
  filterMovies,
  getGenres,
  getCountries,
  getColumns,
} from "../../helpers/listing";
import { MoviesData } from "../../api/api";
import "./MoviesListing.css";
const { RangePicker } = DatePicker;

const MoviesListing = () => {
  const [movies, setMovies] = useState([]);
  const [activeMovie, setActiveMovie] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedOscarRange, setSelectedOscarRange] = useState("");
  const [selectedImdbRange, setSelectedImdbRange] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const customStyles = {
    headCells: {
      style: {
        backgroundColor: "#e3e3e3",
        color: "black",
        fontWeight: "bold",
      },
    },
  };

  useEffect(() => {
    const loadMovies = async () => {
      setIsLoading(true);
      try {
        const response = await MoviesData();
        if (response.status === 200) {
          setMovies(response.data);
        } else {
          setError(response.message || "Failed to load data");
        }
      } catch (err) {
        setError("An error occurred while loading the data.");
      } finally {
        setIsLoading(false);
      }
    };
    loadMovies();
  }, []);

  if (error) {
    return <div className="text-danger m-3">Error: {error}</div>;
  }

  const showMovie = (movie) => {
    setActiveMovie(movie);
    setIsModalOpen(true);
  };

  const CloseModal = () => {
    setIsModalOpen(false);
    setActiveMovie(null);
  };

  const genres = getGenres(movies);
  const countries = getCountries(movies);

  const filteredMovies = filterMovies(
    movies,
    searchText,
    selectedGenre,
    selectedCountry,
    selectedOscarRange,
    selectedImdbRange,
    startDate,
    endDate
  );
  const columns = getColumns(showMovie);

  return (
    <div className="container mt-2 container-border ">
      {isLoading && (
        <div className="position-absolute top-50 start-50 translate-middle">
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
      <div className="row mb-4 d-flex align-items-center mt-2">
        <div className="col-lg-2 col-md-3 col-sm-4 col-12 mb-3">
          <Form.Group controlId="search" className="mb-0">
            <Form.Control
              size="sm"
              type="text"
              placeholder="Search"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </Form.Group>
        </div>

        <div className="col-lg-2 col-md-3 col-sm-4 col-12 mb-3">
          <Form.Select
            size="sm"
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
          >
            <option value="">Genre</option>
            {genres.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </Form.Select>
        </div>

        <div className="col-lg-2 col-md-3 col-sm-4 col-12 mb-3">
          <Form.Select
            size="sm"
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
          >
            <option value="">Country</option>
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </Form.Select>
        </div>

        <div className="col-lg-2 col-md-3 col-sm-4 col-12 mb-3">
          <Form.Select
            size="sm"
            value={selectedOscarRange}
            onChange={(e) => setSelectedOscarRange(e.target.value)}
          >
            <option value="">
              {" "}
              <FaTrophy className="me-2" /> Nominations
            </option>
            <option value="0-5"> 0 to 5 Nominations</option>
            <option value="5-10"> 5 to 10 Nominations</option>
            <option value="10+"> 10 or More Nominations</option>
          </Form.Select>
        </div>

        <div className="col-lg-2 col-md-3 col-sm-4 col-12 mb-3">
          <Form.Select
            size="sm"
            value={selectedImdbRange}
            onChange={(e) => setSelectedImdbRange(e.target.value)}
          >
            <option value="">Rating</option>
            <option value="1-5"> 1 to 5 &nbsp;&nbsp; IMDB Rating</option>
            <option value="5-8"> 5 to 8 &nbsp;&nbsp; IMDB Rating</option>
            <option value="8-10"> 8 to 10 &nbsp;IMDB Rating</option>
          </Form.Select>
        </div>

        <div className="col-lg-2 col-md-3 col-sm-4 col-12 mb-3">
          <Form.Group controlId="dateRange" className="mb-0">
            <Space direction="horizontal" size={8}>
              <RangePicker
                picker="year"
                size="small"
                placeholder={["From", "To"]}
                onChange={(dates) => {
                  setStartDate(dates ? dates[0] : null);
                  setEndDate(dates ? dates[1] : null);
                }}
                format="YYYY"
                className="custom-range-picker"
              />
            </Space>
          </Form.Group>
        </div>
      </div>
      {!isLoading && !error && (
        <DataTable
          columns={columns}
          data={filteredMovies}
          pagination={false}
          highlightOnHover
          customStyles={customStyles}
        />
      )}
      {activeMovie && (
        <Modal
          show={isModalOpen}
          onHide={CloseModal}
          centered
          size="lg"
          className="custom-modal-movies"
        >
          <Modal.Header className="bg-dark text-white">
            <Modal.Title className="w-100 text-center">
              <FaFilm className="me-2" />
              {activeMovie.title}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div className="col-md-6">
                <div className="movie-details">
                  <p className="movie-detail">
                    <strong className="detail-title">
                      <FaTheaterMasks className="me-2" /> Genre:
                    </strong>
                    <span className="detail-content">
                      {activeMovie.genre.join(", ")}
                    </span>
                  </p>
                  <p className="movie-detail">
                    <strong className="detail-title">
                      <FaGlobe className="me-2" /> Country:
                    </strong>
                    <span className="detail-content">
                      {activeMovie.country.join(", ")}
                    </span>
                  </p>
                  <p className="movie-detail">
                    <strong className="detail-title">
                      <FaCalendarAlt className="me-2" /> Release Year:
                    </strong>
                    <span className="detail-content">{activeMovie.year}</span>
                  </p>
                  <p className="movie-detail">
                    <strong className="detail-title">
                      <FaStar className="me-2" /> IMDB Rating:
                    </strong>
                    <span className="detail-content">
                      {activeMovie.imdb_rating}
                    </span>
                  </p>
                  <p className="movie-detail">
                    <strong className="detail-title">
                      <FaUsers className="me-2" /> Cast:
                    </strong>
                    <span className="detail-content">
                      {activeMovie.cast.join(", ")}
                    </span>
                  </p>
                </div>
              </div>

              <div className="col-md-6">
                <div className="movie-details">
                  <p className="movie-detail">
                    <strong className="detail-title">
                      <FaTrophy className="me-2" /> Oscar Nominations:
                    </strong>
                    <span className="detail-content">
                      {activeMovie.oscar_nominations}
                    </span>
                  </p>
                  <p className="movie-detail">
                    <strong className="detail-title">
                      <FaAward className="me-2" /> Oscar Winning List:
                    </strong>
                    <span className="detail-content">
                      {activeMovie.oscar_winning_list.join(", ")}
                    </span>
                  </p>
                  <p className="movie-detail">
                    <strong className="detail-title">
                      <FaMedal className="me-2" /> Oscar Nominations List:
                    </strong>
                    <span className="detail-content">
                      {activeMovie.oscar_nominations_list.join(", ")}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="primary" onClick={CloseModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};
export default MoviesListing;
