import React, { useEffect, useState } from 'react';
import '../styles/Home.css';
import { useHistory } from 'react-router';
import { NavLink } from 'react-router-dom';

const NavBar = () => {

  const history = useHistory();
  const userName = localStorage.getItem("user-name");
  const userType = localStorage.getItem("user-type");

  const handleLogout = (e) => {
    e.preventDefault();
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.clear();
      history.push('/');
    }
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

                  {(() => {
                    if(userName == null){
                      return (<ul className="navbar-nav me-auto main-links"></ul>);
                    }
                    else {
                      if (userType === "admin"){
                          return (
                            <ul className="navbar-nav me-auto main-links">
                              <li className="nav-item">
                                <NavLink className="navLink" to="/dashboard">Dashboard</NavLink>
                              </li>
                            </ul>
                          )
                      } else {
                        return (
                          <ul className="navbar-nav me-auto main-links">
                            <li className="nav-item">
                              <NavLink className="navLink" to="/dashboard">Dashboard</NavLink>
                            </li>
                            <li className="nav-item">
                              <NavLink className="navLink" to="/products">Products</NavLink>
                            </li>
                            <li className="nav-item">
                              <NavLink className="navLink" to="/orders">Orders</NavLink>
                            </li>
                          </ul>
                        )
                      }
                    }
                  })()}

                { userName !== null
                    ? 
                    <ul className="navbar-nav mr-auto">
                      <li className="nav-item">
                        <NavLink className="navLink" to="/account">{userName}</NavLink>
                      </li>
                    </ul>
                    :
                    ""
                }
                
                { userName !== null
                    ? 
                    <ul className="navbar-nav mr-auto">
                      <li className="nav-item">
                        <button className="btn btn-primary" onClick={(e) => handleLogout(e)}>Logout</button>
                      </li>
                    </ul>
                    :
                    ""
                }
              </div>
            </div>
          </nav>
    </div>
  );
}

export default NavBar;
