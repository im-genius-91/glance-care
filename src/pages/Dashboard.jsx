import React from "react";
import MoviesListing from '../components/MoviesListing'; 
import MoviesStatistics from "../components/MoviesStatistics";
import MoviesInsights from "../components/MoviesInsights";
import MoviesLeaderboard from "../components/MoviesLeaderBoard";
import MoviesGenre from "../components/MoviesGenre";

const Dashboard = () => {
  return (
    <div>
      <MoviesLeaderboard />
      <MoviesStatistics />
      <MoviesInsights />
      <MoviesGenre />
      <MoviesListing />
    </div>
  );
};

export default Dashboard;