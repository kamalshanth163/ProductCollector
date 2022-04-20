import React, { useState } from 'react';
import '../styles/Dashboard.css'
import NavBar from '../components/NavBar';

function Dashboard() {

  const userType = localStorage.getItem("user-type");
  const userId = localStorage.getItem("user-id");
  const userName = localStorage.getItem("user-name");

  const entity = {
    title: "Title",
    data: [],
    isReport: true
  }
  const [data, setData] = useState([entity]);

  return (
    <div>
      <NavBar />
      <div className="dashboard-page row">
        <div className="container">

          <div className="row analytics">
            <h1>Analytics</h1>
            { data.map((i) => {
              return (
                <div className="col box">
                  <h2>{i.title}</h2>
                  <span>{i.data.length}</span>
                </div>
              )
            })}           
          </div>

          <div className="row reports">
            <h1>Reports</h1>
            { data.map((i) => {
              return (
                <div className="col box">
                  <span>{i.title}</span>
                </div>
              )
            })}         
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;