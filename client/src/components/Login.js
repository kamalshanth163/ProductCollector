import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import '../App.css';
import API_Collector from '../APIs/API_Collector';
import API_Holder from '../APIs/API_Holder';

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
      new API_Collector().loginCollector(userData).then(data => {
        localStorage.setItem("user-id", data.id);
        history.push('/collector-page');
      });
    }
    else if(userType === "holder"){
      new API_Holder().loginHolder(userData).then(data => {
        localStorage.setItem("user-id", data.id);
        history.push('/holder-page');
      });
    }
  }

  const handleChange = (e) => {
    setUserData({...userData, [e.target.name]: e.target.value});
  }

  return (
    <div className="login-page">
      <h3 className="back-btn" onClick={(e) => history.push('/')}>Back to Home</h3>
      <form>
        <div class="container">
          <h1>Login as {userType}</h1>
          <p>Fill this form & login to your account.</p>
          <hr />

          <label for="email"><b>Email</b></label>
          <input type="text" placeholder="Enter Email" name="email" id="email" onChange={(e)=>handleChange(e)} required />

          <label for="password"><b>Password</b></label>
          <input type="password" placeholder="Enter Password" name="password" id="psw" onChange={(e)=>handleChange(e)} required />
          <button type="submit" className="loginbtn" onClick={(e) => handleSubmit(e)}>Login</button>
          
          <div class="container signup">
            <p>Do not have an account? <a href="./register-page">Register</a>.</p>
          </div>
          
        </div>       
      </form>
    </div>
  );
}

export default Login;
