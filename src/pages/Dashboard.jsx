import React from "react";
import MoviesListing from '../components/MoviesListing'; 
import MoviesStatistics from "../components/MoviesStatistics";
import MoviesInsights from "../components/MoviesInsights";
import MoviesLeaderboard from "../components/MoviesLeaderBoard";
import MoviesGenre from "../components/MoviesGenre";
import  MoviesNavbar  from "../components/MoviesNavbar";

const Dashboard = () => {
  return (
    <div>
      <MoviesNavbar />
      <MoviesLeaderboard />
      <MoviesStatistics />
      <MoviesInsights />
      <MoviesGenre />
      <MoviesListing />
    </div>
  );
};

export default Dashboard;