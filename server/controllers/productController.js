const sqlCon = require("../db/connection");
const DateTimeService = require('../services/DateTimeService');

const getAllProducts = (req, res) => {
    sqlCon.query("SELECT * FROM products", (err, results) => {
        if(err) return res.sendStatus(400);
        return res.send(results);
    })
};

const getProductById = (req, res) => {
    sqlCon.query(`SELECT * FROM products WHERE id = ${req.params.id}`, (err, results) => {
        if(err) return res.sendStatus(400);
        return res.send(results);
    })
}

const postProduct = (req, res) => {
    var currentLocalTime = new DateTimeService().getLocalDateTime(new Date());
    sqlCon.query(
        `INSERT INTO products (name, address, email, phone, password, created_at, updated_at)
        SELECT ?,?,?,?,?,?,?
        FROM DUAL
        WHERE NOT EXISTS(
            SELECT 1
            FROM products
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

const updateProduct = (req, res) => {
    var currentLocalTime = new DateTimeService().getLocalDateTime(new Date());
    var updatedAt = new Date(currentLocalTime).toISOString();
  
    sqlCon.query(
        `
        SET SQL_MODE='ALLOW_INVALID_DATES';
        UPDATE products 
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

const deleteProduct = (req, res) => {
    sqlCon.query(
        `DELETE FROM products WHERE id = ${req.params.id};`
    , (err, results) => {
        if(err) return res.sendStatus(400);
        return res.send(results); 
    })
}

module.exports = {
    getAllProducts,
    getProductById,
    postProduct,
    updateProduct,
    deleteProduct
};

