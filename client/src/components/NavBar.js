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
        <div class="topnav">      
            <div className="nav-topbar">
              <table>
                <tr>
                  <td>
                    <NavLink className="logo nav-link" to="/">
                      <h1 className="main-text">PCPC</h1>
                    </NavLink>
                    
                    <NavLink className="nav-link" to="/">
                      <button className='home-btn btn'>Home</button>
                    </NavLink>

                    <NavLink className="nav-link" to="/">
                      <button className='logout-btn btn' onClick={(e) => handleLogout(e)}>Logout</button>
                    </NavLink>
                    
                  </td>
                </tr>
              </table>
            </div>
          </div>
    </div>
  );
}

export default NavBar;
