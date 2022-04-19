import React, { useEffect, useState } from 'react';
import API_Holder from '../../../APIs/API_Holder';
import API_Collector from '../../../APIs/API_Collector';
import '../../../App.css'

function Store() {
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

  useEffect(() => {

  }, [])

  const handleAdd = (e) => {

  }

  return (
    <div className="collector-page row">
      <h1>Products</h1>
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
                <button type="submit" class="addBtn btn" onClick={() => handleAdd(b)}>Add</button>
              </div>
            </div>
        </div>
        )})}
      </div>
    </div>
  );
}

export default Store;