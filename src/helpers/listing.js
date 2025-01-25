export const filterMovies = (
  movies,
  searchText,
  selectedGenre,
  selectedCountry,
  selectedOscarRange,
  selectedImdbRange,
  startDate,
  endDate
) => {
  return movies.filter((movie) => {
    const isMatchingSearch =
      movie.title.toLowerCase().includes(searchText.toLowerCase()) ||
      movie.genre.join(", ").toLowerCase().includes(searchText.toLowerCase()) ||
      movie.country
        .join(", ")
        .toLowerCase()
        .includes(searchText.toLowerCase()) ||
      movie.imdb_rating.toString().includes(searchText) ||
      movie.oscar_nominations.toString().includes(searchText) ||
      movie.cast.join(", ").toLowerCase().includes(searchText.toLowerCase()) ||
      movie.year.toString().includes(searchText);

    const isMatchingGenre = selectedGenre
      ? movie.genre.includes(selectedGenre)
      : true;
    const isMatchingCountry = selectedCountry
      ? movie.country.includes(selectedCountry)
      : true;

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
      (startDate ? new Date(movie.year) >= startDate : true) &&
      (endDate ? new Date(movie.year) <= endDate : true);

    return (
      isMatchingSearch &&
      isMatchingGenre &&
      isMatchingCountry &&
      isMatchingOscarRange &&
      isMatchingImdbRange &&
      isMatchingDateRange
    );
  });
};

export const getGenres = (movies) => {
  return Array.from(new Set(movies.flatMap((movie) => movie.genre)));
};

export const getCountries = (movies) => {
  return Array.from(new Set(movies.flatMap((movie) => movie.country)));
};

export const getColumns = (showMovie) => [
  {
    name: "Title",
    selector: (row) => row.title,
    sortable: true,
    width: "300px",
    cell: (row) => (
      <span onClick={() => showMovie(row)} className="clickable-title">
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
