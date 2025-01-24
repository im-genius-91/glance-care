import React from "react";
import MoviesTable from '../components/MoviesTable'; 
import MoviesStatistics from "../components/MoviesStatistics";
import MoviesInsights from "../components/MoviesInsights";

const Dashboard = () => {
  return (
    <div>
      <MoviesStatistics />
      <MoviesInsights />
      <MoviesTable />
    </div>
  );
};

export default Dashboard;
