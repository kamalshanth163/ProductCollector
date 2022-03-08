import React, { useEffect, useState } from 'react';
import API_Driver from '../../../APIs/API_Driver';
import API_User from '../../../APIs/API_User';
import '../../../App.css'

function Dashboard() {

  const [users, setUsers] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    getAndDisplayData();
  }, [])

  const getAndDisplayData = () => {
    new API_User().getAllUsers().then(data => setUsers([...data]));
    new API_User().getAllVehicles().then(data => setVehicles([...data]));
    new API_User().getAllBookings().then(data => setBookings([...data]));
    new API_Driver().getAllDrivers().then(data => setDrivers([...data]));
  }

  return (
    <div className="admin-page-dashboard row">
      <h1>Admin Dashboard</h1>

      <div>
        <div className='data-card'>
          <h1>Users</h1>
          <span>{users.length}</span>
        </div>
        <div className='data-card'>
          <h1>Drivers</h1>
          <span>{drivers.length}</span>
        </div>
        <div className='data-card'>
          <h1>Vehicles</h1>
          <span>{vehicles.length}</span>
        </div>
        <div className='data-card'>
          <h1>Bookings</h1>
          <span>{bookings.length}</span>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;