const express = require('express');
const router = express.Router();
const collectorController = require("../controllers/collectorController");

router.get("/", collectorController.getAllCollectors);
router.get("/:id", collectorController.getCollectorById);

router.post("/", collectorController.postCollector);
router.post("/login", collectorController.loginCollector);

router.put("/", collectorController.updateCollector);

router.delete("/:id", collectorController.deleteCollector);

module.exports = router;


