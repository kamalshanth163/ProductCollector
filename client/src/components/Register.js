import React, { useState } from 'react';
import '../App.css';
import { useHistory } from 'react-router';
import API_Collector from '../APIs/API_Collector';
import API_Holder from '../APIs/API_Holder';

const Register = () => {
  const userType = localStorage.getItem("user-type");

  var initialUser = {
    name: "",
    address: "",
    license_id: "",
    availability: true,
    email: "",
    phone: "",
    password: "",
  }

  const history = useHistory();
  const [user, setUser] = useState(initialUser);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(userType === "collector"){
      var collector = {
        name: user.name,
        address: user.address,
        email: user.email,
        phone: user.phone,
        password: user.password,
      }
      new API_Collector().postCollector(collector).then(data => {
        localStorage.setItem("user-id", data.insertId);
        history.push('/collector-page');
      });
    }
    else if(userType === "holder"){
      var holder = {
        name: user.name,
        address: user.address,
        email: user.email,
        phone: user.phone,
        password: user.password,
      }
      new API_Holder().postHolder(holder).then(data => {
        localStorage.setItem("user-id", data.insertId);
        history.push('/holder-page');
      });
    }
  }

  const handleChange = (e) => {
    setUser({...user, [e.target.name]: e.target.value});
  }

  return (
    <div className="register-page">
      <h3 className="back-btn"  onClick={(e) => history.push('/')}>Back to Home</h3>
      <form>
        <div class="container">
          <h1>Register as {userType}</h1>
          <p>Fill this form to create an account.</p>
          <hr />

          <label for="name"><b>Name</b></label>
          <input type="text" placeholder="Enter your name" name="name" id="name" required onChange={(e)=>handleChange(e)}/>

          <label for="address"><b>Address</b></label>
          <input type="text" placeholder="Enter your address" name="address" id="address" required onChange={(e)=>handleChange(e)}/>

          <label for="phone"><b>Phone</b></label>
          <input type="text" placeholder="Enter your phone number" name="phone" id="phone" required onChange={(e)=>handleChange(e)}/>

          {
            userType === "driver" ? 
            <div>
              <label for="license_id"><b>License id</b></label>
              <input type="text" placeholder="Enter your license id" name="license_id" id="license_id" required onChange={(e)=>handleChange(e)}/>
            </div>
            : ""
          }

          <label for="email"><b>Email</b></label>
          <input type="text" placeholder="Enter Email" name="email" id="email" required onChange={(e)=>handleChange(e)}/>

          <label for="password"><b>Password</b></label>
          <input type="password" placeholder="Enter Password" name="password" id="password" required onChange={(e)=>handleChange(e)}/>

          <button type="submit" class="registerbtn" onClick={(e) => handleSubmit(e)}>Register</button>

          <div class="signin">
            <p>Already have an account? <a href="./login-page">Sign in</a>.</p>
          </div>
        </div>        
      </form>
    </div>
  );
}

export default Register;
