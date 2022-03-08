import React, { useEffect, useState } from 'react';
import API_Driver from '../../../APIs/API_Driver';
import API_User from '../../../APIs/API_User';
import '../../../App.css'

function Booking() {
  const userId = localStorage.getItem("user-id");

  const initialBooking = {
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

  const [booking, setBooking] = useState(initialBooking);
  const [vehicles, setVehicles] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [totalCharge, setTotalCharge] = useState(0);

  useEffect(() => {
    getAllDrivers();
    getAllVehicles();
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(booking)
    booking.user_id = userId;
    booking.status = "Pending";
    booking.total_charge = totalCharge;
    new API_User().postBooking(booking).then(data => {
      alert("Trip booked successfully");
    })

    var driver = drivers.find(i => i.id.toString() === booking.driver_id.toString());
    driver.availability = 0;
    new API_Driver().updateDriver(driver).then(data => {
      console.log(data);
    })

    localStorage.setItem("driver-id", booking.driver_id);
    localStorage.setItem("vehicle-id", booking.vehicle_id);
  }
    
  const handleChange = (e) => {
    setBooking({...booking, [e.target.name]: e.target.value});
  }

  const getAllVehicles = () => {
    new API_User().getAllVehicles().then(data => {
      setVehicles([...data]);
    })
  }

  const getAllDrivers = () => {
    new API_Driver().getAllDrivers().then(data => {
      setDrivers([...data]);
    })
  }

  const calculateTotalCharge = (e) => {
    e.preventDefault();
    const vehicle = vehicles.find(d => d.id.toString() === booking.vehicle_id.toString());
    setTotalCharge(vehicle.charge_per_meter * booking.distance);
  }

  const selectVehicle = (vehicle) => {
    console.log(vehicle.type);
    setBooking({...booking, vehicle_id: vehicle.id});
  }

  const selectDriver = (driver) => {
    console.log(driver.name);
    setBooking({...booking, driver_id: driver.id});
  }

  return (
    <div className="booking-page row">
      <h1>Booking Page</h1>

      <form className="form">

           <div className='input'>
              <label for="start_location">Start location</label>
               <input type="text" placeholder="Start location" name="start_location" id="start_location" value={booking.start_location} required onChange={(e)=>handleChange(e)}/>
            </div>

            <div className='input'>
              <label for="end_location">End location</label>
               <input type="text" placeholder="End location" name="end_location" id="end_location" value={booking.end_location} required onChange={(e)=>handleChange(e)}/>
            </div>

            <div className='input'>
              <label for="distance">Distance (meters)</label>
               <input type="number" placeholder="Distance (meters)" name="distance" id="distance" value={booking.distance} required onChange={(e)=>handleChange(e)}/>
            </div>

            <div className='input'>
              <label for="duration">Duration (minutes)</label>
              <input type="number" placeholder="Duration (minutes)" name="duration" id="duration" value={booking.duration} required onChange={(e)=>handleChange(e)}/>
            </div>

            {
              vehicles.map(vehicle => {
                return (
                  <div className='vehicle-card' onClick={(e) => selectVehicle(vehicle)}>
                    <h2>{vehicle.type}</h2>
                    <p>{vehicle.capacity} People</p>
                    <p>LKR {vehicle.charge_per_meter} per meter</p>
                  </div>
                )
              })
            }  

            <div className='input select'>
              <label for="vehicle_id">Selected Vehicle</label>
              <select name="vehicle_id" id="vehicle_id" value={booking.vehicle_id} required onChange={(e)=>handleChange(e)}>
                {
                  vehicles.map(vehicle => {
                    return <option value={vehicle.id}>{vehicle.name}</option>
                  })
                }  
              </select>
            </div>
            
            {
              drivers.map(driver => {
                return (
                  <div className='driver-card' onClick={(e) => selectDriver(driver)}>
                    <h2>{driver.name}</h2>
                    <p>{driver.license_id}</p>
                    <p>{driver.phone}</p>
                  </div>
                )
              })
            } 

            <div className='input select'>
              <label for="driver_id">Selected Driver</label>
              <select name="driver_id" id="driver_id" value={booking.driver_id} required onChange={(e)=>handleChange(e)}>
                {
                  drivers.map(driver => {
                    return <option value={driver.id}>{driver.name}</option>
                  })
                }  
              </select>
            </div><br />

            <button disabled={booking.vehicle_id == 0 || booking.distance == 0} type="submit" className="calculateBtn" onClick={(e) => calculateTotalCharge(e)}>Calculate Total Charge</button>

            <div>
              <label>Total Charge (LKR)</label>
              <h2>{totalCharge}</h2>
            </div>

            <div className='btns'>
            <button type="submit" className="addBtn" onClick={(e) => handleSubmit(e)}>Book</button>
            </div>

        </form>

    </div>
  );
}

export default Booking;