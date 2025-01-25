export const getTopMovies = (movies) => {
  return [...movies]
    .map((movie) => ({
      ...movie,
      score: calculateScore(movie),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);
};

export const calculateScore = (movie) => {
  const imdbWeight = 0.5;
  const nominationsWeight = 0.3;
  const winsWeight = 0.2;

  return (
    movie.imdb_rating * imdbWeight +
    movie.oscar_nominations * nominationsWeight +
    movie.oscar_winning * winsWeight
  );
};
