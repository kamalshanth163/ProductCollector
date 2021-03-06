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

  useEffect(() => {
    new API().getDashboardData().then((data) => {
      getAndSetData(data);
    })
  }, [])

  const generateReport = (title, data) => {
    if(data.length == 0){
      alert(`There is no data to generate ${title} Report`);
    }
    else {
      var userTypeCapitalized = new TextService().capitalize(userType);
      var wb = XLSX.utils.book_new(); 
      var ws = XLSX.utils.json_to_sheet(data);
      XLSX.utils.book_append_sheet(wb, ws, title);
      XLSX.writeFile(wb, `${title} - ${userName} - ${userTypeCapitalized} - ${new Date().toDateString()}.xlsx`);
    }
  }

  const getAndSetData = (db) => {

    var orders = [];
    var products = [];
    var dailyFinances = [];
    var monthlyFinances = [];
    var yearlyFinances = [];

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
    
    var ordersSortedByDate = completedOrders.sort(function(a,b){
      return new Date(b.updated_at) - new Date(a.updated_at);
    });

    var dates = [];
    var months = [];
    var years = [];

    ordersSortedByDate.forEach(order => {
      var dateValue = new Date(order.updated_at).toDateString();
      var month = dateValue.split(" ")[1];
      var year = dateValue.split(" ")[3];
      if(!dates.includes(dateValue)){
        dates.push(dateValue);
        if(!months.includes(month)){
          months.push(month);
        }
        if(!years.includes(year)){
          years.push(year);
        }
      }
    });

    // Daily Finances
    dailyFinances = dates.map((date, i) => {
      var amountsByDate = [];
      var ordersByDate = ordersSortedByDate.map(x => {
        if(new Date(x.updated_at).toDateString() == date) {
          amountsByDate.push(x.price);
        }
      })
      var totalAmount = amountsByDate.reduce((acc, current) => acc + current, 0);
      var financeObj = {
        date: date,
        amount: totalAmount
      }
      return financeObj;
    })

    // Monthly Finances
    monthlyFinances = months.map((month, i) => {
      var amountsByMonth = [];
      var ordersByDate = ordersSortedByDate.map(x => {
        if(new Date(x.updated_at).toDateString().split(" ")[1] == month) {
          amountsByMonth.push(x.price);
        }
      })
      var totalAmount = amountsByMonth.reduce((acc, current) => acc + current, 0);
      var financeObj = {
        month: month,
        amount: totalAmount
      }
      return financeObj;
    })

    // Yearly Finances
    yearlyFinances = years.map((year, i) => {
      var amountsByYear = [];
      var ordersByDate = ordersSortedByDate.map(x => {
        if(new Date(x.updated_at).toDateString().split(" ")[3] == year) {
          amountsByYear.push(x.price);
        }
      })
      var totalAmount = amountsByYear.reduce((acc, current) => acc + current, 0);
      var financeObj = {
        year: year,
        amount: totalAmount
      }
      return financeObj;
    })

    var allData = [];

    if(userType == "admin"){
      allData.push({title: "Products", data: [...db.products], type: "list", isReport: true, show: true});
      allData.push({title: "Categories", data: [...db.categories], type: "list", isReport: true, show: true});
      allData.push({title: "Orders", data: [...db.orders], type: "list", isReport: true, show: true});
      allData.push({title: "Collectors", data: [...db.collectors], type: "list", isReport: true, show: true});
      allData.push({title: "Holders", data: [...db.holders], type: "list", isReport: true, show: true});
    }
    else if(userType == "collector"){
      allData.push({title: "Products", data: [...products], type: "list", isReport: true, show: true});
      allData.push({title: "Orders", data: [...orders], type: "list", isReport: true, show: true});
      allData.push({title: "Pending Orders", data: [...pendingOrders], type: "list", isReport: true, show: true});
      allData.push({title: "Completed Orders", data: [...completedOrders], type: "list", isReport: true, show: true});
      allData.push({title: "Daily Expense", data: [...dailyFinances], type: "list", isReport: true, show: false});
      allData.push({title: "Monthly Expense", data: [...monthlyFinances], type: "list", isReport: true, show: false});
      allData.push({title: "Yearly Expense", data: [...yearlyFinances], type: "list", isReport: true, show: false});
      allData.push({title: "Total Expense", data: ordersTotalPrice.toFixed(2), type: "money", isReport: false, show: true});
    }
    else if(userType == "holder"){
      allData.push({title: "Products", data: [...products], type: "list", isReport: true, show: true});
      allData.push({title: "Orders", data: [...orders], type: "list", isReport: true, show: true});
      allData.push({title: "Pending Orders", data: [...pendingOrders], type: "list", isReport: true, show: true});
      allData.push({title: "Completed Orders", data: [...completedOrders], type: "list", isReport: true, show: true});
      allData.push({title: "Daily Income", data: [...dailyFinances], type: "list", isReport: true, show: false});
      allData.push({title: "Monthly Income", data: [...monthlyFinances], type: "list", isReport: true, show: false});
      allData.push({title: "Yearly Income", data: [...yearlyFinances], type: "list", isReport: true, show: false});
      allData.push({title: "Total Income", data: ordersTotalPrice.toFixed(2), type: "money", isReport: false, show: true});
    }

    setData([...allData]);
  }

  return (
    <div>
      <div className="dashboard-page row">
      <NavBar theme="1"/>
        <div className="container">
          <div className='row'>
            <div className='col mb-2'>
              <h1>Analytics</h1>
            </div>
            <div className='col'>
              <button type="submit" className={`reload-btn btn btn-success btn-block mt-2`} onClick={(e) => window.location.reload(false)}>Reload data</button>
            </div>
          </div>
          <div className="row analytics">
            { data.map((i, index) => {
              if(i.show){
                return (
                  <div className={`col box box${index+1}`}>
                    {i.type == "money" ? <span style={{fontSize: "18px"}}> LKR </span> : ""}
                    <span>{i.type == "list" ? i.data.length : i.data}</span>
                    <h2>{i.title}</h2>
                  </div>
                )
              }
            })}           
          </div>
          <div className='row'>
            <div className='col'>
              <h1>Reports</h1>
            </div>
          </div>
          <div className="row reports">
            { data.map((i) => {
              if(i.isReport){
                return (
                  <div className="col-3 box report-box" onClick={() => generateReport(i.title, i.data)}>
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