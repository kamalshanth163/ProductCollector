import React from 'react';
import '../../styles/Dashboard.css'
import NavBar from '../NavBar';

function Dashboard() {

  return (
    <div>
      <NavBar />
      <div className="dashboard-page row">
        {/* <h1>Dashboard</h1> */}
        
        <div className="container">

          <div className="row analytics">
            <h1>Analytics</h1>
            <div className="col box">
              <h2>Products</h2>
              <span>16</span>
            </div>
            <div className="col box">
              <h2>Orders</h2>
              <span>16</span>
            </div>
            <div className="col box">
              <h2>Collectors</h2>
              <span>16</span>
            </div>
            <div className="col box">
              <h2>Holders</h2>
              <span>16</span>
            </div>
          </div>

          <div className="row reports">
            <h1>Reports</h1>
            <div className="col box">
              <span>Generate Products Report</span>
            </div>
            <div className="col box">
              <span>Generate Orders Report</span>
            </div>
            <div className="col box">
              <span>Generate Collectors Report</span>
            </div>
            <div className="col box">
              <span>Generate Holders Report</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;