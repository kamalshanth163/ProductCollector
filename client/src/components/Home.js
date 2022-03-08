import React from 'react';
import { useHistory } from 'react-router-dom';
import "../App.css";

const Home = () => {
  const history = useHistory();

  const handleStart = (userType) => {
    localStorage.setItem("user-type", userType);
    history.push('./login-page')
  }

  return (
    <div className="home-page">
      <div className="banner">
        <div>
          <h1 className="text-2">Welcome to <br /> Taxi App</h1>
          <h2>login as:</h2>
          <button className="btn btn-1" onClick={() => handleStart("admin")}>
            Admin
          </button><br />
          <button className="btn btn-1" onClick={() => handleStart("user")}>
            Passenger
          </button><br />
          <button className="btn btn-1" onClick={() => handleStart("driver")}>
            Driver
          </button><br />
        </div>
      </div>
    </div>
  );
}

export default Home;
