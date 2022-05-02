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

  const [holders, setHolders] = useState([]);
  const [collectors, setCollectors] = useState([]);
  const [orders, setOrders] = useState([]);
  const [displayOrders, setDisplayOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [filterStatus, setFilterStatus] = useState("");
  const [holderId, setHolderId] = useState(0);
  const [collectorId, setCollectorId] = useState(0);


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

    if(userType == "holder"){
      new API().getAllCollectors().then((data) => {
        setCollectors([...data]);
      })
    }
  }, [])

  useEffect(() => {}, [orders, filterStatus])

  const filterOrdersByHolder = (e) => {
    var holderId = e.target.value;
    setHolderId(holderId)
    filterOrders(filterStatus, holderId, "holder");
  }

  const filterOrdersByCollector = (e) => {
    var collectorId = e.target.value;
    console.log(collectorId)
    setCollectorId(collectorId)
    filterOrders(filterStatus, collectorId, "collector");
  }

  const filterOrdersByStatus = (e, status) => {
    setFilterStatus(status);
    if(userType == "holder"){
      filterOrders(status, collectorId, "collector");
    }
    else if(userType == "collector"){
      filterOrders(status, holderId, "holder");
    }
  }

  const filterOrders = (status, userId, userType) => {
    
    console.log(userId, userType)
    var filteredOrdersByStatus = status == "" ? orders : orders.filter(x => x.status == status);
    var filteredOrders = [];

    if(userType == "collector"){
      filteredOrders = userId == 0 ? 
        filteredOrdersByStatus : filteredOrdersByStatus.filter(x => x.collector_id == userId);
    }
    
    if(userType == "holder"){
  
      var holderProductIds = products.map(x => {
        if(x.holder_id == userId) return x.id;
      });
      filteredOrders = userId == 0 ? 
        filteredOrdersByStatus : filteredOrdersByStatus.filter(x => holderProductIds.includes(x.product_id));

        console.log(filteredOrders)
    }

    setDisplayOrders([...filteredOrders]);
  }

  const updateOrderStatus = (e, order) => {
    var status = filterStatus == "" ? filterStatus : order.status;
    order.status = order.status == "pending" ? "completed" : "pending";
    new API().updateOrder(order).then(data => {
      filterOrdersByStatus(e, status, "holder")
    })
  }

  return (
    <div>
      <div className="orders-page row">
      <NavBar theme="3"/>
        <div className='container'>
          <div className='row mb-4'>
            <div className='col mt-3'>
              <h1>Orders</h1>
            </div>
            <div className='col mt-4'>
              <button type="submit" className={`btn ${filterStatus == "" ? "btn-dark" : "btn-light"} btn-block`} onClick={(e) => filterOrdersByStatus(e, "")}>All</button>
              <button type="submit" className={`btn ${filterStatus == "pending" ? "btn-dark" : "btn-light"} btn-block mx-2`}  onClick={(e) => filterOrdersByStatus(e, 'pending')}>Pending</button>
              <button type="submit" className={`btn ${filterStatus == "completed" ? "btn-dark" : "btn-light"} btn-block`}  onClick={(e) => filterOrdersByStatus(e, 'completed')}>Completed</button>
            </div>
            {userType == "collector" ?
              <div className='col mt-4'>
                <div className='form-outline'>
                  <label className="form-label"><b>Product Holder</b></label>
                  <select className="form-select" name="category_id" id="category_id" value={holderId} onChange={(e)=>filterOrdersByHolder(e)}>
                    <option key={0} value={0}>All</option>
                    {
                      holders.map(holder => {
                        return <option key={holder.id} value={holder.id}>{holder.name}</option>
                      })
                    }  
                  </select>
                </div>
              </div> : ""          
            }
            {userType == "holder" ?
              <div className='col mt-4'>
                <div className='form-outline'>
                  <label className="form-label"><b>Product Collector</b></label>
                  <select className="form-select" name="category_id" id="category_id" value={collectorId} onChange={(e)=>filterOrdersByCollector(e)}>
                    <option key={0} value={0}>All</option>
                    {
                      collectors.map(collector => {
                        return <option key={collector.id} value={collector.id}>{collector.name}</option>
                      })
                    }  
                  </select>
                </div>
              </div> : ""          
            }
          </div>      
          <br />        
          <div className='row'>
            <div className='col'>
              <table class="table">
                <thead class="thead-dark">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Product</th>
                    <th scope="col">Price (LKR)</th>
                    <th scope="col">Created</th>
                    <th scope="col">Updated</th>
                    <th scope="col">Status</th>
                    {userType == "collector" ? <th scope="col"></th> : ""}
                  </tr>
                </thead>
                <tbody>
                  {
                    displayOrders.map((order, i) => {
                      return (
                        <tr>
                          <td>{i+1}</td>
                          <td>{products.find(x => x.id == order.product_id).name}</td>
                          <td>{order.price.toFixed(2)}</td>
                          <td>{new Date(order.created_at).toDateString()}</td>
                          <td>{new Date(order.updated_at).toDateString()}</td>
                          <td>{new TextService().capitalize(order.status)}</td>
                          {userType == "collector" ? 
                            <td>
                              <button type="submit" className={`btn ${order.status == "pending" ? "btn-success" : "btn-primary"}`} onClick={(e) => updateOrderStatus(e, order)}>Set as {order.status == "pending" ? "Completed" : "Pending"}</button>
                            </td>
                            : ""
                          }
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