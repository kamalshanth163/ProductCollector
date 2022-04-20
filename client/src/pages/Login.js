import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import '../styles/Login.css';
import API from '../APIs/API';

const Login = () => {
  const userType = localStorage.getItem("user-type");
  const history = useHistory();
  var initialUserData = {
    email: "",
    password: "",
  }
  const [userData, setUserData] = useState(initialUserData);

  useEffect(() => {
    setUserData(initialUserData);
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    if(userType === "collector"){
      new API().loginCollector(userData).then(data => {
        localStorage.setItem("user-id", data.id);
        localStorage.setItem("user-name", data.name);
        history.push('./dashboard');
      });
    }
    else if(userType === "holder"){
      new API().loginHolder(userData).then(data => {
        localStorage.setItem("user-id", data.id);
        localStorage.setItem("user-name", data.name);
        history.push('./dashboard');
      });
    }
    else if(userType === "admin"){
      if(userData.email == "admin@gmail.com" && userData.password == "password"){
        localStorage.setItem("user-id", 0);
        localStorage.setItem("user-name", "Admin");
        history.push('./dashboard');
      }
    }
  }

  const handleChange = (e) => {
    setUserData({...userData, [e.target.name]: e.target.value});
  }

  return (
    <div>
      <div className="login-page">
        <button className="back-btn" onClick={(e) => history.push('/')}>Back to Home</button>
        <form>
          <div className="container">

            <h1>Login <span className='span'>as {userType}</span></h1>
            <p>Fill this form & login to your account.</p>
            <hr />
            <div className="form-outline mb-4">
              <label className="form-label" for="email"><b>Email</b></label><br />
              <input className="form-control" type="text" placeholder="Enter Email" name="email" id="email" onChange={(e)=>handleChange(e)} required />
            </div>

            <div className="form-outline mb-4">
              <label className="form-label" for="password"><b>Password</b></label><br />
              <input className="form-control" type="password" placeholder="Enter Password" name="password" id="psw" onChange={(e)=>handleChange(e)} required />
            </div>

            <button type="submit" className="loginbtn btn btn-primary btn-block mb-4" onClick={(e) => handleSubmit(e)}>Login</button>
            
            {
              userType !== "admin" ?
              <div className="signup">
                <p>Do not have an account? <a href="./register-page">Register</a>.</p>
              </div> : ""
            }
            
          </div>       
        </form>
      </div>
    </div>
  );
}

export default Login;
