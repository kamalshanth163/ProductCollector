import React, { useEffect, useState } from 'react';
import '../App.css';
import { useHistory } from 'react-router';
import { NavLink } from 'react-router-dom';

const NavBar = () => {

  const history = useHistory();

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.clear();
    history.push('/');
  }

  return (
    <div>
          <nav className="navbar navbar-expand-lg">
            <div className="container-fluid">
              <h2>PCPC</h2>
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNavDropdown">
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <NavLink className="navLink active" to="/">Home</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="navLink" to="/dashboard">Dashboard</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="navLink" to="/products">Products</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="navLink" to="/orders">Orders</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="navLink" to="/account">Account</NavLink>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
    </div>
  );
}

export default NavBar;
