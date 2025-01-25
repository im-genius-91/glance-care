import React from "react";
import MoviesListing from '../components/MoviesListing'; 
import MoviesStatistics from "../components/MoviesStatistics";
import MoviesInsights from "../components/MoviesInsights";
import MoviesLeaderboard from "../components/MoviesLeaderBoard";
import MoviesGenre from "../components/MoviesGenre";
import  MoviesNavbar  from "../components/MoviesNavbar";
import { Container, Row, Col } from "react-bootstrap";
import './Dashboard.css'; 

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
