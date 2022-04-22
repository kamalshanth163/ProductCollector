const express = require('express');
const router = express.Router();
const commonController = require("../controllers/commonController");

router.get("/dashboard-data", commonController.getDashboardData);

module.exports = router;


