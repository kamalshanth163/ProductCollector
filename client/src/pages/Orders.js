import React, {useEffect, useState} from 'react';
import '../styles/Orders.css'
import NavBar from '../components/NavBar';
import API from '../APIs/API';
import { useHistory } from 'react-router';
import TextService from '../services/TextService';

function Orders() {

  const userType = localStorage.getItem("user-type");
  const userId = localStorage.getItem("user-id");
  const userName = localStorage.getItem("user-name");

  var initialOrder = {

  }

  const [holders, setHolders] = useState([]);
  const [order, setOrder] = useState({});
  const [orders, setOrders] = useState([]);
  const [displayOrders, setDisplayOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [filterStatus, setFilterStatus] = useState("");
  const [holderId, setHolderId] = useState(0);


  useEffect(() => {

    new API().getAllProducts().then((data) => {
      var products = [...data];
      setProducts(products);

      new API().getAllOrders().then((data) => {
        if(userType == "collector"){
          var collectorOrders = data.filter(x => x.collector_id == userId).reverse();
          setOrders([...collectorOrders]);
          setDisplayOrders([...collectorOrders]);
        } 
        else if (userType == "holder"){
          var holderProductIds = products.map(x => {
            if(x.holder_id == userId) return x.id;
          });
          var holderOrders = data.filter(x => holderProductIds.includes(x.product_id)).reverse();
          setOrders([...holderOrders]);
          setDisplayOrders([...holderOrders]);
        }
      })
    })


    if(userType == "collector"){
      new API().getAllHolders().then((data) => {
        setHolders([...data]);
      })
    }
  }, [])

  const filterOrdersByHolder = (e) => {
    var holderId = e.target.value;
    setHolderId(holderId)
    filterOrders(filterStatus, holderId);
  }

  const filterOrdersByStatus = (e, status) => {
    setFilterStatus(status);
    filterOrders(status, holderId);
  }

  const filterOrders = (status, holderId) => {
    var filteredOrdersByStatus = status == "" ? orders : orders.filter(x => x.status == status);

    var holderProductIds = products.map(x => {
      if(x.holder_id == holderId) return x.id;
    });
    var filteredOrders = holderId == 0 ? 
      filteredOrdersByStatus : filteredOrdersByStatus.filter(x => holderProductIds.includes(x.product_id));

    setDisplayOrders([...filteredOrders]);
  }

  const updateOrderStatus = (e) => {

  }

  return (
    <div>
      <NavBar />
      <div className="orders-page row">
        <div className='container'>
          <div className='row'>
            <div className='col'>
              <h1>Orders</h1>
            </div>
            <div className='col'>
              <button type="submit" className={`btn ${filterStatus == "" ? "btn-dark" : "btn-light"} btn-block mt-2`} onClick={(e) => filterOrdersByStatus(e, "")}>All</button>
              <button type="submit" className={`btn ${filterStatus == "pending" ? "btn-dark" : "btn-light"} btn-block mt-2 mx-2`}  onClick={(e) => filterOrdersByStatus(e, 'pending')}>Pending</button>
              <button type="submit" className={`btn ${filterStatus == "completed" ? "btn-dark" : "btn-light"} btn-block mt-2`}  onClick={(e) => filterOrdersByStatus(e, 'completed')}>Completed</button>
            </div>
            <div className='col'>
              <div className='form-outline mb-4'>
                <label className="form-label" for="category_id"><b>Product Holder</b></label>
                <select className="form-select" name="category_id" id="category_id" value={holderId} onChange={(e)=>filterOrdersByHolder(e)}>
                  <option key={0} value={0}>All</option>
                  {
                    holders.map(holder => {
                      return <option key={holder.id} value={holder.id}>{holder.name}</option>
                    })
                  }  
                </select>
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col'>
              <table class="table">
                <thead class="thead-dark">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Status</th>
                    <th scope="col">Product</th>
                    <th scope="col">Created</th>
                    <th scope="col">Updated</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  {
                    displayOrders.map((order, i) => {
                      return (
                        <tr>
                          <td>{i+1}</td>
                          <td>{new TextService().capitalize(order.status)}</td>
                          <td>{products.find(x => x.id == order.product_id).name}</td>
                          <td>{new Date(order.created_at).toDateString()}</td>
                          <td>{new Date(order.updated_at).toDateString()}</td>
                          <td>
                            <button type="submit" className="btn btn-success" onClick={(e) => updateOrderStatus(e)}>Set as completed</button>
                          </td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Orders;