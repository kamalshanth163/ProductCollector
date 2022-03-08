import React, { useEffect, useState } from 'react';
import API_Driver from '../../../APIs/API_Driver';
import '../../../App.css'

function Details() {

  const userId = localStorage.getItem("user-id");

  var initialDriver = {
    name: "",
    license_id: "",
    availability: 1,
    email: "",
    phone: "",
    password: "",
  }
  const [driver, setDriver] = useState(initialDriver);

  useEffect(() => {
    new API_Driver().getAllDrivers().then(data => {
      const driver = data.find(d => d.id.toString() === userId);
      setDriver(driver);
    })
  }, [driver])

  const handleAvailability = (status) => {
    driver.availability = status;
    new API_Driver().updateDriver(driver).then(data => {
      setDriver(driver);
    })
  }

  return (
    <div className="driver-details-page row">
      <h1>Driver Details Page</h1>

      <table>
        <tr>
          <td>Driver's name</td>
          <td>{driver.name}</td>
        </tr>
        <tr>
          <td>Phone number</td>
          <td>{driver.phone}</td>
        </tr>
        <tr>
          <td>Email address</td>
          <td>{driver.email}</td>
        </tr>
        <tr>
          <td>Driving license id</td>
          <td>{driver.license_id}</td>
        </tr>
        <tr>
          <td>Availability (Currently { driver.availability === 1 ? "Available" : "Busy"})</td>
          <td>
          {
            driver.availability === 1
            ? 
            <button onClick={(e) => handleAvailability(0)}>Set as Busy</button>
            :
            <button onClick={(e) => handleAvailability(1)}>Set as Available</button>
          }
          </td>
        </tr>
      </table>

    </div>
  );
}

export default Details;