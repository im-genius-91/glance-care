import moviesList from "../utils/movies.json";

export const MoviesData = async () => {
  try {
    return {
      status: 200,
      message: "Movies fetched successfully",
      data: moviesList,
    };
  } catch (error) {
    return {
      status: 500,
      message: "Failed to fetch movies",
      error: error.message,
    };
  }
};
