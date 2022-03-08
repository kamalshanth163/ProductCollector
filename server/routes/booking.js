const express = require('express');
const router = express.Router();
const bookingController = require("../controllers/bookingController");

router.get("/", bookingController.getAllBookings);
router.get("/:id", bookingController.getBookingById);

router.post("/", bookingController.postBooking);

router.put("/", bookingController.updateBooking);

router.delete("/:id", bookingController.deleteBooking);

module.exports = router;


