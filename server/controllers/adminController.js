const sqlCon = require("../db/connection");

const loginAdmin = (req, res) => {
    sqlCon.query(
        `SELECT * FROM admins WHERE email = "${req.body.email}" AND password = "${req.body.password}"`
    , (err, results) => {
        if(err) return res.sendStatus(400);
        if(results.length == 0) return res.sendStatus(404);
        return res.send(results[0]);
    })
}

module.exports = {
    loginAdmin
};

