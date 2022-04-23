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
    brand: "",
    weight: 0,
    usage_time: "",
    description: "",
    image: "",
    holder_id: 0,
    category_id: 0,
  }

  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState([]);

  useEffect(() => {
    new API().getAllProducts().then((data) => {
      setProducts([...data, ...data, ...data, ...data]);
    })
  })

  const handleSubmit = (e) => {
    e.preventDefault(); 
  }

  const handleChange = (e) => {

  }

  const handleSearch = (e) => {

  }

  return (
    <div>
      <NavBar />
      <div className="products-page">
        <h1>Products</h1>
        <div className="container">
          <div className="row products">
            <div className="col-lg-4 product-form">
              <h3>Create a product</h3>
              <form>
                  <hr />
                  <div className="form-outline mb-2">
                    <label className="form-label" for="name"><b>Name</b></label><br />
                    <input className="form-control" type="text" placeholder="Enter product name" name="name" id="name" value={product.name} required onChange={(e)=>handleChange(e)}/>
                  </div>
                  <div className="form-outline mb-2">
                    <label className="form-label" for="name"><b>Brand</b></label><br />
                    <input className="form-control" type="text" placeholder="Enter product name" name="brand" id="brand" value={product.brand} required onChange={(e)=>handleChange(e)}/>
                  </div>
                  <div className="form-outline mb-2 row">
                    <div className='col'>
                      <label className="form-label" for="name"><b>Weight</b></label><br />
                      <input className="form-control" type="text" placeholder="Enter product name" name="name" id="name" value={product.name} required onChange={(e)=>handleChange(e)}/>
                    </div>
                    <div className='col'>
                      <label className="form-label" for="name"><b>Usage time</b></label><br />
                      <input className="form-control" type="text" placeholder="Enter product name" name="brand" id="brand" value={product.brand} required onChange={(e)=>handleChange(e)}/>
                    </div>
                  </div>                  

                  <button type="submit" class="btn btn-primary btn-block mt-4" onClick={(e) => handleSubmit(e)}>Create</button>
              </form>
            </div>
            <div className="col-lg-8 product-list">
              <div className="row product-search mb-3">
                <div className='col'>
                  <input className="form-control" type="text" placeholder="Name" name="name" id="name" value={product.name} required onChange={(e)=>handleChange(e)}/>
                </div>
                <div className='col'>
                  <input className="form-control" type="text" placeholder="Brand" name="name" id="name" value={product.name} required onChange={(e)=>handleChange(e)}/>
                </div>
                <div className='col'>
                  <button type="submit" class="btn btn-primary btn-block" onClick={(e) => handleSearch(e)}>Search</button>
                </div>
              </div>
              <div className="row">
                { products.map((i) => {
                  return (
                    <div className="col box">
                      <img alt='img' />
                      <h4>{i.name}</h4>
                      <h6>{i.brand}</h6>
                      <p>{i.description}</p>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Products;