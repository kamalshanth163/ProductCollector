import React, { useState, useEffect } from 'react';
import '../styles/Dashboard.css'
import NavBar from '../components/NavBar';
import API from '../APIs/API';

function Dashboard() {

  const userType = localStorage.getItem("user-type");
  const userId = localStorage.getItem("user-id");
  const userName = localStorage.getItem("user-name");

  const [data, setData] = useState([]);
  const [db, setDb] = useState({});

  useEffect(() => {
    new API().getDashboardData().then((data) => {
      console.log(data)
      setDb({...data});
      getAndSetData(data);
    })
  }, [])

  const getAndSetData = (db) => {
    var orders = [];
    if(userType == "collector"){
      orders = db.orders.filter(x => x.collector_id == userId);
    } 
    else if(userType == "holder"){
      var productByHolderId = db.products.find(x => x.holder_id == userId);
      orders = db.orders.filter(x => x.product_id == (productByHolderId == null ? 0 : productByHolderId.id));
    }

    var pendingOrders = orders.filter(x => x.status == "pending");
    var completedOrders = orders.filter(x => x.status == "completed");

    var ordersTotalPrice = completedOrders.reduce((acc, current) => acc + current.price, 0);

    var allData = [];

    if(userType == "admin"){
      allData.push({title: "Products", data: [...db.products], isReport: true});
      allData.push({title: "Categories", data: [...db.categories], isReport: true});
      allData.push({title: "Orders", data: [...db.orders], isReport: true});
      allData.push({title: "Collectors", data: [...db.collectors], isReport: true});
      allData.push({title: "Holders", data: [...db.holders], isReport: true});
    }
    else if(userType == "collector"){
      allData.push({title: "Products", data: [...db.products], isReport: true});
      allData.push({title: "Categories", data: [...db.categories], isReport: true});
      allData.push({title: "Orders", data: [...orders], isReport: true});
      allData.push({title: "Pending Orders", data: [...pendingOrders], isReport: true});
      allData.push({title: "Completed Orders", data: [...completedOrders], isReport: true});
      allData.push({title: "Total Expense (LKR)", data: ordersTotalPrice, isReport: false});
    }
    else if(userType == "holder"){
      allData.push({title: "Products", data: [...db.products], isReport: true});
      allData.push({title: "Categories", data: [...db.categories], isReport: true});
      allData.push({title: "Orders", data: [...orders], isReport: true});
      allData.push({title: "Pending Orders", data: [...pendingOrders], isReport: true});
      allData.push({title: "Completed Orders", data: [...completedOrders], isReport: true});
      allData.push({title: "Total Income (LKR)", data: ordersTotalPrice, isReport: false});
    }
    setData([...allData]);
  }

  return (
    <div>
      <NavBar />
      <div className="dashboard-page row">
        <div className="container">

          <div className="row analytics">
            <h1>Analytics</h1>
            { data.map((i) => {
              return (
                <div className="col box">
                  <span>{Array.isArray(i.data) ? i.data.length : i.data}</span>
                  <h2>{i.title}</h2>
                </div>
              )
            })}           
          </div>

          <div className="row reports">
            <h1>Reports</h1>
            { data.map((i) => {
              if(i.isReport){
                return (
                  <div className="col box">
                    <span>Generate {i.title} Report</span>
                  </div>
                )
              } else {
                return ""
              }
            })}         
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;