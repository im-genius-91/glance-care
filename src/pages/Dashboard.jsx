import React from "react";
import MoviesListing from "../components/Listing/MoviesListing";
import MoviesStatistics from "../components/Statistics/MoviesStatistics";
import MoviesInsights from "../components/Insights/MoviesInsights";
import MoviesLeaderboard from "../components/Leaderboard/MoviesLeaderBoard";
import MoviesGenre from "../components/Genre/MoviesGenre";
import MoviesNavbar from "../components/Navbar/MoviesNavbar";
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <div className="p-3">
      <MoviesNavbar />
      <MoviesLeaderboard />
      <div className="row p-3">
        <div className="col-12 col-md-4 mb-3 chart-column">
          <div className="chart-container border rounded p-3">
            <MoviesStatistics />
          </div>
        </div>
        <div className="col-12 col-md-4 mb-3 chart-column">
          <div className="chart-container border rounded p-3">
            <MoviesInsights />
          </div>
        </div>
        <div className="col-12 col-md-4 mb-3 chart-column">
          <div className="chart-container border rounded p-3">
            <MoviesGenre />
          </div>
        </div>
      </div>
      <MoviesListing />
    </div>
  );
};
export default Dashboard;
