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
        `INSERT INTO orders (status, collector_id, product_id, price, created_at, updated_at)
        SELECT ?,?,?,?,?,?
        FROM DUAL
        WHERE NOT EXISTS(
            SELECT 1
            FROM orders
            WHERE collector_id = '${req.body.collector_id}' AND product_id = '${req.body.product_id}'
        )
        LIMIT 1;`,
        [
            req.body.status,
            req.body.collector_id,
            req.body.product_id,
            req.body.price,
            currentLocalTime,
            currentLocalTime,
        ]
    , (err, results) => {
        if(err) {
            console.log(err);
            return res.sendStatus(400);
        }
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
        status = '${req.body.status}',
        collector_id = '${req.body.collector_id}',
        product_id = '${req.body.product_id}',
        price = '${req.body.price}',
        updated_at = '${updatedAt}'
        WHERE id = '${req.body.id}';`
    , (err, results) => {
        if(err) {
            console.log(err);
            return res.sendStatus(400);
        }
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

