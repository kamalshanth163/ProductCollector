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
        alert("Successfully registered as product collector");
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
        alert("Successfully registered as product holder");
        history.push('/holder-page');
      });
    }
  }

  const handleChange = (e) => {
    setUser({...user, [e.target.name]: e.target.value});
  }

  return (
    <div className="register-page">
      <button className="back-btn"  onClick={(e) => history.push('/')}>Back to Home</button>
      <form>
        <div class="container">
          <h1>Register as {userType}</h1>
          <p>Fill this form to create an account.</p>
          <hr />

          <label for="name"><b>Name</b></label><br />
          <input type="text" placeholder="Enter your name" name="name" id="name" required onChange={(e)=>handleChange(e)}/>
          <br />

          <label for="address"><b>Address</b></label><br />
          <input type="text" placeholder="Enter your address" name="address" id="address" required onChange={(e)=>handleChange(e)}/>
          <br />

          <label for="phone"><b>Phone</b></label><br />
          <input type="text" placeholder="Enter your phone number" name="phone" id="phone" required onChange={(e)=>handleChange(e)}/>
          <br />

          <label for="email"><b>Email</b></label><br />
          <input type="text" placeholder="Enter Email" name="email" id="email" required onChange={(e)=>handleChange(e)}/>
          <br />

          <label for="password"><b>Password</b></label><br />
          <input type="password" placeholder="Enter Password" name="password" id="password" required onChange={(e)=>handleChange(e)}/>
          <br />

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
