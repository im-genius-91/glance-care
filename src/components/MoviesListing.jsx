import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { Modal, Button, Spinner, Alert, Form } from "react-bootstrap";
import { DatePicker, Space } from "antd";
import { fetchMovies } from "../services/api";
import './MoviesListing.css';
const { RangePicker } = DatePicker;


const MoviesTable = () => {
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
        backgroundColor: "#828282", 
        color: "#ffffff", 
        fontWeight: "bold", 
      },
    },
  };

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
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setActiveMovie(null);
  };

  const columns = [
    {
      name: "Title",
      selector: (row) => row.title,
      sortable: true,
      width: "300px",
      cell: (row) => (
        <span onClick={() => handleRowClick(row)} className="clickable-title">
          {row.title}
        </span>
      ),
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
      name: "Year",
      selector: (row) => row.year,
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

  const genres = Array.from(new Set(movies.flatMap((movie) => movie.genre)));
  const countries = Array.from(new Set(movies.flatMap((movie) => movie.country)));

  const filteredMovies = movies.filter((movie) => {
    const isMatchingSearch =
      movie.title.toLowerCase().includes(searchText.toLowerCase()) ||
      movie.genre.join(", ").toLowerCase().includes(searchText.toLowerCase()) ||
      movie.country.join(", ").toLowerCase().includes(searchText.toLowerCase()) ||
      movie.imdb_rating.toString().includes(searchText) ||
      movie.oscar_nominations.toString().includes(searchText) ||
      movie.cast.join(", ").toLowerCase().includes(searchText.toLowerCase()) ||
      movie.year.toString().includes(searchText);

    const isMatchingGenre = selectedGenre ? movie.genre.includes(selectedGenre) : true;
    const isMatchingCountry = selectedCountry ? movie.country.includes(selectedCountry) : true;

    const isMatchingOscarRange =
      selectedOscarRange === ""
        ? true
        : selectedOscarRange === "0-5"
          ? movie.oscar_nominations >= 0 && movie.oscar_nominations <= 5
          : selectedOscarRange === "5-10"
            ? movie.oscar_nominations > 5 && movie.oscar_nominations <= 10
            : selectedOscarRange === "10+"
              ? movie.oscar_nominations > 10
              : true;

    const isMatchingImdbRange =
      selectedImdbRange === ""
        ? true
        : selectedImdbRange === "1-5"
          ? movie.imdb_rating >= 1 && movie.imdb_rating <= 5
          : selectedImdbRange === "5-8"
            ? movie.imdb_rating > 5 && movie.imdb_rating <= 8
            : selectedImdbRange === "8-10"
              ? movie.imdb_rating > 8 && movie.imdb_rating <= 10
              : true;
    const isMatchingDateRange =
      (startDate ? new Date(movie.year) >= startDate : true) && (endDate ? new Date(movie.year) <= endDate : true);

    return (
      isMatchingSearch &&
      isMatchingGenre &&
      isMatchingCountry &&
      isMatchingOscarRange &&
      isMatchingImdbRange &&
      isMatchingDateRange
    );
  });

  return (
    <div className="container mt-5 container-border ">
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
            <option value="">Nominations</option>
            <option value="0-5">⭐ 0 to 5 Nominations</option>
            <option value="5-10">🏆 5 to 10 Nominations</option>
            <option value="10+">👑 10 or More Nominations</option>
          </Form.Select>
        </div>

        <div className="col-lg-2 col-md-3 col-sm-4 col-12 mb-3">
          <Form.Select
            size="sm"
            value={selectedImdbRange}
            onChange={(e) => setSelectedImdbRange(e.target.value)}
          >
            <option value="">Rating</option>
            <option value="1-5">⭐ 1 to 5  &nbsp;&nbsp; IMDB Rating</option>
            <option value="5-8">⭐ 5 to 8   &nbsp;&nbsp; IMDB Rating</option>
            <option value="8-10">⭐ 8 to 10 &nbsp;IMDB Rating</option>
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
          onHide={handleCloseModal}
          centered
          size="lg"
          className="custom-modal-movies"
        >
          <Modal.Header className="bg-dark text-white">
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



