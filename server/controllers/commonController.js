const sqlCon = require("../db/connection");
const DateTimeService = require('../services/DateTimeService');

var collectors;
var holders;
var products;
var categories;
var orders;

const getAllData = () => {
    sqlCon.query("SELECT * FROM collectors", (err, results) => {
        collectors = Object.values(JSON.parse(JSON.stringify(results)));
    })
    sqlCon.query("SELECT * FROM holders", (err, results) => {
        holders = Object.values(JSON.parse(JSON.stringify(results)));
    })
    sqlCon.query("SELECT * FROM products", (err, results) => {
        products = Object.values(JSON.parse(JSON.stringify(results)));
    })
    sqlCon.query("SELECT * FROM categories", (err, results) => {
        categories = Object.values(JSON.parse(JSON.stringify(results)));
    })
    sqlCon.query("SELECT * FROM orders", (err, results) => {
        orders = Object.values(JSON.parse(JSON.stringify(results)));
    })
}


const getDashboardData = (req, res) => {
    getAllData();
    var obj = {
        collectors: collectors,
        holders: holders,
        products: products,
        categories: categories,
        orders: orders,
    }
    return res.send(obj);
};


module.exports = {
    getDashboardData
};

