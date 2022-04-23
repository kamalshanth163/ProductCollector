import React, {useEffect, useState} from 'react';
import '../styles/Products.css'
import NavBar from '../components/NavBar';
import API from '../APIs/API';

function Products() {

  const userType = localStorage.getItem("user-type");
  const userId = localStorage.getItem("user-id");
  const userName = localStorage.getItem("user-name");

  var initialProduct = {
    name: "",
    address: "",
    license_id: "",
    availability: true,
    email: "",
    phone: "",
    password: "",
  }

  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState([]);

  useEffect(() => {
    new API().getAllProducts().then((data) => {
      setProducts([...data]);
    })
  })

  return (
    <div>
      <NavBar />
      <div className="products-page row">
        {/* <h1>Products</h1> */}
        <div className="container">
          <div className="row products">
            <h1>Products</h1>
            <div className="col-lg-8">
            { products.map((i) => {
              return (
                <div className="col box">
                  <h2>{i.name}</h2>
                  <span>{i.brand}</span>
                </div>
              )
            })}
            </div>
            <div className="col-lg-4">
            { products.map((i) => {
              return (
                <div className="col box">
                  <form>
                    <div class="container">
                      <h1>Account details</h1>
                      <p>View, Edit and Save account details</p>
                      <hr />
                      <div className="form-outline mb-4">
                        <label className="form-label" for="name"><b>Name</b></label><br />
                        <input className="form-control" type="text" placeholder="Enter your name" name="name" id="name" value={user.name} readOnly required onChange={(e)=>handleChange(e)}/>
                      </div>
                      <div className="form-outline mb-4">
                        <label className="form-label" for="address"><b>Address</b></label><br />
                        <input className="form-control" type="text" placeholder="Enter your address" name="address" id="address" value={user.address} required onChange={(e)=>handleChange(e)}/>
                      </div>
                      <div className="form-outline mb-4">
                        <label className="form-label" for="phone"><b>Phone</b></label><br />
                        <input className="form-control" type="text" placeholder="Enter your phone number" name="phone" id="phone" value={user.phone} required onChange={(e)=>handleChange(e)}/>
                      </div>
                      <div className="form-outline mb-4">
                        <label className="form-label" for="email"><b>Email</b></label><br />
                        <input className="form-control" type="text" placeholder="Enter Email" name="email" id="email" value={user.email} required onChange={(e)=>handleChange(e)}/>
                      </div>
                      <div className="form-outline mb-4">
                        <label className="form-label" for="password"><b>Password</b></label> 
                        <span style={{"cursor": "pointer"}} onClick={(e)=>showPassword(!showHiddenPassword)}>{showHiddenPassword ? " hide" : " show"}</span><br />
                        <input className="form-control" type={showHiddenPassword ? "text" : "password"} placeholder="Enter Password" name="password" id="password" value={user.password} required onChange={(e)=>handleChange(e)}/>
                      </div>

                      <button type="submit" class="btn btn-primary btn-block mb-4" onClick={(e) => handleSubmit(e)}>Save</button>
                    </div>
                  </form>
                </div>
              )
            })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Products;