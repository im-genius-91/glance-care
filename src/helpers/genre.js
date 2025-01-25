export const genreChart = (movies) => {
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

  return {
    labels: years,
    datasets,
  };
};

const getColorForGenre = (genre) => {
  const normalizedGenre = genre.trim().toLowerCase();
  const colors = {
    action: "rgba(255, 99, 132, 1)",
    drama: "rgba(54, 162, 235, 1)",
    adventure: "rgba(75, 192, 192, 1)",
    crime: "rgba(153, 102, 255, 1)",
    "sci-fi": "rgba(86, 208, 65, 0.81)",
  };
  return colors[normalizedGenre] || "rgba(0, 0, 0, 1)";
};
