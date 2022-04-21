const sqlCon = require("../db/connection");
const DateTimeService = require('../services/DateTimeService');

const getAllOrders = (req, res) => {
    sqlCon.query("SELECT * FROM orders", (err, results) => {
        if(err) return res.sendStatus(400);
        return res.send(results);
    })
};

const getOrderById = (req, res) => {
    sqlCon.query(`SELECT * FROM orders WHERE id = ${req.params.id}`, (err, results) => {
        if(err) return res.sendStatus(400);
        return res.send(results);
    })
}

const postOrder = (req, res) => {
    var currentLocalTime = new DateTimeService().getLocalDateTime(new Date());
    sqlCon.query(
        `INSERT INTO orders (name, address, email, phone, password, created_at, updated_at)
        SELECT ?,?,?,?,?,?,?
        FROM DUAL
        WHERE NOT EXISTS(
            SELECT 1
            FROM orders
            WHERE email = '${req.body.email}' AND password = '${req.body.password}'
        )
        LIMIT 1;`,
        [
            req.body.name,
            req.body.address,
            req.body.email,
            req.body.phone,
            req.body.password,
            currentLocalTime,
            currentLocalTime,
        ]
    , (err, results) => {
        if(err) return res.sendStatus(400);
        return res.send(results); 
    })
}

const updateOrder = (req, res) => {
    var currentLocalTime = new DateTimeService().getLocalDateTime(new Date());
    var updatedAt = new Date(currentLocalTime).toISOString();
  
    sqlCon.query(
        `
        SET SQL_MODE='ALLOW_INVALID_DATES';
        UPDATE orders 
        SET 
        name = '${req.body.name}',
        address = '${req.body.address}',
        email = '${req.body.email}',
        phone = '${req.body.phone}',
        password = '${req.body.password}',
        updated_at = '${updatedAt}'
        WHERE id = '${req.body.id}';`
    , (err, results) => {
        if(err) return res.sendStatus(400);
        return res.send(results); 
    })
}

const deleteOrder = (req, res) => {
    sqlCon.query(
        `DELETE FROM orders WHERE id = ${req.params.id};`
    , (err, results) => {
        if(err) return res.sendStatus(400);
        return res.send(results); 
    })
}

module.exports = {
    getAllOrders,
    getOrderById,
    postOrder,
    updateOrder,
    deleteOrder
};

