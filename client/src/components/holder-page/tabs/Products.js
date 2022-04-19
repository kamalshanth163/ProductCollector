import React, { useEffect, useState } from 'react';
import API_Holder from '../../../APIs/API_Holder';
import '../../../App.css'

function Products() {

  const userId = localStorage.getItem("user-id");
  const [products, setProducts] = useState([
    {
      name: "Chair",
      brand: "Damro",
      weight: 10.00,
    },
    {
      name: "CPU",
      brand: "Hitachi",
      weight: 60.00,
    },
    {
      name: "Owen",
      brand: "Samsung",
      weight: 30.00,
    },
    {
      name: "Laptop",
      brand: "Dell",
      weight: 12.00,
    },
    {
      name: "Table fan",
      brand: "Panasonic",
      weight: 23.00,
    },
    {
      name: "Wheel Chair",
      brand: "Damro",
      weight: 47.00,
    },
  ])
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
    <h1>View products</h1>
      <div className="grid-container">
        {products.map((b, i) => {
          return (
        <div className="grid-item" style={{background: b.color}}>
            <div className="book">
              <div className="book-img"></div>
              <div className="book-details">
                <h2>{b.name}</h2>
                <p>{b.brand}</p>
                <p>{b.weight} kg</p>
              </div>
              <div className="actions">
                {/* <button type="submit" class="buyBtn btn" onClick={() => handleBuy(b)}>Buy</button> */}
                <button type="submit" class="addBtn btn" onClick={() => {}}>View</button>
              </div>
            </div>
        </div>
        )})}
      </div>
    </div>
  );
}

export default Products;