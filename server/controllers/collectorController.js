const sqlCon = require("../db/connection");
const DateTimeService = require('../services/DateTimeService');

const getAllCollectors = (req, res) => {
    sqlCon.query("SELECT * FROM collectors", (err, results) => {
        if(err) return res.sendStatus(400);
        return res.send(results);
    })
};

const getCollectorById = (req, res) => {
    sqlCon.query(`SELECT * FROM collectors WHERE id = ${req.params.id}`, (err, results) => {
        if(err) return res.sendStatus(400);
        return res.send(results);
    })
}

const postCollector = (req, res) => {
    var currentLocalTime = new DateTimeService().getLocalDateTime(new Date());
    sqlCon.query(
        `INSERT INTO collectors (name, address, email, phone, password, created_at, updated_at)
        SELECT ?,?,?,?,?,?,?
        FROM DUAL
        WHERE NOT EXISTS(
            SELECT 1
            FROM collectors
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

const loginCollector = (req, res) => {
    sqlCon.query(
        `SELECT * FROM collectors WHERE email = "${req.body.email}" AND password = "${req.body.password}"`
    , (err, results) => {
        if(err) return res.send({});
        if(results.length == 0) return res.send({});
        return res.send(results[0]);
    })
}

const updateCollector = (req, res) => {
    var currentLocalTime = new DateTimeService().getLocalDateTime(new Date());
    var updatedAt = new Date(currentLocalTime).toISOString();
  
    sqlCon.query(
        `
        SET SQL_MODE='ALLOW_INVALID_DATES';
        UPDATE collectors 
        SET 
        name = '${req.body.name}',
        address = '${req.body.address}',
        email = '${req.body.email}',
        phone = '${req.body.phone}',
        password = '${req.body.password}',
        updated_at = '${updatedAt}'
        WHERE id = '${req.body.id}';`
    , (err, results) => {
        console.log(err)
        if(err) return res.sendStatus(400);
        return res.send(results); 
    })
}

const deleteCollector = (req, res) => {
    sqlCon.query(
        `DELETE FROM collectors WHERE id = ${req.params.id};`
    , (err, results) => {
        if(err) return res.sendStatus(400);
        return res.send(results); 
    })
}

module.exports = {
    getAllCollectors,
    getCollectorById,
    postCollector,
    loginCollector,
    updateCollector,
    deleteCollector
};

