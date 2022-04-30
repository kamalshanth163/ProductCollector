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
      <div className="home-page">
      <NavBar theme={2}/>
        <div className="banner container">
          <div className='row welcome'>
            <div className='col'>
              <h3 className="title-2">Welcome to</h3>
              <h1 className="title-1">Post-Consumer Product Collector</h1>
              <p className='para'>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
            </div>
          </div><hr />
          <div className='row users'>
            <div className='col'>
              <h1 className='user-title'>Admin</h1>
              <p>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,</p>
              <button className="btn btn-1" onClick={() => handleStart("admin")}>Get started</button>
            </div>
            <div className='col'>
              <h1 className='user-title'>Collector</h1>
              <p>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,</p>
              <button className="btn btn-1" onClick={() => handleStart("collector")}>Get started</button>
            </div>
            <div className='col'>
              <h1 className='user-title'>Holder</h1>
              <p>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,</p>
              <button className="btn btn-1" onClick={() => handleStart("holder")}>Get started</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
