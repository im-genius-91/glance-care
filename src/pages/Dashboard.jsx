import React from "react";
import MoviesTable from '../components/MoviesTable'; 
import OscarStatistics from "../components/OscarStatistics";

const Dashboard = () => {
  return (
    <div>
      <OscarStatistics />
      <MoviesTable />
    </div>
  );
};

export default Dashboard;
