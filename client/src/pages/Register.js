import React, { useState } from 'react';
import '../styles/Sign.css';
import { useHistory } from 'react-router';
import API from '../APIs/API';

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
    rePassword: ""
  }

  const history = useHistory();
  const [user, setUser] = useState(initialUser);
  const [showHiddenPassword, setShowHiddenPassword] = useState(false);
  const [showHiddenRePassword, setShowHiddenRePassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if(user.password !== user.rePassword){
      alert("Passwords do not match.")
    }
    else if(user.name === "") {
      alert("Username cannot be empty.")
    } 
    else if(user.email === "") {
      alert("Email cannot be empty.")
    } 
    else if(user.password === ""){
      alert("Password cannot be empty.")
    }
    else {
      if(userType === "collector"){
        var collector = {
          name: user.name,
          address: user.address,
          email: user.email,
          phone: user.phone,
          password: user.password,
        }
        new API().postCollector(collector).then(data => {
          localStorage.setItem("user-id", data.insertId);
          localStorage.setItem("user-name", user.name);
          history.push('/dashboard');
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
        new API().postHolder(holder).then(data => {
          localStorage.setItem("user-id", data.insertId);
          localStorage.setItem("user-name", user.name);
          history.push('/dashboard');
        });
      }
    }
  }

  const handleChange = (e) => {
    setUser({...user, [e.target.name]: e.target.value});
  }

  const showPassword = (status) => {
    setShowHiddenPassword(status);
  }

  const showRePassword = (status) => {
    setShowHiddenRePassword(status);
  }


  return (
    <div className="register-page sign-page">
      <button className="back-btn"  onClick={(e) => history.push('/')}>Back to Home</button>
      <form>
        <div class="container">
          <h1>Register <span className='span'>as {userType}</span></h1>
          <p>Fill this form to create an account.</p>
          <hr />
          <div className="form-outline mb-3">
            <label className="form-label" for="name"><b>Name</b></label><br />
            <input className="form-control" type="text" placeholder="Enter your name" name="name" id="name" required onChange={(e)=>handleChange(e)}/>
          </div>
          <div className="form-outline mb-3">
            <label className="form-label" for="address"><b>Address</b></label><br />
            <input className="form-control" type="text" placeholder="Enter your address" name="address" id="address" required onChange={(e)=>handleChange(e)}/>
          </div>
          <div className="form-outline mb-3">
            <label className="form-label" for="phone"><b>Phone</b></label><br />
            <input className="form-control" type="text" placeholder="Enter your phone number" name="phone" id="phone" required onChange={(e)=>handleChange(e)}/>
          </div>
          <div className="form-outline mb-3">
            <label className="form-label" for="email"><b>Email</b></label><br />
            <input className="form-control" type="text" placeholder="Enter Email" name="email" id="email" required onChange={(e)=>handleChange(e)}/>
          </div>
          <div className="form-outline mb-3">
            <label className="form-label" for="password"><b>Password</b></label> 
            <span style={{"cursor": "pointer"}} onClick={(e)=>showPassword(!showHiddenPassword)}>{showHiddenPassword ? " hide" : " show"}</span><br />
            <input className="form-control" type={showHiddenPassword ? "text" : "password"} placeholder="Enter Password" name="password" id="password" value={user.password} required onChange={(e)=>handleChange(e)}/>
          </div>
          <div className="form-outline mb-3">
            <label className="form-label" for="rePassword"><b>Re Enter Password</b></label>
            <span style={{"cursor": "pointer"}} onClick={(e)=>showRePassword(!showHiddenRePassword)}>{showHiddenRePassword ? " hide" : " show"}</span><br />
            <input className="form-control" type={showHiddenRePassword ? "text" : "password"} placeholder="Enter Password" name="rePassword" id="rePassword" required onChange={(e)=>handleChange(e)}/>
          </div>

          <button type="submit" class="registerbtn btn btn-primary btn-block mb-3" onClick={(e) => handleSubmit(e)}>Register</button>

          <div className="signin">
            <p>Already have an account? <a href="./login-page">Login</a>.</p>
          </div>
        </div>        
      </form>
    </div>
  );
}

export default Register;
