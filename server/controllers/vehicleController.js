const sqlCon = require("../db/connection");
const DateTimeService = require('../services/DateTimeService');

const getAllVehicles = (req, res) => {
    sqlCon.query("SELECT * FROM vehicles", (err, results) => {
        if(err) return res.sendStatus(400);
        return res.send(results);
    })
};

const getVehicleById = (req, res) => {
    sqlCon.query(`SELECT * FROM vehicles WHERE id = ${req.params.id}`, (err, results) => {
        if(err) return res.sendStatus(400);
        return res.send(results);
    })
}

const postVehicle = (req, res) => {
    var currentLocalTime = new DateTimeService().getLocalDateTime(new Date());
    sqlCon.query(
        `INSERT INTO vehicles (name, type, charge_per_meter, capacity, created_at, updated_at)
        SELECT ?,?,?,?,?,?
        FROM DUAL
        WHERE NOT EXISTS(
            SELECT 1
            FROM vehicles
            WHERE name = '${req.body.name}' AND type = '${req.body.type}'
        )
        LIMIT 1;`,
        [
            req.body.name,
            req.body.type,
            req.body.charge_per_meter,
            req.body.capacity,
            currentLocalTime,
            currentLocalTime,
        ]
    , (err, results) => {
        if(err) return res.sendStatus(400);
        return res.send(results); 
    })
}

const updateVehicle = (req, res) => {
    var currentLocalTime = new DateTimeService().getLocalDateTime(new Date());
    var updatedAt = new Date(currentLocalTime).toISOString();
  
    sqlCon.query(
        `
        SET SQL_MODE='ALLOW_INVALID_DATES';
        UPDATE vehicles 
        SET 
        name = '${req.body.name}',
        type = '${req.body.type}',
        charge_per_meter = '${req.body.charge_per_meter}',
        capacity = '${req.body.capacity}',
        updated_at = '${updatedAt}'
        WHERE id = '${req.body.id}';`
    , (err, results) => {
        console.log(err)
        if(err) return res.sendStatus(400);
        return res.send(results); 
    })
}

const deleteVehicle = (req, res) => {
    sqlCon.query(
        `DELETE FROM vehicles WHERE id = ${req.params.id};`
    , (err, results) => {
        if(err) return res.sendStatus(400);
        return res.send(results); 
    })
}

module.exports = {
    getAllVehicles,
    getVehicleById,
    postVehicle,
    updateVehicle,
    deleteVehicle
};

