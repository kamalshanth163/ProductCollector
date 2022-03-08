const sqlCon = require("../db/connection");
const DateTimeService = require('../services/DateTimeService');

const getAllUsers = (req, res) => {
    sqlCon.query("SELECT * FROM users", (err, results) => {
        if(err) return res.sendStatus(400);
        return res.send(results);
    })
};

const getUserById = (req, res) => {
    sqlCon.query(`SELECT * FROM users WHERE id = ${req.params.id}`, (err, results) => {
        if(err) return res.sendStatus(400);
        return res.send(results);
    })
}

const postUser = (req, res) => {
    var currentLocalTime = new DateTimeService().getLocalDateTime(new Date());
    sqlCon.query(
        `INSERT INTO users (name, email, phone, password, created_at, updated_at)
        SELECT ?,?,?,?,?,?
        FROM DUAL
        WHERE NOT EXISTS(
            SELECT 1
            FROM users
            WHERE email = '${req.body.email}' AND password = '${req.body.password}'
        )
        LIMIT 1;`,
        [
            req.body.name,
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

const loginUser = (req, res) => {
    sqlCon.query(
        `SELECT * FROM users WHERE email = "${req.body.email}" AND password = "${req.body.password}"`
    , (err, results) => {
        if(err) return res.sendStatus(400);
        if(results.length == 0) return res.sendStatus(404);
        return res.send(results[0]);
    })
}

const updateUser = (req, res) => {
    var currentLocalTime = new DateTimeService().getLocalDateTime(new Date());
    var updatedAt = new Date(currentLocalTime).toISOString();
  
    sqlCon.query(
        `
        SET SQL_MODE='ALLOW_INVALID_DATES';
        UPDATE users 
        SET 
        name = '${req.body.name}',
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

const deleteUser = (req, res) => {
    sqlCon.query(
        `DELETE FROM users WHERE id = ${req.params.id};`
    , (err, results) => {
        if(err) return res.sendStatus(400);
        return res.send(results); 
    })
}

module.exports = {
    getAllUsers,
    getUserById,
    postUser,
    loginUser,
    updateUser,
    deleteUser
};

