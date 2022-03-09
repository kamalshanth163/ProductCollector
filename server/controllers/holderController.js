const sqlCon = require("../db/connection");
const DateTimeService = require('../services/DateTimeService');

const getAllHolders = (req, res) => {
    sqlCon.query("SELECT * FROM holders", (err, results) => {
        if(err) return res.sendStatus(400);
        return res.send(results);
    })
};

const getHolderById = (req, res) => {
    sqlCon.query(`SELECT * FROM holders WHERE id = ${req.params.id}`, (err, results) => {
        if(err) return res.sendStatus(400);
        return res.send(results);
    })
}

const postHolder = (req, res) => {
    var currentLocalTime = new DateTimeService().getLocalDateTime(new Date());
    sqlCon.query(
        `INSERT INTO holders (name, address, email, phone, password, created_at, updated_at)
        SELECT ?,?,?,?,?,?,?
        FROM DUAL
        WHERE NOT EXISTS(
            SELECT 1
            FROM holders
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

const loginHolder = (req, res) => {
    sqlCon.query(
        `SELECT * FROM holders WHERE email = "${req.body.email}" AND password = "${req.body.password}"`
    , (err, results) => {
        if(err) return res.sendStatus(400);
        if(results.length == 0) return res.sendStatus(404);
        return res.send(results[0]);
    })
}

const updateHolder = (req, res) => {
    var currentLocalTime = new DateTimeService().getLocalDateTime(new Date());
    var updatedAt = new Date(currentLocalTime).toISOString();
  
    sqlCon.query(
        `
        SET SQL_MODE='ALLOW_INVALID_DATES';
        UPDATE holders 
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

const deleteHolder = (req, res) => {
    sqlCon.query(
        `DELETE FROM holders WHERE id = ${req.params.id};`
    , (err, results) => {
        if(err) return res.sendStatus(400);
        return res.send(results); 
    })
}

module.exports = {
    getAllHolders,
    getHolderById,
    postHolder,
    loginHolder,
    updateHolder,
    deleteHolder
};

