const sqlCon = require("../db/connection");
const DateTimeService = require('../services/DateTimeService');

const getAllDrivers = (req, res) => {
    sqlCon.query("SELECT * FROM drivers", (err, results) => {
        if(err) return res.sendStatus(400);
        return res.send(results);
    })
};

const getDriverById = (req, res) => {
    sqlCon.query(`SELECT * FROM drivers WHERE id = ${req.params.id}`, (err, results) => {
        if(err) return res.sendStatus(400);
        return res.send(results);
    })
}

const postDriver = (req, res) => {
    var currentLocalTime = new DateTimeService().getLocalDateTime(new Date());
    sqlCon.query(
        `INSERT INTO drivers (name, email, phone, password, license_id, availability, created_at, updated_at)
        SELECT ?,?,?,?,?,?,?,?
        FROM DUAL
        WHERE NOT EXISTS(
            SELECT 1
            FROM drivers
            WHERE email = '${req.body.email}' AND password = '${req.body.password}'
        )
        LIMIT 1;`,
        [
            req.body.name,
            req.body.email,
            req.body.phone,
            req.body.password,
            req.body.license_id,
            req.body.availability,
            currentLocalTime,
            currentLocalTime,
        ]
    , (err, results) => {
        if(err) return res.sendStatus(400);
        return res.send(results); 
    })
}

const loginDriver = (req, res) => {
    sqlCon.query(
        `SELECT * FROM drivers WHERE email = "${req.body.email}" AND password = "${req.body.password}"`
    , (err, results) => {
        if(err) return res.sendStatus(400);
        if(results.length == 0) return res.sendStatus(404);
        return res.send(results[0]);
    })
}

const updateDriver = (req, res) => {
    var currentLocalTime = new DateTimeService().getLocalDateTime(new Date());
    var updatedAt = new Date(currentLocalTime).toISOString();
  
    sqlCon.query(
        `
        SET SQL_MODE='ALLOW_INVALID_DATES';
        UPDATE drivers 
        SET 
        name = '${req.body.name}',
        email = '${req.body.email}',
        phone = '${req.body.phone}',
        password = '${req.body.password}',
        license_id = '${req.body.license_id}',
        availability = '${req.body.availability}',
        updated_at = '${updatedAt}'
        WHERE id = '${req.body.id}';`
    , (err, results) => {
        if(err) return res.sendStatus(400);
        return res.send(results); 
    })
}

const deleteDriver = (req, res) => {
    sqlCon.query(
        `DELETE FROM drivers WHERE id = ${req.params.id};`
    , (err, results) => {
        if(err) return res.sendStatus(400);
        return res.send(results); 
    })
}

module.exports = {
    getAllDrivers,
    getDriverById,
    postDriver,
    loginDriver,
    updateDriver,
    deleteDriver
};

