import React, {useEffect, useState} from 'react';
import '../styles/Account.css'
import NavBar from '../components/NavBar';
import API from '../APIs/API';

function Account() {

  const userType = localStorage.getItem("user-type");
  const userId = localStorage.getItem("user-id");
  const userName = localStorage.getItem("user-name");

  var initialUser = {
    name: "",
    address: "",
    license_id: "",
    availability: true,
    email: "",
    phone: "",
    password: "",
  }

  const [user, setUser] = useState(initialUser);
  const [showHiddenPassword, setShowHiddenPassword] = useState(false);

  var admin = {
    name: "Admin",
    email: "admin@gmail.com",
    password: "admin"
  }

  useEffect(() => {
    if(userType === "collector"){
      new API().getAllCollectors().then(data => {
        var collector = data.find(x => x.id == userId);
        setUser({...collector});
      })
    }
    else if(userType === "holder"){
      new API().getAllHolders().then(data => {
        var holder = data.find(x => x.id == userId);
        setUser({...holder});
      })
    }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    if(userType === "collector"){
      var collector = {
        id: userId,
        name: user.name,
        address: user.address,
        email: user.email,
        phone: user.phone,
        password: user.password,
      }
      new API().updateCollector(collector).then(data => {
        alert("Account details saved successfully");
        localStorage.setItem('user-name', collector.name);
        window.location.reload(true);
      });
    }
    else if(userType === "holder"){
      var holder = {
        id: userId,
        name: user.name,
        address: user.address,
        email: user.email,
        phone: user.phone,
        password: user.password,
      }
      new API().updateHolder(holder).then(data => {
        alert("Account details saved successfully");
        localStorage.setItem('user-name', holder.name);
        window.location.reload(true);
      });
    }
  }

  const handleChange = (e) => {
    setUser({...user, [e.target.name]: e.target.value});
  }

  const showPassword = (status) => {
    setShowHiddenPassword(status);
  }

  return (
    <div>
      <div className="account-page row">
      <NavBar theme="4"/>

        {userType === "admin" ? 
          <form>
            <div class="container">
              <h1>Account details</h1>
              <p>View admin account details</p>
              <div className="form-outline mb-3">
                <label className="form-label" for="name"><b>Name</b></label><br />
                <input className="form-control" type="text" placeholder="Enter your name" name="name" id="name" value={admin.name} readOnly required onChange={(e)=>handleChange(e)}/>
              </div>
              <div className="form-outline mb-3">
                <label className="form-label" for="email"><b>Email</b></label><br />
                <input className="form-control" type="text" placeholder="Enter Email" name="email" id="email" value={admin.email} readOnly required onChange={(e)=>handleChange(e)}/>
              </div>
              <div className="form-outline mb-3">
                <label className="form-label" for="password"><b>Password</b></label> 
                <span style={{"cursor": "pointer"}} onClick={(e)=>showPassword(!showHiddenPassword)}>{showHiddenPassword ? " hide" : " show"}</span><br />
                <input className="form-control" type={showHiddenPassword ? "text" : "password"} placeholder="Enter Password" name="password" id="password" value={admin.password} readOnly required onChange={(e)=>handleChange(e)}/>
              </div>
            </div>        
          </form>
          :
          <form>
            <div class="container">
              <h1>Account details</h1>
              <p>View, Edit and Save account details</p>
              <hr />
              <div className="form-outline mb-3">
                <label className="form-label" for="name"><b>Name</b></label><br />
                <input className="form-control" type="text" placeholder="Enter your name" name="name" id="name" value={user.name} required onChange={(e)=>handleChange(e)}/>
              </div>
              <div className="form-outline mb-3">
                <label className="form-label" for="address"><b>Address</b></label><br />
                <input className="form-control" type="text" placeholder="Enter your address" name="address" id="address" value={user.address} required onChange={(e)=>handleChange(e)}/>
              </div>
              <div className="form-outline mb-3">
                <label className="form-label" for="phone"><b>Phone</b></label><br />
                <input className="form-control" type="text" placeholder="Enter your phone number" name="phone" id="phone" value={user.phone} required onChange={(e)=>handleChange(e)}/>
              </div>
              <div className="form-outline mb-3">
                <label className="form-label" for="email"><b>Email</b></label><br />
                <input className="form-control" type="text" placeholder="Enter Email" name="email" id="email" value={user.email} required onChange={(e)=>handleChange(e)}/>
              </div>
              <div className="form-outline mb-3">
                <label className="form-label" for="password"><b>Password</b></label> 
                <span style={{"cursor": "pointer"}} onClick={(e)=>showPassword(!showHiddenPassword)}>{showHiddenPassword ? " hide" : " show"}</span><br />
                <input className="form-control" type={showHiddenPassword ? "text" : "password"} placeholder="Enter Password" name="password" id="password" value={user.password} required onChange={(e)=>handleChange(e)}/>
              </div>

              <button type="submit" class="btn btn-primary btn-block mb-3" onClick={(e) => handleSubmit(e)}>Save</button>
            </div>
          </form>
        }
      </div>
    </div>
  );
}

export default Account;