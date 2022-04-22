import React from 'react';
import { useHistory } from 'react-router-dom';
import "../styles/Home.css";
import NavBar from '../components/NavBar';

const Home = () => {
  const history = useHistory();

  const handleStart = (userType) => {
    localStorage.setItem("user-type", userType);
    history.push('./login-page')
  }

  return (
    <div>
      <NavBar />
      <div className="home-page">
        <div className="banner">
          <table>
            <tr>
              <td>
                <h1 className="text-2">Welcome to <br /> Post-Consumer Product Collector</h1>
              </td>
              <td>
                <div className='link-area'>
                  <h2>Continue as:</h2>
                  <button className="btn btn-1" onClick={() => handleStart("collector")}>
                    Product Collector
                  </button><br />
                  <button className="btn btn-1" onClick={() => handleStart("holder")}>
                    Product Holder
                  </button><br />
                  <button className="btn btn-1" onClick={() => handleStart("admin")}>
                    Admin
                  </button><br />
                </div>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Home;
