import React, { useEffect, useState } from 'react';
import API_Driver from '../../../APIs/API_Driver';
import API_User from '../../../APIs/API_User';
import '../../../App.css'

function CurrentTrip() {

  const userId = localStorage.getItem("user-id");
  const driverId = localStorage.getItem("driver-id");
  const vehicleId = localStorage.getItem("vehicle-id");

  const initialTrip = {
    id: 0,
    start_location: "",
    end_location: "",
    distance: 0.0,
    total_charge: 0.0,
    status: "",
    duration: 0.0,
    user_id: 0,
    driver_id: 0,
    vehicle_id: 0,
  }
  
  const [trip, setTrip] = useState(initialTrip);

  useEffect(() => {
    new API_Driver().getAllBookings().then(data => {
      console.log(data);
      var currentTrip = data.find(i => 
        i.driver_id.toString() === userId && 
        i.status === "Pending");

      setTrip({...currentTrip});
    })
  }, [])

  const completePayment = () => {
    // update driver status to available
    new API_Driver().getAllDrivers().then(data => {
      var driver = data.find(d => d.id.toString() === userId);
      driver.availability = 1;
      new API_Driver().updateDriver(driver).then(data => {
        console.log(data);
      })
    })

    // update booking status to completed
    new API_Driver().getAllBookings().then(data => {
      var booking = data.find(d => d.id.toString() === trip.id.toString());
      console.log("trip", trip);
      console.log("booking", booking);
      booking.status = "Completed";
      new API_Driver().updateBooking(booking).then(data => {
        console.log(data);
      })
    })
  }

  return (
    <div className="user-current-trip-page row">
      <h1>Current Trip Page</h1>

      <table>
        <tr>
          <td>Start location</td>
          <td>{trip.start_location}</td>
        </tr>
        <tr>
          <td>End location</td>
          <td>{trip.end_location}</td>
        </tr>
        <tr>
          <td>Distance</td>
          <td>{trip.distance} meters</td>
        </tr>
        <tr>
          <td>Total charge (LKR)</td>
          <td>{trip.total_charge}</td>
        </tr>
        <tr>
          <td>Status</td>
          <td>{trip.status}</td>
        </tr>
        <tr>
          <td>Duration</td>
          <td>{trip.duration} minutes</td>
        </tr>
      </table>

      <button onClick={(e) => completePayment()}>Complete payment</button>
    </div>

  );
}

export default CurrentTrip;