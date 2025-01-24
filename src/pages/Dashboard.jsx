import React from "react";
import MoviesListing from '../components/MoviesListing'; 
import MoviesStatistics from "../components/MoviesStatistics";
import MoviesInsights from "../components/MoviesInsights";
import MoviesLeaderboard from "../components/MoviesLeaderBoard";

const Dashboard = () => {
  return (
    <div>
      <MoviesLeaderboard />
      <MoviesStatistics />
      <MoviesInsights />
      <MoviesListing />
    </div>
  );
};

export default Dashboard;