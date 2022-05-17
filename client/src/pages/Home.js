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
              <p className='para'>This easy to maintain data driven web application is a Product selling platform which allows Product Collectors to search, filter and view products that are created and managed by the Product Holders. Unlike any other product selling systems Post-Consumer Product Collector application helps the Collector and the Holder to buy and sell unwanted products for a small price which is based on the metrics such as Product Weight and Usage. Easy to use features with various Report Generating Capabilities makes this stand out from the rest.</p>
            </div>
          </div><hr />
          <div className='row users'>
            <div className='col'>
              <h1 className='user-title'>Admin</h1>
              <p>System data such as products, collectors, holders, orders, etc are being monitored by the Admin in real time through admin dashboard. Reports can be generated based on the system data.</p>
              <button className="btn btn-1" onClick={() => handleStart("admin")}>Get started</button>
            </div>
            <div className='col'>
              <h1 className='user-title'>Collector</h1>
              <p>Products can be collected by the product collectors after they search, filter, view and select the prefered products which is created and listed by the Product Holders. Orders can be made and managed with Report generation based on system data.</p>
              <button className="btn btn-1" onClick={() => handleStart("collector")}>Get started</button>
            </div>
            <div className='col'>
              <h1 className='user-title'>Holder</h1>
              <p>Products can be created by the Product Holders with the details and managed easily. The orders that are initiated the the Product Collectors can be viewed under the orders by the holders. Report can be generated based on the system data.</p>
              <button className="btn btn-1" onClick={() => handleStart("holder")}>Get started</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
