const sqlCon = require("../db/connection");
const DateTimeService = require('../services/DateTimeService');

const getAllBookings = (req, res) => {
    sqlCon.query("SELECT * FROM bookings", (err, results) => {
        if(err) return res.sendStatus(400);
        return res.send(results);
    })
};

const getBookingById = (req, res) => {
    sqlCon.query(`SELECT * FROM bookings WHERE id = ${req.params.id}`, (err, results) => {
        if(err) return res.sendStatus(400);
        return res.send(results);
    })
}

const postBooking = (req, res) => {
    var currentLocalTime = new DateTimeService().getLocalDateTime(new Date());
    sqlCon.query(
        `INSERT INTO bookings (start_location, end_location, distance, total_charge, status, duration, user_id, driver_id, vehicle_id, created_at, updated_at)
        SELECT ?,?,?,?,?,?,?,?,?,?,?
        LIMIT 1;`,
        [
            req.body.start_location,
            req.body.end_location,
            req.body.distance,
            req.body.total_charge,
            req.body.status,
            req.body.duration,
            req.body.user_id,
            req.body.driver_id,
            req.body.vehicle_id,
            currentLocalTime,
            currentLocalTime,
        ]
    , (err, results) => {
        if(err) return res.sendStatus(400);
        return res.send(results); 
    })
}

const updateBooking = (req, res) => {
    var currentLocalTime = new DateTimeService().getLocalDateTime(new Date());
    var updatedAt = new Date(currentLocalTime).toISOString();
  
    sqlCon.query(
        `
        SET SQL_MODE='ALLOW_INVALID_DATES';
        UPDATE bookings 
        SET 
        start_location = '${req.body.start_location}',
        end_location = '${req.body.end_location}',
        distance = '${req.body.distance}',
        total_charge = '${req.body.total_charge}',
        status = '${req.body.status}',
        duration = '${req.body.duration}',
        user_id = '${req.body.user_id}',
        driver_id = '${req.body.driver_id}',
        vehicle_id = '${req.body.vehicle_id}',
        updated_at = '${updatedAt}'
        WHERE id = '${req.body.id}';`
    , (err, results) => {
        console.log(err)
        if(err) return res.sendStatus(400);
        return res.send(results); 
    })
}

const deleteBooking = (req, res) => {
    sqlCon.query(
        `DELETE FROM bookings WHERE id = ${req.params.id};`
    , (err, results) => {
        if(err) return res.sendStatus(400);
        return res.send(results); 
    })
}

module.exports = {
    getAllBookings,
    getBookingById,
    postBooking,
    updateBooking,
    deleteBooking
};

