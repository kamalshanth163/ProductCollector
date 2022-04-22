import React, { useState, useEffect } from 'react';
import '../styles/Dashboard.css'
import NavBar from '../components/NavBar';
import API from '../APIs/API';
import * as XLSX from 'xlsx';
import TextService from '../services/TextService';

function Dashboard() {

  const userType = localStorage.getItem("user-type");
  const userId = localStorage.getItem("user-id");
  const userName = localStorage.getItem("user-name");

  const [data, setData] = useState([]);
  const [db, setDb] = useState({});

  useEffect(() => {
    new API().getDashboardData().then((data) => {
      setDb({...data});
      getAndSetData(data);
    })
  }, [])

  const generateReport = (title, data) => {
    var userTypeCapitalized = new TextService().capitalize(userType);
    var wb = XLSX.utils.book_new(); 
    var ws = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, title);
    XLSX.writeFile(wb, `${title} - ${userName} - ${userTypeCapitalized} - ${new Date().toDateString()}.xlsx`);
  }

  const getAndSetData = (db) => {
    var orders = [];
    var products = [];

    if(userType == "collector"){
      orders = db.orders.filter(x => x.collector_id == userId);
      var collectorOrderedProductIds = orders.map(x => {
        if(x.collector_id == userId) return x.product_id;
      });
      products = db.products.filter(x => collectorOrderedProductIds.includes(x.id));
    } 
    else if(userType == "holder"){
      var holderProductIds = db.products.map(x => {
        if(x.holder_id == userId) return x.id;
      });
      orders = db.orders.filter(x => holderProductIds.includes(x.product_id));
      products = db.products.filter(x => x.holder_id == userId);
    }

    var pendingOrders = orders.filter(x => x.status == "pending");
    var completedOrders = orders.filter(x => x.status == "completed");
    var ordersTotalPrice = completedOrders.reduce((acc, current) => acc + current.price, 0);

    var allData = [];

    if(userType == "admin"){
      allData.push({title: "Products", data: [...db.products], type: "list", isReport: true});
      allData.push({title: "Categories", data: [...db.categories], type: "list", isReport: true});
      allData.push({title: "Orders", data: [...db.orders], type: "list", isReport: true});
      allData.push({title: "Collectors", data: [...db.collectors], type: "list", isReport: true});
      allData.push({title: "Holders", data: [...db.holders], type: "list", isReport: true});
    }
    else if(userType == "collector"){
      allData.push({title: "Products", data: [...products], type: "list", isReport: true});
      allData.push({title: "Orders", data: [...orders], type: "list", isReport: true});
      allData.push({title: "Pending Orders", data: [...pendingOrders], type: "list", isReport: true});
      allData.push({title: "Completed Orders", data: [...completedOrders], type: "list", isReport: true});
      allData.push({title: "Total Expense", data: ordersTotalPrice.toFixed(2), type: "money", isReport: false});
    }
    else if(userType == "holder"){
      allData.push({title: "Products", data: [...products], type: "list", isReport: true});
      allData.push({title: "Orders", data: [...orders], type: "list", isReport: true});
      allData.push({title: "Pending Orders", data: [...pendingOrders], type: "list", isReport: true});
      allData.push({title: "Completed Orders", data: [...completedOrders], type: "list", isReport: true});
      allData.push({title: "Total Income", data: ordersTotalPrice.toFixed(2), type: "money", isReport: false});
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
                  {i.type == "money" ? <span style={{fontSize: "20px"}}> LKR </span> : ""}
                  <span>{i.type == "list" ? i.data.length : i.data}</span>
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
                  <div className="col box" onClick={() => generateReport(i.title, i.data)}>
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