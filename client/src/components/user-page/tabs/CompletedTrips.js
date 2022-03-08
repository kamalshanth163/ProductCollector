import React, { useEffect, useState } from 'react';
import API_User from '../../../APIs/API_User';
import '../../../App.css'

function CompletedTrips() {

  const userId = localStorage.getItem("user-id");
  const driverId = localStorage.getItem("driver-id");
  const vehicleId = localStorage.getItem("vehicle-id");

  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    new API_User().getAllBookings().then(data => {
      console.log(data);
      var completedTrips = data.filter(i => i.user_id.toString() === userId && i.status === "Completed");
      console.log(completedTrips)
      setBookings([...completedTrips]);
    })
  }, [])
  return (
    <div className="user-completed-trips-page row">
      <h1>Completed Trips Page</h1>
      <table>
        <tr>
          <th>Start</th>
          <th>End</th>
          <th>Distance</th>
          <th>Total charge</th>
          <th>Duration</th>
        </tr>
        {
          bookings.map(b => {
            return (
              <tr>
                <td>{b.start_location}</td>
                <td>{b.end_location}</td>
                <td>{b.distance} meters</td>
                <td>LKR {b.total_charge}</td>
                <td>{b.duration} minutes</td>
              </tr>
            )
          })
        }
      </table>
    </div>
  );
}

export default CompletedTrips;