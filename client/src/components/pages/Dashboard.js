import React from 'react';
import '../../App.css'
import NavBar from '../NavBar';

function Dashboard() {

  return (
    <div>
      <NavBar />
      <div className="dashboard-page row">
        <h1>Dashboard</h1>
      </div>
    </div>
  );
}

export default Dashboard;