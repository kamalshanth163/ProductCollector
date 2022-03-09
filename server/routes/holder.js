const express = require('express');
const router = express.Router();
const holderController = require("../controllers/holderController");

router.get("/", holderController.getAllHolders);
router.get("/:id", holderController.getHolderById);

router.post("/", holderController.postHolder);
router.post("/login", holderController.loginHolder);

router.put("/", holderController.updateHolder);

router.delete("/:id", holderController.deleteHolder);

module.exports = router;


