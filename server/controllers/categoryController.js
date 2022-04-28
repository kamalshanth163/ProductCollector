const sqlCon = require("../db/connection");
const DateTimeService = require('../services/DateTimeService');

const getAllCategories = (req, res) => {
    sqlCon.query("SELECT * FROM categories", (err, results) => {
        if(err) return res.sendStatus(400);
        return res.send(results);
    })
};

const getCategoryById = (req, res) => {
    sqlCon.query(`SELECT * FROM categories WHERE id = ${req.params.id}`, (err, results) => {
        if(err) return res.sendStatus(400);
        return res.send(results);
    })
}

module.exports = {
    getAllCategories,
    getCategoryById
};

