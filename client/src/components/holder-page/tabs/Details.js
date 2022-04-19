import React, { useEffect, useState } from 'react';
import API_Holder from '../../../APIs/API_Holder';
import '../../../App.css'

function Details() {

  const userId = localStorage.getItem("user-id");

  var initialHolder = {
    name: "",
    address: "",
    email: "",
    phone: "",
    password: "",
  }

  useEffect(() => {

  }, [])

  const handleChange = (e) => {

  }
  
  const handleSubmit = (e) => {

  }

  return (
    <div className="holder-page row">
      <h1>Add a product</h1>
      <form>
        <div class="container">
        
          <p>Fill this form to add a product.</p>
          <hr />

          <label for="name"><b>Name</b></label><br />
          <input type="text" placeholder="Enter your name" name="name" id="name" required onChange={(e)=>handleChange(e)}/>
          <br />

          <label for="address"><b>Brand</b></label><br />
          <input type="text" placeholder="Enter your address" name="address" id="address" required onChange={(e)=>handleChange(e)}/>
          <br />

          <label for="phone"><b>Weight</b></label><br />
          <input type="text" placeholder="Enter your phone number" name="phone" id="phone" required onChange={(e)=>handleChange(e)}/>
          <br />

          <label for="email"><b>Usage</b></label><br />
          <input type="text" placeholder="Enter Email" name="email" id="email" required onChange={(e)=>handleChange(e)}/>
          <br />
          <br />

          {/* <label for="password"><b>Password</b></label><br />
          <input type="password" placeholder="Enter Password" name="password" id="password" required onChange={(e)=>handleChange(e)}/>
          <br /> */}

          <button type="submit" class="registerbtn" onClick={(e) => handleSubmit(e)}>Add product</button>
        </div>        
      </form>
    </div>
  );
}

export default Details;